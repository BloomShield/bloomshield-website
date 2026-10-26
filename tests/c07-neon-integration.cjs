// Explicit live synthetic-staging acceptance; never included in default unit tests.
const {test}=require('node:test');
const fs=require('node:fs');
const ts=require('typescript');
const {randomUUID,randomBytes}=require('node:crypto');
const {assert,metadata,ownerUrl,connect}=require('../scripts/c07-neon.cjs');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,f);

test('actual Neon: restricted intake, authenticated DAL, persistent management and transactional audit',async()=>{
 assert.equal(process.env.C07_RUN_LIVE,'long-bar-21726499','Explicit live target required');
 metadata();
 process.loadEnvFile('.env.local'); process.loadEnvFile('admin/.env.local');
 const intakeUrl=new URL(process.env.VCSE_EOI_DATABASE_URL), adminUrl=new URL(process.env.ADMIN_DATABASE_URL);
 assert.equal(intakeUrl.hostname,adminUrl.hostname);
 for(const [u,role] of [[intakeUrl,'bloomshield_intake_staging'],[adminUrl,'bloomshield_admin_staging']]){
  assert.equal(u.username,role);assert.equal(u.pathname,'/neondb');assert.equal(u.searchParams.get('sslmode'),'verify-full');
 }
 const ownerUri=ownerUrl();assert.equal(new URL(ownerUri).hostname,intakeUrl.hostname);
 const owner=await connect(ownerUri), intake=await connect(intakeUrl.toString());
 const id=randomUUID(),other=randomUUID(),password=randomBytes(32).toString('hex'),email=`c07-${id}@example.org`;
 const receipts=[];let auditRevoked=false;
 Object.assign(process.env,{ADMIN_STAGING_ENABLED:'true',ADMIN_DATA_CLASSIFICATION:'synthetic',ADMIN_AUTH_ORIGIN:'https://c07-synthetic.example.org',BETTER_AUTH_SECRET:randomBytes(32).toString('hex'),VCSE_EOI_DECLARATION_SECRET:randomBytes(32).toString('hex')});
 // No mail transport or API key is configured or called by this DB-only test.
 delete process.env.RESEND_API_KEY; delete process.env.ADMIN_RESEND_API_KEY;
 const pool=require('../admin/lib/db.ts').database();
 const auth=require('../admin/lib/auth.ts').authentication();
 const {records,saveRecord}=require('../admin/lib/records.ts');
 try {
  for(const [client,role] of [[intake,'bloomshield_intake_staging'],[pool,'bloomshield_admin_staging']]){
   const identity=(await client.query('SELECT current_database() AS db,current_user AS role')).rows[0];assert.equal(identity.db,'neondb');assert.equal(identity.role,role);
   const inherited=(await client.query(`SELECT rolname,rolsuper,rolcreatedb,rolcreaterole,rolreplication,rolbypassrls FROM pg_roles WHERE pg_has_role(current_user,oid,'MEMBER')`)).rows;
   assert.equal(inherited.length,1);for(const r of inherited)for(const key of ['rolsuper','rolcreatedb','rolcreaterole','rolreplication','rolbypassrls'])assert.equal(r[key],false);
   assert.equal((await client.query("SELECT has_schema_privilege(current_user,'public','CREATE') AS allowed")).rows[0].allowed,false);
   assert.equal((await client.query("SELECT count(*)::int AS n FROM pg_class WHERE relnamespace='public'::regnamespace AND pg_has_role(current_user,relowner,'MEMBER')")).rows[0].n,0);
   for(const sql of ['CREATE TABLE public.c07_forbidden(id int)','TRUNCATE admin_audit','UPDATE admin_audit SET action=action','DELETE FROM admin_audit'])await assert.rejects(client.query(sql),e=>e.code==='42501');
  }
  const tables=(await pool.query("SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename")).rows.map(r=>r.tablename);
  assert.deepEqual(tables,['account','admin_access','admin_audit','admin_auth_attempt','admin_management','admin_session_activity','rateLimit','session','twoFactor','user','vcse_eoi','vcse_eoi_delivery','vcse_eoi_events','vcse_eoi_rate','verification']);
  for(const table of ['user','account','session','admin_access','admin_management','admin_audit'])await assert.rejects(intake.query(`SELECT * FROM "${table}"`),e=>e.code==='42501');
  for(const sql of ['UPDATE vcse_eoi SET payload=payload','DELETE FROM vcse_eoi','TRUNCATE vcse_eoi',"INSERT INTO vcse_eoi(id,fingerprint,payload,privacy_version,enquiry_route) VALUES(gen_random_uuid(),'forbidden','{}','test','uk_early_adopter')"])
   await assert.rejects(pool.query(sql),e=>e.code==='42501');
  await assert.rejects(intake.query('UPDATE vcse_eoi SET payload=payload'),e=>e.code==='42501');
  await assert.rejects(pool.query('SELECT last_error FROM vcse_eoi_delivery'),e=>e.code==='42501');
  console.log('PASS actual Neon: schema/Better Auth tables and both independent restricted runtime identities');

  const {hashPassword}=require('better-auth/crypto');
  await pool.query('INSERT INTO "user"(id,name,email,"emailVerified","createdAt","updatedAt") VALUES($1,$2,$3,true,now(),now())',[id,'Fictional C07 Reviewer',email]);
  await pool.query('INSERT INTO account(id,"accountId","providerId","userId",password,"createdAt","updatedAt") VALUES($1,$2,\'credential\',$2,$3,now(),now())',[randomUUID(),id,await hashPassword(password)]);
  await pool.query("INSERT INTO admin_access(user_id,role) VALUES($1,'Programme Reviewer')",[id]);
  const response=await auth.handler(new Request(process.env.ADMIN_AUTH_ORIGIN+'/api/auth/sign-in/email',{method:'POST',headers:{origin:process.env.ADMIN_AUTH_ORIGIN,'content-type':'application/json','x-forwarded-for':'192.0.2.7'},body:JSON.stringify({email,password})}));
  assert.equal(response.status,200);const cookie=response.headers.getSetCookie().map(c=>c.split(';')[0]).join('; ');assert.match(cookie,/session_token=/);
  const headers=new Headers({cookie});assert.equal((await records(headers)).entries.length,0);
  await assert.rejects(records(new Headers()));
  const schema=require('../lib/vcse-eoi-schema.ts'),signing=require('../lib/vcse-declaration-signing.ts');
  const {persist,rateLimit}=require('../lib/vcse-eoi.ts');
  process.env.VCSE_EOI_RATE_SALT=randomBytes(32).toString('hex');assert.equal(await rateLimit('fictional-c07-'+id),true);
  for(const country of ['GB','NG']){
   const raw={...Object.fromEntries(schema.fields.map(([key])=>[key,'Fictional C07 acceptance'])),organisation:`Fictional C07 ${country} ${id}`,country,operatingCountries:[country],email:`c07-${country}-${id}@example.org`,website:'https://example.org',staffSize:'1–5',volunteerSize:'6–10',participation:'ready_to_arrange',approver:'organisation_lead',timing:'one_to_three_months',commercialReadiness:country==='GB'?'existing_budget':'funded_access_needed',challenges:[schema.challenges[0]],selectionAcknowledged:true,purchaseBoundaryAcknowledged:true,privacyAcknowledged:true};
   const {data,errors}=schema.validateApplication(raw);assert.deepEqual(errors,{});assert.ok(data);
   const audit=signing.verifyPresentation(signing.createPresentation(data.enquiryRoute).token,data.enquiryRoute);assert.ok(audit);
   const receipt=await persist(data,audit);receipts.push(receipt);assert.equal(await persist(data,audit),receipt);
   const before=(await intake.query('SELECT * FROM vcse_eoi WHERE id=$1',[receipt])).rows[0];
   assert.equal((await intake.query('SELECT count(*)::int AS n FROM vcse_eoi_delivery WHERE application_id=$1',[receipt])).rows[0].n,2);
   // Suppress dummy queued mail so later delivery workers cannot send it.
   await intake.query("UPDATE vcse_eoi_delivery SET status='suppressed',last_error='Synthetic DB-only acceptance; no email authorised' WHERE application_id=$1",[receipt]);
   assert.equal((await pool.query('SELECT * FROM admin_management WHERE application_id=$1',[receipt])).rows.length,1);
   assert.ok(!(await records(headers)).entries.some(e=>e.source.id===receipt));
   await assert.rejects(saveRecord(headers,receipt,{history:[]},0));
   await pool.query('UPDATE admin_management SET reviewer_id=$1 WHERE application_id=$2',[id,receipt]);
   let entry=(await records(headers)).entries.find(e=>e.source.id===receipt);assert.ok(entry);assert.equal(entry.source.route,data.enquiryRoute);assert.equal(entry.source.declarations.privacyAcknowledged,true);assert.ok(entry.source.declarations.snapshot);assert.ok(entry.source.submittedAt);
   await assert.rejects(saveRecord(headers,receipt,{...entry.management,status:'Selected'},0));
   await assert.rejects(saveRecord(headers,receipt,{...entry.management,reviewer:other},0));
   await saveRecord(headers,receipt,{...entry.management,notes:'Fictional Neon assessment',classification:'Future prospect'},0);
   entry=(await records(headers)).entries.find(e=>e.source.id===receipt);assert.equal(entry.management.notes,'Fictional Neon assessment');assert.equal(entry.management.history.length,1);
   const results=await Promise.allSettled([saveRecord(headers,receipt,{...entry.management,notes:'Fictional concurrent A'},1),saveRecord(headers,receipt,{...entry.management,notes:'Fictional concurrent B'},1)]);
   assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal(results.find(r=>r.status==='rejected').reason.status,409);
   entry=(await records(headers)).entries.find(e=>e.source.id===receipt);assert.equal(entry.version,2);
   // Isolated audit permission failure must roll back the management transaction.
   await owner.query('REVOKE INSERT ON admin_audit FROM bloomshield_admin_staging');auditRevoked=true;
   try {await assert.rejects(saveRecord(headers,receipt,{...entry.management,notes:'Must roll back'},2),e=>e.code==='42501');}
   finally {await owner.query('GRANT INSERT ON admin_audit TO bloomshield_admin_staging');auditRevoked=false;}
   const after=(await records(headers)).entries.find(e=>e.source.id===receipt);assert.equal(after.version,2);assert.equal(after.management.notes,entry.management.notes);assert.equal(after.management.history.length,2);
   assert.deepEqual((await intake.query('SELECT * FROM vcse_eoi WHERE id=$1',[receipt])).rows[0],before);
   const audits=(await pool.query('SELECT * FROM admin_audit WHERE application_id=$1 ORDER BY id',[receipt])).rows;assert.equal(audits.length,2);assert.ok(audits.every(a=>a.actor===id&&a.action==='management.update'));assert.ok(!JSON.stringify(audits).includes('Fictional Neon assessment'));
   console.log(`PASS actual Neon: ${data.enquiryRoute} persisted, deduplicated, authorised DAL retrieval, scoped denial, source unchanged, conflict and audit rollback; receipt=${receipt}`);
  }
  // Fresh independent connection proves committed persistence beyond pool session.
  const fresh=await connect(adminUrl.toString());try{assert.equal((await fresh.query('SELECT count(*)::int AS n FROM vcse_eoi WHERE id=ANY($1::uuid[])',[receipts])).rows[0].n,2);}finally{await fresh.end();}
  console.log('PASS actual Neon: fresh-connection persistence; no email transport called');
 } finally {
  if(auditRevoked)await owner.query('GRANT INSERT ON admin_audit TO bloomshield_admin_staging');
  await pool.query('DELETE FROM session WHERE "userId"=$1',[id]);
  await pool.query('UPDATE admin_access SET active=false WHERE user_id=$1',[id]);
  await pool.end();await intake.end();await owner.end();
 }
});
