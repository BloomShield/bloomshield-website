import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import { AtAGlance, BloomShieldExplains, Breadcrumbs, ContentsNav, EditorialInformation, ExternalLink, FaqList, MedicalSafetyAlert, RelatedProgrammes, ResourceList, ReviewDate, ScreeningArticleHero } from "../components";
import { cancerRiskEvidence, cancerRiskFaqs, officialCancerRiskResources, officialLinks } from "../content";
import { screeningArticles } from "../articles";

const title = "Reducing Cancer Risk: Practical Steps That Matter | BloomShield CIC";
const description = "Explore practical, evidence-based ways to reduce the risk of some cancers, including tobacco, alcohol, activity, diet, UV protection, vaccination and screening.";
const article = screeningArticles.cancerRisk;

export const metadata = createMetadata({ title, description, path: article.path, absoluteTitle: true, socialImage: { url: "/images/reducing-cancer-risk-lifestyle-hero.webp", width: 1536, height: 843, alt: "A South Asian man taking a relaxed walk along a leafy park path" } });

const contents = [
  { id: "at-a-glance-title", title: "Reducing Cancer Risk at a Glance" },
  { id: "risk-not-guarantee", title: "Risk Reduction, Not a Guarantee" },
  { id: "tobacco", title: "Tobacco and Stop-Smoking Support" },
  { id: "alcohol", title: "Alcohol" },
  { id: "food-weight-activity", title: "Food, Weight and Physical Activity" },
  { id: "uv", title: "UV and Sun Safety" },
  { id: "vaccination", title: "Vaccination and Infection Prevention" },
  { id: "screening", title: "Screening and Early Detection" },
  { id: "workplace", title: "Workplace and Environmental Exposures" },
  { id: "myths", title: "Common Myths" },
  { id: "faqs", title: "Frequently Asked Questions" },
  { id: "evidence", title: "Evidence and References" },
  { id: "official-resources", title: "Official NHS Resources" },
  { id: "bloomshield-help", title: "How BloomShield Helps" },
];

export default function ReducingCancerRiskPage() {
  const glance = [
    { label: "What risk reduction means", value: <>Actions can lower the chance of some cancers. They cannot prevent every cancer.</> },
    { label: "Tobacco", value: <>If you smoke, stopping is an important step. NHS stop-smoking support can make quitting more achievable.</> },
    { label: "Alcohol", value: <>Drinking less reduces alcohol-related health risk. NHS guidance describes 14 units a week as low risk, not safe.</> },
    { label: "Everyday health", value: <>A balanced diet, movement that suits you and support to maintain a healthy weight can contribute to lower risk.</> },
    { label: "Protection", value: <>Avoid sunburn, follow workplace safety controls, and have HPV or hepatitis B vaccination if offered.</> },
    { label: "Screening and symptoms", value: <><strong>Attend appropriate NHS screening when invited, but never wait for screening if you have symptoms.</strong></> },
  ];

  return <>
    <PageStructuredData name={title} description={description} path={article.path} breadcrumb="Reducing Cancer Risk" parentBreadcrumb={{ name: "Cancer Prevention & Screening Hub", path: "/cancer-prevention-screening" }} kind="medical" medicalAbout={[...article.medicalSubjects]}/>
    <Breadcrumbs current="Reducing Cancer Risk" parent={{ label: "Cancer Prevention & Screening Hub", href: "/cancer-prevention-screening" }}/>
    <ScreeningArticleHero title="Reducing Cancer Risk: Practical Steps That Matter" intro="Cancer is not always preventable, and it can affect people who follow healthy lifestyles. Evidence-based choices and support can still reduce the risk of some cancers and improve health more broadly." imageSrc="/images/reducing-cancer-risk-lifestyle-hero.webp" imageAlt="A South Asian man taking a relaxed walk along a leafy park path" imagePosition={{ base: "88% 50%", desktop: "86% 50%" }} accent="green" eyebrow="Evidence-led cancer prevention guide"><ExternalLink href={officialLinks.nhsCancer} className="button-primary">Read official NHS cancer guidance</ExternalLink><a href="#article-contents" className="button-secondary">Read Our Guide <ArrowRight aria-hidden="true" size={17}/></a></ScreeningArticleHero>

    <div className="container-page space-y-8 py-10 sm:py-14"><AtAGlance title="Reducing Cancer Risk at a Glance" items={glance}/><MedicalSafetyAlert title="Important: Risk Reduction Is Not Prevention of Every Cancer" programme="prevention"/><ReviewDate/></div>

    <div id="article-contents" className="container-page grid items-start gap-10 pb-20 lg:grid-cols-[17rem_minmax(0,48rem)] lg:justify-center lg:gap-14"><ContentsNav items={contents}/><article className="health-prose min-w-0">
      <section id="risk-not-guarantee"><h2>2. Risk Reduction, Not a Guarantee</h2><p>Risk describes chance across groups, not a prediction for one person. Age, genes, infections, environment, chance and health behaviours can all play a part. Some factors cannot be changed.</p><BloomShieldExplains id="reducing-not-eliminating" title="Reducing Risk Is Not Eliminating Risk"><p><strong>A lower risk is not zero risk.</strong> People can develop cancer even when they do not smoke, drink little or no alcohol, eat well and stay active. Prevention information should support informed choices, not create blame.</p></BloomShieldExplains><p>This guide focuses on England and general adult advice. Ask a healthcare professional for support that reflects your health, disability, pregnancy, medicines and circumstances.</p></section>

      <section id="tobacco"><h2>3. Tobacco and Stop-Smoking Support</h2><p>Smoking increases the risk of several cancers. Stopping reduces risk over time, and it is worth getting support at any age. Dependence is not a lack of willpower: nicotine is addictive, and evidence-based support can help.</p><p>NHS stop-smoking services can advise on medicines, nicotine-replacement products and behavioural support. People who use shisha, bidis or paan with tobacco are also exposed to tobacco-related harm.</p><ExternalLink href={officialLinks.nhsQuitSmoking} className="health-inline-link">Find NHS stop-smoking information and support</ExternalLink></section>

      <section id="alcohol"><h2>4. Alcohol</h2><p>Alcohol is linked with several cancers. NHS advice says that, if you drink most weeks, keeping below 14 units a week, spreading drinking over three or more days and having drink-free days can keep health risks lower.</p><p>The NHS describes this as low-risk rather than safe drinking because no level is risk-free. Cutting down is worthwhile, and people who are dependent on alcohol should seek medical advice before stopping suddenly.</p></section>

      <section id="food-weight-activity"><h2>5. Food, Weight and Physical Activity</h2><p>A balanced pattern of eating supports overall health. NHS guidance recommends a variety of fruit and vegetables, higher-fibre foods, beans and pulses, and less red and processed meat. No single food prevents cancer.</p><p>Maintaining a healthy weight can reduce the risk of some cancers, but weight is influenced by health, medicines, income, environment and access—not simply personal choice. Support should be practical and non-stigmatising.</p><p>Adults are generally advised to aim for at least 150 minutes of moderate activity or 75 minutes of vigorous activity a week, with strengthening activity on two days. Any activity should be appropriate for your health and ability; smaller amounts and accessible movement still count.</p></section>

      <section id="uv"><h2>6. UV and Sun Safety</h2><p>Sunburn increases skin-cancer risk and can happen in the UK. NHS advice includes using shade, covering skin, avoiding burning and using at least SPF 30 with suitable UVA protection. Sunscreen should not be the only protection.</p><p>People of every skin tone can develop skin cancer. Check moles and skin for new or changing areas and contact a GP about a concerning change.</p><ExternalLink href={officialLinks.nhsSunSafety} className="health-inline-link">Read current NHS sun-safety guidance</ExternalLink></section>

      <section id="vaccination"><h2>7. Vaccination and Infection Prevention</h2><p>Some infections can increase cancer risk. The NHS offers HPV vaccination to eligible groups and hepatitis B vaccination to people at higher risk. Eligibility can change, so use current NHS guidance.</p><p>The <Link href="/cancer-prevention-screening/hpv-vaccination" className="health-inline-link">HPV Vaccination guide</Link> explains the current England programme, and the <Link href="/cancer-prevention-screening/hpv-test" className="health-inline-link">HPV Test guide</Link> explains cervical-screening results. Vaccination does not replace cervical screening for eligible people.</p></section>

      <section id="screening"><h2>8. Screening and Early Detection</h2><p>NHS screening can identify risk markers, cell changes or cancer earlier in eligible people without symptoms. Screening has benefits and limitations and does not cover every cancer.</p><p>Use the <Link href="/cancer-prevention-screening" className="health-inline-link">Cancer Prevention &amp; Screening Information Library</Link> to understand bowel, cervical, breast and lung programmes. If you have a concerning change, use the <Link href="/cancer-prevention-screening/cancer-symptoms" className="health-inline-link">Cancer Symptoms guide</Link> and contact your GP instead of waiting for screening.</p></section>

      <section id="workplace"><h2>9. Workplace and Environmental Exposures</h2><p>Some workplace or environmental exposures, including asbestos and excessive UV, can increase cancer risk. Follow employer risk controls, training and protective-equipment requirements. Raise concerns with your employer, union, occupational-health service or the relevant regulator.</p><p>Do not disturb material that may contain asbestos. Seek qualified advice before renovation or removal.</p></section>

      <section id="myths"><h2>10. Common Myths</h2><h3>“A healthy lifestyle prevents all cancer.”</h3><p>No. It can lower the risk of some cancers but cannot guarantee protection.</p><h3>“One superfood or supplement prevents cancer.”</h3><p>No single food or supplement provides that protection. Follow balanced-diet guidance and ask a professional before using supplements.</p><h3>“Screening means I do not need to notice symptoms.”</h3><p>No. Screening is generally for people without symptoms and does not find every cancer.</p></section>

      <section id="faqs"><h2>11. Frequently Asked Questions</h2><FaqList faqs={cancerRiskFaqs}/></section>
      <section id="evidence"><h2>12. Evidence and References</h2><p>These current NHS sources support the practical advice in this guide. No unsupported percentage of preventable cancers is used.</p><ResourceList resources={cancerRiskEvidence}/></section>
      <section id="official-resources"><h2>13. Official NHS Resources</h2><ResourceList resources={officialCancerRiskResources}/></section>
      <section id="bloomshield-help"><h2>14. How BloomShield Helps</h2><p>Clear information is one part of equitable access. BloomShield’s connected programmes support understanding, practical access and navigation across screening and care pathways.</p><RelatedProgrammes/><Link href="/contact" className="button-primary mt-8">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></section>
      <div className="mt-12"><EditorialInformation evidenceSources="NHS"/></div>
    </article></div>
  </>;
}
