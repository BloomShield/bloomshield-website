import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import {
  AtAGlance, BloomShieldExplains, Breadcrumbs, ContentsNav, EditorialInformation,
  ExternalLink, FaqList, MedicalSafetyAlert, RelatedProgrammes, ResourceList,
  ReviewDate, ScreeningArticleHero,
} from "../components";
import { officialLinks, officialPsaResources, psaEvidence, psaFaqs } from "../content";
import { screeningArticles } from "../articles";

const title = "PSA Test Explained: Benefits, Limitations and NHS Access | BloomShield CIC";
const description = "Understand what a PSA blood test measures, why it may be offered, what raised or normal results can mean, and the benefits and limitations of PSA testing.";
const article = screeningArticles.psa;

export const metadata = createMetadata({ title, description, path: article.path, absoluteTitle: true });

const contents = [
  { id: "at-a-glance-title", title: "PSA Test at a Glance" },
  { id: "what-is-psa", title: "What Is PSA?" },
  { id: "what-is-a-psa-test", title: "What Is a PSA Test?" },
  { id: "why-offered", title: "Why Might a PSA Test Be Offered?" },
  { id: "blood-test", title: "How the Blood Test Is Performed" },
  { id: "results", title: "What a PSA Result May Mean" },
  { id: "benefits", title: "Benefits of PSA Testing" },
  { id: "limitations", title: "Limitations and Possible Harms" },
  { id: "informed-choice", title: "PSA Testing and Informed Choice" },
  { id: "symptoms", title: "Prostate Symptoms and When to Contact Your GP" },
  { id: "myths", title: "Common Myths About PSA" },
  { id: "faqs", title: "Frequently Asked Questions" },
  { id: "evidence", title: "Evidence and References" },
  { id: "official-resources", title: "Official NHS Resources" },
  { id: "bloomshield-help", title: "How BloomShield Helps" },
];

export default function PsaTestPage() {
  const glance = [
    { label: "What PSA stands for", value: <>Prostate-specific antigen, a protein made by the prostate.</> },
    { label: "What the test is", value: <>A blood test that measures the amount of PSA in the blood.</> },
    { label: "Why it may be offered", value: <>To help assess symptoms or risk, or monitor a known prostate condition or treatment.</> },
    { label: "What a raised result means", value: <>PSA is higher than expected in that clinical context. It does not diagnose prostate cancer.</> },
    { label: "What a normal result means", value: <>It may reduce concern, but it does not completely rule prostate cancer out.</> },
    { label: "Screening position", value: <><strong>There is no general NHS population-screening programme for prostate cancer. The UK National Screening Committee recommends PSA testing every 2 years for men aged 45–61 with a pathogenic BRCA2 variant and a relevant family history. How eligible men are identified and invited may continue to develop.</strong></> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path={article.path} breadcrumb="PSA Test" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical" medicalAbout={[...article.medicalSubjects]}/>
    <Breadcrumbs current="PSA Test" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>

    <ScreeningArticleHero title="PSA Test" intro="A PSA test measures prostate-specific antigen in the blood. It can support assessment and informed decisions, but a raised result does not diagnose prostate cancer and a result within the expected range cannot completely rule it out." imageSrc="/images/psa-test-lifestyle-hero.webp" imageAlt="A Black man reading plain health information in a warm home setting" accent="blue"><ExternalLink href={officialLinks.nhsPsaTest} className="button-primary">Read current NHS PSA test guidance</ExternalLink><a href="#article-contents" className="button-secondary">Read Our Guide <ArrowRight aria-hidden="true" size={17}/></a></ScreeningArticleHero>

    <div className="container-page space-y-8 py-10 sm:py-14">
      <AtAGlance title="PSA Test at a Glance" items={glance}/>
      <MedicalSafetyAlert title="Important: PSA Testing and Symptoms" programme="psa"/>
      <ReviewDate/>
    </div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14">
      <ContentsNav items={contents}/>
      <article className="health-prose min-w-0">
        <section id="what-is-psa"><h2>2. What Is PSA?</h2><p>PSA stands for prostate-specific antigen. It is a protein made by cells in the prostate and is present in semen and in small amounts in blood.</p><p>PSA levels can change for several reasons. Prostate cancer can raise PSA, but so can benign prostate enlargement, inflammation, infection and recent activities or procedures that affect the prostate.</p></section>

        <section id="what-is-a-psa-test"><h2>3. What Is a PSA Test?</h2><p>A PSA test is a laboratory blood test. It measures the concentration of PSA in a blood sample and provides one piece of information for a clinician to interpret alongside symptoms, age, examination findings, personal risk and previous results.</p><p>PSA is prostate-specific, not cancer-specific. The test cannot by itself confirm or exclude prostate cancer.</p></section>

        <section id="why-offered"><h2>4. Why Might a PSA Test Be Offered?</h2><p>A clinician may offer or discuss PSA testing when someone has symptoms that could relate to the prostate, has particular risk factors, or is being monitored for a known prostate condition or after treatment.</p><p>Men and anyone with a prostate can ask a GP about PSA testing. This should lead to a balanced discussion rather than an automatic test. The possible benefits and harms depend on the person&apos;s circumstances and preferences.</p><h3>Population and Targeted Screening Are Different</h3><p>There is no general NHS population-screening programme for prostate cancer. The UK National Screening Committee has recommended targeted screening every 2 years for a specific high-risk group: men aged 45–61 with a pathogenic BRCA2 variant and a relevant family history of breast, ovarian, pancreatic or prostate cancer. It does not recommend targeted screening for other risk groups.</p><p>Ministers in England have agreed to implement a nationally managed approach for this defined group. How eligible men are identified and invited may continue to develop, so people with a known genetic variant should follow advice from their genetics or clinical team and current official NHS guidance.</p></section>

        <section id="blood-test"><h2>5. How the Blood Test Is Performed</h2><p>A healthcare professional takes a blood sample from a vein, usually in the arm. The sample is sent to a laboratory and the requesting service explains how the result will be communicated.</p><p>Current NHS guidance advises avoiding ejaculation, anal sex, vigorous exercise and cycling for 48 hours before the test because these can raise PSA temporarily. Tell the clinician about urinary or prostate infections, recent prostate procedures and medicines, and follow the instructions from the service arranging the test.</p></section>

        <section id="results"><h2>6. What a PSA Result May Mean</h2><h3>PSA Higher Than Expected</h3><p>A raised result does not diagnose prostate cancer. The clinician may repeat the test, assess for infection or inflammation, examine the prostate, review risk factors or refer for investigations such as MRI. NICE advises against deciding on biopsy from PSA alone.</p><h3>PSA Within the Expected Range</h3><p>This may make prostate cancer less likely in the current context, but it does not completely rule it out. Persistent symptoms or ongoing clinical concern may still need review.</p><h3>Changes Over Time</h3><p>When PSA is monitored, the pattern over time may be considered alongside other clinical information. Do not compare your result with a single online threshold because interpretation varies with context and pathway.</p><BloomShieldExplains id="psa-is-not-a-diagnosis" title="PSA Is Not a Cancer Diagnosis"><p><strong>A raised PSA result does not automatically mean prostate cancer.</strong> PSA can rise for several reasons. Equally, a result within the expected range cannot completely rule prostate cancer out. The result must be interpreted with your symptoms, risk factors and other clinical information.</p></BloomShieldExplains></section>

        <section id="benefits"><h2>7. Benefits of PSA Testing</h2><ul><li>It is a straightforward blood test that can help identify when further assessment may be appropriate.</li><li>It may help detect some prostate cancers before they cause symptoms.</li><li>It can support monitoring of a known prostate condition or response after treatment.</li><li>Used with other clinical information, it can contribute to shared decisions about MRI and other investigations.</li></ul></section>

        <section id="limitations"><h2>8. Limitations and Possible Harms</h2><ul><li><strong>False positive:</strong> a raised PSA may lead to anxiety and further tests even though cancer is not present.</li><li><strong>False negative:</strong> some prostate cancers do not produce a raised PSA.</li><li><strong>Overdiagnosis:</strong> testing can identify a slow-growing cancer that would never have caused harm, but the diagnosis may lead to monitoring or treatment.</li><li><strong>Further investigations have trade-offs:</strong> MRI and biopsy can create uncertainty, discomfort or complications.</li><li><strong>Treatment can cause lasting side effects:</strong> finding a low-risk cancer may expose someone to treatment harms without a clear benefit.</li></ul></section>

        <section id="informed-choice"><h2>9. PSA Testing and Informed Choice</h2><p>There is no single correct choice for every person. A useful discussion considers why the test is being considered, symptoms, age, ethnicity, family history, known genetic risk, general health, preferences and willingness to have further investigations.</p><p>Ask what a raised or normal result would change, what follow-up could involve and how uncertainty will be managed. Choosing not to have a PSA test now does not prevent you from seeking advice later if symptoms or circumstances change.</p></section>

        <div className="my-10"><MedicalSafetyAlert title="Symptoms Need Clinical Assessment" programme="psa"/></div>

        <section id="symptoms"><h2>10. Prostate Symptoms and When to Contact Your GP</h2><p>Contact your GP about urinary changes such as difficulty starting or maintaining urine flow, needing to urinate more often, blood in urine, erectile difficulties, unexplained pain or other changes that concern you. These symptoms often have causes other than cancer, including benign prostate enlargement.</p><p>A PSA test is only one possible part of assessment. Do not use a previous PSA result as a reason to delay medical advice if symptoms persist, change or worsen.</p><ExternalLink href={officialLinks.nhsProstateSymptoms} className="health-inline-link">Read current NHS prostate cancer symptom guidance</ExternalLink></section>

        <section id="myths"><h2>11. Common Myths About PSA</h2><h3>“A High PSA Means I Have Prostate Cancer.”</h3><p>No. Several non-cancer conditions and recent activities can raise PSA. Further assessment is needed to understand the result.</p><h3>“A Normal PSA Rules Out Prostate Cancer.”</h3><p>No. Some prostate cancers do not cause a raised PSA.</p><h3>“Every Man Over 50 Should Be Tested Regularly.”</h3><p>No blanket recommendation applies. The UK NSC does not recommend general-population PSA screening. Testing should follow informed discussion and current clinical guidance.</p><h3>“The New Targeted Programme Is Screening for Everyone.”</h3><p>No. The recommendation is limited to PSA testing every 2 years for men aged 45–61 who have both a pathogenic BRCA2 variant and a relevant family history of breast, ovarian, pancreatic or prostate cancer. It does not extend to all men with a family history, all Black men, BRCA1 carriers or the wider male population.</p></section>

        <section id="faqs"><h2>12. Frequently Asked Questions</h2><FaqList faqs={psaFaqs}/></section>
        <section id="evidence"><h2>13. Evidence and References</h2><p>These primary sources reflect the current NHS test information, the March 2026 UK screening recommendation, England&apos;s targeted-programme position and NICE diagnostic guidance.</p><ResourceList resources={psaEvidence}/></section>
        <section id="official-resources"><h2>14. Official NHS Resources</h2><p>Use these sources for current access, preparation, screening-policy and follow-up information. Arrangements differ across UK nations.</p><ResourceList resources={officialPsaResources}/><p>Future prostate-risk and <Link href="/cancer-prevention-screening" className="health-inline-link">Cancer Symptoms topics remain marked Coming soon in the Information Library</Link>.</p></section>
        <section id="bloomshield-help"><h2>15. How BloomShield Helps</h2><p>Balanced, accessible information supports informed choice without turning a complex test into an unofficial screening recommendation.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve informed access <ArrowRight aria-hidden="true" size={17}/></Link></section>
        <div className="mt-12"><EditorialInformation evidenceSources="NHS, GOV.UK, UK NSC and NICE"/></div>
      </article>
    </div>
  </>;
}
