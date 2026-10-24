export type EnquiryRoute = "uk_early_adopter" | "international_interest";
// Released definitions are immutable: publish changed wording under a NEW key.
export const DECLARATION_SET_VERSION = "vcse-declarations-2026-10-24-v1";
export const DECLARATION_SETS = {
  [DECLARATION_SET_VERSION]: [
    ["selectionAcknowledged", "I understand expressing interest does not guarantee selection or deployment."],
    ["purchaseBoundaryAcknowledged", "I understand discovery creates no purchase obligation; implementation requires a separate agreement."],
    ["privacyAcknowledged", "I have read the programme privacy information."],
  ],
} as const;
export const acknowledgements = DECLARATION_SETS[DECLARATION_SET_VERSION];
export type AcknowledgementKey = (typeof acknowledgements)[number][0];
export const PRIVACY_NOTICE_VERSION = "vcse-privacy-2026-10-24-international-draft-v2";
export const offers = {
  uk_early_adopter: { version: "vcse-uk-2026-10-24-v1", summary: "UK early-adopter interest: free discovery with no purchase obligation. Any paid implementation needs a separate agreed proposal. Provisional UK contribution: £1,250; infrastructure: £20/month from live launch, subject to confirmed scope, VAT and total payable." },
  international_interest: { version: "vcse-international-2026-10-24-v1", summary: "International interest: participation, availability and pricing are assessed separately. The UK subsidy and full free-discovery package do not apply automatically. A relevant exploratory conversation may be offered individually; deployment availability is not guaranteed." },
} as const;
export type Presentation = { token: string; declarationSetVersion: string; privacyNoticeVersion: string; offerVersion: string; enquiryRoute: EnquiryRoute; issuedAt: string; declarations: typeof acknowledgements; offerSummary: string };
export type PresentationMap = Record<EnquiryRoute, Presentation>;
export type DeclarationAudit = Omit<Presentation, "token" | "offerSummary">;
