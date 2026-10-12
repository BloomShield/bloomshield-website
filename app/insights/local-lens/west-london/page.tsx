import type { Metadata } from "next";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "west-london")!;
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
    "label": "Breast Screening Programme, England, 2024–25",
    "href": "https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme/england-2024-2025",
    "source": "NHS England · Coverage is the proportion up to date over three years (ages 53–70); invitation uptake measures attendance within six months (ages 50–70). The main comparison uses coverage, not invitation uptake."
  },
  {
    "label": "2024/25 screening attendance and cancers detected",
    "href": "https://www.england.nhs.uk/2026/02/women-attending-first-nhs-mammogram-hits-10-year-high-as-thousands-more-cancers-found/",
    "source": "NHS England · National coverage, 1.94 million routine attendees and 19,291 cancers detected across ages 45+."
  },
  {
    "label": "London breast screening participation and inequalities",
    "href": "https://www.england.nhs.uk/london/2025/02/17/7190/",
    "source": "NHS England London · Invitation participation and barriers; these uptake figures are distinct from the 2024/25 coverage comparison."
  },
  {
    "label": "West of London Breast Screening Service: quality assurance",
    "href": "https://www.england.nhs.uk/long-read/screening-quality-assurance-visit-report-west-of-london-breast-screening-service/",
    "source": "NHS England · Visit on 9 February 2023; historical service configuration, population diversity and access context."
  },
  {
    "label": "RM Partners Cancer Alliance strategy, 2025–2030",
    "href": "https://www.southwestlondonics.org.uk/insights/rm-partners-cancer-alliance-strategy-for-north-west-and-south-west-london-2025-2030/",
    "source": "South West London ICS · Prevention, screening, equitable access and cancer-system priorities."
  },
  {
    "label": "WSIC screening dashboards and user guides",
    "href": "https://www.westandnorthlondon.icb.nhs.uk/our-work/programmes/whole-systems-integrated-care-wsic/information-care-professionals",
    "source": "NHS ICB · Population-health dashboards and breast, bowel and cervical screening user guides."
  },
  {
    "label": "Wandsworth Health & Care Plan, 2025–27",
    "href": "https://www.southwestlondon.icb.nhs.uk/publications/wandsworth-health-care-plan-2025-27/",
    "source": "NHS South West London ICB · Targeted engagement, dashboard analysis, community grants and a 10% reduction in variation among lower-uptake groups; a planned ambition, not a reported outcome."
  },
  {
    "label": "Breast screening: women not registered with a GP practice",
    "href": "https://www.gov.uk/government/publications/breast-screening-women-not-registered-with-a-gp-practice",
    "source": "NHS England · Guidance for screening services supporting women without GP registration."
  },
  {
    "label": "London screening provider update, April 2026",
    "href": "https://www.royalfree.nhs.uk/news/royal-free-london-becomes-largest-breast-screening-provider-england",
    "source": "Royal Free London · On 20 April 2026, the Trust announced screening provision across north, east and west London. The West of London QA report above describes the earlier service configuration."
  }
];

const relatedContent = <section aria-labelledby="related-insights"><p className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">Continue exploring</p><h2 id="related-insights" className="mt-4">Related Insights</h2><div className="mt-6 divide-y divide-teal-900/10 border-y border-teal-900/10">{[
{label:"BloomShield Local Lens",href:"/insights/local-lens"},
{label:"Edition 03 · Devon, Cornwall & the Isles of Scilly",href:"/insights/local-lens/devon-cornwall-isles-of-scilly"},
{label:"Edition 02 · Liverpool",href:"/insights/local-lens/liverpool"},
{label:"Edition 01 · Medway & Kent",href:"/insights/local-lens/medway-kent"}
].map(item => <Link key={item.href} href={item.href} data-insights-event="insights_related_content_click" className="group flex items-center justify-between gap-5 py-5 text-ink"><span className="font-display text-xl font-semibold group-hover:text-teal-700">{item.label}</span><span aria-hidden="true" className="text-[#85601e]">→</span></Link>)}</div></section>;

export default function WestLondonLocalLensPage() {
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
    contentLocation: { "@type": "Place", name: "West London" },
    inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <InsightArticle
      category={article.area}
      crossTag="LL-004 · Edition 04"
      title={article.title}
      subtitle={article.shortTitle}
      articleSlug={article.slug}
      date={article.publishedAt!}
      dateIso={article.publishedAtIso!}
      readTime="6 min read"
      authors={authors}
      publisher={insightPublisher.name}
      standfirst={article.description}
      image={article.image!}
      imageAlt={article.imageAlt!}
      heroClassName="aspect-[1672/941]"
      heroImageClassName="object-contain object-center"
      domains={["People", "Partnerships", "Systems", "Equity", "Impact"]}
      ccpeLens={article.ccpeLens}
      tags={article.tags}
      reflectionQuestion={article.reflectionQuestion}
      engagementContactLabel={article.engagementContactLabel}
      interactionsAfterManuscript
      references={references}
      relatedContent={relatedContent}
      implementationLesson={<p>Physical proximity is only one part of access.</p>}
      previous={{ label: "Local Lens: Devon, Cornwall & the Isles of Scilly", href: "/insights/local-lens/devon-cornwall-isles-of-scilly" }}
    >
<section><h2>DID YOU KNOW?</h2>
<p>London continues to have the lowest breast screening participation in England.</p>
<p>In 2024/25, 65.2% of eligible women in London were up to date with breast screening, compared with 71.8% across England. Nationally, 1.94 million women aged 50–70 attended screening within six months of invitation that year, while almost 20,000 cancers were detected through the programme.</p>
<p>The difference becomes even more striking when we look inside West London.</p>
<p>Kensington and Chelsea recorded breast screening coverage of just 48.7% — the lowest of any local authority in England.</p>
<p>And yet this is not a part of the country without cancer expertise, hospitals or screening infrastructure.</p>
<p>The West of London Breast Screening Service now sits within Royal Free London NHS Foundation Trust, which expanded its breast screening responsibilities from 1 April 2026 and became the largest provider in England. The West of London service covers Ealing, Hammersmith &amp; Fulham, Kensington &amp; Chelsea, Hillingdon, Hounslow and Westminster, with five static screening sites and second-stage assessment at Charing Cross Hospital.</p>
<p>So the question becomes difficult to avoid:</p>
<p>If world-class cancer services are nearby, why do women still miss out?</p>
</section><section><h2>Proximity is not the same as access</h2>
<p>It is tempting to think about healthcare access geographically.</p>
<p>How far is the hospital?</p>
<p>Is there a screening unit nearby?</p>
<p>Can someone physically reach the service?</p>
<p>Those questions matter.</p>
<p>But West London demonstrates why they are not enough.</p>
<p>NHS England has identified significant inequalities in London breast screening participation. Women from minoritised communities, people living in more deprived areas and women who do not speak English as a first language are less likely to attend. Around one in three women in London still do not attend breast screening when invited.</p>
<p>The population served by the West of London Breast Screening Service is also particularly diverse. NHS screening quality-assurance work describes substantial Black, Asian and minority-ethnic populations, non-English-speaking communities, deprivation and a mobile or transient population.</p>
<p>The issue, then, may not simply be whether a service exists.</p>
<p>It is whether the existence of that service successfully converts into participation.</p>
</section><section><h2>WHAT IS GETTING IN THE WAY?</h2>
<p>The West London evidence points towards several overlapping issues.</p>
<h3>Deprivation</h3>
<p>Screening participation is not evenly distributed across socioeconomic groups.</p>
<p>Within the wider RM Partners footprint, reducing inequalities is now an explicit strategic priority. Local plans identify deprivation among the factors associated with lower screening uptake and describe substantial variation between groups.</p>
<h3>Ethnicity and language</h3>
<p>London&apos;s diversity is one of its strengths, but a single communication approach will not work equally well for every community.</p>
<p>NHS England has highlighted lower breast screening participation among some minoritised groups and people who do not speak English as a first language. RM Partners&apos; current strategy similarly emphasises multilingual communication, targeted engagement and work with underserved communities.</p>
<h3>Mobility and registration</h3>
<p>Screening programmes depend on people being identifiable, contactable and connected to primary care.</p>
<p>Highly mobile populations, people who change addresses frequently and women who are not registered with a GP can therefore encounter another layer of friction. NHS England now publishes specific guidance for breast screening services dealing with women who are not registered with a GP practice.</p>
<h3>Disability, severe mental illness and other forms of exclusion</h3>
<p>Screening inequalities also affect people whose needs may not be captured by a simple borough average.</p>
<p>Current local plans explicitly identify people with severe mental illness and learning disabilities among groups where variation needs to be reduced.</p>
<p>And then there are the less measurable barriers:</p>
<p>fear, embarrassment, previous healthcare experiences, trust, work, caring responsibilities and uncertainty about what happens next.</p>
<p>A screening centre can be only a few miles away and still feel inaccessible.</p>
</section><section><h2>Look beneath the borough average</h2>
<p>This is where West London becomes particularly interesting.</p>
<p>The headline statistic can tell us that uptake is low.</p>
<p>But increasingly, the system can look underneath it.</p>
<p>A breast screening population-health dashboard developed by North West London ICB and RM Partners, using Whole Systems Integrated Care data, allows users to examine screening at borough, PCN and GP-practice level.</p>
<p>Importantly, it does more than show a single coverage percentage.</p>
<p>It can distinguish between screened and unscreened populations and examine demographic characteristics including deprivation and ethnicity, helping services identify communities where targeted intervention may be needed.</p>
<p>Similar tools exist for bowel and cervical screening.</p>
<p>That represents an important shift.</p>
<p>The question is no longer simply:</p>
<p>“What is our screening rate?”</p>
<p>It becomes:</p>
<p>“Who is not being screened — and where are they?”</p>
</section><section><h2>The system is responding</h2>
<p>This Local Lens is not a story about failure.</p>
<p>RM Partners&apos; 2025–2030 cancer strategy places prevention, screening and inequality reduction at the centre of its next phase of work.</p>
<p>Its stated ambition is to improve cancer screening coverage with equitable access, while making greater use of data, technology, community engagement and care closer to home.</p>
<p>In South West London, the practical response includes a prevention and screening steering group, targeted work with lower-uptake populations, monthly screening-dashboard analysis, multilingual engagement and community grants.</p>
<p>The stated ambition is to reduce variation among lower-uptake cohorts by 10%.</p>
<p>And breast screening itself is being reconsidered: local plans note the re-procurement of screening services with an explicit expectation that future arrangements should improve access and outcomes.</p>
<p>This is precisely the kind of response Local Lens is intended to surface.</p>
<p>Not simply:</p>
<p>Where are outcomes worse?</p>
<p>But:</p>
<p>What is the local system learning — and what is it doing differently?</p>
</section><section><h2>Perhaps the real gap sits between proximity and participation</h2>
<p>West London gives us a useful lesson.</p>
<p>Excellent specialist services can exist nearby.</p>
<p>Screening infrastructure can be present.</p>
<p>Sophisticated population-health intelligence can identify neighbourhoods, practices and groups with lower participation.</p>
<p>And inequalities can still persist.</p>
<p>Because physical proximity is only one part of access.</p>
<p>The full journey may involve:</p>
<p>Invitation → understanding → trust → decision → access → attendance → follow-up → completion.</p>
<p>A problem at any of those stages can mean that someone living close to excellent care never fully benefits from it.</p>
<p>That leaves West London with a question that extends far beyond London:</p>
<p>When we know where the screening gaps are, how do we make sure the people inside those gaps actually complete the journey?</p>
<p>That may be one of the most important implementation questions facing cancer screening today.</p>
<p>Local data. Local voices. Local action.</p></section>
    </InsightArticle>
  </>;
}
