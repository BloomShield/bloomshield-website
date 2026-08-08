import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import {
  AtAGlance, BloomShieldExplains, Breadcrumbs, ContentsNav, EditorialInformation,
  ExternalLink, FaqList, MedicalSafetyAlert, RelatedProgrammes, ResourceList,
  ReviewDate, ScreeningArticleHero,
} from "../components";
import { mammogramEvidence, mammogramFaqs, officialLinks, officialMammogramResources } from "../content";
import { screeningArticles } from "../articles";

const title = "Mammogram Explained: What Happens and What Results Mean | BloomShield CIC";
const description = "Understand what happens during a mammogram, how breast X-rays are taken, possible results, discomfort, benefits, limitations and official NHS guidance.";
const article = screeningArticles.mammogram;

export const metadata = createMetadata({
  title,
  description,
  path: article.path,
  absoluteTitle: true,
  socialImage: {
    url: "/images/mammogram-lifestyle-hero.webp",
    width: 1691,
    height: 930,
    alt: "A Black woman relaxing with a mug in a softly lit living room",
  },
});

const contents = [
  { id: "at-a-glance-title", title: "Mammogram at a Glance" },
  { id: "what-is-a-mammogram", title: "What Is a Mammogram?" },
  { id: "why-used", title: "Why Mammograms Are Used" },
  { id: "appointment", title: "What Happens During the Appointment?" },
  { id: "discomfort", title: "Does a Mammogram Hurt?" },
  { id: "results", title: "What the Result May Mean" },
  { id: "benefits", title: "Benefits of Mammography" },
  { id: "limitations", title: "Limitations and Possible Harms" },
  { id: "symptoms", title: "Breast Symptoms and When to Contact Your GP" },
  { id: "myths", title: "Common Myths About Mammograms" },
  { id: "faqs", title: "Frequently Asked Questions" },
  { id: "evidence", title: "Evidence and References" },
  { id: "official-resources", title: "Official NHS Resources" },
  { id: "bloomshield-help", title: "How BloomShield Helps" },
];

export default function MammogramPage() {
  const glance = [
    { label: "What it is", value: <>A low-dose X-ray examination of the breasts.</> },
    { label: "Why it is used", value: <>To look for signs of breast cancer, including changes too small to see or feel.</> },
    { label: "What happens", value: <>Each breast is positioned and briefly compressed between two plates while images are taken.</> },
    { label: "How it may feel", value: <>Compression is often uncomfortable and can be painful for some people, but it is brief.</> },
    { label: "What recall means", value: <>The screening team needs more information. It does not mean that breast cancer has been diagnosed.</> },
    { label: "What a normal result does not guarantee", value: <><strong>Mammograms do not find every cancer. Contact your GP about a new or unusual breast change.</strong></> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path={article.path} breadcrumb="Mammogram" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical" medicalAbout={[...article.medicalSubjects]}/>
    <Breadcrumbs current="Mammogram" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>

    <ScreeningArticleHero title="Mammogram" intro="A mammogram uses low-dose X-rays to create images of breast tissue. Mammograms are used in routine breast screening and may also form part of diagnostic assessment when someone has breast symptoms." imageSrc="/images/mammogram-lifestyle-hero.webp" imageAlt="A Black woman relaxing with a mug in a softly lit living room" accent="pink"><ExternalLink href={officialLinks.nhsMammogramAppointment} className="button-primary">Read current NHS mammogram appointment guidance</ExternalLink><a href="#article-contents" className="button-secondary">Read Our Guide <ArrowRight aria-hidden="true" size={17}/></a></ScreeningArticleHero>

    <div className="container-page space-y-8 py-10 sm:py-14">
      <AtAGlance title="Mammogram at a Glance" items={glance}/>
      <MedicalSafetyAlert title="Important: Screening and Breast Symptoms" programme="mammogram"/>
      <ReviewDate/>
    </div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14">
      <ContentsNav items={contents}/>
      <article className="health-prose min-w-0">
        <section id="what-is-a-mammogram"><h2>2. What Is a Mammogram?</h2><p>A mammogram is an X-ray examination that creates detailed images of breast tissue using a low dose of radiation. A trained mammographer takes the images, which are checked for changes that may need further assessment.</p><p>A mammogram is a test, not a diagnosis. The images may look normal, may need to be repeated for technical reasons, or may show an area that needs more tests.</p></section>

        <section id="why-used"><h2>3. Why Mammograms Are Used</h2><p>In routine NHS breast screening, mammograms are used to look for signs of breast cancer in eligible people who do not have symptoms. They can identify some cancers before they can be seen or felt.</p><p>Mammography may also be used in a diagnostic pathway when someone has a lump or another breast change. Routine screening and symptomatic assessment have different purposes and pathways.</p><p>Read about eligibility and invitations in the <Link href="/cancer-prevention-screening/breast-screening" className="health-inline-link">NHS Breast Screening guide</Link>.</p></section>

        <section id="appointment"><h2>4. What Happens During the Appointment?</h2><ol><li>You will be given privacy to undress from the waist up.</li><li>The mammographer will explain the examination and position one breast at a time on the X-ray machine.</li><li>The breast is compressed between two plates. This keeps it still, spreads the tissue and helps produce a clear image using a low radiation dose.</li><li>Images are usually taken from more than one angle, then the process is repeated for the other breast.</li><li>The mammographer checks that the images are technically suitable before you leave.</li></ol><p>Wear a top that is easy to remove. Current NHS guidance says not to use deodorant, antiperspirant or talcum powder on the day because these may affect the images. Tell the service in advance about mobility needs, previous difficult experiences or breast implants.</p></section>

        <section id="discomfort"><h2>5. Does a Mammogram Hurt?</h2><p>Breast compression is brief, but most people find it uncomfortable and some find it painful. Experiences differ because breast sensitivity, positioning, mobility and previous experiences vary.</p><p>Tell the mammographer if you are uncomfortable or anxious. They can explain each step, help with positioning and pause. You are in control and can ask to stop at any time.</p></section>

        <section id="results"><h2>6. What the Result May Mean</h2><h3>No Sign of Breast Cancer</h3><p>No sign of breast cancer was seen on the screening mammograms. If you remain eligible, your result will explain when you should next be invited. Continue to be aware of breast changes between screens.</p><h3>Another Mammogram Is Needed</h3><p>Sometimes an image needs to be repeated because it was not clear enough. This is a technical recall and does not mean that cancer has been found.</p><h3>Further Tests Are Needed</h3><p>You will be invited to an assessment clinic. Further tests may include a breast examination, additional mammograms, ultrasound or a needle biopsy. Most people recalled for assessment are not diagnosed with breast cancer.</p><BloomShieldExplains id="mammogram-recall" title="Recall Means More Information Is Needed"><p><strong>Being recalled after a screening mammogram does not mean breast cancer has been found.</strong> It means the screening team needs more information, which may involve additional mammograms, an ultrasound, examination or a biopsy.</p></BloomShieldExplains></section>

        <section id="benefits"><h2>7. Benefits of Mammography</h2><ul><li>It can find some breast cancers before they can be seen or felt.</li><li>Finding cancer earlier may make treatment more effective and less extensive.</li><li>The examination is brief and does not require surgery or an instrument to enter the body.</li><li>Quality-assured screening provides a defined pathway for image reading and follow-up.</li></ul></section>

        <section id="limitations"><h2>8. Limitations and Possible Harms</h2><ul><li><strong>False negative:</strong> a mammogram can miss a cancer, so a normal result does not rule out every cancer.</li><li><strong>False positive:</strong> an area may look concerning but further tests show that it is not cancer. Recall and assessment can cause anxiety.</li><li><strong>Overdiagnosis:</strong> screening can find a cancer that would never have caused harm during the person&apos;s lifetime, but it is not currently possible to know with certainty which cancers these are.</li><li><strong>Radiation:</strong> mammography uses a low dose of X-rays. The screening programme weighs this small radiation risk against potential benefit.</li><li><strong>Discomfort:</strong> compression can be painful for some people.</li><li><strong>Implants:</strong> implants can obscure breast tissue, so extra views may be needed and mammography can be less effective.</li></ul></section>

        <div className="my-10"><MedicalSafetyAlert title="Breast Changes Need Medical Advice" programme="mammogram"/></div>

        <section id="symptoms"><h2>9. Breast Symptoms and When to Contact Your GP</h2><p>Contact your GP about a new lump, nipple or skin change, unusual discharge, change in breast shape or size, or persistent breast or armpit pain that concerns you. Most breast changes are not cancer, but they should be assessed.</p><p>Do not wait for a routine screening invitation, and do not rely on a previous normal mammogram. Symptomatic assessment may include examination and diagnostic imaging tailored to the concern.</p><ExternalLink href={officialLinks.nhsBreastSymptoms} className="health-inline-link">Read current NHS breast cancer symptom guidance</ExternalLink></section>

        <section id="myths"><h2>10. Common Myths About Mammograms</h2><h3>“Being Recalled Means I Have Breast Cancer.”</h3><p>No. Recall means more information is needed. Most people recalled for further tests are not diagnosed with breast cancer.</p><h3>“A Normal Mammogram Rules Out Breast Cancer.”</h3><p>No. Mammography can miss some cancers. Contact your GP about new or unusual changes.</p><h3>“Compression Damages the Breast.”</h3><p>Compression is used briefly to keep the breast still and produce a clear image. It can be painful, but you can ask the mammographer to pause or stop.</p><h3>“Screening and Symptom Assessment Are the Same.”</h3><p>No. Screening is for eligible people without symptoms. Symptoms need clinical assessment.</p></section>

        <section id="faqs"><h2>11. Frequently Asked Questions</h2><FaqList faqs={mammogramFaqs}/></section>
        <section id="evidence"><h2>12. Evidence and References</h2><p>These current primary sources describe mammography, England&apos;s screening pathway, recall, practical preparation, implants, benefits and harms.</p><ResourceList resources={mammogramEvidence}/></section>
        <section id="official-resources"><h2>13. Official NHS Resources</h2><p>Use these sources for current appointment instructions and result pathways. Arrangements differ across UK nations.</p><ResourceList resources={officialMammogramResources}/><p>The planned <Link href="/cancer-prevention-screening" className="health-inline-link">Cancer Symptoms topic remains marked Coming soon in the Information Library</Link>.</p></section>
        <section id="bloomshield-help"><h2>14. How BloomShield Helps</h2><p>Practical, accessible information can reduce anxiety and support informed participation and timely follow-up.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></section>
        <div className="mt-12"><EditorialInformation evidenceSources="NHS, NHS England and GOV.UK"/></div>
      </article>
    </div>
  </>;
}
