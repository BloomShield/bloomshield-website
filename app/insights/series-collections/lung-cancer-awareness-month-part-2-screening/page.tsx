import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insights } from "@/lib/insights";
import { createInsightMetadata, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "lung-cancer-awareness-month-part-2-screening")!;
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
  { label: "Early diagnosis", href: "https://www.england.nhs.uk/cancer/early-diagnosis/", source: "NHS England" },
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
        crossTag="Lung Cancer Awareness Month — Part 2 of 4"
        title={article.title}
        articleSlug={article.slug}
        date={article.publishedAt!}
        dateIso={article.publishedAtIso!}
        authors={authors}
        publisher="BloomShield CIC"
        standfirst={article.description}
        image={article.image!}
        imageAlt={article.imageAlt!}
        heroClassName="aspect-square max-w-[640px] mx-auto"
        heroImageClassName="object-contain object-center"
        domains={["People", "Equity", "Impact"]}
        tags={article.tags}
        references={references}
        interactionsAfterManuscript
        linkedinBeforeContact
        linkedinDiscussionCard
        linkedinDiscussionImage={article.socialImage}
        linkedinDiscussionUrl={article.linkedinDiscussionUrl}
        linkedinDiscussionTitle="Join the discussion on LinkedIn"
        linkedinDiscussionDescription="Continue the conversation on lung cancer screening, eligibility and why earlier detection matters."
        previous={{ label: "Part 1 — Know the signs", href: "/insights/series-collections/know-the-signs-act-early" }}
        supportingEditorial={<section className="insight-article-end-section"><Link href={collection}>Explore the four-part Lung Cancer Awareness Month series →</Link></section>}
      >
        <p>If you are <strong>aged 55 to 74</strong>, are a <strong>current or former smoker</strong>, and are registered with a GP in an area where lung health checks are offered, you may be invited to take part in the NHS lung cancer screening programme.</p>
        <p>The first step is usually a <strong>lung health check</strong>.</p>
        <p>A healthcare professional asks about your smoking history, general health, breathing and other factors that help estimate your risk of developing lung cancer.</p>
        <p>If that assessment shows you are at higher risk, you may then be offered a <strong>low-dose CT scan of the lungs</strong>.</p>
        <p>It is a CT scan — <strong>not an MRI</strong>.</p>
        <p>The scan itself is quick, painless and uses a lower radiation dose than a standard CT scan. The aim is to identify lung cancer earlier, sometimes before symptoms develop, when treatment may be more effective.</p>
        <p>The pathway is simple:</p>
        <p><strong>Invitation → Lung health check → Risk assessment → Low-dose CT if higher risk</strong></p>
        <p>But one point is especially important:</p>
        <p><strong>Screening is for people who may feel well.</strong></p>
        <p>If you already have possible lung cancer symptoms — such as a persistent cough, coughing up blood, breathlessness or unexplained weight loss — do not wait for a screening invitation.</p>
        <p><strong>Speak to your GP.</strong></p>
        <p>Early action matters.</p>
        <p><strong><Link href="/cancer-prevention-screening/lung-health-checks">Explore BloomShield’s Lung Cancer Prevention FAQs for more information on symptoms, screening and prevention.</Link></strong></p>
      </InsightArticle>
    </>
  );
}
