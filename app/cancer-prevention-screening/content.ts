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
  govFitKitInstructions: "https://www.gov.uk/government/publications/bowel-cancer-screening-kit-how-to-use/nhs-bowel-cancer-screening-fit-kit-instructions",
  govBowelScreeningGuide: "https://www.gov.uk/government/publications/bowel-cancer-screening-benefits-and-risks/nhs-bowel-cancer-screening-helping-you-decide",
  govScreeningForGps: "https://www.gov.uk/guidance/nhs-screening-programmes-information-for-gps-and-practice-staff",
  niceSymptomaticFit: "https://www.nice.org.uk/guidance/dg56/",
  nhsHpv: "https://www.nhs.uk/conditions/human-papilloma-virus-hpv/",
  govCervicalGuide: "https://www.gov.uk/government/publications/cervical-screening-description-in-brief/cervical-screening-helping-you-decide--2",
  nhsMammogramAppointment: "https://www.nhs.uk/tests-and-treatments/breast-screening-mammogram/what-happens-at-your-breast-screening-appointment/",
  govBreastGuideCurrent: "https://www.gov.uk/government/publications/breast-screening-helping-women-decide/nhs-breast-screening-helping-you-decide",
  govBreastImplants: "https://www.gov.uk/government/publications/breast-screening-breast-implant-guidelines/breast-implants-and-breast-screening",
  nhsPsaTest: "https://www.nhs.uk/tests-and-treatments/psa-test/",
  nhsProstateSymptoms: "https://www.nhs.uk/conditions/prostate-cancer/symptoms/",
  ukNscProstateRecommendation: "https://view-health-screening-recommendations.service.gov.uk/prostate-cancer/",
  govTargetedProstateScreening: "https://www.gov.uk/government/publications/prostate-cancer-screening-equality-impact-assessment/equality-impact-assessment-introduction-of-a-targeted-prostate-cancer-screening-programme",
  niceProstateGuidance: "https://www.nice.org.uk/guidance/ng131",
  nhsCancer: "https://www.nhs.uk/conditions/cancer/",
  niceSuspectedCancer: "https://www.nice.org.uk/guidance/ng12/informationforpublic",
  nhsQuitSmoking: "https://www.nhs.uk/live-well/quit-smoking/",
  nhsAlcohol: "https://www.nhs.uk/live-well/alcohol-advice/the-risks-of-drinking-too-much/",
  nhsBalancedDiet: "https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/eating-a-balanced-diet/",
  nhsPhysicalActivity: "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/",
  nhsSunSafety: "https://www.nhs.uk/live-well/seasonal-health/sunscreen-and-sun-safety/",
  nhsHpvVaccine: "https://www.nhs.uk/vaccinations/hpv-vaccine/",
  govHpvGuidance: "https://www.gov.uk/government/publications/hpv-universal-vaccination-guidance-for-health-professionals/hpv-vaccination-guidance-for-healthcare-practitioners",
  govHpvGreenBook: "https://www.gov.uk/government/publications/human-papillomavirus-hpv-the-green-book-chapter-18a",
  nhsCancerRiskGenes: "https://www.nhs.uk/tests-and-treatments/genetic-tests-for-cancer-risk/",
  nhsGeneticTesting: "https://www.nhs.uk/tests-and-treatments/genetic-and-genomic-testing/",
  niceFamilialBreastCancer: "https://www.nice.org.uk/guidance/cg164/chapter/recommendations",
  nhsGenomicsFamilyHistory: "https://www.genomicseducation.hee.nhs.uk/genotes/in-the-clinic/presentation-patient-with-a-family-history-of-cancer/",
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
      { title: "FIT Test", description: "What a faecal immunochemical test checks for and how it is used.", href: "/cancer-prevention-screening/fit-test", status: "published" },
      { title: "HPV Test", description: "How high-risk human papillomavirus testing is used in cervical screening.", href: "/cancer-prevention-screening/hpv-test", status: "published" },
      { title: "Mammogram", description: "What happens during an X-ray examination of the breasts.", href: "/cancer-prevention-screening/mammogram", status: "published" },
      { title: "PSA Test", description: "What a prostate-specific antigen blood test can and cannot indicate.", href: "/cancer-prevention-screening/psa-test", status: "published" },
    ],
  },
  {
    title: "Prevention and Early Detection",
    intro: "Evidence-led information to support awareness and informed health decisions.",
    topics: [
      { title: "Cancer Symptoms", description: "Changes to notice and when to seek advice from a healthcare professional.", href: "/cancer-prevention-screening/cancer-symptoms", status: "published" },
      { title: "Reducing Cancer Risk", description: "Evidence-based actions that may reduce the risk of some cancers.", href: "/cancer-prevention-screening/reducing-cancer-risk", status: "published" },
      { title: "HPV Vaccination", description: "How vaccination helps protect against HPV-related cancers.", href: "/cancer-prevention-screening/hpv-vaccination", status: "published" },
      { title: "Family History and Inherited Risk", description: "When family history may be relevant and who to speak to.", href: "/cancer-prevention-screening/family-history-inherited-risk", status: "published" },
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

export const fitEvidence: ExternalResource[] = [
  {
    title: "Your guide to NHS bowel cancer screening",
    description: "Official information for England about the screening FIT kit, possible results, benefits, limitations and support.",
    href: officialLinks.govBowelScreeningGuide,
    organisation: "NHS England and GOV.UK",
  },
  {
    title: "NHS bowel cancer screening: FIT kit instructions",
    description: "Step-by-step instructions for collecting and returning a screening FIT sample in England.",
    href: officialLinks.govFitKitInstructions,
    organisation: "NHS England and GOV.UK",
  },
  {
    title: "Bowel cancer screening: programme overview",
    description: "Current information about the bowel screening programme, FIT and the follow-up pathway in England.",
    href: officialLinks.govProgrammeOverview,
    organisation: "NHS England and GOV.UK",
  },
  {
    title: "Bowel cancer screening recommendation",
    description: "The UK National Screening Committee recommendation for population bowel cancer screening using FIT.",
    href: officialLinks.ukNscRecommendation,
    organisation: "UK National Screening Committee",
  },
  {
    title: "Quantitative FIT to guide colorectal cancer pathway referral in primary care",
    description: "NICE guidance on clinician-requested FIT for people with signs or symptoms that may suggest colorectal cancer.",
    href: officialLinks.niceSymptomaticFit,
    organisation: "NICE",
  },
  {
    title: "NHS screening programmes: information for GPs and practice staff",
    description: "Official guidance explaining that screening FIT and symptomatic FIT use different contexts and sensitivity levels.",
    href: officialLinks.govScreeningForGps,
    organisation: "NHS England and GOV.UK",
  },
];

export const officialFitResources: ExternalResource[] = fitEvidence.slice(0, 4);

export const fitFaqs = [
  {
    question: "What does FIT stand for?",
    answer: "FIT stands for faecal immunochemical test. It is a laboratory test that checks a small stool sample for tiny amounts of human blood that may not be visible.",
  },
  {
    question: "What does a FIT test check for?",
    answer: "FIT checks for human blood in stool. It does not look for cancer cells and cannot diagnose cancer. Blood can have several causes, so the result must be interpreted in the pathway in which the test was requested.",
  },
  {
    question: "Does an abnormal FIT result mean cancer?",
    answer: "No. An abnormal result means that blood was detected at a level that needs action within that screening or clinical pathway. Conditions other than cancer can cause bleeding, and further assessment is needed to find the cause.",
  },
  {
    question: "Can a normal FIT result miss bowel cancer?",
    answer: "Yes. A normal result does not completely rule out bowel cancer because a cancer or polyp may not be bleeding when the sample is collected. Contact your GP if symptoms persist, change or concern you, even after a normal result.",
  },
  {
    question: "Is the FIT test painful?",
    answer: "No. You collect a small sample from a bowel movement using the sampling stick supplied. Nothing is inserted into your body.",
  },
  {
    question: "How do I collect the sample?",
    answer: "Follow the instructions supplied with your kit. For the NHS screening kit in England, you catch the stool before it touches toilet water, scrape the sampling stick along its surface until the grooves are covered, click the stick back into the bottle, write the date as instructed, seal the return envelope and post it promptly.",
  },
  {
    question: "Can piles or haemorrhoids affect a FIT result?",
    answer: "Piles can bleed and may be one possible cause of blood in stool. Do not assume that piles explain a result or symptom. Follow the advice that comes with your result and contact your GP about bleeding or other concerns.",
  },
  {
    question: "Can I complete a FIT test during my period?",
    answer: "For the NHS bowel screening kit in England, official guidance says it is best to collect the sample when you are not having a period and to avoid the two days before or after bleeding. For a clinician-requested FIT, follow the instructions from the requesting service or ask them when to collect the sample.",
  },
  {
    question: "What should I do if I lose or damage the kit?",
    answer: "If it is an NHS bowel screening kit in England, call the free bowel cancer screening helpline on 0800 707 60 60 for help or a replacement. If a GP or another clinician requested the test, contact the service that supplied it.",
  },
  {
    question: "Is screening FIT the same as a FIT requested by my GP?",
    answer: "The laboratory method may be similar, but the purpose, threshold, result wording and follow-up pathway can differ. Screening FIT is offered through a population programme to eligible people without symptoms. Clinician-requested FIT helps assess certain symptoms and must be interpreted alongside clinical information.",
  },
  {
    question: "How will I receive the result?",
    answer: "The NHS bowel screening programme in England sends screening results by letter. For a clinician-requested FIT, the requesting GP or service should explain how and when the result will be communicated. Contact that service if you are unsure.",
  },
  {
    question: "What should I do if I have symptoms?",
    answer: "Contact your GP rather than waiting for a routine screening invitation or kit. A screening test is not a substitute for medical assessment, and persistent or concerning symptoms still need review even after a normal FIT result.",
  },
] as const;

export const hpvEvidence: ExternalResource[] = [
  { title: "Human papillomavirus (HPV)", description: "Current NHS information about HPV, high-risk types, transmission, testing and vaccination.", href: officialLinks.nhsHpv, organisation: "NHS" },
  { title: "Your cervical screening results", description: "NHS explanations of HPV-negative, HPV-positive and unclear cervical screening results.", href: officialLinks.nhsCervicalResults, organisation: "NHS" },
  { title: "Your guide to NHS cervical screening", description: "The current official guide to cervical screening, HPV testing, results, benefits and risks in England.", href: officialLinks.govCervicalGuide, organisation: "NHS England and GOV.UK" },
  { title: "Cervical screening programme overview", description: "Programme information about primary HPV testing and the cervical screening pathway in England.", href: officialLinks.govCervicalOverview, organisation: "NHS England and GOV.UK" },
];

export const officialHpvResources: ExternalResource[] = hpvEvidence;

export const hpvFaqs = [
  { question: "Does HPV mean I have cancer?", answer: "No. HPV is common, and finding a high-risk type does not mean that you have cervical cancer. Your cervical screening result explains whether abnormal cells were found and whether any follow-up is needed." },
  { question: "Does an HPV-positive result mean my partner has been unfaithful?", answer: "No. HPV can remain in the body or become detectable after many years. A positive result cannot show when HPV was acquired or from whom, and it does not establish infidelity." },
  { question: "Can HPV remain undetected for years?", answer: "Yes. HPV may be present for a long time without causing symptoms, and it can become detectable after a period when it was not detected. A result cannot reliably date the infection." },
  { question: "Can HPV clear on its own?", answer: "Yes. The immune system clears most HPV infections without treatment. Follow the screening advice in your result because persistent high-risk HPV may need closer checks." },
  { question: "Is an HPV test the same as a smear test?", answer: "Cervical screening used to be called a smear test. In the current England pathway, a cervical sample is tested first for high-risk HPV. If high-risk HPV is found, the same sample is checked for abnormal cervical cells." },
  { question: "Does the HPV vaccine mean I no longer need cervical screening?", answer: "No. The vaccine does not protect against every high-risk HPV type. If you are eligible for cervical screening, the NHS advises taking part even if you have been vaccinated." },
  { question: "What happens if high-risk HPV is found?", answer: "The next step depends on whether abnormal cervical cells are also found and on your previous results. You may be invited for another screening test or referred for colposcopy. Follow the instructions in your result." },
  { question: "What if I have symptoms?", answer: "Contact your GP rather than waiting for routine cervical screening. Cervical screening is for people without symptoms and does not check for every gynaecological cancer." },
] as const;

export const mammogramEvidence: ExternalResource[] = [
  { title: "Breast screening (mammogram)", description: "NHS information about breast screening, mammograms, eligibility and informed choice.", href: officialLinks.nhsBreastScreening, organisation: "NHS" },
  { title: "What happens at your breast screening appointment", description: "Current NHS practical guidance about preparation, breast positioning, compression and support during the appointment.", href: officialLinks.nhsMammogramAppointment, organisation: "NHS" },
  { title: "Your breast screening results", description: "NHS explanations of normal results, recall and possible further tests.", href: officialLinks.nhsBreastResults, organisation: "NHS" },
  { title: "Your guide to NHS breast screening", description: "The current England guide to how screening works and its possible benefits and harms.", href: officialLinks.govBreastGuideCurrent, organisation: "NHS England and GOV.UK" },
  { title: "Breast implants and breast screening", description: "Official England guidance about mammography for people with breast implants.", href: officialLinks.govBreastImplants, organisation: "NHS England and GOV.UK" },
];

export const officialMammogramResources: ExternalResource[] = mammogramEvidence.slice(0, 4);

export const mammogramFaqs = [
  { question: "Does a mammogram hurt?", answer: "Breast compression is brief, but it can be uncomfortable and is painful for some people. Tell the mammographer how you feel. You remain in control and can ask to pause or stop." },
  { question: "How long does a mammogram take?", answer: "Taking each image is brief, but the appointment also includes changing, positioning and checks. Your invitation or screening service can tell you how much time to allow." },
  { question: "What should I wear?", answer: "The NHS suggests wearing a top that is easy to remove because you will undress from the waist up. You will be given privacy to change." },
  { question: "Can I use deodorant?", answer: "Current NHS guidance says not to use deodorant, antiperspirant or talcum powder on the day because these may affect the mammogram." },
  { question: "What does being recalled mean?", answer: "It means the screening team needs more information. You may have more mammograms, a breast examination, an ultrasound or a biopsy. Most people recalled for further tests are not diagnosed with breast cancer." },
  { question: "Can mammograms miss breast cancer?", answer: "Yes. No screening test finds every cancer. Continue to be aware of your breasts and contact your GP about a new or unusual change even after a normal mammogram." },
  { question: "What if I have breast implants?", answer: "Tell the screening service and mammographer before the examination. Implants can hide some breast tissue, so extra views may be offered. Screening checks breast tissue, not the condition of an implant." },
  { question: "What if I find a breast lump after a normal mammogram?", answer: "Contact your GP. A normal screening result does not rule out every cancer and should not delay assessment of a new lump or other breast change." },
  { question: "Is a screening mammogram the same as a mammogram for breast symptoms?", answer: "The imaging method may be similar, but the pathways are different. Routine screening is offered to eligible people without symptoms. Symptoms need clinical assessment, which may involve examination and diagnostic imaging." },
] as const;

export const psaEvidence: ExternalResource[] = [
  { title: "PSA test", description: "Current NHS information about what PSA testing measures, access, preparation, results, benefits and risks.", href: officialLinks.nhsPsaTest, organisation: "NHS" },
  { title: "Prostate cancer screening recommendation", description: "The March 2026 UK National Screening Committee position on general-population and targeted prostate screening.", href: officialLinks.ukNscProstateRecommendation, organisation: "UK National Screening Committee" },
  { title: "Targeted prostate cancer screening equality impact assessment", description: "Official England information about the targeted recommendation for men aged 45–61 with a pathogenic BRCA2 variant and relevant family history, including implementation considerations.", href: officialLinks.govTargetedProstateScreening, organisation: "Department of Health and Social Care and GOV.UK" },
  { title: "Prostate cancer: diagnosis and management", description: "NICE guidance on informed decisions, MRI, biopsy and assessment when prostate cancer is suspected.", href: officialLinks.niceProstateGuidance, organisation: "NICE" },
  { title: "Prostate cancer symptoms", description: "Current NHS advice about symptoms and when to contact a GP.", href: officialLinks.nhsProstateSymptoms, organisation: "NHS" },
];

export const officialPsaResources: ExternalResource[] = psaEvidence.slice(0, 4);

export const psaFaqs = [
  { question: "Does a high PSA mean prostate cancer?", answer: "No. PSA can be raised by prostate enlargement, inflammation, infection and other factors. A raised result needs interpretation in context and may lead to repeat testing, examination, MRI or other assessment." },
  { question: "Can a normal PSA miss prostate cancer?", answer: "Yes. A PSA result within the expected range does not completely rule out prostate cancer. Contact your GP if symptoms persist, change or concern you." },
  { question: "Can I ask my GP for a PSA test?", answer: "Men and anyone with a prostate can ask a GP about PSA testing. The GP should discuss your symptoms, personal risk and the possible benefits and harms before deciding with you whether testing is appropriate." },
  { question: "Why is there no general-population PSA screening programme?", answer: "The UK National Screening Committee concluded that screening is more likely to cause more harm than good across the general population. It recommends PSA testing every 2 years only for men aged 45–61 who have both a pathogenic BRCA2 variant and a relevant family history of breast, ovarian, pancreatic or prostate cancer. How eligible men are identified and invited may continue to develop." },
  { question: "What can affect my PSA level?", answer: "Prostate enlargement, inflammation or infection can raise PSA. Ejaculation, anal sex, vigorous exercise and cycling shortly before the test can also affect the result. Follow the preparation advice from the service arranging your test." },
  { question: "Do I need to prepare before the blood test?", answer: "Current NHS guidance advises avoiding ejaculation, anal sex, vigorous exercise and cycling for 48 hours before a PSA test. Tell the clinician about infections, recent prostate procedures and medicines, and follow their instructions." },
  { question: "What happens if my PSA is raised?", answer: "Your clinician will consider the result with your age, symptoms, examination and risk factors. They may repeat the test, treat a possible infection or refer you for investigations such as MRI. A raised PSA alone is not a diagnosis." },
  { question: "Should every man over 50 have a PSA test?", answer: "No blanket recommendation applies. PSA testing involves trade-offs, so the decision should be based on informed discussion of individual risk, preferences, possible benefits and possible harms." },
  { question: "What if I have urinary symptoms?", answer: "Contact your GP for assessment rather than relying on a PSA test alone. Urinary symptoms often have non-cancer causes, but they still need appropriate clinical review." },
] as const;

export const cancerSymptomsEvidence: ExternalResource[] = [
  { title: "Cancer", description: "Current NHS information about possible cancer symptoms, when to contact a GP, causes and risk reduction.", href: officialLinks.nhsCancer, organisation: "NHS" },
  { title: "Suspected cancer: information for the public", description: "NICE information about symptom assessment, tests, referral and safety netting.", href: officialLinks.niceSuspectedCancer, organisation: "NICE" },
];

export const officialCancerSymptomsResources: ExternalResource[] = cancerSymptomsEvidence;

export const cancerSymptomsFaqs = [
  { question: "Does having one of these symptoms mean I have cancer?", answer: "No. These symptoms are common and often have causes other than cancer. A GP can assess the change, consider other explanations and decide whether any tests or referral are needed." },
  { question: "How long should I wait before contacting a GP?", answer: "There is no single safe waiting period for every symptom. Contact a GP if a change is not normal for you, persists, worsens or worries you. Seek help sooner for bleeding, coughing up blood, a new lump or another change that feels urgent." },
  { question: "Should I wait for my screening invitation?", answer: "No. Routine screening is generally for eligible people without symptoms. Contact your GP about symptoms rather than waiting for screening, even if an invitation is due soon." },
  { question: "What if a test was normal but the symptom continues?", answer: "Contact the clinician or your GP again if the symptom persists, recurs or worsens, or if you remain concerned. NICE describes this follow-up as safety netting." },
  { question: "Does an urgent referral mean I have cancer?", answer: "No. An urgent suspected-cancer referral is a precaution to investigate a possible cause promptly. Most referred people will not be diagnosed with cancer." },
  { question: "Can I bring someone to an appointment?", answer: "You can ask whether a relative, friend, carer or interpreter can support you. Tell the service about communication, mobility or other access needs when arranging the appointment." },
] as const;

export const cancerRiskEvidence: ExternalResource[] = [
  { title: "Cancer", description: "NHS guidance on established cancer risk factors and practical steps that may reduce the risk of some cancers.", href: officialLinks.nhsCancer, organisation: "NHS" },
  { title: "Quit smoking", description: "NHS information and routes to stop-smoking support.", href: officialLinks.nhsQuitSmoking, organisation: "NHS" },
  { title: "The risks of drinking too much", description: "NHS low-risk drinking guidance and information about alcohol-related health harms.", href: officialLinks.nhsAlcohol, organisation: "NHS" },
  { title: "Eating a balanced diet", description: "Current NHS Eatwell guidance, including fibre, fruit and vegetables, and red and processed meat.", href: officialLinks.nhsBalancedDiet, organisation: "NHS" },
  { title: "Physical activity guidelines for adults", description: "Current NHS activity guidance for adults aged 19 to 64.", href: officialLinks.nhsPhysicalActivity, organisation: "NHS" },
  { title: "Sunscreen and sun safety", description: "Current NHS guidance on UV exposure, shade, clothing and sunscreen.", href: officialLinks.nhsSunSafety, organisation: "NHS" },
];

export const officialCancerRiskResources: ExternalResource[] = cancerRiskEvidence;

export const cancerRiskFaqs = [
  { question: "Can cancer always be prevented?", answer: "No. Anyone can develop cancer, and it is not always clear what caused it. Evidence-based actions can reduce the risk of some cancers but cannot guarantee protection." },
  { question: "What is the most useful first step?", answer: "The right starting point depends on you. If you smoke, NHS stop-smoking support can help. Other practical options include drinking less alcohol, moving more, eating a balanced diet and protecting skin from UV." },
  { question: "Is there a safe amount of alcohol?", answer: "NHS guidance describes 14 units a week as a low-risk limit, not a safe level. Drinking less reduces alcohol-related health risk." },
  { question: "Do supplements prevent cancer?", answer: "Do not rely on supplements as a substitute for a balanced diet or medical care. Ask a pharmacist, GP or dietitian before taking supplements if you have a health condition, use medicines or are unsure." },
  { question: "Does screening prevent cancer?", answer: "Screening and prevention are related but different. Some screening can find changes before cancer develops, while other screening aims to find cancer earlier. No screening test prevents or detects every cancer." },
  { question: "What if healthy changes feel unaffordable or inaccessible?", answer: "Small changes can still matter, and support should respect cost, disability, culture and local access. NHS Better Health, your GP surgery and local services may offer practical support." },
] as const;

export const hpvVaccinationEvidence: ExternalResource[] = [
  { title: "HPV vaccine", description: "Current NHS eligibility, catch-up routes, doses, safety and access information.", href: officialLinks.nhsHpvVaccine, organisation: "NHS" },
  { title: "Human papillomavirus (HPV)", description: "NHS information about HPV, transmission, prevention and cervical screening.", href: officialLinks.nhsHpv, organisation: "NHS" },
  { title: "HPV vaccination guidance for healthcare practitioners", description: "UKHSA programme guidance, schedules, eligibility and evidence for the current UK HPV vaccine.", href: officialLinks.govHpvGuidance, organisation: "UK Health Security Agency and GOV.UK" },
  { title: "HPV: the Green Book, chapter 18a", description: "Official UK immunisation guidance on HPV vaccination, contraindications and schedules.", href: officialLinks.govHpvGreenBook, organisation: "UK Health Security Agency and GOV.UK" },
];

export const officialHpvVaccinationResources: ExternalResource[] = hpvVaccinationEvidence;

export const hpvVaccinationFaqs = [
  { question: "Who is routinely offered the HPV vaccine?", answer: "In England, all children aged 12 to 13 in school year 8 are offered it. Catch-up and higher-risk routes are cohort-specific, so check the current NHS page or ask the relevant school, GP, sexual health or HIV service." },
  { question: "Can I catch up if I missed it at school?", answer: "Some people can. Current NHS guidance offers catch-up to eligible girls and eligible boys up to their 25th birthday, with the boys' cohort linked to date of birth. Ask the NHS service named in the current eligibility guidance." },
  { question: "How many doses are needed?", answer: "Current NHS guidance says most eligible people under 25 have one dose, people aged 25 to 45 usually have two, and people with a weakened immune system have three. Follow the schedule given by your vaccinating service." },
  { question: "Can the vaccine treat an HPV infection I already have?", answer: "No. It does not treat an existing infection or cell changes. It may still protect against vaccine HPV types you have not acquired, if you are eligible." },
  { question: "Is the HPV vaccine safe?", answer: "The HPV vaccine is routinely used in the UK. Common side effects are usually mild and short-lived, such as a sore arm, headache or tiredness. Serious allergic reactions are very rare, and vaccinators are trained to respond." },
  { question: "Do I still need cervical screening after vaccination?", answer: "Yes, if you are eligible. The vaccine does not protect against every cancer-causing HPV type and does not replace cervical screening." },
  { question: "Does the vaccine contain a live virus?", answer: "No. The HPV vaccine cannot cause HPV infection. Ask the vaccinating service or check the official patient leaflet if you have questions about ingredients." },
] as const;

export const familyHistoryEvidence: ExternalResource[] = [
  { title: "Genetic tests to check your cancer risk", description: "NHS information about when testing may be considered, genetic counselling and possible results.", href: officialLinks.nhsCancerRiskGenes, organisation: "NHS" },
  { title: "Genetic and genomic testing", description: "NHS information about referral, counselling, testing and the implications of results for families.", href: officialLinks.nhsGeneticTesting, organisation: "NHS" },
  { title: "Familial breast cancer: recommendations", description: "NICE guidance on taking a family history, referral, genetic assessment and surveillance.", href: officialLinks.niceFamilialBreastCancer, organisation: "NICE" },
  { title: "Patient with a family history of cancer", description: "NHS Genomics Education guidance on significant family patterns and referral to clinical genetics in England.", href: officialLinks.nhsGenomicsFamilyHistory, organisation: "NHS England Genomics Education Programme" },
];

export const officialFamilyHistoryResources: ExternalResource[] = familyHistoryEvidence;

export const familyHistoryFaqs = [
  { question: "Does cancer in my family mean I will get cancer?", answer: "No. Family history can influence risk but does not determine your future. Shared environment, chance and other factors may also contribute." },
  { question: "Which side of the family matters?", answer: "Both maternal and paternal relatives matter. Useful details include the cancer type, age at diagnosis, whether one person had more than one cancer, and any known genetic-test result." },
  { question: "Does everyone with a family history need genetic testing?", answer: "No. A GP or specialist can assess the pattern and decide whether genetics referral or testing is appropriate. Testing may be most informative when it starts with a relative who has had cancer." },
  { question: "What can a genetic-test result show?", answer: "It may identify a known pathogenic variant, find no such variant, or find a variant whose meaning is uncertain. A genetics professional can explain what the result does and does not mean." },
  { question: "Does a negative result mean my risk is zero?", answer: "No. The meaning depends on what was tested and whether a known family variant exists. Family history and other factors may still affect advice even when no variant is found." },
  { question: "What should I record before speaking to my GP?", answer: "If you can, note which relatives had cancer, the type, age at diagnosis, whether cancer affected paired organs or occurred more than once, and any genetic-test result. Do not delay asking for advice if details are incomplete." },
  { question: "Should I wait for genetic assessment if I have symptoms?", answer: "No. Contact your GP about symptoms or unusual changes now. Family-risk assessment and routine screening do not replace assessment of symptoms." },
] as const;
