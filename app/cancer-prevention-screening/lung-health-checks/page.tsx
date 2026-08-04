import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import {
  AtAGlance, Breadcrumbs, ContentsNav, EditorialInformation, ExternalLink, FaqList,
  MedicalSafetyAlert, RelatedProgrammes, ResourceList, ReviewDate, ScreeningArticleHero,
} from "../components";
import type { ExternalResource } from "../content";
import { officialLinks } from "../content";
import { screeningArticles } from "../articles";

const article = screeningArticles.lung;
const title = "NHS Lung Health Checks: Eligibility, CT Scan and Results | BloomShield CIC";
const description = "Understand NHS lung cancer screening in England, who may be invited for a lung health check, how risk assessment and low-dose CT work, benefits, limitations and official support.";

export const metadata = createMetadata({ title, description, path: article.path, absoluteTitle: true });

const contents = [
  { id: "what-is-lung-screening", title: "What Is an NHS Lung Health Check?" },
  { id: "why-screening-matters", title: "Why Lung Cancer Screening Matters" },
  { id: "eligibility", title: "Who Is Eligible for an NHS Lung Health Check?" },
  { id: "how-screening-works", title: "How Lung Cancer Screening Works" },
  { id: "results", title: "What Your Check or Scan Result May Mean" },
  { id: "benefits", title: "Benefits of Lung Cancer Screening" },
  { id: "limitations", title: "Limitations and Possible Harms" },
  { id: "symptoms", title: "Lung Symptoms Need Medical Advice" },
  { id: "faqs", title: "Frequently Asked Questions" },
  { id: "evidence", title: "Evidence and References" },
  { id: "official-resources", title: "Official NHS Resources" },
  { id: "bloomshield-help", title: "How BloomShield Helps Improve Screening Participation" },
];

const faqs = [
  { question: "Who may be invited for an NHS Lung Health Check?", answer: "In England, people aged 55 to 74 who are registered with a GP and recorded as a current or former smoker may be contacted where lung screening is available. The check then assesses whether a person is at higher risk and should be offered a low-dose CT scan." },
  { question: "Are Lung Health Checks available everywhere in England?", answer: "The NHS programme is being rolled out across England and current NHS guidance says availability still varies by area. New locations are being added. Use the NHS lung cancer screening page to check local services." },
  { question: "Does everyone who has a Lung Health Check get a CT scan?", answer: "No. A health professional first assesses risk using information such as smoking history, age, health and family history. People assessed as being at higher risk may be offered a low-dose CT scan." },
  { question: "What happens during the CT scan?", answer: "You lie flat on a bed that moves through the scanner. You may be asked to hold your breath briefly while detailed images of your lungs are taken. The scan itself takes only a few minutes and does not hurt." },
  { question: "Does an invitation mean the NHS thinks I have lung cancer?", answer: "No. Invitations are targeted using age and smoking history because these factors can increase risk. The check is offered to people without symptoms and does not mean cancer is suspected." },
  { question: "What if I used to smoke but stopped many years ago?", answer: "You may still be eligible because the programme includes former smokers. Make sure your GP record accurately shows that you smoked in the past." },
  { question: "Can the CT scan find other conditions?", answer: "Yes. A lung CT can sometimes show findings unrelated to lung cancer. The screening team will explain whether no action, monitoring or referral is recommended. Some incidental findings lead to further tests that do not find a serious problem." },
  { question: "What should I do if I have lung cancer symptoms?", answer: "Contact your GP rather than waiting for a Lung Health Check. A persistent or changing cough, coughing up blood, repeated chest infections, breathlessness, pain when breathing or coughing, unexplained tiredness, appetite loss or weight loss should be assessed." },
] as const;

const evidence: ExternalResource[] = [
  { title: "Lung cancer screening", description: "Current public information about Lung Health Check eligibility, availability, risk assessment and CT scans.", href: officialLinks.nhsLungScreening, organisation: "NHS" },
  { title: "Lung cancer screening recommendation", description: "The UK National Screening Committee recommendation for targeted screening of people aged 55 to 74 at high risk.", href: officialLinks.ukNscLungRecommendation, organisation: "UK National Screening Committee" },
  { title: "NHS England lung cancer programme", description: "NHS England information about lung cancer services and the national screening programme.", href: officialLinks.nhsEnglandLungProgramme, organisation: "NHS England" },
  { title: "Lung cancer symptoms", description: "Current NHS information about symptoms and when to contact a GP.", href: officialLinks.nhsLungSymptoms, organisation: "NHS" },
];

const officialResources = evidence.slice(0, 4);

export default function LungHealthChecksPage() {
  const glance = [
    { label: "Who may be invited", value: <>In England, people aged 55 to 74 who are registered with a GP and are current or former smokers may be contacted where the service is available.</> },
    { label: "The first step", value: <>A Lung Health Check that reviews breathing, smoking history, health, lifestyle and other factors to assess lung cancer risk.</> },
    { label: "Who may be offered a scan", value: <>People assessed as being at higher risk of lung cancer may be offered a low-dose CT scan.</> },
    { label: "Where screening is available", value: <>The programme is being rolled out across England. Current availability and invitation timing vary by area.</> },
    { label: "What happens after the result", value: <>You may need no further action, GP follow-up, another scan after a set interval or further investigation, depending on the findings.</> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path={article.path} breadcrumb="NHS Lung Health Checks" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical" medicalAbout={[...article.medicalSubjects]}/>
    <Breadcrumbs current="NHS Lung Health Checks" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>

    <ScreeningArticleHero title="NHS Lung Health Checks" intro="A plain-language guide to eligibility, lung cancer risk assessment, low-dose CT scans, possible results, benefits, limitations and official support in England." imageSrc="/images/lung-health-check-lifestyle-hero.webp" imageAlt="A South Asian man walking comfortably along a leafy park path" accent="blue"><ExternalLink href={officialLinks.nhsLungScreening} className="button-primary">Check current NHS Lung Health Check guidance</ExternalLink><a href="#article-contents" className="button-secondary">Read this guide <ArrowRight aria-hidden="true" size={17}/></a></ScreeningArticleHero>

    <div className="container-page space-y-8 py-10 sm:py-14">
      <AtAGlance title="NHS Lung Health Checks at a Glance" items={glance}/>
      <MedicalSafetyAlert programme="lung"/>
      <ReviewDate/>
    </div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14">
      <ContentsNav items={contents}/>
      <article className="health-prose min-w-0">
        <section id="what-is-lung-screening"><h2>1. What Is an NHS Lung Health Check?</h2><p>An NHS Lung Health Check is the first stage of targeted lung cancer screening in England. It is offered to some people without symptoms who may have a higher chance of developing lung cancer because of their age and smoking history.</p><p>The check assesses lung health and individual risk. People assessed as being at higher risk may be offered a low-dose computed tomography (CT) scan, which creates detailed pictures of the lungs. Screening is not a diagnosis.</p></section>

        <section id="why-screening-matters"><h2>2. Why Lung Cancer Screening Matters</h2><p>Lung cancer may not cause symptoms at an early stage. Targeted screening aims to find some lung cancers earlier, when treatment may be more effective.</p><p>The UK National Screening Committee recommends targeted lung cancer screening for people aged 55 to 74 who are identified as being at high risk. Screening is a choice, and the team should explain the possible benefits and risks.</p></section>

        <section id="eligibility"><h2>3. Who Is Eligible for an NHS Lung Health Check?</h2><p>This guide describes the programme in England. Current NHS information says people may be contacted if they are aged 55 to 74, registered with a GP and recorded as a current or former smoker. They must also live in an area where Lung Health Checks are currently offered.</p><p>Being invited to the first-stage check does not automatically mean a CT scan will be offered. A health professional assesses individual risk, and people assessed as being at higher risk may be invited for a low-dose CT scan.</p><p>The programme is being rolled out across England, so availability and invitation timing vary. People who have smoked can ask their GP practice to make sure their smoking history is recorded accurately. Arrangements elsewhere in the UK may differ.</p><ExternalLink href={officialLinks.nhsLungScreening} className="health-inline-link">Check current NHS eligibility and local Lung Health Check availability</ExternalLink></section>

        <section id="how-screening-works"><h2>4. How Lung Cancer Screening Works</h2><ol><li>A GP practice or local NHS service contacts an eligible person where the programme is available.</li><li>A health professional asks about breathing, smoking history, lifestyle, family history and medical history. Height and weight may also be recorded.</li><li>If the assessment suggests a lower risk, no CT scan may be needed. Lung or breathing concerns may be referred to the GP.</li><li>If the assessment suggests a higher risk of lung cancer, a low-dose CT scan may be offered.</li><li>During the scan, you lie on a bed and hold your breath briefly while detailed images of the lungs are taken.</li><li>The screening team sends the result and explains any follow-up.</li></ol><p>Current smokers should also be offered advice and support to stop smoking. This support is part of the programme and should be provided without judgement.</p></section>

        <section id="results"><h2>5. What Your Check or Scan Result May Mean</h2><h3>No CT Scan or Further Action Needed Now</h3><p>The first-stage risk assessment may show that you are not at higher risk under the programme criteria. This does not mean you cannot develop lung cancer. Seek medical advice about symptoms.</p><h3>No Concerning Finding on the CT Scan</h3><p>No sign requiring investigation was found. Depending on the programme pathway, you may be invited for screening again. A clear scan does not rule out lung cancer now or in the future.</p><h3>Another Scan or Monitoring Is Needed</h3><p>A small lung nodule or another finding may need monitoring with a repeat scan. Many nodules are not cancer.</p><h3>Further Investigation Is Needed</h3><p>The scan found something that needs specialist assessment. This does not by itself diagnose cancer. The team will explain the next tests.</p><h3>Another Health Finding Is Present</h3><p>CT scans can show conditions unrelated to lung cancer. The result letter should explain whether GP review or another referral is advised.</p></section>

        <section id="benefits"><h2>6. Benefits of Lung Cancer Screening</h2><ul><li>Low-dose CT can find some lung cancers before symptoms develop.</li><li>Finding lung cancer earlier may make treatment more effective.</li><li>The targeted approach focuses scanning on people assessed as being at higher risk.</li><li>The check can identify other lung or breathing concerns that need GP follow-up.</li><li>Current smokers can be connected with support to stop smoking.</li></ul></section>

        <section id="limitations"><h2>7. Limitations and Possible Harms</h2><p>Screening tests are not completely accurate. Understanding limitations is part of making an informed choice.</p><ul><li><strong>False-negative results can occur:</strong> a scan can miss a lung cancer, and cancer can develop between scans.</li><li><strong>False-positive results can occur:</strong> a scan may show something that leads to more tests but is not cancer.</li><li><strong>Overdiagnosis can occur:</strong> screening may find a cancer that would not have caused harm during a person&apos;s lifetime, leading to treatment that might not otherwise have been needed.</li><li><strong>Incidental findings can occur:</strong> the scan may identify another condition, leading to anxiety, monitoring or further tests.</li><li><strong>CT uses radiation:</strong> the dose is low, but repeated scans carry a small radiation risk.</li><li><strong>Not everyone invited receives a scan:</strong> eligibility for low-dose CT depends on the programme&apos;s risk assessment.</li></ul></section>

        <div className="my-10"><MedicalSafetyAlert title="Lung Symptoms Need Medical Advice" programme="lung"/></div>

        <section id="symptoms"><h2>8. Lung Symptoms Need Medical Advice</h2><p>Lung cancer screening is for people without symptoms. Contact your GP if you have:</p><ul><li>a cough that does not go away after three weeks</li><li>a long-standing cough that changes or gets worse</li><li>chest infections that keep returning</li><li>coughing up blood</li><li>persistent breathlessness, tiredness or lack of energy</li><li>pain or an ache when breathing or coughing</li><li>loss of appetite or unexplained weight loss</li></ul><p>These symptoms can have causes other than cancer. Do not wait for a Lung Health Check invitation, risk assessment or scan result before asking for medical advice.</p><ExternalLink href={officialLinks.nhsLungSymptoms} className="health-inline-link">Read current NHS lung cancer symptom guidance</ExternalLink></section>

        <section id="faqs"><h2>9. Frequently Asked Questions</h2><FaqList faqs={faqs}/></section>

        <section id="evidence"><h2>10. Evidence and References</h2><p>Sources were selected for authority, relevance and currency. Programme details should always be checked at source because rollout, eligibility and pathways can change.</p><ResourceList resources={evidence}/></section>

        <section id="official-resources"><h2>11. Official NHS Resources</h2><p>Use these official sources for current eligibility, local availability, scan information, symptoms and support.</p><ResourceList resources={officialResources}/></section>

        <section id="bloomshield-help"><h2>12. How BloomShield Helps Improve Screening Participation</h2><p>BloomShield is an independent public-health educator. Its connected programmes support understanding, equitable access and navigation while directing people to official NHS services for clinical care.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></section>

        <div className="mt-12"><EditorialInformation/></div>
      </article>
    </div>
  </>;
}
