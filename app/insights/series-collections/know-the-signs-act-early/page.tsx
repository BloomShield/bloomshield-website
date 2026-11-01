import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insights } from "@/lib/insights";
import { createInsightMetadata, SITE_URL } from "@/lib/seo";
const article=insights.find(item=>item.slug==="know-the-signs-act-early")!;
const authors=getInsightAuthors(article);
export const metadata={...createInsightMetadata({title:article.seoTitle!,description:article.seoDescription!,path:article.href!,socialImage:article.socialImage!,socialImageAlt:article.socialImageAlt!,socialImageWidth:1536,socialImageHeight:658,socialImageType:"image/jpeg",type:"article",authors:authors.map(a=>a.name),datePublished:article.datePublished,dateModified:article.dateModified,keywords:article.tags}),title:{absolute:article.seoTitle!},publisher:"BloomShield CIC"};
const references=[{label:"Symptoms of lung cancer",href:"https://www.nhs.uk/conditions/lung-cancer/symptoms/",source:"NHS"},{label:"Coughing up blood",href:"https://www.nhs.uk/symptoms/coughing-up-blood/",source:"NHS"},{label:"Lung cancer screening",href:"https://www.nhs.uk/tests-and-treatments/lung-cancer-screening/",source:"NHS"}];
export default function KnowTheSigns(){const jsonLd={"@context":"https://schema.org","@type":"Article",headline:article.title,description:article.seoDescription,image:SITE_URL+article.socialImage,datePublished:article.datePublished,dateModified:article.dateModified,author:{"@type":"Organization",name:"BloomShield CIC"},publisher:{"@type":"Organization",name:"BloomShield CIC",url:SITE_URL,logo:{"@type":"ImageObject",url:SITE_URL+"/bloomshield-square-lockup.png"}},mainEntityOfPage:SITE_URL+article.href,articleSection:article.area,isPartOf:{"@type":"CreativeWorkSeries",name:article.collection,url:SITE_URL+"/insights/series-collections/lung-cancer-awareness-month-2026"},position:1,inLanguage:"en-GB"};return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\u003c")}}/><InsightArticle category={article.area} crossTag={article.collection!} title={article.title} articleSlug={article.slug} date={article.publishedAt!} dateIso={article.publishedAtIso!} authors={authors} publisher="BloomShield CIC" standfirst={article.description} image={article.image!} imageAlt={article.imageAlt!} heroClassName="aspect-[1122/1402] max-w-[640px] mx-auto" heroImageClassName="object-contain object-center" domains={["People","Equity","Impact"]} tags={article.tags} references={references} interactionsAfterManuscript implementationLesson={<p>Recognising a risk is only the beginning. What happens next matters.</p>} previous={{label:"November series",href:"/insights/series-collections/lung-cancer-awareness-month-2026"}} supportingEditorial={<section className="insight-article-end-section"><h2>Explore the campaign</h2><p><Link href="/cancer-prevention-screening/lung-health-checks" className="button-primary">Explore our Lung Cancer Prevention FAQs</Link></p><p><Link href="/insights/series-collections/lung-cancer-awareness-month-2026">Explore the November Lung Cancer Awareness Month Series →</Link></p></section>} relatedContent={<section className="insight-article-end-section"><h2>Related content</h2><p><Link href="/cancer-prevention-screening/cancer-symptoms">Cancer symptoms: when to seek help →</Link></p></section>}><h2>Know the Signs. Act Early.</h2>
<p>Lung cancer does not always announce itself clearly.</p>
<p>Some people experience a persistent cough. Others notice increasing breathlessness, recurring chest infections or unexplained tiredness. Some have no noticeable symptoms during the early stages.</p>
<p>That is one reason awareness matters.</p>
<p>But recognising a possible symptom is only useful when it leads to the next step: seeking appropriate medical advice.</p>
<h2>What symptoms should we recognise?</h2>
<p>According to NHS guidance, possible symptoms of lung cancer include:</p>
<ul><li>A cough that does not go away, including one lasting more than three weeks</li><li>A longstanding cough that changes or gets worse</li><li>Persistent breathlessness</li><li>Chest or shoulder pain</li><li>Coughing up blood</li><li>Chest infections that keep returning or do not improve</li><li>Unexplained weight loss or loss of appetite</li><li>Persistent tiredness</li></ul>
<p>These symptoms do not necessarily mean someone has lung cancer. Many can have other explanations.</p>
<p>Nevertheless, persistent, worsening or concerning symptoms deserve medical assessment.</p>
<p><strong>The message is not to assume the worst. It is not to ignore what may need attention.</strong></p>
<h2>Knowing when to act</h2>
<p>The NHS recommends contacting a GP if you have a cough lasting longer than three weeks or other possible symptoms of lung cancer.</p>
<p>If you cough up blood, seek an urgent GP appointment or NHS 111 advice. If you cough up more than a few spots or streaks of blood, or cough up blood and find it hard to breathe, have a very fast heartbeat or have pain in your chest or upper back, call 999 or go to A&amp;E immediately.</p>
<p>Severe difficulty breathing or other emergency warning signs require immediate help through 999 or A&amp;E, in accordance with NHS guidance.</p>
<p>The practical message is straightforward:</p>
<p><strong>Do not wait for a screening invitation if you are experiencing symptoms.</strong></p>
<p>Clinical assessment of symptoms and routine screening are different routes into care.</p>
<h2>Awareness must reach beyond the individual</h2>
<p>People do not make health decisions in isolation.</p>
<p>Some may struggle to secure appointments. Others may be uncertain about symptoms, worried about a possible diagnosis, unable to communicate comfortably with services, or unsure where to seek help.</p>
<p>These are not simply individual knowledge gaps. They can also reflect barriers in how information, support and healthcare are delivered.</p>
<p>That is why awareness campaigns must consider accessibility, trust, communication and the circumstances in which people live.</p>
<p>An effective message should help someone understand what to do next — not simply tell them that lung cancer exists.</p>
<h2>Recognition is only the beginning</h2>
<p>Throughout November, BloomShield will examine the wider journey.</p>
<p>Our next feature will explore the NHS lung cancer screening offer in England: who may be eligible, how lung health assessments work, and why screening is offered to people at increased risk rather than everyone.</p>
<p>We will then consider barriers to participation and the importance of follow-up.</p>
<p>These questions are central to BloomShield&apos;s commitment to understanding why opportunities for earlier diagnosis do not always translate into equitable outcomes.</p>
<h2>What you can do today</h2>
<p>Be aware of changes in your respiratory health.</p>
<p>Do not dismiss persistent or concerning symptoms.</p>
<p>Seek appropriate medical advice rather than waiting for a screening invitation.</p>
<p>Share reliable information with family, friends and communities.</p>
<p>And remember: seeking medical advice does not mean you have cancer. It means giving yourself the opportunity to understand what may be happening.</p>
<p><strong>Know the signs. Act early. Protect your lungs.</strong></p>
<p><em>BloomShield CIC — Protect. Prevent. Empower.</em></p></InsightArticle></>}