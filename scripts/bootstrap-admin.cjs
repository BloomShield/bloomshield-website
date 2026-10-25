/* eslint-disable @typescript-eslint/no-require-imports -- Node operator CLI loads the TypeScript server modules. */
// Run manually against verified isolated dummy staging, never as a web endpoint.
const fs=require('node:fs');
const ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,f);
async function main(){
 const {database}=require('../admin/lib/db.ts');
 const {invite}=require('../admin/lib/users.ts');
 const db=database();
 try {
  const count=await db.query("SELECT 1 FROM admin_access WHERE role='Administrator'");
  if(count.rowCount)throw new Error('An administrator already exists. Use authenticated staff management.');
  if(!process.env.ADMIN_BOOTSTRAP_EMAIL)throw new Error('Set ADMIN_BOOTSTRAP_EMAIL to an approved dummy mailbox.');
  await invite(process.env.ADMIN_BOOTSTRAP_EMAIL,'Administrator','operator.bootstrap');
  console.log('Invitation requested. Check the approved test mailbox, set password and enrol MFA.');
 } finally {await db.end();}
}
main().catch(()=>{console.error('Bootstrap failed. Check configuration and migration status; no credentials were printed.');process.exitCode=1;});
