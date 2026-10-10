import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";

const path = "/research/accept";
const demonstrator = "https://accept-sims.bloomshield.org";
const description = "A synthetic cervical screening registry and navigation research demonstrator exploring screening-to-resolution pathways, stakeholder co-design and future AI evaluation.";
const artworkAlt = "ACCEPT SIMS™ stakeholder demonstrator by BloomShield CIC — synthetic data only, not for clinical use.";
export const metadata = createMetadata({ title: "ACCEPT SIMS™", description, path, socialImage: { url: "/images/accept-sims-stakeholder-banner.png", width: 1731, height: 909, alt: artworkAlt, type: "image/png" } });

const questions = ["Was an abnormal result communicated?", "Was a referral made?", "Did the participant reach the next stage of care?", "Where did the pathway stall?", "What prevented completion?", "Was the pathway eventually resolved?", "Could future programme support help safely re-engage unresolved cases?"];
const registryQuestions = ["What happens after screening", "Where pathways break down", "Why follow-up is incomplete", "Which groups remain unresolved", "How programme interventions change outcomes over time"];
const capabilities = ["Programme-level screening metrics", "Abnormal or positive findings", "Referrals required", "Follow-up completion", "Interrupted pathways", "Documented access barriers", "Potential recall/re-engagement opportunities", "Individual longitudinal participant journeys", "Retrospective structured-data import"];
const barriers = ["Financial", "Transport", "Geography/access", "Referral service unavailable", "Appointment delay", "Unable to contact", "Family/social responsibilities", "Declined follow-up"];
const aiQuestions = ["Model performance", "Clinician-AI agreement", "False positives and false negatives", "Site/population variation", "Downstream referral decisions", "Pathway completion", "Eventual outcomes"];
const audiences = [
  ["Academic and research partners", "Implementation science, AI evaluation, screening research, epidemiology, health economics and longitudinal pathway research."],
  ["Public-health institutions", "Programme oversight, pathway intelligence, dataset development and screening-policy evaluation."],
  ["Implementation organisations and NGOs", "Participant tracking, referral follow-up, navigation and programme delivery."],
  ["Funders and research consortia", "Evaluation of whether screening interventions translate into completed pathways and measurable outcomes."],
];
const consortiumQuestions = ["Differences in screening pathways between settings", "Predictors of incomplete follow-up", "AI-assisted screening performance across populations and sites", "Navigation interventions", "Financial or transport support", "Cross-country screening-data standardisation", "Scalable programme models"];
const grantThemes = ["AI evaluation in cervical screening", "Implementation research", "Screening equity", "Referral and navigation", "Digital health systems", "Diagnostic pathway completion", "Multi-country comparative research", "Health-system strengthening"];
const currentUses = ["Academic review", "Stakeholder discussion", "Pathway-model exploration", "Research-protocol development", "Consortium design", "Requirements discovery"];
const boundaries = ["A deployed clinical system", "A regulated medical device", "A national registry", "A validated AI system", "A replacement for existing cancer registries"];

function ResearchList({ items }: { items: string[] }) {
  return <ul className="mt-6 grid gap-3 sm:grid-cols-2">{items.map(item => <li key={item} className="flex gap-3 leading-7 text-slate-600"><span aria-hidden="true" className="font-bold text-teal-700">•</span><span>{item}</span></li>)}</ul>;
}
function Sequence({ items, label }: { items: string[]; label: string }) {
  return <ol aria-label={label} className="mt-8 flex flex-wrap gap-y-3 rounded-3xl border border-teal-900/10 bg-white p-5 sm:p-8">{items.map((item, index) => <li key={item} className="flex max-w-full items-center">{index > 0 && <span aria-hidden="true" className="mx-2 text-teal-700">→</span>}<span className="rounded-xl bg-teal-50 px-3 py-3 font-semibold text-teal-900">{item}</span></li>)}</ol>;
}
function CollaborationButtons({ hero = false }: { hero?: boolean }) {
  return <div className="mt-8 flex flex-wrap gap-4"><a href={demonstrator} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900 transition hover:bg-teal-50">{hero ? "Explore the demonstrator" : "Explore ACCEPT SIMS™"} <ArrowRight aria-hidden="true" size={17} className="shrink-0" /></a><Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">{hero ? "Discuss research collaboration" : "Discuss a research collaboration"} <ArrowRight aria-hidden="true" size={17} className="shrink-0" /></Link></div>;
}

export default function AcceptResearchPage() {
  return <>
    <PageStructuredData name="ACCEPT SIMS™" description={description} path={path} breadcrumb="ACCEPT SIMS™" parentBreadcrumb={{ name: "Research & Innovation", path: "/research-innovation" }} />
    <section className="bg-[#071f34] text-white">
      <div className="container-page py-14 sm:py-20">
        <Link href="/research-innovation" className="text-sm font-semibold text-emerald-300 underline underline-offset-4">Research &amp; Innovation</Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-emerald-300">Active development · Pillar 03</p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">ACCEPT SIMS™</h1>
        <p className="mt-6 max-w-4xl font-display text-xl leading-8 text-[#f3dfb5] sm:text-2xl">Intelligent Screening Registry &amp; Navigation Research Demonstrator</p>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">A research-facing demonstrator exploring how cervical screening programmes can connect screening events, referral completion, follow-up, pathway outcomes and future AI evaluation within a longitudinal operational registry.</p>
        <p className="mt-6 inline-block rounded-2xl border border-emerald-300/40 bg-white/5 px-4 py-3 text-sm font-semibold text-emerald-200">Synthetic research demonstrator · Not for clinical use</p>
        <CollaborationButtons hero />
        <a href={demonstrator} className="mt-10 block rounded-3xl"><Image src="/images/accept-sims-stakeholder-banner.png" alt={artworkAlt} width={1731} height={909} priority sizes="(min-width: 1240px) 1144px, 100vw" className="h-auto w-full rounded-3xl border border-white/15 shadow-soft" /></a>
        <a href={demonstrator} className="mt-5 inline-block font-semibold leading-7 text-emerald-300 underline underline-offset-4">Explore the live ACCEPT SIMS™ stakeholder demonstrator →</a>
      </div>
    </section>
    <section className="section-space"><div className="container-page">
      <SectionHeading title="Why we built it" intro="Community screening programmes may record who was screened and the immediate result. Important implementation and research questions often begin after screening." />
      <ResearchList items={questions} />
      <Sequence items={["Screening", "Result", "Communication", "Referral", "Follow-up", "Resolution"]} label="Screening-to-resolution pathway, in sequence" />
      <p className="lead mt-6">ACCEPT SIMS™ was built to make that pathway visible.</p>
    </div></section>
    <section className="section-space bg-mist"><div className="container-page">
      <SectionHeading title="From cancer registry to intelligent screening registry" intro="Traditional cancer registries are primarily important for epidemiology and population surveillance. ACCEPT SIMS™ explores a complementary role as an operational screening registry focused on the screening-to-resolution pathway." />
      <p className="mt-6 leading-7 text-slate-600">It is intended to help research and implementation teams understand:</p><ResearchList items={registryQuestions} />
      <p className="mt-8 max-w-4xl leading-7 text-slate-600">At scale, this type of infrastructure could support actionable intelligence for public-health institutions, academic partners, NGOs, implementation organisations and funders.</p>
    </div></section>
    <section className="section-space"><div className="container-page">
      <SectionHeading eyebrow="Build 001 · Synthetic data" title="What the current demonstrator shows" intro="The current Build 001 demonstrator uses 1,500 entirely synthetic participant records to explore screening and navigation information across a longitudinal pathway." />
      <ResearchList items={capabilities} />
      <div className="mt-8 rounded-3xl bg-mist p-7 sm:p-10"><h3 className="font-display text-2xl font-semibold">A research environment</h3><p className="mt-4 leading-7 text-slate-600">The demonstrator contains no real patient data and is not a clinical system. Its purpose is stakeholder review, research co-design and architecture exploration.</p></div>
    </div></section>
    <section className="section-space bg-mist"><div className="container-page">
      <SectionHeading title="Navigation intelligence" intro="A referral records an intended next step; it does not establish that someone actually accessed care. Understanding the difference requires documenting the barriers along the pathway." />
      <ResearchList items={barriers} />
      <p className="mt-8 max-w-4xl leading-7 text-slate-600">Capturing why care did not happen turns generic “lost to follow-up” into researchable and actionable pathway intelligence.</p>
    </div></section>
    <section className="section-space"><div className="container-page grid gap-8 lg:grid-cols-2">
      <SectionHeading title="Unresolved care and supported re-engagement" intro="A pathway that cannot be completed should remain visible rather than disappearing from the dataset. Unresolved care describes a screening pathway that has not yet reached resolution." />
      <div className="space-y-6 leading-7 text-slate-600"><p>Future research may explore supported re-engagement where new diagnostic capacity, transport assistance, subsidised care or other programme support becomes available.</p><p className="rounded-3xl border border-teal-900/10 bg-mist p-6 font-semibold text-teal-900">Any real implementation would require appropriate consent, governance and clinical reassessment.</p></div>
    </div></section>
    <section className="section-space bg-mist"><div className="container-page">
      <SectionHeading eyebrow="Future conceptual architecture" title="AI-enabled research architecture" intro="ACCEPT is an AI-enabled cervical cancer research programme, but ACCEPT SIMS™ is not intended to be a single AI model. Its architecture is model-agnostic, allowing future research to connect model outputs with human interpretation and the pathway that follows." />
      <Sequence items={["AI output", "model/version", "confidence", "clinician interpretation", "agreement/override", "diagnostic confirmation", "pathway outcome"]} label="Future conceptual AI research chain, in sequence" />
      <p className="mt-8 leading-7 text-slate-600">Future research could examine:</p><ResearchList items={aiQuestions} />
      <p className="mt-8 max-w-4xl border-l-4 border-teal-700 pl-6 text-lg font-semibold leading-8 text-teal-900">The research question is not only whether an AI model detects disease, but whether AI-enabled screening improves the pathway that follows detection.</p>
    </div></section>
    <section className="section-space"><div className="container-page">
      <SectionHeading title="Who it is for" />
      <div className="mt-10 grid gap-6 md:grid-cols-2">{audiences.map(([title, copy]) => <article key={title} className="rounded-3xl border border-teal-900/10 bg-white p-7"><h3 className="font-display text-2xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-slate-600">{copy}</p></article>)}</div>
    </div></section>
    <section className="section-space bg-mist"><div className="container-page">
      <SectionHeading title="A platform for consortium-based African implementation research" intro="ACCEPT SIMS™ is being developed with the expectation that cervical screening research increasingly requires collaboration across academic institutions, implementation organisations, public-health agencies and technology partners." />
      <p className="mt-6 leading-7 text-slate-600">The platform could support multi-site research questions including:</p><ResearchList items={consortiumQuestions} />
      <p className="mt-8 max-w-4xl leading-7 text-slate-600">The long-term ambition is not to impose one screening model across African settings, but to provide a common research and information architecture that allows different programmes to generate comparable, governed and locally meaningful evidence.</p>
    </div></section>
    <section className="section-space"><div className="container-page">
      <SectionHeading title="Research grants and consortium development" intro="BloomShield is actively exploring consortium-based research opportunities that could use ACCEPT SIMS™ as shared screening, navigation and evaluation infrastructure across African implementation settings." />
      <p className="mt-6 leading-7 text-slate-600">Potential themes include:</p><ResearchList items={grantThemes} />
      <p className="mt-8 max-w-4xl leading-7 text-slate-600">We welcome discussions with universities, cancer institutes, public-health agencies, implementation organisations and research funders interested in developing collaborative proposals around these themes.</p>
    </div></section>
    <section className="section-space bg-mist"><div className="container-page">
      <SectionHeading title="Current status: stakeholder research demonstrator" intro="The current version is intended for research development and requirements discovery using synthetic data." />
      <div className="mt-10 grid gap-8 lg:grid-cols-2"><div className="rounded-3xl border border-teal-900/10 bg-white p-7"><h3 className="font-display text-2xl font-semibold">Intended for</h3><ResearchList items={currentUses} /></div><div className="rounded-3xl border border-teal-900/10 bg-white p-7"><h3 className="font-display text-2xl font-semibold">It is not currently</h3><ResearchList items={boundaries} /></div></div>
    </div></section>
    <section className="section-space"><div className="container-page"><div className="rounded-4xl bg-teal-800 p-7 text-white sm:p-12">
      <h2 className="max-w-3xl font-display text-3xl font-semibold sm:text-4xl">Interested in studying screening pathways with us?</h2>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-teal-50">We are interested in collaborations around cervical cancer screening, implementation science, AI evaluation, patient navigation and longitudinal pathway research.</p>
      <CollaborationButtons />
    </div></div></section>
  </>;
}
