import {getAuthTables} from 'better-auth/db';
import {twoFactor} from 'better-auth/plugins';
import {writeFileSync} from 'node:fs';
const schema=getAuthTables({plugins:[twoFactor()],rateLimit:{storage:'database'}});
const quote=s=>'"'+s.replaceAll('"','""')+'"';
let sql='-- Generated from pinned Better Auth 1.7.12 schema. Isolated dummy staging only.\nBEGIN;\n';
for(const [name,table] of Object.entries(schema)) {
 const fields=['id text PRIMARY KEY'];
 for(const [key,f] of Object.entries(table.fields)) {
  let line=quote(f.fieldName??key)+' '+({string:'text',boolean:'boolean',date:'timestamptz',number:f.bigint?'bigint':'integer'}[f.type]);
  if(f.required) line+=' NOT NULL';
  if(f.unique) line+=' UNIQUE';
  if(f.defaultValue!==undefined && typeof f.defaultValue!=='function') line+=' DEFAULT '+(typeof f.defaultValue==='string'?"'"+f.defaultValue.replaceAll("'","''")+"'":String(f.defaultValue));
  if(f.references) line+=' REFERENCES '+quote(f.references.model)+'('+quote(f.references.field)+') ON DELETE '+(f.references.onDelete??'cascade').toUpperCase();
  fields.push(line);
 }
 sql+='CREATE TABLE '+quote(table.modelName??name)+' (\n '+fields.join(',\n ')+'\n);\n';
 for(const [key,f] of Object.entries(table.fields)) if(f.index)sql+='CREATE INDEX '+quote(name+'_'+key+'_idx')+' ON '+quote(table.modelName??name)+'('+quote(f.fieldName??key)+');\n';
 sql+='REVOKE ALL ON '+quote(table.modelName??name)+' FROM PUBLIC;\n';
}
writeFileSync('docs/migrations/005_admin_auth.sql',sql+'COMMIT;\n');
