import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import {
  AtAGlance, BloomShieldExplains, Breadcrumbs, ContentsNav, EditorialInformation,
  ExternalLink, FaqList, MedicalSafetyAlert, RelatedProgrammes, ResourceList,
  ReviewDate, ScreeningArticleHero,
} from "../components";
import { fitEvidence, fitFaqs, officialFitResources, officialLinks } from "../content";
import { screeningArticles } from "../articles";

const title = "FIT Test Explained: Results, Accuracy and NHS Use | BloomShield CIC";
const description = "Understand what a FIT test checks for, how to collect a sample, what the result may mean, its benefits and limitations, and how screening FIT differs from diagnostic FIT.";
const article = screeningArticles.fit;

export const metadata = createMetadata({
  title,
  description,
  path: article.path,
  absoluteTitle: true,
  socialImage: {
    url: "/images/fit-test-lifestyle-hero.webp",
    width: 1693,
    height: 929,
    alt: "A Black man reading home test instructions in a warmly lit living room",
  },
});

const contents = [
  { id: "at-a-glance-title", title: "FIT Test at a Glance" },
  { id: "what-is-fit", title: "What Is a FIT Test?" },
  { id: "why-fit-is-used", title: "Why Is FIT Used?" },
  { id: "screening-and-diagnostic-fit", title: "Screening FIT and Diagnostic FIT: What Is the Difference?" },
  { id: "complete-a-sample", title: "How to Complete a FIT Sample" },
  { id: "results", title: "What a FIT Result May Mean" },
  { id: "benefits", title: "Benefits of FIT" },
  { id: "limitations", title: "Limitations and Possible Harms" },
  { id: "symptoms", title: "Symptoms and When to Contact Your GP" },
  { id: "myths", title: "Common Myths About FIT" },
  { id: "faqs", title: "Frequently Asked Questions" },
  { id: "evidence", title: "Evidence and References" },
  { id: "official-resources", title: "Official NHS Resources" },
  { id: "bloomshield-help", title: "How BloomShield Helps" },
];

export default function FitTestPage() {
  const glance = [
    { label: "What FIT stands for", value: <>Faecal immunochemical test.</> },
    { label: "What it checks for", value: <>Tiny amounts of human blood in a stool sample. FIT does not look for cancer directly.</> },
    { label: "How the sample is collected", value: <>At home, using the sampling stick and container supplied with the kit. Always follow the instructions for your specific kit.</> },
    { label: "Why it may be used", value: <>As part of bowel cancer screening for eligible people without symptoms, or when a clinician requests it to help assess certain bowel symptoms.</> },
    { label: "What an abnormal result may lead to", value: <>Further assessment or investigation within the screening or clinical pathway in which the test was requested.</> },
    { label: "What a normal result does not guarantee", value: <><strong>FIT does not diagnose cancer, and a normal result does not completely rule bowel cancer out.</strong> Persistent or concerning symptoms still need medical assessment.</> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path={article.path} breadcrumb="FIT Test" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical" medicalAbout={[...article.medicalSubjects]}/>
    <Breadcrumbs current="FIT Test" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>

    <ScreeningArticleHero title="FIT Test" intro="A faecal immunochemical test, usually called a FIT, checks a small stool sample for tiny amounts of blood that may not be visible. FIT is used in NHS bowel cancer screening and may also be requested by a clinician when someone has certain bowel symptoms." imageSrc="/images/fit-test-lifestyle-hero.webp" imageAlt="A Black man reading home test instructions in a warmly lit living room" accent="teal"><ExternalLink href={officialLinks.govFitKitInstructions} className="button-primary">Read the official NHS screening FIT kit instructions</ExternalLink><a href="#article-contents" className="button-secondary">Read Our Guide <ArrowRight aria-hidden="true" size={17}/></a></ScreeningArticleHero>

    <div className="container-page space-y-8 py-10 sm:py-14">
      <AtAGlance title="FIT Test at a Glance" items={glance}/>
      <MedicalSafetyAlert title="Important: What FIT Can and Cannot Tell You" programme="fit"/>
      <ReviewDate/>
    </div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14">
      <ContentsNav items={contents}/>
      <article className="health-prose min-w-0">
        <section id="what-is-fit"><h2>2. What Is a FIT Test?</h2><p>FIT stands for faecal immunochemical test. It checks a small sample of stool for tiny amounts of human blood that may not be visible. The test responds to human haemoglobin, a protein found in blood.</p><p>FIT does not look for cancer cells. Polyps and bowel cancers can bleed, but blood in stool can also have other causes. A FIT result therefore helps decide what should happen next; it is not a cancer diagnosis.</p><BloomShieldExplains id="what-fit-measures" title="What FIT Measures"><p><strong>FIT does not look for cancer directly.</strong> It checks for small amounts of blood in your stool. Blood can have several causes, so an abnormal result means further assessment may be needed—it does not mean cancer has been found.</p></BloomShieldExplains><p>This guide primarily describes England. Screening programmes and clinical pathways differ across the UK, so follow the instructions and official guidance for the nation and service that supplied your kit.</p></section>

        <section id="why-fit-is-used"><h2>3. Why Is FIT Used?</h2><p>FIT is used because a small stool sample can provide useful information about possible bleeding in the bowel. It can be completed privately at home and analysed in a laboratory.</p><p>In the NHS bowel cancer screening programme, FIT is offered to eligible people who do not have symptoms. The purpose is to identify people who may need further investigation. A clinician may also request FIT when a person has certain bowel symptoms, to help decide the safest next step alongside their symptoms, history and examination.</p><p>Learn more about the population programme in the <Link href="/cancer-prevention-screening/bowel-screening" className="health-inline-link">NHS Bowel Cancer Screening guide</Link>.</p></section>

        <section id="screening-and-diagnostic-fit"><h2>4. Screening FIT and Diagnostic FIT: What Is the Difference?</h2><h3>Screening FIT</h3><p>Screening FIT is part of a population programme for eligible people who do not have symptoms. The screening programme sets its own threshold, result wording and follow-up pathway. In England, the programme sends the kit and communicates the result.</p><h3>Clinician-Requested FIT</h3><p>A GP or another clinician may request FIT to help assess certain bowel symptoms. This is often called symptomatic or diagnostic-pathway FIT, although FIT itself does not make a diagnosis. The clinician interprets the result alongside other clinical information and current referral guidance.</p><p>The laboratory method may be similar, but the purpose, thresholds and pathways are not interchangeable. Do not compare a number from one pathway with information written for another. Follow the advice from the service that requested your test.</p></section>

        <section id="complete-a-sample"><h2>5. How to Complete a FIT Sample</h2><p>Different services may supply different kits, so always read the instructions that came with yours. For the NHS bowel screening kit used in England, the official steps are:</p><ol><li>Write the requested date on the sample bottle.</li><li>Use a clean container or layers of toilet paper to catch the stool before it touches toilet water.</li><li>Twist open the sample bottle and scrape the sampling stick along the surface of the stool until the grooves are covered. Only a small amount is needed.</li><li>Put the stick back into the bottle and click the cap closed. Do not reopen it.</li><li>Wash your hands, check the date is recorded, seal the bottle in the supplied return envelope and post it as soon as possible.</li></ol><p>If your GP or another service supplied the test, use their labelling and return instructions. Contact the supplying service if the kit is lost, damaged, out of date or difficult to use.</p><ExternalLink href={officialLinks.govFitKitInstructions} className="health-inline-link">Follow the official NHS bowel screening FIT kit instructions for England</ExternalLink></section>

        <section id="results"><h2>6. What a FIT Result May Mean</h2><p>Result wording and next steps depend on whether the test came from the screening programme or was requested by a clinician.</p><h3>Screening Result: No Further Tests Needed at This Time</h3><p>This means no blood was found, or the amount was below the screening programme threshold. It does not guarantee that you do not have bowel cancer. If you remain eligible, the programme will usually invite you again at the normal interval.</p><h3>Screening Result: Further Tests Needed</h3><p>This means blood was found at or above the programme threshold. It is not a cancer diagnosis. The screening programme will arrange contact to discuss the result and further assessment, which may include a colonoscopy.</p><h3>Clinician-Requested FIT Result</h3><p>Your clinician should interpret the result with your symptoms and other clinical information. A result below the referral threshold does not override ongoing clinical concern. A result at or above the relevant threshold may lead to urgent referral or other investigation, depending on the pathway.</p><p>Sometimes a test cannot be processed and another sample is needed. Follow the message from the screening programme, laboratory or clinician.</p></section>

        <section id="benefits"><h2>7. Benefits of FIT</h2><ul><li>It needs only a small stool sample and can usually be completed privately at home.</li><li>Nothing is inserted into the body to collect the sample.</li><li>In screening, it helps identify people who may benefit from further investigation before symptoms appear.</li><li>In symptomatic pathways, it can help clinicians assess who may need urgent investigation when used with clinical information.</li><li>It measures human blood, which reduces interference from food compared with older stool blood tests.</li></ul></section>

        <section id="limitations"><h2>8. Limitations and Possible Harms</h2><p>FIT is useful, but it is not completely accurate and cannot be interpreted safely in isolation.</p><ul><li><strong>A normal result can be falsely reassuring:</strong> a polyp or cancer may not bleed when the sample is collected.</li><li><strong>An abnormal result does not identify the cause:</strong> bleeding can come from cancer, polyps, haemorrhoids or other conditions.</li><li><strong>Further tests may cause anxiety or harm:</strong> an abnormal result can lead to investigations such as colonoscopy, which has benefits and risks that should be explained before consent.</li><li><strong>Pathways use different thresholds:</strong> applying screening information to a clinician-requested result, or the reverse, can be misleading.</li><li><strong>Sample or handling problems can affect processing:</strong> another kit may be required if the sample cannot be analysed.</li></ul></section>

        <div className="my-10"><MedicalSafetyAlert title="Symptoms Need Medical Advice" programme="fit" message="Do not wait for a routine bowel-screening invitation or FIT screening kit if you have symptoms or concerns. Contact your GP."/></div>

        <section id="symptoms"><h2>9. Symptoms and When to Contact Your GP</h2><p>Contact your GP about bowel changes or symptoms that persist, change or worry you. These can include blood in your stool or bleeding from your bottom, a change in bowel habit, tummy pain or bloating, unexplained weight loss, or unusual tiredness that may relate to anaemia.</p><p>Symptoms can have many causes and do not necessarily mean cancer. However, a screening invitation is not a route for assessing symptoms, and a normal FIT result does not replace clinical review if symptoms continue.</p><p>The planned <Link href="/cancer-prevention-screening" className="health-inline-link">Cancer Symptoms topic is marked Coming soon in the Information Library</Link>. Until then, use current official NHS advice.</p><ExternalLink href={officialLinks.nhsBowelSymptoms} className="health-inline-link">Read current NHS bowel cancer symptoms and urgent-action advice</ExternalLink></section>

        <section id="myths"><h2>10. Common Myths About FIT</h2><h3>“A positive FIT means I have bowel cancer.”</h3><p>No. It means blood was detected at a level that requires action in that pathway. Further assessment is needed to find the cause.</p><h3>“A normal FIT means I definitely do not have bowel cancer.”</h3><p>No. FIT can miss bleeding, and not every cancer bleeds all the time. Persistent or concerning symptoms still need medical assessment.</p><h3>“Screening FIT and diagnostic FIT are exactly the same.”</h3><p>No. They are used for different groups and purposes, and their thresholds, result wording and follow-up pathways may differ.</p><h3>“I should wait for a screening kit even though I have symptoms.”</h3><p>No. Contact your GP. Routine screening is intended for people without symptoms and must not delay clinical assessment.</p></section>

        <section id="faqs"><h2>11. Frequently Asked Questions</h2><FaqList faqs={fitFaqs}/></section>

        <section id="evidence"><h2>12. Evidence and References</h2><p>These primary sources were selected for authority, relevance and currency. The guide avoids a single numerical FIT threshold because screening and symptomatic pathways use different thresholds and programme arrangements can change.</p><ResourceList resources={fitEvidence}/></section>

        <section id="official-resources"><h2>13. Official NHS Resources</h2><p>Use these official sources for current screening instructions, programme arrangements, results and support in England.</p><ResourceList resources={officialFitResources}/></section>

        <section id="bloomshield-help"><h2>14. How BloomShield Helps</h2><p>Clear information is one part of equitable access. BloomShield’s connected programmes support understanding, practical access and navigation across screening and care pathways.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></section>

        <div className="mt-12"><EditorialInformation/></div>
      </article>
    </div>
  </>;
}
