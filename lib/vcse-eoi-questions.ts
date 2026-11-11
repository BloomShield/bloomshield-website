import type { EnquiryRoute } from "./vcse-declarations";
// Immutable v2 question meanings/codes. Issue a new version if meanings change;
// never map legacy free text or previous choice labels onto these codes.
export const ANSWER_SCHEMA_VERSION = "vcse-eoi-answers-2026-10-24-v2";
export const structuredKeys = ["participation", "approver", "timing", "commercialReadiness"] as const;
export type StructuredKey = (typeof structuredKeys)[number];
export type Question = { label: string; helper: string; options: readonly { value: string; label: string }[] };
const readiness = [
  { value: "ready_to_arrange", label: "Yes — we are ready to arrange a session" },
  { value: "needs_preparation", label: "Yes — but we would need some time to prepare" },
  { value: "more_information", label: "Possibly — we would like more information first" },
  { value: "not_now", label: "Not at this stage" },
] as const;
export const ukFundingOptions = [
  { value: "existing_budget", label: "Existing organisational budget" },
  { value: "external_funding_needed", label: "We would need grant or external funding" },
  { value: "subject_to_approval", label: "Potentially affordable, subject to approval" },
  { value: "explore_costs", label: "Not sure — we would like to explore the costs" },
] as const;
export const internationalPaidOptions = [
  { value: "yes", label: "Yes" }, { value: "potentially", label: "Potentially" },
  { value: "funded_access_needed", label: "Funded access needed" }, { value: "more_information", label: "Need more information" },
] as const;
export function questionsForRoute(route: EnquiryRoute): Record<StructuredKey, Question> {
  const international = route === "international_interest";
  return {
    participation: {
      label: international ? "Would your organisation be willing to participate in a possible exploratory conversation?" : "Would your organisation be willing to participate in a free discovery and workflow-mapping session?",
      helper: international ? "A relevant exploratory conversation may be offered individually. Participation, availability and pricing are assessed separately." : "Discovery is free, exploratory and does not create a purchase obligation.",
      options: international ? readiness.map(option => option.value === "ready_to_arrange" ? { ...option, label: "Yes — we are ready to arrange a conversation" } : option) : readiness,
    },
    approver: {
      label: "Who would normally approve spending on a new digital system in your organisation?",
      helper: "We are asking who makes purchasing decisions, not requesting financial approval at this stage.",
      options: [
        { value: "organisation_lead", label: "Chief Executive / Organisation Lead" },
        { value: "board", label: "Board of trustees or directors" },
        { value: "finance_or_management_committee", label: "Finance lead or management committee" },
        { value: "respondent", label: "I can approve this expenditure" },
        { value: "other_or_unsure", label: "Other / Not sure" },
      ],
    },
    timing: {
      label: "If selected and you decide to proceed, when might your organisation be ready to begin implementing a digital workspace?",
      helper: "This is indicative only and does not commit your organisation to a start date.",
      options: [
        { value: "on_agreement", label: "As soon as an agreement is in place" },
        { value: "one_to_three_months", label: "Within 1–3 months" },
        { value: "three_to_six_months", label: "Within 3–6 months" },
        { value: "over_six_months", label: "More than 6 months from now" },
        { value: "exploring", label: "Not sure — we are exploring options" },
      ],
    },
    commercialReadiness: {
      label: international ? "Would you consider discussing a paid implementation?" : "If the proposed workspace meets your needs, how would your organisation expect to fund it?",
      helper: international ? "International participation, availability and pricing are assessed separately." : "This is an expression of interest, not a commitment to fund or purchase a workspace.",
      options: international ? internationalPaidOptions : ukFundingOptions,
    },
  };
}
export function isStructuredKey(key: string): key is StructuredKey { return (structuredKeys as readonly string[]).includes(key); }
export const toolsLabel = "Tell us briefly which tools you currently use to manage funding, projects, documents and team responsibilities.";
export const toolsHelper = "For example: Excel, email, shared drives, a CRM or project-management tools.";
