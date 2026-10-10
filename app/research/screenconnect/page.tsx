import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";

const path = "/research/screenconnect";
const description = "A multi-pathway, person-centred longitudinal research demonstrator for exploring barriers, interventions, navigation, timing and outcomes using synthetic data.";
const artworkAlt = "ScreenConnect Digital research demonstrator — synthetic data only. Illustration of a person-centred longitudinal journey across pathways, from baseline and assessment to intervention, outcome and follow-up.";

export const metadata = createMetadata({
  title: "ScreenConnect™ Digital",
  description,
  path,
  socialImage: { url: "/images/screenconnect-share.png", width: 1731, height: 909, alt: artworkAlt, type: "image/png" },
});

const architecture = ["Person", "Pathway", "Event", "Provenance", "Barrier", "Intervention", "Next Action", "Outcome", "Time"];
const capabilities = [
  ["Pathway behaviour", "Engagement, delay, progression and re-engagement over time."],
  ["Navigation and access", "Understanding barriers, interventions and next actions."],
  ["Longitudinal insight", "Studying the person across multiple pathways rather than viewing each pathway in isolation."],
];
const development = ["Synthetic feasibility", "Governed real-world validation", "Prospective observational research", "Implementation evaluation"];

export default function ScreenConnectResearchPage() {
  return (
    <>
      <PageStructuredData name="ScreenConnect™ Digital" description={description} path={path} breadcrumb="ScreenConnect™ Digital" parentBreadcrumb={{ name: "Research & Innovation", path: "/research-innovation" }} />
      <section className="bg-[#071f34] text-white">
        <div className="container-page py-14 sm:py-20">
          <Link href="/research-innovation" className="text-sm font-semibold text-emerald-300 underline underline-offset-4">Research &amp; Innovation</Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-emerald-300">Synthetic research demonstrator</p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">ScreenConnect™ Digital</h1>
          <p className="mt-6 max-w-4xl font-display text-xl leading-8 text-[#f3dfb5] sm:text-2xl">A research demonstrator for studying the person across pathways — not merely the pathway around the person.</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">ScreenConnect™ Digital is a multi-pathway, person-centred longitudinal research demonstrator developed by BloomShield CIC. Using synthetic data, it enables researchers and collaborators to explore how people move through multiple screening, diagnostic and navigation pathways over time.</p>
          <Image src="/images/screenconnect-share.png" alt={artworkAlt} width={1731} height={909} priority sizes="(min-width: 1240px) 1144px, 100vw" className="mt-10 h-auto w-full rounded-3xl border border-white/15 shadow-soft" />
        </div>
      </section>

      <section className="section-space">
        <div className="container-page grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading eyebrow="Why we built it" title="Start with the person. Follow their journey." />
          <p className="lead">Health-system data is often organised around individual appointments, services or disease pathways. ScreenConnect starts with the person and follows their journey across pathways over time, bringing a connected perspective to research on access, navigation and outcomes.</p>
        </div>
      </section>

      <section className="section-space bg-mist">
        <div className="container-page">
          <SectionHeading eyebrow="Research architecture" title="A connected framework for longitudinal research." intro="The person anchors a sequence that connects pathways and events with context, support, outcomes and time." />
          <ol aria-label="Research framework, in sequence" className="mt-10 flex flex-wrap items-center gap-y-3 rounded-3xl border border-teal-900/10 bg-white p-6 shadow-soft sm:p-8">
            {architecture.map((item, index) => (
              <li key={item} className="flex items-center">
                {index > 0 && <span aria-hidden="true" className="mx-2 text-teal-700">→</span>}
                <span className={`rounded-xl px-3 py-3 text-base font-semibold ${index === 0 ? "bg-teal-800 text-white" : "bg-teal-50 text-teal-900"}`}>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <SectionHeading eyebrow="What ScreenConnect enables" title="Three perspectives on the same journey." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {capabilities.map(([title, copy]) => <article key={title} className="rounded-3xl border border-teal-900/10 bg-white p-7"><h3 className="font-display text-2xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-slate-600">{copy}</p></article>)}
          </div>
          <div className="mt-10 rounded-3xl bg-mist p-7 sm:p-10">
            <h2 className="font-display text-2xl font-semibold">Current demonstrator</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">The current demonstrator uses a synthetic cohort and brings together person-level pathway data, longitudinal events, navigation activity and timing information within a single research environment.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#071f34] py-12 text-white sm:py-16">
        <div className="container-page max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-300">Research boundary</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">Synthetic research environment</h2>
          <p className="mt-5 text-lg leading-8 text-slate-200">ScreenConnect currently operates using synthetic data. It is designed to support research development, methodological exploration and study-design discussions. It does not generate evidence about real-world prevalence, effectiveness or causality.</p>
        </div>
      </section>

      <section className="section-space bg-mist">
        <div className="container-page">
          <SectionHeading eyebrow="Research development pathway" title="From feasibility towards future evaluation." intro="A conceptual development pathway. Later stages are future research ambitions and have not yet occurred." />
          <ol className="mt-10 grid gap-4 md:grid-cols-4" aria-label="Research development stages">
            {development.map((stage, index) => <li key={stage} className="rounded-3xl border border-teal-900/10 bg-white p-6"><p className="text-sm font-bold text-teal-700">{index + 1}{index < development.length - 1 && <span aria-hidden="true" className="ml-3">→</span>}</p><h3 className="mt-4 text-lg font-semibold">{stage}</h3></li>)}
          </ol>
          <div className="mt-10 border-l-4 border-teal-700 pl-6">
            <h2 className="text-xs font-bold uppercase leading-6 tracking-[.15em] text-teal-800">Built demonstrator · Academic review &amp; research development</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">ScreenConnect is currently being prepared for academic review and future collaborative real-world research.</p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <div className="rounded-4xl bg-teal-800 p-7 text-white sm:p-12">
            <h2 className="max-w-3xl font-display text-3xl font-semibold sm:text-4xl">Interested in reviewing ScreenConnect or exploring a research collaboration?</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-teal-50">Contact BloomShield to discuss academic review, research collaboration or future real-world study development.</p>
            <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900 transition hover:bg-teal-50">Research &amp; collaboration enquiry <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
