import { hubGroups } from "@/app/cancer-prevention-screening/content";
import { insights } from "@/lib/insights";

export type SearchResultType = "Insight" | "Programme" | "Page" | "Research & Innovation" | "Screening Guide";

export type SiteSearchEntry = {
  title: string;
  href: string;
  type: SearchResultType;
  description: string;
  terms?: string[];
  group?: string;
};

const corePages: SiteSearchEntry[] = [
  { title: "Home", href: "/", type: "Page", description: "BloomShield CIC: equitable cancer prevention, screening and community health.", terms: ["cancer prevention", "community health"] },
  { title: "About", href: "/about", type: "Page", description: "Learn about BloomShield, our purpose and approach.", terms: ["about bloomshield", "organisation"] },
  { title: "Programmes", href: "/programmes", type: "Programme", description: "BloomShield programmes for equitable cancer screening and prevention.", terms: ["programme", "community screening"] },
  { title: "ScreenSmart Communities™", href: "/programmes/screensmart-communities", type: "Programme", description: "Community-led support to increase cancer screening participation.", terms: ["screensmart", "screen smart", "community navigation", "community screening"] },
  { title: "ScreenAccess™", href: "/programmes/screenaccess", type: "Programme", description: "Helping people overcome barriers to cancer screening.", terms: ["screen access", "screening access", "health inequalities"] },
  { title: "ScreenConnect™", href: "/programmes/screenconnect", type: "Programme", description: "Connecting partners to strengthen cancer screening pathways.", terms: ["screen connect", "partnerships", "cancer pathways"] },
  { title: "Consultancy", href: "/consultancy", type: "Page", description: "Practical support for equitable cancer prevention, screening and service improvement.", terms: ["consulting", "implementation science", "service improvement"] },
  { title: "Faith & Community Funding Development", href: "/faith-community-funding-development", type: "Page", description: "Supporting faith and community organisations to develop sustainable funding.", terms: ["faith based", "faith-based", "church", "community", "funding", "grant funding"] },
  { title: "Research & Innovation", href: "/research-innovation", type: "Research & Innovation", description: "Research and innovation that advance equitable cancer care.", terms: ["research", "innovation", "implementation science"] },
  { title: "Partnerships", href: "/partnerships", type: "Page", description: "Working with partners to improve equitable cancer prevention and care.", terms: ["partners", "collaboration", "community"] },
  { title: "Insights", href: "/insights", type: "Page", description: "BloomShield analysis, local insight and conversations on cancer care.", terms: ["articles", "evidence", "policy"] },
  { title: "Cancer Prevention & Screening", href: "/cancer-prevention-screening", type: "Screening Guide", description: "Plain-language guides to cancer screening, tests, prevention and early detection.", terms: ["screening faqs", "cancer screening", "screening guide"] },
  { title: "Contact", href: "/contact", type: "Page", description: "Talk to BloomShield about programmes, partnerships and consultancy.", terms: ["talk to us", "get in touch"] },
];

export const siteSearchIndex: SiteSearchEntry[] = [
  ...corePages,
  ...insights.filter((insight) => insight.status === "published" && insight.href).map((insight) => ({
    title: insight.title, href: insight.href!, type: "Insight" as const, description: insight.description, group: insight.area,
    terms: [insight.shortTitle, insight.area, ...insight.crossTags, ...(insight.tags ?? []), ...(insight.keywords ?? [])].filter(Boolean) as string[],
  })),
  ...hubGroups.flatMap((group) => group.topics.filter((topic) => topic.status === "published" && topic.href).map((topic) => ({
    title: topic.title, href: topic.href!, type: "Screening Guide" as const, description: topic.description, group: group.title, terms: [group.title, group.intro],
  }))),
];

function normalise(value: string) {
  return value.toLocaleLowerCase("en-GB").replace(/[’']/g, "").replace(/[‐‑‒–—-]/g, " ").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function scoreEntry(entry: SiteSearchEntry, query: string) {
  const title = normalise(entry.title);
  const description = normalise(entry.description);
  const terms = normalise([...(entry.terms ?? []), entry.group ?? ""].join(" "));
  const words = query.split(" ").filter(Boolean);
  if (!words.every((word) => `${title} ${description} ${terms}`.includes(word))) return 0;
  let score = 0;
  if (title === query) score += 120;
  if (title.includes(query)) score += 80;
  if (terms.includes(query)) score += 55;
  if (description.includes(query)) score += 30;
  for (const word of words) { if (title.includes(word)) score += 16; if (terms.includes(word)) score += 10; if (description.includes(word)) score += 5; }
  return score;
}

export function searchSite(query: string, limit = 8) {
  const normalisedQuery = normalise(query);
  if (normalisedQuery.length < 2) return [];
  return siteSearchIndex.map((entry) => ({ entry, score: scoreEntry(entry, normalisedQuery) })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title)).slice(0, limit).map(({ entry }) => entry);
}
