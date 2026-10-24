import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "from-gaps-to-the-360-journey")!;
const authors = getInsightAuthors(article);
const articleMetadata = createInsightMetadata({ title: article.title + " | BloomShield", description: article.seoDescription!, path: article.canonicalUrl!, socialImage: article.socialImage!, socialImageAlt: article.socialImageAlt!, socialImageWidth: article.socialImageWidth!, socialImageHeight: article.socialImageHeight!, type: "article", keywords: article.tags, authors: authors.map(author => author.name), datePublished: article.datePublished, dateModified: article.dateModified });
export const metadata = { ...articleMetadata, title: { absolute: article.title + " | BloomShield" } };
const related = [{"label":"Part 1: Before We Talk About the Gaps","href":"/insights/series-collections/before-we-talk-about-the-gaps"},{"label":"Part 2: Breast Screening Gaps: What Are We Actually Seeing?","href":"/insights/series-collections/breast-screening-gaps-what-are-we-actually-seeing"},{"label":"Local Lens: Greater Manchester","href":"/insights/local-lens/greater-manchester"},{"label":"ScreenConnect™ Digital research demonstrator","href":"/research/screenconnect"}];
export default function FromGapsJourneyPage() {
 const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.seoDescription, image: SITE_URL + article.socialImage, datePublished: article.datePublished, dateModified: article.dateModified, author: authors.map(author => ({ "@type": "Person", name: author.name })), publisher: { "@type": "Organization", name: insightPublisher.name, url: SITE_URL + "/insights", logo: { "@type": "ImageObject", url: SITE_URL + "/bloomshield-square-lockup.png" } }, mainEntityOfPage: SITE_URL + article.canonicalUrl, articleSection: article.collection, isPartOf: { "@type": "CreativeWorkSeries", name: article.collection }, position: article.seriesPosition, keywords: article.tags?.join(", "), inLanguage: "en-GB" };
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
 <InsightArticle category={article.area} crossTag={article.collection!} subtitle="Part 3 of 3 · The final part" title={article.title} articleSlug={article.slug} date={article.publishedAt!} dateIso={article.publishedAtIso!} readTime="4 min read" authors={authors} publisher={insightPublisher.name} standfirst={article.description} image={article.socialImage!} imageAlt={article.imageAlt!} heroClassName="aspect-[1672/941]" heroImageClassName="object-contain object-center" domains={["People", "Partnerships", "Systems", "Equity", "Impact"]} tags={article.tags} interactionsAfterManuscript implementationLesson={<p>Understand where the journey stopped, why it stopped — and what should happen next.</p>} previous={{label: "Part 2: Breast Screening Gaps: What Are We Actually Seeing?", href: "/insights/series-collections/breast-screening-gaps-what-are-we-actually-seeing"}} relatedContent={<section className="insight-article-end-section" aria-labelledby="related-insights"><h2 id="related-insights">Related Insights</h2><div className="mt-6 divide-y divide-teal-900/10">{related.map(item => <Link key={item.href} href={item.href} data-insights-event="insights_related_content_click" className="block py-5 font-bold text-teal-700">{item.label} →</Link>)}</div></section>}>
 <nav aria-label="Breadcrumb" className="mb-8 text-sm"><Link href="/insights">Insights</Link> / <Link href="/insights/series-collections">Series &amp; Collections</Link> / Breast Cancer Awareness Month / Part 3</nav>
 <p>A screening gap is not just a number.</p>
<p>It is a journey that stopped somewhere.</p>
<p>In <Link href="/insights/series-collections/before-we-talk-about-the-gaps">Part 1</Link> of this Breast Cancer Awareness Month series, we recognised the people and services working every day to improve prevention, screening and earlier diagnosis.</p>
<p>In <Link href="/insights/series-collections/breast-screening-gaps-what-are-we-actually-seeing">Part 2</Link>, we asked where the gaps are — and why they persist.</p>
<p>Through <Link href="/insights/local-lens">BloomShield Local Lens</Link>, we have seen that those gaps do not look the same everywhere.</p>
<p>In <Link href="/insights/local-lens/medway-kent">Medway &amp; Kent</Link>, inequality can sit beneath apparently reasonable overall screening coverage.</p>
<p>In <Link href="/insights/local-lens/liverpool">Liverpool</Link>, bringing screening closer to communities became part of the response.</p>
<p>In <Link href="/insights/local-lens/devon-cornwall-isles-of-scilly">Devon, Cornwall &amp; the Isles of Scilly</Link>, trust and local community infrastructure came into focus.</p>
<p>In <Link href="/insights/local-lens/west-london">West London</Link>, proximity to world-class services did not guarantee participation.</p>
<p>And in <Link href="/insights/local-lens/greater-manchester">Greater Manchester</Link>, targeted support and pathway adaptation showed that participation can move when the system responds differently.</p>
<p>Different places. Different barriers. Different responses.</p>
<p>But one question keeps returning:
What happens to the individual person inside the gap?
That is where the idea of the 360° cancer screening journey begins.</p>
<p>Screening is not a single event.</p>
<p>It is a pathway:</p>
<blockquote><p>Invitation → participation → screening → result → investigation → referral → follow-up → completion → outcome</p></blockquote>
<p>At any point, the journey can stall.</p>
<p>A barrier can appear.</p>
<p>Support can be offered.</p>
<p>A next action can be taken.</p>
<p>And the outcome can change.</p>
<p>So instead of asking only:</p>
<p>Did this person attend?</p>
<p>we also need to ask:</p>
<p>What got in the way? What support was offered? What happened next?</p>
<hr className="my-12 border-0 border-t border-teal-900/10 sm:my-16" />
<blockquote><p>That is the implementation question behind ScreenConnect™ Digital 360 Journey Research Demonstrator.</p></blockquote>
<p>ScreenConnect is being developed by BloomShield to explore how person-centred pathway intelligence could help researchers, screening programmes, community organisations and health-system teams understand the journey behind the numbers.</p>
<p><Link href="/research/screenconnect" data-insights-event="insights_related_content_click" className="font-bold text-teal-700">Explore ScreenConnect Digital →</Link></p>
<p>At its simplest, the model follows:</p>
<blockquote><p>Person → Pathway → Barrier → Intervention → Next Action → Outcome → Learning</p></blockquote>
<p>The aim is not to replace existing screening systems or population-health dashboards.</p>
<p>It is to explore the layer beneath them:
the person-centred journey inside the gap.
ScreenConnect is currently a research demonstrator. It is not a clinically deployed system and should not be presented as NHS validated or endorsed.</p>
<p>And this is where we want collaboration.</p>
<p>We are interested in working with researchers, NHS teams, cancer alliances, screening services, community organisations and other end users to test the questions, refine the model and understand what a useful 360° journey view should actually look like in practice.</p>
<p>Because if we can identify where the gap is, the next challenge is to understand <strong>where the journey stopped, why it stopped — and what should happen next.</strong></p>
<p>That is the question we want to explore with researchers, NHS teams, cancer alliances, screening services, community organisations and other end users.</p>
<p><strong>The 360° journey is not a finished answer. It is a framework we want to test, refine and validate with the people who may ultimately use it.</strong></p>
<p><strong>Understand → Validate → Implement → Evaluate → Scale.</strong></p>
<p><strong>BloomShield CIC</strong></p>
<p><em>From evidence to access. From access to action.</em></p>
 </InsightArticle></>;
}
