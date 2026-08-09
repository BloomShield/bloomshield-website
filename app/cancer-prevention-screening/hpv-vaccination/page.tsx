import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import { AtAGlance, BloomShieldExplains, Breadcrumbs, ContentsNav, EditorialInformation, ExternalLink, FaqList, MedicalSafetyAlert, RelatedProgrammes, ResourceList, ReviewDate, ScreeningArticleHero } from "../components";
import { hpvVaccinationEvidence, hpvVaccinationFaqs, officialHpvVaccinationResources, officialLinks } from "../content";
import { screeningArticles } from "../articles";

const title = "HPV Vaccination: Protection Against HPV-Related Cancers | BloomShield CIC";
const description = "Understand how HPV vaccination helps prevent HPV-related cancers, current NHS eligibility and catch-up routes in England, doses, safety and cervical screening.";
const article = screeningArticles.hpvVaccination;

export const metadata = createMetadata({ title, description, path: article.path, absoluteTitle: true, socialImage: { url: "/images/hpv-vaccination-lifestyle-hero.webp", width: 1728, height: 910, alt: "An East Asian mother and older teenage daughter reading health information together in a bright kitchen" } });

const contents = [
  { id: "at-a-glance-title", title: "HPV Vaccination at a Glance" },
  { id: "what-is-hpv", title: "What Is HPV?" },
  { id: "what-vaccine-does", title: "What the HPV Vaccine Does" },
  { id: "cancers", title: "HPV and Cancer Prevention" },
  { id: "eligibility", title: "Who Is Offered HPV Vaccination in England?" },
  { id: "catch-up", title: "Catch-Up and Higher-Risk Routes" },
  { id: "doses", title: "How the Vaccine Is Given" },
  { id: "safety", title: "Safety and Side Effects" },
  { id: "limitations", title: "Limitations and Cervical Screening" },
  { id: "myths", title: "Common Myths" },
  { id: "faqs", title: "Frequently Asked Questions" },
  { id: "evidence", title: "Evidence and References" },
  { id: "official-resources", title: "Official NHS Resources" },
  { id: "bloomshield-help", title: "How BloomShield Helps" },
];

export default function HpvVaccinationPage() {
  const glance = [
    { label: "What it protects against", value: <>Important HPV types linked with cervical, anal, penile, vulval, vaginal and some mouth cancers, as well as genital warts.</> },
    { label: "Routine offer", value: <>All children aged 12 to 13 in school year 8 are offered vaccination in England.</> },
    { label: "Catch-up", value: <>Free catch-up is available to defined cohorts under 25. Some people at higher risk can receive it through sexual health or HIV services.</> },
    { label: "Doses", value: <>The number depends on age and immune health. Follow the schedule given by the vaccinating service.</> },
    { label: "What it cannot do", value: <>The vaccine does not treat an HPV infection or cell changes already present.</> },
    { label: "Cervical screening", value: <><strong>If you are eligible, attend cervical screening when invited even if you have been vaccinated.</strong></> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path={article.path} breadcrumb="HPV Vaccination" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical" medicalAbout={[...article.medicalSubjects]}/>
    <Breadcrumbs current="HPV Vaccination" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>
    <ScreeningArticleHero title="HPV Vaccination: Protection Against HPV-Related Cancers" intro="The HPV vaccine helps protect against important types of human papillomavirus that can cause several cancers. England offers it routinely in school and through defined catch-up and higher-risk pathways." imageSrc="/images/hpv-vaccination-lifestyle-hero.webp" imageAlt="An East Asian mother and older teenage daughter reading health information together in a bright kitchen" accent="teal" eyebrow="Evidence-led cancer prevention guide"><ExternalLink href={officialLinks.nhsHpvVaccine} className="button-primary">Check current NHS HPV vaccine eligibility</ExternalLink><a href="#article-contents" className="button-secondary">Read Our Guide <ArrowRight aria-hidden="true" size={17}/></a></ScreeningArticleHero>

    <div className="container-page space-y-8 py-10 sm:py-14"><AtAGlance title="HPV Vaccination at a Glance" items={glance}/><MedicalSafetyAlert title="Important: Prevention, Not Treatment" programme="vaccination"/><ReviewDate/></div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14"><ContentsNav items={contents}/><article className="health-prose min-w-0">
      <section id="what-is-hpv"><h2>2. What Is HPV?</h2><p>Human papillomavirus, or HPV, is a common group of viruses spread through close skin-to-skin contact, usually during sexual activity. Most HPV infections cause no problems and are cleared by the immune system.</p><p>Some high-risk HPV types can persist and cause cell changes that may develop into cancer over time. HPV is linked with cervical, anal, penile, vulval, vaginal and some mouth and throat cancers.</p></section>

      <section id="what-vaccine-does"><h2>3. What the HPV Vaccine Does</h2><p>The vaccine trains the immune system to recognise HPV types included in the vaccine. It works best before exposure, which is why the routine programme is offered in early adolescence.</p><BloomShieldExplains id="prevention-not-treatment" title="The Vaccine Prevents; It Does Not Treat"><p><strong>The HPV vaccine helps prevent new infection with important cancer-causing HPV types; it does not treat an HPV infection that is already present.</strong> An eligible person may still benefit from protection against vaccine types they have not acquired.</p></BloomShieldExplains></section>

      <section id="cancers"><h2>4. HPV and Cancer Prevention</h2><p>The UK currently uses Gardasil 9, which protects against nine HPV types. UKHSA guidance says the vaccine is highly effective at preventing infection with the included types and has reduced HPV-related disease in vaccinated groups.</p><p>It does not protect against every HPV type or every cancer. Vaccination is one part of prevention alongside cervical screening for eligible people, symptom awareness and appropriate medical assessment.</p></section>

      <section id="eligibility"><h2>5. Who Is Offered HPV Vaccination in England?</h2><p>Current NHS guidance says all children aged 12 to 13, usually in school year 8, are offered the vaccine through school or community services. Arrangements are available for children not attending school.</p><p>Eligibility and delivery differ across the UK and can change. This guide describes England; use the current NHS page or ask a vaccinating service for the position that applies to you.</p></section>

      <section id="catch-up"><h2>6. Catch-Up and Higher-Risk Routes</h2><p>Current NHS catch-up guidance offers free vaccination up to the 25th birthday to all eligible girls who missed it and to eligible boys born after 1 September 2006. Contact a school nurse, school vaccination team or GP surgery.</p><p>Gay, bisexual and other men who have sex with men can be vaccinated through sexual health or HIV clinics up to their 46th birthday. Vaccination is also sometimes recommended for other people at higher risk, including some trans people, sex workers and people with HIV. The service will confirm eligibility.</p><p>These are time-sensitive programme rules. Check <ExternalLink href={officialLinks.nhsHpvVaccine} className="health-inline-link">current NHS eligibility</ExternalLink> rather than relying on an old invitation or age rule.</p></section>

      <section id="doses"><h2>7. How the Vaccine Is Given</h2><p>The vaccine is given into the upper arm. Current NHS guidance says eligible people under 25 usually have one dose; people aged 25 to 45 usually have two doses between 6 months and 2 years apart; and people with a weakened immune system have three doses over 12 months.</p><p>Individual schedules can differ. Follow the advice from the vaccinating service, including what to do if a dose was delayed.</p></section>

      <section id="safety"><h2>8. Safety and Side Effects</h2><p>The HPV vaccine has been used in the UK for many years. Common effects are usually mild and short-lived, such as pain or swelling at the injection site, headache, temperature, dizziness, nausea or tiredness.</p><p>A severe allergic reaction is very rare, and vaccinators are trained to respond. Tell the service about a previous serious allergic reaction, a high temperature, pregnancy or any concern. NHS guidance says the vaccine can be given while breastfeeding.</p></section>

      <section id="limitations"><h2>9. Limitations and Cervical Screening</h2><ul><li>The vaccine does not treat an HPV infection, genital warts or existing cell changes.</li><li>It does not protect against every HPV type or every HPV-related cancer.</li><li>It does not prevent infections unrelated to HPV.</li><li>Vaccinated people who are eligible for cervical screening should still attend when invited.</li></ul><p>The <Link href="/cancer-prevention-screening/hpv-test" className="health-inline-link">HPV Test guide</Link> explains HPV results, while the <Link href="/cancer-prevention-screening/cervical-screening" className="health-inline-link">NHS Cervical Screening guide</Link> explains the programme in England.</p></section>

      <section id="myths"><h2>10. Common Myths</h2><h3>“The vaccine can give me HPV.”</h3><p>No. It does not contain live HPV and cannot cause HPV infection.</p><h3>“Vaccination treats an HPV-positive result.”</h3><p>No. It prevents new infection; it does not clear an infection or treat cell changes already present.</p><h3>“Vaccinated people do not need cervical screening.”</h3><p>Incorrect. Eligible people should still attend because vaccination does not cover every cancer-causing HPV type.</p></section>

      <section id="faqs"><h2>11. Frequently Asked Questions</h2><FaqList faqs={hpvVaccinationFaqs}/></section>
      <section id="evidence"><h2>12. Evidence and References</h2><p>Eligibility and dose schedules were checked against current NHS and UKHSA guidance for England in August 2026.</p><ResourceList resources={hpvVaccinationEvidence}/></section>
      <section id="official-resources"><h2>13. Official NHS Resources</h2><ResourceList resources={officialHpvVaccinationResources}/></section>
      <section id="bloomshield-help"><h2>14. How BloomShield Helps</h2><p>Clear information is one part of equitable access. BloomShield’s connected programmes support understanding, practical access and navigation across screening and care pathways.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></section>
      <div className="mt-12"><EditorialInformation evidenceSources="NHS, UK Health Security Agency and GOV.UK"/></div>
    </article></div>
  </>;
}
