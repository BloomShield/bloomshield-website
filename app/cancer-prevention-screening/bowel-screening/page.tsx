import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import {
  AtAGlance, Breadcrumbs, ContentsNav, EditorialInformation, ExternalLink, FaqList,
  MedicalSafetyAlert, RelatedProgrammes, ResourceList, ReviewDate,
} from "../components";
import { bowelEvidence, bowelFaqs, officialBowelResources, officialLinks } from "../content";

const title = "NHS Bowel Cancer Screening: Age, FIT Test and Results | BloomShield CIC";
const description = "Understand NHS bowel cancer screening, who is invited, how the FIT test works, possible results, benefits, limitations and where to find official NHS support.";

export const metadata = createMetadata({ title, description, path: "/cancer-prevention-screening/bowel-screening", absoluteTitle: true });

const contents = [
  { id: "what-is-bowel-cancer", title: "What is bowel cancer?" },
  { id: "why-screening-matters", title: "Why bowel cancer screening matters" },
  { id: "eligibility", title: "Who is eligible for NHS bowel cancer screening?" },
  { id: "fit-test", title: "How the FIT screening test works" },
  { id: "results", title: "What your bowel screening result may mean" },
  { id: "benefits", title: "Benefits of bowel cancer screening" },
  { id: "limitations", title: "Limitations and possible harms" },
  { id: "symptoms", title: "Bowel cancer symptoms" },
  { id: "faqs", title: "Frequently asked questions" },
  { id: "evidence", title: "Evidence and references" },
  { id: "official-resources", title: "Official NHS resources" },
  { id: "bloomshield-help", title: "How BloomShield helps improve screening participation" },
];

export default function BowelScreeningPage() {
  const glance = [
    { label: "Who is usually invited", value: <>In England, people aged 50 to 74 who are registered with a GP and live in England are invited under current programme guidance. Arrangements differ across the UK.</> },
    { label: "The test used", value: <>A faecal immunochemical test (FIT), which checks a small poo sample for traces of human blood.</> },
    { label: "How the test is completed", value: <>At home, using the sampling stick and bottle supplied, then returning the kit by post.</> },
    { label: "How often screening is offered", value: <>Usually every two years while a person remains eligible. Check current guidance for your UK nation.</> },
    { label: "What happens after the result", value: <>A letter explains whether no further tests are needed at that time, whether the test needs to be repeated, or whether you should speak with the screening team about further investigation.</> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path="/cancer-prevention-screening/bowel-screening" breadcrumb="NHS Bowel Cancer Screening" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical"/>
    <Breadcrumbs current="NHS Bowel Cancer Screening" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>

    <header className="border-y border-teal-900/10 bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <div className="container-page py-14 sm:py-20">
        <p className="eyebrow">Evidence-led screening guide</p>
        <h1 className="display max-w-4xl">NHS Bowel Cancer Screening</h1>
        <p className="lead mt-7 max-w-3xl text-xl leading-9">A plain-language guide to eligibility, the home FIT kit, possible results, benefits, limitations and official support.</p>
        <div className="mt-8 flex flex-wrap gap-3"><ExternalLink href={officialLinks.govProgrammeOverview} className="button-primary">Check the current NHS bowel screening eligibility guidance</ExternalLink><a href="#article-contents" className="button-secondary">Read this guide <ArrowRight aria-hidden="true" size={17}/></a></div>
      </div>
    </header>

    <div className="container-page space-y-8 py-10 sm:py-14">
      <AtAGlance items={glance}/>
      <MedicalSafetyAlert/>
      <ReviewDate/>
    </div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14">
      <ContentsNav items={contents}/>
      <article className="health-prose min-w-0">
        <section id="what-is-bowel-cancer"><h2>1. What is bowel cancer?</h2><p>Bowel cancer is cancer that begins in the large bowel. Depending on where it starts, it may also be called colon cancer or rectal cancer.</p><p>Cells can sometimes grow in the inner lining of the bowel and form small growths called polyps. Most polyps are not cancer, but some can develop into cancer over time.</p></section>

        <section id="why-screening-matters"><h2>2. Why bowel cancer screening matters</h2><p>NHS bowel screening is offered to people without symptoms to look for signs that could need further investigation. It may find bowel cancer at an earlier stage and can find polyps that may be removed before they develop into cancer.</p><p>Screening is a choice. Official programme information explains the possible benefits and risks so that each person can make an informed decision.</p></section>

        <section id="eligibility"><h2>3. Who is eligible for NHS bowel cancer screening?</h2><p>In England, NHS bowel cancer screening is being offered to eligible people within the programme’s current age range. Current GOV.UK programme guidance says people aged 50 to 74 who are registered with a GP and live in England are invited every two years. People aged 75 or over can request a kit every two years through the programme helpline.</p><p>Eligibility and programme arrangements can differ across England, Scotland, Wales and Northern Ireland, and can change over time. Use the official information for the nation where you live.</p><ExternalLink href={officialLinks.govProgrammeOverview} className="health-inline-link">Check the current NHS bowel screening eligibility guidance</ExternalLink></section>

        <section id="fit-test"><h2>4. How the FIT screening test works</h2><p>FIT means faecal immunochemical test. It looks for very small traces of human blood in a poo sample. Blood can be present for reasons other than cancer, and not all bowel cancers bleed.</p><ol><li>The screening programme sends an invitation and home test kit to an eligible person.</li><li>The person follows the kit instructions to collect one small sample of poo using the sampling stick.</li><li>The stick is returned to the labelled bottle and the sealed kit is posted to the laboratory in the packaging provided.</li><li>The programme sends the result and explains any next step.</li></ol><p>The test is completed at home and does not involve inserting anything into the body.</p></section>

        <section id="results"><h2>5. What your bowel screening result may mean</h2><h3>No further tests needed at this time</h3><p>This means no blood was found, or the amount was below the programme threshold. It does not guarantee that you do not have bowel cancer. Contact your GP if you have symptoms or concerns, even after this result.</p><h3>Further tests needed</h3><p>This means the amount of blood found was at or above the programme threshold. It does not mean that you have cancer. The programme will contact you to discuss the result and further investigation, which may include a colonoscopy.</p><h3>The test needs to be repeated</h3><p>Sometimes another sample is needed because the kit could not be analysed or was not completed correctly. Follow the instructions in the result letter or contact the screening programme.</p></section>

        <section id="benefits"><h2>6. Benefits of bowel cancer screening</h2><ul><li>It can identify signs of bowel cancer before symptoms develop.</li><li>Finding cancer earlier may make treatment more effective.</li><li>It can find polyps that may be removed before they develop into cancer.</li><li>The first-stage FIT screening test is completed privately at home.</li><li>People with a result that needs investigation are offered a defined follow-up pathway.</li></ul></section>

        <section id="limitations"><h2>7. Limitations and possible harms</h2><p>Screening tests are not completely accurate. Understanding limitations is part of making an informed choice.</p><ul><li><strong>False-negative results can occur:</strong> FIT may not detect blood in the sample even when a bowel cancer or polyp is present.</li><li><strong>False-positive results can occur:</strong> blood may be found for a reason other than cancer, leading to anxiety and further tests.</li><li><strong>Further investigations have risks:</strong> colonoscopy is generally safe but can cause complications. The clinical team should explain these before a procedure.</li><li><strong>Screening can give false reassurance:</strong> a result requiring no further tests does not rule out cancer now or in the future.</li><li><strong>Screening and symptomatic FIT are different pathways:</strong> a screening FIT is not necessarily the same as a FIT requested by a clinician to investigate symptoms.</li></ul></section>

        <div className="my-10"><MedicalSafetyAlert title="Symptoms need medical advice"/></div>

        <section id="symptoms"><h2>8. Bowel cancer symptoms</h2><p>Symptoms can have many causes and do not necessarily mean cancer, but it is important to get checked. NHS-listed symptoms include:</p><ul><li>a change in your usual poo, including softer poo, diarrhoea or constipation</li><li>needing to poo more or less often than usual</li><li>blood in your poo or bleeding from your bottom</li><li>tummy pain, bloating or a lump in your tummy</li><li>losing weight without trying</li><li>feeling unusually tired or short of breath, which may be signs of anaemia</li></ul><p>Contact your GP if you have symptoms or a change that is not normal for you. Current NHS advice says to ask for an urgent GP appointment or use NHS 111 for black or dark-red poo or bloody diarrhoea, and to call 999 or go to A&amp;E for severe or non-stop bleeding.</p><ExternalLink href={officialLinks.nhsBowelSymptoms} className="health-inline-link">Read current NHS bowel cancer symptoms and urgent-action advice</ExternalLink></section>

        <section id="faqs"><h2>9. Frequently asked questions</h2><FaqList faqs={bowelFaqs}/></section>

        <section id="evidence"><h2>10. Evidence and references</h2><p>This evidence list is designed to be expanded as the library develops. Sources were selected for authority, relevance and currency; programme details should always be checked at source.</p><ResourceList resources={bowelEvidence}/></section>

        <section id="official-resources"><h2>11. Official NHS resources</h2><p>Use these official sources for current eligibility, programme arrangements, results and support.</p><ResourceList resources={officialBowelResources}/></section>

        <section id="bloomshield-help"><h2>12. How BloomShield helps improve screening participation</h2><p>Information alone does not remove every barrier. BloomShield’s connected programmes support understanding, equitable access and navigation across screening pathways.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></section>

        <div className="mt-12"><EditorialInformation/></div>
      </article>
    </div>
  </>;
}
