import { manageUser } from "../../../lib/users";
import { sameOrigin, failure, principal, Denied } from "../../../lib/access";
import { database } from "../../../lib/db";
import { jsonBody } from "../../../lib/request";
export const runtime="nodejs";
export async function GET(request: Request) {
  try {
    if((await principal(request.headers)).role!=="Administrator") throw new Denied();
    const users=await database().query('SELECT a.user_id,a.role,a.active,u.email FROM admin_access a JOIN "user" u ON u.id=a.user_id ORDER BY u.email');
    const events=await database().query("SELECT id,at,actor,action,application_id,fields FROM admin_audit ORDER BY id DESC LIMIT 100");
    return Response.json({users:users.rows,events:events.rows},{headers:{"Cache-Control":"no-store"}});
  } catch(error) {return failure(error);}
}
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    await manageUser(request.headers,await jsonBody(request,2000));
    return Response.json({saved:true});
  } catch(error) {return failure(error);}
}
