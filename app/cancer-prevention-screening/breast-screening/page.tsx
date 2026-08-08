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

const article = screeningArticles.breast;
const title = "NHS Breast Screening: Eligibility, Mammogram and Results | BloomShield CIC";
const description = "Understand NHS breast screening in England, who is invited, what happens during a mammogram, possible results, benefits, limitations and official NHS support.";

export const metadata = createMetadata({
  title,
  description,
  path: article.path,
  absoluteTitle: true,
  socialImage: {
    url: "/images/breast-screening-lifestyle-hero.webp",
    width: 1536,
    height: 1024,
    alt: "A Black woman relaxing at home in warm daylight",
  },
});

const contents = [
  { id: "what-is-breast-screening", title: "What Is Breast Screening?" },
  { id: "why-screening-matters", title: "Why Breast Screening Matters" },
  { id: "eligibility", title: "Who Is Eligible for NHS Breast Screening?" },
  { id: "how-screening-works", title: "How Breast Screening Works" },
  { id: "results", title: "What Your Breast Screening Result May Mean" },
  { id: "benefits", title: "Benefits of Breast Screening" },
  { id: "limitations", title: "Limitations and Possible Harms" },
  { id: "symptoms", title: "Breast Changes Need Medical Advice" },
  { id: "faqs", title: "Frequently Asked Questions" },
  { id: "evidence", title: "Evidence and References" },
  { id: "official-resources", title: "Official NHS Resources" },
  { id: "bloomshield-help", title: "How BloomShield Helps Improve Screening Participation" },
];

const faqs = [
  { question: "What age does breast screening start in England?", answer: "Women registered with a GP are usually first invited between ages 50 and 53. NHS breast screening is offered every three years up to a person's 71st birthday under current England programme guidance." },
  { question: "Can I request screening after age 71?", answer: "Yes. People aged 71 or over are not sent routine invitations but can contact their local NHS breast screening service to request screening every three years." },
  { question: "What is a mammogram?", answer: "A mammogram is an X-ray examination of the breasts. During routine screening, each breast is positioned and briefly compressed so clear images can be taken." },
  { question: "Does a mammogram hurt?", answer: "Some people find the pressure uncomfortable or painful, but it lasts only a short time. Tell the mammographer if you are in pain or need to pause." },
  { question: "Why might I be recalled for more tests?", answer: "A recall means the screening team needs more information; it does not mean you have breast cancer. You may be offered more mammograms, an ultrasound, a breast examination or a biopsy." },
  { question: "Can trans and non-binary people have NHS breast screening?", answer: "Eligibility and automatic invitations depend on age, breast tissue, previous surgery or hormone treatment, and the sex recorded in GP records. NHS guidance explains who is automatically invited and who should ask their GP or local screening service." },
  { question: "Does a normal result rule out breast cancer?", answer: "No. Mammograms do not find every breast cancer, and cancer can develop between screening appointments. Contact your GP about any change that is not normal for you, even after a normal result." },
  { question: "What should I do if I notice a breast change?", answer: "Contact your GP rather than waiting for a screening invitation. A new lump or swelling, skin or nipple change, unusual discharge, or a change in breast size or shape should be assessed." },
] as const;

const evidence: ExternalResource[] = [
  { title: "Breast screening (mammogram)", description: "Public information about NHS breast screening, appointments and results.", href: officialLinks.nhsBreastScreening, organisation: "NHS" },
  { title: "Who breast screening is for", description: "Current NHS eligibility and invitation guidance, including information for people aged 71 or over and trans and non-binary people.", href: officialLinks.nhsBreastEligibility, organisation: "NHS" },
  { title: "Breast screening: programme overview", description: "Current target population, mammography and programme information for England.", href: officialLinks.govBreastOverview, organisation: "NHS England and GOV.UK" },
  { title: "Your guide to NHS breast screening", description: "Accessible NHS England information to support an informed choice about breast screening.", href: officialLinks.govBreastGuide, organisation: "NHS England and GOV.UK" },
];

const officialResources = evidence.slice(0, 4);

export default function BreastScreeningPage() {
  const glance = [
    { label: "Who is usually invited", value: <>In England, women registered with a GP are invited from age 50 up to their 71st birthday. A first invitation usually arrives between ages 50 and 53.</> },
    { label: "The test used", value: <>A mammogram, which uses low-dose X-rays to create images of the breasts.</> },
    { label: "How the test is completed", value: <>A female mammographer positions each breast in turn and briefly compresses it while images are taken.</> },
    { label: "How often screening is offered", value: <>Usually every three years in England while a person is in the routine invitation age range.</> },
    { label: "What happens after the result", value: <>A letter explains whether no further tests are needed or whether you are invited to an assessment clinic for more checks.</> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path={article.path} breadcrumb="NHS Breast Screening" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical" medicalAbout={[...article.medicalSubjects]}/>
    <Breadcrumbs current="NHS Breast Screening" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>

    <ScreeningArticleHero title="NHS Breast Screening" intro="A plain-language guide to eligibility, mammograms, possible results, benefits, limitations and official support in England." imageSrc="/images/breast-screening-lifestyle-hero.webp" imageAlt="A Black woman relaxing at home in warm daylight" accent="pink"><ExternalLink href={officialLinks.nhsBreastEligibility} className="button-primary">Check the current NHS breast screening eligibility guidance</ExternalLink><a href="#article-contents" className="button-secondary">Read Our Guide <ArrowRight aria-hidden="true" size={17}/></a></ScreeningArticleHero>

    <div className="container-page space-y-8 py-10 sm:py-14">
      <AtAGlance title="Breast Screening at a Glance" items={glance}/>
      <MedicalSafetyAlert programme="breast"/>
      <ReviewDate/>
    </div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14">
      <ContentsNav items={contents}/>
      <article className="health-prose min-w-0">
        <section id="what-is-breast-screening"><h2>1. What Is Breast Screening?</h2><p>NHS breast screening is offered to people without symptoms. It uses mammograms, which are X-ray images of the breasts, to look for signs of breast cancer that may be too small to see or feel.</p><p>A mammogram cannot diagnose breast cancer on its own. If screening finds an area that needs checking, further assessment is offered.</p></section>

        <section id="why-screening-matters"><h2>2. Why Breast Screening Matters</h2><p>Breast screening can find some breast cancers before symptoms develop. Finding cancer earlier may mean treatment can begin sooner and may be less extensive.</p><p>Screening is a choice. NHS information explains the possible benefits and risks, including overdiagnosis, so each person can make an informed decision.</p></section>

        <section id="eligibility"><h2>3. Who Is Eligible for NHS Breast Screening?</h2><p>This guide describes the NHS programme in England. Women registered with a GP are routinely invited from age 50 up to their 71st birthday. Because invitations are sent in batches, the first appointment is usually offered between ages 50 and 53, then every three years.</p><p>People aged 71 or over are not sent routine invitations but can contact their local NHS breast screening service to request screening every three years. Some people at very high risk are offered different surveillance through specialist care.</p><p>Automatic invitations for trans and non-binary people depend on the sex recorded in GP records. Whether screening is appropriate can also depend on breast tissue, surgery and hormone treatment. Check NHS guidance or ask your GP or local screening service.</p><p>Arrangements differ across UK nations and can change. Use official information for where you live.</p><ExternalLink href={officialLinks.nhsBreastEligibility} className="health-inline-link">Check current NHS breast screening eligibility guidance</ExternalLink></section>

        <section id="how-screening-works"><h2>4. How Breast Screening Works</h2><ol><li>You receive an invitation with an appointment at a screening clinic or mobile unit.</li><li>At the appointment, you undress to the waist in private.</li><li>A female mammographer explains the procedure and positions one breast at a time on the mammogram machine.</li><li>The breast is briefly compressed between two plates. Usually two images are taken of each breast, one from above and one from the side.</li><li>The images are checked and the screening service sends your result.</li></ol><p>Compression helps produce clear images while using a low dose of radiation. Tell the mammographer if you have access needs, breast implants, limited movement or pain.</p></section>

        <section id="results"><h2>5. What Your Breast Screening Result May Mean</h2><h3>No Sign of Breast Cancer</h3><p>No sign of breast cancer was found on the mammograms. This does not rule out breast cancer. Contact your GP if you notice a change, even after this result.</p><h3>More Tests Are Needed</h3><p>You are invited to a breast assessment clinic because the images need further investigation. This does not mean you have cancer. Assessment may include more mammograms, an ultrasound, an examination or a biopsy.</p><h3>Another Mammogram Is Needed</h3><p>Rarely, a technical issue means the images are not clear enough to read. The service may ask you to return so clearer images can be taken.</p></section>

        <section id="benefits"><h2>6. Benefits of Breast Screening</h2><ul><li>It can find some breast cancers before symptoms develop.</li><li>Finding cancer earlier may make treatment more effective.</li><li>It provides a quality-assured pathway for assessment when an image needs further investigation.</li><li>Screening is delivered at dedicated clinics and mobile units across England.</li></ul></section>

        <section id="limitations"><h2>7. Limitations and Possible Harms</h2><p>Screening tests are not completely accurate. Understanding limitations is part of making an informed choice.</p><ul><li><strong>False-negative results can occur:</strong> mammograms do not find every breast cancer.</li><li><strong>False-positive results can occur:</strong> people may be recalled for tests that show no cancer, causing worry and discomfort.</li><li><strong>Overdiagnosis can occur:</strong> screening can find a cancer that would never have caused harm during a person&apos;s lifetime. It is not currently possible to know which cancers would do this, so treatment may be offered.</li><li><strong>Mammography uses radiation:</strong> the dose is low, but repeated exposure carries a small risk.</li><li><strong>Compression can be uncomfortable or painful:</strong> experiences vary and the mammographer can pause if needed.</li><li><strong>Screening can give false reassurance:</strong> breast cancer can develop between screening appointments.</li></ul></section>

        <div className="my-10"><MedicalSafetyAlert title="Breast Changes Need Medical Advice" programme="breast"/></div>

        <section id="symptoms"><h2>8. Breast Changes Need Medical Advice</h2><p>Breast screening is not used to investigate symptoms. Contact your GP if you notice a change that is not normal for you, including:</p><ul><li>a lump or swelling in the breast, chest or armpit</li><li>a change in breast skin, such as dimpling or redness</li><li>a change in the size or shape of one or both breasts</li><li>nipple discharge when not pregnant or breastfeeding, which may contain blood</li><li>a nipple that turns inwards, changes shape or develops a rash</li></ul><p>These changes can have causes other than cancer. Do not wait for a screening invitation or routine appointment to get them checked.</p><ExternalLink href={officialLinks.nhsBreastSymptoms} className="health-inline-link">Read current NHS breast cancer symptom guidance</ExternalLink></section>

        <section id="faqs"><h2>9. Frequently Asked Questions</h2><FaqList faqs={faqs}/></section>

        <section id="evidence"><h2>10. Evidence and References</h2><p>Sources were selected for authority, relevance and currency. Programme details should always be checked at source because eligibility and pathways can change.</p><ResourceList resources={evidence}/></section>

        <section id="official-resources"><h2>11. Official NHS Resources</h2><p>Use these official sources for current eligibility, appointment information, results and support.</p><ResourceList resources={officialResources}/></section>

        <section id="bloomshield-help"><h2>12. How BloomShield Helps Improve Screening Participation</h2><p>BloomShield is an independent public-health educator. Its connected programmes support understanding, equitable access and navigation while directing people to official NHS services for clinical care.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></section>

        <div className="mt-12"><EditorialInformation/></div>
      </article>
    </div>
  </>;
}
