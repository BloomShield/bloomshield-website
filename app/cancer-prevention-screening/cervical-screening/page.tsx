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

const article = screeningArticles.cervical;
const title = "NHS Cervical Screening: Eligibility, HPV Test and Results | BloomShield CIC";
const description = "Understand NHS cervical screening in England, who is invited, how HPV testing works, possible results, benefits, limitations and official NHS support.";

export const metadata = createMetadata({
  title,
  description,
  path: article.path,
  absoluteTitle: true,
  socialImage: {
    url: "/images/cervical-screening-lifestyle-hero.webp",
    width: 1536,
    height: 1024,
    alt: "An Asian woman smiling confidently in a bright modern home",
  },
});

const contents = [
  { id: "what-is-cervical-screening", title: "What Is Cervical Screening?" },
  { id: "why-screening-matters", title: "Why Cervical Screening Matters" },
  { id: "eligibility", title: "Who Is Eligible for NHS Cervical Screening?" },
  { id: "how-screening-works", title: "How Cervical Screening Works" },
  { id: "results", title: "What Your Cervical Screening Result May Mean" },
  { id: "benefits", title: "Benefits of Cervical Screening" },
  { id: "limitations", title: "Limitations and Possible Harms" },
  { id: "symptoms", title: "Symptoms Need Medical Advice" },
  { id: "faqs", title: "Frequently Asked Questions" },
  { id: "evidence", title: "Evidence and References" },
  { id: "official-resources", title: "Official NHS Resources" },
  { id: "bloomshield-help", title: "How BloomShield Helps Improve Screening Participation" },
];

const faqs = [
  { question: "Is cervical screening a test for cancer?", answer: "No. NHS cervical screening first checks the sample for types of human papillomavirus (HPV) that can cause changes to cells in the cervix. If high-risk HPV is found, the same sample is checked for cell changes. Further tests are needed to diagnose cancer." },
  { question: "How often is cervical screening offered in England?", answer: "Current NHS guidance says eligible people aged 25 to 64 are usually invited every five years. Some people are invited sooner because of a previous result or follow-up plan. Follow the timing in your NHS letter." },
  { question: "Who needs cervical screening?", answer: "Women and people with a cervix within the eligible age range may benefit from cervical screening. Invitations are based partly on the sex recorded in GP records, so some trans men and non-binary people with a cervix may need to ask their GP or local screening service to arrange screening." },
  { question: "Does the test hurt?", answer: "Some people find the test uncomfortable or painful, while others do not. You can ask for a smaller speculum, a different position, more time or to stop at any point. Tell the sample taker what would help you." },
  { question: "Can I have cervical screening during pregnancy?", answer: "Routine cervical screening is usually delayed until after pregnancy. If you are pregnant, have recently given birth or are under follow-up for a previous result, contact your GP or screening team for advice about the right timing." },
  { question: "Do I still need screening after HPV vaccination?", answer: "Yes. HPV vaccination reduces risk but does not protect against every high-risk HPV type. Eligible people should still consider cervical screening when invited." },
  { question: "What if high-risk HPV is found?", answer: "This does not mean you have cervical cancer. The laboratory may check the same sample for cell changes. Depending on the result, you may be invited for another screening test or referred for colposcopy." },
  { question: "What should I do if I have symptoms?", answer: "Contact your GP rather than waiting for cervical screening. Symptoms such as bleeding between periods, during or after sex, after menopause, changes to vaginal discharge, pain during sex or persistent lower tummy or pelvic pain should be assessed." },
] as const;

const evidence: ExternalResource[] = [
  { title: "Cervical screening", description: "Public information about the NHS cervical screening test, appointments and results.", href: officialLinks.nhsCervicalScreening, organisation: "NHS" },
  { title: "Cervical screening: programme overview", description: "Current target population, screening pathway and programme information for England.", href: officialLinks.govCervicalOverview, organisation: "NHS England and GOV.UK" },
  { title: "Your guide to NHS cervical screening", description: "NHS England information about HPV testing, possible results, benefits, risks and support.", href: officialLinks.nhsEnglandCervicalGuide, organisation: "NHS England" },
  { title: "When you will be invited for cervical screening", description: "Current NHS invitation guidance, including information for trans and non-binary people.", href: officialLinks.nhsCervicalInvitations, organisation: "NHS" },
];

const officialResources = evidence.slice(0, 4);

export default function CervicalScreeningPage() {
  const glance = [
    { label: "Who is usually invited", value: <>In England, women and people with a cervix aged 25 to 64 are eligible. Automatic invitations depend on the sex recorded in GP records.</> },
    { label: "The test used", value: <>A small sample of cells is taken from the cervix and tested for high-risk human papillomavirus (HPV).</> },
    { label: "How the test is completed", value: <>A trained sample taker gently uses a speculum to see the cervix, then collects the sample with a soft brush.</> },
    { label: "How often screening is offered", value: <>Usually every five years in England under current guidance, unless earlier follow-up is recommended.</> },
    { label: "What happens after the result", value: <>A letter explains whether high-risk HPV was found and whether routine recall, earlier repeat screening or colposcopy is recommended.</> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path={article.path} breadcrumb="NHS Cervical Screening" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical" medicalAbout={[...article.medicalSubjects]}/>
    <Breadcrumbs current="NHS Cervical Screening" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>

    <ScreeningArticleHero title="NHS Cervical Screening" intro="A plain-language guide to eligibility, HPV testing, possible results, benefits, limitations and official support in England." imageSrc="/images/cervical-screening-lifestyle-hero.webp" imageAlt="An Asian woman smiling confidently in a bright modern home" accent="teal"><ExternalLink href={officialLinks.govCervicalOverview} className="button-primary">Check the current NHS cervical screening eligibility guidance</ExternalLink><a href="#article-contents" className="button-secondary">Read Our Guide <ArrowRight aria-hidden="true" size={17}/></a></ScreeningArticleHero>

    <div className="container-page space-y-8 py-10 sm:py-14">
      <AtAGlance title="Cervical Screening at a Glance" items={glance}/>
      <MedicalSafetyAlert programme="cervical"/>
      <ReviewDate/>
    </div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14">
      <ContentsNav items={contents}/>
      <article className="health-prose min-w-0">
        <section id="what-is-cervical-screening"><h2>1. What Is Cervical Screening?</h2><p>Cervical screening is an NHS test offered to people without symptoms. It checks the health of the cervix, which is the opening to the womb from the vagina.</p><p>The screening sample is tested for high-risk types of human papillomavirus (HPV). These HPV types can cause cell changes that may develop into cervical cancer over time. Cervical screening is not a test that diagnoses cancer.</p></section>

        <section id="why-screening-matters"><h2>2. Why Cervical Screening Matters</h2><p>High-risk HPV can cause changes to cells in the cervix. Screening can identify HPV and cell changes before they develop into cancer, allowing monitoring or treatment where appropriate.</p><p>Screening is a choice. Official programme information explains the possible benefits, limitations and follow-up so each person can decide whether to attend.</p></section>

        <section id="eligibility"><h2>3. Who Is Eligible for NHS Cervical Screening?</h2><p>This guide describes the NHS programme in England. Under current guidance, women and people with a cervix aged 25 to 64 are eligible, usually every five years. A first invitation is normally sent shortly before age 25. Some people are invited sooner because of a previous result or follow-up plan.</p><p>Automatic invitations are linked to the sex recorded in GP records. Trans men and non-binary people registered as male who have a cervix may not receive an automatic invitation and can ask their GP practice or local cervical screening service to arrange screening. Trans women do not need cervical screening because they do not have a cervix.</p><p>Programme arrangements differ across the UK nations and may change. Use the official guidance for where you live and follow any individual advice in your screening letter.</p><ExternalLink href={officialLinks.nhsCervicalInvitations} className="health-inline-link">Check current NHS cervical screening invitation guidance</ExternalLink></section>

        <section id="how-screening-works"><h2>4. How Cervical Screening Works</h2><ol><li>You receive an invitation and book with your GP practice or a sexual health service that offers cervical screening.</li><li>At the appointment, you undress from the waist down in private and are given a covering.</li><li>A trained sample taker gently places a smooth tube called a speculum into the vagina so they can see the cervix.</li><li>They use a soft brush to collect a small sample of cells from the cervix.</li><li>The laboratory tests the sample for high-risk HPV. If HPV is found, the same sample is checked for cell changes.</li></ol><p>You are in control of the appointment. You can ask questions, request adjustments, ask the sample taker to stop or choose not to continue.</p></section>

        <section id="results"><h2>5. What Your Cervical Screening Result May Mean</h2><h3>High-Risk HPV Not Found</h3><p>No high-risk HPV was found in the sample. You will usually be invited again at the routine interval if you remain eligible.</p><h3>High-Risk HPV Found, with No Cell Changes</h3><p>This does not mean cancer. You will usually be invited for another cervical screening test sooner so the HPV can be checked again.</p><h3>High-Risk HPV Found, with Cell Changes</h3><p>You will usually be referred for colposcopy, where a specialist examines the cervix more closely. Most people referred for colposcopy do not have cervical cancer.</p><h3>The Result Is Unclear</h3><p>Occasionally a sample cannot be tested. You may be asked to repeat cervical screening, following the timing in your result letter.</p></section>

        <section id="benefits"><h2>6. Benefits of Cervical Screening</h2><ul><li>It can find high-risk HPV before any symptoms develop.</li><li>It can identify cell changes that can be monitored or treated before they become cancer.</li><li>People who need further assessment are offered a defined follow-up pathway.</li><li>The appointment is usually brief and can be adapted to support individual access needs.</li></ul></section>

        <section id="limitations"><h2>7. Limitations and Possible Harms</h2><p>Screening tests are not completely accurate. Understanding limitations is part of making an informed choice.</p><ul><li><strong>HPV is common:</strong> a positive HPV result does not mean cancer and may cause anxiety.</li><li><strong>False-negative results can occur:</strong> screening may not identify every HPV infection or cell change.</li><li><strong>Further tests may be needed:</strong> colposcopy and treatment can cause discomfort, bleeding or other complications that the clinical team should explain.</li><li><strong>Some cell changes may not have caused harm:</strong> screening can identify changes that might not otherwise have progressed, leading to monitoring or treatment.</li><li><strong>Screening can give false reassurance:</strong> a result that returns you to routine recall does not rule out cervical cancer now or in the future.</li></ul></section>

        <div className="my-10"><MedicalSafetyAlert title="Symptoms Need Medical Advice" programme="cervical"/></div>

        <section id="symptoms"><h2>8. Symptoms Need Medical Advice</h2><p>Cervical screening is not used to investigate symptoms. Contact your GP if you notice a change that is unusual for you, including:</p><ul><li>vaginal bleeding between periods, during or after sex, or after menopause</li><li>changes to vaginal discharge</li><li>pain during sex</li><li>persistent pain in the lower tummy, pelvis or lower back</li></ul><p>These symptoms can have many causes and do not necessarily mean cancer. Do not wait for a routine screening appointment or result before asking for medical advice.</p></section>

        <section id="faqs"><h2>9. Frequently Asked Questions</h2><FaqList faqs={faqs}/></section>

        <section id="evidence"><h2>10. Evidence and References</h2><p>Sources were selected for authority, relevance and currency. Programme details should always be checked at source because eligibility and pathways can change.</p><ResourceList resources={evidence}/></section>

        <section id="official-resources"><h2>11. Official NHS Resources</h2><p>Use these official sources for current eligibility, appointment information, results and support.</p><ResourceList resources={officialResources}/></section>

        <section id="bloomshield-help"><h2>12. How BloomShield Helps Improve Screening Participation</h2><p>BloomShield is an independent public-health educator. Its connected programmes support understanding, equitable access and navigation while directing people to official NHS services for clinical care.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></section>

        <div className="mt-12"><EditorialInformation/></div>
      </article>
    </div>
  </>;
}
