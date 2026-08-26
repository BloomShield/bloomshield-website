import type { Metadata } from "next";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "hpv-self-testing-screening-gap")!;
const authors = getInsightAuthors(article);
const path = "/insights/evidence-policy/hpv-self-testing-screening-gap";
const standfirst = "NHS England has begun offering HPV self-testing to millions of women who are behind with cervical screening. The policy could remove an important barrier to participation — but its real test will be whether previously under-screened women complete the pathway from invitation to testing and follow-up.";
const seoTitle = article.seoTitle ?? article.title;
const seoDescription = article.seoDescription ?? article.description;
const canonicalPath = article.canonicalUrl ?? path;
const socialImage = article.socialImage ?? article.image!;
const socialImageAlt = article.socialImageAlt ?? article.imageAlt!;
const keywords = article.keywords ?? article.tags ?? [];

export const metadata: Metadata = createInsightMetadata({
  title: seoTitle,
  description: seoDescription,
  path: canonicalPath,
  socialImage,
  socialImageAlt,
  socialImageWidth: article.socialImageWidth ?? 1672,
  socialImageHeight: article.socialImageHeight ?? 941,
  type: "article",
  keywords,
  authors: authors.map(author => author.name),
  datePublished: article.datePublished ?? article.publishedAtIso,
  dateModified: article.dateModified ?? article.publishedAtIso,
});

const references = [
  { label: "NHS rolls out discreet home-testing kits against cervical cancer for millions of women", source: "NHS England, 25 August 2026", href: "https://www.england.nhs.uk/2026/08/nhs-rolls-out-discreet-home-testing-kits-against-cervical-cancer-for-millions-of-women/" },
  { label: "Equality impact assessment: HPV self-sampling in the NHS Cervical Screening Programme", source: "Department of Health and Social Care, 7 August 2025", href: "https://www.gov.uk/government/publications/cervical-screening-hpv-self-sampling-impact-assessments/equality-impact-assessment-hpv-self-sampling-in-the-nhs-cervical-screening-programme" },
  { label: "Cervical cancer screening recommendation: HPV self-sampling for under-screened people", source: "UK National Screening Committee — recommendation and YouScreen evidence", href: "https://view-health-screening-recommendations.service.gov.uk/cervical-cancer/" },
];

const relatedContent = <section aria-labelledby="related-insights">
  <h2 id="related-insights">Related Insights</h2>
  <div className="mt-6 rounded-[1.5rem] border border-teal-900/10 bg-white p-6">
    <p className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">Forthcoming conversation</p>
    <h3 className="mt-3 font-display text-2xl font-semibold">Dr Sang’udi Sang’udi | SarataniAI</h3>
    <p className="mt-3 leading-7 text-slate-600">AI-enabled cervical cancer screening, frontline delivery and what innovation must overcome in low-resource settings.</p>
    <Link href="/insights/conversations" data-insights-event="insights_related_content_click" className="mt-5 inline-flex font-bold text-teal-700 underline decoration-teal-700/30 underline-offset-4">View the series</Link>
  </div>
</section>;

export default function HpvSelfTestingInsightPage() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${SITE_URL}${canonicalPath}#article`, headline: article.title, alternativeHeadline: seoTitle, description: seoDescription,
    image: { "@type": "ImageObject", url: `${SITE_URL}${socialImage}`, width: article.socialImageWidth ?? 1672, height: article.socialImageHeight ?? 941, caption: socialImageAlt },
    datePublished: article.datePublished ?? article.publishedAtIso, dateModified: article.dateModified ?? article.publishedAtIso,
    author: authors.map(author => ({ "@type": author.type === "person" ? "Person" : "Organization", name: author.name, description: author.biography, ...(author.credentials ? { jobTitle: author.credentials } : {}), ...(author.affiliation ? { affiliation: { "@type": "Organization", name: "BloomShield CIC", url: SITE_URL } } : {}) })),
    publisher: { "@type": "Organization", name: insightPublisher.name, url: `${SITE_URL}/insights`, parentOrganization: { "@type": "Organization", name: ORGANIZATION_NAME, url: SITE_URL }, logo: { "@type": "ImageObject", url: `${SITE_URL}/bloomshield-square-lockup.png`, width: 545, height: 590 } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${canonicalPath}` }, articleSection: article.area, keywords: keywords.join(", "),
    about: keywords.map(name => ({ "@type": "Thing", name })), inLanguage: "en-GB",
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <InsightArticle category={article.area} crossTag="Implementation & Equity" title={article.title} articleSlug={article.slug} date={article.publishedAt!} dateIso={article.publishedAtIso!} authors={authors} publisher={insightPublisher.name} standfirst={standfirst} image={article.image!} imageAlt={article.imageAlt!} domains={["People", "Systems", "Equity", "Impact"]} ccpeLens={article.ccpeLens} tags={article.tags} reflectionQuestion={article.reflectionQuestion} linkedinDiscussionUrl={article.linkedinDiscussionUrl} engagementContactLabel={article.engagementContactLabel} references={references} relatedContent={relatedContent} implementationLesson={<p>Removing a procedural barrier can improve access, but equitable implementation requires attention to the entire pathway. Self-sampling may make the first step easier; health systems must still understand and address the barriers that emerge between testing, follow-up and preventive care.</p>} next={{ label: "Conversations: SarataniAI", href: "/insights/conversations" }}>
      <section aria-labelledby="public-health-development">
        <p className="insight-kicker">From policy announcement to equitable implementation</p>
        <p>Today, NHS England began rolling out HPV self-testing to nearly four million women who are not up to date with cervical screening.</p>
        <h2 id="public-health-development">It is an important public-health development.</h2>
        <p>For women who have not attended screening after previous invitations, the new approach offers something significantly different: the ability to collect a vaginal sample privately at home and return it to the NHS for testing for high-risk human papillomavirus (HPV). The rollout begins with women aged 30 to 65 and will be phased across England. Invitations will be issued through the NHS App, text message, email or letter.</p>
        <p>The policy responds to a persistent challenge. Only 68.8% of eligible women in England are currently up to date with cervical screening, below NHS England’s 80% target. Around four million women are therefore behind with routine screening.</p>
        <p>Making screening easier, more private and more convenient is therefore a very welcome intervention.</p>
        <div className="insight-question-block">
          <p className="!mt-0">But the question that matters next is not simply:</p>
          <p className="insight-question-line">How many self-testing kits will be offered?</p>
          <p>It is:</p>
          <p className="insight-question-line">Will self-testing reach the women who have been least well served by the existing screening system — and will they successfully complete the pathway that follows?</p>
        </div>
      </section>
      <section aria-label="Traditional cervical screening barriers">
        <p>Traditional cervical screening asks people to book an appointment, travel to a clinic or GP practice, undergo an intimate examination and fit that appointment around work, caring responsibilities and everyday life.</p>
        <p>For some women, embarrassment, discomfort, previous experiences, inconvenience or difficulty attending appointments can become significant barriers. NHS England explicitly cites many of these factors in explaining the rationale for self-testing.</p>
        <p>Removing the need for an initial clinical examination may therefore remove an important barrier.</p>
        <p>Evidence preceding the national rollout is encouraging. The YouScreen trial, undertaken in North London with NHS England and King’s College London, suggested that offering self-sampling to under-screened women could increase the number participating in screening in England by around 400,000 each year. The evidence subsequently contributed to the UK National Screening Committee recommendation supporting wider rollout.</p>
        <p>That matters.</p>
        <p>But increasing aggregate participation is not quite the same thing as achieving equitable participation.</p>
        <p>A national screening programme can improve overall uptake while inequalities between groups remain.</p>
        <p>The critical implementation questions will therefore be who orders the kits, who uses them, who returns them, and who does not.</p>
        <p>Self-testing removes one barrier: the need to undergo the initial screening procedure in a clinical setting.</p>
        <p>It does not automatically remove every barrier surrounding screening.</p>
        <p>Some women may still have limited awareness of HPV or uncertainty about what the test means. Others may experience language barriers, digital exclusion, unstable housing, mistrust of health services, concerns about confidentiality, difficulty understanding instructions, or competing social and economic pressures.</p>
        <p>The government’s equality assessment for HPV self-sampling recognises the importance of considering differential impact across population groups as the programme is implemented.</p>
        <p>That is why the rollout should ultimately be judged not merely by national volume but by its distribution.</p>
        <div className="my-9 rounded-[1.5rem] bg-teal-50 p-7 font-semibold leading-8 text-teal-900 sm:p-8">
          <p className="!mt-0">Did participation rise among women living in more deprived communities?</p>
          <p>Did historically under-screened ethnic minority populations benefit?</p>
          <p>Did women facing language or digital barriers participate?</p>
          <p>Were there geographical differences?</p>
          <p>And importantly, did the intervention narrow existing inequalities rather than simply improve the national average?</p>
        </div>
      </section>
      <section aria-labelledby="availability-to-equity">
        <h2 id="availability-to-equity">Those questions take us from availability to equity.</h2>
        <p>There is another important distinction.</p>
        <p>HPV self-testing is not a complete replacement for clinician-led cervical screening.</p>
        <p>If high-risk HPV is detected in a returned self-sample, the individual will need to attend a GP surgery or sexual health clinic for a cervical sample so that clinicians can check for cell changes. NHS England continues to describe clinician cervical screening as the preferred route, with self-sampling introduced as an additional option for people who have not responded to previous invitations.</p>
        <p>That creates a second implementation challenge.</p>
        <p>A woman who was previously unable or unwilling to attend cervical screening may successfully complete an HPV self-test — but if that result requires clinical follow-up, some of the original barriers may return.</p>
        <p>The programme therefore needs to understand not only:</p>
        <div className="my-8 border-l-2 border-[#b9892f] pl-5 font-display text-xl font-semibold leading-8 text-ink sm:pl-6 sm:text-[1.35rem] sm:leading-9">
          <p className="!mt-0">Did she complete the test?</p>
          <p>but also:</p>
          <p>If further assessment was required, did she complete that too?</p>
        </div>
        <p>From an implementation perspective, that distinction is crucial.</p>
      </section>
      <section aria-labelledby="pathway-completion">
        <p id="pathway-completion" className="insight-pull-statement">Kit distribution is not pathway completion.</p>
        <p>England has an ambition to eliminate cervical cancer by 2040, and increasing vaccination and screening participation are central to achieving it.</p>
        <p>HPV self-sampling could make a substantial contribution.</p>
        <p>It represents precisely the kind of service redesign that health systems increasingly need: moving prevention closer to people rather than requiring everybody to interact with healthcare in exactly the same way.</p>
        <p>But its greatest promise is not convenience alone.</p>
        <p>Its greatest promise is the possibility of reaching people whom the conventional pathway has repeatedly failed to reach.</p>
        <p>That means the measures of success should eventually extend beyond how many invitations are issued or kits ordered.</p>
        <p>We should be asking:</p>
        <div className="my-10 rounded-[1.5rem] bg-[#073b3b] p-7 font-display text-lg font-semibold leading-8 text-white sm:p-8 sm:text-xl">
          <p className="!mt-0">Who received the offer? Who ordered a kit? Who returned it? Who tested positive for high-risk HPV? Who subsequently attended clinical follow-up? Who completed the pathway? And where did inequalities remain?</p>
        </div>
        <p>Those data will tell us whether this becomes merely another screening option — or a genuine intervention against screening inequality.</p>
      </section>
      <section aria-labelledby="chapter-starts-now">
        <p>There is much to celebrate in today’s announcement.</p>
        <p>Giving millions of women another way to participate in cervical screening is sensible, evidence-informed public-health policy.</p>
        <p id="chapter-starts-now" className="insight-pull-statement">But the most interesting chapter starts now.</p>
        <p>Public-health interventions ultimately succeed or fail in the distance between policy design and people’s lived experience of accessing care.</p>
        <p>The NHS has changed the pathway.</p>
        <p>What we should now watch carefully is whether that change reaches the women for whom the previous pathway did not work.</p>
        <p>Because the measure of success will not simply be how many kits are offered.</p>
        <p>It will be how many previously under-screened women are enabled to move from invitation, to testing, to follow-up and ultimately to prevention.</p>
      </section>
    </InsightArticle>
  </>;
}
