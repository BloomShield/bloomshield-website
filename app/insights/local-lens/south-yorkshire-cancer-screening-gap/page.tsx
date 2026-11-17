import type { Metadata } from "next";
import Image from "next/image";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "south-yorkshire-cancer-screening-gap")!;
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
    "label": "Make your 'Number Two' your Number One priority!",
    "source": "30 October 2025. Regional bowel screening participation by age and deprivation.",
    "href": "https://canceralliancesyb.co.uk/news-and-events/news/make-your-number-two-your-number-one-priority"
  },
  {
    "label": "Rotherham Council — Dinnington Ward Profile",
    "source": "Refreshed February 2024. Local deprivation and variation within the ward.",
    "href": "https://www.rotherham.gov.uk/data/downloads/file/25/dinnington-ward-profile"
  },
  {
    "label": "Cancer Champion Programme",
    "source": "Primary-care support, local screening data, communication and behavioural resources.",
    "href": "https://canceralliancesyb.co.uk/professionals/key-projects/cancer-champion-programme"
  },
  {
    "label": "Be Cancer SAFE",
    "source": "Community cancer awareness and voluntary-sector delivery, including Voluntary Action Rotherham.",
    "href": "https://canceralliancesyb.co.uk/what-we-do/early-diagnosis/be-cancer-safe"
  },
  {
    "label": "Peace of Mind campaign",
    "source": "Encouraging people with possible cancer symptoms to contact their GP promptly.",
    "href": "https://canceralliancesyb.co.uk/what-we-do/early-diagnosis/peace-mind-check"
  },
  {
    "label": "Life-saving screening for lung cancer — 100% rollout across the region",
    "source": "2 February 2026. Regional invitations, Lung Health Checks, cancer diagnoses and stage.",
    "href": "https://canceralliancesyb.co.uk/news-and-events/news/life-saving-screening-lung-cancer-100-rollout-across-region"
  },
  {
    "label": "Making a difference in cancer care across our region",
    "source": "7 September 2026. Neighbourhood approaches and community-based care.",
    "href": "https://canceralliancesyb.co.uk/news-and-events/news/making-difference-cancer-care-across-our-region"
  }
];

export default function SouthYorkshireLocalLensPage() {
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
    contentLocation: { "@type": "Place", name: "South Yorkshire and Bassetlaw" },
    inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
    <InsightArticle
      category={article.area}
      crossTag="Local Lens LL09 · Early Diagnosis & Prevention"
      title={article.title}
      articleSlug={article.slug}
      date={article.publishedAt!}
      dateIso={article.publishedAtIso!}
      readTime="5 min read"
      authors={authors}
      publisher={insightPublisher.name}
      image="/images/insights/local-lens-ll09-south-yorkshire-hero.png"
      imageAlt="BloomShield Local Lens LL09 graphic showing South Yorkshire and Bassetlaw, with Dinnington highlighted near Sheffield, Rotherham, Doncaster, Barnsley and Worksop, alongside community members and bowel screening participation inequalities."
      heroClassName="aspect-[1672/941]"
      heroImageClassName="object-contain object-center"
      standfirst={article.description}
      domains={["People", "Partnerships", "Systems", "Equity", "Impact"]}
      tags={article.tags}
      linkedinDiscussionUrl={article.linkedinDiscussionUrl}
      linkedinDiscussionTitle="Join the discussion on LinkedIn"
      linkedinBeforeContact
      linkedinDiscussionCard
      linkedinDiscussionImage={socialImage}
      linkedinDiscussionImageClassName="object-contain"
      references={references}
      referencesHeading="Sources"
      previous={{ label: "LL08 · Kirklees", href: "/insights/local-lens/kirklees-mobile-cervical-screening" }}
    >
<p>Across South Yorkshire and Bassetlaw, recent evidence shows how far the gap can remain between offering preventive healthcare and enabling people to use it.</p>
<p>The challenge is not simply whether screening programmes exist. It is whether people can understand, trust and act on the opportunities available to them.</p>
<h2>What the evidence tells us</h2>
<p>In October 2025, the South Yorkshire and Bassetlaw Cancer Alliance reported marked inequalities in bowel cancer screening uptake.</p>
<p>Participation among adults aged <strong>50–59 was 57%</strong>, compared with <strong>72% among those aged 60–74</strong>.</p>
<p>The deprivation gap was wider still: uptake was <strong>54% in more deprived communities</strong>, compared with <strong>78% in less deprived communities</strong>.</p>
<p>That is a <strong>24-percentage-point gap</strong>.</p>
<p>These are regional figures, not Dinnington-specific estimates. But they illustrate why universal invitations do not automatically produce equitable participation.</p>
<p>Dinnington itself has a mixed socioeconomic profile. Rotherham Council data identify Dinnington Central and Dinnington East among England&apos;s most deprived 10% of neighbourhoods, while other parts of the ward are considerably less deprived.</p>
<p>That variation matters. Community interventions must respond to differences within places, not assume everyone in one postcode faces the same barriers.</p>
<h2>What the Cancer Alliance is already doing</h2>
<p>The South Yorkshire, Bassetlaw and North Derbyshire Cancer Alliance has developed several approaches to prevention, screening and earlier diagnosis.</p>
<p>Its <strong>Cancer Champion Programme</strong> supports primary-care teams seeking to improve screening participation and address inequalities, drawing on local data, communication resources and behavioural approaches.</p>
<p><strong>Be Cancer SAFE</strong> works with voluntary-sector and healthcare organisations, including Voluntary Action Rotherham, to bring cancer-awareness conversations into community settings.</p>
<p>The Alliance&apos;s <strong>Peace of Mind</strong> campaign encourages people experiencing possible cancer symptoms to contact their GP rather than delay seeking advice.</p>
<p>The region has also made substantial progress in lung cancer screening. By February 2026, around <strong>178,000 people had been invited</strong>, nearly <strong>79,000 had undergone a Lung Health Check</strong>, and <strong>666 lung cancers had been identified</strong>, with <strong>77% detected at an early stage</strong>.</p>
<p>That shows what organised screening can achieve when invitation is converted into participation.</p>
<h2>Where the last-mile challenge remains</h2>
<p>Non-participation rarely has one explanation.</p>
<p>Barriers may include embarrassment, uncertainty, language, competing responsibilities, practical difficulties or limited confidence in healthcare services.</p>
<p>A bowel screening kit may arrive and never be returned.</p>
<p>Someone may understand the purpose of cervical screening but struggle to attend.</p>
<p>A person experiencing unexplained symptoms may postpone contacting their GP.</p>
<p>Information campaigns matter, but some barriers require continuing conversations, practical navigation and trusted relationships.</p>
<p>This is the <strong>last mile between invitation and action</strong>.</p>
<figure><Image src="/images/insights/local-lens-ll09-south-yorkshire-square.png" alt="BloomShield Local Lens LL09 social graphic showing Dinnington and surrounding South Yorkshire locations with screening participation statistics and the message that invitation does not always lead to action." width={1254} height={1254} sizes="(min-width: 1024px) 760px, 100vw" className="h-auto w-full" /></figure>
<h2>The potential role of faith and community organisations</h2>
<p>Trusted local organisations can provide regular contact with families and opportunities for culturally sensitive health conversations.</p>
<p>Faith organisations are not substitutes for NHS services, and faith leaders should not provide clinical advice.</p>
<p>Their contribution is different: helping people understand reliable information, addressing misconceptions, encouraging appropriate action and directing people towards NHS services.</p>
<p>A trained Community Champion might help someone find NHS guidance on completing a bowel screening kit, explain where screening information is available, or encourage someone with concerning symptoms to seek medical advice.</p>
<p>Importantly, community activity should remain open beyond congregation members and accessible regardless of faith or background.</p>
<h2>From awareness to measurable action</h2>
<p>Community engagement should not be judged only by event attendance or leaflets distributed.</p>
<p>A stronger approach asks:</p>
<ul><li>How many screening-eligible people engaged?</li><li>What barriers were identified?</li><li>What navigation or signposting support was provided?</li><li>How many people reported taking appropriate action?</li></ul>
<p>These measures help distinguish communication activity from meaningful movement towards participation.</p>
<p>The Cancer Alliance&apos;s September 2026 update also highlighted future priorities around neighbourhood approaches and stronger community-based care.</p>
<p>That creates space for complementary, locally designed partnerships.</p>
<h2>The wider lesson</h2>
<p>South Yorkshire&apos;s experience illustrates a simple but important principle:</p>
<blockquote><p><strong>The effectiveness of screening depends not only on who is invited, but also on who is supported to respond.</strong></p></blockquote>
<p>Clinical programmes, local intelligence, community organisations and trusted relationships each bring different strengths.</p>
<p>Connecting them effectively may help turn screening availability into participation — and participation into earlier diagnosis.</p>
<p><strong>Local data. Local voices. Local action.</strong></p>
<p><em>BloomShield Local Lens provides independent, evidence-led analysis of cancer prevention, screening inequalities and opportunities for community-based health improvement. This article is not commissioned by or affiliated with the Cancer Alliance or Weston Park Cancer Charity.</em></p>
    </InsightArticle>
  </>;
}
