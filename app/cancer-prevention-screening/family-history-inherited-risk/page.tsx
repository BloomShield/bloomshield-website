import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import { AtAGlance, BloomShieldExplains, Breadcrumbs, ContentsNav, EditorialInformation, ExternalLink, FaqList, MedicalSafetyAlert, RelatedProgrammes, ResourceList, ReviewDate, ScreeningArticleHero } from "../components";
import { familyHistoryEvidence, familyHistoryFaqs, officialFamilyHistoryResources, officialLinks } from "../content";
import { screeningArticles } from "../articles";

const title = "Family History and Inherited Cancer Risk | BloomShield CIC";
const description = "Understand how family history may affect cancer risk, patterns worth discussing, genetic assessment and testing, possible results, and why inherited risk is not destiny.";
const article = screeningArticles.familyHistory;

export const metadata = createMetadata({ title, description, path: article.path, absoluteTitle: true, socialImage: { url: "/images/family-history-lifestyle-hero.webp", width: 1692, height: 930, alt: "An adult daughter and her older father having a warm conversation at home" } });

const contents = [
  { id: "at-a-glance-title", title: "Family History at a Glance" },
  { id: "family-history", title: "What Family History Can Tell Us" },
  { id: "patterns", title: "Patterns That May Be Relevant" },
  { id: "both-sides", title: "Both Sides of a Family Matter" },
  { id: "genes", title: "Inherited Variants and Cancer Risk" },
  { id: "collecting-information", title: "Collecting Useful Family Information" },
  { id: "assessment", title: "Assessment, Referral and Genetic Testing" },
  { id: "results", title: "What Results May Mean" },
  { id: "screening", title: "Screening and Risk Management" },
  { id: "myths", title: "Common Myths" },
  { id: "faqs", title: "Frequently Asked Questions" },
  { id: "evidence", title: "Evidence and References" },
  { id: "official-resources", title: "Official NHS Resources" },
  { id: "bloomshield-help", title: "How BloomShield Helps" },
];

export default function FamilyHistoryPage() {
  const glance = [
    { label: "What family history means", value: <>Cancer patterns in relatives can sometimes suggest a higher inherited risk, but many families include cancer without an inherited syndrome.</> },
    { label: "What details help", value: <>Cancer type, age at diagnosis, related cancers, more than one cancer in one person and any known genetic result.</> },
    { label: "Which relatives count", value: <>Information from maternal and paternal relatives can both matter.</> },
    { label: "Who to ask", value: <>Start with your GP. They may assess the pattern or refer you to a specialist genetics service.</> },
    { label: "Genetic testing", value: <>Testing is not automatically useful for everyone and may be preceded by genetic counselling or specialist assessment.</> },
    { label: "Symptoms", value: <><strong>Family-risk assessment and screening do not replace medical assessment of a new or concerning symptom.</strong></> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path={article.path} breadcrumb="Family History and Inherited Risk" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical" medicalAbout={[...article.medicalSubjects]}/>
    <Breadcrumbs current="Family History and Inherited Risk" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>
    <ScreeningArticleHero title="Family History and Inherited Cancer Risk" intro="Some family patterns can point to an inherited susceptibility to cancer, but family history does not determine what will happen to one person. A careful assessment can clarify whether specialist advice or testing may be useful." imageSrc="/images/family-history-lifestyle-hero.webp" imageAlt="An adult daughter and her older father having a warm conversation at home" accent="blue" eyebrow="Evidence-led cancer risk guide"><ExternalLink href={officialLinks.nhsCancerRiskGenes} className="button-primary">Read official NHS genetic-risk guidance</ExternalLink><a href="#article-contents" className="button-secondary">Read Our Guide <ArrowRight aria-hidden="true" size={17}/></a></ScreeningArticleHero>

    <div className="container-page space-y-8 py-10 sm:py-14"><AtAGlance title="Family History and Inherited Risk at a Glance" items={glance}/><MedicalSafetyAlert title="Important: Risk Is Not Destiny" programme="family"/><ReviewDate/></div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14"><ContentsNav items={contents}/><article className="health-prose min-w-0">
      <section id="family-history"><h2>2. What Family History Can Tell Us</h2><p>Most cancers are not caused solely by an inherited cancer syndrome. Cancer is common, especially at older ages, so more than one diagnosis in a family does not automatically mean there is a pathogenic genetic variant.</p><BloomShieldExplains id="risk-not-destiny" title="Family History Can Change Risk Without Determining Your Future"><p><strong>An inherited susceptibility can increase chance; it does not make cancer inevitable.</strong> People in the same family can have different outcomes because genes are only one part of risk.</p></BloomShieldExplains><p>This guide describes assessment in England. Genetics and surveillance pathways differ across the UK and eligibility can change.</p></section>

      <section id="patterns"><h2>3. Patterns That May Be Relevant</h2><p>A healthcare professional considers the whole pattern rather than one detail. Features that may be relevant include several relatives with the same or related cancers, cancer diagnosed at an unusually young age, one person having more than one primary cancer, cancer affecting both paired organs, or a known pathogenic variant in the family.</p><p>The significance depends on who was affected, their age and how relatives are connected. Do not use a checklist to calculate your own risk; speak to a GP or genetics professional.</p></section>

      <section id="both-sides"><h2>4. Both Sides of a Family Matter</h2><p>Inherited variants can be passed through any parent, so maternal and paternal family histories both matter. For example, a pattern of breast and ovarian cancer on a father’s side can still be relevant to BRCA assessment.</p><p>Include parents, children, siblings, grandparents, aunts, uncles and, where known, more distant relatives. Family structures and biological relationships can be complex; share only what you know and are comfortable discussing.</p></section>

      <section id="genes"><h2>5. Inherited Variants and Cancer Risk</h2><p>BRCA1 and BRCA2 are examples of genes in which a pathogenic variant can increase the risk of certain breast, ovarian, prostate or pancreatic cancers. Lynch syndrome is caused by pathogenic variants in DNA-repair genes and can increase the risk of bowel, womb and some other cancers.</p><p>These examples do not form a complete catalogue. Having cancer in a family does not prove that a variant is present, and a variant can affect relatives differently.</p></section>

      <section id="collecting-information"><h2>6. Collecting Useful Family Information</h2><p>If possible, record:</p><ul><li>which relative had cancer and whether they are on the maternal or paternal side</li><li>the cancer type and where it started</li><li>age at diagnosis and, if relevant, age at death</li><li>whether one relative had more than one primary cancer or cancer in both paired organs</li><li>any pathology detail or known genetic-test result that the relative is willing to share</li></ul><p>Family recollections may be incomplete or uncertain. Label what is uncertain and do not delay asking for advice because you cannot obtain every detail.</p></section>

      <section id="assessment"><h2>7. Assessment, Referral and Genetic Testing</h2><p>Start with your GP if you are concerned. They can take a family history and check current referral criteria. A specialist genetics service may build a more detailed family tree, assess the pattern and discuss whether testing could answer a useful clinical question.</p><p>Testing often starts with a relative who has had cancer because this can make the result easier to interpret. NICE guidance recommends discussing the possible benefits, limitations, family implications and the possibility of an uncertain or uninformative result before testing.</p></section>

      <section id="results"><h2>8. What Results May Mean</h2><h3>A Pathogenic Variant Is Found</h3><p>This may explain part of the family pattern and lead to discussion of surveillance, risk-reducing options or testing for adult relatives. It does not mean cancer is inevitable.</p><h3>No Pathogenic Variant Is Found</h3><p>This may be reassuring in some contexts, particularly when testing for a known family variant. In other contexts it may not explain the family pattern, and advice may still be based on family history.</p><h3>A Variant of Uncertain Significance Is Found</h3><p>This means there is not enough evidence to know whether the variant affects risk. It should not be treated as a confirmed disease-causing result. Genetics services can explain whether future reinterpretation is possible.</p></section>

      <section id="screening"><h2>9. Screening and Risk Management</h2><p>Some people at increased inherited risk may be offered surveillance or other risk-management options outside routine population screening. Recommendations depend on the gene, cancer type, age, sex, organs present, family history and personal preferences.</p><p>Explore the Library’s <Link href="/cancer-prevention-screening/breast-screening" className="health-inline-link">NHS Breast Screening</Link>, <Link href="/cancer-prevention-screening/bowel-screening" className="health-inline-link">NHS Bowel Cancer Screening</Link> and <Link href="/cancer-prevention-screening/psa-test" className="health-inline-link">PSA Test</Link> guides for general programme context. High-risk pathways are not interchangeable with routine invitations.</p><p>Whatever your family history or test result, contact your GP about a new or unusual change. The <Link href="/cancer-prevention-screening/cancer-symptoms" className="health-inline-link">Cancer Symptoms guide</Link> explains why symptoms should not wait for screening or genetics review.</p></section>

      <section id="myths"><h2>10. Common Myths</h2><h3>“Cancer on my father’s side does not count.”</h3><p>Incorrect. Relevant variants can be inherited through either parent.</p><h3>“A pathogenic variant means I will definitely get cancer.”</h3><p>No. It can increase risk but does not predict an individual outcome.</p><h3>“A negative test means my cancer risk is zero.”</h3><p>No. Meaning depends on the test and family context, and everyone retains some cancer risk.</p></section>

      <section id="faqs"><h2>11. Frequently Asked Questions</h2><FaqList faqs={familyHistoryFaqs}/></section>
      <section id="evidence"><h2>12. Evidence and References</h2><p>These NHS and NICE sources support family-history collection, genetics referral, counselling and interpretation of results.</p><ResourceList resources={familyHistoryEvidence}/></section>
      <section id="official-resources"><h2>13. Official NHS Resources</h2><ResourceList resources={officialFamilyHistoryResources}/></section>
      <section id="bloomshield-help"><h2>14. How BloomShield Helps</h2><p>Clear information is one part of equitable access. BloomShield’s connected programmes support understanding, practical access and navigation across screening and care pathways.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></section>
      <div className="mt-12"><EditorialInformation evidenceSources="NHS, NHS England Genomics Education Programme and NICE"/></div>
    </article></div>
  </>;
}
