import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { database } from "@/lib/vcse-eoi";
export const runtime = "nodejs";
const states: Record<string, string> = { "email.delivered": "delivered", "email.bounced": "bounced", "email.complained": "complained", "email.failed": "provider_failed", "email.delivery_delayed": "delayed", "email.suppressed": "suppressed" };
export async function POST(request: Request) {
  const secret = process.env.VCSE_EOI_WEBHOOK_SECRET;
  if (!secret?.startsWith("whsec_") || !process.env.VCSE_EOI_DATABASE_URL) return new NextResponse(null, { status: 503 });
  const id = request.headers.get("svix-id"), timestamp = request.headers.get("svix-timestamp"), signatures = request.headers.get("svix-signature");
  if (!id || !timestamp || !signatures || !/^\d+$/.test(timestamp) || Math.abs(Date.now()/1000 - Number(timestamp)) > 300) return new NextResponse(null, { status: 400 });
  const reader = request.body?.getReader();
  if (!reader) return new NextResponse(null, { status: 400 });
  const parts: Uint8Array[] = []; let size = 0;
  while (true) { const part = await reader.read(); if (part.done) break; size += part.value.byteLength; if (size > 64_000) { await reader.cancel(); return new NextResponse(null, {status:413}); } parts.push(part.value); }
  const raw = Buffer.concat(parts).toString("utf8");
  const expected = createHmac("sha256", Buffer.from(secret.slice(6), "base64")).update(`${id}.${timestamp}.${raw}`).digest();
  const verified = signatures.split(" ").some(signature => {
    if (!signature.startsWith("v1,")) return false;
    const actual = Buffer.from(signature.slice(3), "base64");
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  });
  if (!verified) return new NextResponse(null, { status: 400 });
  try {
    const event = JSON.parse(raw);
    const state = states[event.type];
    if (!state) return new NextResponse(null, { status: 204 });
    if (typeof event.data?.email_id !== "string" || !Number.isFinite(Date.parse(event.created_at))) return new NextResponse(null, { status: 400 });
    const sql = database();
    await sql`WITH saved AS (
      INSERT INTO vcse_eoi_events (provider_id, status, event_at)
      VALUES (${event.data.email_id}, ${state}, ${event.created_at}::timestamptz)
      ON CONFLICT (provider_id) DO UPDATE SET status = EXCLUDED.status, event_at = EXCLUDED.event_at, received_at = now()
      WHERE vcse_eoi_events.event_at < EXCLUDED.event_at
        AND (vcse_eoi_events.status NOT IN ('bounced','complained','provider_failed','suppressed') OR EXCLUDED.status IN ('bounced','complained','provider_failed','suppressed'))
    ) UPDATE vcse_eoi_delivery SET status = ${state}, delivery_event_at = ${event.created_at}::timestamptz,
      last_error = ${state === "delivered" ? null : `Provider event: ${event.type}`}
      WHERE provider_id = ${event.data.email_id}
        AND (delivery_event_at IS NULL OR delivery_event_at < ${event.created_at}::timestamptz)
        AND (status NOT IN ('bounced','complained','provider_failed','suppressed') OR ${state} IN ('bounced','complained','provider_failed','suppressed'))`;
    return new NextResponse(null, { status: 204 });
  } catch { return new NextResponse(null, { status: 503 }); }
}
