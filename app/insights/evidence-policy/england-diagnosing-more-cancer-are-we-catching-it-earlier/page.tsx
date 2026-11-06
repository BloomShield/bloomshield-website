import type { Metadata } from "next";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "england-diagnosing-more-cancer-are-we-catching-it-earlier")!;
const authors = getInsightAuthors(article);
const path = article.canonicalUrl!;
const title = article.seoTitle!;
const standfirst = "New NHS figures reveal a record number of cancer diagnoses in England — alongside encouraging progress in earlier detection. What is changing, and what does it mean for patients?";
const australia = insights.find(item => item.slug === "australia-world-eliminating-cervical-cancer")!;

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
  { label: "Cancer Registration Statistics, England, 2024.", source: "NHS England. Published 5 November 2026.", citation: <>NHS England. <em>Cancer Registration Statistics, England, 2024.</em> Published 5 November 2026.</>, href: "https://www.gov.uk/government/statistics/cancer-registration-statistics-england-2024" },
  { label: "Early cancer diagnosis in England reaches highest ever level.", source: "NHS England. 2 January 2025.", citation: <>NHS England. <em>Early cancer diagnosis in England reaches highest ever level.</em> 2 January 2025.</>, href: "https://www.england.nhs.uk/2025/01/early-cancer-diagnosis-in-england-reaches-highest-ever-level/" },
  { label: "Cancer diagnoses in England hit record high of more than 1,000 people a day.", source: "The Guardian. 5 November 2026.", citation: <>The Guardian. <em>Cancer diagnoses in England hit record high of more than 1,000 people a day.</em> 5 November 2026.</>, href: "https://www.theguardian.com/society/2026/nov/05/nhs-england-cancer-diagnoses-record-high-1000-people-diagnosed-every-day" },
];

export default function EnglandCancerDiagnosisInsightPage() {
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
    inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
    <InsightArticle
      category={article.area}
      crossTag="Part 1 of 2 | November 2026"
      title={article.title}
      articleSlug={article.slug}
      date={article.publishedAt!}
      dateIso={article.publishedAtIso!}
      authors={authors}
      publisher={insightPublisher.name}
      standfirst={standfirst}
      image="/images/insights/england-cancer-care-breakthrough.png"
      imageAlt="BloomShield Part 1 graphic with an illustrative clinical team. In England in 2024 there were 373,574 new cancer diagnoses, and 56.7% of first new cancers were reported at stages 1 or 2."
      heroClassName="aspect-[1672/941]"
      heroImageClassName="object-contain"
      domains={["People", "Systems", "Equity", "Impact"]}
      tags={article.tags}
      interactionsAfterManuscript
      references={references}
      referencesHeading="References"
      linkedinBeforeContact
      linkedinDiscussionCard
      linkedinDiscussionImage={article.image}
      linkedinDiscussionImageClassName="object-contain"
      linkedinDiscussionUrl={article.linkedinDiscussionUrl}
      linkedinDiscussionTitle="Continue the discussion on LinkedIn"
      linkedinDiscussionDescription="Join the conversation about earlier cancer diagnosis, NHS screening efforts and what comes next for patients."
      linkedinDiscussionLinkLabel="Read and discuss on LinkedIn"
      previous={{ label: australia.title, href: australia.href! }}
      relatedContent={<section className="insight-article-end-section" aria-labelledby="related-insights">
        <h2 id="related-insights">Related Insights</h2>
        <Link href="/insights/evidence-policy/hpv-self-testing-screening-gap" data-insights-event="insights_related_content_click" className="mt-5 inline-flex font-bold text-teal-700 underline decoration-teal-700/30 underline-offset-4">HPV Self-Testing Is a Major Step Forward — But Will It Close the Screening Gap?</Link>
      </section>}
    >
      <section aria-labelledby="earlier-detection">
        <h2 id="earlier-detection">More diagnoses. A promising shift towards earlier detection.</h2>
        <p><strong>1,021 cancer diagnoses every day.</strong></p>
        <p>That is the average recorded in England during 2024, according to NHS cancer registration statistics published on 5 November 2026.</p>
        <p>Across the year, <strong>373,574 new cancers were diagnosed</strong>, excluding common non-melanoma skin cancers — the highest annual total on record.</p>
        <p>The number is striking. But another finding deserves equal attention.</p>
        <p>According to reporting of the NHS England figures, <strong>56.7% of first new cancers were diagnosed at stages 1 or 2 in 2024</strong>, compared with <strong>55.8% in 2023</strong>.</p>
        <p>That represents a modest but encouraging improvement in earlier diagnosis.</p>
        <p>More diagnoses do not necessarily mean that cancer risk is increasing at the same rate. Population ageing, underlying risk and improved detection can all influence the totals.</p>
        <p>The important question is whether more people are being diagnosed at a stage when treatment has a better chance of success.</p>
      </section>
      <section aria-labelledby="four-cancers">
        <h2 id="four-cancers">The four cancers behind half of all diagnoses</h2>
        <p>Prostate, breast, lung and bowel cancers together accounted for approximately half of England&apos;s newly diagnosed cancers in 2024.</p>
        <p>These four cancers illustrate the breadth of the NHS&apos;s approach to earlier detection.</p>
        <p><strong>Breast cancer:</strong> The NHS Breast Screening Programme uses mammography to identify cancers, including some before symptoms develop.</p>
        <p><strong>Bowel cancer:</strong> Home-based faecal immunochemical testing (FIT) helps identify people who may need further investigation.</p>
        <p><strong>Lung cancer:</strong> Targeted lung screening, including low-dose CT for eligible people at higher risk, is being expanded across England.</p>
        <p><strong>Prostate cancer:</strong> Unlike breast and bowel cancer, there is no routine population-wide prostate screening programme. Earlier diagnosis relies on appropriate clinical assessment, informed PSA testing and risk-based approaches.</p>
        <p>Different cancers require different strategies. Not every diagnosis results from screening; many begin with symptoms, GP assessment or other diagnostic investigations.</p>
        <p>Nevertheless, these pathways share an important ambition:</p>
        <p><strong>Find cancer earlier, when more treatment options may be available.</strong></p>
      </section>
      <section aria-labelledby="nhs-progress">
        <h2 id="nhs-progress">Recognition for the people behind the progress</h2>
        <p>These figures provide an opportunity to acknowledge the work taking place across the NHS.</p>
        <p>From screening teams and radiographers to GPs, diagnostic specialists, Cancer Alliances and community organisations, earlier diagnosis depends on people working across different parts of the health system.</p>
        <p>Efforts to expand screening, improve diagnostic capacity and bring services closer to communities are important contributions to that work.</p>
        <p>The increase in the national early-stage proportion is encouraging, although these statistics alone cannot tell us how much of the improvement resulted from any individual programme.</p>
        <p>And progress must be examined alongside continuing inequalities in who accesses screening, receives a timely diagnosis and benefits from care.</p>
      </section>
      <section aria-labelledby="after-diagnosis">
        <h2 id="after-diagnosis">Earlier diagnosis is progress. But what happens next?</h2>
        <p>For BloomShield, this is where the next question begins.</p>
        <p>Identifying cancer earlier is a major step. But diagnosis is not the end of the patient journey.</p>
        <p>What happens between receiving a diagnosis and beginning treatment?</p>
        <p>How quickly do patients move through the system?</p>
        <p>And are those opportunities equally accessible across communities?</p>
        <p><strong>On 12 November 2026, NHS England is provisionally scheduled to publish its next cancer waiting-time statistics.</strong></p>
        <p>In Part 2, we will examine what those figures reveal about timely treatment, pathway continuity and the challenges that remain.</p>
        <p>Because finding cancer earlier matters.</p>
        <p><strong>Making sure patients can access the treatment they need, without avoidable delay, matters just as much.</strong></p>
      </section>
      <section aria-labelledby="coming-next" className="rounded-[1.5rem] border border-teal-900/10 bg-[#f7f5ef] p-6 sm:p-8">
        <h2 id="coming-next">Coming next — Part 2</h2>
        <p><strong>Diagnosed — But How Long Until Treatment Begins?</strong></p>
        <p>An examination of cancer waiting times, treatment access and the journey beyond diagnosis.</p>
        <p><em>BloomShield Insights | Evidence &amp; Policy</em></p>
        <p><strong>Protect. Prevent. Empower.</strong></p>
      </section>
    </InsightArticle>
  </>;
}
