import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { configured, database, deliver } from "@/lib/vcse-eoi";
export const runtime = "nodejs";
export const maxDuration = 300;
export async function POST(request: Request) {
  const expected = `Bearer ${process.env.VCSE_EOI_RETRY_SECRET || ""}`;
  const provided = request.headers.get("authorization") || "";
  if (!process.env.VCSE_EOI_RETRY_SECRET || Buffer.byteLength(expected) !== Buffer.byteLength(provided) || !timingSafeEqual(Buffer.from(expected), Buffer.from(provided))) return new NextResponse(null, { status: 401 });
  if (!configured()) return new NextResponse(null, { status: 503 });
  try {
    await deliver();
    const sql = database();
    await sql`DELETE FROM vcse_eoi_rate WHERE expires_at < now()`;
    await sql`DELETE FROM vcse_eoi_events WHERE received_at < now() - interval '2 days'`;
    const rows = await sql`SELECT count(*)::int AS outstanding FROM vcse_eoi_delivery WHERE status NOT IN ('sent','delivered')`;
    return NextResponse.json({ outstanding: rows[0].outstanding }, { headers: { "Cache-Control": "no-store" } });
  } catch { return new NextResponse(null, { status: 503 }); }
}
