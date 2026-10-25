import { Denied } from "./access";
export async function jsonBody(request: Request, limit: number) {
  if(!request.headers.get("content-type")?.startsWith("application/json")) throw new Denied(415);
  const reader=request.body?.getReader(); if(!reader) throw new Denied(400);
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const chunk=await reader.read();if(chunk.done)break;size+=chunk.value.byteLength;if(size>limit){await reader.cancel();throw new Denied(413);}chunks.push(chunk.value);}
  try {return JSON.parse(Buffer.concat(chunks).toString("utf8"));} catch {throw new Denied(400);}
}
