export type ExternalResource = {
  title: string;
  description: string;
  href: string;
  organisation: string;
};

export type HubTopic = {
  title: string;
  description: string;
  href?: string;
  status: "published" | "coming-soon";
};

export const healthContentGovernance = {
  publishedDate: null,
  lastReviewed: "August 2026",
  lastReviewedIso: "2026-08-01",
  nextReview: "February 2027",
  nextReviewIso: "2027-02-01",
  status: "ready-for-editorial-review",
  publisher: "BloomShield CIC",
} as const;

export const officialLinks = {
  nhsScreening: "https://www.nhs.uk/tests-and-treatments/nhs-screening/",
  nhsBowelScreening: "https://www.nhs.uk/tests-and-treatments/bowel-cancer-screening/",
  nhsBowelSymptoms: "https://www.nhs.uk/conditions/bowel-cancer/symptoms/",
  nhs111: "https://111.nhs.uk/",
  govProgrammeOverview: "https://www.gov.uk/guidance/bowel-cancer-screening-programme-overview",
  ukNscRecommendation: "https://view-health-screening-recommendations.service.gov.uk/bowel-cancer/",
  nhsEnglandReports: "https://www.england.nhs.uk/statistics/statistical-work-areas/screening/",
  cancerResearchUkOverview: "https://www.cancerresearchuk.org/health-professional/cancer-screening/bowel-cancer-screening/screening-bowel-overview",
  cancerResearchUkFit: "https://www.cancerresearchuk.org/about-cancer/tests-and-scans/FIT",
  nhsCervicalScreening: "https://www.nhs.uk/tests-and-treatments/cervical-screening/",
  nhsCervicalInvitations: "https://www.nhs.uk/tests-and-treatments/cervical-screening/when-youll-be-invited/",
  nhsCervicalResults: "https://www.nhs.uk/tests-and-treatments/cervical-screening/your-results/",
  govCervicalOverview: "https://www.gov.uk/guidance/cervical-screening-programme-overview",
  nhsEnglandCervicalGuide: "https://www.england.nhs.uk/long-read/your-guide-to-nhs-cervical-screening/",
  nhsBreastScreening: "https://www.nhs.uk/tests-and-treatments/breast-screening-mammogram/",
  nhsBreastEligibility: "https://www.nhs.uk/tests-and-treatments/breast-screening-mammogram/who-breast-screening-is-for/",
  nhsBreastResults: "https://www.nhs.uk/tests-and-treatments/breast-screening-mammogram/your-results/",
  nhsBreastSymptoms: "https://www.nhs.uk/conditions/breast-cancer-in-women/symptoms-of-breast-cancer-in-women/",
  govBreastOverview: "https://www.gov.uk/guidance/breast-screening-programme-overview",
  govBreastGuide: "https://www.gov.uk/government/publications/breast-screening-helping-women-decide",
  nhsLungScreening: "https://www.nhs.uk/tests-and-treatments/lung-cancer-screening/",
  nhsLungSymptoms: "https://www.nhs.uk/conditions/lung-cancer/symptoms/",
  nhsEnglandLungProgramme: "https://www.england.nhs.uk/cancer/lung/",
  ukNscLungRecommendation: "https://view-health-screening-recommendations.service.gov.uk/lung-cancer/",
} as const;

export const hubGroups: { title: string; intro: string; topics: HubTopic[] }[] = [
  {
    title: "NHS Cancer Screening Programmes",
    intro: "Understand who screening is for, what happens and where to find current official guidance.",
    topics: [
      { title: "Bowel Cancer Screening", description: "The NHS programme, home FIT kit, results, benefits and limitations.", href: "/cancer-prevention-screening/bowel-screening", status: "published" },
      { title: "Cervical Screening", description: "An accessible guide to cervical screening and HPV testing.", href: "/cancer-prevention-screening/cervical-screening", status: "published" },
      { title: "Breast Screening", description: "An accessible guide to NHS breast screening and mammograms.", href: "/cancer-prevention-screening/breast-screening", status: "published" },
      { title: "NHS Lung Health Checks", description: "Who may be invited and what a lung health check can involve.", href: "/cancer-prevention-screening/lung-health-checks", status: "published" },
    ],
  },
  {
    title: "Screening Tests Explained",
    intro: "Plain-language guides to common screening and investigation tests.",
    topics: [
      { title: "FIT Test", description: "What a faecal immunochemical test checks for and how it is used.", status: "coming-soon" },
      { title: "HPV Test", description: "How high-risk human papillomavirus testing is used in cervical screening.", status: "coming-soon" },
      { title: "Mammogram", description: "What happens during an X-ray examination of the breasts.", status: "coming-soon" },
      { title: "PSA Test", description: "What a prostate-specific antigen blood test can and cannot indicate.", status: "coming-soon" },
    ],
  },
  {
    title: "Prevention and Early Detection",
    intro: "Evidence-led information to support awareness and informed health decisions.",
    topics: [
      { title: "Cancer Symptoms", description: "Changes to notice and when to seek advice from a healthcare professional.", status: "coming-soon" },
      { title: "Reducing Cancer Risk", description: "Evidence-based actions that may reduce the risk of some cancers.", status: "coming-soon" },
      { title: "HPV Vaccination", description: "How vaccination helps protect against HPV-related cancers.", status: "coming-soon" },
      { title: "Family History and Inherited Risk", description: "When family history may be relevant and who to speak to.", status: "coming-soon" },
    ],
  },
  {
    title: "Screening Access and Equality",
    intro: "Practical information about invitations, barriers and supporting equitable participation.",
    topics: [
      { title: "Understanding Your Screening Invitation", description: "What an invitation means and where to ask questions.", status: "coming-soon" },
      { title: "Why People Miss Cancer Screening", description: "Common practical, social and service barriers to participation.", status: "coming-soon" },
      { title: "Screening and Language Barriers", description: "Finding accessible information and communication support.", status: "coming-soon" },
      { title: "Supporting Someone to Attend Screening", description: "Ways to offer practical, respectful and informed support.", status: "coming-soon" },
    ],
  },
];

export const bowelEvidence: ExternalResource[] = [
  {
    title: "Bowel cancer screening",
    description: "Public information about the NHS bowel cancer screening programme and FIT kit.",
    href: officialLinks.nhsBowelScreening,
    organisation: "NHS",
  },
  {
    title: "Bowel cancer screening: programme overview",
    description: "Current eligibility, programme pathway and evidence-base information for England.",
    href: officialLinks.govProgrammeOverview,
    organisation: "NHS England and GOV.UK",
  },
  {
    title: "Bowel cancer screening recommendation",
    description: "The UK National Screening Committee recommendation and supporting evidence.",
    href: officialLinks.ukNscRecommendation,
    organisation: "UK National Screening Committee",
  },
  {
    title: "NHS screening statistics and programme reports",
    description: "Published screening data and reports, including bowel screening programme information.",
    href: officialLinks.nhsEnglandReports,
    organisation: "NHS England",
  },
  {
    title: "Overview of UK bowel cancer screening programmes",
    description: "A health-professional overview of eligibility, FIT, benefits and harms across the UK nations.",
    href: officialLinks.cancerResearchUkOverview,
    organisation: "Cancer Research UK",
  },
];

export const officialBowelResources: ExternalResource[] = bowelEvidence.slice(0, 4);

export const bowelFaqs = [
  {
    question: "What age does bowel cancer screening start?",
    answer: "Eligibility differs by UK nation and can change. In England, current NHS programme guidance says people aged 50 to 74 who are registered with a GP and live in England are invited every two years. Check the current official guidance for the nation where you live.",
  },
  {
    question: "What is a FIT test?",
    answer: "FIT stands for faecal immunochemical test. It looks for small traces of human blood in a sample of poo. Blood can have causes other than cancer, so a result that needs further tests is not a cancer diagnosis.",
  },
  {
    question: "Is the FIT test painful?",
    answer: "No. The screening FIT kit involves collecting one small sample of poo at home. Nothing is inserted into your body.",
  },
  {
    question: "How do I complete the FIT kit?",
    answer: "Follow the instructions supplied with your kit. You use the sampling stick to collect a small amount of poo, place it back in the bottle, label it as directed and return it in the prepaid packaging. Contact the screening helpline if you need support or an accessible format.",
  },
  {
    question: "What happens if blood is found?",
    answer: "The screening programme will contact you about the next step. In England, this normally starts with an appointment with a specialist screening practitioner, and you may be offered a colonoscopy. Blood in poo can have causes other than cancer.",
  },
  {
    question: "What happens if my result is normal?",
    answer: "A result saying that no further tests are needed means the amount of blood found was below the programme threshold. It does not rule out bowel cancer. You should still contact your GP if you have symptoms or concerns, and you will usually be invited again if you remain eligible.",
  },
  {
    question: "Can I request a replacement screening kit?",
    answer: "In England, the NHS bowel cancer screening helpline can help if a kit has not arrived, has been lost or needs replacing. Use the contact details in your invitation or on the current NHS bowel cancer screening page.",
  },
  {
    question: "What should I do if I have symptoms?",
    answer: "Contact your GP rather than waiting for a screening invitation or kit. Ask for an urgent GP appointment or use NHS 111 for black or dark-red poo or bloody diarrhoea. Call 999 or go to A&E for severe or non-stop bleeding, following current NHS advice.",
  },
  {
    question: "Is a screening FIT test the same as a diagnostic FIT test?",
    answer: "Not necessarily. Screening FIT is offered through a population screening programme to eligible people without symptoms. A clinician may request FIT to help investigate symptoms, using a different pathway and potentially a different threshold. Follow the instructions and advice for the test you were given.",
  },
  {
    question: "Does bowel screening detect every bowel cancer?",
    answer: "No. Screening tests are not completely accurate. A FIT result may not detect bleeding at the time the sample is taken, and some bowel cancers may not bleed. A result requiring no further tests does not rule out cancer now or in the future.",
  },
] as const;
