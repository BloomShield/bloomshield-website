import type { Metadata } from "next";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "county-durham-breast-services-review")!;
const authors = getInsightAuthors(article);
const canonicalPath = article.canonicalUrl!;
const socialImage = article.socialImage!;
const socialImageAlt = article.socialImageAlt!;
const keywords = article.keywords ?? article.tags ?? [];

export const metadata: Metadata = createInsightMetadata({
  title: article.seoTitle ?? article.title,
  description: article.seoDescription ?? article.description,
  path: canonicalPath,
  socialImage,
  socialImageAlt,
  socialImageWidth: article.socialImageWidth!,
  socialImageHeight: article.socialImageHeight!,
  type: "article",
  keywords,
  authors: authors.map(author => author.name),
  datePublished: article.datePublished ?? article.publishedAtIso,
  dateModified: article.dateModified ?? article.publishedAtIso,
});

const sources = [
  { label: "Trust Board agrees next stage of breast services look-back", href: "https://www.cddft.nhs.uk/about-us/news/trust-board-agrees-next-stage-breast-services-look-back", source: "County Durham and Darlington NHS Foundation Trust, 24 September 2026" },
  { label: "Breast services: patient support, service improvements and next steps", href: "https://www.cddft.nhs.uk/about-us/news/breast-services-patient-support-service-improvements-and-next-steps", source: "County Durham and Darlington NHS Foundation Trust, 17 September 2026" },
  { label: "Well-led assessment", href: "https://www.cqc.org.uk/provider/RXP/reports/AP16412/well-led-assessment/well-led", source: "Care Quality Commission, published 12 June 2026" },
  { label: "CQC takes action to drive improvements in quality and safety of care", href: "https://www.cqc.org.uk/press-release/cqc-takes-action-drive-improvements-quality-and-safety-care-county-durham-and", source: "Care Quality Commission, June 2026" },
];

const relatedContent = <section aria-labelledby="related-insights">
  <p className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">Continue exploring</p>
  <h2 id="related-insights" className="mt-4">Related Insights</h2>
  <div className="mt-6 divide-y divide-teal-900/10 border-y border-teal-900/10">
    <Link href="/insights/evidence-policy/hpv-self-testing-screening-gap" data-insights-event="insights_related_content_click" className="group flex items-center justify-between gap-5 py-5 text-ink">
      <span><span className="block text-xs font-bold uppercase tracking-[.14em] text-teal-700">Evidence &amp; Policy</span><span className="mt-2 block font-display text-xl font-semibold group-hover:text-teal-700">HPV self-testing and the screening gap</span></span><span aria-hidden="true" className="text-[#85601e]">→</span>
    </Link>
    <Link href="/insights/local-lens/medway-kent" data-insights-event="insights_related_content_click" className="group flex items-center justify-between gap-5 py-5 text-ink">
      <span><span className="block text-xs font-bold uppercase tracking-[.14em] text-teal-700">Local Lens</span><span className="mt-2 block font-display text-xl font-semibold group-hover:text-teal-700">Cancer screening in Medway: what the local data tells us</span></span><span aria-hidden="true" className="text-[#85601e]">→</span>
    </Link>
  </div>
</section>;

export default function CountyDurhamBreastServicesReviewPage() {
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
    contentLocation: { "@type": "AdministrativeArea", name: "County Durham" },
    inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <InsightArticle
      category={article.area}
      crossTag="Clinical governance &amp; service improvement"
      title={article.title}
      articleSlug={article.slug}
      date={article.publishedAt!}
      dateIso={article.publishedAtIso!}
      authors={authors}
      publisher={insightPublisher.name}
      standfirst="The number is alarming. The underlying failures were serious. But the full story is also about clinical audit, implementation and service improvement."
      image="/images/insights/county-durham-breast-services-review-hero.png"
      imageAlt="BloomShield Insight graphic about the County Durham breast services review, showing University Hospital of North Durham and Durham Cathedral."
      heroClassName="aspect-[1680/945]"
      heroImageClassName="object-contain object-center"
      domains={["People", "Systems", "Equity", "Impact"]}
      ccpeLens={article.ccpeLens}
      tags={article.tags}
      reflectionQuestion={article.reflectionQuestion}
      engagementContactLabel={article.engagementContactLabel}
      implementationLesson={<p>Investigating harm is essential. The further test is whether the response changes the conditions that allowed it, and whether transparent evaluation shows those improvements are lasting.</p>}
      references={sources}
      referencesHeading="Sources"
      relatedContent={relatedContent}
      previous={{ label: "All Insights", href: "/insights" }}
      next={{ label: "Cancer screening in Medway", href: "/insights/local-lens/medway-kent" }}
    >
      <section aria-label="Introduction">
        <p>When I first saw the BBC headline reporting that an NHS trust was to review 4,500 more breast cancer cases after failings, I was alarmed.</p>
        <p>Four thousand five hundred?</p>
        <p>It is the kind of number that can easily leave readers believing that thousands of women have already been found to have received unsafe cancer care.</p>
        <p>But that is not what the figure means.</p>
        <p>County Durham and Darlington NHS Foundation Trust has agreed to extend an existing review of its historic breast services. Reviews already underway cover care between January 2023 and February 2025. The Trust will then work backwards, beginning with patients treated in 2022 and potentially moving year by year towards 2015.</p>
        <p>Importantly, the <a href={sources[0].href} target="_blank" rel="noopener noreferrer">Trust says</a> that having previously received breast care during the period does not mean there was a problem with an individual patient’s treatment. The 4,500 figure is an approximate population that could be included as the historical look-back expands—not a count of people found to have been harmed.</p>
      </section>

      <section aria-labelledby="failures-were-real">
        <h2 id="failures-were-real">The failures were real</h2>
        <p>There is no need to minimise what happened.</p>
        <p>External reviews identified serious problems in the breast surgery service, including missed or delayed diagnoses, unnecessary procedures, weaknesses in surgical decision-making, multidisciplinary working and clinical governance.</p>
        <p>The <a href={sources[2].href} target="_blank" rel="noopener noreferrer">Care Quality Commission’s June 2026 well-led assessment</a> recorded significant concerns about governance systems, management of identified risk, and learning from incidents and complaints. The published assessment did not award a Well-led score.</p>
        <p>Those are substantial findings.</p>
        <p>But they are not the end of the story.</p>
      </section>

      <section aria-labelledby="what-happened-next">
        <h2 id="what-happened-next">What happened after the problems were identified?</h2>
        <p>This is where the case becomes particularly important from an implementation-science perspective.</p>
        <p>Clinical audit, benchmarking, external review and patient experience identified gaps between expected and actual care.</p>
        <p>Those findings were then used to change the service.</p>
        <p>The Trust <a href={sources[1].href} target="_blank" rel="noopener noreferrer">reports</a> changes including strengthened clinical leadership and governance, specialist recruitment, improved multidisciplinary working, changes to diagnostic and surgical pathways, and closer alignment with national standards.</p>
        <p>Its September update also reports improvement in a number of current service measures, while acknowledging that rebuilding trust and sustaining improvement will take time. Those claims describe the Trust’s reported current position; they do not remove the need for continuing independent scrutiny and evaluation.</p>
        <p className="insight-pull-statement">“Clinical audit identifies the gap.<br />Implementation closes it.<br />Evaluation tells us whether the gap stayed closed.”</p>
      </section>

      <section aria-labelledby="past-and-present">
        <h2 id="past-and-present">Why the distinction between past and present matters</h2>
        <p>Historical failure must be investigated rigorously.</p>
        <p>Patients who experienced harm deserve openness, accountability and appropriate support.</p>
        <p>But responsible reporting also requires us to distinguish historical performance from current practice.</p>
        <p>That does not erase what happened.</p>
        <p>It asks the next essential question: once problems were identified, were the required changes actually implemented—and are they producing better care?</p>
        <p>The purpose of uncovering failure is not simply to describe it. It is to understand why it happened, correct the system that allowed it to happen, and evaluate whether the correction worked.</p>
      </section>

      <section aria-labelledby="why-bloomshield">
        <h2 id="why-bloomshield">Why BloomShield is writing about this</h2>
        <p>At BloomShield, much of our work is concerned with inequalities in cancer screening, early diagnosis and navigation.</p>
        <p>But getting people into healthcare is only part of the pathway.</p>
        <p>Equity also means ensuring that once people enter a service, the care they receive is safe, evidence-based and continuously improved.</p>
        <p>This case reminds us that the cancer pathway does not end with access.</p>
        <div className="insight-emphasis-sequence"><p>Access → Diagnosis → Appropriate Treatment → Follow-up → Outcomes → Learning</p></div>
        <p>This is where clinical governance, quality improvement and implementation science meet.</p>
        <p>And it is why health systems must do more than identify variation.</p>
        <p>They must learn from it.</p>
        <p>They must implement change.</p>
        <p>And they must demonstrate that the change lasts.</p>
      </section>
    </InsightArticle>
  </>;
}
