import type { Metadata } from "next";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "liverpool")!;
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

const supportingEditorial = <section aria-labelledby="local-lens-source-base">
  <p className="insight-kicker">Local data. Local voices. Local action.</p>
  <h2 id="local-lens-source-base" className="mt-4">Editorial source base</h2>
  <p className="mt-8 border-l-2 border-[#b9892f] pl-5 text-sm leading-7 text-slate-600">Cheshire and Merseyside screening data; NHS Cheshire and Merseyside updates on mobile breast and cervical-screening provision; and local community screening initiatives referenced in this edition.</p>
</section>;

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

export default function LiverpoolLocalLensPage() {
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
    contentLocation: { "@type": "City", name: "Liverpool" },
    inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <InsightArticle
      category={article.area}
      crossTag="Local Lens: Liverpool"
      title={article.title}
      subtitle={article.shortTitle}
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
      reflectionQuestion={article.reflectionQuestion}
      linkedinDiscussionUrl={article.linkedinDiscussionUrl}
      linkedinDiscussionTitle="Continue the Local Lens conversation"
      linkedinDiscussionDescription="Join the discussion about screening access, local action and what Liverpool can teach us."
      linkedinDiscussionLinkLabel="Join the discussion on LinkedIn →"
      linkedinBeforeContact
      engagementContactLabel={article.engagementContactLabel}
      interactionsAfterManuscript
      supportingEditorial={supportingEditorial}
      relatedContent={relatedContent}
      implementationLesson={<p>When screening exists but people still do not get screened, the pathway—not simply the invitation—may need to change.</p>}
      previous={{ label: "Local Lens: Medway & Kent", href: "/insights/local-lens/medway-kent" }}
      next={{ label: "Conversations Across the Cancer Care Ecosystem", href: "/insights/conversations" }}
    >
      <section aria-label="Screening access in Liverpool">
        <p>Local data. Local voices. Local action.</p>
        <p>Liverpool gives us a sharper version of the screening inequality problem.</p>
        <p>The services exist. Invitations are sent. The NHS has established breast, bowel and cervical screening programmes.</p>
        <p>And yet in parts of the city, uptake remains strikingly low.</p>
        <p>In 2023/24, Liverpool recorded some of the weakest screening figures in Cheshire and Merseyside: breast screening at 64.4% and bowel screening at 62.8%. <a href="https://www.cheshireccg.nhs.uk/media/0txfr0eb/spcc-agenda-papers-v2-part-b-200225.pdf?utm_source=chatgpt.com">Cheshire CCG</a></p>
        <p>For cervical screening, around four in ten eligible people in Liverpool were not attending, with local uptake reported at 62% compared with 69% across England. <a href="https://cmcanceralliance.nhs.uk/news/liverpool-gp-surgeries-create-videos-raise-awareness-cervical-cancer-screening?utm_source=chatgpt.com">Cheshire &amp; Merseyside Cancer Alliance</a></p>
        <p>So the question is not simply whether screening is available.</p>
        <p>It is:</p>
        <p className="insight-pull-statement">What is getting in the way?</p>
      </section>

      <section aria-label="Making screening access easier">
        <p>For women in North and Central Liverpool, attending breast screening has historically meant travelling to Broadgreen Hospital.</p>
        <p>The NHS itself has identified transport and convenience as practical barriers, particularly for women travelling from those parts of the city. Central and North Liverpool are described by the local NHS as having some of the lowest breast-screening uptake rates in the country, well below the national benchmark. <a href="https://cheshireandmerseyside.nhs.uk/your-locality/liverpool/liverpool-news/state-of-the-art-mobile-unit-to-bring-breast-screening-to-the-communities-of-liverpool?utm_source=chatgpt.com">NHS Cheshire and Merseyside</a></p>
        <p>That is an important distinction.</p>
        <p>Low uptake is often discussed as if it reflects reluctance or lack of awareness.</p>
        <p>But sometimes the problem is simpler:</p>
        <p>the service is too difficult to reach.</p>
        <p>In January 2026, NHS University Hospitals of Liverpool Group launched a new mobile breast-screening unit designed specifically to bring screening into communities with low participation.</p>
        <p>The unit saw its first patients on 12 January and was initially based at Goodison Park before rotating through priority locations across North and Central Liverpool. It can accommodate up to 50 screenings a day. <a href="https://cheshireandmerseyside.nhs.uk/your-locality/liverpool/liverpool-news/state-of-the-art-mobile-unit-to-bring-breast-screening-to-the-communities-of-liverpool?utm_source=chatgpt.com">NHS Cheshire and Merseyside</a></p>
        <p>That intervention reflects a different philosophy.</p>
        <p>Instead of asking only:</p>
        <p>“Why aren’t women attending?”</p>
        <p>the system is also asking:</p>
        <p>“How can we redesign the service so that attending is easier?”</p>
        <p>That shift matters.</p>
      </section>

      <section aria-label="Local screening interventions">
        <p>There are signs that targeted community interventions can improve screening behaviour.</p>
        <p>The Be Breast Savvy campaign used community engagement and creative communication to address barriers to breast screening. In North Liverpool, the programme was associated with reduced non-attendance and improvement in screening participation.</p>
        <p>Elsewhere in South Liverpool, the Bits ‘n’ Boobs programme reported bowel screening uptake rising from 48% in March 2022 to 67% in March 2025, while breast screening increased from 62% to 68% over the same period.</p>
        <p>Those are local examples, not city-wide proof.</p>
        <p>But they suggest something important:</p>
        <p>uptake can change when the pathway changes.</p>
        <p>Liverpool has also been testing different ways of improving access to cervical screening.</p>
        <p>A mobile cervical-screening pilot across Cheshire and Merseyside found that 35% of those screened were overdue or previous non-responders, while 10% were attending for the first time. The pilot was subsequently extended to Liverpool and other areas. <a href="https://www.cheshireandmerseyside.nhs.uk/latest/case-studies/improving-access-to-cervical-screening?utm_source=chatgpt.com">NHS Cheshire and Merseyside</a></p>
        <p>Liverpool’s women’s health hubs have also increased access to cervical screening alongside other reproductive-health services, bringing care closer to where women already receive support. <a href="https://www.cheshireandmerseyside.nhs.uk/posts/improved-access-to-reproductive-healthcare-for-liverpool-women/?utm_source=chatgpt.com">NHS Cheshire and Merseyside</a></p>
        <p>Again, the pattern is consistent:</p>
        <p>access improves when services move closer to people’s lives.</p>
      </section>

      <section aria-label="Screening pathways and inequality">
        <p>Liverpool’s screening challenge cannot be reduced to awareness alone.</p>
        <p>Deprivation, transport, appointment flexibility, trust, competing responsibilities, previous healthcare experiences and the practical cost of attending can all shape participation.</p>
        <p>The more useful question is therefore not:</p>
        <p>“Why don’t people attend screening?”</p>
        <p>It is:</p>
        <p>“What features of the system make screening easier for some people than for others?”</p>
        <p>That is a very different starting point.</p>
      </section>

      <section aria-label="What happens next in Liverpool">
        <p>The new mobile breast-screening unit is still relatively new.</p>
        <p>Publicly available sources confirm when it launched, where it is being deployed and its daily capacity, but they do not yet provide cumulative numbers screened or a post-intervention uptake rate.</p>
        <p>That means it is too early to judge its impact.</p>
        <p>BloomShield Local Lens will return to Liverpool when published outcome data become available.</p>
        <p>The question then will be straightforward:</p>
        <p>Did bringing screening closer actually change uptake?</p>
        <p>Liverpool illustrates the central Local Lens principle:</p>
        <p>screening availability is not the same as screening access.</p>
        <p>The city has areas with persistently low participation, but it also has examples of community-led engagement, service redesign and mobile delivery that appear capable of changing behaviour.</p>
        <p>The next challenge is to determine whether those interventions can shift inequalities at scale.</p>
        <p>Because when screening exists but people still do not get screened, the answer may not lie in another invitation.</p>
        <p>It may lie in redesigning the pathway.</p>
        <p>BloomShield would like to hear from people working across Liverpool’s screening, primary care, public health, VCSE and community sectors.</p>
        <p>What is getting in the way — and what is already working?</p>
      </section>
    </InsightArticle>
  </>;
}
