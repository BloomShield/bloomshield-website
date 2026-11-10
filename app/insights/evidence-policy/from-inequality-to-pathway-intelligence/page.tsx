import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "from-inequality-to-pathway-intelligence")!;
const authors = getInsightAuthors(article);
const path = "/insights/evidence-policy/from-inequality-to-pathway-intelligence";
const standfirst = "New evidence from more than 86,000 breast cancer diagnoses in England shows that inequalities can emerge at multiple points across the cancer pathway. The challenge is not only to know who was invited or screened — but to understand what happened next.";
const seoTitle = article.seoTitle ?? article.title;
const seoDescription = article.seoDescription ?? article.description;
const canonicalPath = article.canonicalUrl ?? path;
const socialImage = article.socialImage ?? article.image!;
const socialImageAlt = article.socialImageAlt ?? article.imageAlt!;
const keywords = article.keywords ?? article.tags ?? [];

export const metadata: Metadata = {
  ...createInsightMetadata({
    title: seoTitle,
    description: seoDescription,
    path: canonicalPath,
    socialImage,
    socialImageAlt,
    socialImageWidth: article.socialImageWidth ?? 1672,
    socialImageHeight: article.socialImageHeight ?? 941,
    socialImageType: article.socialImageType,
    socialTitle: article.socialTitle,
    socialDescription: article.socialDescription,
    type: "article",
    keywords,
    authors: authors.map(author => author.name),
    datePublished: article.datePublished ?? article.publishedAtIso,
    dateModified: article.dateModified ?? article.publishedAtIso,
  }),
  title: { absolute: seoTitle },
};

const references = [
  { label: "Inequalities in routes to diagnosis, time to diagnosis and time to treatment among adults diagnosed with breast cancer in England: a nationwide population-based study of diagnoses between 2009 and 2018", source: "Perchyk T, Lemanska A, Mounce LTA, et al. Breast Cancer Research, 2026", href: "https://link.springer.com/article/10.1186/s13058-026-02367-9" },
  { label: "Breast cancer care falls short for Black patients and people with a learning disability", source: "University of Surrey, 2026", href: "https://www.surrey.ac.uk/news/breast-cancer-care-falls-short-black-patients-and-people-learning-disability-warns-first-uk-study" },
  { label: "Research sheds light on inequalities in breast cancer diagnosis and treatment", source: "Breast Cancer Now, 2026", href: "https://breastcancernow.org/about-us/research-news/research-sheds-light-on-inequalities-in-breast-cancer-diagnosis-and-treatment" },
  { label: "Breast Screening Programme, England, 2024–25", source: "NHS England, 2026", href: "https://digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme/england-2024-2025/mainreport2425#section-4-uptake-of-invitations" },
  { label: "Black women’s decisions about participating in breast cancer screening in the UK: a qualitative study", source: "British Journal of Cancer, 2026", href: "https://www.nature.com/articles/s41416-026-03551-6" },
];

export default function PathwayIntelligenceInsightPage() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${SITE_URL}${canonicalPath}#article`, headline: article.title, alternativeHeadline: standfirst, description: seoDescription,
    image: { "@type": "ImageObject", url: `${SITE_URL}${socialImage}`, width: article.socialImageWidth, height: article.socialImageHeight, caption: socialImageAlt },
    datePublished: article.datePublished, dateModified: article.dateModified,
    author: authors.map(author => ({ "@type": "Person", name: author.name, description: author.biography, ...(author.credentials ? { jobTitle: author.credentials } : {}), affiliation: { "@type": "Organization", name: "BloomShield CIC", url: SITE_URL } })),
    publisher: { "@type": "Organization", name: insightPublisher.name, url: `${SITE_URL}/insights`, parentOrganization: { "@type": "Organization", name: ORGANIZATION_NAME, url: SITE_URL }, logo: { "@type": "ImageObject", url: `${SITE_URL}/bloomshield-square-lockup.png`, width: 545, height: 590 } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${canonicalPath}` }, articleSection: article.area, keywords: keywords.join(", "), about: keywords.map(name => ({ "@type": "Thing", name })), inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <InsightArticle
      category={article.area}
      crossTag="Implementation & Equity"
      title={article.title}
      articleSlug={article.slug}
      date={article.publishedAt!}
      dateIso={article.publishedAtIso!}
      authors={authors}
      publisher={insightPublisher.name}
      standfirst={standfirst}
      image={article.image!}
      imageAlt={article.imageAlt!}
      heroClassName="aspect-[1672/941]"
      heroImageClassName="object-contain"
      domains={["People", "Partnerships", "Systems", "Innovation", "Equity", "Impact"]}
      ccpeLens={article.ccpeLens}
      tags={article.tags}
      linkedinBeforeContact
      linkedinDiscussionCard
      linkedinDiscussionImage={socialImage}
      linkedinDiscussionImageClassName="object-contain"
      linkedinDiscussionUrl={article.linkedinDiscussionUrl}
      linkedinDiscussionTitle="Join the discussion on LinkedIn"
      linkedinDiscussionDescription="Continue the conversation on the evidence, pathway inequalities and what better pathway intelligence could enable."
      references={references}
      referencesHeading="Sources & further reading"
      contextualCta={<section className="insight-article-end-section" aria-labelledby="research-collaboration">
        <h2 id="research-collaboration" className="!text-xl">Interested in research or validation collaboration?</h2>
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/research/screenconnect">Explore ScreenConnect Digital™</Link>
          <Link href="/contact">Talk to BloomShield</Link>
        </p>
      </section>}
      implementationLesson={<p>Pathway data can help identify where inequalities emerge. Community insight and collaborative validation can help explain why and inform what to evaluate next.</p>}
      previous={{ label: "Australia to World: eliminating cervical cancer", href: "/insights/evidence-policy/australia-world-eliminating-cervical-cancer" }}
    >
      <section>
        <p>Cancer screening is often measured at the front of the pathway:</p>
        <p>Who was eligible?<br />
          Who was invited?<br />
          Who attended?</p>
        <p>Those questions matter.</p>
        <p>But they do not tell us everything.</p>
        <p>A nationwide study of <strong>86,564 adults diagnosed with breast cancer in England between 2009 and 2018</strong> examined routes to diagnosis, time to diagnosis and time to treatment using linked primary-care and cancer-registration data.</p>
        <p>Its findings raise a bigger implementation question:</p>
        <p className="insight-pull-statement"><strong>What happens between invitation, diagnosis and treatment — and does that journey look the same for everyone?</strong></p>
      </section>
      <section aria-labelledby="the-pathway-is-not-equal-for-everyone">
        <h2 id="the-pathway-is-not-equal-for-everyone">The pathway is not equal for everyone</h2>
        <p>Compared with White patients, Black patients had:</p>
        <ul>
          <li><strong>29% lower adjusted odds of screen-detected diagnosis</strong></li>
          <li><strong>37% higher odds of diagnosis following an emergency presentation</strong></li>
          <li>approximately <strong>five additional days, on average, before treatment began</strong>.</li>
        </ul>
        <p>These are relative adjusted odds, not percentage-point differences.</p>
        <p>But the direction is important: different groups were reaching the same cancer-care system through different routes.</p>
        <p>The inequalities were also broader than ethnicity alone.</p>
        <p>People from Asian, Black and Mixed ethnic groups, those experiencing greater deprivation, and people with severe mental illness were less likely to be diagnosed through screening. People with learning disabilities experienced longer diagnostic pathways, while treatment delays were also identified among several disadvantaged groups.</p>
        <p>The study therefore points to something more complex than a single screening-uptake problem.</p>
        <p><strong>Inequality can accumulate across the pathway.</strong></p>
        <figure className="my-8">
          <Image src="/images/insights/from-inequality-to-pathway-intelligence-statistics.png" alt="BloomShield graphic summarising breast cancer pathway inequalities in England, including lower odds of screen-detected diagnosis, higher odds of emergency presentation and longer time to treatment for Black women compared with White women." width={1122} height={1402} sizes="(min-width: 1024px) 720px, 100vw" className="h-auto w-full rounded-[1.5rem]" />
        </figure>
      </section>
      <section aria-labelledby="screening-uptake-is-only-part-of-the-story">
        <h2 id="screening-uptake-is-only-part-of-the-story">Screening uptake is only part of the story</h2>
        <p>Improving participation remains essential.</p>
        <p>In England, breast screening uptake in 2024/25 was 70.6% among women aged 50 to under 71 who received a first or routine invitation, and 63.6% among first-time invitees.</p>
        <p>But participation cannot be the end of our measurement.</p>
        <p>A person may:</p>
        <p><strong>receive an invitation → attend or miss screening → develop symptoms → enter primary care → be referred → undergo investigation → receive a diagnosis → begin treatment.</strong></p>
        <p>At each transition, something can happen:</p>
        <p>a barrier,<br />
          a delay,<br />
          a missed opportunity,<br />
          a communication problem,<br />
          a practical constraint,<br />
          or an intervention that changes the outcome.</p>
        <p>That is why we need to look beyond isolated screening events.</p>
        <figure className="my-8">
          <Image src="/images/insights/from-inequality-to-pathway-intelligence-pathway.png" alt="BloomShield graphic asking what happens between invitation and treatment, highlighting unequal routes to diagnosis and care." width={1254} height={1254} sizes="(min-width: 1024px) 720px, 100vw" className="h-auto w-full rounded-[1.5rem]" />
        </figure>
      </section>
      <section aria-labelledby="from-screening-data-to-pathway-intelligence">
        <h2 id="from-screening-data-to-pathway-intelligence">From screening data to pathway intelligence</h2>
        <p>Traditional programme metrics can tell us:</p>
        <p><strong>Who was invited?<br />
          Who attended?<br />
          Who did not?</strong></p>
        <p>A longitudinal view asks more:</p>
        <p><strong>What happened before attendance?<br />
          What happened after a missed appointment?<br />
          What barriers were identified?<br />
          Was support offered?<br />
          How did the person reach diagnosis?<br />
          How long did each transition take?<br />
          Did referral happen?<br />
          Did treatment begin?</strong></p>
        <p>That is the distinction between <strong>screening intelligence</strong> and <strong>pathway intelligence</strong>.</p>
        <p>The inequality may not sit at one obvious point.</p>
        <p>It may emerge through several small differences accumulating across the journey.</p>
        <p className="insight-pull-statement"><strong>The question is not only who was invited — but what happened next.</strong></p>
      </section>
      <section aria-labelledby="this-is-the-challenge-screenconnect-digital-is-designed-to-explore">
        <h2 id="this-is-the-challenge-screenconnect-digital-is-designed-to-explore">This is the challenge ScreenConnect Digital™ is designed to explore</h2>
        <p>BloomShield recently unveiled <strong>ScreenConnect Digital™</strong>, our person-centred longitudinal research demonstrator for examining the cancer-screening journey.</p>
        <p>It is not intended to replace NHS screening systems, clinical records or cancer registries.</p>
        <p>Nor is it a claim that technology alone can solve health inequalities.</p>
        <p>Instead, ScreenConnect is designed as a research environment for exploring the screening journey as a connected pathway:</p>
        <p><strong>Invitation → eligibility → barriers → support → attendance → result → referral → follow-up → outcome</strong>.</p>
        <p>The aim is to understand where participation changes, where delays arise, what support may have been offered and how journeys differ between communities.</p>
      </section>
      <section aria-labelledby="technology-is-not-the-intervention">
        <h2 id="technology-is-not-the-intervention">Technology is not the intervention</h2>
        <p>A dashboard does not improve screening uptake.</p>
        <p>A database does not remove mistrust.</p>
        <p>Technology does not replace culturally appropriate communication, accessible services, trusted community organisations or properly resourced clinical pathways.</p>
        <p>But better information can help systems ask better questions.</p>
        <p>If one community has lower attendance, <strong>what happened before the appointment?</strong></p>
        <p>If attendance is similar but diagnosis differs, <strong>where did the pathway diverge?</strong></p>
        <p>If referral occurred but treatment began later, <strong>what happened in between?</strong></p>
        <p>If a community intervention was introduced, <strong>did it improve only attendance — or the pathway that followed?</strong></p>
        <p>These are implementation questions.</p>
        <p>And they require more than counting invitations.</p>
      </section>
      <section aria-labelledby="from-inequality-to-action">
        <h2 id="from-inequality-to-action">From inequality to action</h2>
        <p>Pathway data can show <strong>where</strong> differences occur.</p>
        <p>Community insight helps explain <strong>why</strong>.</p>
        <p>That distinction matters because inequality is rarely produced by one factor alone. Ethnicity, deprivation, disability, mental health, geography, service design, trust, communication and social circumstances can intersect in complicated ways.</p>
        <p>So the pathway from evidence to action should look something like:</p>
        <p><strong>Evidence → inequality signal → pathway intelligence → understanding barriers → targeted action → evaluation</strong></p>
        <p>Not every inequality will require a digital solution.</p>
        <p>Some may require:</p>
        <ul>
          <li>better communication</li>
          <li>community-based delivery</li>
          <li>service redesign</li>
          <li>transport or navigation support</li>
          <li>practical assistance</li>
          <li>policy change.</li>
        </ul>
        <p>The role of pathway intelligence is not to prescribe the answer before the problem is understood.</p>
        <p>It is to make the problem harder to miss.</p>
      </section>
      <section aria-labelledby="the-next-phase-for-screenconnect-digital">
        <h2 id="the-next-phase-for-screenconnect-digital">The next phase for ScreenConnect Digital™</h2>
        <p>ScreenConnect Digital™ remains a <strong>research demonstrator</strong>.</p>
        <p>The next phase is validation with researchers, NHS and public-health colleagues, Cancer Alliances, commissioners, VCSE organisations, community partners and others working on screening participation and earlier diagnosis.</p>
        <p>The central question is:</p>
        <p className="insight-pull-statement"><strong>Can a more connected understanding of the screening journey help us see inequalities that conventional programme metrics may overlook?</strong></p>
        <p>The breast-cancer evidence suggests why that matters.</p>
        <p>A pathway can appear accessible at one point and unequal at another.</p>
        <p>And if we measure only the beginning, we may never see where the difference emerged.</p>
      </section>
      <section aria-labelledby="better-pathways-begin-with-better-understanding">
        <h2 id="better-pathways-begin-with-better-understanding">Better pathways begin with better understanding</h2>
        <p>Cancer inequalities can accumulate across invitations, access, referrals, waiting periods and organisational boundaries.</p>
        <p>The evidence helps us see some of those differences.</p>
        <p>The next challenge is to understand the pathway well enough to act on them.</p>
        <p><strong>Because equitable cancer screening is not simply about ensuring everyone receives an invitation.</strong></p>
        <p><strong>It is about creating a fair opportunity for everyone to benefit from what comes next.</strong></p>
        <h3>About ScreenConnect Digital™</h3>
        <p><strong>ScreenConnect Digital™</strong> is a BloomShield CIC person-centred longitudinal research demonstrator designed to explore the cancer-screening journey from invitation and eligibility through barriers, attendance, results, referral, follow-up and outcomes.</p>
        <p>It is currently positioned for <strong>research, discovery and collaborative validation</strong>.</p>
        <p><strong>Interested in research or validation collaboration?</strong><br />
          Visit <strong>BloomShield.org</strong> or contact BloomShield CIC.</p>
      </section>
    </InsightArticle>
  </>;
}
