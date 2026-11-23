import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insights } from "@/lib/insights";
import { createInsightMetadata, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "lung-cancer-awareness-month-part-4-from-screening-to-pathway")!;
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
  { label: "Standard protocol and quality assurance standards for the Lung Cancer Screening Programme", href: "https://www.england.nhs.uk/publication/targeted-screening-for-lung-cancer/", source: "NHS England" },
];

export default function LungScreeningPathwayArticle() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <InsightArticle
        category={article.area}
        crossTag="Lung Cancer Awareness Month — Part 4 of 4"
        title={article.title}
        subtitle="Screening is not the endpoint. What happens next matters too."
        articleSlug={article.slug}
        date={article.publishedAt!}
        dateIso={article.publishedAtIso!}
        authors={authors}
        publisher="BloomShield CIC"
        standfirst="Finding cancer earlier matters. But what happens next matters too."
        image={article.image!}
        imageAlt={article.imageAlt!}
        heroClassName="aspect-[1672/941]"
        heroImageClassName="object-contain object-center"
        domains={["People", "Systems", "Innovation", "Equity", "Impact"]}
        tags={article.tags}
        references={references}
        referencesHeading="Sources & further reading"
        implementationLesson={null}
        linkedinBeforeContact
        linkedinDiscussionCard
        linkedinDiscussionImage="/images/insights/lung-cancer-awareness-month-part-4-from-screening-to-pathway-square.jpg"
        linkedinDiscussionImageClassName="object-contain"
        linkedinDiscussionUrl={article.linkedinDiscussionUrl}
        linkedinDiscussionTitle="Join the discussion on LinkedIn"
        linkedinDiscussionDescription="Continue the conversation on screening, pathway continuity and earlier diagnosis."
        engagementContactLabel="Find out more about ScreenConnect Digital™"
        previous={{ label: "Part 3 — Invitation is not the same as participation", href: "/insights/series-collections/lung-cancer-awareness-month-part-3-invitation-participation" }}
        contextualCta={<section className="insight-article-end-section" aria-label="Lung Cancer Awareness Month series"><h2>Lung Cancer Awareness Month 2026</h2><ol><li><Link href="/insights/series-collections/know-the-signs-act-early">Part 1 — Know the signs</Link></li><li><Link href="/insights/series-collections/lung-cancer-awareness-month-part-2-screening">Part 2 — Know the screening offer</Link></li><li><Link href="/insights/series-collections/lung-cancer-awareness-month-part-3-invitation-participation">Part 3 — Invitation is not the same as participation</Link></li><li aria-current="page">Part 4 — From screening to pathway</li></ol><Link href={collection}>Explore the complete four-part series</Link></section>}
        relatedContent={<section className="insight-article-end-section"><h2>Related research &amp; innovation</h2><Link href="/insights/innovation-in-practice/screenconnect-digital-research-demonstrator">Explore ScreenConnect Digital™ — our person-centred research demonstrator</Link></section>}
      >
        <p><strong>Lung Cancer Awareness Month | Part 4 of 4</strong></p>
        <p>Screening can help find lung cancer earlier. But screening is not the endpoint.</p>
        <p>A low-dose CT scan may require no immediate further action. Or it may lead to another scan, further investigation, specialist assessment and, where cancer is diagnosed, treatment planning and follow-up.</p>

        <h2 className="!mt-12">From screening to pathway</h2>
        <p>The journey does not stop when the scan is complete.</p>
        <p><strong>Invitation → Participation → Screening → Results → Investigation → Diagnosis → Treatment → Follow-up</strong></p>
        <p>Every transition matters. Earlier detection creates its greatest value when people can move through the next steps without unnecessary delay, uncertainty or loss of continuity.</p>



        <h2>From pathway gaps to ScreenConnect Digital™</h2>
        <p>This is also the question behind <strong>ScreenConnect Digital™</strong>, BloomShield’s person-centred longitudinal research demonstrator.</p>
        <p>The prototype has been developed for research and validation and is progressing through NHS Innovation Discovery. It is not an operational NHS system or a clinical decision-making tool.</p>
        <p>Our research question is simple: can we understand where people are delayed, disengage or become lost across the pathway — and use that insight to support better navigation and more equitable access to care?</p>
        <p>Technology is not the intervention. The person and their journey remain at the centre.</p>

        <h2>The lesson we end with</h2>
        <p>Across this four-part series we have moved from symptoms, to the screening offer, to participation, and finally to the wider pathway.</p>
        <blockquote><p><strong>Finding cancer earlier matters. But what happens next matters too.</strong></p></blockquote>
        <p><strong><Link href="/contact">Want to find out more about ScreenConnect Digital™ and our research and validation work? Contact BloomShield.</Link></strong></p>
      </InsightArticle>
    </>
  );
}
