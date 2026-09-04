import type { Metadata } from "next";
import Link from "next/link";
import { InsightArticle } from "@/components/insight-article";
import { getInsightAuthors, insightPublisher, insights } from "@/lib/insights";
import { createInsightMetadata, ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

const article = insights.find(item => item.slug === "from-diagnostics-to-access-africa")!;
const authors = getInsightAuthors(article);
const path = "/insights/conversations/from-diagnostics-to-access-africa";
const standfirst = "What it will take to build resilient diagnostic ecosystems across Africa";
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

const relatedContent = <section aria-labelledby="related-insights">
  <h2 id="related-insights">Related Insights</h2>
  <div className="mt-6 rounded-[1.5rem] border border-teal-900/10 bg-white p-6">
    <p className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">Evidence &amp; Policy</p>
    <h3 className="mt-3 font-display text-2xl font-semibold">HPV Self-Testing Is a Major Step Forward — But Will It Close the Screening Gap?</h3>
    <p className="mt-3 leading-7 text-slate-600">What England’s national HPV self-testing offer reveals about access, follow-up and equitable pathway completion.</p>
    <Link href="/insights/evidence-policy/hpv-self-testing-screening-gap" data-insights-event="insights_related_content_click" className="mt-5 inline-flex font-bold text-teal-700 underline decoration-teal-700/30 underline-offset-4">Read the Insight</Link>
  </div>
</section>;

export default function FromDiagnosticsToAccessPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}${canonicalPath}#article`,
    headline: article.title,
    alternativeHeadline: standfirst,
    description: seoDescription,
    image: { "@type": "ImageObject", url: `${SITE_URL}${socialImage}`, width: article.socialImageWidth ?? 1672, height: article.socialImageHeight ?? 941, caption: socialImageAlt },
    datePublished: article.datePublished ?? article.publishedAtIso,
    dateModified: article.dateModified ?? article.publishedAtIso,
    author: authors.map(author => ({ "@type": "Person", name: author.name, description: author.biography, ...(author.credentials ? { jobTitle: author.credentials } : {}), affiliation: { "@type": "Organization", name: "BloomShield CIC", url: SITE_URL } })),
    contributor: {
      "@type": "Person",
      name: "Olusola ‘Shola’ Ogunbowale",
      jobTitle: "Manager, Public Health and Global Exports",
      worksFor: { "@type": "Organization", name: "QIAGEN", url: "https://www.qiagen.com/" },
    },
    publisher: { "@type": "Organization", name: insightPublisher.name, url: `${SITE_URL}/insights`, parentOrganization: { "@type": "Organization", name: ORGANIZATION_NAME, url: SITE_URL }, logo: { "@type": "ImageObject", url: `${SITE_URL}/bloomshield-square-lockup.png`, width: 545, height: 590 } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${canonicalPath}` },
    articleSection: "Conversations",
    keywords: keywords.join(", "),
    about: keywords.map(name => ({ "@type": "Thing", name })),
    inLanguage: "en-GB",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <InsightArticle
      category="Conversations"
      crossTag="Olusola ‘Shola’ Ogunbowale | QIAGEN"
      title={article.title}
      articleSlug={article.slug}
      date={article.publishedAt!}
      dateIso={article.publishedAtIso!}
      authors={authors}
      publisher={insightPublisher.name}
      standfirst={standfirst}
      image={article.image!}
      imageAlt={article.imageAlt!}
      heroClassName="aspect-[3/1]"
      domains={["People", "Partnerships", "Systems", "Innovation", "Equity", "Impact"]}
      ccpeLens={article.ccpeLens}
      tags={article.tags}
      reflectionQuestion={article.reflectionQuestion}
      linkedinDiscussionUrl={article.linkedinDiscussionUrl}
      engagementContactLabel={article.engagementContactLabel}
      relatedContent={relatedContent}
      implementationLesson={<p>Availability is not the same as access. Diagnostic innovation creates public-health value only when affordable technologies, practical infrastructure, workforce capacity, trusted regulation, sustainable procurement and complete care pathways work together.</p>}
      previous={{ label: "HPV self-testing and the screening gap", href: "/insights/evidence-policy/hpv-self-testing-screening-gap" }}
      next={{ label: "Conversations Across the Cancer Care Ecosystem", href: "/insights/conversations" }}
    >
      <section aria-labelledby="conversation-introduction">
        <p className="insight-kicker">BloomShield Conversations Across the Cancer Care Ecosystem</p>
        <div id="conversation-introduction">
          <p>Across much of Africa, the challenge is no longer simply that diagnostic technologies for diseases such as HPV, HIV and tuberculosis do not exist. They do.</p>
          <p>The harder problem is that too many people still cannot reach them, afford them, access them early enough, or move efficiently from a diagnostic result into the next stage of care.</p>
          <p>That gap between technological possibility and real-world access sits at the heart of this edition of BloomShield Conversations Across the Cancer Care Ecosystem.</p>
          <p>Dr Femi Olaleye spoke with Olusola “Shola” Ogunbowale, Manager, Public Health and Global Exports, about the barriers that continue to limit access to quality diagnostics across African health systems; the need for technologies designed around local infrastructure; the potential of HPV molecular testing and self-sampling; the conditions required for successful localisation; and what a genuinely resilient African diagnostics ecosystem could look like.</p>
          <p>The conversation points to a central implementation question: diagnostic innovation matters, but its public-health value depends on whether health systems can make that innovation reachable, affordable, sustainable and scalable.</p>
        </div>
      </section>

      <section aria-labelledby="conversation-partner">
        <h2 id="conversation-partner">Conversation partner</h2>
        <p>Olusola “Shola” Ogunbowale works across public health and global exports, with experience of diagnostic technologies and their deployment in African and other low- and middle-income settings. In this conversation, he reflects on the practical barriers between scientific innovation and population-level access.</p>
        <p className="insight-editorial-note"><strong>Editorial note:</strong> The views expressed in the interview are Shola’s own and are presented in the context of this conversation. His professional affiliation is included for identification and context.</p>
      </section>

      <section aria-labelledby="question-1">
        <h2 id="question-1">Question 1</h2>
        <p className="insight-pull-statement">What have those years taught you about the biggest barriers preventing advanced diagnostic technologies from reaching the people who need them most across Africa?</p>
        <p>Affordability, accessibility, funding gaps and weak regulatory oversight are among the biggest barriers to the penetration of quality diagnostic technologies in low- and middle-income settings across Africa.</p>
        <p>Manufacturers, as profit-oriented enterprises, naturally allocate capital to research and development where there is a reasonable margin and return on investment. That is reflected in pricing, which may remain unaffordable for large parts of the population, many of whom are uninsured and rely on daily subsistence income to meet out-of-pocket health expenditure. Low demand can then reduce revenue and further disincentivise investment in product development.</p>
        <p>Infrastructure is another major constraint. Gaps in roads, rail, electricity, cold-chain storage and digital networks mean that many communities still struggle to access diagnostic technologies. At primary healthcare level, where patients often first enter the health system, non-portable technologies and models that depend on advanced laboratory infrastructure or centralised testing can make timely access and follow-up much more difficult.</p>
        <p>Primary healthcare centres are therefore better served by portable technologies capable of delivering accurate results within a single patient visit wherever possible.</p>
        <p>The healthcare funding gap also leaves many countries heavily dependent on international donors and multilateral interventions for diseases that have a major effect on population health. Greater domestic investment in research and development for priority diseases could help change that.</p>
        <p>Regulatory capacity matters as well. Weak oversight can allow products of variable quality to enter markets. Supply chains need regular auditing, and diagnostics should increasingly be treated as a distinct regulatory category rather than simply being absorbed into pharmaceutical and food regulatory systems. The rapid evolution of diagnostics over the past decade or two makes stronger specialist regulatory capacity increasingly important.</p>
      </section>

      <section aria-labelledby="question-2">
        <h2 id="question-2">Question 2</h2>
        <p className="insight-pull-statement">A diagnostic technology can be scientifically excellent and still fail to achieve population-level impact. Beyond the test itself, what needs to be in place for molecular diagnostics to become genuinely accessible and sustainable within African health systems?</p>
        <p>Diagnostic innovations intended for the region need to be deployable in rugged settings characterised by difficult terrain, unreliable electricity, limited internet access and inadequate laboratory infrastructure.</p>
        <p>They also need to take account of shortages in skilled laboratory manpower and make training practical for the healthcare workers who are available. New devices should be designed around the infrastructure gap rather than assuming that stable electricity, digital connectivity and sophisticated laboratory systems are always present.</p>
        <p>For example, technologies capable of operating with solar power could potentially be deployed at primary healthcare centres, where the diagnostic gap is often widest and where the population impact could therefore be greatest.</p>
        <p>Pricing must also be sustainable both for manufacturers and for the people who need the tests. Government policies that expand health-insurance coverage could improve access to quality diagnostics and healthcare more broadly. In short, accessibility and affordability have to be core design considerations, not afterthoughts.</p>
      </section>

      <section aria-labelledby="question-3">
        <h2 id="question-3">Question 3</h2>
        <p className="insight-pull-statement">Cervical cancer remains one of the clearest examples of the gap between available technology and equitable access. From your experience with HPV molecular testing, where do you see the greatest opportunities now for African countries to expand high-performance cervical cancer screening?</p>
        <p>HPV molecular testing gives African health systems an opportunity to expand high-performance cervical screening without depending exclusively on infrastructure-heavy cytology systems or on less sensitive approaches such as visual inspection with acetic acid.</p>
        <p>Self-sampling is particularly important. Women can collect their own samples and send them to a laboratory, with performance that can approach clinician-collected sampling when validated methods are used. This can reduce some of the stigma and clinical barriers associated with screening and may make participation more acceptable in settings where religious, social or practical sensitivities have limited access.</p>
        <p>The wider opportunity is to reach populations that have previously been missed through screening models that are more affordable and less dependent on extensive laboratory infrastructure.</p>
        <p>Where testing models can return results quickly - potentially within the same day - they may also reduce loss to follow-up after a positive result. Longer screening intervals associated with HPV DNA-based strategies can further reduce the number of repeat tests required over time and may lower the long-term cost burden for public health systems.</p>
      </section>

      <section aria-labelledby="question-4">
        <h2 id="question-4">Question 4</h2>
        <p className="insight-pull-statement">The conversation around African health technology is increasingly moving from importing products towards localisation, local manufacturing and stronger regional supply chains. How important do you believe this transition will be, and what would it take for localisation to succeed without compromising quality?</p>
        <p>Localisation requires more than installing production capacity. It depends on technology transfer, appropriate intellectual-property arrangements and stringent quality-control mechanisms.</p>
        <p>The sanctity and enforcement of contractual and financial obligations are also important. Where there is a perception of weak rule of law or excessive bureaucracy in enforcing agreements, that can make technology-transfer partnerships more difficult.</p>
        <p>International organisations can sometimes help de-risk these arrangements. UN agencies such as Unitaid have supported initiatives that encourage procurement of locally manufactured diagnostics, and those kinds of interventions can help create the conditions for localisation to succeed.</p>
        <p>Governments can also participate as third parties in technology-transfer negotiations, act as guarantors of minimum purchase volumes, offer tax incentives, and provide the regulatory and industrial ecosystem needed for local production to become commercially viable.</p>
      </section>

      <section aria-labelledby="question-6">
        <h2 id="question-6">Question 6</h2>
        <p className="insight-pull-statement">Looking ahead five to ten years, what would you most like to see change in Africa’s molecular diagnostics landscape, and what would convince you that the continent has moved from simply adopting technologies to building resilient diagnostic ecosystems of its own?</p>
        <p>Africa has the world’s largest proportion of young people and remains a major frontier for global economic development. Greater adoption of molecular technologies, particularly in diagnostics, can expand markets while also creating significant health and economic benefits.</p>
        <p>The growth of precision-diagnostics start-ups in countries such as Nigeria, Ghana and Kenya is an encouraging sign that the continent is beginning to build more of its own capability.</p>
        <p>But there is still much more to do in local manufacturing. That includes not only finished molecular diagnostic kits, but also basic enabling components such as polymerase enzymes and master mixes. Local production could reduce costs, strengthen self-sufficiency and build greater research capacity across the continent.</p>
        <p>Over the next five to ten years, stronger and more specialised regulatory institutions will also be important to supervise and strengthen the production, distribution and use of diagnostics in different African markets.</p>
      </section>

      <section aria-labelledby="from-availability-to-access">
        <h2 id="from-availability-to-access">From availability to access</h2>
        <p>The thread running through this conversation is straightforward: availability is not the same as access.</p>
        <p>A diagnostic technology may be scientifically strong, internationally validated and commercially available, yet still have limited population impact if the surrounding system cannot support it.</p>
        <p>Affordability matters. Infrastructure matters. Workforce capacity matters. Regulation matters. Procurement matters. Local manufacturing matters. And in screening programmes, the pathway after the test matters just as much as the test itself.</p>
        <p>HPV molecular testing illustrates the opportunity particularly clearly. New testing and self-sampling models can potentially bring cervical screening closer to women who have historically been missed. But the value of that innovation will ultimately be determined by whether programmes can connect testing to results, diagnostic completion, appropriate follow-up and prevention.</p>
        <p>The same principle applies more widely across diagnostics.</p>
        <p>Africa’s next phase of progress will not be measured only by the number of technologies available on the continent. It will also be measured by the strength of the systems around them: technologies designed for real operating environments, sustainable financing, trusted regulation, stronger local supply chains, research capacity and the ability to deliver diagnostics closer to the communities that need them.</p>
        <p>The question, then, is no longer simply: What diagnostic technologies are available?</p>
        <p>It is: What will it take to make them reachable, affordable, sustainable and scalable for the people who need them most?</p>
        <p>That is the real journey from diagnostics to access.</p>
      </section>
    </InsightArticle>
  </>;
}
