import Image from "next/image";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insights } from "@/lib/insights";
import { createInsightMetadata, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "screenconnect-digital-research-demonstrator")!;
const authors = getInsightAuthors(article).map(author => ({ ...author, credentials: "MB.ChB MBA" }));
export const metadata = {
  ...createInsightMetadata({ title: article.title, description: article.description, path: article.href!, socialImage: article.socialImage!, socialImageAlt: article.socialImageAlt!, socialImageWidth: 1448, socialImageHeight: 1086, type: "article", authors: authors.map(author => author.name), datePublished: article.datePublished, dateModified: article.dateModified, keywords: article.tags }),
  publisher: "BloomShield CIC",
};
const references = [{label: "Olthof EMG et al. — The impact of loss to follow-up in the Dutch organised HPV-based cervical cancer screening programme.", href: "https://doi.org/10.1002/ijc.34902", source: "International Journal of Cancer, 2024. Women studied: 840,428. Potentially missed CIN2+ lesions are estimates, including 462 after direct referral advice for colposcopy."}];
const jsonLd = {
  "@context": "https://schema.org", "@type": "Article",
  headline: article.title, description: article.description,
  url: `${SITE_URL}${article.href}`, mainEntityOfPage: `${SITE_URL}${article.href}`,
  image: `${SITE_URL}${article.socialImage}`, datePublished: article.datePublished, dateModified: article.dateModified,
  author: authors.map(author => ({"@type": "Person", name: author.name, honorificSuffix: author.credentials})),
  publisher: {"@type": "Organization", name: "BloomShield CIC", url: SITE_URL, logo: {"@type": "ImageObject", url: `${SITE_URL}/bloomshield-square-lockup.png`}},
  articleSection: "Research & Innovation", inLanguage: "en-GB", citation: references.map(reference => reference.href),
};
export default function ScreenConnectUnveilingPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")}} />
    <InsightArticle category="Research & Innovation" crossTag={article.area} title={article.title} articleSlug={article.slug} date={article.publishedAt!} dateIso={article.publishedAtIso!} authors={authors} publisher="BloomShield CIC" standfirst="Beyond screening uptake. Understanding the journey. Exploring what happens next." image="/images/insights/screenconnect-digital-unveiling-hero.png" imageAlt="ScreenConnect Digital™ — The 360° Cancer Screening Journey, showing the eight-stage community-to-care pathway designed around NHS screening pathways." heroClassName="aspect-[2/1]" heroImageClassName="object-contain object-center" domains={["People", "Systems", "Innovation", "Equity", "Impact"]} tags={article.tags} interactionsAfterManuscript references={references} implementationLesson={<p>A completed screening test does not necessarily mean a completed screening journey.</p>} relatedContent={<section className="insight-article-end-section"><h2>Related articles</h2><ul><li><Link href="/insights/series-collections/from-gaps-to-the-360-journey">From Gaps to the 360° Journey</Link></li><li><Link href="/insights/local-lens/liverpool">Local Lens: Liverpool</Link></li><li><Link href="/insights/local-lens/greater-manchester">Local Lens: Greater Manchester</Link></li><li><Link href="/insights/local-lens/havering-east-london">Local Lens: Havering, East London</Link></li></ul></section>}>
<h2>844 potentially missed cervical precancerous lesions. What happened along the screening journey?</h2>
<p>In 2024, researchers examining the Dutch national HPV-based cervical cancer screening programme published a finding that deserves attention.</p>
<p>Their study included more than <strong>840,000 women</strong>.</p>
<p>Among women lost to follow-up at different stages of the screening pathway, researchers estimated <strong>844 potentially missed high-grade cervical lesions (CIN2+)</strong>.</p>
<p>Of those, an estimated <strong>462 occurred among women who had been advised to undergo colposcopy</strong>.</p>
<p>These were estimates, not confirmed diagnoses among the women lost to follow-up.</p>
<div className="my-8 grid gap-4 sm:grid-cols-3" aria-label="Dutch study estimates">{[{value:"840,000+",label:"Women studied"},{value:"844",label:"Estimated potentially missed CIN2+ lesions"},{value:"462",label:"Estimated following colposcopy referral advice"}].map(stat => <div key={stat.value} className="rounded-2xl border border-teal-900/15 bg-[#f3ead6] p-5"><p className="!mt-0 font-display text-3xl font-semibold text-teal-900">{stat.value}</p><p className="!mt-3 text-sm leading-6">{stat.label}</p></div>)}</div><p className="text-sm italic text-slate-600">Missed lesions were estimated, not confirmed among women lost to follow-up.</p>
<p>But the implications were significant.</p>
<p><strong>A woman can participate in screening, receive an abnormal result, be advised to undergo further investigation — and still not complete the next stage of care.</strong></p>
<p>The challenge is not always getting someone into screening.</p>
<p>Sometimes, it is what happens afterwards.</p>
<p><strong>A completed screening test does not necessarily mean a completed screening journey.</strong></p>
<p>That observation captures one of the central questions behind an innovation we have been developing at BloomShield.</p>
<hr className="my-12 border-0 border-t border-teal-900/10 sm:my-16" />
<h2>From identifying the gap to understanding the journey</h2>
<p>Throughout October, our <Link href="/insights/series-collections/from-gaps-to-the-360-journey">Breast Cancer Awareness Month series</Link> explored screening inequalities, while BloomShield Local Lens examined how different communities across England are responding.</p>
<p>From mobile screening in <Link href="/insights/local-lens/liverpool">Liverpool</Link> to pathway adaptation in <Link href="/insights/local-lens/greater-manchester">Greater Manchester</Link> and proactive identification of non-responders in <Link href="/insights/local-lens/havering-east-london">Havering</Link>, we have encountered a recurring implementation challenge.</p>
<p><strong>Who needed support? What barrier appeared? What intervention followed? And what happened next?</strong></p>
<p>Population intelligence can help identify where screening inequalities exist.</p>
<p>But understanding the individual journey requires looking beyond the screening event itself.</p>
<p>That is the thinking behind our <strong>360° cancer screening journey</strong>.</p>
<p>And it brings us to an important milestone.</p>
<hr className="my-12 border-0 border-t border-teal-900/10 sm:my-16" />
<h2>Introducing ScreenConnect Digital™</h2>
<p><strong>ScreenConnect Digital™ is BloomShield&apos;s working, synthetic-data research demonstrator for exploring person-centred, longitudinal screening journeys, pathway continuity and implementation outcomes.</strong></p>
<figure className="my-8 w-full sm:my-10">
  <Image src="/images/insights/screenconnect-digital-360-journey-wide.png" alt="Unveiling ScreenConnect Digital™: the 360° cancer screening journey, from community outreach, invitation and barrier assessment through appointment support, screening attendance, results, referral and follow-up to navigation closure, with drop-off risk indicators." width={1731} height={909} sizes="(min-width: 1024px) 736px, (min-width: 768px) 90vw, 100vw" className="block h-auto w-full rounded-[1.5rem] object-contain" />
  <figcaption className="mt-3 text-sm leading-6"><a href="/images/insights/screenconnect-digital-360-journey-wide.png" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-teal-700 underline decoration-teal-700/30 underline-offset-4 hover:decoration-teal-700">View full-size illustration<span className="sr-only"> (opens in a new tab)</span></a></figcaption>
</figure>
<p>The original concept emerged from a practical problem: the gap between community engagement, screening participation, navigation, referral and subsequent care.</p>
<p>We wanted to explore whether those different stages could be understood as a connected journey rather than a collection of isolated events.</p>
<p>In September 2026, the proposition entered the <strong>NHS Innovation Service needs-assessment process</strong>, helping frame questions for further discovery and evaluation.</p>
<p>We subsequently progressed from concept to a working research demonstrator, completing its initial technical build and validation against its defined development requirements.</p>
<p>The result is a synthetic-data environment for examining pathways, barriers, interventions, next actions and outcomes.</p>
<p>At the centre of the model is a simple sequence:</p>
<ol aria-label="ScreenConnect research model" className="!my-8 flex !list-none flex-wrap items-center gap-3 rounded-2xl border border-teal-900/15 bg-teal-50 p-5 !pl-5"><li className="flex items-center gap-3 !pl-0"><strong className="rounded-lg bg-white px-3 py-2">Person</strong><span aria-hidden="true">→</span></li><li className="flex items-center gap-3 !pl-0"><strong className="rounded-lg bg-white px-3 py-2">Pathway</strong><span aria-hidden="true">→</span></li><li className="flex items-center gap-3 !pl-0"><strong className="rounded-lg bg-white px-3 py-2">Barrier</strong><span aria-hidden="true">→</span></li><li className="flex items-center gap-3 !pl-0"><strong className="rounded-lg bg-white px-3 py-2">Intervention</strong><span aria-hidden="true">→</span></li><li className="flex items-center gap-3 !pl-0"><strong className="rounded-lg bg-white px-3 py-2">Next Action</strong><span aria-hidden="true">→</span></li><li className="flex items-center gap-3 !pl-0"><strong className="rounded-lg bg-white px-3 py-2">Outcome</strong><span aria-hidden="true">→</span></li><li className="flex items-center gap-3 !pl-0"><strong className="rounded-lg bg-white px-3 py-2">Learning</strong></li></ol>
<p>This is what we mean by the <strong>360° journey</strong>.</p>
<p>Not simply whether someone attended screening.</p>
<p>But what happened before, during and after that encounter — and what might help the journey continue.</p>
<hr className="my-12 border-0 border-t border-teal-900/10 sm:my-16" />
<h2>One research approach. Multiple screening pathways.</h2>
<p>ScreenConnect Digital™ explores questions across <strong>breast, cervical, bowel and lung cancer screening</strong>, alongside NHS Health Check pathways.</p>
<p>The demonstrator brings together synthetic participant journeys, pathway events, barriers, intervention records and research views in one exploratory environment.</p>
<p>It offers a way to investigate recurring implementation questions:</p>
<ul><li>Where do screening journeys stall?</li><li>What barriers are documented?</li><li>What support or navigation intervention follows?</li><li>What happens at referral and follow-up?</li><li>How might these patterns be studied across different population groups?</li></ul>
<p>The opportunity is not simply to produce another dashboard.</p>
<p>It is to investigate <strong>the journey inside the population-level gap</strong>.</p>
<p>Our working demonstrator establishes a foundation for this research. Its usefulness in real clinical and community settings remains a question for future collaborative evaluation.</p>
<hr className="my-12 border-0 border-t border-teal-900/10 sm:my-16" />
<h2>From development to research collaboration</h2>
<p>We have reached a stage where ScreenConnect Digital™ needs more than internal development.</p>
<p className="border-l-4 border-[#b9892f] bg-[#f3ead6] p-6"><strong>It needs the perspectives of people who understand the real pathways.</strong></p>
<p>We welcome conversations with epidemiologists, behavioral scientists, implementation researchers, NHS screening teams, Cancer Alliances, community organisations, digital-health specialists and prospective end users.</p>
<p>We are interested in collaborative review of the research model, pathway assumptions, user requirements, feasibility and future evaluation opportunities.</p>
<p>The aim is not to present a finished solution.</p>
<p>It is to develop and test a promising research approach with the people best placed to challenge and improve it.</p>
<p><strong>The next phase is discovery, collaboration and evidence-building.</strong></p>
<hr className="my-12 border-0 border-t border-teal-900/10 sm:my-16" />
<h2>The journey continues</h2>
<p>The Dutch study offers a powerful reminder of why continuity matters.</p>
<p>Our Local Lens research is demonstrating how inequalities, investments and implementation responses differ across communities.</p>
<p>And ScreenConnect Digital™ represents BloomShield&apos;s attempt to bring these questions into a working research environment.</p>
<p>We have moved from concept to demonstrator.</p>
<p>Now we want to learn what it can genuinely contribute.</p>
<p><strong>Because a screening gap is not just a number. It is a journey that stopped somewhere.</strong></p>
<p>The question is whether we can understand where, why — and what should happen next.</p>
<h3>Explore ScreenConnect Digital™</h3>
<p>Learn more about the demonstrator and our research direction:</p>
<p><Link href="/research/screenconnect" className="inline-flex min-h-12 items-center rounded-full bg-teal-900 px-6 py-3 font-bold !text-white !no-underline hover:bg-teal-800">Explore ScreenConnect Digital™ →</Link></p>
<p><strong>BloomShield CIC</strong></p>
<p><em>Protect. Prevent. Empower.</em></p>
</InsightArticle></>;
}
