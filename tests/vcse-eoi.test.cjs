// Run in a dedicated Node process. Execute production SQL in embedded PostgreSQL;
// only the Neon transport and external email network are replaced.
const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const { PGlite } = require('@electric-sql/pglite');
let db;
const originalLoad = Module._load;
Module._extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText, filename);
Module._extensions['.tsx'] = Module._extensions['.ts'];
Module._load = function(name, parent, main) {
  if (name === '@neondatabase/serverless') return { neon: () => async (strings, ...values) => (await db.query(strings.reduce((s,p,i) => s + (i ? '$'+i : '') + p, ''), values)).rows };
  if (name.startsWith('@/')) return originalLoad.call(this, path.resolve(name.slice(2)), parent, main);
  return originalLoad.call(this,name,parent,main);
};
const schema = require('../lib/vcse-eoi-schema.ts');
const service = require('../lib/vcse-eoi.ts');
const api = require('../app/api/vcse-eoi/route.ts');
const retry = require('../app/api/vcse-eoi/retry/route.ts');
const originalFetch = global.fetch;
process.env.VCSE_EOI_DECLARATION_SECRET='test-declaration-secret';
const signing=require('../lib/vcse-declaration-signing.ts');
const definitions=require('../lib/vcse-declarations.ts');
const auditFor=data=>signing.verifyPresentation(signing.createPresentation(data.enquiryRoute).token,data.enquiryRoute);
const valid = { ...Object.fromEntries(schema.fields.map(([key])=>[key, 'Example'])), country:'GB', operatingCountries:['GB'], email:'test@example.org', website:'https://example.org', staffSize:'1–5', volunteerSize:'6–10', participation:'ready_to_arrange',approver:'organisation_lead',timing:'one_to_three_months',commercialReadiness:'existing_budget', challenges:[schema.challenges[0]], selectionAcknowledged:true, purchaseBoundaryAcknowledged:true, privacyAcknowledged:true, presentationToken:signing.createPresentation('uk_early_adopter').token };
const request = (body, options={}) => new Request('http://localhost/api/vcse-eoi', {method:'POST',headers:{origin:'http://localhost','content-type':'application/json', ...options.headers},body:typeof body === 'string' ? body : JSON.stringify(body)});
before(async () => { db = new PGlite(); await db.exec(fs.readFileSync('docs/migrations/001_vcse_eoi.sql','utf8')); await db.exec(fs.readFileSync('docs/migrations/002_vcse_international_interest.sql','utf8')); await db.exec(fs.readFileSync('docs/migrations/003_vcse_declaration_audit.sql','utf8')); await db.exec(fs.readFileSync('docs/migrations/004_vcse_structured_answers.sql','utf8')); });
beforeEach(async () => {
 await db.exec('TRUNCATE vcse_eoi_delivery, vcse_eoi, vcse_eoi_rate, vcse_eoi_events');
 Object.assign(process.env, {VCSE_EOI_OPEN:'true',VCSE_EOI_ORIGIN:'http://localhost',VCSE_EOI_ENVIRONMENT:'staging',VCSE_EOI_DATABASE_URL:'test',RESEND_API_KEY:'test',VCSE_EOI_FROM_EMAIL:'test@example.org',VCSE_EOI_TO_EMAIL:'team@example.org',VCSE_EOI_RATE_SALT:'test',VCSE_EOI_RETRY_SECRET:'test-secret',VCSE_EOI_WEBHOOK_SECRET:'whsec_dGVzdA==',VCSE_EOI_DECLARATION_SECRET:'test-declaration-secret'});
 delete process.env.VERCEL_ENV;
 global.fetch = async () => Response.json({id:'email-test-id'});
});
after(async () => { global.fetch=originalFetch; Module._load=originalLoad; await db.close(); });
test('normalises and validates required, bounded fields and choices', () => {
 assert.ok(schema.validateApplication(valid).data);
 for (const input of [null, [], {}, {...valid,email:'bad'}, {...valid,selectionAcknowledged:'true'}, {...valid,challenges:schema.challenges}, {...valid,challenges:['Unknown']}, {...valid,challenges:[schema.challenges[0],schema.challenges[0]]}, {...valid,activities:'x'.repeat(1501)}, {...valid,staffSize:'invalid'}, {...valid,website:'javascript:alert(1)'}, {...valid,commercialReadiness:'unrecognised'}]) assert.equal(schema.validateApplication(input).data,undefined);
 assert.equal(schema.validateApplication({...valid,email:' TEST@EXAMPLE.ORG '}).data.email,'test@example.org');
});
test('closed and misconfigured routes fail without saving', async () => {
 process.env.VCSE_EOI_OPEN='false'; assert.equal((await api.POST(request(valid))).status,503);
 process.env.VCSE_EOI_OPEN='true'; process.env.VERCEL_ENV='production'; assert.equal((await api.POST(request(valid))).status,503);
 assert.equal((await db.query('SELECT * FROM vcse_eoi')).rows.length,0);
});
test('rejects malformed, oversized, cross-origin, bot and invalid requests', async () => {
 for (const [req,status] of [[request('{'),400],[request('x'.repeat(24001)),413],[request(valid,{headers:{origin:'https://foreign.example'}}),403],[request({...valid,companyFax:'bot'}),400],[request({...valid,privacyAcknowledged:false}),400],[request(valid,{headers:{'content-type':'text/plain'}}),415]]) assert.equal((await api.POST(req)).status,status);
 assert.equal((await db.query('SELECT * FROM vcse_eoi')).rows.length,0);
});
test('persists before email, returns receipt and deduplicates concurrent retries', async () => {
 let calls=0;
 global.fetch=async () => { calls++; assert.equal((await db.query('SELECT * FROM vcse_eoi')).rows.length,1); return Response.json({id:'sent'}); };
 const first=await (await api.POST(request(valid))).json();
 assert.ok(first.receipt);
 const results=await Promise.all(Array.from({length:3},()=>api.POST(request(valid)).then(r=>r.json())));
 for (const result of results) assert.equal(result.receipt,first.receipt);
 assert.equal((await db.query('SELECT * FROM vcse_eoi')).rows.length,1);
 assert.equal((await db.query("SELECT * FROM vcse_eoi_delivery WHERE status = 'sent'")).rows.length,2);
 assert.equal(calls,2);
});
test('email failure preserves receipt and jobs; authorised retry sends and does not resend', async () => {
 global.fetch=async () => new Response('rejected',{status:503});
 const response=await api.POST(request(valid)); assert.equal(response.status,200);
 assert.equal((await db.query("SELECT * FROM vcse_eoi_delivery WHERE status='failed'")).rows.length,2);
 assert.equal((await retry.POST(new Request('http://localhost/api/vcse-eoi/retry',{method:'POST'}))).status,401);
 await db.exec("UPDATE vcse_eoi_delivery SET next_attempt_at=now() - interval '1 minute'");
 let count=0; global.fetch=async () => { count++; return Response.json({id:'retry-sent'}); };
 const run=()=>retry.POST(new Request('http://localhost/api/vcse-eoi/retry',{method:'POST',headers:{authorization:'Bearer test-secret'}}));
 assert.equal((await run()).status,200); await run(); assert.equal(count,2);
 assert.equal((await db.query("SELECT * FROM vcse_eoi_delivery WHERE status='sent'")).rows.length,2);
});
test('shared rate limit is enforced across requests', async () => {
 for(let i=0;i<10;i++) assert.equal((await api.POST(request(valid))).status,200);
 assert.equal((await api.POST(request(valid))).status,429);
});
test('expired leases recover; active leases and exhausted jobs stay untouched', async () => {
 const id=await service.persist(schema.validateApplication(valid).data,auditFor(schema.validateApplication(valid).data));
 await db.exec("UPDATE vcse_eoi_delivery SET status='sending', next_attempt_at=now()+interval '5 minutes'");
 assert.equal(await service.deliver(id),0);
 await db.exec("UPDATE vcse_eoi_delivery SET next_attempt_at=now()-interval '1 minute'");
 assert.equal(await service.deliver(id),2);
 await db.exec("UPDATE vcse_eoi_delivery SET status='failed', attempts=8, next_attempt_at=now()-interval '1 minute'");
 assert.equal(await service.deliver(id),0);
});


test('signed delivery events reject tampering, track bounces and preserve failure on replay', async () => {
 const webhook=require('../app/api/vcse-eoi/webhook/route.ts');
 await api.POST(request(valid));
 const event={type:'email.bounced',created_at:new Date().toISOString(),data:{email_id:'email-test-id'}};
 const signed=(value,offset=0)=>{ const raw=JSON.stringify(value); const stamp=String(Math.floor(Date.now()/1000)+offset); const signature=require('node:crypto').createHmac('sha256',Buffer.from('test')).update(`msg_test.${stamp}.${raw}`).digest('base64'); return new Request('http://localhost/api/vcse-eoi/webhook',{method:'POST',headers:{'svix-id':'msg_test','svix-timestamp':stamp,'svix-signature':`v1,${signature}`},body:raw}); };
 assert.equal((await webhook.POST(new Request('http://localhost/api/vcse-eoi/webhook',{method:'POST',body:'{}'}))).status,400);
 assert.equal((await webhook.POST(signed(event,-600))).status,400);
 const tampered=signed(event); const headers=tampered.headers; assert.equal((await webhook.POST(new Request(tampered.url,{method:'POST',headers,body:'{}'}))).status,400);
 assert.equal((await webhook.POST(signed(event))).status,204);
 assert.equal((await webhook.POST(signed(event))).status,204);
 assert.equal((await db.query("SELECT * FROM vcse_eoi_delivery WHERE status='bounced'")).rows.length,2);
 await webhook.POST(signed({...event,type:'email.delivered',created_at:new Date(Date.now()+1000).toISOString()}));
 assert.equal((await db.query("SELECT * FROM vcse_eoi_delivery WHERE status='bounced'")).rows.length,2);
 assert.equal(await service.deliver(),0);
});
test('early webhook events reconcile after acceptance; old uncertain jobs need manual review', async () => {
 await db.query("INSERT INTO vcse_eoi_events(provider_id,status,event_at) VALUES ($1,'bounced',now())",['email-test-id']);
 await api.POST(request(valid));
 assert.equal((await db.query("SELECT * FROM vcse_eoi_delivery WHERE status='bounced'")).rows.length,2);
 await db.exec("UPDATE vcse_eoi_delivery SET status='failed', first_attempt_at=now()-interval '24 hours', next_attempt_at=now()-interval '1 hour'");
 assert.equal(await service.deliver(),0);
});
test('routes UK, international and UK-based overseas operators from selected base country', async () => {
 for(const [country, operatingCountries, readiness, route] of [ ['GB',['GB'],'existing_budget','uk_early_adopter'], ['NG',['NG','GH'],'potentially','international_interest'], ['GB',['GB','NG'],'subject_to_approval','uk_early_adopter'] ]) {
  const raw={...valid,country,operatingCountries,commercialReadiness:readiness,enquiryRoute:'forged-route',presentationToken:signing.createPresentation(route).token};
  const data=schema.validateApplication(raw).data; assert.equal(data.enquiryRoute,route);
  const result=await (await api.POST(request(raw))).json(); assert.ok(result.receipt);
  const row=(await db.query('SELECT * FROM vcse_eoi WHERE id=$1',[result.receipt])).rows[0];
  assert.equal(row.country,country); assert.deepEqual(row.operating_countries,[...operatingCountries].sort()); assert.equal(row.enquiry_route,route); assert.equal(row.declaration_set_version,definitions.declarationVersions[route]); assert.equal(row.offer_version,definitions.offers[route].version);
  const email=service.emailFor('applicant',row.id,row.payload);
  if(route==='international_interest') { assert.match(result.message,/international interest/); assert.match(email.subject,/international/); assert.match(email.text,/assessed separately/); assert.doesNotMatch(email.text,/£1,250|£20\/month|Discovery is free with no purchase obligation/); }
  else { assert.doesNotMatch(result.message,/international interest/); assert.match(email.text,/Discovery is free with no purchase obligation/); }
 }
 assert.equal(schema.validateApplication({...valid,country:'NG',commercialReadiness:'existing_budget'}).data,undefined);
 assert.equal(schema.validateApplication({...valid,country:'GB',commercialReadiness:'yes'}).data,undefined);
 for(const input of [{country:''},{country:'ZZ'},{operatingCountries:[]},{operatingCountries:['ZZ']},{operatingCountries:['GB','GB']}]) assert.equal(schema.validateApplication({...valid,...input}).data,undefined);
});
test('additive international migration preserves legacy records and queued notifications', async () => {
 const legacy=new PGlite();
 try {
  await legacy.exec(fs.readFileSync('docs/migrations/001_vcse_eoi.sql','utf8'));
  const id=require('node:crypto').randomUUID();
  await legacy.query('INSERT INTO vcse_eoi(id,fingerprint,payload,privacy_version) VALUES ($1,$2,$3,$4)',[id,'legacy-fingerprint',JSON.stringify({organisation:'Existing charity',email:'legacy@example.org'}),'old-notice']);
  await legacy.query("INSERT INTO vcse_eoi_delivery(id,application_id,kind) VALUES ($1,$2,'applicant')",[require('node:crypto').randomUUID(),id]);
  const migration=fs.readFileSync('docs/migrations/002_vcse_international_interest.sql','utf8');
  await legacy.exec(migration); await legacy.exec(migration);
  const row=(await legacy.query('SELECT * FROM vcse_eoi')).rows[0];
  assert.equal(row.id,id); assert.equal(row.payload.organisation,'Existing charity'); assert.equal(row.privacy_version,'old-notice');
  assert.equal(row.country,null); assert.equal(row.operating_countries,null); assert.equal(row.enquiry_route,'uk_early_adopter');
  assert.equal((await legacy.query('SELECT * FROM vcse_eoi_delivery')).rows.length,1);
 } finally { await legacy.close(); }
});
test('each declaration independently requires boolean true and legacy combined acceptance is insufficient', async () => {
 for (const [key] of definitions.acknowledgements) {
  for (const value of [undefined,false,'true',1,null,{},[]]) {
   const raw={...valid,[key]:value,acknowledgements:true};
   const response=await api.POST(request(raw)); assert.equal(response.status,400);
   const result=await response.json(); assert.ok(result.errors[key]);
  }
 }
 const legacy={...valid,acknowledgements:true}; for(const [key] of definitions.acknowledgements) delete legacy[key];
 assert.equal((await api.POST(request(legacy))).status,400);
 assert.equal((await db.query('SELECT * FROM vcse_eoi')).rows.length,0);
});
test('rejects forged, stale, expired and wrong-route presentations; never silently accepts newer terms', async () => {
 const current=signing.createPresentation('uk_early_adopter');
 const decode=token=>JSON.parse(Buffer.from(token.split('.')[0],'base64url').toString('utf8'));
 const sign=value=>{const encoded=Buffer.from(JSON.stringify(value)).toString('base64url');return encoded+'.'+require('node:crypto').createHmac('sha256',process.env.VCSE_EOI_DECLARATION_SECRET).update(encoded).digest('base64url');};
 const snapshot=decode(current.token);
 for(const token of [undefined,'forged',current.token+'x',sign({...snapshot,declarationSetVersion:'old-version'}),sign({...snapshot,privacyNoticeVersion:'old-privacy'}),sign({...snapshot,offerVersion:'old-offer'}),sign({...snapshot,issuedAt:new Date(Date.now()-90_000_000).toISOString()}),signing.createPresentation('international_interest').token]) {
  const response=await api.POST(request({...valid,presentationToken:token}));assert.equal(response.status,409);
  const body=await response.json();assert.equal(body.reviewRequired,true);assert.match(body.error,/review/i);assert.ok(body.presentations.uk_early_adopter.token);
 }
 assert.equal((await db.query('SELECT * FROM vcse_eoi')).rows.length,0);
});
test('stores individual values, exact authoritative wording, UTC submission time and displayed route versions', async () => {
 const before=Date.now();
 const response=await api.POST(request({...valid,submittedAt:'2000-01-01',declarationSetVersion:'forged',privacyNoticeVersion:'forged',offerVersion:'forged',declarations:['client wording']}));
 assert.equal(response.status,200); const receipt=(await response.json()).receipt;
 const row=(await db.query('SELECT * FROM vcse_eoi WHERE id=$1',[receipt])).rows[0];
 assert.equal(row.selection_acknowledged,true);assert.equal(row.purchase_boundary_acknowledged,true);assert.equal(row.privacy_acknowledged,true);
 const utc=new Date(row.submitted_at).toISOString();assert.ok(utc.endsWith('Z'));assert.ok(Date.parse(utc)>=before-1000 && Date.parse(utc)<=Date.now()+1000);
 assert.equal(row.declaration_set_version,definitions.DECLARATION_SET_VERSION);assert.equal(row.privacy_notice_version,definitions.PRIVACY_NOTICE_VERSION);assert.equal(row.offer_version,definitions.offers.uk_early_adopter.version);assert.equal(row.presented_enquiry_route,'uk_early_adopter');
 assert.deepEqual(row.declaration_snapshot.declarations,definitions.acknowledgements);
 assert.equal(row.declaration_snapshot.issuedAt,JSON.parse(Buffer.from(valid.presentationToken.split('.')[0],'base64url')).issuedAt);
 const fresh=signing.createPresentation('uk_early_adopter');
 assert.equal((await (await api.POST(request({...valid,presentationToken:fresh.token}))).json()).receipt,receipt);
 assert.equal((await db.query('SELECT * FROM vcse_eoi')).rows.length,1);
});
test('audit migration preserves legacy combined acceptance without inventing individual values or versions', async () => {
 const legacy=new PGlite();
 try {
  await legacy.exec(fs.readFileSync('docs/migrations/001_vcse_eoi.sql','utf8'));
  await legacy.exec(fs.readFileSync('docs/migrations/002_vcse_international_interest.sql','utf8'));
  await legacy.exec('ALTER TABLE vcse_eoi ADD COLUMN acknowledgements boolean');
  const id=require('node:crypto').randomUUID();
  await legacy.query('INSERT INTO vcse_eoi(id,fingerprint,payload,privacy_version,enquiry_route,acknowledgements) VALUES ($1,$2,$3,$4,$5,true)',[id,'legacy',JSON.stringify({acknowledgements:true,organisation:'Original charity'}),'legacy-notice','uk_early_adopter']);
  const migration=fs.readFileSync('docs/migrations/003_vcse_declaration_audit.sql','utf8');await legacy.exec(migration);await legacy.exec(migration);
  const row=(await legacy.query('SELECT * FROM vcse_eoi')).rows[0];assert.equal(row.id,id);assert.equal(row.acknowledgements,true);assert.equal(row.payload.acknowledgements,true);assert.equal(row.payload.organisation,'Original charity');assert.equal(row.privacy_version,'legacy-notice');
  for(const key of ['selection_acknowledged','purchase_boundary_acknowledged','privacy_acknowledged','submitted_at','declaration_set_version','privacy_notice_version','offer_version','presented_enquiry_route','declaration_snapshot']) assert.equal(row[key],null,key);
 } finally {await legacy.close();}
});
test('commercial page, pre-declaration explanation and signed UK offer agree', () => {
 const React=require('react');const {renderToStaticMarkup}=require('react-dom/server');
 const Page=require('../app/research/vcse-digital-workspace/page.tsx').default;
 const previous=process.env.VCSE_EOI_OPEN;process.env.VCSE_EOI_OPEN='false';
 let html;try {html=renderToStaticMarkup(React.createElement(Page));}finally{process.env.VCSE_EOI_OPEN=previous;}
 const presentation=signing.createPresentation('uk_early_adopter');
 assert.equal(presentation.offerVersion,'vcse-uk-2026-10-24-v3');
 assert.equal(presentation.declarationSetVersion,'vcse-declarations-2026-10-24-v2');
 const signed=JSON.parse(Buffer.from(presentation.token.split('.')[0],'base64url').toString('utf8'));
 assert.equal(signed.offerVersion,presentation.offerVersion);assert.equal(signed.declarationSetVersion,presentation.declarationSetVersion);
 for(const [price,label] of definitions.ukCommercial.cards) {assert.ok(html.includes(price));assert.ok(html.includes(label));assert.ok(presentation.offerSummary.includes(price));assert.ok(presentation.offerSummary.toLowerCase().includes(label.toLowerCase()));}
 for(const text of [definitions.ukCommercial.discoveryExplanation,definitions.ukCommercial.postDiscoveryExplanation,definitions.ukCommercial.paymentBoundary,...definitions.ukCommercial.paymentOptions,definitions.ukCommercial.infrastructureExplanation,...definitions.ukCommercial.eoiExplanation]) assert.ok(html.replaceAll("&#x27;", "'").includes(text),text);
 const boundary=html.indexOf('id="eoi-boundary"');const checks=html.indexOf('name="selectionAcknowledged"');assert.ok(boundary>=0 && boundary<checks);
 assert.match(html,/<fieldset disabled=""/);assert.equal((html.match(/name="(?:selectionAcknowledged|purchaseBoundaryAcknowledged|privacyAcknowledged)"/g)||[]).length,3);
 assert.doesNotMatch(html,/type="checkbox"[^>]*checked=""/);
 assert.match(presentation.declarations[1][1],/discovery and workflow mapping are free/);
 assert.match(presentation.declarations[1][1],/separate agreement after I have reviewed the proposed scope and costs/);
});
test('released versions and international offer remain intact; superseded UK presentations need re-acknowledgement', async () => {
 const legacyDeclaration='vcse-declarations-2026-10-24-v1';const legacyOffer='vcse-uk-2026-10-24-v1';
 assert.equal(definitions.DECLARATION_SETS[legacyDeclaration][1][1],'I understand discovery creates no purchase obligation; implementation requires a separate agreement.');
 assert.equal(definitions.OFFER_VERSIONS[legacyOffer].summary,'UK early-adopter interest: free discovery with no purchase obligation. Any paid implementation needs a separate agreed proposal. Provisional UK contribution: £1,250; infrastructure: £20/month from live launch, subject to confirmed scope, VAT and total payable.');
 const international=signing.createPresentation('international_interest');
 assert.equal(international.declarationSetVersion,legacyDeclaration);assert.equal(international.offerVersion,'vcse-international-2026-10-24-v1');
 assert.equal(international.offerSummary,'International interest: participation, availability and pricing are assessed separately. The UK subsidy and full free-discovery package do not apply automatically. A relevant exploratory conversation may be offered individually; deployment availability is not guaranteed.');
 assert.equal(international.declarations[1][1],definitions.DECLARATION_SETS[legacyDeclaration][1][1]);
 assert.doesNotMatch(international.offerSummary,/£1,250|£20|50%/);assert.doesNotMatch(international.declarations[1][1],/are free/);
 assert.ok(signing.verifyPresentation(international.token,'international_interest'));
 const current=JSON.parse(Buffer.from(signing.createPresentation('uk_early_adopter').token.split('.')[0],'base64url').toString('utf8'));
 const sign=value=>{const encoded=Buffer.from(JSON.stringify(value)).toString('base64url');return encoded+'.'+require('node:crypto').createHmac('sha256',process.env.VCSE_EOI_DECLARATION_SECRET).update(encoded).digest('base64url');};
 for(const snapshot of [{...current,declarationSetVersion:legacyDeclaration,offerVersion:legacyOffer},{...current,declarationSetVersion:legacyDeclaration},{...current,offerVersion:legacyOffer}]) {
  const response=await api.POST(request({...valid,presentationToken:sign(snapshot)}));assert.equal(response.status,409);const body=await response.json();assert.equal(body.reviewRequired,true);assert.equal(body.presentations.uk_early_adopter.declarationSetVersion,definitions.DECLARATION_SET_VERSION);
  const unchecked={...valid,presentationToken:body.presentations.uk_early_adopter.token,selectionAcknowledged:false,purchaseBoundaryAcknowledged:false,privacyAcknowledged:false};assert.equal((await api.POST(request(unchecked))).status,400);
 }
 const id=require('node:crypto').randomUUID();const originalSnapshot={declarationSetVersion:legacyDeclaration,offerVersion:legacyOffer,declarations:definitions.DECLARATION_SETS[legacyDeclaration]};
 await db.query('INSERT INTO vcse_eoi(id,fingerprint,payload,privacy_version,country,enquiry_route,declaration_set_version,offer_version,declaration_snapshot) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[id,'historical-audit','{}','historical-privacy','GB','uk_early_adopter',legacyDeclaration,legacyOffer,JSON.stringify(originalSnapshot)]);
 await api.POST(request(valid));
 const retained=(await db.query('SELECT * FROM vcse_eoi WHERE id=$1',[id])).rows[0];assert.equal(retained.declaration_set_version,legacyDeclaration);assert.equal(retained.offer_version,legacyOffer);assert.deepEqual(retained.declaration_snapshot,originalSnapshot);
});
test('commercial UX uses semantic cards, consistent decorative icons and accessible contrast', () => {
 const React=require('react');const {renderToStaticMarkup}=require('react-dom/server');
 const {VcseCommercialTerms,commercialColors:c}=require('../components/vcse-commercial-terms.tsx');
 const html=renderToStaticMarkup(React.createElement(VcseCommercialTerms));
 assert.match(html,/aria-labelledby="commercial-heading"/);assert.match(html,/<h2[^>]*>Understand your needs first\. Decide whether to proceed afterwards\.<\/h2>/);
 assert.equal((html.match(/<li /g)||[]).length,3);assert.equal((html.match(/<svg /g)||[]).length,3);
 assert.equal((html.match(/width="32" height="32"/g)||[]).length,3);assert.equal((html.match(/stroke-width="1\.8"/g)||[]).length,3);assert.equal((html.match(/aria-hidden="true"/g)||[]).length,3);
 for(const text of [definitions.ukCommercial.paymentHeading,...definitions.ukCommercial.paymentOptionHeadings,definitions.ukCommercial.infrastructureConfirmation,definitions.ukCommercial.closingClarifier]) assert.ok(html.includes(text));
 assert.doesNotMatch(html,/overflow-hidden|truncate|whitespace-nowrap|line-clamp|<mark/);
 const luminance=hex=>{const rgb=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;};
 const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);};
 for(const [foreground,background,minimum] of [[c.onDark,c.background,4.5],[c.secondary,c.background,4.5],[c.label,c.card,4.5],[c.amount,c.card,4.5],[c.icon,c.card,3],[c.border,c.card,3]]) {assert.ok(contrast(foreground,background)>=minimum,`${foreground} on ${background}: ${contrast(foreground,background)}`);assert.ok(html.includes(foreground));}
 // Both plans still total the selected implementation price; hosting is separate.
 const planAmounts=definitions.ukCommercial.paymentOptions.map(text=>[...text.matchAll(/£(\d+)/g)].map(match=>Number(match[1])));
 assert.equal(planAmounts[0].reduce((sum,value)=>sum+value,0),1250);assert.equal(planAmounts[1][0]+5*planAmounts[1][1],1250);
 assert.match(definitions.ukCommercial.paymentOptions[0],/£625 on agreement, plus £625/);assert.match(definitions.ukCommercial.paymentOptions[1],/£250 initially, followed by five monthly payments of £200/);
});
test('UK offer v3 preserves v2 records, declaration wording, form explanation and international terms', async () => {
 const v2=definitions.OFFER_VERSIONS['vcse-uk-2026-10-24-v2'];assert.equal(v2.version,'vcse-uk-2026-10-24-v2');
 assert.deepEqual(v2.commercial.cards,[['£2,500','Standard implementation cost'],['50%','Selected early-adopter discount'],['£1,250','Discounted early-adopter implementation price']]);
 assert.deepEqual(definitions.ukCommercial.eoiExplanation,v2.commercial.eoiExplanation);
 assert.equal(definitions.DECLARATION_SET_VERSION,'vcse-declarations-2026-10-24-v2');
 const current=signing.createPresentation('uk_early_adopter');const decoded=JSON.parse(Buffer.from(current.token.split('.')[0],'base64url').toString('utf8'));decoded.offerVersion=v2.version;
 const encoded=Buffer.from(JSON.stringify(decoded)).toString('base64url');const oldToken=encoded+'.'+require('node:crypto').createHmac('sha256',process.env.VCSE_EOI_DECLARATION_SECRET).update(encoded).digest('base64url');
 const stale=await api.POST(request({...valid,presentationToken:oldToken}));assert.equal(stale.status,409);assert.equal((await stale.json()).reviewRequired,true);
 const id=require('node:crypto').randomUUID();const oldSnapshot={offerVersion:v2.version,declarationSetVersion:definitions.DECLARATION_SET_VERSION,declarations:definitions.acknowledgements};
 await db.query('INSERT INTO vcse_eoi(id,fingerprint,payload,privacy_version,country,enquiry_route,offer_version,declaration_snapshot) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',[id,'v2-historical','{}',definitions.PRIVACY_NOTICE_VERSION,'GB','uk_early_adopter',v2.version,JSON.stringify(oldSnapshot)]);
 assert.equal((await api.POST(request(valid))).status,200);
 const row=(await db.query('SELECT * FROM vcse_eoi WHERE id=$1',[id])).rows[0];assert.equal(row.offer_version,v2.version);assert.deepEqual(row.declaration_snapshot,oldSnapshot);
 const international=signing.createPresentation('international_interest');assert.equal(international.offerVersion,'vcse-international-2026-10-24-v1');assert.equal(international.declarationSetVersion,'vcse-declarations-2026-10-24-v1');
});
test('structured questions accept stable codes, reject ambiguous/legacy answers and persist route-specific columns', async () => {
 const q=require('../lib/vcse-eoi-questions.ts');
 for(const [country,route,readiness] of [['GB','uk_early_adopter','existing_budget'],['NG','international_interest','potentially'],['GB','uk_early_adopter','external_funding_needed']]) {
  const definitions=q.questionsForRoute(route);
  for(const key of q.structuredKeys) for(const option of definitions[key].options) {
   const raw={...valid,country,commercialReadiness:readiness,[key]:option.value};assert.ok(schema.validateApplication(raw).data,`${country} ${key}: ${option.value}`);
  }
  const raw={...valid,country,operatingCountries:country==='GB'?['GB','NG']:['NG'],commercialReadiness:readiness,presentationToken:signing.createPresentation(route).token,answerSchemaVersion:'forged-version'};
  const result=await (await api.POST(request(raw))).json();assert.ok(result.receipt);
  const row=(await db.query('SELECT * FROM vcse_eoi WHERE id=$1',[result.receipt])).rows[0];
  assert.equal(row.answer_schema_version,q.ANSWER_SCHEMA_VERSION);assert.equal(row.payload.answerSchemaVersion,q.ANSWER_SCHEMA_VERSION);
  assert.equal(row.discovery_readiness_code,'ready_to_arrange');assert.equal(row.expenditure_approver_code,'organisation_lead');assert.equal(row.implementation_timing_code,'one_to_three_months');
  assert.equal(row.uk_funding_code,route==='uk_early_adopter'?readiness:null);assert.equal(row.international_paid_discussion_code,route==='international_interest'?readiness:null);
 }
 for(const key of q.structuredKeys) for(const value of [undefined,'',true,1,{},[],['existing_budget'],'Other free-text response','Yes — we are ready to arrange a session']) {
  const response=await api.POST(request({...valid,[key]:value}));assert.equal(response.status,400);assert.ok((await response.json()).errors[key]);
 }
 const international=q.questionsForRoute('international_interest');
 assert.deepEqual(international.commercialReadiness.options.map(o=>o.label),['Yes','Potentially','Funded access needed','Need more information']);
 assert.doesNotMatch(international.participation.label+' '+international.participation.helper,/free discovery|£1,250|£20/);
 assert.equal((await api.POST(request({...valid,country:'NG',commercialReadiness:'existing_budget'}))).status,400);
 assert.equal((await api.POST(request({...valid,commercialReadiness:'potentially'}))).status,400);
});
test('form renders visible native selectors with linked helpers, unchanged declarations and no default commitment', () => {
 const q=require('../lib/vcse-eoi-questions.ts');const React=require('react');const {renderToStaticMarkup}=require('react-dom/server');
 const {VcseEoiForm}=require('../components/vcse-eoi-form.tsx');
 const html=renderToStaticMarkup(React.createElement(VcseEoiForm,{open:false,presentations:signing.createPresentations()}));
 for(const key of q.structuredKeys) {
  assert.match(html,new RegExp(`<label for="${key}"`));assert.match(html,new RegExp(`<select[^>]+id="${key}"[^>]+aria-describedby="${key}-help"`));
  assert.ok(html.includes(`id="${key}-help"`));assert.match(html,new RegExp(`<select[^>]+id="${key}"[^>]*><option value="" selected="">Please choose</option>`));
  assert.ok(!html.includes(`<textarea id="${key}"`));
 }
 assert.ok(html.includes(q.toolsLabel));assert.ok(html.includes(q.toolsHelper));assert.match(html,/<textarea[^>]+id="tools"/);
 assert.match(html,/<fieldset disabled=""/);assert.equal((html.match(/name="(?:selectionAcknowledged|purchaseBoundaryAcknowledged|privacyAcknowledged)"/g)||[]).length,3);assert.doesNotMatch(html,/type="checkbox"[^>]*checked=""/);
 assert.ok(html.includes('data-clarity-mask="true"'));assert.match(html,/name="commercialReadiness"/);
});
test('structured-answer migration preserves historical free text and old commercial choices without inventing codes', async () => {
 const legacy=new PGlite();try {
  for(const file of ['001_vcse_eoi.sql','002_vcse_international_interest.sql','003_vcse_declaration_audit.sql'])await legacy.exec(fs.readFileSync('docs/migrations/'+file,'utf8'));
  const id=require('node:crypto').randomUUID();const payload={participation:'We need to discuss this at our next meeting',approver:'Treasurer and trustees',timing:'Possibly next spring',commercialReadiness:'Instalments needed'};
  await legacy.query('INSERT INTO vcse_eoi(id,fingerprint,payload,privacy_version,country,enquiry_route) VALUES ($1,$2,$3,$4,$5,$6)',[id,'legacy-free-text',JSON.stringify(payload),'historical','GB','uk_early_adopter']);
  const migration=fs.readFileSync('docs/migrations/004_vcse_structured_answers.sql','utf8');await legacy.exec(migration);await legacy.exec(migration);
  const row=(await legacy.query('SELECT * FROM vcse_eoi WHERE id=$1',[id])).rows[0];assert.deepEqual(row.payload,payload);
  for(const key of ['answer_schema_version','discovery_readiness_code','expenditure_approver_code','implementation_timing_code','uk_funding_code','international_paid_discussion_code'])assert.equal(row[key],null,key);
 } finally {await legacy.close();}
});
