import { ANSWER_SCHEMA_VERSION, questionsForRoute, structuredKeys, toolsLabel } from "./vcse-eoi-questions";
import { countryCodes } from "./vcse-countries";
import { acknowledgements } from "./vcse-declarations";
export { acknowledgements } from "./vcse-declarations";
export const fields = [
  ["organisation", "Organisation name", 160], ["organisationType", "Organisation type", 100],
  ["website", "Organisation website (optional)", 250], ["country", "Country where your organisation is based", 2], ["location", "Main operating location", 160],
  ["activities", "Main activities and communities served", 1500],
  ["staffSize", "Staff size band", 60], ["volunteerSize", "Volunteer size band", 60],
  ["contactName", "Your name", 160], ["role", "Your role", 160], ["email", "Email address", 254],
  ["decisionInvolvement", "Your involvement in decisions", 500],
  ["example", "A recent example of an operational challenge", 2000], ["tools", toolsLabel, 1000],
  ["participation", questionsForRoute("uk_early_adopter").participation.label, 80],
  ["approver", questionsForRoute("uk_early_adopter").approver.label, 80],
  ["commercialReadiness", questionsForRoute("uk_early_adopter").commercialReadiness.label, 80], ["timing", questionsForRoute("uk_early_adopter").timing.label, 80],
  ["referral", "How did you hear about us? (optional)", 300],
] as const;
export const challenges = ["Grant pipeline tracking", "Task management", "Document management", "Opportunities and watchlist monitoring"];
export const sizeBands = ["0", "1–5", "6–10", "11–25", "26–50", "51+", "Not sure"];
export type Application = Record<(typeof fields)[number][0], string> & { challenges: string[]; selectionAcknowledged: true; purchaseBoundaryAcknowledged: true; privacyAcknowledged: true; operatingCountries: string[]; enquiryRoute: "uk_early_adopter" | "international_interest"; answerSchemaVersion: typeof ANSWER_SCHEMA_VERSION };
export function validateApplication(raw: unknown): { data?: Application; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { errors: { form: "Please complete the form." } };
  const input = raw as Record<string, unknown>;
  const data: Record<string, unknown> = {};
  for (const [key, label, max] of fields) {
    const value = typeof input[key] === "string" ? input[key].trim().normalize("NFC") : "";
    data[key] = value;
    const fieldLabel = key === "participation" && data.country && data.country !== "GB" ? "Readiness for a possible exploratory conversation" : label;
    if ((!value && key !== "website" && key !== "referral") || value.length > max) errors[key] = `${fieldLabel}: ${value ? `use no more than ${max} characters` : "please complete this field"}.`;
  }
  const email = data.email as string;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  data.email = email.toLowerCase();
  if (data.website) {
    try { const url = new URL(data.website as string); if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error(); }
    catch { errors.website = "Enter a full http:// or https:// website address."; }
  }
  for (const key of ["staffSize", "volunteerSize"]) if (!sizeBands.includes(data[key] as string)) errors[key] = "Choose a size band.";
  const country = data.country as string;
  if (!countryCodes.has(country)) errors.country = "Choose the country where your organisation is based.";
  data.enquiryRoute = country === "GB" ? "uk_early_adopter" : "international_interest";
  const operating = input.operatingCountries;
  if (!Array.isArray(operating) || operating.length < 1 || operating.length > 249 || new Set(operating).size !== operating.length || operating.some(c => typeof c !== "string" || !countryCodes.has(c))) errors.operatingCountries = "Choose at least one valid operating country, without duplicates.";
  data.operatingCountries = Array.isArray(operating) ? [...operating].sort() : [];
  const questions = questionsForRoute(country === "GB" ? "uk_early_adopter" : "international_interest");
  for (const key of structuredKeys) {
    if (!questions[key].options.some(option => option.value === data[key])) errors[key] = `Choose an answer for: ${questions[key].label}`;
  }
  data.answerSchemaVersion = ANSWER_SCHEMA_VERSION;
  const selected = input.challenges;
  if (!Array.isArray(selected) || selected.length < 1 || selected.length > 3 || new Set(selected).size !== selected.length || selected.some(c => typeof c !== "string" || !challenges.includes(c))) errors.challenges = "Choose between one and three operational challenges.";
  data.challenges = Array.isArray(selected) ? [...selected].sort() : [];
  const acknowledgementErrors = { selectionAcknowledged: "Confirm that expressing interest does not guarantee selection or deployment.", purchaseBoundaryAcknowledged: "Confirm the discovery and implementation agreement boundary described in this declaration.", privacyAcknowledged: "Confirm that you have read the programme privacy information." };
  for (const [key] of acknowledgements) { if (input[key] !== true) errors[key] = acknowledgementErrors[key]; data[key] = input[key]; }
  return Object.keys(errors).length ? { errors } : { data: data as Application, errors };
}
