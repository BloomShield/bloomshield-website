/* eslint-disable @typescript-eslint/no-require-imports -- Node operator CLI. */
// Explicitly scoped staging tools. Never log child output containing credentials.
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const assert = require('node:assert/strict');
const {Client} = require('pg');
const project = 'long-bar-21726499';
const branch = 'br-hidden-violet-zaboc8g7';
function cli(...args) {
  assert.ok(process.env.C07_NEON_CLI, 'Set C07_NEON_CLI to the installed Neon cli.js');
  return execFileSync(process.execPath,[process.env.C07_NEON_CLI,'--no-analytics',...args],{encoding:'utf8',timeout:60000,stdio:['ignore','pipe','pipe']}).trim();
}
function metadata() {
  const p=JSON.parse(cli('projects','get',project,'--output','json'));
  assert.equal(p.id,project); assert.equal(p.name,'bloomshield-app001b-staging');
  assert.equal(p.org_id,'org-jolly-moon-22982519'); assert.equal(p.region_id,'aws-eu-west-2');
  const branches=JSON.parse(cli('branches','list','--project-id',project,'--output','json'));
  const b=branches.find(b=>b.id===branch);
  assert.ok(b); assert.equal(b.name,'production'); assert.equal(b.project_id,project);
  return {project,branch,region:p.region_id,database:'neondb',purpose:'synthetic staging only'};
}
function ownerUrl() {
  const uri=cli('connection-string',branch,'--project-id',project,'--database-name','neondb','--role-name','neondb_owner','--ssl','verify-full');
  const u=new URL(uri); assert.equal(u.pathname,'/neondb');
  assert.ok(u.hostname.endsWith('.eu-west-2.aws.neon.tech'));
  assert.equal(u.searchParams.get('sslmode'),'verify-full'); return uri;
}
async function connect(uri) {
  const c=new Client({connectionString:uri,connectionTimeoutMillis:20000,statement_timeout:30000});
  await c.connect(); return c;
}
async function inspect(c) {
  const identity=(await c.query('SELECT current_database() AS database,current_user AS role,session_user AS session_role')).rows[0];
  assert.equal(identity.database,'neondb');
  const objects=(await c.query(`SELECT n.nspname,c.relname,c.relkind FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname NOT LIKE 'pg_%' AND n.nspname<>'information_schema' ORDER BY 1,2`)).rows;
  const functions=(await c.query(`SELECT n.nspname,p.proname FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname NOT LIKE 'pg_%' AND n.nspname<>'information_schema' ORDER BY 1,2`)).rows;
  return {identity,objects,functions};
}
async function preflight() {
  const target=metadata(); const c=await connect(ownerUrl());
  try {const result=await inspect(c); console.log(JSON.stringify({target,...result},null,2));}
  finally {await c.end();}
}
function safeFailure(e) { console.error('BLOCKED/FAIL:',e.code || e.name || 'Error','(details suppressed to protect credentials)'); process.exitCode=1; }
module.exports={fs,path,assert,project,branch,cli,metadata,ownerUrl,connect,inspect,safeFailure};
if(require.main===module) preflight().catch(safeFailure);
