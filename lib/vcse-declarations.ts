export type EnquiryRoute = "uk_early_adopter" | "international_interest";
// Released entries are immutable. Add a new literal key for every material change.
export const DECLARATION_SETS = {
  "vcse-declarations-2026-10-24-v1": [
    ["selectionAcknowledged", "I understand expressing interest does not guarantee selection or deployment."],
    ["purchaseBoundaryAcknowledged", "I understand discovery creates no purchase obligation; implementation requires a separate agreement."],
    ["privacyAcknowledged", "I have read the programme privacy information."],
  ],
  "vcse-declarations-2026-10-24-v2": [
    ["selectionAcknowledged", "I understand expressing interest does not guarantee selection or deployment."],
    ["purchaseBoundaryAcknowledged", "I understand discovery and workflow mapping are free and create no obligation to proceed; paid implementation requires a separate agreement after I have reviewed the proposed scope and costs."],
    ["privacyAcknowledged", "I have read the programme privacy information."],
  ],
} as const;
export const DECLARATION_SET_VERSION = "vcse-declarations-2026-10-24-v2";
export const declarationVersions = {
  uk_early_adopter: DECLARATION_SET_VERSION,
  international_interest: "vcse-declarations-2026-10-24-v1",
} as const;
export const acknowledgements = DECLARATION_SETS[DECLARATION_SET_VERSION];
export type AcknowledgementKey = (typeof acknowledgements)[number][0];
export type Declarations = readonly (readonly [AcknowledgementKey, string])[];
export const PRIVACY_NOTICE_VERSION = "vcse-privacy-2026-10-24-international-draft-v2";
export const OFFER_VERSIONS = {
  "vcse-uk-2026-10-24-v1": { version: "vcse-uk-2026-10-24-v1", summary: "UK early-adopter interest: free discovery with no purchase obligation. Any paid implementation needs a separate agreed proposal. Provisional UK contribution: £1,250; infrastructure: £20/month from live launch, subject to confirmed scope, VAT and total payable." },
  "vcse-international-2026-10-24-v1": { version: "vcse-international-2026-10-24-v1", summary: "International interest: participation, availability and pricing are assessed separately. The UK subsidy and full free-discovery package do not apply automatically. A relevant exploratory conversation may be offered individually; deployment availability is not guaranteed." },
  "vcse-uk-2026-10-24-v2": {
    version: "vcse-uk-2026-10-24-v2",
    summary: "UK early-adopter interest: EOI submission is free and non-binding. Shortlisted organisations may be invited to free discovery and workflow mapping before any implementation commitment. Following discovery, selected organisations may review the proposed scope and costs and are under no obligation to proceed. Standard implementation cost: £2,500; selected early-adopter discount: 50%; discounted early-adopter implementation price: £1,250. The discount and payment options apply only to selected early adopters who independently choose paid implementation under a separately agreed proposal. Provisional infrastructure: £20/month from live launch. Support, VAT treatment and total payable will be confirmed before agreement. EOI submission creates no payment obligation or purchase contract.",
    commercial: {
      cards: [["£2,500", "Standard implementation cost"], ["50%", "Selected early-adopter discount"], ["£1,250", "Discounted early-adopter implementation price"]],
      discoveryExplanation: "Free discovery and workflow mapping take place before any implementation commitment.",
      postDiscoveryExplanation: "Following discovery, selected organisations may review the proposed implementation scope and costs. They are under no obligation to proceed.",
      paymentBoundary: "These payment options apply only after your organisation has independently agreed to paid implementation under a separate proposal, having reviewed the scope and costs.",
      paymentOptions: ["£625 on agreement + £625 after acceptance, before launch; or", "£250 initially + five monthly payments of £200."],
      infrastructureHeading: "Provisional infrastructure: £20/month from live launch",
      infrastructureExplanation: "This covers infrastructure, not unlimited support or feature development. Support arrangements, scope, technical costing, VAT treatment and total payable will be confirmed before agreement. Deployment is not free or guaranteed.",
      eoiExplanation: [
        "EOI submission is free and non-binding. Shortlisted organisations may be invited to free discovery and workflow mapping, before any implementation commitment.",
        "Selection and deployment are not guaranteed. The 50% discount applies to selected early adopters who choose to proceed under a separately agreed implementation proposal after reviewing scope and costs. They are under no obligation to proceed.",
        "No payment or purchase contract arises from submitting this EOI.",
      ],
    },
  },
  "vcse-uk-2026-10-24-v3": {
    version: "vcse-uk-2026-10-24-v3",
    summary: "UK early-adopter interest: free, no-obligation discovery and workflow mapping come before an implementation commitment. Following discovery, selected organisations may review the proposed scope and full costs and are under no obligation to proceed. Standard implementation price: £2,500; selected early-adopter discount: 50%; your implementation price if selected: £1,250. Payment is agreed in writing only if you choose to proceed: £625 on agreement plus £625 after implementation acceptance and before launch, or £250 initially followed by five monthly payments of £200. Ongoing infrastructure is provisionally £20/month from live launch, covering agreed hosting rather than unlimited support or additional features. Final technical requirements, maintenance/support arrangements, VAT treatment and total payable are confirmed before agreement. EOI and free discovery create no purchase obligation. Selection and deployment are not guaranteed.",
    commercial: {
      headline: "Understand your needs first. Decide whether to proceed afterwards.",
      cards: [["£2,500", "Standard implementation price"], ["50%", "Selected early-adopter discount"], ["£1,250", "Your implementation price if selected"]],
      discoveryExplanation: "We begin with free, no-obligation discovery and workflow mapping to understand your organisation's needs and assess whether a dedicated digital workspace is a good fit.",
      postDiscoveryExplanation: "Following discovery, selected organisations may review a proposed implementation scope and full costs. You are under no obligation to proceed.",
      paymentHeading: "Two payment options — only if you choose to proceed",
      paymentBoundary: "Payment is discussed only after discovery and workflow mapping. If you choose to proceed, we will agree the implementation scope, final costs and payment arrangements in writing before any payment is due.",
      paymentOptionHeadings: ["Option 1 — Two instalments", "Option 2 — Six instalments"],
      paymentOptions: ["£625 on agreement, plus £625 after implementation acceptance and before launch.", "£250 initially, followed by five monthly payments of £200."],
      infrastructureHeading: "Ongoing infrastructure — provisionally £20/month",
      infrastructureExplanation: "Infrastructure charges begin only when your workspace goes live. This covers the agreed hosting infrastructure, not unlimited support or additional feature development.",
      infrastructureConfirmation: "Final technical requirements, maintenance and support arrangements, VAT treatment and total payable will be confirmed before your organisation agrees to proceed.",
      closingClarifier: "Submitting an expression of interest and participating in free discovery do not create a purchase obligation. Selection and deployment are not guaranteed.",
      eoiExplanation: [
        "EOI submission is free and non-binding. Shortlisted organisations may be invited to free discovery and workflow mapping, before any implementation commitment.",
        "Selection and deployment are not guaranteed. The 50% discount applies to selected early adopters who choose to proceed under a separately agreed implementation proposal after reviewing scope and costs. They are under no obligation to proceed.",
        "No payment or purchase contract arises from submitting this EOI.",
      ],
    },
  },
} as const;
export const offers = {
  uk_early_adopter: OFFER_VERSIONS["vcse-uk-2026-10-24-v3"],
  international_interest: OFFER_VERSIONS["vcse-international-2026-10-24-v1"],
} as const;
export const ukCommercial = offers.uk_early_adopter.commercial;
export type Presentation = { token: string; declarationSetVersion: string; privacyNoticeVersion: string; offerVersion: string; enquiryRoute: EnquiryRoute; issuedAt: string; declarations: Declarations; offerSummary: string; preDeclarationExplanation: readonly string[] };
export type PresentationMap = Record<EnquiryRoute, Presentation>;
export type DeclarationAudit = Omit<Presentation, "token" | "offerSummary" | "preDeclarationExplanation">;
