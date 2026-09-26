export type InsightStatus = "published" | "forthcoming" | "archive-slot";
export type InsightArea = "Series & Collections" | "Local Lens" | "Conversations" | "Evidence & Policy" | "Implementation & Equity" | "Innovation in Practice";

export type InsightAuthor = {
  id: string;
  type: "person" | "organisation";
  name: string;
  credentials?: string;
  affiliation?: string;
  biography: string;
  guest?: boolean;
};

export type InsightRecord = {
  slug: string;
  href?: `/insights/${string}`;
  title: string;
  shortTitle?: string;
  area: InsightArea;
  crossTags: string[];
  status: InsightStatus;
  description: string;
  image?: string;
  imageAlt?: string;
  publishedAt?: string;
  publishedAtIso?: string;
  authorIds?: string[];
  tags?: string[];
  ccpeLens?: string[];
  reflectionQuestion?: string;
  linkedinDiscussionUrl?: string;
  engagementContactLabel?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  socialImage?: string;
  socialImageAlt?: string;
  socialImageWidth?: number;
  socialImageHeight?: number;
  socialImageType?: "image/jpeg" | "image/png" | "image/webp";
  socialTitle?: string;
  socialDescription?: string;
  keywords?: string[];
  datePublished?: string;
  dateModified?: string;
};

export const insightPublisher = {
  name: "BloomShield Insights",
  organisation: "BloomShield Community Interest Company",
} as const;

export const insightAuthors: Record<string, InsightAuthor> = {
  "femi-olaleye": {
    id: "femi-olaleye",
    type: "person",
    name: "Dr Femi Olaleye",
    credentials: "Global Health Specialist & Cancer Prevention Expert",
    affiliation: "Founder & CEO, BloomShield CIC",
    biography: "Dr Femi Olaleye is a global health specialist and cancer prevention expert, and the founder of BloomShield CIC. His work focuses on equitable cancer prevention, screening access, implementation, community engagement and partnerships that translate evidence into practical improvements in cancer care.",
  },
};

export function getInsightAuthors(record: Pick<InsightRecord, "authorIds">) {
  return (record.authorIds ?? []).map(id => insightAuthors[id]).filter((author): author is InsightAuthor => Boolean(author));
}

export const ccpeDomains = ["People", "Partnerships", "Systems", "Innovation", "Equity", "Impact"] as const;

export const conversationsSeries = {
  title: "Conversations Across the Cancer Care Ecosystem",
  href: "/insights/conversations" as const,
  description: "Conversations Across the Cancer Care Ecosystem examines organisations, leaders and innovations shaping the future of equitable cancer care — exploring not only what they are building, but what it takes for good ideas to work in real health systems.",
  image: "/images/insights/conversations-saratani-ai.png" as const,
  overviewImage: "/images/insights/from-diagnostics-to-access-card-artwork.png" as const,
  imageAlt: "BloomShield Conversations: From Diagnostics to Access, featuring Olusola ‘Shola’ Ogunbowale and Dr Femi Olaleye.",
  seoTitle: "Conversations Across the Cancer Care Ecosystem",
  seoDescription: "BloomShield Insights conversations with leaders and innovators shaping equitable cancer prevention, screening and care across health systems.",
  canonicalUrl: "/insights/conversations",
  socialImage: "/images/insights/conversations-saratani-ai.png",
  socialImageAlt: "BloomShield Insights conversation with Dr Sang’udi Sang’udi of SarataniAI about equitable cervical cancer screening.",
  socialImageWidth: 1672,
  socialImageHeight: 941,
  keywords: ["equitable cancer care", "cancer screening innovation", "health systems", "cancer care partnerships", "SarataniAI"],
};

export const localLensSeries = {
  title: "BloomShield Local Lens",
  href: "/insights/local-lens" as const,
  description: "A recurring BloomShield Insights series examining local cancer data, the inequalities beneath the averages, and the community and system responses that can make prevention and early diagnosis more equitable.",
  image: "/images/insights/local-lens-medway-card.png" as const,
  imageAlt: "BloomShield Local Lens Medway and Kent edition: cancer screening statistics for breast, bowel and cervical screening alongside a Medway and Kent map and local community scene.",
  seoTitle: "BloomShield Local Lens | Local Cancer Data and Health Equity",
  seoDescription: "BloomShield Local Lens connects local cancer data, inequality gaps, community voices and practical action, beginning with cancer screening in Medway and Kent.",
  canonicalUrl: "/insights/local-lens",
  socialImage: "/images/insights/local-lens-medway-card.png",
  socialImageAlt: "BloomShield Local Lens Medway and Kent edition exploring what local cancer screening data tells us.",
  socialImageWidth: 1672,
  socialImageHeight: 941,
  keywords: ["BloomShield Local Lens", "local cancer data", "cancer screening inequalities", "Medway", "Kent", "health equity", "community health"],
};

export const partnershipPlaybook = {
  title: "The Partnership Playbook for Equitable Cancer Care",
  description: "The foundational BloomShield Insights archive: an eight-part series and a final handover essay on building partnerships capable of advancing equitable cancer care.",
  slots: [
    ...Array.from({ length: 8 }, (_, index) => ({ label: `Part ${index + 1}`, status: "Archive slot" })),
    { label: "Why I wrote the series", status: "Handover essay" },
  ],
};

export const insights: InsightRecord[] = [
  {
    slug: "county-durham-breast-services-review",
    href: "/insights/implementation-equity/county-durham-breast-services-review",
    title: "4,500 Breast Cancer Records Under Review in County Durham: What Went Wrong, What Changed — and What We Can Learn",
    shortTitle: "County Durham breast services review",
    area: "Implementation & Equity",
    crossTags: ["Clinical Governance", "Service Improvement", "Breast Cancer"],
    status: "published",
    description: "A careful look at County Durham’s historic breast-services review, the changes the Trust reports making, and what clinical audit, implementation and evaluation can teach health systems.",
    image: "/images/insights/county-durham-breast-services-review-card.png",
    imageAlt: "BloomShield Insight card for the County Durham breast services review, showing University Hospital of North Durham and a map locating County Durham.",
    publishedAt: "26 September 2026",
    publishedAtIso: "2026-09-26",
    authorIds: ["femi-olaleye"],
    tags: ["Implementation & Equity", "Breast Cancer", "Clinical Governance", "Quality Improvement", "Patient Safety", "County Durham", "NHS"],
    ccpeLens: ["Understand", "Validate", "Implement", "Evaluate"],
    reflectionQuestion: "When a service identifies serious failure, how will it demonstrate—openly and over time—that the changes it makes are improving care?",
    engagementContactLabel: "Share evidence or perspective",
    seoTitle: "County Durham Breast Services Review: What Changed and What We Can Learn",
    seoDescription: "What County Durham’s breast-services look-back tells us about clinical audit, implementation, governance and sustaining safer cancer care.",
    canonicalUrl: "/insights/implementation-equity/county-durham-breast-services-review",
    socialImage: "/images/insights/county-durham-breast-services-review-card.png",
    socialImageAlt: "County Durham breast services review: University Hospital of North Durham and a map locating County Durham.",
    socialImageWidth: 1672,
    socialImageHeight: 941,
    socialImageType: "image/png",
    keywords: ["County Durham breast services", "breast services look-back", "clinical governance", "quality improvement", "implementation science", "patient safety", "breast cancer care"],
    datePublished: "2026-09-26",
    dateModified: "2026-09-26",
  },
  {
    slug: "medway-kent",
    href: "/insights/local-lens/medway-kent",
    title: "Cancer screening in Medway: what the local data tells us",
    shortTitle: "Local Lens: Medway & Kent",
    area: "Local Lens",
    crossTags: ["Cancer Screening", "Health Equity", "Community"],
    status: "published",
    description: "BloomShield Local Lens begins in Medway and Kent, examining screening progress, the inequality gaps beneath local averages, and how community and system partners can respond.",
    image: "/images/insights/local-lens-medway-hero.png",
    imageAlt: "BloomShield Local Lens banner for Medway and Kent showing breast, bowel and cervical screening statistics, a Medway and Kent map, local landmarks and community members.",
    publishedAt: "20 September 2026",
    publishedAtIso: "2026-09-20",
    authorIds: ["femi-olaleye"],
    tags: ["Local Lens", "Medway", "Kent", "Cancer Screening", "Breast Screening", "Bowel Screening", "Cervical Screening", "Health Inequalities", "Early Diagnosis", "Community Health"],
    ccpeLens: ["Understand", "Validate", "Implement", "Evaluate"],
    reflectionQuestion: "What are you seeing locally? Who is still being missed? And what would help more people complete the screening pathway?",
    linkedinDiscussionUrl: "https://lnkd.in/p/ed-8pcsi",
    engagementContactLabel: "Share local insight",
    seoTitle: "Cancer Screening in Medway: What the Local Data Tells Us",
    seoDescription: "Current breast, bowel and cervical screening data for Medway, the inequalities beneath the averages, and what local partners are doing to improve access.",
    canonicalUrl: "/insights/local-lens/medway-kent",
    socialImage: "/images/insights/local-lens-medway-hero.png",
    socialImageAlt: "Cancer screening in Medway: current breast, bowel and cervical screening figures compared with England.",
    socialImageWidth: 1983,
    socialImageHeight: 793,
    keywords: ["cancer screening Medway", "Medway cancer data", "Kent cancer screening", "breast screening Medway", "bowel screening Medway", "cervical screening Medway", "cancer screening inequalities", "health equity Medway"],
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
  },
  {
    slug: "australia-world-eliminating-cervical-cancer",
    href: "/insights/evidence-policy/australia-world-eliminating-cervical-cancer",
    title: "Australia → World: What Does It Really Take to Eliminate Cervical Cancer?",
    shortTitle: "Australia → World: eliminating cervical cancer",
    area: "Evidence & Policy",
    crossTags: ["Implementation & Equity", "Systems", "Equity"],
    status: "published",
    description: "Australia is moving towards cervical cancer elimination. The real lesson for the world is how vaccination, screening, data, follow-up and policy were connected into a system.",
    image: "/images/insights/australia-success-story-banner-1.png",
    imageAlt: "BloomShield Insights Australia to World graphic exploring what it takes to eliminate cervical cancer, featuring Sydney and a connected world map.",
    publishedAt: "12 September 2026",
    publishedAtIso: "2026-09-12",
    authorIds: ["femi-olaleye"],
    tags: ["Cervical Cancer", "HPV", "Cancer Prevention", "Cancer Screening", "Health Policy", "Implementation Science", "Health Equity", "Australia"],
    ccpeLens: ["Understand", "Validate", "Implement", "Evaluate"],
    reflectionQuestion: "What would it take for every health system to connect prevention, screening, diagnosis, treatment and follow-up into a pathway that reaches every woman?",
    linkedinDiscussionUrl: "https://www.linkedin.com/pulse/australia-world-how-do-you-actually-eliminate-cancer-dr-femi-vryze",
    seoTitle: "Australia → World: What Does It Really Take to Eliminate Cervical Cancer? | BloomShield Insights",
    seoDescription: "Australia is on track to eliminate cervical cancer as a public-health problem by 2035. BloomShield examines the system behind its progress and what other countries can learn.",
    canonicalUrl: "/insights/evidence-policy/australia-world-eliminating-cervical-cancer",
    socialImage: "/images/insights/australia-banner.jpg",
    socialImageAlt: "Australia to World — BloomShield Insights perspective on how Australia is working towards cervical cancer elimination.",
    socialImageWidth: 1093,
    socialImageHeight: 346,
    socialImageType: "image/jpeg",
    socialTitle: "Australia → World: What Does It Really Take to Eliminate Cervical Cancer?",
    socialDescription: "Australia’s cervical cancer progress is not the story of one breakthrough. It is the story of a system. What can the rest of the world learn?",
    keywords: ["cervical cancer elimination Australia", "HPV vaccination Australia", "cervical screening Australia", "HPV self-collection", "cancer prevention", "health systems", "health equity"],
    datePublished: "2026-09-12",
    dateModified: "2026-09-12",
  },
  {
    slug: "hpv-self-testing-screening-gap",
    href: "/insights/evidence-policy/hpv-self-testing-screening-gap",
    title: "HPV Self-Testing Is a Major Step Forward — But Will It Close the Screening Gap?",
    shortTitle: "HPV self-testing and the screening gap",
    area: "Evidence & Policy",
    crossTags: ["Implementation & Equity", "Systems", "Equity"],
    status: "published",
    description: "NHS England’s national offer could remove an important barrier to screening. Its impact will depend on whether under-screened women complete the pathway from invitation to follow-up.",
    image: "/images/insights/hpv-self-testing.png",
    imageAlt: "NHS HPV home testing kit and cervical screening self-testing in England",
    publishedAt: "25 August 2026",
    publishedAtIso: "2026-08-25",
    authorIds: ["femi-olaleye"],
    tags: ["Cervical Cancer", "HPV", "HPV Home Testing Kit", "Cancer Screening", "Prevention", "Health Equity", "NHS England", "Implementation"],
    ccpeLens: ["Understand", "Validate", "Implement", "Evaluate"],
    reflectionQuestion: "What would it take for HPV self-testing to translate from easier access into equitable completion of the full screening pathway?",
    linkedinDiscussionUrl: "https://lnkd.in/p/eCgDe-ka",
    seoTitle: "NHS HPV Self-Testing in England: Can Home Testing Close the Gap?",
    seoDescription: "NHS England is rolling out HPV self-testing for women overdue for cervical screening. Can home testing improve uptake, reduce inequalities and follow-up?",
    canonicalUrl: "/insights/evidence-policy/hpv-self-testing-screening-gap",
    socialImage: "/images/insights/hpv-self-testing.png",
    socialImageAlt: "NHS HPV home testing kit and cervical screening self-testing in England",
    socialImageWidth: 1672,
    socialImageHeight: 941,
    keywords: ["HPV Home Testing Kit", "HPV self testing UK", "NHS HPV self testing", "cervical screening home test", "HPV self sampling England", "cervical cancer screening at home", "NHS cervical screening self test", "cervical screening inequalities"],
    datePublished: "2026-08-25",
    dateModified: "2026-08-25",
  },
  {
    slug: "from-diagnostics-to-access-africa",
    href: "/insights/conversations/from-diagnostics-to-access-africa",
    title: "From Diagnostics to Access",
    shortTitle: "From Diagnostics to Access",
    area: "Series & Collections",
    crossTags: ["Conversations", "Implementation & Equity", "Innovation in Practice"],
    status: "published",
    description: "What it will take to build resilient diagnostic ecosystems across Africa.",
    image: "/images/insights/from-diagnostics-to-access-hero-banner.png",
    imageAlt: "From Diagnostics to Access - BloomShield Conversations Across the Cancer Care Ecosystem with Olusola ‘Shola’ Ogunbowale, interviewed by Dr Femi Olaleye.",
    publishedAt: "4 September 2026",
    publishedAtIso: "2026-09-04",
    authorIds: ["femi-olaleye"],
    tags: ["Diagnostics", "Africa", "Molecular Diagnostics", "HPV", "Cervical Cancer", "Health Systems", "Access", "Health Equity", "Local Manufacturing", "QIAGEN"],
    ccpeLens: ["Understand", "Validate", "Implement", "Evaluate"],
    reflectionQuestion: "What will it take to make advanced diagnostics reachable, affordable, sustainable and scalable for the people who need them most?",
    linkedinDiscussionUrl: "https://lnkd.in/p/eiSbKPMh",
    engagementContactLabel: "Continue the conversation",
    seoTitle: "From Diagnostics to Access | BloomShield Conversations",
    seoDescription: "A BloomShield conversation with Olusola ‘Shola’ Ogunbowale on equitable access to molecular diagnostics and resilient diagnostic systems across Africa.",
    canonicalUrl: "/insights/conversations/from-diagnostics-to-access-africa",
    socialImage: "/images/insights/from-diagnostics-to-access-hero-banner.png",
    socialImageAlt: "From Diagnostics to Access - BloomShield Conversations Across the Cancer Care Ecosystem with Olusola ‘Shola’ Ogunbowale, interviewed by Dr Femi Olaleye.",
    socialImageWidth: 1536,
    socialImageHeight: 512,
    keywords: ["Diagnostics", "Africa", "Molecular Diagnostics", "HPV", "Cervical Cancer", "Health Systems", "Access", "Health Equity", "Local Manufacturing", "QIAGEN"],
    datePublished: "2026-09-04",
    dateModified: "2026-09-04",
  },
  {
    slug: "saratani-ai",
    title: "Dr Sang’udi Sang’udi | SarataniAI",
    area: "Series & Collections",
    crossTags: ["Innovation in Practice", "Systems", "Equity"],
    status: "forthcoming",
    description: "A forthcoming BloomShield Insights conversation exploring AI-enabled cervical cancer screening, frontline healthcare delivery and what innovation must overcome to work in low-resource settings.",
    image: "/images/insights/conversations-saratani-ai.png",
    imageAlt: "BloomShield Insights conversation with Dr Sang’udi Sang’udi of SarataniAI about equitable cervical cancer screening.",
  },
];

export const insightAreas = [
  { name: "Overview", href: "/insights", description: "The full BloomShield Insights publishing programme." },
  { name: "Series & Collections", href: "/insights#series", description: "Sustained editorial programmes that build knowledge across connected questions." },
  { name: "Local Lens", href: "/insights/local-lens", description: "Local data, inequality gaps, community voices and practical action." },
  { name: "Conversations", href: "/insights/conversations", description: "Conversations with people shaping more equitable cancer care." },
  { name: "Evidence & Policy", description: "What emerging evidence and policy decisions mean for equitable cancer prevention." },
] as const;
