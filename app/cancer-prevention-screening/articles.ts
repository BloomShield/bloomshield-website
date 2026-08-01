import { healthContentGovernance } from "./content";

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
  keywords: string[];
  relatedArticles: string[];
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
    keywords: ["bowel cancer screening", "FIT test", "NHS screening", "England"],
    relatedArticles: ["FIT test", "Cancer symptoms", "Reducing cancer risk"],
    medicalSubjects: [
      { type: "MedicalCondition", name: "Bowel cancer" },
      { type: "MedicalTest", name: "Faecal immunochemical test" },
    ],
  },
  cervical: {
    path: "/cancer-prevention-screening/cervical-screening",
    pageStatus: "editorial-review",
    articleVersion: "1.0",
    readingTime: "10 minutes",
    ...sharedReview,
    evidenceSources: ["NHS", "NHS England", "GOV.UK", "UK National Screening Committee"],
    primaryTopic: "Cervical screening",
    keywords: ["cervical screening", "HPV test", "cervical cancer", "NHS screening", "England"],
    relatedArticles: ["HPV test", "HPV vaccination", "Cancer symptoms"],
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
    keywords: ["breast screening", "mammogram", "breast cancer", "NHS screening", "England"],
    relatedArticles: ["Mammogram", "Cancer symptoms", "Family history and inherited risk"],
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
    keywords: ["lung cancer screening", "lung health check", "low-dose CT", "NHS screening", "England"],
    relatedArticles: ["Cancer symptoms", "Reducing cancer risk", "Understanding your screening invitation"],
    medicalSubjects: [
      { type: "MedicalCondition", name: "Lung cancer" },
      { type: "MedicalTest", name: "Low-dose computed tomography" },
    ],
  },
} as const satisfies Record<string, ScreeningArticleRecord>;
