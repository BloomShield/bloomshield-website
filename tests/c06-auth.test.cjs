const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const {PGlite}=require('@electric-sql/pglite');
const {randomUUID,createHmac}=require('node:crypto');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,f);
Object.assign(process.env,{ADMIN_STAGING_ENABLED:'true',ADMIN_DATA_CLASSIFICATION:'synthetic',ADMIN_DATABASE_URL:'postgres://unused',ADMIN_AUTH_ORIGIN:'https://staging.example.org',BETTER_AUTH_SECRET:'dummy-test-secret-only-01234567890123456789'});
const origin=process.env.ADMIN_AUTH_ORIGIN;
let db,auth,lastReset;
const query=async(text,params)=>{const result=await db.query(typeof text==='string'?text:text.text,params??text.values);return {...result,rowCount:result.rows.length || result.affectedRows || 0};};
const pool={query,connect:async()=>({query,release(){},on(){},off(){}}),end:async()=>{},on(){}};
const authModule=require('../admin/lib/auth.ts');
const dbModule=require('../admin/lib/db.ts');dbModule.database=()=>pool;
const {principal}=require('../admin/lib/access.ts');
const {records,saveRecord}=require('../admin/lib/records.ts');
const {invite}=require('../admin/lib/users.ts');
const {POST:usersPost}=require('../admin/app/api/users/route.ts');
const {GET:recordsGet,POST:recordsPost}=require('../admin/app/api/records/route.ts');
const {GET:authGet,POST:authPost}=require('../admin/app/api/auth/[...all]/route.ts');
const password='Fictional staging password 928!';
const ids={reviewer:randomUUID(),other:randomUUID(),admin:randomUUID(),eoi:randomUUID(),otherEoi:randomUUID()};
const cookies=response=>response.headers.getSetCookie().map(c=>c.split(';')[0]).join('; ');
async function call(path,body,cookie='',method='POST') {const request=new Request(origin+'/api/auth/'+path,{method,headers:{origin,'content-type':'application/json','x-forwarded-for':'192.0.2.1',cookie},...(method==='POST'?{body:JSON.stringify(body??{})}:{})});return auth.handler(request);}
function totp(uri){const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';let bits='';for(const c of new URL(uri).searchParams.get('secret').toUpperCase())bits+=chars.indexOf(c).toString(2).padStart(5,'0');const bytes=[];for(let i=0;i+8<=bits.length;i+=8)bytes.push(parseInt(bits.slice(i,i+8),2));const counter=Buffer.alloc(8);counter.writeBigUInt64BE(BigInt(Math.floor(Date.now()/30000)));const hash=createHmac('sha1',Buffer.from(bytes)).update(counter).digest();const offset=hash.at(-1)&15;return String((hash.readUInt32BE(offset)&0x7fffffff)%1000000).padStart(6,'0');}
async function login(name){const response=await call('sign-in/email',{email:name+'@example.org',password});assert.equal(response.status,200);return cookies(response);}
before(async()=>{
 db=new PGlite();
 for(const f of ['001_vcse_eoi.sql','002_vcse_international_interest.sql','003_vcse_declaration_audit.sql','004_vcse_structured_answers.sql','005_admin_auth.sql','006_admin_management.sql'])await db.exec(fs.readFileSync('docs/migrations/'+f,'utf8'));
 auth=authModule.createAuth(pool);auth.options.rateLimit.enabled=false;auth.options.emailAndPassword.sendResetPassword=async({url})=>{lastReset=url;};authModule.authentication=()=>auth;
 const {hashPassword}=require('better-auth/crypto');const hash=await hashPassword(password);
 for(const name of ['reviewer','other','admin']){
  await query('INSERT INTO "user"(id,name,email,"emailVerified","createdAt","updatedAt","twoFactorEnabled") VALUES($1,$2,$3,true,now(),now(),false)',[ids[name],name,name+'@example.org']);
  await query('INSERT INTO account(id,"accountId","providerId","userId",password,"createdAt","updatedAt") VALUES($1,$2,\'credential\',$2,$3,now(),now())',[randomUUID(),ids[name],hash]);
  await query('INSERT INTO admin_access(user_id,role) VALUES($1,$2)',[ids[name],name==='admin'?'Administrator':'Programme Reviewer']);
 }
 for(const [id,route] of [[ids.eoi,'uk_early_adopter'],[ids.otherEoi,'international_interest']])await query('INSERT INTO vcse_eoi(id,fingerprint,payload,privacy_version,enquiry_route) VALUES($1,$2,$3,\'dummy\',$4)',[id,id,JSON.stringify({organisation:'Fictional test only',contactName:'Dummy'}),route]);
 await query('UPDATE admin_management SET reviewer_id=$1 WHERE application_id=$2',[ids.reviewer,ids.eoi]);
});
after(async()=>db?.close());
test('public signup blocked; anonymous data and user APIs denied; CSRF rejected',async()=>{
 assert.equal((await authPost(new Request(origin+'/api/auth/sign-up/email',{method:'POST',headers:{origin,'content-type':'application/json'},body:'{}'}))).status,404);
 assert.equal((await recordsGet(new Request(origin+'/api/records'))).status,401);
 assert.equal((await recordsPost(new Request(origin+'/api/records',{method:'POST',headers:{origin:'https://evil.example'},body:'{}'}))).status,403);
 assert.equal((await usersPost(new Request(origin+'/api/users',{method:'POST',headers:{origin,'content-type':'application/json'},body:'{}'}))).status,401);
 assert.equal((await authGet(new Request(origin+'/api/auth/admin/create-user'))).status,404);
});
test('real password session cookies, assigned SQL scope and transactional audit/concurrency',async()=>{
 const cookie=await login('reviewer');assert.match(cookie,/session_token=/);
 const response=await call('sign-in/email',{email:'other@example.org',password});const set=response.headers.getSetCookie().join(';');for(const attr of ['HttpOnly','Secure','SameSite=Lax'])assert.ok(set.includes(attr),attr);
 const headers=new Headers({cookie});const initial=await records(headers);assert.deepEqual(initial.entries.map(e=>e.source.id),[ids.eoi]);
 const entry=initial.entries[0];const source=(await query('SELECT payload FROM vcse_eoi WHERE id=$1',[ids.eoi])).rows[0];
 await assert.rejects(saveRecord(headers,ids.otherEoi,entry.management,0));
 await assert.rejects(saveRecord(headers,ids.eoi,{...entry.management,status:'Selected'},0));
 await assert.rejects(saveRecord(headers,ids.eoi,{...entry.management,reviewer:ids.other},0));
 await saveRecord(headers,ids.eoi,{...entry.management,notes:'Dummy assessment',classification:'Future prospect'},0);
 await assert.rejects(saveRecord(headers,ids.eoi,entry.management,0));
 assert.deepEqual((await query('SELECT payload FROM vcse_eoi WHERE id=$1',[ids.eoi])).rows[0],source);
 const result=await records(headers);assert.equal(result.entries[0].management.notes,'Dummy assessment');assert.equal(result.entries[0].management.history.length,1);
 const audit=(await query('SELECT * FROM admin_audit WHERE application_id=$1',[ids.eoi])).rows[0];assert.equal(audit.actor,ids.reviewer);assert.deepEqual(audit.fields,['classification','notes']);assert.ok(!JSON.stringify(audit).includes('Dummy assessment'));
 await assert.rejects(query('DELETE FROM admin_audit'));
 // Audit failure rolls back the management write.
 await db.exec(`CREATE FUNCTION fail_dummy_audit() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'test'; END $$; CREATE TRIGGER fail_dummy BEFORE INSERT ON admin_audit FOR EACH ROW EXECUTE FUNCTION fail_dummy_audit();`);
 await assert.rejects(saveRecord(headers,ids.eoi,{...result.entries[0].management,notes:'Must roll back'},1));
 await db.exec('DROP TRIGGER fail_dummy ON admin_audit; DROP FUNCTION fail_dummy_audit();');
 assert.equal((await records(headers)).entries[0].management.notes,'Dummy assessment');
});
test('administrator MFA gates records; real TOTP enrollment and login challenge',async()=>{
 let cookie=await login('admin');const earlierCookie=await login('admin');await assert.rejects(principal(new Headers({cookie})));
 const setup=await call('two-factor/enable',{password},cookie);assert.equal(setup.status,200);const body=await setup.json();assert.ok(body.totpURI);
 cookie=[cookie,cookies(setup)].filter(Boolean).join('; ');
 const verified=await call('two-factor/verify-totp',{code:totp(body.totpURI),trustDevice:false},cookie);assert.equal(verified.status,200);
 await assert.rejects(principal(new Headers({cookie:earlierCookie})));const challenge=await call('sign-in/email',{email:'admin@example.org',password});assert.equal((await challenge.json()).twoFactorRedirect,true);
 const completed=await call('two-factor/verify-totp',{code:totp(body.totpURI),trustDevice:false},cookies(challenge));assert.equal(completed.status,200);
 const actor=await principal(new Headers({cookie:cookies(completed)}));assert.equal(actor.role,'Administrator');
 assert.equal((await records(new Headers({cookie:cookies(completed)}))).entries.length,2);
});
test('single-use password reset revokes old sessions; expired tokens refused',async()=>{
 const cookie=await login('other');await call('request-password-reset',{email:'other@example.org',redirectTo:origin+'/login'});assert.ok(lastReset);
 const token=new URL(lastReset).pathname.split('/').at(-1);
 const result=await call('reset-password',{token,newPassword:password+' changed'});assert.equal(result.status,200);
 assert.equal((await call('reset-password',{token,newPassword:password+' replay'})).status,400);
 await assert.rejects(principal(new Headers({cookie})));
 await call('request-password-reset',{email:'other@example.org',redirectTo:origin+'/login'});const expired=new URL(lastReset).pathname.split('/').at(-1);await query('UPDATE verification SET "expiresAt"=now()-interval \'1 hour\'');
 assert.equal((await call('reset-password',{token:expired,newPassword:password+' expired'})).status,400);
});
test('account deactivation denies existing sessions; absolute expiry enforced',async()=>{
 const cookie=await login('reviewer');await query('UPDATE admin_access SET active=false WHERE user_id=$1',[ids.reviewer]);await assert.rejects(principal(new Headers({cookie})));await query('UPDATE admin_access SET active=true WHERE user_id=$1',[ids.reviewer]);
 await query('UPDATE session SET "createdAt"=now()-interval \'9 hours\' WHERE "userId"=$1',[ids.reviewer]);await assert.rejects(principal(new Headers({cookie})));
});
test('invitation creates only hashed inaccessible credential and reset link; duplicate fails safely',async()=>{
 process.env.ADMIN_TEST_EMAILS='invited@example.org';await invite('invited@example.org','Programme Reviewer',ids.admin);const row=(await query('SELECT a.password FROM account a JOIN "user" u ON u.id=a."userId" WHERE u.email=$1',['invited@example.org'])).rows[0];assert.ok(row.password);assert.ok(!row.password.includes('invited'));assert.ok(lastReset);await assert.rejects(invite('invited@example.org','Programme Reviewer',ids.admin));await assert.rejects(invite('unapproved@example.org','Administrator',ids.admin));
});
test('database login limiter rejects repeated attempts',async()=>{
 const limited=authModule.createAuth(pool);let response;for(let i=0;i<7;i++)response=await limited.handler(new Request(origin+'/api/auth/sign-in/email',{method:'POST',headers:{origin,'content-type':'application/json','x-forwarded-for':'192.0.2.99'},body:JSON.stringify({email:'unknown@example.org',password:'wrong-password'})}));assert.equal(response.status,429);
});


test('atomic account limits work across changing client IPs and cover unknown resets',async()=>{
 let result;
 for(let i=0;i<6;i++)result=await authPost(new Request(origin+'/api/auth/sign-in/email',{method:'POST',headers:{origin,'content-type':'application/json','x-forwarded-for':'192.0.2.'+(100+i)},body:JSON.stringify({email:'limited@example.org',password:'dummy invalid password'})}));
 assert.equal(result.status,429);
 for(let i=0;i<4;i++)result=await authPost(new Request(origin+'/api/auth/request-password-reset',{method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify({email:'reset-limit@example.org',redirectTo:origin+'/login'})}));
 assert.equal(result.status,429);assert.ok(!(JSON.stringify((await query('SELECT * FROM admin_auth_attempt')).rows)).includes('limited@example.org'));
});
test('idle expiry cannot be bypassed by cookie refresh',async()=>{
 const cookie=await login('reviewer');const headers=new Headers({cookie});await principal(headers);
 await query('UPDATE admin_session_activity SET last_seen=now()-interval \'31 minutes\'');
 await call('get-session',{},cookie,'GET');await assert.rejects(principal(headers));
});
test('runtime source and audit mutation grants are denied in PostgreSQL',async()=>{
 await db.exec('CREATE ROLE c06_runtime NOLOGIN; GRANT USAGE ON SCHEMA public TO c06_runtime; GRANT SELECT ON vcse_eoi TO c06_runtime; GRANT SELECT,INSERT ON admin_audit TO c06_runtime; SET ROLE c06_runtime;');
 try {
  assert.equal((await query('SELECT id FROM vcse_eoi')).rows.length,2);
  await assert.rejects(query('UPDATE vcse_eoi SET payload=\'{}\''));
  await assert.rejects(query('DELETE FROM vcse_eoi'));
  await assert.rejects(query('DELETE FROM admin_audit'));
  await assert.rejects(query('TRUNCATE admin_audit'));
  await assert.rejects(query('SELECT password FROM account'));
 } finally {await db.exec('RESET ROLE');}
});
test('dummy UK/international intake integrates with persistent dashboard through production SQL',async()=>{
 const Module=require('node:module');const path=require('node:path');const originalLoad=Module._load;const originalFetch=global.fetch;
 Module._load=function(name,parent,main){if(name==='@neondatabase/serverless')return {neon:()=>async(strings,...values)=>(await query(strings.reduce((s,p,i)=>s+(i?'$'+i:'')+p,''),values)).rows};if(name.startsWith('@/'))return originalLoad.call(this,path.resolve(name.slice(2)),parent,main);return originalLoad.call(this,name,parent,main);};
 try {
  Object.assign(process.env,{VCSE_EOI_OPEN:'true',VCSE_EOI_ORIGIN:'https://intake.example.org',VCSE_EOI_ENVIRONMENT:'staging',VCSE_EOI_DATABASE_URL:'dummy',RESEND_API_KEY:'dummy',VCSE_EOI_FROM_EMAIL:'sender@example.org',VCSE_EOI_TO_EMAIL:'team@example.org',VCSE_EOI_RATE_SALT:'dummy',VCSE_EOI_RETRY_SECRET:'dummy',VCSE_EOI_WEBHOOK_SECRET:'whsec_dGVzdA==',VCSE_EOI_DECLARATION_SECRET:'dummy-declaration-secret'});
  let sent=0;global.fetch=async()=>{sent++;return Response.json({id:'dummy-mail-'+sent});};
  const schema=require('../lib/vcse-eoi-schema.ts');const signing=require('../lib/vcse-declaration-signing.ts');const api=require('../app/api/vcse-eoi/route.ts');
  const submit=body=>api.POST(new Request('https://intake.example.org/api/vcse-eoi',{method:'POST',headers:{origin:'https://intake.example.org','content-type':'application/json'},body:JSON.stringify(body)}));
  const cookie=await login('reviewer');
  for(const country of ['GB','NG']){
   const route=country==='GB'?'uk_early_adopter':'international_interest';
   const body={...Object.fromEntries(schema.fields.map(([key])=>[key,'Fictional test'])),country,operatingCountries:[country],email:'dummy-'+country+'@example.org',website:'https://example.org',staffSize:'1–5',volunteerSize:'6–10',participation:'ready_to_arrange',approver:'organisation_lead',timing:'one_to_three_months',commercialReadiness:country==='GB'?'existing_budget':'funded_access_needed',challenges:[schema.challenges[0]],selectionAcknowledged:true,purchaseBoundaryAcknowledged:true,privacyAcknowledged:true,presentationToken:signing.createPresentation(route).token};
   const response=await submit(body);assert.equal(response.status,200);const receipt=(await response.json()).receipt;assert.ok(receipt);
   assert.equal((await (await submit(body)).json()).receipt,receipt);
   assert.equal((await query('SELECT * FROM admin_management WHERE application_id=$1',[receipt])).rows.length,1);
   await query('UPDATE admin_management SET reviewer_id=$1 WHERE application_id=$2',[ids.reviewer,receipt]);
   const entry=(await records(new Headers({cookie}))).entries.find(e=>e.source.id===receipt);assert.ok(entry);assert.equal(entry.source.route,route);assert.equal(entry.source.declarations.privacyAcknowledged,true);assert.ok(entry.source.declarations.snapshot);assert.ok(entry.source.submittedAt);assert.deepEqual(entry.source.delivery,['sent','sent']);
   await saveRecord(new Headers({cookie}),receipt,{...entry.management,notes:'Dummy intake assessment',classification:'Future prospect'},0);
   assert.equal((await records(new Headers({cookie}))).entries.find(e=>e.source.id===receipt).management.notes,'Dummy intake assessment');
  }
  assert.equal(sent,4);
 } finally {Module._load=originalLoad;global.fetch=originalFetch;}
});


test('staging gate denies production, malformed origins and incomplete credentials',()=>{
 const {stagingAllowed}=require('../admin/lib/staging.ts');const env={ADMIN_STAGING_ENABLED:'true',ADMIN_DATA_CLASSIFICATION:'synthetic',ADMIN_DATABASE_URL:'dummy',ADMIN_AUTH_ORIGIN:'https://staging.example.org',BETTER_AUTH_SECRET:'dummy-test-secret-only-01234567890123456789'};
 assert.equal(stagingAllowed(env),true);
 for(const extra of [{VERCEL_ENV:'production'},{ADMIN_DATA_CLASSIFICATION:'live'},{ADMIN_AUTH_ORIGIN:'http://staging.example.org'},{ADMIN_AUTH_ORIGIN:'invalid'},{BETTER_AUTH_SECRET:'short'},{ADMIN_DATABASE_URL:''},{ADMIN_STAGING_ENABLED:'false'}])assert.equal(stagingAllowed({...env,...extra}),false);
});
