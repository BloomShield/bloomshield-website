import { records } from "../../../lib/records";
import { failure, sameOrigin } from "../../../lib/access";
import { saveRecord } from "../../../lib/records";
import { jsonBody } from "../../../lib/request";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try { return Response.json(await records(request.headers),{headers:{"Cache-Control":"no-store"}}); }
  catch(error) {return failure(error);}
}
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const {id,management,version}=await jsonBody(request,400000);
    await saveRecord(request.headers,id,management,version);
    return Response.json({saved:true});
  } catch(error) {return failure(error);}
}
