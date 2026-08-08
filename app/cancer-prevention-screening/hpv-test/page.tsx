import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import {
  AtAGlance, BloomShieldExplains, Breadcrumbs, ContentsNav, EditorialInformation,
  ExternalLink, FaqList, MedicalSafetyAlert, RelatedProgrammes, ResourceList,
  ReviewDate, ScreeningArticleHero,
} from "../components";
import { hpvEvidence, hpvFaqs, officialHpvResources, officialLinks } from "../content";
import { screeningArticles } from "../articles";

const title = "HPV Test Explained: Cervical Screening and Results | BloomShield CIC";
const description = "Understand what an HPV test checks for, how HPV testing is used in NHS cervical screening, what different results may mean, and why having HPV does not mean you have cancer.";
const article = screeningArticles.hpv;

export const metadata = createMetadata({
  title,
  description,
  path: article.path,
  absoluteTitle: true,
  socialImage: {
    url: "/images/hpv-test-lifestyle-hero.webp",
    width: 1690,
    height: 931,
    alt: "An Asian woman holding a mug in a bright, warmly lit home",
  },
});

const contents = [
  { id: "at-a-glance-title", title: "HPV Test at a Glance" },
  { id: "what-is-hpv", title: "What Is HPV?" },
  { id: "what-is-an-hpv-test", title: "What Is an HPV Test?" },
  { id: "why-hpv-testing-is-used", title: "Why HPV Testing Is Used in Cervical Screening" },
  { id: "sample", title: "How the Sample Is Collected" },
  { id: "results", title: "What Your Result May Mean" },
  { id: "benefits", title: "Benefits of HPV Testing" },
  { id: "limitations", title: "Limitations and Possible Harms" },
  { id: "relationships", title: "HPV, Relationships and Stigma" },
  { id: "myths", title: "Common Myths About HPV" },
  { id: "faqs", title: "Frequently Asked Questions" },
  { id: "evidence", title: "Evidence and References" },
  { id: "official-resources", title: "Official NHS Resources" },
  { id: "bloomshield-help", title: "How BloomShield Helps" },
];

export default function HpvTestPage() {
  const glance = [
    { label: "What HPV stands for", value: <>Human papillomavirus.</> },
    { label: "What the test checks for", value: <>High-risk HPV types that can cause cervical cell changes. It does not diagnose cervical cancer.</> },
    { label: "How it is used", value: <>In England, the cervical screening sample is tested for high-risk HPV first.</> },
    { label: "How the sample is collected", value: <>A nurse or doctor uses a soft brush to collect cells from the cervix during cervical screening.</> },
    { label: "What an HPV-positive result means", value: <>High-risk HPV was found. The next step depends on whether abnormal cervical cells are also found and on previous results.</> },
    { label: "What the result cannot tell you", value: <><strong>It cannot show when HPV was acquired or from whom, and it does not mean that you have cancer.</strong></> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path={article.path} breadcrumb="HPV Test" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical" medicalAbout={[...article.medicalSubjects]}/>
    <Breadcrumbs current="HPV Test" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>

    <ScreeningArticleHero title="HPV Test" intro="HPV testing checks a cervical screening sample for high-risk types of human papillomavirus. Finding high-risk HPV does not mean that you have cervical cancer, but it helps the screening programme decide whether any further checks are needed." imageSrc="/images/hpv-test-lifestyle-hero.webp" imageAlt="An Asian woman holding a mug in a bright, warmly lit home" accent="teal"><ExternalLink href={officialLinks.nhsCervicalResults} className="button-primary">Read current NHS cervical screening result guidance</ExternalLink><a href="#article-contents" className="button-secondary">Read Our Guide <ArrowRight aria-hidden="true" size={17}/></a></ScreeningArticleHero>

    <div className="container-page space-y-8 py-10 sm:py-14">
      <AtAGlance title="HPV Test at a Glance" items={glance}/>
      <MedicalSafetyAlert title="Important: Screening and Symptoms" programme="hpv"/>
      <ReviewDate/>
    </div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14">
      <ContentsNav items={contents}/>
      <article className="health-prose min-w-0">
        <section id="what-is-hpv"><h2>2. What Is HPV?</h2><p>HPV is a group of common viruses. It is passed through close skin-to-skin sexual contact and usually causes no symptoms. Most HPV infections are cleared by the immune system without causing problems.</p><p>Some HPV types are called high-risk because, if they persist, they can cause changes to cells that may develop into cancer. In cervical screening, the test looks for high-risk HPV types linked to cervical cell changes. Having high-risk HPV is not the same as having cervical cancer.</p><p>HPV can remain in the body for years without being detected or causing problems. A later positive result cannot establish when the infection was acquired.</p></section>

        <section id="what-is-an-hpv-test"><h2>3. What Is an HPV Test?</h2><p>An HPV test checks a sample of cervical cells for high-risk HPV. There is no blood test for HPV used in cervical screening. The laboratory result helps identify who is at very low risk and who may need the sample checked for abnormal cells or further follow-up.</p><p>Cervical screening used to be widely called a smear test. In the current England pathway, high-risk HPV testing is the first laboratory test performed on the cervical sample.</p></section>

        <section id="why-hpv-testing-is-used"><h2>4. Why HPV Testing Is Used in Cervical Screening</h2><p>Persistent high-risk HPV causes most cervical cell changes that can lead to cervical cancer. Testing for high-risk HPV first helps the programme identify people who may benefit from closer checks while allowing people with an HPV-negative result to return to routine recall.</p><p>Cervical screening is a prevention programme for eligible people without symptoms. It is not a diagnostic test for cervical cancer and does not check for ovarian, womb, vulval, vaginal or every other gynaecological cancer.</p><p>Read how HPV testing fits into the <Link href="/cancer-prevention-screening/cervical-screening" className="health-inline-link">NHS Cervical Screening guide</Link>.</p></section>

        <section id="sample"><h2>5. How the Sample Is Collected</h2><p>During a standard cervical screening appointment, a nurse or doctor gently inserts a speculum so they can see the cervix. They use a soft brush to collect a small sample of cells, which is sent to a laboratory for HPV testing.</p><p>You are in control of the appointment. You can ask questions, request adjustments, ask for a smaller speculum where appropriate, pause or stop. Follow the instructions from the service offering your test because arrangements can differ across the UK.</p></section>

        <section id="results"><h2>6. What Your Result May Mean</h2><h3>High-Risk HPV Not Found</h3><p>No high-risk HPV was detected in the sample. Your risk of developing cervical cancer before the next routine screen is very low. Your result will say when you should next be invited.</p><h3>High-Risk HPV Found, No Abnormal Cells</h3><p>High-risk HPV was detected, but no abnormal cervical cell changes were found. The screening programme will invite you for follow-up at the interval stated in your result.</p><h3>High-Risk HPV Found and Abnormal Cells</h3><p>High-risk HPV and abnormal cervical cells were found. You will usually be referred for colposcopy so the cervix can be examined more closely. This result is not a cancer diagnosis.</p><h3>Unclear or Inadequate Result</h3><p>Sometimes the laboratory cannot produce a reliable result and another cervical sample is needed. This does not mean that something is wrong.</p><BloomShieldExplains id="hpv-positive-does-not-mean-cancer" title="An HPV-Positive Result Is Not a Cancer Diagnosis"><p><strong>Testing positive for high-risk HPV does not mean that you have cervical cancer.</strong> HPV is very common, and the immune system clears most infections without treatment. Your screening result determines whether another screening test, cell check or colposcopy is needed.</p></BloomShieldExplains></section>

        <section id="benefits"><h2>7. Benefits of HPV Testing</h2><ul><li>It identifies the high-risk HPV types that can cause cervical cell changes.</li><li>An HPV-negative result identifies people at very low risk before their next routine screen.</li><li>When high-risk HPV is found, the sample can be checked for abnormal cells so follow-up is directed to those who may benefit.</li><li>Finding and treating significant cervical cell changes can prevent cervical cancer.</li></ul></section>

        <section id="limitations"><h2>8. Limitations and Possible Harms</h2><ul><li><strong>No screening test is perfect:</strong> HPV or cell changes may occasionally be missed, and future infection or changes can still occur.</li><li><strong>A positive result can cause anxiety:</strong> even though it does not mean cancer and cannot date the infection.</li><li><strong>Follow-up can involve further procedures:</strong> repeat screening, colposcopy or biopsy may be recommended, and these have their own discomforts and risks.</li><li><strong>The test has a specific purpose:</strong> it does not assess symptoms or screen for every gynaecological cancer.</li></ul></section>

        <section id="relationships"><h2>9. HPV, Relationships and Stigma</h2><p>HPV is common and can be acquired after limited sexual contact. It may remain undetected for many years or become detectable again after a long period. A positive result cannot show when HPV was acquired, who it came from or whether a partner has been unfaithful.</p><p>HPV is a health issue, not a judgement about a person or relationship. Partners do not usually need an HPV test because there is no routine general HPV test for partners without a cervix. Use NHS or sexual-health advice if you have questions about symptoms, genital warts or vaccination.</p></section>

        <div className="my-10"><MedicalSafetyAlert title="Symptoms Need Medical Advice" programme="hpv"/></div>

        <section id="myths"><h2>10. Common Myths About HPV</h2><h3>“High-Risk HPV Means I Have Cervical Cancer.”</h3><p>No. It means a virus linked to cervical cell changes was found. Your result explains whether abnormal cells were also found and what follow-up is needed.</p><h3>“A Positive Result Proves Recent Infidelity.”</h3><p>No. HPV can remain undetected for years, and a test cannot establish when or from whom it was acquired.</p><h3>“The HPV Vaccine Means Screening Is No Longer Needed.”</h3><p>No. Vaccination protects against important HPV types but not every type linked to cervical cancer. Attend cervical screening when eligible.</p><h3>“Cervical Screening Checks for Every Gynaecological Cancer.”</h3><p>No. It is designed to help prevent cervical cancer. Symptoms or concerns need clinical assessment.</p></section>

        <section id="faqs"><h2>11. Frequently Asked Questions</h2><FaqList faqs={hpvFaqs}/></section>
        <section id="evidence"><h2>12. Evidence and References</h2><p>These current primary sources describe HPV, England&apos;s cervical screening pathway and the meaning of screening results.</p><ResourceList resources={hpvEvidence}/></section>
        <section id="official-resources"><h2>13. Official NHS Resources</h2><p>Use these official sources for current results, pathway information and support. Screening arrangements differ across UK nations.</p><ResourceList resources={officialHpvResources}/><p>The planned <Link href="/cancer-prevention-screening" className="health-inline-link">HPV Vaccination topic remains marked Coming soon in the Information Library</Link>.</p></section>
        <section id="bloomshield-help"><h2>14. How BloomShield Helps</h2><p>Clear, stigma-reducing information can support informed screening decisions and more equitable access to follow-up.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></section>
        <div className="mt-12"><EditorialInformation evidenceSources="NHS, NHS England and GOV.UK"/></div>
      </article>
    </div>
  </>;
}
