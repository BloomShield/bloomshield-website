import Image from "next/image";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insights } from "@/lib/insights";
import { createInsightMetadata, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "lung-cancer-awareness-month-part-3-invitation-participation")!;
const authors = getInsightAuthors(article);
const collection = "/insights/series-collections/lung-cancer-awareness-month-2026";

export const metadata = {
  ...createInsightMetadata({
    title: article.seoTitle!,
    description: article.seoDescription!,
    path: article.href!,
    socialImage: article.socialImage!,
    socialImageAlt: article.socialImageAlt!,
    socialImageWidth: article.socialImageWidth!,
    socialImageHeight: article.socialImageHeight!,
    socialImageType: article.socialImageType,
    type: "article",
    authors: authors.map(author => author.name),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    keywords: article.tags,
  }),
  title: { absolute: article.seoTitle! },
  publisher: "BloomShield CIC",
};

const references = [
  { label: "Lung cancer screening", href: "https://www.nhs.uk/tests-and-treatments/lung-cancer-screening/", source: "NHS" },
  { label: "Digital screening for lung cancer", href: "https://digital.nhs.uk/services/screening-services/digital-screening-for-lung-cancer", source: "NHS England Digital" },
  { label: "Supermarket scans spotting thousands of cancers — 25 May 2026", href: "https://www.england.nhs.uk/2026/05/supermarket-scans-spotting-thousands-of-cancers/", source: "NHS England" },
  { label: "Standard protocol and quality assurance standards for the Lung Cancer Screening Programme", href: "https://www.england.nhs.uk/publication/targeted-screening-for-lung-cancer/", source: "NHS England" },
];

export default function LungScreeningArticle() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription,
    image: SITE_URL + article.socialImage,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: { "@type": "Organization", name: "BloomShield CIC" },
    publisher: { "@type": "Organization", name: "BloomShield CIC", url: SITE_URL },
    mainEntityOfPage: SITE_URL + article.href,
    articleSection: article.area,
    isPartOf: { "@type": "CreativeWorkSeries", name: article.collection, url: SITE_URL + collection },
    position: article.seriesPosition,
    inLanguage: "en-GB",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\u003c") }} />
      <InsightArticle
        category={article.area}
        crossTag="Lung Cancer Awareness Month — Part 3 of 4"
        title={article.title}
        subtitle="After the invitation arrives, what happens next?"
        articleSlug={article.slug}
        date={article.publishedAt!}
        dateIso={article.publishedAtIso!}
        authors={authors}
        publisher="BloomShield CIC"
        standfirst="An invitation can open the door to lung cancer screening. But it cannot guarantee that someone walks through it."
        image={article.image!}
        imageAlt={article.imageAlt!}
        heroClassName="aspect-[1672/941]"
        heroImageClassName="object-contain object-center"
        domains={["People", "Equity", "Impact"]}
        tags={article.tags}
        references={references}
        referencesHeading="Sources & further reading"
        implementationLesson={null}
        linkedinBeforeContact
        linkedinDiscussionCard
        linkedinDiscussionImage="/images/insights/lung-cancer-awareness-month-part-3-invitation-participation-square.png"
        linkedinDiscussionImageClassName="object-contain"
        linkedinDiscussionUrl={article.linkedinDiscussionUrl}
        linkedinDiscussionTitle="Join the discussion on LinkedIn"
        linkedinDiscussionDescription="Continue the conversation on lung cancer screening, eligibility and why earlier detection matters."
        previous={{ label: "Part 2 — Know the screening offer", href: "/insights/series-collections/lung-cancer-awareness-month-part-2-screening" }}
        next={{ label: "Part 4 — From screening to pathway", href: "/insights/series-collections/lung-cancer-awareness-month-part-4-from-screening-to-pathway" }}
        contextualCta={<section className="insight-article-end-section" aria-label="Lung Cancer Awareness Month series"><h2>Lung Cancer Awareness Month 2026</h2><ol><li><Link href="/insights/series-collections/know-the-signs-act-early">Part 1 — Know the signs</Link></li><li><Link href="/insights/series-collections/lung-cancer-awareness-month-part-2-screening">Part 2 — Know the screening offer</Link></li><li aria-current="page">Part 3 — Invitation is not the same as participation</li><li><Link href="/insights/series-collections/lung-cancer-awareness-month-part-4-from-screening-to-pathway">Part 4 — From screening to pathway</Link></li></ol><Link href={collection}>Explore the four-part series</Link></section>}
        relatedContent={<section className="insight-article-end-section"><h2>Related content</h2><Link href="/cancer-prevention-screening/lung-health-checks">Lung cancer prevention and screening FAQs</Link></section>}
      >
<p><strong>Lung Cancer Awareness Month | Part 3 of 4</strong></p>
<p>An invitation can open the door to lung cancer screening.</p>
<p>But it cannot guarantee that someone walks through it.</p>
<p>England’s lung cancer screening programme is expanding, giving more people at higher risk of lung cancer the opportunity to receive a Lung Health Check and, where appropriate, a low-dose CT scan.</p>
<p>That matters.</p>
<p>But screening effectiveness depends on more than identifying who is eligible and sending an invitation.</p>
<p>The next question is:</p>
<p><strong>What happens after the invitation arrives?</strong></p>
<h2 className="!mt-12">From invitation to participation</h2>
<p>For someone to benefit from screening, several things may need to happen.</p>
<p>They need to recognise what the invitation is.</p>
<p>They need to understand why they have received it.</p>
<p>They need to trust the offer.</p>
<p>They may need to answer a telephone call, complete a risk assessment, arrange or attend an appointment and, if recommended, proceed to a low-dose CT scan.</p>
<p>Each step creates an opportunity for participation.</p>
<p>It can also create an opportunity for someone to be lost from the pathway.</p>
<p>That is why:</p>
<blockquote><p><strong>Invitation is not the same as participation.</strong></p></blockquote>
<h2>Why people may not take up the offer</h2>
<p>There is rarely one explanation for screening non-participation.</p>
<p>Practical barriers can matter.</p>
<p>Someone may be working when an appointment is offered.</p>
<p>Transport may be difficult.</p>
<p>Caring responsibilities may compete for their time.</p>
<p>Contact details or smoking history held by healthcare services may be incomplete or out of date.</p>
<p>But practical barriers are only part of the picture.</p>
<p>Some people may not immediately understand why they are being approached when they feel well.</p>
<p>Others may worry about what a scan could find.</p>
<p>Previous experiences of healthcare can influence trust.</p>
<p>The association between lung cancer and smoking may also create feelings of stigma, guilt or fear of judgement.</p>
<p>These factors can shape whether an invitation becomes action.</p>
<h2>Screening is designed for people who may feel well</h2>
<p>This distinction is important.</p>
<p>Lung cancer screening is intended to identify cancer earlier in people who may not have symptoms.</p>
<p>The current NHS programme invites eligible people aged 55 to 74 who currently smoke or have smoked in the past for a Lung Health Check.</p>
<p>People assessed as being at higher risk may then be offered a low-dose CT scan.</p>
<p>Someone experiencing possible symptoms of lung cancer should not wait for a screening invitation. They should seek medical advice.</p>
<p>Screening and symptomatic diagnosis are different routes into the cancer pathway.</p>
<h2>Earlier detection is already making a difference</h2>
<p>The value of lung cancer screening is increasingly visible.</p>
<p>NHS England reported in May 2026 that more than <strong>10,000 lung cancers had been identified through the programme since its launch</strong>, with more than three-quarters found at stages 1 or 2.</p>
<p>Finding cancer earlier can create more treatment options and improve the possibility of successful treatment.</p>
<p>But those benefits depend on people reaching the screening pathway in the first place.</p>
<p>Expansion therefore needs to be considered alongside participation.</p>
<p>Who receives an invitation?</p>
<p>Who responds?</p>
<p>Who completes the Lung Health Check?</p>
<p>Who proceeds to CT when recommended?</p>
<p>And who does not — and why?</p>
<figure className="my-10"><Image src="/images/insights/lung-cancer-awareness-month-part-3-invitation-participation-square.png" alt="BloomShield Lung Cancer Awareness Month Part 3 graphic asking what happens after a lung screening invitation arrives, with the pathway from understanding and trust to attendance and completion." width={1254} height={1254} sizes="(min-width: 1024px) 800px, 100vw" className="h-auto w-full rounded-2xl object-contain" /></figure>
<h2>The access question</h2>
<p>A screening programme can be clinically effective and still produce unequal benefit if some communities are less able to participate.</p>
<p>That is why screening inequalities cannot be understood from invitation numbers alone.</p>
<p>We also need to understand the barriers between:</p>
<p><strong>Eligibility → Invitation → Participation → Screening → Follow-up</strong></p>
<p>Some barriers may be addressed through clearer communication.</p>
<p>Others may require flexible delivery, convenient locations, trusted community engagement or better navigation through the pathway.</p>
<p>The solution will not be identical everywhere.</p>
<p>Understanding where people disengage — and why — is therefore as important as measuring how many invitations were sent.</p>
<h2>The wider lesson</h2>
<p>The expansion of lung cancer screening is an important opportunity for earlier diagnosis.</p>
<p>But coverage is only one measure of success.</p>
<p>The deeper question is whether eligible people can understand, trust and act on the offer they receive.</p>
<p>Because the invitation matters.</p>
<p>The screening test matters.</p>
<p>And so does everything that happens between them.</p>
<blockquote><p><strong>Invitation ≠ Participation.</strong></p></blockquote>
<p><strong>Next in the series — Part 4:</strong> <Link href="/insights/series-collections/lung-cancer-awareness-month-part-4-from-screening-to-pathway"><em>From screening to pathway: what happens next matters too.</em></Link></p>
      </InsightArticle>
    </>
  );
}
