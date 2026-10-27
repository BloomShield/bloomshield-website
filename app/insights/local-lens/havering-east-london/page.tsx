import type { Metadata } from "next";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "havering-east-london")!;
const authors = getInsightAuthors(article);
const canonicalPath = article.canonicalUrl!;
const socialImage = article.socialImage!;
const socialImageAlt = article.socialImageAlt!;
const keywords = article.keywords ?? article.tags ?? [];

const articleMetadata = createInsightMetadata({
  title: article.seoTitle ?? article.title,
  description: article.seoDescription ?? article.description,
  path: canonicalPath,
  socialImage,
  socialImageAlt,
  socialImageWidth: article.socialImageWidth!,
  socialImageHeight: article.socialImageHeight!,
  socialImageType: article.socialImageType,
  socialTitle: article.socialTitle,
  socialDescription: article.socialDescription,
  type: "article",
  keywords,
  authors: authors.map(author => author.name),
  datePublished: article.datePublished ?? article.publishedAtIso,
  dateModified: article.dateModified ?? article.publishedAtIso,
});

export const metadata: Metadata = articleMetadata;

const references = [
  {
    "label": "Dr Ameesh Patel — How this PCN uses a cancer lead.",
    "source": "Pulse PCN, 19 September 2024. Primary case study for the intervention, delivery model, financing and reported outcomes.",
    "href": "https://pulsepcn.co.uk/insight/how-this-pcn-uses-a-cancer-lead/"
  },
  {
    "label": "Cancer Research UK — Bowel screening access and inequalities.",
    "source": "Additional background and case-study context.",
    "href": "https://www.cancerresearchuk.org/health-professional/cancer-screening/bowel-cancer-screening/access-and-inequalities"
  },
  {
    "label": "London Borough of Havering — Screening.",
    "source": "Local public-health context.",
    "href": "https://www.havering.gov.uk/public-health/screening"
  },
  {
    "label": "NHS England — Bowel Cancer Screening Standards Data Report 2023/24.",
    "source": "Regional screening inequalities.",
    "href": "https://www.gov.uk/government/publications/bowel-cancer-screening-annual-report-2023-to-2024/bowel-cancer-screening-standards-data-report-2023-24"
  },
  {
    "label": "Community Links — PCN Cancer Facilitator Programme.",
    "source": "Wider North East London implementation context, separate from the original Havering North intervention.",
    "href": "https://www.community-links.org/health/cancer-facilitator-programme/"
  }
];
export default function HaveringLocalLensPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${canonicalPath}#article`,
    headline: article.title,
    alternativeHeadline: article.shortTitle,
    description: article.seoDescription ?? article.description,
    image: { "@type": "ImageObject", url: `${SITE_URL}${socialImage}`, width: article.socialImageWidth, height: article.socialImageHeight, caption: socialImageAlt },
    datePublished: article.datePublished ?? article.publishedAtIso,
    dateModified: article.dateModified ?? article.publishedAtIso,
    author: authors.map(author => ({ "@type": "Person", name: author.name, description: author.biography, jobTitle: author.credentials, affiliation: { "@type": "Organization", name: "BloomShield CIC", url: SITE_URL } })),
    publisher: { "@type": "Organization", name: insightPublisher.name, url: `${SITE_URL}/insights`, parentOrganization: { "@type": "Organization", name: ORGANIZATION_NAME, url: SITE_URL }, logo: { "@type": "ImageObject", url: `${SITE_URL}/bloomshield-square-lockup.png`, width: 545, height: 590 } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${canonicalPath}` },
    articleSection: article.area,
    keywords: keywords.join(", "),
    about: keywords.map(name => ({ "@type": "Thing", name })),
    contentLocation: { "@type": "Place", name: "Havering, East London" },
    inLanguage: "en-GB",
  };

return <>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g,"\\u003c")}} />
<InsightArticle category={article.area} crossTag="Cancer Screening Inequalities Across England · LL-006 · Edition 06" title={article.title} subtitle={article.shortTitle} articleSlug={article.slug} date={article.publishedAt!} dateIso={article.publishedAtIso!} readTime="7 min read" authors={authors} publisher={insightPublisher.name} standfirst={article.description} image={socialImage} imageAlt={socialImageAlt} heroClassName="aspect-[1672/941]" heroImageClassName="object-contain object-center" domains={["People", "Partnerships", "Systems", "Equity", "Impact"]} ccpeLens={article.ccpeLens} tags={article.tags} engagementContactLabel={article.engagementContactLabel} interactionsAfterManuscript references={references} implementationLesson={<p>Identify → understand → engage → support → monitor</p>} previous={{label:"LL-005 · Local Lens: Greater Manchester",href:"/insights/local-lens/greater-manchester"}} relatedContent={<section className="insight-article-end-section"><h2>Related articles</h2><ul><li><Link href="/insights/local-lens/greater-manchester">Local Lens: Greater Manchester</Link></li><li><Link href="/insights/local-lens/west-london">Local Lens: West London</Link></li><li><Link href="/insights/local-lens">Explore all Local Lens editions</Link></li></ul></section>}>
<section>
<p className="!mt-0"><strong>Local data. Local voices. Local action.</strong></p>
<h2 className="!mt-10 !text-teal-800">DID YOU KNOW?</h2>
<p>In November 2021, Havering North Primary Care Network reported bowel screening participation of approximately <strong>65.5%</strong> among its eligible 60–74-year-old patients.</p>
<p>By December, its reported figure had reached <strong>96.6%</strong> — an increase of approximately <strong>31 percentage points</strong>.</p>
<p>The improvement was subsequently sustained at around 96% in January and February 2022.</p>
<p><strong>Reported Havering North PCN screening uptake</strong></p>
<div className="my-8 grid gap-4 sm:grid-cols-3" aria-label="Reported Havering North PCN screening uptake">{[{period:"November 2021",value:"65.5%",label:"Reported uptake"},{period:"December 2021",value:"96.6%",label:"Reported uptake"},{period:"Change",value:"+31 pp",label:"Percentage points"}].map(stat => <div key={stat.period} className="rounded-2xl border border-teal-900/15 bg-[#f3ead6] p-5"><p className="!mt-0 text-sm font-bold text-teal-900">{stat.period}</p><p className="!my-3 font-display text-4xl font-semibold text-teal-900">{stat.value}</p><p className="!mt-0 text-sm text-slate-600">{stat.label}</p></div>)}</div>
<p><em>Havering North PCN&apos;s published monitoring figures, not a borough-wide estimate or an independently established causal effect.</em></p>
<p>How did a group of GP practices achieve such a striking reported change?</p>
<p>And what does the experience tell us about the people who have already received a screening invitation but have not responded?</p>
</section>
<section><h2>The inequality beneath the invitation</h2>
<p>Havering is part of North East London, where differences in cancer screening participation remain a public health concern.</p>
<p>The London Borough of Havering has reported an under-75 colorectal cancer mortality rate of <strong>12.1 per 100,000</strong>, compared with <strong>10.5 across London</strong> and <strong>11.9 nationally</strong> for its cited period.</p>
<p>But an invitation to participate in bowel screening does not automatically mean that someone will return their home-testing kit.</p>
<p>The problem can be particularly challenging where communication, disability, language or uncertainty about the test creates additional barriers.</p>
<p>National bowel screening evidence also demonstrates substantial deprivation-related inequality. In 2023/24, London uptake was <strong>51.3% in the most deprived fifth of areas</strong>, compared with <strong>68.9% in the least deprived fifth</strong>.</p>
<p>That is the wider context in which Havering North&apos;s intervention becomes interesting.</p>
</section>
<section><h2>Instead of waiting, the practices looked for who was missing</h2>
<p>The initiative began in 2021 across <strong>14 GP practices serving approximately 86,000 registered patients</strong>.</p>
<p>Dr Ameesh Patel, the network&apos;s dedicated cancer lead, coordinated work to identify eligible people who had not responded to bowel screening.</p>
<p>Practices used existing GP clinical records, digital searches and dashboards to find non-responders. Staff were trained, practice leads were appointed, and the teams met regularly to review progress.</p>
<p>The intervention then moved from identifying non-response to addressing it.</p>
<p>GP-endorsed reminders were sent.</p>
<p>Educational animations explained how to complete the faecal immunochemical test (FIT).</p>
<p>Community communication was adapted for South Asian populations, including radio outreach.</p>
<p>For some patients with learning disabilities, teams checked carers&apos; contact information and worked with care settings to support participation.</p>
<p>The underlying implementation sequence was simple:</p>
<p className="rounded-xl border-l-4 border-[#b9892f] bg-[#f3ead6] p-6"><strong>Identify → understand → engage → support → monitor</strong></p>
<p>Not a new screening test.</p>
<p>Not necessarily a new screening service.</p>
<p>A more systematic way of helping people respond to an existing offer.</p>
</section>
<section><h2>The investment question: what did the intervention cost?</h2>
<p>This is where Havering offers an unusual perspective on cancer improvement funding.</p>
<p>Unlike large screening programmes involving new equipment or mobile diagnostic facilities, the Havering North intervention was largely organised through existing primary care infrastructure.</p>
<p>The PCN funded a dedicated cancer lead, providing approximately <strong>eight hours of protected clinical time per month</strong>.</p>
<p>Dr Patel&apos;s published account explicitly states that no additional project funding was provided. The work was organised as part of the network&apos;s wider commitments under the Primary Care Network Directed Enhanced Service.</p>
<p>He also held a short-term Cancer Research UK-funded role with North East London Cancer Alliance, and the Alliance supported the project with educational resources.</p>
<p>The available account does not provide a total implementation cost.</p>
<p>This distinction matters.</p>
<p className="rounded-xl border-l-4 border-teal-800 bg-teal-50 p-6"><strong>Investment does not always mean creating a new programme. Sometimes it means giving existing teams the time, information and coordination capacity to act on a problem they can already see.</strong></p>
</section>
<section><h2>What improved — and what remains uncertain?</h2>
<p>The published case study reports <strong>7,502 of 11,446</strong> eligible patients meeting the measured screening indicator in November 2021, compared with <strong>11,018 of 11,410</strong> in December.</p>
<p>It is an impressive reported shift.</p>
<p>But there are important limitations.</p>
<p>The figures come from the PCN&apos;s routine monitoring. The published account does not provide an independent evaluation explaining exactly how much of the rapid change reflected newly completed screening, changes in recording or coding, or other measurement factors.</p>
<p>It also reports improvements among South Asian patients and people with learning disabilities, without formally monitoring those subgroup outcomes. We therefore cannot establish how much the inequalities between groups narrowed.</p>
<p>Nor does the case study establish whether improved FIT participation subsequently led to greater completion of diagnostic investigations or earlier cancer diagnoses.</p>
<p>The findings deserve attention — but they should not be interpreted as proof that one intervention alone produced every percentage point of the reported improvement.</p>
</section>
<section><h2>From successful outreach to sustainable implementation</h2>
<p>The Havering story did not end with its 2022 monitoring figures.</p>
<p>The team reported that it continued identifying non-responders and shared its approach with neighbouring practices.</p>
<p>Across North East London, a separately commissioned, Cancer Alliance-funded programme delivered by Community Links has also developed data-led screening improvement work with Primary Care Networks, combining practice-level intelligence, improvement planning and community engagement.</p>
<p>That broader programme illustrates how the principles of data-led outreach and local coordination can be institutionalised, although its reported outcomes should not be conflated with Havering North&apos;s original intervention.</p>
<p>For BloomShield, this raises a particularly useful implementation question:</p>
<p><strong>If we know who has not responded, can we understand which barriers matter, which interventions make a difference, and whether people subsequently complete the wider screening pathway?</strong></p>
<p>Havering demonstrates the potential of proactive primary care coordination.</p>
<p>But the next level of learning lies in connecting identification, engagement, support and subsequent outcomes — rather than treating every intervention as an isolated activity.</p>
</section>
<section><h2>The question we take forward</h2>
<p>Havering North&apos;s experience challenges the assumption that an unanswered invitation must remain unanswered.</p>
<p>It suggests that existing screening intelligence, protected staff time, targeted communication and coordinated follow-up can be assembled into a practical improvement approach.</p>
<p>But it also leaves us with a bigger question:</p>
<h2 className="!mt-8 border-l-4 border-[#b9892f] bg-[#f3ead6] p-6">When we identify a non-responder, how do we know what finally helped that person move forward?</h2>
<p>That is where the next generation of cancer-screening implementation research has an important role to play.</p>
<p><strong>Local data. Local voices. Local action.</strong></p>
</section>
</InsightArticle></>;
}
