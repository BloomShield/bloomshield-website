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

        <p>Screening can help find lung cancer earlier.</p>
        <p>But screening is not the endpoint.</p>

        <p>A low-dose CT scan may show nothing that needs immediate action. It may lead to another scan or a period of surveillance. Or it may identify something that needs further investigation and specialist assessment.</p>

        <p>And where cancer is diagnosed, another journey begins.</p>

        <p><strong>Results → Investigation → Diagnosis → Treatment → Follow-up</strong></p>

        <p>That journey matters just as much as the screening test itself.</p>

        <h2 className="!mt-12">What happens after something is found?</h2>

        <p>For the person being screened, an unexpected finding can turn a routine appointment into a period of uncertainty.</p>

        <p>What does the result mean?</p>
        <p>Will another scan be needed?</p>
        <p>Is a referral being made?</p>
        <p>Who will contact me?</p>
        <p>What happens next?</p>

        <p>Cancer pathways are often described as a series of clinical steps. But people experience them as a journey through appointments, information, decisions, waiting and uncertainty.</p>

        <p>Every transition creates an opportunity for continuity.</p>
        <p>It can also create an opportunity for delay or disengagement.</p>

        <p>That is why earlier detection cannot be separated from what happens afterwards.</p>

        <p>Finding something sooner matters most when the person can move through the next steps of the pathway without unnecessary delay or becoming lost between services.</p>

        <h2>From screening to pathway</h2>

        <p>Across this Lung Cancer Awareness Month series we have followed that journey progressively.</p>

        <p><strong>Part 1</strong> looked at recognising possible symptoms and acting early.</p>

        <p><strong>Part 2</strong> explored the NHS lung cancer screening offer and who may be invited.</p>

        <p><strong>Part 3</strong> asked an important access question: does receiving an invitation actually lead to participation?</p>

        <p>And now Part 4 takes us beyond the scan itself.</p>

        <p>Because the complete journey is closer to:</p>

        <p><strong>Eligibility → Invitation → Participation → Screening → Results → Investigation → Diagnosis → Treatment → Follow-up</strong></p>

        <p>Not everyone will travel through every stage.</p>

        <p>But where someone does need further care, the connections between those stages matter.</p>

        <h2>This is also the question behind ScreenConnect Digital™</h2>

        <p>At BloomShield, that pathway question has shaped the development of <strong>ScreenConnect Digital™</strong>.</p>

        <p>ScreenConnect Digital™ is our person-centred longitudinal <strong>research demonstrator</strong>, created to explore how screening journeys can be understood across time rather than as isolated appointments.</p>

        <p>The prototype is currently being developed for research and validation and has entered <strong>NHS Innovation Discovery</strong>.</p>

        <p>It is not an operational NHS system and it is not a clinical decision-making tool.</p>

        <p>Our interest is more fundamental:</p>

        <blockquote>
          <p><strong>Can we better understand where people experience delay, disengage or become lost across the screening and onward-care pathway?</strong></p>
        </blockquote>

        <p>And if we can identify those points more clearly, can that insight help services, researchers and communities design better ways of supporting people through them?</p>

        <p>Technology is not the intervention.</p>

        <p>The intervention is whatever ultimately helps a person move through the pathway more safely, confidently and equitably.</p>

        <p>Technology may simply help us see where that support is most needed.</p>

        <h2>The lesson we end with</h2>

        <p>Lung cancer screening creates an important opportunity to detect disease earlier.</p>

        <p>But an invitation alone is not enough.</p>
        <p>Participation alone is not enough.</p>
        <p>And even the scan itself is not the end of the story.</p>

        <p>The real measure of success is whether people can benefit from the <strong>whole pathway</strong> that follows.</p>

        <blockquote>
          <p><strong>Finding cancer earlier matters. But what happens next matters too.</strong></p>
        </blockquote>

        <p><strong><Link href="/contact">Want to find out more about ScreenConnect Digital™ and our research and validation work? Contact BloomShield.</Link></strong></p>
      </InsightArticle>
    </>
  );
}
