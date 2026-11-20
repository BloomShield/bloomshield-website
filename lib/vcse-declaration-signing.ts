import { createHmac, timingSafeEqual } from "node:crypto";
import { DECLARATION_SETS, declarationVersions, ukCommercial, PRIVACY_NOTICE_VERSION, offers, type EnquiryRoute, type Presentation, type PresentationMap, type DeclarationAudit } from "./vcse-declarations";
export function createPresentation(enquiryRoute: EnquiryRoute): Presentation {
  const snapshot = { declarationSetVersion: declarationVersions[enquiryRoute], privacyNoticeVersion: PRIVACY_NOTICE_VERSION, offerVersion: offers[enquiryRoute].version, enquiryRoute, issuedAt: new Date().toISOString() };
  const encoded = Buffer.from(JSON.stringify(snapshot)).toString("base64url");
  const secret = process.env.VCSE_EOI_DECLARATION_SECRET;
  const token = secret ? `${encoded}.${createHmac("sha256", secret).update(encoded).digest("base64url")}` : "";
  return { ...snapshot, token, declarations: DECLARATION_SETS[declarationVersions[enquiryRoute]], offerSummary: offers[enquiryRoute].summary, preDeclarationExplanation: enquiryRoute === "uk_early_adopter" ? ukCommercial.eoiExplanation : ["EOI submission is free and non-binding. No payment or purchase contract arises from submitting this EOI. International participation, availability and pricing remain subject to separate assessment."] };
}
export function createPresentations(): PresentationMap { return { uk_early_adopter: createPresentation("uk_early_adopter"), international_interest: createPresentation("international_interest") }; }
export function verifyPresentation(token: unknown, route: EnquiryRoute): DeclarationAudit | null {
  try {
    if (typeof token !== "string" || token.length > 3000 || !process.env.VCSE_EOI_DECLARATION_SECRET) return null;
    const [encoded, signature, extra] = token.split(".");
    if (!encoded || !signature || extra) return null;
    const expected = createHmac("sha256", process.env.VCSE_EOI_DECLARATION_SECRET).update(encoded).digest();
    const actual = Buffer.from(signature, "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const snapshot = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    const age = Date.now() - Date.parse(snapshot.issuedAt);
    if (!Number.isFinite(age) || age < -60_000 || age > 86_400_000 || snapshot.enquiryRoute !== route || snapshot.declarationSetVersion !== declarationVersions[route] || snapshot.privacyNoticeVersion !== PRIVACY_NOTICE_VERSION || snapshot.offerVersion !== offers[route].version) return null;
    // Return authoritative definitions, never client-supplied wording or labels.
    return { enquiryRoute: route, declarationSetVersion: declarationVersions[route], privacyNoticeVersion: PRIVACY_NOTICE_VERSION, offerVersion: offers[route].version, issuedAt: snapshot.issuedAt, declarations: DECLARATION_SETS[declarationVersions[route]] };
  } catch { return null; }
}
