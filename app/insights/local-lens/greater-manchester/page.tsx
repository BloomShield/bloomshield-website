import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "greater-manchester")!;
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

const socialPreviewImage = {
  url: "/images/insights/local-lens-greater-manchester-card-v2.png",
  width: article.socialImageWidth!,
  height: article.socialImageHeight!,
  alt: socialImageAlt,
  type: "image/png",
};

export const metadata: Metadata = {
  ...articleMetadata,
  openGraph: {
    ...articleMetadata.openGraph,
    images: [socialPreviewImage],
  },
  twitter: {
    ...articleMetadata.twitter,
    card: "summary_large_image",
    images: [socialPreviewImage],
  },
};

const references = [
{"label":"Greater Manchester Cancer Board: Cancer Alliance funding, January 2023","href":"https://gmcancer.org.uk/wp-content/uploads/2023/07/GM-Cancer-Board-Pack-January-2023.pdf#page=70","source":"Greater Manchester Cancer Board · Cancer Alliance Allocation 2023–24/2024–25, pp. 70–72: £13,607,311 for 2023/24 and £13,582,543 for 2024/25 in place-based service development funding, alongside separately funded targeted programmes."},
  {
    "label": "Joint Forward Plan",
    "href": "https://gmintegratedcare.org.uk/greatermanchester-icp/icp-strategy/joint-forward-plan/",
    "source": "NHS Greater Manchester · Wider cancer-system priorities and earlier diagnosis."
  },
  {
    "label": "Early Cancer Diagnosis Strategy 2024–28",
    "href": "https://gmcancer.org.uk/wp-content/uploads/2025/05/2334-Early-diagnosis-strategy-5a-Digital.pdf",
    "source": "Greater Manchester Cancer Alliance · Early diagnosis, inequalities and system improvement."
  },
  {
    "label": "Brinnington breast screening partnership case study",
    "href": "https://gmcancer.org.uk/greater-manchester-cancer-awards-26/",
    "source": "Greater Manchester Cancer Alliance / Stockport Council · Reported uptake increased from 58% in 2019 to 70% in 2025; 10 cancers diagnosed in that screening round."
  },
  {
    "label": "Learning-disability bowel screening programme",
    "href": "https://gmintegratedcare.org.uk/wp-content/uploads/2024/10/2025-03-05-nhs-gm-quality-and-performance-committee.pdf",
    "source": "NHS Greater Manchester · National 2022/23 baseline and tailored FIT-kit support through the flagging programme."
  },
  {
    "label": "Accessible cervical screening films",
    "href": "https://www.penninecare.nhs.uk/cancer-screening-films-launch",
    "source": "Pennine Care NHS Foundation Trust · Co-produced films with autistic women and women with learning disabilities."
  },
  {
    "label": "Lung screening programme outcomes",
    "href": "https://gmcancer.org.uk/greater-manchester-cancer-alliance-has-the-highest-proportion-of-early-stage-lung-cancer-in-the-country/",
    "source": "Greater Manchester Cancer Alliance · Invitations, completed checks and cancers detected; 81% early-stage diagnosis within the screening programme."
  },
  {
    "label": "Early cancer diagnosis in Greater Manchester",
    "href": "https://gmcancer.org.uk/early-cancer-diagnosis-in-greater-manchester/",
    "source": "Greater Manchester Cancer Alliance · 60.2% early diagnosis across February 2024–January 2025, within a wider programme of system improvement."
  },
  {
    "label": "Cancer screening population-health intelligence",
    "href": "https://gmintegratedcare.org.uk/wp-content/uploads/2024/12/pccc-19dec24-combined-papers.pdf",
    "source": "NHS Greater Manchester · Coverage and population variation across screening programmes."
  }
];

const relatedContent = <section aria-labelledby="related-insights"><p className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">Continue exploring</p><h2 id="related-insights" className="mt-4">Related Insights</h2><div className="mt-6 divide-y divide-teal-900/10 border-y border-teal-900/10">{[
{label:"BloomShield Local Lens",href:"/insights/local-lens"},
{label:"Edition 04 · West London",href:"/insights/local-lens/west-london"},
{label:"Edition 03 · Devon, Cornwall & the Isles of Scilly",href:"/insights/local-lens/devon-cornwall-isles-of-scilly"},
{label:"Edition 02 · Liverpool",href:"/insights/local-lens/liverpool"},
{label:"Edition 01 · Medway & Kent",href:"/insights/local-lens/medway-kent"}
].map(item => <Link key={item.href} href={item.href} data-insights-event="insights_related_content_click" className="group flex items-center justify-between gap-5 py-5 text-ink"><span className="font-display text-xl font-semibold group-hover:text-teal-700">{item.label}</span><span aria-hidden="true" className="text-[#85601e]">→</span></Link>)}</div></section>;

export default function GreaterManchesterLocalLensPage() {
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
    contentLocation: { "@type": "Place", name: "Greater Manchester" },
    inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <InsightArticle
      category={article.area}
      crossTag="LL-005 · Edition 05"
      title={article.title}
      subtitle={article.shortTitle}
      articleSlug={article.slug}
      date={article.publishedAt!}
      dateIso={article.publishedAtIso!}
      readTime="7 min read"
      authors={authors}
      publisher={insightPublisher.name}
      standfirst={article.description}
      image={article.image!}
      imageAlt={article.imageAlt!}
      heroClassName="aspect-[1672/941]"
      heroImageClassName="object-contain object-center"
      domains={["People", "Partnerships", "Systems", "Equity", "Impact"]}
      ccpeLens={article.ccpeLens}
      tags={article.tags}
      reflectionQuestion={article.reflectionQuestion}
      linkedinDiscussionUrl={article.linkedinDiscussionUrl}
      linkedinDiscussionTitle="Join the discussion on LinkedIn"
      linkedinDiscussionDescription="Continue the Local Lens conversation on screening access and participation in Greater Manchester."
      linkedinDiscussionLinkLabel="Join the discussion on LinkedIn →"
      linkedinDiscussionCard
      linkedinBeforeContact
      engagementContactLabel={article.engagementContactLabel}
      interactionsAfterManuscript
      references={references}
      relatedContent={relatedContent}
      implementationLesson={<p>Different barriers require different responses. It is the pathway adapting to the person.</p>}
      previous={{ label: "LL-004 · Local Lens: West London", href: "/insights/local-lens/west-london" }}
    >
<section><h2>DID YOU KNOW?</h2>
<p>Greater Manchester’s work on cancer inequalities sits within substantial NHS investment in earlier diagnosis and system improvement.</p>
<p>Through NHS England’s Cancer Alliance programme, Greater Manchester received around £13.6 million in 2023/24 and a further £13.6 million in 2024/25 — alongside separately funded national programmes including targeted lung screening.</p>
<p>That investment has supported a wider programme spanning screening, earlier diagnosis, pathway redesign, primary care, community engagement, data and innovation.</p>
<p>And there are signs of movement.</p>
<p>Greater Manchester reported that cancers diagnosed at stage 1 or 2 increased from 53.2% in August 2021 to 58.3% by July 2024, later reaching 60.2% across February 2024 to January 2025.</p>
<p>But the most interesting story may sit underneath the system-wide numbers.</p>
<p>In Brinnington, one of Stockport’s most deprived communities, breast screening uptake increased from 58% in 2019 to 70% in 2025.</p>
<p>The intervention brought together breast screening services, GP practices, Public Health and community organisations, using public-health intelligence, culturally sensitive support, multilingual conversations, drop-ins and local champions.</p>
<p>Ten breast cancers were diagnosed during that screening round.</p>
<p>That raises an important question:</p>
<p>What happens when the screening pathway adapts to the person — rather than expecting the person to adapt to the pathway?</p>
</section>
<section><h2>The inequalities are real</h2>
<p>Greater Manchester’s own data shows why adaptation matters.</p>
<p>For bowel cancer screening, national figures cited by NHS Greater Manchester show that in 2022/23, 50% of people with a learning disability completed colorectal cancer screening, compared with 66% of the general population.</p>
<p>For cervical screening, the gap is even wider.</p>
<p>A Greater Manchester project reported screening uptake of 30% among people with a learning disability, compared with 70% among people without one.</p>
<p>Local population-health intelligence has also shown substantial variation by ethnicity, with lower breast screening coverage among some minority ethnic groups in parts of Greater Manchester.</p>
<p>These are not small differences.</p>
<p>And they are unlikely to be explained by one barrier.</p>
</section>
<section><h2>Sometimes the pathway itself needs to change</h2>
<p>Greater Manchester’s response to bowel screening among people with learning disabilities is instructive.</p>
<p>Rather than simply sending another reminder, the system introduced a learning-disability flagging programme.</p>
<p>People who had not previously returned a FIT kit were identified.</p>
<p>Pre-notification lists were shared with cancer screening improvement leads.</p>
<p>Community learning-disability teams became involved.</p>
<p>Tailored education and practical support were offered.</p>
<p>The purpose was straightforward: identify people who had not previously participated and support them to complete screening successfully.</p>
<p>That is a very different model from passive invitation.</p>
<p>It is:</p>
<p>Identify → understand need → support → follow up → complete.</p>
<p>And the logic extends beyond the first screening test.</p>
<p>Greater Manchester has also identified difficulties further along the bowel pathway, particularly when someone receives an abnormal result and needs a colonoscopy.</p>
<p>In response, local teams developed accessible journey films showing what happens next and the reasonable adjustments that can be made.</p>
<p>The important point is that the gap can occur anywhere.</p>
<p>Not just before attendance.</p>
<p>But between:</p>
<p>screening → abnormal result → investigation → completion.</p>
</section>
<section><h2>Accessible information can be an intervention</h2>
<p>The cervical screening work makes the same point in another way.</p>
<p>Autistic women and women with learning disabilities helped co-produce accessible films explaining cervical screening, HPV vaccination, preparation, what happens during the test and what happens afterwards.</p>
<p>The intervention was not designed only around what professionals thought people needed.</p>
<p>It was designed with people who had lived experience of the barriers themselves.</p>
<p>That matters.</p>
<p>Because sometimes the problem is not unwillingness.</p>
<p>It is anxiety.</p>
<p>Uncertainty.</p>
<p>Communication.</p>
<p>Previous experience.</p>
<p>Or a pathway that assumes everyone receives and processes information in the same way.</p>
</section>
<section><h2>Targeted screening can also change when cancer is found</h2>
<p>Greater Manchester’s lung cancer programme shows what targeted approaches can achieve at scale.</p>
<p>More than 333,000 people have been invited for a lung health check.</p>
<p>Around 202,000 checks have been completed.</p>
<p>More than 1,750 lung cancers have been detected through the programme.</p>
<p>And 81% were diagnosed at an early stage.</p>
<p>Across Greater Manchester more broadly, the proportion of cancers diagnosed at an early stage has also improved in recent years.</p>
<p>No single intervention explains that improvement.</p>
<p>But the direction is important.</p>
<p>Targeting.</p>
<p>Community engagement.</p>
<p>Primary-care education.</p>
<p>Accessible information.</p>
<p>Pathway redesign.</p>
<p>Screening closer to people.</p>
<p>These things can change outcomes.</p>
</section>
<figure className="my-10"><a href="/images/insights/local-lens-greater-manchester-infographic.png" target="_blank" rel="noopener noreferrer" className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-800"><Image src="/images/insights/local-lens-greater-manchester-infographic.png" alt="Greater Manchester screening infographic: Brinnington breast screening rose from 58% to 70%; bowel screening baseline was 50% for people with learning disabilities versus 66% generally; cervical screening 30% versus 70%; lung screening found 81% of cancers at an early stage." width={1448} height={1086} loading="eager" sizes="(min-width: 1240px) 850px, 100vw" className="h-auto w-full rounded-xl" /></a><figcaption className="mt-3 text-sm leading-6 text-slate-600">Selected Greater Manchester examples showing how targeted screening and pathway adaptation can change participation and early diagnosis. <a href="/images/insights/local-lens-greater-manchester-infographic.png" target="_blank" rel="noopener noreferrer" className="font-bold text-teal-700 underline">Open full-size infographic</a>.</figcaption></figure>
<section><h2>The lesson may be simpler than it looks</h2>
<p>Greater Manchester is not telling us that one intervention will solve screening inequality.</p>
<p>It is telling us something more useful.</p>
<p>Different barriers require different responses.</p>
<p>A woman in Brinnington may need trusted community engagement.</p>
<p>A person with a learning disability may need accessible information and practical support.</p>
<p>A high-risk smoker may benefit from targeted outreach and a lung health check.</p>
<p>Someone with an abnormal bowel screening result may need reassurance and reasonable adjustments before colonoscopy.</p>
<p>The common thread is not the disease.</p>
<p>It is the pathway adapting to the person.</p>
</section>
<section><h2>From targeted projects to routine practice</h2>
<p>Greater Manchester is showing that screening inequalities can shift when the system does more than invite.</p>
<p>The strongest examples have several things in common:</p>
<p>someone is identified,</p>
<p>a barrier is recognised,</p>
<p>support is adapted,</p>
<p>follow-up happens,</p>
<p>and the outcome is measured.</p>
<p>That is more than outreach.</p>
<p>It is a different way of thinking about the screening journey.</p>
<p>Instead of asking only:</p>
<p>Did this person attend?</p>
<p>we begin to ask:</p>
<p>What got in the way?</p>
<p>What support was offered?</p>
<p>What happened next?</p>
<p>And did the person ultimately complete the pathway?</p>
<p>That is where the implementation challenge becomes much more interesting.</p>
<p>Because if personalised support works, the next question is not simply whether individual projects should continue.</p>
<p>It is:</p>
<p>How do we make barrier-aware, person-centred support part of the pathway itself?</p>
<p>For BloomShield, that is the question we are increasingly focused on.</p>
<p>Our work is moving beyond identifying where screening gaps exist towards understanding how people move through those gaps over time — and what kinds of intervention help them move forward.</p>
<p>Greater Manchester gives us a practical glimpse of what that can look like.</p>
<p>Identify → understand → adapt → support → follow up → complete.</p>
<p>The opportunity now is to make that logic easier to apply, easier to evaluate and easier to scale.</p>
<p>That is where implementation science has to move next.</p>
<p>Local data. Local voices. Local action.</p>
</section>
    </InsightArticle>
  </>;
}
