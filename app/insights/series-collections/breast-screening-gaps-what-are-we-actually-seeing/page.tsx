import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "breast-screening-gaps-what-are-we-actually-seeing")!;
const authors = getInsightAuthors(article);
export const metadata = createInsightMetadata({ title: article.title, description: article.seoDescription!, path: article.canonicalUrl!, socialImage: article.socialImage!, socialImageAlt: article.socialImageAlt!, socialImageWidth: article.socialImageWidth!, socialImageHeight: article.socialImageHeight!, type: "article", keywords: article.tags, authors: authors.map(author => author.name), datePublished: article.datePublished, dateModified: article.dateModified });
const references = [
  {
    "label": "Breast Screening Programme, England, 2024–25",
    "href": "https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme/england-2024-2025",
    "source": "NHS England · Three-year breast screening coverage at 31 March 2025: women aged 53 to under 71 screened within the previous three years. These figures differ from annual invitation uptake."
  },
  {
    "label": "Local-authority breast screening coverage, 2024–25",
    "href": "https://files.digital.nhs.uk/21/2D9D08/breast-screen-programme-eng-2024-25-data-table-csvs.zip",
    "source": "NHS England · Official data tables (ZIP): Kent, Medway, Liverpool, Devon and Cornwall. No separate Isles of Scilly figure is presented here."
  },
  {
    "label": "NHS Cancer Screening Programmes — Breast, Bowel and Cervical",
    "href": "https://democracy.medway.gov.uk/mgconvert2pdf.aspx?id=78868",
    "source": "Medway Health and Wellbeing Board · April 2025 screening review, including inequalities affecting people with learning disabilities and severe mental illness."
  },
  {
    "label": "Mobile breast screening in Liverpool communities",
    "href": "https://cheshireandmerseyside.nhs.uk/your-locality/liverpool/liverpool-news/state-of-the-art-mobile-unit-to-bring-breast-screening-to-the-communities-of-liverpool/",
    "source": "NHS Cheshire and Merseyside · Community access response, also discussed in Local Lens LL-002."
  },
  {
    "label": "South West breast-screening performance, 2024/25",
    "href": "https://www.england.nhs.uk/south/2026/02/19/over-half-a-million-women-in-the-south-west-are-up-to-date-with-their-breast-screening/",
    "source": "NHS England South West · Regional screening context, also used in Local Lens LL-003."
  },
  {
    "label": "Living and working well: screening and inequalities",
    "href": "https://www.devon.gov.uk/public-health/jhws/joint-strategic-needs-assessment/living-and-working-well/",
    "source": "Public Health Devon · Joint Strategic Needs Assessment; local screening and access context."
  },
  {
    "label": "Early diagnosis with the voluntary and community sector",
    "href": "https://peninsulacanceralliance.nhs.uk/early-diagnosis-with-the-voluntary-and-community-sector/",
    "source": "Peninsula Cancer Alliance · Community partnerships, also used in Local Lens LL-003."
  }
];
const related = [
  {
    "label": "Local Lens: Medway & Kent",
    "href": "/insights/local-lens/medway-kent"
  },
  {
    "label": "Local Lens: Liverpool",
    "href": "/insights/local-lens/liverpool"
  },
  {
    "label": "Local Lens: Devon, Cornwall & the Isles of Scilly",
    "href": "/insights/local-lens/devon-cornwall-isles-of-scilly"
  },
  {
    "label": "BloomShield Local Lens",
    "href": "/insights/local-lens"
  }
];

export default function BreastScreeningGapsPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.seoDescription, image: SITE_URL + article.socialImage, datePublished: article.datePublished, dateModified: article.dateModified, author: authors.map(author => ({ "@type": "Person", name: author.name })), publisher: { "@type": "Organization", name: insightPublisher.name, url: SITE_URL + "/insights", logo: { "@type": "ImageObject", url: SITE_URL + "/bloomshield-square-lockup.png" } }, mainEntityOfPage: SITE_URL + article.canonicalUrl, articleSection: article.collection, isPartOf: { "@type": "CreativeWorkSeries", name: article.collection }, position: article.seriesPosition, keywords: article.tags?.join(", "), inLanguage: "en-GB" };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <InsightArticle category={article.area} crossTag={article.collection!} subtitle="Part 2 of 3" title={article.title} articleSlug={article.slug} date={article.publishedAt!} dateIso={article.publishedAtIso!} readTime="8 min read" authors={authors} publisher={insightPublisher.name} standfirst={article.description} image="/images/insights/breast-screening-gaps-hero.png" imageAlt="BloomShield Part 2 hero: Breast Screening Gaps, featuring three women outside an NHS building and the pathway from GP to invitation, understanding, confidence and access." heroClassName="aspect-[1672/941]" heroImageClassName="object-contain object-center" domains={["People", "Partnerships", "Systems", "Equity", "Impact"]} tags={article.tags} linkedinDiscussionUrl="https://www.linkedin.com/pulse/breast-screening-gaps-what-we-actually-seeing-across-dr-femi-usvne" linkedinDiscussionTitle="Join the discussion on LinkedIn →" linkedinBeforeContact interactionsAfterManuscript references={references} implementationLesson={<p>It is useful to know that screening inequality exists. It is more useful to know where the pathway is breaking down.</p>} previous={{ label: "Part 1: Before We Talk About the Gaps", href: "/insights/series-collections/before-we-talk-about-the-gaps" }} relatedContent={<section className="insight-article-end-section" aria-labelledby="related-insights"><h2 id="related-insights">Related Insights</h2><div className="mt-6 divide-y divide-teal-900/10">{related.map(item => <Link key={item.href} href={item.href} data-insights-event="insights_related_content_click" className="block py-5 font-bold text-teal-700">{item.label} →</Link>)}</div></section>}>
<section aria-label="Introduction">
<p>October is Breast Cancer Awareness Month.</p>
<p>In Part 1 of our three-part series, <Link href="/insights/series-collections/before-we-talk-about-the-gaps" data-insights-event="insights_related_content_click">Before We Talk About the Gaps</Link>, we recognised the people and services already working every day to support breast cancer prevention, screening and earlier diagnosis.</p>
<p>But we ended with an unfinished question:</p>
<p>If breast screening is already available, why are some women and some communities still less likely to benefit from it?</p>
<p>That is the gap we want to understand.</p>
<p>And through <Link href="/insights/local-lens" data-insights-event="insights_related_content_click">BloomShield Local Lens</Link>, we are beginning to see that the answer is unlikely to be the same everywhere.</p>
<p>The latest national figures show that 71.8% of eligible women in England were up to date with breast screening at 31 March 2025.</p>
<p>But look at the first three places examined through Local Lens.</p>
<p><Link href="/insights/local-lens/medway-kent" data-insights-event="insights_related_content_click">In Kent,</Link> breast screening coverage was 74.2%, and in Medway 72.4% — both above the England figure.</p>
<p><Link href="/insights/local-lens/liverpool" data-insights-event="insights_related_content_click">In Liverpool,</Link> coverage was 69.1%, almost three percentage points below the national level.</p>
<p>Across our third Local Lens geography, <Link href="/insights/local-lens/devon-cornwall-isles-of-scilly" data-insights-event="insights_related_content_click">Devon recorded</Link> 74.2% and Cornwall 75.2% — again above England overall.</p>
<p>At first glance, those numbers might suggest a simple story: some places are doing better than others.</p>
<p>But that is not what Local Lens is showing us.</p>
<p>In Medway and Kent, respectable overall coverage can coexist with substantial differences affecting deprived communities and people with learning disabilities or severe mental illness. Medway’s own screening review reports materially lower screening among some of these groups.</p>
<p>In Liverpool, lower overall coverage sits alongside active attempts to bring screening closer to communities, including community-led work and more accessible screening approaches.</p>
<p>And in Devon, Cornwall and the Isles of Scilly, relatively strong headline performance does not remove the challenges created by rurality, deprivation, transport and access — one reason local services have increasingly worked with community and voluntary-sector organisations.</p>
<p>So perhaps the important question is not simply:</p>
<p>Which places have the highest screening rates?</p>
<p>It is:</p>
<p>Who is missing from those figures — and where in the screening journey are we losing them?</p>
<p>That leads us to three questions:</p>
<p>What are the gaps?</p>
<p>Why are they there?</p>
<p>And how prevalent are they?</p>
</section>
<section aria-labelledby="what-are-the-gaps">
<h2 id="what-are-the-gaps">What are the gaps?</h2>
<p>A breast screening gap may begin long before someone misses an appointment.</p>
<p>It can sit between an invitation and understanding.</p>
<p>Between understanding and confidence.</p>
<p>Between wanting to attend and being able to get there.</p>
<p>Between screening and further assessment.</p>
<p>Or between referral and completion of the pathway.</p>
<p>That means breast screening inequality is unlikely to be one problem.</p>
<p>It may instead be a collection of smaller points of friction across the journey.</p>
<p>There are geographical gaps, where distance, transport or rurality affect access.</p>
<p>There are socioeconomic gaps, where deprivation, insecure work, caring responsibilities or competing pressures make preventive healthcare harder to prioritise.</p>
<p>There are communication gaps, including language, health literacy and uncertainty about screening itself.</p>
<p>There are accessibility gaps, particularly for people with disabilities or additional support needs.</p>
<p>There are trust gaps, where previous experiences, cultural context or relationships with healthcare services influence willingness to engage.</p>
<p>And there are pathway gaps — the less visible points where someone moves from invitation to attendance, from screening to further assessment, or from concern to follow-up.</p>
<p>These categories do not exist in isolation.</p>
<p>Someone living in a deprived rural community may face transport difficulties, limited flexibility at work and anxiety about the procedure at the same time.</p>
<p>That is why a single explanation is rarely enough.</p>
</section>
<section aria-labelledby="why-are-the-gaps-there">
<h2 id="why-are-the-gaps-there">Why are the gaps there?</h2>
<p>This is the harder question.</p>
<p>Some barriers are practical.</p>
<p>Others are psychological.</p>
<p>Some are social.</p>
<p>Some sit within the way services are organised.</p>
<p>And some are likely to be highly local.</p>
<p>A mobile screening unit may make a meaningful difference in one place.</p>
<p>A trusted faith, voluntary or community organisation may matter more in another.</p>
<p>Extended opening hours, clearer communication, language support, accessible appointments or active follow-up may be more important elsewhere.</p>
<p>The same intervention will not necessarily work everywhere.</p>
<p>And the same headline screening percentage can hide very different realities.</p>
<p>A woman may want to attend but have no easy transport.</p>
<p>She may have transport but be unable to take time away from work.</p>
<p>She may receive an invitation but not fully understand what it means.</p>
<p>She may understand perfectly well and still decide not to attend because of fear, embarrassment or a previous difficult healthcare experience.</p>
<p>And another woman may attend screening successfully but encounter difficulty later in the pathway if further assessment is required.</p>
<p>That is why simply asking whether someone attended can tell us surprisingly little about why they did or did not complete the journey.</p>
<p>It is also why place matters.</p>
<p>Local Lens is not designed simply to rank one area against another.</p>
<p>It is designed to ask:</p>
<p>What is happening here?</p>
<p>Who may be getting missed?</p>
<p>What is getting in the way?</p>
<p>What is already being tried?</p>
<p>And what might other places learn from it?</p>
</section>
<section aria-labelledby="how-prevalent-are-these-gaps">
<h2 id="how-prevalent-are-these-gaps">How prevalent are these gaps?</h2>
<p>This is where we need to be careful.</p>
<p>Our first three Local Lens editions are not a national prevalence study.</p>
<p>They are something more exploratory: place-based signals.</p>
<p>But those signals are beginning to accumulate.</p>
<p>As BloomShield moves through different parts of the UK week by week in forthcoming Local Lens editions, we will continue asking whether the same patterns recur — and where different ones emerge.</p>
<p>Do rural access barriers appear repeatedly?</p>
<p>How often do deprivation and screening participation move together?</p>
<p>Are some communities consistently less likely to benefit from screening?</p>
<p>Where are mobile or community-based approaches making access easier?</p>
<p>Where are trusted local organisations being used effectively?</p>
<p>Where do apparently strong headline figures conceal inequalities underneath?</p>
<p>And where are outcomes improving despite difficult local circumstances?</p>
<p>Over time, those observations become more useful.</p>
<p>Not because every place will be the same.</p>
<p>But because recurring patterns can begin to tell us which questions deserve deeper investigation.</p>
</section>
<section aria-labelledby="the-gap-may-not-be-where-we-first-think">
<h2 id="the-gap-may-not-be-where-we-first-think">The gap may not be where we first think</h2>
<p>It is easy to think about screening inequality as a difference between women who attend and women who do not.</p>
<p>But that may be too narrow.</p>
<p>The gap could be between:</p>
<h3>Invitation → understanding</h3>
<p>A woman receives an invitation but does not fully understand why she has been invited, what screening involves or whether it applies to her.</p>
<h3>Understanding → confidence</h3>
<p>She understands the invitation but remains worried about pain, embarrassment, the possibility of cancer or a previous negative experience.</p>
<h3>Confidence → access</h3>
<p>She wants to attend, but transport, work, caring responsibilities, disability or appointment location make attendance difficult.</p>
<h3>Attendance → follow-up</h3>
<p>She attends screening, but the pathway becomes more complicated if further assessment is required.</p>
<h3>Referral → completion</h3>
<p>Appointments can be rearranged, missed, delayed or abandoned altogether.</p>
<p>Looking only at final uptake can hide all of this.</p>
<p>A percentage can tell us that a gap exists.</p>
<p>It does not necessarily tell us where the gap happened.</p>
</section>
<section aria-labelledby="from-observation-to-investigation">
<h2 id="from-observation-to-investigation">From observation to investigation</h2>
<p>That is where the conversation now needs to move.</p>
<p>It is useful to know that screening inequality exists.</p>
<p>It is more useful to know where the pathway is breaking down.</p>
<p>And more useful still to understand what happens to an individual person as they move through that pathway over time.</p>
<p>Because the real journey is not simply:</p>
<p>Invited → attended.</p>
<p>It is closer to:</p>
<p>Invitation → understanding → decision → access → attendance → result → follow-up → next action → outcome.</p>
<p>At every stage, something can help.</p>
<p>And at every stage, something can get in the way.</p>
<p>So the next question for BloomShield is becoming increasingly clear:</p>
<p>What happens when we stop looking only at screening uptake — and start looking at the whole screening journey?</p>
</section>
    </InsightArticle></>;
}
