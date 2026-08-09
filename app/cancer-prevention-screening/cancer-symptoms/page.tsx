import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import { AtAGlance, BloomShieldExplains, Breadcrumbs, ContentsNav, EditorialInformation, ExternalLink, FaqList, MedicalSafetyAlert, RelatedProgrammes, ResourceList, ReviewDate, ScreeningArticleHero } from "../components";
import { cancerSymptomsEvidence, cancerSymptomsFaqs, officialCancerSymptomsResources, officialLinks } from "../content";
import { screeningArticles } from "../articles";

const title = "Cancer Symptoms: Changes Worth Checking | BloomShield CIC";
const description = "Understand possible cancer symptoms, which persistent or unusual changes to check with a GP, what may happen next, and why symptoms should not wait for screening.";
const article = screeningArticles.cancerSymptoms;

export const metadata = createMetadata({ title, description, path: article.path, absoluteTitle: true, socialImage: { url: "/images/cancer-symptoms-lifestyle-hero.webp", width: 1693, height: 929, alt: "A Black woman pausing with a mug in a warmly lit living room" } });

const contents = [
  { id: "at-a-glance-title", title: "Cancer Symptoms at a Glance" },
  { id: "what-symptoms-mean", title: "What Possible Cancer Symptoms Mean" },
  { id: "changes-to-check", title: "Changes Worth Checking" },
  { id: "contacting-gp", title: "When and How to Contact Your GP" },
  { id: "screening-and-symptoms", title: "Screening and Symptoms" },
  { id: "what-happens-next", title: "What May Happen Next" },
  { id: "safety-netting", title: "Follow-Up and Safety Netting" },
  { id: "myths", title: "Common Myths" },
  { id: "faqs", title: "Frequently Asked Questions" },
  { id: "evidence", title: "Evidence and References" },
  { id: "official-resources", title: "Official NHS Resources" },
  { id: "bloomshield-help", title: "How BloomShield Helps" },
];

export default function CancerSymptomsPage() {
  const glance = [
    { label: "What to notice", value: <>A new change, or something that persists, worsens, returns or is not normal for you.</> },
    { label: "What symptoms mean", value: <>Most possible cancer symptoms are common and have other causes. A symptom is not a diagnosis.</> },
    { label: "Who to contact", value: <>Contact your GP if a change worries you. Use NHS 111 when you need urgent advice and 999 for a life-threatening emergency.</> },
    { label: "Screening", value: <>Routine screening is generally for people without symptoms. Do not wait for an invitation if you have a concerning change.</> },
    { label: "What may happen", value: <>A GP may examine you, arrange tests, review you later or refer you to a specialist.</> },
    { label: "If symptoms continue", value: <><strong>Ask for another review if a symptom persists, recurs or worsens, or if you remain concerned.</strong></> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path={article.path} breadcrumb="Cancer Symptoms" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical" medicalAbout={[...article.medicalSubjects]}/>
    <Breadcrumbs current="Cancer Symptoms" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>
    <ScreeningArticleHero title="Cancer Symptoms: Changes Worth Checking" intro="Cancer can cause many different symptoms, but most possible symptoms have causes other than cancer. Knowing what is normal for you can help you notice a persistent, unexplained or unusual change that deserves medical advice." imageSrc="/images/cancer-symptoms-lifestyle-hero.webp" imageAlt="A Black woman pausing with a mug in a warmly lit living room" imagePosition={{ base: "90% 50%", desktop: "88% 50%" }} accent="gold" eyebrow="Evidence-led cancer information"><ExternalLink href={officialLinks.nhsCancer} className="button-primary">Read official NHS cancer guidance</ExternalLink><a href="#article-contents" className="button-secondary">Read Our Guide <ArrowRight aria-hidden="true" size={17}/></a></ScreeningArticleHero>

    <div className="container-page space-y-8 py-10 sm:py-14"><AtAGlance title="Cancer Symptoms at a Glance" items={glance}/><MedicalSafetyAlert title="Important: Do Not Wait for Screening" programme="symptoms"/><ReviewDate/></div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14">
      <ContentsNav items={contents}/>
      <article className="health-prose min-w-0">
        <section id="what-symptoms-mean"><h2>2. What Possible Cancer Symptoms Mean</h2><p>Cancer can affect many parts of the body, so there is no single symptom list that diagnoses it. NHS guidance advises speaking to a GP about a symptom or change that is not normal for you and causes concern.</p><BloomShieldExplains id="symptom-not-diagnosis" title="A Possible Symptom Is Not a Diagnosis"><p><strong>Having a possible cancer symptom does not mean that you have cancer.</strong> These changes are common and often have another explanation. Checking a persistent, worsening or unusual change gives a healthcare professional the chance to assess it and decide whether anything more is needed.</p></BloomShieldExplains><p>This guide describes NHS pathways in England. Access and referral arrangements can differ elsewhere in the UK.</p></section>

        <section id="changes-to-check"><h2>3. Changes Worth Checking</h2><p>Notice patterns rather than trying to diagnose yourself. Contact your GP about a change that persists, worsens, returns or feels unusual for you.</p><h3>General Changes</h3><ul><li>a new lump or swelling</li><li>unexplained weight loss, reduced appetite, unusual tiredness, persistent fever or night sweats</li><li>pain that is new, unexplained or does not settle</li><li>unusual bruising or bleeding</li></ul><h3>Changes in a Part of the Body</h3><ul><li>a cough or breathlessness that does not improve, or coughing up blood</li><li>a lasting change in bowel habit, persistent bloating or difficulty swallowing</li><li>blood in urine, needing to urinate more often or pain when urinating</li><li>a new mole or a change in a mole, or a sore or rash that does not heal</li><li>a breast or chest change, including a lump, skin change or nipple change</li><li>unusual vaginal bleeding or discharge, or blood in semen</li></ul><p>This is not a complete list. The NHS cancer page provides current symptom information, including changes that may be harder to see on Black or brown skin.</p></section>

        <section id="contacting-gp"><h2>4. When and How to Contact Your GP</h2><p>You do not need to be certain that a symptom is serious before asking for advice. Tell the GP surgery what has changed, when it started, whether it is worsening or recurring, and how it affects you. Mention medicines, previous tests and relevant personal or family history.</p><p>Ask for communication support, an interpreter, an accessible appointment or permission to bring someone if that would help. For urgent advice when your GP is closed, use <ExternalLink href={officialLinks.nhs111} className="health-inline-link">NHS 111 online</ExternalLink>. Call 999 for a life-threatening emergency.</p></section>

        <section id="screening-and-symptoms"><h2>5. Screening and Symptoms</h2><p>Routine cancer screening is generally designed for eligible people without symptoms. A screening test is not a substitute for clinical assessment and a previous normal result does not rule out every cancer.</p><p>Do not wait for a bowel, cervical, breast or lung screening invitation if you have a concerning change. The Library’s <Link href="/cancer-prevention-screening/bowel-screening" className="health-inline-link">bowel</Link>, <Link href="/cancer-prevention-screening/cervical-screening" className="health-inline-link">cervical</Link>, <Link href="/cancer-prevention-screening/breast-screening" className="health-inline-link">breast</Link> and <Link href="/cancer-prevention-screening/lung-health-checks" className="health-inline-link">lung screening</Link> guides explain those programmes.</p></section>

        <section id="what-happens-next"><h2>6. What May Happen Next</h2><p>A GP will consider the symptom, how long it has been present, your medical history and relevant risk factors. They may examine you, arrange a blood test or imaging, ask you to monitor the change, or refer you to a specialist.</p><p>An urgent suspected-cancer referral is a precaution, not a diagnosis. NICE advises healthcare professionals to explain what the referral is for, what tests may happen, how results will be communicated and where to seek support.</p></section>

        <section id="safety-netting"><h2>7. Follow-Up and Safety Netting</h2><p>Sometimes an initial examination or test does not identify a serious cause. NICE uses the term safety netting for clear follow-up: what changes to watch for, when to return, and who is responsible for reviewing test results.</p><p>Contact the clinician or your GP again if a symptom persists, recurs or worsens, a new symptom develops, you do not receive an expected result or appointment, or you remain worried. It is reasonable to ask what should happen next.</p></section>

        <section id="myths"><h2>8. Common Myths</h2><h3>“A symptom means I have cancer.”</h3><p>No. Most possible cancer symptoms have other causes, but a healthcare professional can assess them.</p><h3>“I should wait a few months to see what happens.”</h3><p>There is no universal waiting period. Contact a GP if a change is persistent, worsening, unusual or worrying.</p><h3>“A normal screening result means the symptom cannot be cancer.”</h3><p>No screening test detects every cancer, and screening is not designed to assess symptoms.</p></section>

        <section id="faqs"><h2>9. Frequently Asked Questions</h2><FaqList faqs={cancerSymptomsFaqs}/></section>
        <section id="evidence"><h2>10. Evidence and References</h2><p>These sources support the symptom groups, primary-care assessment, referral and safety-netting information in this guide.</p><ResourceList resources={cancerSymptomsEvidence}/></section>
        <section id="official-resources"><h2>11. Official NHS Resources</h2><ResourceList resources={officialCancerSymptomsResources}/></section>
        <section id="bloomshield-help"><h2>12. How BloomShield Helps</h2><p>Clear information is one part of equitable access. BloomShield’s connected programmes support understanding, practical access and navigation across screening and care pathways.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></section>
        <div className="mt-12"><EditorialInformation evidenceSources="NHS and NICE"/></div>
      </article>
    </div>
  </>;
}
