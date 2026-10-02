import Image from "next/image";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, SITE_URL } from "@/lib/seo";
const article = insights.find(item => item.slug === "before-we-talk-about-the-gaps")!;
const authors = getInsightAuthors(article);
export const metadata = createInsightMetadata({ title: article.title, description: article.description, path: article.canonicalUrl!, socialImage: article.socialImage!, socialImageAlt: article.socialImageAlt!, socialImageWidth: article.socialImageWidth!, socialImageHeight: article.socialImageHeight!, type: "article", keywords: article.tags, authors: authors.map(author => author.name), datePublished: article.datePublished, dateModified: article.dateModified });
const related = <section className="insight-article-end-section" aria-labelledby="related-insights"><h2 id="related-insights">Related Insights</h2><div className="mt-6 divide-y divide-teal-900/10">{[{label:"Local Lens: Medway & Kent",href:"/insights/local-lens/medway-kent"},{label:"Local Lens: Liverpool",href:"/insights/local-lens/liverpool"},{label:"BloomShield Local Lens",href:"/insights/local-lens"}].map(item => <Link key={item.href} href={item.href} data-insights-event="insights_related_content_click" className="block py-5 font-bold text-teal-700">{item.label} →</Link>)}</div></section>;
export default function BeforeWeTalkAboutTheGapsPage() {
 const jsonLd = {"@context":"https://schema.org","@type":"Article",headline:article.title,description:article.description,image:SITE_URL+article.socialImage,datePublished:article.datePublished,dateModified:article.dateModified,author:authors.map(author=>({"@type":"Person",name:author.name})),publisher:{"@type":"Organization",name:insightPublisher.name,url:SITE_URL+"/insights",logo:{"@type":"ImageObject",url:SITE_URL+"/bloomshield-square-lockup.png"}},mainEntityOfPage:SITE_URL+article.canonicalUrl,articleSection:article.collection,keywords:article.tags?.join(", "),inLanguage:"en-GB"};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/><InsightArticle category={article.area} crossTag={article.collection!} title={article.title} articleSlug={article.slug} date={article.publishedAt!} dateIso={article.publishedAtIso!} authors={authors} publisher={insightPublisher.name} standfirst={article.description} image="/images/insights/breast-cancer-awareness-before-gaps-hero.png" imageAlt="BloomShield Breast Cancer Awareness Month landscape artwork: Before we talk about the gaps, recognising screening teams, with four women outside an NHS building." heroClassName="aspect-[1672/940]" heroImageClassName="object-contain object-center" domains={["People","Partnerships","Systems","Equity","Impact"]} tags={article.tags} linkedinDiscussionUrl={article.linkedinDiscussionUrl} linkedinDiscussionTitle="Join the discussion on LinkedIn →" linkedinBeforeContact interactionsAfterManuscript supportingEditorial={
        <div className="insight-article-end-section">
          <Link
            href="/insights/local-lens"
            data-insights-event="insights_related_content_click"
            className="group flex items-center gap-4 rounded-[1.5rem] border border-teal-900/10 bg-white p-4 transition hover:bg-teal-50/70 sm:gap-5 sm:p-5"
          >
            <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white sm:h-24 sm:w-24">
              <Image
                src="/images/insights/local-lens-overview-thumbnail.png"
                alt=""
                fill
                sizes="(min-width: 640px) 96px, 80px"
                className="object-contain object-center"
              />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-lg font-semibold leading-tight text-teal-900 sm:text-xl">Explore BloomShield Local Lens</span>
              <span className="mt-2 block text-sm italic leading-6 text-slate-600">Cancer screening inequalities across England — local data, local voices, local action.</span>
            </span>
          </Link>
        </div>
      } relatedContent={related} implementationLesson={<p>Equitable access to screening and early diagnosis is the unfinished work.</p>} previous={{label:"Series & Collections",href:"/insights/series-collections"}} next={{label:"BloomShield Local Lens",href:"/insights/local-lens"}}>
<section aria-label="Introduction">
<p>October is Breast Cancer Awareness Month.</p>
<p>It is a time to remind women to know what is normal for them, pay attention to changes, seek help promptly, and attend NHS breast screening when invited.</p>
<p>But before we talk about where the gaps remain, we also want to acknowledge the people working every day to close them.</p>
<p>Over the past few months, as BloomShield has looked more closely at cancer screening inequalities across England, one thing has become increasingly clear:</p>
<p>behind every screening statistic sits an extraordinary amount of work.</p>
<p>GPs and practice teams identify eligible patients and encourage participation.</p>
<p>Primary Care Networks work across practices to improve cancer detection, referrals and screening uptake.</p>
<p>Integrated Care Boards plan services across whole populations and are expected to improve outcomes and reduce health inequalities. England currently has 36 ICBs, supported across seven NHS regions.</p>
<p>Cancer Alliances bring clinical and managerial leaders together across cancer pathways, working with ICBs, providers and other partners to improve services, support earlier diagnosis and reduce variation.</p>
<p>And then there are the people whose work is less visible: radiographers, nurses, mammographers, screening programme managers, administrators, analysts, commissioners, public-health teams, community engagement staff and VCSE partners.</p>
<p>It is easy, when looking at inequalities data, to focus only on what is not working.</p>
<p>But the more closely we look, the clearer it becomes that many people inside the system are already trying very hard to make screening work better.</p>
<p>That effort deserves recognition.</p>
</section>
<section aria-labelledby="breast-awareness">
<h2 id="breast-awareness">Breast awareness still matters</h2>
<p>Breast screening is only one part of early detection.</p>
<p>Women should also know what is normal for their own breasts and seek medical advice if they notice a new lump, swelling, changes in shape or feel, skin changes, nipple changes or unusual discharge.</p>
<p>For women eligible for NHS breast screening, mammography can detect cancers before they can be seen or felt.</p>
<p>The message is simple:</p>
<p>Know your breasts. Notice changes. Seek help promptly. Attend screening when invited.</p>
</section>
<section aria-labelledby="unequal-access">
<h2 id="unequal-access">And yet access is still unequal</h2>
<p>The existence of a national screening programme does not mean every woman has the same opportunity to benefit from it.</p>
<p>That is what BloomShield’s Local Lens series is beginning to show.</p>
<p>In Medway &amp; Kent, we found a mixed picture: headline screening performance has improved in some areas, yet important inequalities persist beneath the averages, particularly among people affected by deprivation, disability and severe mental illness.</p>
<p>That work sits within the wider NHS Kent and Medway system and the Kent and Medway Cancer Alliance, where local partners are already developing targeted approaches to prevention, early diagnosis and screening inequalities.</p>
<p><Link href="/insights/local-lens/medway-kent" data-insights-event="insights_related_content_click" className="font-bold text-teal-700 underline decoration-teal-700/30 underline-offset-4 hover:decoration-teal-700">Read Local Lens: Medway & Kent →</Link></p>
<p>In Liverpool, the problem looks different.</p>
<p>Central and North Liverpool have some of the lowest breast-screening uptake rates in the country. The response has included bringing screening closer to communities through a new mobile breast-screening unit led by NHS University Hospitals of Liverpool Group. The unit began seeing patients in January 2026 and can accommodate up to 50 screenings a day as it rotates through priority locations.</p>
<p>That work sits within NHS Cheshire and Merseyside and the Cheshire &amp; Merseyside Cancer Alliance, where reducing barriers to screening and improving earlier diagnosis are already active priorities.</p>
<p><Link href="/insights/local-lens/liverpool" data-insights-event="insights_related_content_click" className="font-bold text-teal-700 underline decoration-teal-700/30 underline-offset-4 hover:decoration-teal-700">Read Local Lens: Liverpool →</Link></p>
</section>
<section aria-labelledby="screening-barriers">
<h2 id="screening-barriers">The question is not whether people are working hard enough</h2>
<p>They are.</p>
<p>The more useful question is:</p>
<p>Why, despite an established national programme and so many people working to make it succeed, are some women still not reaching services that are already available?</p>
<p>Sometimes the barrier is transport.</p>
<p>Sometimes it is appointment flexibility.</p>
<p>Sometimes it is language, trust, previous experience, disability, caring responsibilities, work, fear or simply the practical cost of attending.</p>
<p>Sometimes the problem is not awareness at all.</p>
<p>It is the design of the pathway.</p>
<p>That distinction matters.</p>
<p>Because if we describe every missed screening appointment as an individual failure to attend, we risk overlooking what the system might change to make attendance easier.</p>
</section>
<section aria-labelledby="unfinished-work">
<h2 id="unfinished-work">The unfinished work</h2>
<p>Breast Cancer Awareness Month gives us an important opportunity to talk about symptoms, breast awareness and screening.</p>
<p>But it should also make us ask a harder question:</p>
<p>Who is still being missed?</p>
<p>The NHS screening infrastructure is an achievement.</p>
<p>So too is the work being done by GPs, PCNs, ICBs, Cancer Alliances, screening teams and community organisations across England.</p>
<p>The unfinished work is ensuring that the benefits of that system are shared more fairly.</p>
<p>At BloomShield, that is where our interest sits:</p>
<p>the gap between services being available and people actually being able to benefit from them.</p>
<p>Because the existence of a screening service is an achievement.</p>
<p>Equitable access to screening and early diagnosis is the unfinished work.</p>
</section>
</InsightArticle></>;
}
