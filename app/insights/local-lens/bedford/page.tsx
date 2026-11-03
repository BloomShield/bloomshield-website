import type { Metadata } from "next";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "bedford")!;
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

export const metadata: Metadata = { ...articleMetadata, title: { absolute: article.seoTitle! } };

export default function BedfordLocalLensPage() {
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
    contentLocation: { "@type": "Place", name: "Bedford, England" },
    inLanguage: "en-GB",
  };

return <>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g,"\\u003c")}} />
<InsightArticle category={article.area} crossTag="Local Lens 007 — Bedford, England" title={article.title} subtitle={article.shortTitle} articleSlug={article.slug} date={article.publishedAt!} dateIso={article.publishedAtIso!} readTime="7 min read" authors={authors} publisher="BloomShield CIC" standfirst={article.description} image="/images/insights/local-lens-bedford-hero.png" imageAlt={socialImageAlt} heroClassName="aspect-[1672/941]" heroImageClassName="object-contain object-center" domains={["People", "Partnerships", "Systems", "Equity", "Impact"]} ccpeLens={article.ccpeLens} tags={article.tags} engagementContactLabel={article.engagementContactLabel} interactionsAfterManuscript implementationLesson={<p>Understand → Validate → Implement → Evaluate → Scale.</p>} previous={{label:"LL-006 · Local Lens: Havering, East London",href:"/insights/local-lens/havering-east-london"}} relatedContent={<section className="insight-article-end-section"><h2>Related articles</h2><ul><li><Link href="/insights/local-lens/greater-manchester">Local Lens: Greater Manchester</Link></li><li><Link href="/insights/local-lens/west-london">Local Lens: West London</Link></li><li><Link href="/insights/local-lens">Explore all Local Lens editions</Link></li></ul></section>}>
<p><a href="/images/insights/local-lens-bedford-hero.png" target="_blank" rel="noopener noreferrer">View approved Bedford artwork at full size</a></p>
<h2>An invitation is not the same as participation</h2>
<p>What if the problem is not simply that people are failing to respond to cervical screening invitations — but that the service itself needs to become easier to access?</p>
<p>That question takes us to <strong>Cauldwell Medical Centre in Bedford</strong>, where a quality-improvement initiative examined how changes to communication, appointment flexibility and patient engagement might improve cervical screening participation.</p>
<p>In June 2022, recorded screening uptake stood at <strong>54% among eligible women aged 25–49</strong>, compared with <strong>62% among women aged 50–64</strong>.</p>
<p>A screening service was available. But participation was uneven.</p>
<p>The practice set out to understand and address the barriers behind that gap.</p>
<h2>What did Cauldwell change?</h2>
<p>Between June 2022 and March 2023, the practice implemented eight Plan–Do–Study–Act quality-improvement cycles.</p>
<p>The changes included:</p>
<ul><li><strong>More flexible access:</strong> evening appointments and self-booking options.</li><li><strong>More relevant communication:</strong> culturally sensitive, easy-read information and personalised GP invitations.</li><li><strong>Community engagement:</strong> working with community connectors to support participation among underserved groups.</li><li><strong>Continuous learning:</strong> monitoring uptake, testing approaches and adapting the intervention programme.</li></ul>
<p>Rather than relying on reminders alone, the team sought to make screening more accessible and responsive to its patients.</p>
<h2>What happened?</h2>
<p>By March 2023, the practice reported:</p>
<div className="my-8 overflow-x-auto"><table><caption className="sr-only">Reported practice-level cervical screening uptake</caption><thead><tr><th scope="col">Eligible women</th><th scope="col">June 2022</th><th scope="col">March 2023</th><th scope="col">Change</th></tr></thead><tbody><tr><th scope="row">Ages 25–49</th><td>54%</td><td>69%</td><td>+15 percentage points</td></tr><tr><th scope="row">Ages 50–64</th><td>62%</td><td>72%</td><td>+10 percentage points</td></tr></tbody></table></div>
<p>The difference between the two age groups narrowed from eight percentage points to three.</p>
<p>These findings were published by Santos and colleagues in <em>BMJ Open Quality</em> on <strong>11 August 2025</strong>.</p>
<p>The results are encouraging, particularly for younger eligible women, whose recorded uptake was initially lower.</p>
<p>But there is an important distinction.</p>
<p><strong>The study documented improvement during the intervention period. It did not establish which individual changes caused that improvement.</strong></p>
<p>This was one GP practice, not a controlled trial. The findings cannot automatically be generalised to Bedford as a whole, nor do they establish improved cancer outcomes.</p>
<h2>What can we learn?</h2>
<p>Cauldwell&apos;s experience illustrates a practical principle:</p>
<p><strong>Screening availability does not guarantee screening accessibility.</strong></p>
<p>An invitation may reach someone who cannot easily attend during working hours, does not understand the information provided, or needs reassurance from a familiar clinician.</p>
<p>Changing those conditions may be as important as increasing the number of invitations.</p>
<p>The Bedford study suggests that local services can identify barriers, introduce practical changes and monitor whether participation improves.</p>
<p>The next challenge is determining which approaches work best, for whom, and whether improvements can be sustained.</p>
<h2>Where BloomShield comes in</h2>
<p>At BloomShield, this is the gap between identifying an inequality and understanding how to address it.</p>
<p>Our approach follows a connected sequence:</p>
<p><strong>Understand → Validate → Implement → Evaluate → Scale.</strong></p>
<p>The Bedford experience demonstrates why implementation and evaluation must go together.</p>
<p>It also connects with the research questions behind <strong>ScreenConnect Digital™</strong>, BloomShield&apos;s working synthetic-data research demonstrator.</p>
<p>ScreenConnect Digital™ is designed to support exploration of the screening journey:</p>
<p><strong>Invitation → Barrier → Intervention → Attendance → Result → Follow-up → Outcome.</strong></p>
<p>Could better pathway intelligence help researchers and services identify where people disengage, understand the support offered, and investigate what happens afterwards?</p>
<p>That is the opportunity we want to explore through research collaboration — not a claim that our demonstrator has already produced or validated the Bedford results.</p>
<h2>The question Bedford leaves us with</h2>
<p>Cauldwell Medical Centre reported improved cervical screening uptake after introducing a coordinated programme of service changes.</p>
<p>The study does not tell us precisely which intervention made the difference.</p>
<p>But it leaves us with a useful question:</p>
<p><strong>If screening participation can improve when services become more responsive, how do we identify which changes work, for whom, and under what conditions?</strong></p>
<p>That is a question worth taking beyond Bedford.</p>
<p><em>Local data. Local voices. Local action.</em></p>
<h2>Continue the conversation</h2>
<p><strong>Explore ScreenConnect Digital™</strong></p>
<p>Learn how BloomShield is developing research infrastructure to investigate screening access, pathway continuity and implementation outcomes.</p>
<p><a href="/research/screenconnect">https://bloomshield.org/research/screenconnect</a></p>
<p><strong>Read the ScreenConnect Digital™ unveiling</strong></p>
<p><a href="/insights/innovation-in-practice/screenconnect-digital-research-demonstrator">https://bloomshield.org/insights/innovation-in-practice/screenconnect-digital-research-demonstrator</a></p>
<p><strong>Research and implementation collaboration</strong></p>
<p>BloomShield welcomes conversations with primary care teams, researchers, Cancer Alliances and community organisations interested in understanding what improves screening access.</p>
<h2>Primary reference</h2>
<p>Santos C, Roye J, Tucker J, Guevara C. (2025). <em>Enhancing equity and efficiency in cervical screening uptake: a multidisciplinary quality improvement initiative.</em> <strong>BMJ Open Quality</strong>, 14(3), e003111.</p>
<p>Published: 11 August 2025.</p>
<p>Study period: June 2022 – March 2023.</p>
<p><a href="https://doi.org/10.1136/bmjoq-2024-003111">https://doi.org/10.1136/bmjoq-2024-003111</a></p>
<p><em>Evidence note: Figures refer to reported practice-level uptake at Cauldwell Medical Centre, not Bedford-wide screening coverage. The before-and-after comparison does not establish the causal effect of individual interventions.</em></p>
</InsightArticle></>;
}
