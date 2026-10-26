/* eslint-disable @typescript-eslint/no-require-imports -- Node operator CLI. */
// One-shot empty-database setup. Refuses an existing schema or local env files.
const {fs,path,assert,metadata,ownerUrl,connect,inspect,safeFailure}=require('./c07-neon.cjs');
const {randomBytes,createHash}=require('node:crypto');
const hashes=['162e3e6a1c489592d05ffc21a3341a9a06a3882f86073e4f8d0e8ae1737a633f','5f736c03398d226c97c7bc25571185f30a2347859cfaff08e07c3bb960d4717e','5aaddd404744fbb3f98531bd106489b55c22f40f57bf9b436f1a978f4cbc1311','02b5c1ead68cafbe4661996af86be45a6096d9524717988868c4b5fc93d11e0e','80cfd92c6019f14225969f1896d6d22309b59e483b42f20f98859f6f3dd988f2','3328fdfb384fddc73948703460e8906948465b03de876ed0643f85d0320c3680','b4a4634eb0050f0f874434b682df934606e6f641a4904f724061c38058225d92'];
async function main(){
 assert.equal(process.argv[2],'--apply-empty-staging','Explicit apply flag required');
 const root=path.resolve(__dirname,'..'); process.chdir(root);
 for(const file of ['.env.local','admin/.env.local']) assert.ok(!fs.existsSync(file),'Local environment already exists; stop for review');
 const files=fs.readdirSync('docs/migrations').filter(f=>/^00[1-7]_/.test(f)).sort(); assert.equal(files.length,7);
 const sqls=files.map((f,i)=>{const sql=fs.readFileSync(path.join('docs/migrations',f),'utf8'); assert.equal(createHash('sha256').update(sql).digest('hex'),hashes[i],`Reviewed migration hash mismatch: ${f}`); return sql;});
 const target=metadata(), uri=ownerUrl(), c=await connect(uri);
 try {
  const state=await inspect(c); assert.equal(state.identity.role,'neondb_owner');
  assert.deepEqual(state.objects,[]); assert.deepEqual(state.functions,[]);
  const roles=(await c.query("SELECT rolname FROM pg_roles WHERE rolname IN ('bloomshield_intake_staging','bloomshield_admin_staging')")).rows;
  assert.deepEqual(roles,[],'Runtime roles already exist; stop for review');
  console.log(JSON.stringify({event:'verified-empty-target',target,at:new Date().toISOString()}));
  for(let i=0;i<6;i++){
   await c.query(sqls[i]);
   console.log(JSON.stringify({migration:files[i],sha256:hashes[i],result:'committed',at:new Date().toISOString()}));
  }
  // SQL creation avoids the provider role API's neon_superuser membership.
  const intakePassword=randomBytes(32).toString('hex'), adminPassword=randomBytes(32).toString('hex');
  await c.query('BEGIN');
  try {
   for(const [role,password] of [['bloomshield_intake_staging',intakePassword],['bloomshield_admin_staging',adminPassword]])
    await c.query(`CREATE ROLE ${role} LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS PASSWORD '${password}'`);
   await c.query('REVOKE CREATE ON SCHEMA public FROM PUBLIC');
   await c.query('GRANT CONNECT ON DATABASE neondb TO bloomshield_intake_staging,bloomshield_admin_staging');
   await c.query('COMMIT');
  }catch(e){await c.query('ROLLBACK');throw e;}
  function runtimeUrl(role,password){const u=new URL(uri);u.username=role;u.password=password;return u.toString();}
  // Exclusive creation prevents overwriting an operator's existing configuration.
  fs.writeFileSync('.env.local',`# Isolated Neon synthetic staging; never deploy this file.\nVCSE_EOI_DATABASE_URL=${runtimeUrl('bloomshield_intake_staging',intakePassword)}\nVCSE_EOI_ENVIRONMENT=staging\nVCSE_EOI_OPEN=false\nVCSE_EOI_LISTED=false\n`,{flag:'wx',mode:0o600});
  fs.writeFileSync('admin/.env.local',`# Isolated Neon synthetic staging; auth remains closed until separately configured.\nADMIN_DATABASE_URL=${runtimeUrl('bloomshield_admin_staging',adminPassword)}\nADMIN_STAGING_ENABLED=false\nADMIN_DATA_CLASSIFICATION=synthetic\n`,{flag:'wx',mode:0o600});
  const grants=sqls[6].slice(sqls[6].indexOf('BEGIN;'),sqls[6].indexOf('COMMIT;')+7).replaceAll(':"admin_runtime_role"','"bloomshield_admin_staging"');
  assert.ok(!grants.includes('\\')&&!grants.includes(':"'));
  await c.query(grants);
  console.log(JSON.stringify({migration:files[6],sha256:hashes[6],result:'committed',method:'same SQL, psql role substitution resolved to fixed runtime role',at:new Date().toISOString()}));
  await c.query(`BEGIN;
   GRANT USAGE ON SCHEMA public TO bloomshield_intake_staging;
   GRANT SELECT,INSERT ON vcse_eoi TO bloomshield_intake_staging;
   GRANT UPDATE(fingerprint) ON vcse_eoi TO bloomshield_intake_staging;
   GRANT SELECT,INSERT,UPDATE ON vcse_eoi_delivery,vcse_eoi_rate,vcse_eoi_events TO bloomshield_intake_staging;
   GRANT DELETE ON vcse_eoi_rate,vcse_eoi_events TO bloomshield_intake_staging;
   COMMIT;`);
  console.log(JSON.stringify({event:'runtime-configured',roles:['bloomshield_intake_staging','bloomshield_admin_staging'],ownerStored:false,at:new Date().toISOString()}));
 } finally {await c.end();}
}
main().catch(safeFailure);
