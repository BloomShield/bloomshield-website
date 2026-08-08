import { healthContentGovernance, officialLinks } from "./content";

export type MedicalSubject = {
  type: "MedicalCondition" | "MedicalTest";
  name: string;
};

export type ScreeningArticleRecord = {
  path: `/cancer-prevention-screening/${string}`;
  pageStatus: "published" | "editorial-review";
  articleVersion: string;
  readingTime: string;
  reviewDate: string;
  reviewDateIso: string;
  nextReviewDate: string;
  nextReviewDateIso: string;
  evidenceSources: string[];
  primaryTopic: string;
  countryScope: string;
  officialResources: string[];
  keywords: string[];
  relatedArticles: string[];
  relatedPublishedArticles: string[];
  futureRelatedTopics: string[];
  medicalSubjects: MedicalSubject[];
};

const sharedReview = {
  reviewDate: healthContentGovernance.lastReviewed,
  reviewDateIso: healthContentGovernance.lastReviewedIso,
  nextReviewDate: healthContentGovernance.nextReview,
  nextReviewDateIso: healthContentGovernance.nextReviewIso,
} as const;

export const screeningArticles = {
  bowel: {
    path: "/cancer-prevention-screening/bowel-screening",
    pageStatus: "published",
    articleVersion: "1.0",
    readingTime: "10 minutes",
    ...sharedReview,
    evidenceSources: ["NHS", "NHS England", "GOV.UK", "UK National Screening Committee", "Cancer Research UK"],
    primaryTopic: "Bowel cancer screening",
    countryScope: "England unless otherwise specified",
    officialResources: [officialLinks.nhsBowelScreening, officialLinks.govProgrammeOverview, officialLinks.ukNscRecommendation],
    keywords: ["bowel cancer screening", "FIT test", "NHS screening", "England"],
    relatedArticles: ["FIT test", "Cancer symptoms", "Reducing cancer risk"],
    relatedPublishedArticles: ["/cancer-prevention-screening/fit-test"],
    futureRelatedTopics: ["Cancer symptoms", "Reducing cancer risk"],
    medicalSubjects: [
      { type: "MedicalCondition", name: "Bowel cancer" },
      { type: "MedicalTest", name: "Faecal immunochemical test" },
    ],
  },
  cervical: {
    path: "/cancer-prevention-screening/cervical-screening",
    pageStatus: "published",
    articleVersion: "1.0",
    readingTime: "10 minutes",
    ...sharedReview,
    evidenceSources: ["NHS", "NHS England", "GOV.UK", "UK National Screening Committee"],
    primaryTopic: "Cervical screening",
    countryScope: "England unless otherwise specified",
    officialResources: [officialLinks.nhsCervicalScreening, officialLinks.govCervicalOverview, officialLinks.nhsEnglandCervicalGuide],
    keywords: ["cervical screening", "HPV test", "cervical cancer", "NHS screening", "England"],
    relatedArticles: ["HPV test", "HPV vaccination", "Cancer symptoms"],
    relatedPublishedArticles: [],
    futureRelatedTopics: ["HPV test", "HPV vaccination", "Cancer symptoms"],
    medicalSubjects: [
      { type: "MedicalCondition", name: "Cervical cancer" },
      { type: "MedicalTest", name: "Human papillomavirus test" },
    ],
  },
  breast: {
    path: "/cancer-prevention-screening/breast-screening",
    pageStatus: "editorial-review",
    articleVersion: "1.0",
    readingTime: "10 minutes",
    ...sharedReview,
    evidenceSources: ["NHS", "NHS England", "GOV.UK", "UK National Screening Committee"],
    primaryTopic: "Breast screening",
    countryScope: "England unless otherwise specified",
    officialResources: [officialLinks.nhsBreastScreening, officialLinks.govBreastOverview, officialLinks.govBreastGuide],
    keywords: ["breast screening", "mammogram", "breast cancer", "NHS screening", "England"],
    relatedArticles: ["Mammogram", "Cancer symptoms", "Family history and inherited risk"],
    relatedPublishedArticles: [],
    futureRelatedTopics: ["Mammogram", "Cancer symptoms", "Family history and inherited risk"],
    medicalSubjects: [
      { type: "MedicalCondition", name: "Breast cancer" },
      { type: "MedicalTest", name: "Mammography" },
    ],
  },
  lung: {
    path: "/cancer-prevention-screening/lung-health-checks",
    pageStatus: "editorial-review",
    articleVersion: "1.0",
    readingTime: "10 minutes",
    ...sharedReview,
    evidenceSources: ["NHS", "NHS England", "UK National Screening Committee"],
    primaryTopic: "NHS Lung Health Checks",
    countryScope: "England unless otherwise specified",
    officialResources: [officialLinks.nhsLungScreening, officialLinks.nhsEnglandLungProgramme, officialLinks.ukNscLungRecommendation],
    keywords: ["lung cancer screening", "lung health check", "low-dose CT", "NHS screening", "England"],
    relatedArticles: ["Cancer symptoms", "Reducing cancer risk", "Understanding your screening invitation"],
    relatedPublishedArticles: [],
    futureRelatedTopics: ["Cancer symptoms", "Reducing cancer risk", "Understanding your screening invitation"],
    medicalSubjects: [
      { type: "MedicalCondition", name: "Lung cancer" },
      { type: "MedicalTest", name: "Low-dose computed tomography" },
    ],
  },
  fit: {
    path: "/cancer-prevention-screening/fit-test",
    pageStatus: "published",
    articleVersion: "1.0",
    readingTime: "12 minutes",
    ...sharedReview,
    evidenceSources: ["NHS", "NHS England", "GOV.UK", "UK National Screening Committee", "NICE"],
    primaryTopic: "Screening Test",
    countryScope: "England unless otherwise specified",
    officialResources: [officialLinks.govBowelScreeningGuide, officialLinks.govFitKitInstructions, officialLinks.govProgrammeOverview, officialLinks.niceSymptomaticFit],
    keywords: ["FIT test", "faecal immunochemical test", "bowel cancer screening", "diagnostic FIT", "symptomatic FIT", "England"],
    relatedArticles: ["NHS Bowel Cancer Screening", "Cancer symptoms", "Reducing cancer risk"],
    relatedPublishedArticles: ["/cancer-prevention-screening/bowel-screening"],
    futureRelatedTopics: ["Cancer symptoms", "Reducing cancer risk"],
    medicalSubjects: [
      { type: "MedicalTest", name: "Faecal immunochemical test" },
      { type: "MedicalCondition", name: "Bowel cancer" },
    ],
  },
  hpv: {
    path: "/cancer-prevention-screening/hpv-test",
    pageStatus: "published",
    articleVersion: "1.0",
    readingTime: "11 minutes",
    ...sharedReview,
    evidenceSources: ["NHS", "NHS England", "GOV.UK"],
    primaryTopic: "Screening Test",
    countryScope: "England unless otherwise specified",
    officialResources: [officialLinks.nhsHpv, officialLinks.nhsCervicalResults, officialLinks.govCervicalGuide, officialLinks.govCervicalOverview],
    keywords: ["HPV test", "high-risk HPV", "cervical screening", "cervical cancer", "England"],
    relatedArticles: ["NHS Cervical Screening", "HPV Vaccination", "Cancer Symptoms"],
    relatedPublishedArticles: ["/cancer-prevention-screening/cervical-screening"],
    futureRelatedTopics: ["HPV Vaccination", "Cancer Symptoms"],
    medicalSubjects: [
      { type: "MedicalTest", name: "Human papillomavirus test" },
      { type: "MedicalCondition", name: "Cervical cancer" },
    ],
  },
  mammogram: {
    path: "/cancer-prevention-screening/mammogram",
    pageStatus: "published",
    articleVersion: "1.0",
    readingTime: "11 minutes",
    ...sharedReview,
    evidenceSources: ["NHS", "NHS England", "GOV.UK"],
    primaryTopic: "Screening Test",
    countryScope: "England unless otherwise specified",
    officialResources: [officialLinks.nhsBreastScreening, officialLinks.nhsMammogramAppointment, officialLinks.nhsBreastResults, officialLinks.govBreastGuideCurrent],
    keywords: ["mammogram", "mammography", "breast screening", "breast cancer", "England"],
    relatedArticles: ["NHS Breast Screening", "Cancer Symptoms", "Family History and Inherited Risk"],
    relatedPublishedArticles: ["/cancer-prevention-screening/breast-screening"],
    futureRelatedTopics: ["Cancer Symptoms", "Family History and Inherited Risk"],
    medicalSubjects: [
      { type: "MedicalTest", name: "Mammography" },
      { type: "MedicalCondition", name: "Breast cancer" },
    ],
  },
  psa: {
    path: "/cancer-prevention-screening/psa-test",
    pageStatus: "published",
    articleVersion: "1.0",
    readingTime: "12 minutes",
    ...sharedReview,
    evidenceSources: ["NHS", "GOV.UK", "UK National Screening Committee", "NICE"],
    primaryTopic: "Screening Test",
    countryScope: "England unless otherwise specified",
    officialResources: [officialLinks.nhsPsaTest, officialLinks.ukNscProstateRecommendation, officialLinks.govTargetedProstateScreening, officialLinks.niceProstateGuidance],
    keywords: ["PSA test", "prostate-specific antigen", "prostate cancer", "informed choice", "England"],
    relatedArticles: ["Cancer Symptoms", "Family History and Inherited Risk", "Reducing Cancer Risk"],
    relatedPublishedArticles: [],
    futureRelatedTopics: ["Cancer Symptoms", "Family History and Inherited Risk", "Reducing Cancer Risk"],
    medicalSubjects: [
      { type: "MedicalTest", name: "Prostate-specific antigen test" },
      { type: "MedicalCondition", name: "Prostate cancer" },
    ],
  },
} as const satisfies Record<string, ScreeningArticleRecord>;
