import { authentication } from "./auth";
import { database } from "./db";
import type { Role } from "./model";
export class Denied extends Error { constructor(public status = 403) { super("Access unavailable"); } }
export async function principal(headers: Headers) {
  const session = await authentication().api.getSession({ headers, query:{disableRefresh:true} });
  if (!session) throw new Denied(401);
  const activity=await database().query(`INSERT INTO admin_session_activity(session_id,last_seen) VALUES($1,$2)
    ON CONFLICT(session_id) DO UPDATE SET last_seen=now()
    WHERE admin_session_activity.last_seen>now()-interval '30 minutes' RETURNING last_seen`,[session.session.id,session.session.createdAt]);
  if(Date.now()-new Date(session.session.createdAt).getTime()>8*60*60*1000 || !activity.rows.length || Date.now()-new Date(activity.rows[0].last_seen).getTime()>30*60*1000) {
    await database().query('DELETE FROM session WHERE id=$1',[session.session.id]);
    throw new Denied(401);
  }
  const { rows } = await database().query<{role: Role}>("SELECT role FROM admin_access WHERE user_id=$1 AND active=true", [session.user.id]);
  const role = rows[0]?.role;
  if (!role || (role === "Administrator" && !session.user.twoFactorEnabled)) throw new Denied();
  await database().query("UPDATE admin_session_activity SET last_seen=now() WHERE session_id=$1",[session.session.id]);
  return { id: session.user.id, role };
}
export function sameOrigin(request: Request) {
  if (request.headers.get("origin") !== process.env.ADMIN_AUTH_ORIGIN) throw new Denied();
}
export function failure(error: unknown) {
  return Response.json({ error: "Access unavailable" }, { status: error instanceof Denied ? error.status : 503, headers: { "Cache-Control": "no-store" } });
}
