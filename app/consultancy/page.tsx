import {
  Bot,
  Building2,
  ClipboardCheck,
  FlaskConical,
  Landmark,
  HeartHandshake,
  HeartPulse,
  Lightbulb,
  Workflow,
  UsersRound,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { CTA } from "@/components/cta";
import { FundingDevelopmentPathway } from "@/components/funding-development-pathway";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";

const description = "Strategic implementation, health systems, cancer prevention, evaluation and responsible AI advisory from BloomShield CIC.";
export const metadata = createMetadata({ title: "Consultancy & Advisory", description, path: "/consultancy" });

const clients = [
  [HeartPulse, "Health systems", "bg-teal-500"],
  [FlaskConical, "Research organisations", "bg-violet-500"],
  [HeartHandshake, "Charities", "bg-rose-500"],
  [UsersRound, "Faith & community organisations", "bg-emerald-700"],
  [Lightbulb, "Innovators", "bg-amber-600"],
  [Landmark, "Governments", "bg-sky-600"],
];

const services = [
  [Workflow, "Implementation strategy", "Translate evidence into sustainable practice through context assessment, implementation planning and adaptive learning."],
  [HeartPulse, "Health systems transformation", "Understand pathways, incentives and operational constraints to identify practical opportunities for equitable improvement."],
  [Building2, "Cancer prevention strategy", "Shape coherent approaches to awareness, risk reduction, screening and earlier detection across diverse populations."],
  [Lightbulb, "Programme & portfolio design", "Turn complex ambitions into clear theories of change, deliverable models, governance and measurable outcomes."],
  [Bot, "Digital & AI implementation", "Assess readiness, workflow, equity, governance and human factors before introducing technology into care pathways."],
  [ClipboardCheck, "Evaluation & learning", "Build proportionate process, outcome and implementation evaluation into strategy and delivery from the outset."],
];

export default function Consultancy() {
  return (
    <>
      <PageStructuredData name="Consultancy & Advisory" description={description} path="/consultancy" breadcrumb="Consultancy & Advisory" kind="consultancy" />
      <PageHero
        visual="consultancy"
        eyebrow="Consultancy & advisory"
        title="Strategy that works in real health systems."
        intro="BloomShield is a strategic implementation partner to health systems, research organisations, charities, faith and community organisations, innovators and governments seeking equitable, evidence-informed change."
        cta="Talk about your challenge"
      />

      <section className="bg-[#071f34] py-10 text-white">
        <div className="container-page">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-emerald-300">Who we advise</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {clients.map(([Icon, label, badge]) => (
              <div className="flex min-h-20 items-center gap-4 rounded-2xl border border-white/12 bg-white/[.075] p-4.5 transition hover:bg-white/[.11]" key={label as string}>
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg shadow-black/15 ${badge}`}>
                  <Icon size={25} strokeWidth={2.1} />
                </span>
                <span className="text-base font-bold leading-snug !text-white">{label as string}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <SectionHeading
            eyebrow="Advisory expertise"
            title="Executive clarity. Implementation discipline."
            intro="We combine strategic perspective with the practical methods needed to move from ambition to adoption, learning and sustained impact."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map(([Icon, title, description], index) => (
              <article className="card group" key={title as string}>
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white">
                    <Icon size={24} />
                  </span>
                  <span className="text-xs font-bold tracking-widest text-slate-300">0{index + 1}</span>
                </div>
                <h2 className="mt-7 text-xl font-bold">{title as string}</h2>
                <p className="mt-3 leading-7 text-slate-600">{description as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#071f34] text-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">Specialist Consultancy Practice</p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">Faith &amp; Community Funding Development</h2>
              <p className="mt-5 text-xl font-semibold leading-8 text-emerald-200">Turning trusted community presence into sustainable community capacity.</p>
            </div>
            <div className="space-y-5 text-lg leading-8 text-white/75">
              <p>Faith and community organisations often hold valuable assets — trusted relationships, local knowledge, volunteers, community spaces and sustained connections with the people they serve.</p>
              <p>BloomShield helps organisations translate those assets into stronger programmes, funding readiness, evidence, organisational systems and sustainable community delivery.</p>
            </div>
          </div>
          <div className="mt-10"><FundingDevelopmentPathway compact /></div>
          <Link href="/faith-community-funding-development" className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-bold text-[#071f34] transition hover:bg-emerald-200">Explore Faith &amp; Community Funding Development <ArrowRight aria-hidden="true" size={17} /></Link>
        </div>
      </section>

      <section className="section-space bg-mist">
        <div className="container-page grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <SectionHeading
            eyebrow="How we work"
            title="Useful advice ends in a better decision."
            intro="Every engagement is designed around what leaders and delivery teams need to decide, build or improve—not around a standard package."
          />
          <ol className="grid gap-4 sm:grid-cols-2">
            {[
              ["01", "Frame", "Clarify the decision, the system and the people affected."],
              ["02", "Understand", "Bring together evidence, lived experience and operational context."],
              ["03", "Design", "Co-create practical, ethical and measurable routes forward."],
              ["04", "Embed", "Support delivery, adaptation, evaluation and handover."],
            ].map(([number, title, description]) => (
              <li className="rounded-3xl border border-teal-900/10 bg-white p-6" key={number}>
                <span className="font-display text-xl font-bold text-gold-500">{number}</span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CTA title="Bring us the challenge—not a finished brief." text="We can help frame the work, identify the right expertise and agree a proportionate route forward." />
    </>
  );
}
