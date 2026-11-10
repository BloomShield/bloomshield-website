import type { Metadata } from "next";
import Image from "next/image";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "kirklees-mobile-cervical-screening")!;
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
    "label": "North Road Suite NHS — Mobile cervical screening unit in Kirklees",
    "source": "10 March 2026. Eligibility, community locations and language support.",
    "href": "https://www.northroadsuite.nhs.uk/mobile-cervical-screening-unit-in-kirklees/"
  },
  {
    "label": "Kirklees Council — Mobile cervical screening pilot sees strong community response",
    "source": "27 April 2026. Early participant feedback and evaluation plans.",
    "href": "https://kirkleestogether.co.uk/2026/04/27/mobile-cervical-screening-pilot-sees-strong-community-response-across-kirklees/"
  },
  {
    "label": "Local Government Association — Community clinical van outreach case study",
    "source": "10 June 2026. Resident feedback, pilot delivery and early findings.",
    "href": "https://www2.local.gov.uk/case-studies/improving-access-cervical-screening-case-study-community-clinical-van-outreach-project"
  }
];

export default function KirkleesLocalLensPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${canonicalPath}#article`,
    headline: article.title,
    description: article.seoDescription ?? article.description,
    image: { "@type": "ImageObject", url: `${SITE_URL}${socialImage}`, width: article.socialImageWidth, height: article.socialImageHeight, caption: socialImageAlt },
    datePublished: article.datePublished ?? article.publishedAtIso,
    dateModified: article.dateModified ?? article.publishedAtIso,
    author: authors.map(author => ({ "@type": "Organization", name: author.name, description: author.biography, jobTitle: author.credentials, affiliation: { "@type": "Organization", name: "BloomShield CIC", url: SITE_URL } })),
    publisher: { "@type": "Organization", name: insightPublisher.name, url: `${SITE_URL}/insights`, parentOrganization: { "@type": "Organization", name: ORGANIZATION_NAME, url: SITE_URL }, logo: { "@type": "ImageObject", url: `${SITE_URL}/bloomshield-square-lockup.png`, width: 545, height: 590 } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${canonicalPath}` },
    articleSection: article.area,
    keywords: keywords.join(", "),
    about: keywords.map(name => ({ "@type": "Thing", name })),
    contentLocation: { "@type": "Place", name: "Kirklees, West Yorkshire" },
    inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
    <InsightArticle
      category={article.area}
      crossTag="Local Lens LL08 · Kirklees, West Yorkshire"
      title={article.title}
      subtitle={article.shortTitle}
      articleSlug={article.slug}
      date={article.publishedAt!}
      dateIso={article.publishedAtIso!}
      readTime="4 min read"
      authors={authors}
      publisher={insightPublisher.name}
      image="/images/insights/local-lens-kirklees-hero.png"
      imageAlt="What happens when screening moves closer to communities? BloomShield Local Lens LL08, Kirklees."
      heroClassName="aspect-[1672/941]"
      heroImageClassName="object-contain object-center"
      standfirst={article.description}
      domains={["People", "Partnerships", "Systems", "Equity", "Impact"]}
      tags={article.tags}
      linkedinDiscussionUrl="https://lnkd.in/p/dstQTCy4"
      linkedinDiscussionTitle="Join the discussion on LinkedIn"
      linkedinDiscussionDescription="Continue the conversation on community-based screening, accessibility and what service adaptation can change."
      linkedinBeforeContact
      linkedinDiscussionCard
      linkedinDiscussionImage={socialImage}
      linkedinDiscussionImageClassName="object-contain"
      references={references}
      interactionsAfterManuscript
      previous={{ label: "LL-007 · Local Lens: Bedford", href: "/insights/local-lens/bedford" }}
    >
    <p>Kirklees is a metropolitan borough in West Yorkshire, centred on Huddersfield and Dewsbury.</p>
    <p>In March 2026, Kirklees Council’s Public Health Team launched a mobile cervical screening unit with Locala. Funded by the West Yorkshire and Harrogate Cancer Alliance, it offered free drop-in screening at community locations.</p>
    <p>The idea is simple. Instead of expecting everyone to fit the screening system, bring screening closer to where people already are.</p>

    <figure>
      <Image src="/images/insights/local-lens-kirklees-did-you-know.png" alt="Illustration of Kirklees bringing cervical screening into the community through a mobile drop-in service." width={1671} height={941} sizes="(min-width: 1024px) 760px, 100vw" className="h-auto w-full" />
    </figure>

    <h2>What Kirklees changed</h2>
    <p>The mobile unit visited Dewsbury Minster, Eddercliffe Health Centre, Clare Hill Community Centre, Al-Hikmah Centre in Batley, Ravensthorpe Community Centre, the Accu Football Stadium and other community venues in Huddersfield.</p>
    <p>People could attend if they had received a cervical screening invitation, missed a previous appointment or were overdue. No appointment was required.</p>
    <p>Clinical support was available in <strong>English, Urdu, Hindi and Bengali</strong>. People could also drop in to ask questions or discuss concerns before deciding whether to proceed.</p>
    <p>That is more than a change of venue. It is a change in how access is designed.</p>

    <h2>Why community delivery matters</h2>
    <p>A screening programme can be clinically available and still be difficult to use. Appointments may clash with work or caring responsibilities. Travel may be inconvenient. Some people may feel anxious about attending their GP practice or be unsure what the test involves.</p>
    <p>Before the pilot, Kirklees Council and community champions heard directly from residents about unsuitable appointment times, anxiety about the test and the need for language support. Those conversations helped shape the mobile service.</p>
    <p><strong>Availability ≠ accessibility ≠ participation.</strong></p>
    <p>Making screening available is the first step. Designing it around the realities of people’s lives is another.</p>

    <h2>What barriers might this reduce?</h2>
    <p>A mobile drop-in service can shorten journeys and remove the need to book ahead. Familiar community settings can make the service more visible, while language support can make it easier to ask questions and understand what to expect.</p>
    <p>There may also be a trust dimension. Being able to talk to a clinician in a recognised community venue before deciding whether to proceed can feel very different from receiving a letter and arranging an appointment independently.</p>
    <figure>
      <Image src="/images/insights/local-lens-kirklees-square.png" alt="What happens when the system adapts to people? The graphic highlights convenience, screening closer to home, community trust, multiple languages and fewer practical barriers." width={1254} height={1254} sizes="(min-width: 1024px) 760px, 100vw" className="h-auto w-full" />
    </figure>

    <h2>What we still need to know</h2>
    <p>Early reports describe attendance by some people who had missed previous appointments, as well as some who were screened for the first time. Participants cited convenience and reassurance. The published case study gives examples of who came, but it does not quantify how much the pilot changed screening uptake across Kirklees or how many people completed follow-up.</p>
    <p>How many people who had repeatedly missed screening took part? Which locations reached people who were overdue? Did language support influence participation? Were some groups still under-represented? And did people who needed follow-up complete the next stages of the pathway?</p>
    <p>Answering those questions would help distinguish a well-received service from one that measurably narrows gaps in participation and follow-up.</p>

    <h2>What this means for pathway design</h2>
    <p>Kirklees offers an example of <strong>service adaptation</strong>. It changes where and how people can access screening. That principle matters beyond cervical screening. When participation is lower in a community, another awareness campaign may do little about the practical barriers people face.</p>
    <p><strong>What part of the pathway is creating friction, and can we redesign it?</strong></p>
    <p>That might mean changing where screening is delivered or when it is available. It might mean removing booking requirements, improving language support, involving trusted community organisations or helping people move from screening into follow-up care.</p>
    <p>The question is not simply whether screening exists. It is whether people can realistically reach it, understand it, trust it and complete the pathway.</p>
    <p><strong>Local data. Local voices. Local action.</strong></p>
    </InsightArticle>
  </>;
}
