import type { Metadata } from "next";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "diagnosed-how-long-until-cancer-treatment-begins")!;
const authors = getInsightAuthors(article);
const path = article.canonicalUrl!;
const title = article.seoTitle!;
const standfirst = article.description;
const partOne = insights.find(item => item.slug === "england-diagnosing-more-cancer-are-we-catching-it-earlier")!;

export const metadata: Metadata = {
  ...createInsightMetadata({
    title,
    description: article.seoDescription!,
    path,
    socialImage: article.socialImage!,
    socialImageAlt: article.socialImageAlt!,
    socialImageWidth: article.socialImageWidth!,
    socialImageHeight: article.socialImageHeight!,
    type: "article",
    authors: authors.map(author => author.name),
    datePublished: article.datePublished,
  }),
  title: { absolute: title },
};

const references = [
  {
    label: "September 2026 cancer waiting times: provider-based statistical release",
    source: "NHS England · 12 November 2026",
    href: "https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2026/11/Cancer-Waiting-Times-Statistical-Release-September-2026-Provider-based-Provisional.pdf",
  },
  {
    "label": "Waiting times for suspected and diagnosed cancer patients for September 2026 and Q2 2026/27",
    "source": "NHS England · 12 November 2026",
    "href": "https://www.gov.uk/government/statistics/waiting-times-for-suspected-and-diagnosed-cancer-patients-for-september-2026-and-q2-202627"
  },
  {
    "label": "Waiting times stall on diagnosis for people with cancer",
    "source": "Cancer Research UK · 12 November 2026",
    "href": "https://news.cancerresearchuk.org/2026/11/12/waiting-times-stall-on-diagnosis-for-people-with-cancer/"
  },
  {
    "label": "Faster Diagnosis Standard performance by referral outcome",
    "source": "Cancer Research UK · November 2026 data brief",
    "href": "https://www.cancerresearchuk.org/health-professional/our-reports-and-publications/faster-diagnosis-standard-performance-by-referral-outcome"
  }
];

export default function EnglandCancerTreatmentInsightPage() {
  const canonical = new URL(path, SITE_URL).href;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": canonical + "#article",
    mainEntityOfPage: canonical,
    headline: article.title,
    description: article.description,
    image: new URL(article.socialImage!, SITE_URL).href,
    datePublished: article.datePublished,
    author: authors.map(author => ({ "@type": "Person", name: author.name, jobTitle: author.credentials })),
    publisher: { "@type": "Organization", name: insightPublisher.name, url: SITE_URL + "/insights" },
    articleSection: article.area,
    isPartOf: { "@type": "CreativeWorkSeries", name: article.collection },
    position: article.seriesPosition,
    inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
    <InsightArticle
      category={article.area}
      crossTag="Part 2 of 2 | November 2026"
      title={article.title}
      articleSlug={article.slug}
      date={article.publishedAt!}
      dateIso={article.publishedAtIso!}
      authors={authors}
      publisher={insightPublisher.name}
      standfirst={standfirst}
      image="/images/insights/england-cancer-treatment-waiting-standards-hero.png"
      imageAlt="BloomShield Part 2 banner with Dr Femi Olaleye and the NHS England 28-day, 31-day and 62-day cancer waiting standards."
      heroClassName="aspect-[1672/941]"
      heroImageClassName="object-contain"
      domains={["People", "Systems", "Equity", "Impact"]}
      tags={article.tags}
      references={references}
      referencesHeading="References"
      linkedinBeforeContact
      linkedinDiscussionCard
      linkedinDiscussionImage={article.image}
      linkedinDiscussionImageClassName="object-contain"
      linkedinDiscussionUrl={article.linkedinDiscussionUrl}
      linkedinDiscussionTitle="Continue the discussion on LinkedIn"
      linkedinDiscussionDescription="Join the conversation about cancer waiting times and what comes next for patients."
      linkedinDiscussionLinkLabel="Read and discuss on LinkedIn"
      previous={{ label: `Part 01 of 02 — ${partOne.title}`, href: partOne.href! }}
      relatedContent={<section className="insight-article-end-section" aria-labelledby="related-insights">
        <h2 id="related-insights">Related Insights</h2>
        <Link href="/insights/evidence-policy/from-inequality-to-pathway-intelligence" data-insights-event="insights_related_content_click" className="mt-5 inline-flex font-bold text-teal-700 underline decoration-teal-700/30 underline-offset-4">From Inequality to Pathway Intelligence</Link>
      </section>}
    >
      <section aria-label="Introduction">
        <p>Last week, we asked <Link href={partOne.href!}>whether England is catching more cancers earlier</Link>.</p>
        <p>The latest national cancer data showed progress: more cancers are being diagnosed, and a greater proportion are being identified at stages 1 and 2.</p>
        <p>But diagnosis is not the end of the pathway.</p>
        <p>For patients, the next question is immediate:</p>
        <p><strong>How long until treatment begins?</strong></p>
        <p>NHS England’s latest cancer waiting-time statistics, published on <strong>12 November 2026</strong>, provide a useful snapshot of how that pathway is performing.</p>
      </section>
      <section aria-labelledby="three-clocks-three-different-questions">
        <h2 id="three-clocks-three-different-questions">Three clocks — three different questions</h2>
        <p>England measures cancer waiting times through three principal standards.</p>
        <p>The <strong>28-day Faster Diagnosis Standard</strong> asks whether people urgently referred with suspected cancer or breast symptoms, or urgently referred from a screening programme, receive a diagnosis — or have cancer ruled out — within 28 days.</p>
        <p>The <strong>31-day standard</strong> measures the period from a decision to treat or earliest clinically appropriate date to the start of first or subsequent treatment. The target is <strong>96%</strong>.</p>
        <p>The <strong>62-day standard</strong> measures the broader pathway from urgent suspected cancer, breast symptomatic or screening referral, or consultant upgrade, to first definitive treatment.</p>
        <p>That distinction matters.</p>
        <p>None of these is simply a national “diagnosis-to-treatment” clock.</p>
        <p>Together, however, they show how efficiently patients move through different parts of the cancer pathway.</p>
      </section>
      <section aria-labelledby="september-shows-continuing-pressure">
        <h2 id="september-shows-continuing-pressure">September shows continuing pressure</h2>
        <p>In September 2026, <strong>76.2%</strong> of urgently referred patients received a diagnosis or had cancer ruled out within 28 days.</p>
        <p>That was down from <strong>78.6% in August</strong> and remained below the <strong>80% standard</strong>.</p>
        <p>The treatment picture was also challenging.</p>
        <p><strong>91.5%</strong> began first or subsequent treatment within 31 days, below the <strong>96%</strong> target.</p>
        <p>Only <strong>70.7%</strong> of patients began first definitive treatment within 62 days of an urgent referral or consultant upgrade — down from <strong>71.9% in August</strong> and well below the <strong>85% standard</strong>.</p>
        <p>The direction matters because this is not simply about administrative performance.</p>
        <p>Behind each percentage is someone waiting to know what happens next.</p>
      </section>
      <section aria-labelledby="the-diagnosis-figure-hides-an-important-difference">
        <h2 id="the-diagnosis-figure-hides-an-important-difference">The diagnosis figure hides an important difference</h2>
        <p>The overall 28-day figure also needs unpacking.</p>
        <p>For July to September 2026, <strong>79.5% of people who ultimately had cancer ruled out</strong> received that result within 28 days.</p>
        <p>Among people who were actually diagnosed with cancer, however, only <strong>56.2%</strong> received their diagnosis within that period.</p>
        <p>That gap matters.</p>
        <p>The people who ultimately need treatment are also the group experiencing the slower diagnostic pathway.</p>
        <p>Earlier diagnosis remains one of the most important opportunities in cancer care.</p>
        <p>But identifying disease earlier only creates an opportunity.</p>
        <p>The system still has to convert that opportunity into timely treatment.</p>
      </section>
      <section aria-labelledby="earlier-diagnosis-is-only-part-of-the-pathway">
        <h2 id="earlier-diagnosis-is-only-part-of-the-pathway">Earlier diagnosis is only part of the pathway</h2>
        <p>Cancer pathways are connected.</p>
        <p><strong>Referral → investigation → diagnosis → treatment planning → treatment</strong></p>
        <p>A delay at one stage can affect what follows.</p>
        <p>And national averages can conceal substantial variation between cancers, hospitals, regions and communities.</p>
        <p>This is why pathway performance should not be judged only by whether a referral was made or a diagnosis reached.</p>
        <p>We also need to ask:</p>
        <p><strong>Did the patient move through the rest of the pathway without avoidable delay?</strong></p>
        <p>That is an implementation question as much as a clinical one.</p>
      </section>
      <section aria-labelledby="progress-should-be-recognised-but-so-should-the-gap">
        <h2 id="progress-should-be-recognised-but-so-should-the-gap">Progress should be recognised — but so should the gap</h2>
        <p>England has made genuine progress in identifying more cancers and diagnosing more disease at an earlier stage.</p>
        <p>That deserves recognition.</p>
        <p>But the latest waiting-time results show that the pathway after referral remains under pressure.</p>
        <p>The 28-day standard was missed in September.</p>
        <p>The 62-day standard was missed by a substantial margin.</p>
        <p>And the diagnostic experience of people ultimately found to have cancer remains markedly worse than the headline Faster Diagnosis figure suggests.</p>
        <p>The lesson is not that earlier diagnosis is failing.</p>
        <p>Earlier diagnosis is meaningful only if the rest of the pathway can keep pace.</p>
        <p>Because detecting cancer sooner matters.</p>
        <p><strong>But what happens next matters too.</strong></p>
      </section>
    </InsightArticle>
  </>;
}
