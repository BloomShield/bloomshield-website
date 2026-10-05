import type { Metadata } from "next";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "devon-cornwall-isles-of-scilly")!;
const authors = getInsightAuthors(article);
const canonicalPath = article.canonicalUrl!;
const socialImage = article.socialImage!;
const socialImageAlt = article.socialImageAlt!;
const keywords = article.keywords ?? article.tags ?? [];

export const metadata: Metadata = createInsightMetadata({
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

const references = [
  {
    "label": "South West breast-screening performance, 2024/25",
    "href": "https://www.england.nhs.uk/south/2026/02/19/over-half-a-million-women-in-the-south-west-are-up-to-date-with-their-breast-screening/",
    "source": "NHS England South West · Regional coverage, attendance and cancers detected; these are South West figures, not Devon- or Cornwall-specific rates."
  },
  {
    "label": "South West first-invitation participation",
    "href": "https://www.england.nhs.uk/south/2025/02/19/south-west-patients-and-nhs-staff-urge-women-to-come-forward-for-their-breast-screening-appointment/",
    "source": "NHS England South West · 19 February 2025; regional first-invite participation."
  },
  {
    "label": "Living and working well: cancer screening and inequalities",
    "href": "https://www.devon.gov.uk/public-health/jhws/joint-strategic-needs-assessment/living-and-working-well/",
    "source": "Public Health Devon · Joint Strategic Needs Assessment; Devon-specific screening evidence and access barriers."
  },
  {
    "label": "Cancer Screening Partnership Fund and earlier community outreach",
    "href": "https://peninsulacanceralliance.nhs.uk/early-diagnosis-with-the-voluntary-and-community-sector/",
    "source": "Peninsula Cancer Alliance · Peninsula-wide VCSE intervention aims and partnership approach. Editorial clarification: the live page still displays ‘Applications are Open’, but lists the closing date as Friday 25 September. Publication is after that date, so the manuscript retains ‘The application round has now closed.’"
  },
  {
    "label": "Cornwall and Isles of Scilly health inequalities and Core20PLUS5",
    "href": "https://docs.cios.icb.nhs.uk/DocumentsLibrary/NHSCornwallAndIslesOfScilly/Organisation/StrategicReportsAndPlans/ICB/NHSCornwallAndIslesOfScillyICBAnnualReport2024To2025.pdf",
    "source": "NHS Cornwall and Isles of Scilly ICB · Annual report 2024–2025; supporting inequalities strategy context."
  }
];

const relatedContent = <section aria-labelledby="related-insights">
  <p className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">Continue exploring</p>
  <h2 id="related-insights" className="mt-4">Related Insights</h2>
  <div className="mt-6 divide-y divide-teal-900/10 border-y border-teal-900/10">
    <Link href="/insights/local-lens/medway-kent" data-insights-event="insights_related_content_click" className="group flex items-center justify-between gap-5 py-5 text-ink">
      <span><span className="block text-xs font-bold uppercase tracking-[.14em] text-teal-700">Local Lens · Edition 01</span><span className="mt-2 block font-display text-xl font-semibold group-hover:text-teal-700">Cancer screening in Medway: what the local data tells us</span></span><span aria-hidden="true" className="text-[#85601e]">→</span>
    </Link>
    <Link href="/insights/evidence-policy/hpv-self-testing-screening-gap" data-insights-event="insights_related_content_click" className="group flex items-center justify-between gap-5 py-5 text-ink">
      <span><span className="block text-xs font-bold uppercase tracking-[.14em] text-teal-700">Evidence &amp; Policy</span><span className="mt-2 block font-display text-xl font-semibold group-hover:text-teal-700">HPV self-testing and the screening gap</span></span><span aria-hidden="true" className="text-[#85601e]">→</span>
    </Link>
    <Link href="/insights/conversations" data-insights-event="insights_related_content_click" className="group flex items-center justify-between gap-5 py-5 text-ink">
      <span><span className="block text-xs font-bold uppercase tracking-[.14em] text-teal-700">Conversations</span><span className="mt-2 block font-display text-xl font-semibold group-hover:text-teal-700">Conversations Across the Cancer Care Ecosystem</span></span><span aria-hidden="true" className="text-[#85601e]">→</span>
    </Link>
  </div>
</section>;

export default function DevonCornwallScillyLocalLensPage() {
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
    contentLocation: { "@type": "Place", name: "Devon, Cornwall and the Isles of Scilly" },
    inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <InsightArticle
      category={article.area}
      crossTag="LL-003 · Edition 03"
      title={article.title}
      subtitle={article.shortTitle}
      articleSlug={article.slug}
      date={article.publishedAt!}
      dateIso={article.publishedAtIso!}
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
      linkedinDiscussionTitle="Continue the Local Lens conversation"
      linkedinDiscussionDescription="Join the discussion about screening access, local action and what the Peninsula can teach us."
      linkedinDiscussionLinkLabel="Join the discussion on LinkedIn →"
      linkedinBeforeContact
      engagementContactLabel={article.engagementContactLabel}
      interactionsAfterManuscript
      references={references}
      relatedContent={relatedContent}
      implementationLesson={<p>For some populations, trust is also infrastructure.</p>}
      previous={{ label: "Local Lens: Liverpool", href: "/insights/local-lens/liverpool" }}
    >
      <section aria-label="Screening access and community investment in the Peninsula">
        <p>Local data. Local voices. Local action.</p>
        <p>Devon, Cornwall and the Isles of Scilly present an interesting screening paradox.</p>
        <p>Overall performance can look relatively strong.</p>
        <p>Devon reports cancer-screening uptake above the national average for breast, bowel and cervical screening.</p>
        <p>But averages do not tell the whole story.</p>
        <p>Local public-health evidence also identifies persistent inequalities affecting people living in more deprived areas, rural and remote communities, people with learning disabilities and some ethnic minority groups. Transport, digital exclusion, low health literacy and stigma can all reduce participation.</p>
        <p>So the question is not simply:</p>
        <p>Does the Peninsula have screening services?</p>
        <p>It does.</p>
        <p>The more useful question is:</p>
        <p>Who is still being missed — and what happens when the system funds trusted local organisations to reach them?</p>
      </section>
      <section>
        <h2>A strong overall picture can still hide inequality</h2>
        <p>The South West performs comparatively well on breast screening.</p>
        <p>In 2024/25, 73.8% of eligible women in the South West were up to date with breast screening, up 1.2 percentage points on the previous year. More than 531,000 women aged 50 to 70 attended screening within six months of invitation, and almost 2,200 cancers were detected.</p>
        <p>Those are important achievements.</p>
        <p>But more than a quarter of eligible women were still not up to date.</p>
        <p>And first-invite participation has been weaker. In the previous reporting year, only 61% of women in the South West took up breast screening when first invited.</p>
        <p>That distinction matters.</p>
        <p>A region can perform well overall while particular groups, neighbourhoods and communities continue to participate less.</p>
        <p>In Devon, local public-health analysis explicitly identifies lower participation among people living with deprivation, disability, rural isolation and other barriers.</p>
        <p>This is exactly the kind of inequality that headline averages can conceal.</p>
      </section>
      <section>
        <h2>Geography is part of the pathway</h2>
        <p>In the Peninsula, distance matters.</p>
        <p>Rurality can mean longer journeys, fewer transport options and greater practical cost for people trying to attend appointments.</p>
        <p>Digital exclusion can also make access harder where booking, reminders or information increasingly rely on online systems.</p>
        <p>And where health literacy, stigma or mistrust are involved, simply sending another invitation may not be enough.</p>
        <p>The barrier is not always a lack of services.</p>
        <p>Sometimes it is the distance — physical, practical or social — between the service and the person expected to use it.</p>
      </section>
      <section>
        <h2>So what is the system doing differently?</h2>
        <p>One of the most interesting responses has come from the Peninsula Cancer Alliance.</p>
        <p>Its recent Cancer Screening Partnership Fund invited voluntary, community and social enterprise organisations across Devon, Cornwall and the Isles of Scilly to develop targeted community-led approaches to improve participation in breast, cervical and bowel screening.</p>
        <p>The application round has now closed.</p>
        <p>But the call itself is revealing.</p>
        <p>The Alliance was not simply asking community organisations to distribute information.</p>
        <p>It explicitly sought projects that could:</p>
        <ul>
          <li>improve screening knowledge and participation;</li>
          <li>reach underserved communities;</li>
          <li>reduce barriers to screening;</li>
          <li>use locally appropriate approaches;</li>
          <li>and strengthen collaboration across the VCSE sector.</li>
        </ul>
        <p>The fund also built on earlier rounds of community outreach work across the Peninsula, with previous funded projects focused on cancer prevention, screening attendance and engaging communities that traditional services may not reach as effectively.</p>
        <p>That is a significant shift in emphasis.</p>
        <p>Instead of asking only:</p>
        <p>How do we persuade more people to attend?</p>
        <p>the system is also asking:</p>
        <p>Who already has the trust, relationships and reach needed to help?</p>
      </section>
      <section>
        <h2>Trust as infrastructure</h2>
        <p>That may be the most interesting lesson from the Peninsula.</p>
        <p>Health systems traditionally fund clinical infrastructure:</p>
        <p>buildings, equipment, staff, diagnostics and pathways.</p>
        <p>But for some populations, trust is also infrastructure.</p>
        <p>A community organisation may understand:</p>
        <ul>
          <li>why people are hesitant;</li>
          <li>which messages resonate;</li>
          <li>where people actually gather;</li>
          <li>which languages or formats work;</li>
          <li>which practical barriers matter;</li>
          <li>and who is trusted enough to begin the conversation.</li>
        </ul>
        <p>That knowledge is difficult to reproduce from the centre.</p>
        <p>Funding VCSE organisations therefore does more than outsource outreach.</p>
        <p>At its best, it allows the health system to work through relationships that already exist.</p>
      </section>
      <section>
        <h2>But does it change behaviour?</h2>
        <p>That is the next question.</p>
        <p>Community engagement can feel successful long before it is clear whether screening participation has actually changed.</p>
        <p>Workshops may be well attended.</p>
        <p>People may report greater awareness.</p>
        <p>Community champions may reach large numbers of residents.</p>
        <p>But the harder measures are downstream:</p>
        <ul>
          <li>Did more eligible people complete screening?</li>
          <li>Did previously non-attending groups participate?</li>
          <li>Did inequalities narrow?</li>
          <li>Were people supported through follow-up?</li>
          <li>Which approaches worked best, and for whom?</li>
        </ul>
        <p>That is where evaluation becomes crucial.</p>
        <p>The Peninsula model is promising because it acknowledges that the barrier may sit outside the clinic.</p>
        <p>But its longer-term value will depend on whether community investment can produce measurable changes in screening behaviour and pathway completion.</p>
      </section>
      <section>
        <h2>The wider lesson</h2>
        <p>Devon, Cornwall and the Isles of Scilly remind us that good overall performance and persistent inequality can coexist.</p>
        <p>Averages can improve.</p>
        <p>Screening programmes can perform strongly.</p>
        <p>And still, particular groups can remain systematically less likely to benefit.</p>
        <p>The response here is therefore worth watching.</p>
        <p>The Peninsula Cancer Alliance is explicitly investing in community organisations as part of the solution.</p>
        <p>That raises a question with relevance far beyond the South West:</p>
        <p>If screening inequality is partly about trust, access and local context, should trusted community organisations be treated as part of the screening infrastructure itself?</p>
        <p>That is the tension at the heart of LL-003.</p>
        <p>And it is one BloomShield will return to as funded projects begin to generate evidence about what actually works.</p>
        <p>Local data. Local voices. Local action.</p>
      </section>
    </InsightArticle>
  </>;
}
