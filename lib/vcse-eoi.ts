import { createHash, randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { countryName } from "./vcse-countries";
import { PRIVACY_NOTICE_VERSION, type DeclarationAudit } from "./vcse-declarations";
import type { Application } from "./vcse-eoi-schema";

export const PRIVACY_VERSION = PRIVACY_NOTICE_VERSION;
export function configured() {
  const stage = process.env.VCSE_EOI_ENVIRONMENT;
  return Boolean(process.env.VCSE_EOI_ORIGIN && process.env.VCSE_EOI_DATABASE_URL && process.env.RESEND_API_KEY && process.env.VCSE_EOI_FROM_EMAIL && process.env.VCSE_EOI_TO_EMAIL && process.env.VCSE_EOI_RATE_SALT && process.env.VCSE_EOI_RETRY_SECRET && process.env.VCSE_EOI_WEBHOOK_SECRET && process.env.VCSE_EOI_DECLARATION_SECRET &&
    (stage === "staging" || stage === "production") &&
    (process.env.VERCEL_ENV !== "production" || stage === "production") &&
    (process.env.VERCEL_ENV !== "preview" || stage === "staging"));
}
export function database() { return neon(process.env.VCSE_EOI_DATABASE_URL!); }
export function fingerprint(data: Application, audit: DeclarationAudit) { return createHash("sha256").update(JSON.stringify({ data, declarationSetVersion: audit.declarationSetVersion, privacyNoticeVersion: audit.privacyNoticeVersion, offerVersion: audit.offerVersion, enquiryRoute: audit.enquiryRoute })).digest("hex"); }
export async function rateLimit(identity: string) {
  const sql = database();
  const bucket = Math.floor(Date.now() / 3_600_000);
  const key = createHash("sha256").update(`${process.env.VCSE_EOI_RATE_SALT}:${bucket}:${identity}`).digest("hex");
  const rows = await sql`INSERT INTO vcse_eoi_rate (key, expires_at) VALUES (${key}, now() + interval '2 hours') ON CONFLICT (key) DO UPDATE SET count = vcse_eoi_rate.count + 1 RETURNING count`;
  return Number(rows[0].count) <= 10;
}
export async function persist(data: Application, audit: DeclarationAudit) {
  const sql = database();
  const id = randomUUID();
  // A single atomic statement inserts both outbox jobs only for a NEW application.
  // Concurrent duplicates wait on the unique constraint and use the stored receipt.
  const rows = await sql`WITH saved AS (
    INSERT INTO vcse_eoi (id, fingerprint, payload, privacy_version, country, operating_countries, enquiry_route, selection_acknowledged, purchase_boundary_acknowledged, privacy_acknowledged, submitted_at, declaration_set_version, privacy_notice_version, offer_version, presented_enquiry_route, declaration_snapshot, answer_schema_version, discovery_readiness_code, expenditure_approver_code, implementation_timing_code, uk_funding_code, international_paid_discussion_code)
    VALUES (${id}, ${fingerprint(data, audit)}, ${JSON.stringify(data)}::jsonb, ${audit.privacyNoticeVersion}, ${data.country}, ${data.operatingCountries}, ${data.enquiryRoute}, ${data.selectionAcknowledged}, ${data.purchaseBoundaryAcknowledged}, ${data.privacyAcknowledged}, now(), ${audit.declarationSetVersion}, ${audit.privacyNoticeVersion}, ${audit.offerVersion}, ${audit.enquiryRoute}, ${JSON.stringify(audit)}::jsonb, ${data.answerSchemaVersion}, ${data.participation}, ${data.approver}, ${data.timing}, ${data.enquiryRoute === "uk_early_adopter" ? data.commercialReadiness : null}, ${data.enquiryRoute === "international_interest" ? data.commercialReadiness : null})
    ON CONFLICT (fingerprint) DO UPDATE SET fingerprint = EXCLUDED.fingerprint RETURNING id
  ), jobs AS (
    INSERT INTO vcse_eoi_delivery (id, application_id, kind)
    SELECT ${randomUUID()}::uuid, id, 'applicant' FROM saved WHERE id = ${id}::uuid
    UNION ALL SELECT ${randomUUID()}::uuid, id, 'team' FROM saved WHERE id = ${id}::uuid
    ON CONFLICT (application_id, kind) DO NOTHING
  ) SELECT id FROM saved`;
  return String(rows[0].id);
}
export function emailFor(kind: string, id: string, data: Application) {
  const international = data.enquiryRoute === "international_interest";
  return {
    from: process.env.VCSE_EOI_FROM_EMAIL!,
    to: [kind === "applicant" ? data.email : process.env.VCSE_EOI_TO_EMAIL!],
    subject: kind === "applicant" ? (international ? "BloomShield: international interest received" : "BloomShield: expression of interest received") : (international ? "New VCSE workspace international interest" : "New VCSE workspace UK expression of interest"),
    text: kind === "applicant"
      ? international ? `Thank you for registering international interest in the BloomShield VCSE Digital Workspace.\n\nReceipt: ${id}\nOur current early-adopter offer focuses on UK organisations. Participation, availability and pricing outside the UK are assessed separately. A relevant exploratory conversation may be offered individually. The UK subsidy and full free-discovery package do not apply automatically, and deployment availability is not guaranteed. We cannot promise a selection or delivery date.\n\nYou have not been subscribed to marketing. Questions: info@bloomshield.org`
      : `Thank you for expressing interest in BloomShield's VCSE Digital Workspace.\n\nReceipt: ${id}\nWe will review suitability and contact you about next steps. Selection and deployment are not guaranteed. Discovery is free with no purchase obligation. Paid implementation requires a separate agreement and initial payment.\n\nYou have not been subscribed to marketing. Questions: info@bloomshield.org`
      : `An application is saved in the restricted VCSE database.\nReceipt: ${id}\nEnquiry route: ${data.enquiryRoute || "uk_early_adopter"}\nCountry: ${countryName(data.country || "GB")}\nUse the authorised database workflow to review it. Do not forward applicant data.`,
  };
}
export async function deliver(id?: string) {
  const sql = database();
  // Lease jobs atomically; no request can deliver another request's active lease.
  const jobs = await sql`WITH due AS (
    SELECT id FROM vcse_eoi_delivery WHERE status IN ('pending','sending','failed') AND attempts < 8
      AND (first_attempt_at IS NULL OR first_attempt_at > now() - interval '23 hours')
      AND next_attempt_at <= now() AND (${id ?? null}::uuid IS NULL OR application_id = ${id ?? null}::uuid)
    ORDER BY next_attempt_at LIMIT 10 FOR UPDATE SKIP LOCKED
  ) UPDATE vcse_eoi_delivery d SET status = 'sending', attempts = attempts + 1,
      first_attempt_at = COALESCE(first_attempt_at, now()), next_attempt_at = now() + interval '5 minutes'
    FROM due WHERE d.id = due.id RETURNING d.*`;
  for (const job of jobs) {
    try {
      const rows = await sql`SELECT payload FROM vcse_eoi WHERE id = ${job.application_id}`;
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST", signal: AbortSignal.timeout(10_000),
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `vcse-${job.id}` },
        body: JSON.stringify(emailFor(job.kind, job.application_id, rows[0].payload as Application)),
      });
      if (!response.ok) throw new Error(`Provider HTTP ${response.status}`);
      const result = await response.json();
      await sql`UPDATE vcse_eoi_delivery SET status = 'sent', sent_at = now(), provider_id = ${result.id}, last_error = NULL WHERE id = ${job.id}`;
      await sql`UPDATE vcse_eoi_delivery d SET status = e.status, delivery_event_at = e.event_at,
        last_error = CASE WHEN e.status = 'delivered' THEN NULL ELSE 'Provider delivery event; review required' END
        FROM vcse_eoi_events e WHERE d.id = ${job.id} AND d.provider_id = e.provider_id`;
    } catch {
      // Never log applicant content, credentials, or provider response bodies.
      await sql`UPDATE vcse_eoi_delivery SET status = 'failed', last_error = 'Delivery unconfirmed; inspect provider status', next_attempt_at = now() + interval '30 minutes' WHERE id = ${job.id} AND status = 'sending'`;
    }
  }
  return jobs.length;
}
