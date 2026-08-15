export const SURVEY_URL = "https://www.smartsurvey.co.uk/t/0O5DSA/";

export type StudyStatus =
  | { state: "open"; closes: string }
  | { state: "closed" }
  | { state: "findings"; findingsUrl: `/${string}` };

export const studyConfig = {
  title: "BloomShield Grassroots VCSE Digital & Organisational Capacity Study 2026",
  status: { state: "open", closes: "24 August 2026" } as StudyStatus,
  surveyUrl: SURVEY_URL,
} as const;
