export type InsightStatus = "published" | "forthcoming" | "archive-slot";
export type InsightArea = "Series & Collections" | "Evidence & Policy" | "Implementation & Equity" | "Innovation in Practice";

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
    affiliation: "Founder, BloomShield CIC",
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
  overviewImage: "/images/insights/conversations-saratani-ai-square.png" as const,
  imageAlt: "BloomShield Insights conversation with Dr Sang’udi Sang’udi of SarataniAI about equitable cervical cancer screening.",
  seoTitle: "Conversations Across the Cancer Care Ecosystem",
  seoDescription: "BloomShield Insights conversations with leaders and innovators shaping equitable cancer prevention, screening and care across health systems.",
  canonicalUrl: "/insights/conversations",
  socialImage: "/images/insights/conversations-saratani-ai.png",
  socialImageAlt: "BloomShield Insights conversation with Dr Sang’udi Sang’udi of SarataniAI about equitable cervical cancer screening.",
  socialImageWidth: 1672,
  socialImageHeight: 941,
  keywords: ["equitable cancer care", "cancer screening innovation", "health systems", "cancer care partnerships", "SarataniAI"],
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
    slug: "saratani-ai",
    title: "Dr Sang’udi Sang’udi | SarataniAI",
    area: "Series & Collections",
    crossTags: ["Innovation in Practice", "Systems", "Equity"],
    status: "forthcoming",
    description: "A forthcoming BloomShield Insights conversation exploring AI-enabled cervical cancer screening, frontline healthcare delivery and what innovation must overcome to work in low-resource settings.",
    image: conversationsSeries.image,
    imageAlt: conversationsSeries.imageAlt,
  },
];

export const insightAreas = [
  { name: "Series & Collections", description: "Sustained editorial programmes that build knowledge across connected questions." },
  { name: "Evidence & Policy", description: "What emerging evidence and policy decisions mean for equitable cancer prevention." },
  { name: "Implementation & Equity", description: "The practical conditions that determine who benefits from good policy and innovation." },
  { name: "Innovation in Practice", description: "How promising approaches meet the realities of frontline care and health systems." },
] as const;
