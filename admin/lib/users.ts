import { randomBytes, randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { database } from "./db";
import { authentication } from "./auth";
import { Denied, principal } from "./access";
import type { Role } from "./model";
export async function invite(email: string, role: Role, actor: string) {
  if (!["Administrator","Programme Reviewer"].includes(role) || typeof email!=="string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Denied(400);
  email=email.toLowerCase().trim();
  if (!(process.env.ADMIN_TEST_EMAILS ?? "").split(",").map(s=>s.trim().toLowerCase()).includes(email)) throw new Denied(400);
  const id=randomUUID();
  // Nobody knows the initial password. The invitee sets their own using the
  // library's expiring, single-use reset flow; passwords never leave that flow.
  const hash=await hashPassword(randomBytes(48).toString("base64url"));
  const client=await database().connect();
  try {
    await client.query("BEGIN");
    await client.query('INSERT INTO "user"(id,name,email,"emailVerified","createdAt","updatedAt","twoFactorEnabled") VALUES($1,$2,$2,false,now(),now(),false)',[id,email]);
    await client.query('INSERT INTO account(id,"accountId","providerId","userId",password,"createdAt","updatedAt") VALUES($1,$2,\'credential\',$2,$3,now(),now())',[randomUUID(),id,hash]);
    await client.query("INSERT INTO admin_access(user_id,role) VALUES($1,$2)",[id,role]);
    await client.query("INSERT INTO admin_audit(actor,action,fields) VALUES($1,'user.invite',$2)",[actor,JSON.stringify([id,role])]);
    await client.query("COMMIT");
  } catch(error) {await client.query("ROLLBACK"); throw error;} finally {client.release();}
  // A delivery failure leaves a safe, inaccessible account. Resend via reset.
  await authentication().api.requestPasswordReset({body:{email,redirectTo:`${process.env.ADMIN_AUTH_ORIGIN}/login`}});
}
export async function manageUser(headers: Headers, body: {email:string;role:Role;userId?:string;active?:boolean}) {
  const actor=await principal(headers); if(actor.role!=="Administrator") throw new Denied();
  if(!body.userId) return invite(body.email,body.role,actor.id);
  if(body.userId===actor.id || typeof body.active!=="boolean" || !["Administrator","Programme Reviewer"].includes(body.role)) throw new Denied(400);
  const client=await database().connect();
  try {
    await client.query("BEGIN");
    const changed=await client.query("UPDATE admin_access SET active=$1,role=$2 WHERE user_id=$3 RETURNING user_id",[body.active,body.role,body.userId]);
    if(!changed.rowCount) throw new Denied(404);
    await client.query('DELETE FROM session WHERE "userId"=$1',[body.userId]);
    await client.query("INSERT INTO admin_audit(actor,action,fields) VALUES($1,'user.access',$2)",[actor.id,JSON.stringify([body.userId,"active","role"])]);
    await client.query("COMMIT");
  } catch(error) {await client.query("ROLLBACK"); throw error;} finally {client.release();}
}
