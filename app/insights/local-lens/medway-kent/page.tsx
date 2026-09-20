import type { Metadata } from "next";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "medway-kent")!;
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
  type: "article",
  keywords,
  authors: authors.map(author => author.name),
  datePublished: article.datePublished ?? article.publishedAtIso,
  dateModified: article.dateModified ?? article.publishedAtIso,
});

const supportingEditorial = <section aria-labelledby="local-lens-invitation">
  <p className="insight-kicker">Local data. Local voices. Local action.</p>
  <h2 id="local-lens-invitation" className="mt-4">Share what you are seeing locally</h2>
  <p>BloomShield would like to hear from people already working on cancer screening and early diagnosis across Medway and Kent — including NHS teams, local government, Cancer Alliance colleagues, VCSEs, faith organisations, community champions and residents.</p>
  <p>What are you seeing locally? Who is still being missed? And what would help more people complete the screening pathway?</p>
  <p className="mt-8 border-l-2 border-[#b9892f] pl-5 text-sm leading-7 text-slate-600">Editorial source base: Medway Health and Wellbeing Board cancer screening review (April 2025) and subsequent Medway Council screening data update.</p>
</section>;

const relatedContent = <section aria-labelledby="related-insights">
  <p className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">Continue exploring</p>
  <h2 id="related-insights" className="mt-4">Related Insights</h2>
  <div className="mt-6 divide-y divide-teal-900/10 border-y border-teal-900/10">
    <Link href="/insights/evidence-policy/hpv-self-testing-screening-gap" data-insights-event="insights_related_content_click" className="group flex items-center justify-between gap-5 py-5 text-ink">
      <span><span className="block text-xs font-bold uppercase tracking-[.14em] text-teal-700">Evidence &amp; Policy</span><span className="mt-2 block font-display text-xl font-semibold group-hover:text-teal-700">HPV self-testing and the screening gap</span></span><span aria-hidden="true" className="text-[#85601e]">→</span>
    </Link>
    <Link href="/insights/conversations" data-insights-event="insights_related_content_click" className="group flex items-center justify-between gap-5 py-5 text-ink">
      <span><span className="block text-xs font-bold uppercase tracking-[.14em] text-teal-700">Conversations</span><span className="mt-2 block font-display text-xl font-semibold group-hover:text-teal-700">Conversations Across the Cancer Care Ecosystem</span></span><span aria-hidden="true" className="text-[#85601e]">→</span>
    </Link>
  </div>
</section>;

export default function MedwayKentLocalLensPage() {
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
    contentLocation: [{ "@type": "AdministrativeArea", name: "Medway" }, { "@type": "AdministrativeArea", name: "Kent" }],
    inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <InsightArticle
      category={article.area}
      crossTag="Local Lens: Medway & Kent"
      title={article.title}
      articleSlug={article.slug}
      date={article.publishedAt!}
      dateIso={article.publishedAtIso!}
      authors={authors}
      publisher={insightPublisher.name}
      standfirst="Local data. Local voices. Local action."
      image={article.image!}
      imageAlt={article.imageAlt!}
      heroClassName="aspect-[1983/793]"
      heroImageClassName="object-contain object-center"
      domains={["People", "Partnerships", "Systems", "Equity", "Impact"]}
      ccpeLens={article.ccpeLens}
      tags={article.tags}
      linkedinDiscussionUrl={article.linkedinDiscussionUrl}
      linkedinDiscussionTitle="Continue the Local Lens conversation"
      linkedinDiscussionDescription="The article discussion post is coming soon. For now, follow BloomShield CIC on LinkedIn for Local Lens updates."
      linkedinDiscussionLinkLabel="Visit BloomShield CIC on LinkedIn →"
      engagementContactLabel={article.engagementContactLabel}
      interactionsAfterManuscript
      supportingEditorial={supportingEditorial}
      relatedContent={relatedContent}
      implementationLesson={<p>A local screening average can improve while important inequalities remain. Equitable action depends on understanding where people disengage across the pathway and working with trusted local partners to make participation and follow-up genuinely accessible.</p>}
      previous={{ label: "BloomShield Local Lens", href: "/insights/local-lens" }}
      next={{ label: "Conversations Across the Cancer Care Ecosystem", href: "/insights/conversations" }}
    >
      <section aria-label="Local Lens introduction">
        <p>Cancer inequalities may be national in scale, but they are experienced locally. Behind every percentage point is a person, a family and a community. Differences in screening coverage can shape who benefits from earlier diagnosis — and who remains more likely to be diagnosed later.</p>
        <p>BloomShield Local Lens begins in Medway &amp; Kent, examining what the data shows, where progress is being made, who may still be getting missed, and how community and system partners can respond.</p>
      </section>

      <section aria-labelledby="baseline-to-progress">
        <h2 id="baseline-to-progress">From baseline to progress</h2>
        <p>When Medway’s Health and Wellbeing Board reviewed screening in April 2025, the 2023/24 baseline showed breast and bowel screening coverage below England, while cervical screening among people aged 50–64 was broadly similar.</p>
        <ul>
          <li>Breast: Medway 68.3% | England 69.9%</li>
          <li>Bowel: Medway 69.7% | England 71.8%</li>
          <li>Cervical, age 50–64: Medway 73.9% | England 74.3%</li>
        </ul>
        <p>More recent figures show encouraging movement. In 2025, breast screening in Medway had risen to <strong className="font-semibold text-ink">72.2%</strong>, slightly above England at <strong className="font-semibold text-ink">71.7%</strong>. Bowel screening improved to <strong className="font-semibold text-ink">71.3%</strong>, although it remained below England at <strong className="font-semibold text-ink">72.9%</strong>.</p>
        <p>For cervical screening in 2024, Medway was above England among people aged 25–49 (<strong className="font-semibold text-ink">69.7% vs 66.1%</strong>) and broadly similar among those aged 50–64 (<strong className="font-semibold text-ink">73.9% vs 74.3%</strong>).</p>
        <p className="insight-pull-statement">So the headline is no longer simply that Medway performs below England. The more important equity question is: who within Medway is still least likely to benefit from screening?</p>
      </section>

      <section aria-labelledby="inequality-gap">
        <h2 id="inequality-gap">The inequality gap beneath the average</h2>
        <p>The April 2025 review provides some important clues. Women invited for breast screening for the first time who lived in Medway’s most deprived areas had lower coverage than women elsewhere. Across Medway and Swale, 56% of breast cancers in the eligible population were detected through screening in the three years to March 2024, with detection highest in the least deprived quintile and lowest in the most deprived.</p>
        <p>For bowel cancer, the disparity was more striking: people living in more deprived parts of Medway were reported to be seven times more likely to have bowel cancer diagnosed through an emergency department than through the NHS bowel screening programme over the five years to 2022.</p>
        <p>More recent analysis also found lower bowel-screening uptake in more deprived areas and among the younger part of the eligible cohort, particularly those aged 50–56.</p>
      </section>

      <section aria-labelledby="who-may-be-missed">
        <h2 id="who-may-be-missed">Who else may be getting missed?</h2>
        <p>Screening inequalities are not defined by deprivation alone. The Medway review also identified substantial gaps among people with a learning disability and people with severe mental illness.</p>
        <p>For people on Medway’s learning-disability register, screening coverage across the three cancer programmes was at least 20 percentage points lower than in the general population. Among people on the severe-mental-illness register, coverage was reported to be 15 percentage points lower for breast screening and up to 30 points lower for bowel screening.</p>
        <p className="insight-pull-statement">That changes the question from “Was an invitation sent?” to “Was the screening pathway genuinely accessible?”</p>
      </section>

      <section aria-labelledby="what-is-being-done">
        <h2 id="what-is-being-done">What is already being done?</h2>
        <p>There is significant work underway locally. Kent &amp; Medway has a dedicated Screening and Immunisation Inequalities Subgroup, and providers are required to undertake health-equity audits and develop action plans addressing barriers to participation.</p>
        <p>Medway and Swale have also worked with the VCSE and faith sector on bowel-screening activity in communities with lower participation, including the development of community champions. For people with learning disabilities or severe mental illness, responses have included easy-read information, advance telephone contact, longer appointments, engagement with residential settings and improved primary-care processes.</p>
        <p>Medway Voluntary Action has also undertaken community-led engagement with diverse population groups to understand perceptions of cancer prevention, screening, diagnosis and treatment.</p>
      </section>

      <section aria-labelledby="awareness-to-access">
        <h2 id="awareness-to-access">From awareness to access</h2>
        <p>A screening programme is a pathway:</p>
        <div className="insight-emphasis-sequence"><p>awareness → invitation → understanding → participation → result → follow-up → diagnostic completion → treatment or prevention</p></div>
        <p>A weakness at any stage can reproduce inequality, even where screening is universally available. The task is not to duplicate what the NHS already does, but to understand where people disengage, why they disengage, and how trusted local organisations can help make the pathway easier to navigate.</p>
      </section>

      <section aria-labelledby="why-medway-matters">
        <h2 id="why-medway-matters">Why Medway matters</h2>
        <p>Screening inequalities sit within a wider local picture. Medway’s move towards becoming a Marmot Place followed analysis showing a roughly ten-year difference in male life expectancy between Cuxton and Chatham. Where people live, disability, mental health, language, income, trust and confidence navigating healthcare can all influence whether an invitation ultimately becomes an early diagnosis.</p>
      </section>

      <section aria-labelledby="bloomshield-local-lens">
        <h2 id="bloomshield-local-lens">The BloomShield Local Lens</h2>
        <p>The first lesson from Medway is not simply that one screening percentage is higher or lower than another. It is that averages can conceal the people being left behind.</p>
        <p>There is evidence of progress: breast screening has improved substantially, bowel screening participation has risen, and some cervical-screening measures compare favourably with England. But important inequalities remain.</p>
        <p>BloomShield Local Lens will explore that pattern across England through a repeatable method:</p>
        <div className="insight-emphasis-sequence"><p>local data → inequality gap → what is already being done → who is being missed → community and system response → local voices → action</p></div>
      </section>
    </InsightArticle>
  </>;
}
