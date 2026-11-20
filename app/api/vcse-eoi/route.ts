import { NextResponse } from "next/server";
import { configured, deliver, persist, rateLimit } from "@/lib/vcse-eoi";
import { validateApplication } from "@/lib/vcse-eoi-schema";
import { createPresentations, verifyPresentation } from "@/lib/vcse-declaration-signing";
export const runtime = "nodejs";
export const maxDuration = 60;
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  if (process.env.VCSE_EOI_OPEN !== "true") return reply({ error: "Expressions of interest are not open yet. Please return later." }, 503);
  if (!configured()) return reply({ error: "The form is temporarily unavailable. Please try again later." }, 503);
  const origin = request.headers.get("origin");
  if (!origin || origin !== (process.env.VCSE_EOI_ORIGIN || new URL(request.url).origin)) return reply({ error: "Please submit using the website form." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "JSON required." }, 415);
  try {
    // Limit streamed bytes too: Content-Length alone can be omitted or forged.
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "Please complete the form." }, 400);
    const parts: Uint8Array[] = []; let size = 0;
    while (true) { const part = await reader.read(); if (part.done) break; size += part.value.byteLength; if (size > 24_000) { await reader.cancel(); return reply({ error: "Form exceeds the input limit." }, 413); } parts.push(part.value); }
    let raw;
    try { raw = JSON.parse(Buffer.concat(parts).toString("utf8")); } catch { return reply({ error: "Invalid form data." }, 400); }
    if (raw && typeof raw === "object" && raw.companyFax) return reply({ error: "Unable to accept this submission." }, 400);
    const { data, errors } = validateApplication(raw);
    if (!data) return reply({ error: "Please check the highlighted fields.", errors }, 400);
    const audit = verifyPresentation(raw.presentationToken, data.enquiryRoute);
    if (!audit) return reply({ error: "The programme terms have changed or this form version could not be verified. Your entries are still here. Please review the current declarations before submitting again.", reviewRequired: true, presentations: createPresentations() }, 409);
    // Vercel supplies this header; outside Vercel use a shared global bucket.
    const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown" : "local";
    if (!await rateLimit(`ip:${ip}`) || !await rateLimit(`email:${data.email}`)) return reply({ error: "Too many attempts. Please try again in an hour." }, 429);
    const receipt = await persist(data, audit);
    // Persistence is definitive. A delivery outage must never turn it into a failed application.
    try { await deliver(receipt); } catch { /* durable outbox will be retried */ }
    return reply({ ok: true, receipt, message: data.enquiryRoute === "international_interest" ? "Your international interest is saved. Please keep your receipt. Participation, availability and pricing outside the UK will be assessed separately. A relevant exploratory conversation may be offered individually; no selection or delivery date is promised. A confirmation email will follow; delivery may be delayed." : "Your expression of interest is saved. Please keep your receipt. A confirmation email will follow; delivery may be delayed." });
  } catch { return reply({ error: "We could not confirm your submission. Your entries are still here. Please retry; identical submissions receive the same receipt." }, 503); }
}
