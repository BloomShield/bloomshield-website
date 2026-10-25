import { authentication } from "../../../../lib/auth";
import { database } from "../../../../lib/db";
import { failure, sameOrigin, Denied } from "../../../../lib/access";
import { createHmac } from "node:crypto";
import { jsonBody } from "../../../../lib/request";
export const runtime = "nodejs";
const allowed = new Set(["sign-in/email", "sign-out", "get-session", "request-password-reset", "reset-password", "two-factor/enable", "two-factor/verify-totp", "two-factor/verify-backup-code", "revoke-session", "revoke-sessions", "list-sessions"]);
async function handle(request: Request) {
  try {
    const path = new URL(request.url).pathname.replace("/api/auth/", "");
    if (!allowed.has(path) && !(request.method==='GET' && /^reset-password\/[A-Za-z0-9_-]+$/.test(path))) throw new Denied(404);
    if (request.method !== "GET") sameOrigin(request);
    const body=request.method==='POST'?await jsonBody(request.clone(),4000):undefined;
    if(request.method==='POST' && (path==='sign-in/email'||path==='request-password-reset')) {
      if(typeof body.email!=='string') throw new Denied(400);
      const key=createHmac('sha256',process.env.BETTER_AUTH_SECRET!).update(path+':'+body.email.trim().toLowerCase()).digest('hex');
      const {rows}=await database().query(`INSERT INTO admin_auth_attempt(key,count,expires_at) VALUES($1,1,now()+interval '15 minutes')
        ON CONFLICT(key) DO UPDATE SET count=CASE WHEN admin_auth_attempt.expires_at<now() THEN 1 ELSE admin_auth_attempt.count+1 END,
        expires_at=CASE WHEN admin_auth_attempt.expires_at<now() THEN now()+interval '15 minutes' ELSE admin_auth_attempt.expires_at END RETURNING count`,[key]);
      if(rows[0].count>(path==='sign-in/email'?5:3)) throw new Denied(429);
    }
    // Audit only endpoint and result; never bodies, email addresses, cookies or tokens.
    const result = await authentication().handler(request);
    if (request.method !== "GET") await database().query("INSERT INTO admin_audit(actor,action,fields) VALUES(NULL,$1,$2)", [`auth.${path}`, JSON.stringify([String(result.status)])]);
    result.headers.set("Cache-Control", "no-store");
    return result;
  } catch (error) { return failure(error); }
}
export const GET = handle;
export const POST = handle;
