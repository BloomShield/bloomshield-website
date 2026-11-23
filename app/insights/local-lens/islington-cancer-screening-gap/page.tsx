import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "islington-cancer-screening-gap")!;
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
    label: "Islington Health and Wellbeing Board public report pack",
    source: "17 March 2026. Screening uptake comparisons for Islington, London and England.",
    href: "https://islington.moderngov.co.uk/documents/g5216/Public%20reports%20pack%2017th-Mar-2026%2013.00%20Health%20and%20Wellbeing%20Board.pdf?T=10",
  },
  {
    label: "Addressing health inequalities",
    source: "North Central London Cancer Alliance. Cancer inequalities, deprivation and population diversity across North Central London.",
    href: "https://www.nclcanceralliance.nhs.uk/about-us/addressing-health-inequalities/",
  },
  {
    label: "Improving breast screening participation",
    source: "North Central London Cancer Alliance. Non-responder outreach, language support and reasonable adjustments.",
    href: "https://www.nclcanceralliance.nhs.uk/prevention-awareness-and-screening/improving-breast-screening-participation/",
  },
  {
    label: "Improving bowel cancer screening participation",
    source: "North Central London Cancer Alliance. Community-based telephone encouragement, language support and pharmacy engagement.",
    href: "https://www.nclcanceralliance.nhs.uk/prevention-awareness-and-screening/improving-bowel-cancer-screening-participation/",
  },
  {
    label: "Cancer screening inequality analysis — Islington",
    source: "Islington evidence report. Historic ward, deprivation, disability and mental-health variation in cancer screening coverage.",
    href: "https://stats.islington.gov.uk/wp-content/uploads/2025/03/Summary-Report-NCL-Cancer-Screening-Inequality-Analysis-Islington-Jan-2022.pdf",
  },
];

export default function IslingtonLocalLensPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${canonicalPath}#article`,
    headline: article.title,
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
    contentLocation: { "@type": "Place", name: "Islington, London" },
    inLanguage: "en-GB",
  };

  return (
    <div className="local-lens-article-typography">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <InsightArticle
        category={article.area}
        crossTag="Local Lens LL010 · Early Diagnosis & Prevention"
        title={article.title}
        articleSlug={article.slug}
        date={article.publishedAt!}
        dateIso={article.publishedAtIso!}
        readTime="6 min read"
        authors={authors}
        publisher={insightPublisher.name}
        image="/images/insights/local-lens-ll010-islington-hero.png"
        imageAlt="BloomShield Local Lens LL010 Islington editorial graphic showing diverse Islington residents near the town hall and asking why screening still falls short despite world-class healthcare nearby."
        heroClassName="aspect-[1672/941]"
        heroImageClassName="object-contain object-center"
        standfirst={article.description}
        domains={["People", "Partnerships", "Systems", "Innovation", "Equity", "Impact"]}
        tags={article.tags}
        linkedinDiscussionUrl={article.linkedinDiscussionUrl}
        linkedinDiscussionTitle="Join the discussion on LinkedIn"
        linkedinBeforeContact
        linkedinDiscussionCard
        linkedinDiscussionImage="/images/insights/local-lens-ll010-islington-did-you-know.png"
        linkedinDiscussionImageClassName="object-contain"
        engagementContactLabel="Contact BloomShield"
        references={references}
        referencesHeading="Sources"
        previous={{ label: "LL09 · South Yorkshire & Bassetlaw", href: "/insights/local-lens/south-yorkshire-cancer-screening-gap" }}
        relatedContent={
          <section className="insight-article-end-section">
            <h2>Explore ScreenConnect Digital™</h2>
            <p>See how BloomShield is exploring 360-degree pathway visibility through a person-centred longitudinal research demonstrator.</p>
            <Link href="/insights/innovation-in-practice/screenconnect-digital-research-demonstrator">Explore ScreenConnect Digital™</Link>
          </section>
        }
      >
        <p>Islington sits in the heart of London.</p>
        <p>It is densely connected, well served by public transport and close to some of the country&apos;s leading NHS hospitals, specialist services and academic institutions.</p>
        <p>So there is an uncomfortable question worth asking:</p>
        <blockquote><p><strong>When world-class healthcare is nearby, why does cancer screening participation still fall short?</strong></p></blockquote>

        <p>We have encountered this tension before in Local Lens.</p>
        <p>Proximity to healthcare is not the same as access.</p>
        <p>And access is not the same as participation.</p>
        <p>Islington makes that distinction particularly visible.</p>

        <h2>The numbers tell a consistent story</h2>
        <p>Across the major national cancer screening programmes, Islington remains below England averages.</p>
        <p>For <strong>breast screening</strong>, Islington recorded <strong>57%</strong> uptake in 2025, compared with <strong>72%</strong> across England — a gap of about <strong>15 percentage points</strong>.</p>
        <p>For <strong>bowel cancer screening</strong>, Islington recorded <strong>64%</strong>, compared with <strong>73%</strong> nationally — around <strong>9 percentage points lower</strong>.</p>
        <p>Among women aged <strong>25–49</strong>, cervical screening coverage was <strong>52%</strong> in Islington, compared with <strong>66%</strong> across England — a gap of about <strong>14 percentage points</strong>.</p>
        <p>Among women aged <strong>50–64</strong>, cervical screening coverage was <strong>70%</strong>, compared with <strong>74%</strong> nationally.</p>
        <p>Different programmes use different reporting periods and age groups, so the measures should not be treated as directly interchangeable.</p>
        <p>But the direction is difficult to ignore.</p>
        <p className="insight-pull-statement">Across breast, bowel and cervical screening, Islington is consistently behind national participation levels.</p>

        <figure>
          <Image
            src="/images/insights/local-lens-ll010-islington-did-you-know.png"
            alt="BloomShield Local Lens LL010 Did You Know graphic comparing Islington and England cancer screening rates for breast, bowel and cervical screening, with London Islington highlighted."
            width={1254}
            height={1254}
            sizes="(min-width: 1024px) 760px, 100vw"
            className="h-auto w-full"
          />
        </figure>

        <h2>The paradox of proximity</h2>
        <p>The obvious explanation cannot simply be that services are too far away.</p>
        <p>This is inner London.</p>
        <p>Hospitals, GP practices, pharmacies, transport links and specialist cancer services are comparatively close.</p>
        <p>Yet an appointment being geographically accessible does not mean it is practically accessible.</p>
        <p>A screening invitation still has to compete with work, caring responsibilities, housing insecurity, language, fear, mistrust, embarrassment, competing health problems and everyday life.</p>
        <p>And those barriers are not evenly distributed.</p>
        <p>North Central London Cancer Alliance identifies Islington among the most deprived local authority areas in the country and highlights the importance of accessible communication and targeted approaches to cancer inequalities.</p>
        <p>Historic Islington screening analysis also showed substantial variation beneath borough averages. For bowel screening, participation was lower among people living in the most deprived areas, people with learning difficulties or severe mental illness, and in several local wards.</p>
        <p>That is why borough-wide averages matter — but do not tell the whole story.</p>

        <h2>What Islington is already doing differently</h2>
        <p>The response across North Central London increasingly recognises that an invitation alone is not enough.</p>
        <p>The Cancer Alliance supports initiatives including contact with people who do not respond to breast screening invitations, multilingual support, reasonable adjustments for people with disabilities, and targeted approaches to bowel screening participation.</p>
        <p>For bowel screening, trained health facilitators have contacted first-time invitees before their screening invitation arrives, explaining the FIT test, answering questions and arranging preferred-language support where required.</p>
        <p>Voluntary, community and social enterprise organisations and community pharmacies are also part of efforts to reach people who may engage less readily with conventional NHS screening routes.</p>
        <p>These are important shifts because they recognise something screening statistics alone cannot show:</p>
        <blockquote><p><strong>Sometimes the barrier sits between the invitation and the action.</strong></p></blockquote>

        <h2>But what happens after engagement?</h2>
        <p>Suppose someone receives an invitation.</p>
        <p>Suppose community outreach works.</p>
        <p>Suppose they complete the screening test.</p>
        <p>What happens next?</p>
        <p>Do they receive the result? If follow-up is required, does it happen? If another investigation is recommended, is it completed?</p>
        <p>Where does delay occur? Where does disengagement occur? And where might a person disappear between one part of the pathway and the next?</p>
        <p>This is where BloomShield&apos;s concept of <strong>360-degree pathway visibility</strong> becomes important.</p>

        <h2>From participation to 360-degree pathway visibility</h2>
        <p>Screening performance is often discussed through individual stages:</p>
        <p><strong>Invitation. Uptake. Test completed.</strong></p>
        <p>But people experience a pathway:</p>
        <p><strong>Eligibility → Invitation → Participation → Screening → Results → Investigation → Diagnosis → Treatment → Follow-up</strong></p>
        <p>Understanding that entire journey requires more than knowing how many invitations were sent or how many tests were completed.</p>
        <p>It requires <strong>360-degree pathway visibility</strong>.</p>
        <p>That means being able to ask where people move forward, where they wait, where they disengage and where continuity begins to break down.</p>
        <p>This is one of the questions behind <strong>ScreenConnect Digital™</strong>, BloomShield&apos;s person-centred longitudinal research demonstrator.</p>
        <p>ScreenConnect Digital™ is being developed for research and validation. It is not an operational NHS system and it is not a clinical decision-making tool.</p>
        <p>Its purpose is to explore how screening journeys can be understood longitudinally — connecting stages that are often examined separately and helping identify potential points of delay, disengagement or loss to follow-up.</p>
        <p>Technology is not the intervention.</p>
        <p>The value lies in what better visibility might allow people, services and communities to do differently.</p>

        <h2>The Local Lens takeaway</h2>
        <p>Islington challenges a comfortable assumption.</p>
        <p>Being surrounded by excellent healthcare does not automatically create equitable access to it.</p>
        <p>A service may be nearby.</p>
        <p>An invitation may arrive.</p>
        <p>A screening programme may be available.</p>
        <p>And participation can still sit around <strong>14–15 percentage points below the national average</strong> for some programmes.</p>
        <p>The last mile is therefore not always about distance.</p>
        <p>Sometimes it is the space between <strong>availability and action</strong>.</p>
        <p>And beyond participation lies another challenge: making sure people remain connected through the pathway that follows.</p>
        <p>That is why cancer screening needs both community-centred engagement and better <strong>360-degree pathway visibility</strong>.</p>
        <p><strong><Link href="/insights/innovation-in-practice/screenconnect-digital-research-demonstrator">Explore ScreenConnect Digital™</Link></strong> to see how BloomShield is investigating this challenge, or <strong><Link href="/contact">contact BloomShield</Link></strong> to discuss research, validation and partnership opportunities.</p>
        <p><em>BloomShield Local Lens provides independent, evidence-led analysis of cancer prevention, screening inequalities and opportunities for community-based health improvement.</em></p>
      </InsightArticle>
    </div>
  );
}
