const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,f);
const model=require('../admin/lib/model.ts');
const {fixtures}=require('../admin/lib/synthetic.ts');
test('preview fails closed in production, Vercel and without explicit opt-in',()=>{
 assert.equal(model.previewAllowed({}),false);
 assert.equal(model.previewAllowed({ADMIN_SYNTHETIC_PREVIEW:'true',NODE_ENV:'development'}),true);
 for(const extra of [{NODE_ENV:'production'},{VERCEL:'1'},{VERCEL_ENV:'preview'}])assert.equal(model.previewAllowed({ADMIN_SYNTHETIC_PREVIEW:'true',...extra}),false);
});
test('reviewer scope and final-selection restrictions; source preserved and management change audited',()=>{
 const entries=fixtures();const owned=entries.find(e=>e.management.reviewer==='Programme Lead');const other=entries.find(e=>e.management.reviewer==='Founder');
 assert.throws(()=>model.update(other,{...other.management,notes:'no'},'Programme Reviewer','Programme Lead','now'),/Permission denied/);
 assert.throws(()=>model.update(owned,{...owned.management,status:'Selected'},'Programme Reviewer','Programme Lead','now'),/Administrator/);
 assert.throws(()=>model.update(owned,{...owned.management,reviewer:'Founder'},'Programme Reviewer','Programme Lead','now'),/Administrator/);
 const next=model.update(owned,{...owned.management,notes:'Assessment',classification:'Future prospect'},'Programme Reviewer','Programme Lead','2026-10-24T12:00:00Z');
 assert.strictEqual(next.source,owned.source);assert.equal(next.management.status,owned.management.status);assert.equal(owned.management.notes,'');assert.deepEqual(next.management.history[0].changes,['classification','notes']);
 const selected=model.update(owned,{...owned.management,status:'Selected'},'Administrator','Founder','now');
 assert.throws(()=>model.update(selected,{...selected.management,status:'New'},'Programme Reviewer','Programme Lead','now'),/Administrator/);
});
test('classification and recruitment remain independent; bounded input validation',()=>{
 const e=fixtures()[0];const changed=model.update(e,{...e.management,status:'Selected'},'Administrator','Founder','now');
 assert.equal(changed.management.classification,e.management.classification);
 assert.throws(()=>model.update(e,{...e.management,status:'invented'},'Administrator','Founder','now'),/Invalid/);
 assert.throws(()=>model.update(e,{...e.management,notes:'x'.repeat(4001)},'Administrator','Founder','now'),/4,000/);
 assert.throws(()=>model.update(e,{...e.management,due:'2026-02-31'},'Administrator','Founder','now'),/Invalid/);
});
test('structured answers use exact schema and route; legacy is unclassified',()=>{
 const rows=fixtures();assert.match(model.answer(rows[0].source,'commercialReadiness'),/Funded access needed/);
 assert.match(model.answer(rows[1].source,'commercialReadiness'),/Existing organisational budget/);
 assert.match(model.answer(rows[17].source,'participation'),/^Unclassified legacy/);
 assert.equal(model.answer({...rows[0].source,funding:'existing_budget'},'commercialReadiness'),'Unknown / not recorded');
 assert.match(model.answer({...rows[1].source,schema:'unknown'},'commercialReadiness'),/^Unclassified legacy/);
});
test('search, route/date/country/readiness/funding/status filtering, sort and pagination inputs',()=>{
 const rows=fixtures();const base=model.emptyFilters;
 assert.equal(model.filter(rows,{...base,search:'Community Network 1'}).length,4);
 assert.equal(model.filter(rows,{...base,route:'international_interest'}).length,6);
 assert.equal(model.filter(rows,{...base,country:'GB'}).length,11);
 assert.equal(model.filter(rows,{...base,from:'2026-10-02',to:'2026-10-03'}).length,2);
 assert.equal(model.filter(rows,{...base,status:'Selected'}).length,2);
 assert.equal(model.filter(rows,{...base,readiness:'ready_to_arrange'}).length,8);
 assert.equal(model.filter(rows,{...base,funding:'existing_budget',route:'international_interest'}).length,0);
 const ordered=model.filter(rows,{...base,sort:'oldest'});assert.equal(ordered[0].source.id,rows[0].source.id);assert.equal(ordered.slice(6,12).length,6);assert.equal(new Set(ordered.map(e=>e.source.id)).size,18);
});
test('reports count independent classifications, scoped records, unknowns and email exceptions',()=>{
 const rows=fixtures();const counts=model.report(rows,'2026-10-24');
 assert.equal(counts['Total EOIs'],18);assert.equal(counts['UK enquiries'],12);assert.equal(counts['International enquiries'],6);assert.equal(counts['Selected early adopters'],2);assert.equal(counts['Outstanding actions'],5);assert.equal(counts['Overdue actions'],5);assert.equal(counts['Email exceptions'],3);
 const scoped=rows.filter(e=>model.canAccess('Programme Reviewer',e,'Programme Lead'));assert.equal(model.report(scoped,'2026-10-24')['Total EOIs'],9);
 assert.deepEqual(model.distribution(['Unknown','UK','UK']),{Unknown:1,UK:2});assert.equal(model.report([],'2026-10-24')['Total EOIs'],0);
});
