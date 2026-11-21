import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  ClipboardList,
  HeartHandshake,
  MapPinned,
  Network,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";

const path = "/research-innovation/accept-sims-ai";
const demonstrator = "https://acceptsimsai.bloomshield.org";
const description =
  "Discover ACCEPT SIMS AI™, an independently founder-developed, synthetic-data research demonstrator exploring cervical screening referral intelligence, resource-aware navigation and human-reviewed follow-up.";

export const metadata = createMetadata({
  title: "ACCEPT SIMS AI™ | Screening intelligence and navigation",
  description,
  path,
});

const capabilities = [
  {
    icon: UsersRound,
    name: "Screening registry",
    detail: "Explore fictional participants, screening encounters and longitudinal histories across five simulated sites.",
    tag: "Demonstrated",
  },
  {
    icon: Sparkles,
    name: "Referral-time risk",
    detail: "Inspect Model A's exploratory, 60-day referral prediction alongside evidence, uncertainty and historical cutoffs.",
    tag: "Synthetic model only",
  },
  {
    icon: Network,
    name: "Referral intelligence",
    detail: "Trace referral events, missed appointments and pathways that remain unresolved at a selected observation date.",
    tag: "Demonstrated",
  },
  {
    icon: MapPinned,
    name: "Navigation support",
    detail: "Review simulated proposals against local transport, staffing and appointment constraints, with no automatic action.",
    tag: "Mock mode",
  },
  {
    icon: CalendarCheck2,
    name: "Follow-up visibility",
    detail: "Compare screening, diagnosis, attendance and documented pathway outcomes over time.",
    tag: "Demonstrated",
  },
  {
    icon: BarChart3,
    name: "Programme insights",
    detail: "Explore simulated site activity, referral backlogs, barriers and capacity assumptions for research discussion.",
    tag: "Synthetic data",
  },
];

const users = [
  ["Public-health and cancer programmes", "Programme planners exploring referral completion, resource constraints and service improvement."],
  ["Screening providers and care teams", "Clinicians, navigators and coordinators considering human-led follow-up workflows."],
  ["Community and implementation organisations", "Groups helping people overcome communication, transport and access barriers."],
  ["Researchers and evaluators", "Teams designing feasibility studies, responsible AI evaluation and implementation research."],
];

const prospectGroups = [
  {
    heading: "Global health and implementation research",
    names: "WHO · UNICEF",
    detail: "Potential alignment with cancer prevention, digital public health, health-system strengthening and locally led implementation research.",
  },
  {
    heading: "Public-service and AI innovation",
    names: "Rockefeller Foundation · OpenAI",
    detail: "Potential programme or technical engagement around responsible AI, public-service innovation and navigation support.",
  },
  {
    heading: "Early-stage innovation funding",
    names: ".TECH · Fund for Innovation in Development (FID)",
    detail: "Prospective funding routes for proof of concept, evaluation, feasibility and carefully governed expansion.",
  },
];

function DemonstratorLink({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href={demonstrator}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${dark ? "bg-white text-teal-950 hover:bg-teal-50 focus-visible:outline-white" : "bg-teal-800 text-white hover:bg-teal-900 focus-visible:outline-teal-800"}`}
    >
      Explore AI demonstrator <ArrowRight aria-hidden="true" size={18} />
    </a>
  );
}

export default function AcceptSimsAIResearchPage() {
  return (
    <>
      <PageStructuredData
        name="ACCEPT SIMS AI™"
        description={description}
        path={path}
        breadcrumb="ACCEPT SIMS AI™"
        parentBreadcrumb={{ name: "Research & Innovation", path: "/research-innovation" }}
      />
      <section className="overflow-hidden bg-gradient-to-br from-[#f2faf8] via-white to-[#e4f5f2]">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-[.97fr_1.03fr] lg:items-center lg:gap-12 lg:py-20">
          <div>
            <Link className="text-sm font-semibold text-teal-800 underline underline-offset-4" href="/research-innovation">Research &amp; Innovation</Link>
            <p className="mt-8 inline-flex rounded-full border border-teal-700/25 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.15em] text-teal-900">Founder-built research demonstrator</p>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-[#073c44] sm:text-5xl lg:text-6xl">ACCEPT SIMS <span className="text-[#c89418]">AI™</span></h1>
            <p className="mt-5 max-w-xl text-xl font-semibold leading-8 text-slate-900">From screening to follow-up. More visible pathways. Better-informed human action.</p>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">Exploring AI-supported screening intelligence and human-supervised navigation in resource-constrained health systems—without treating a screening result as the end of the care journey.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DemonstratorLink />
              <a href="#technology" className="inline-flex min-h-12 items-center gap-2 text-sm font-bold text-teal-800 underline underline-offset-4">Understand the technology <ArrowRight aria-hidden="true" size={17}/></a>
            </div>
            <p className="mt-6 max-w-xl border-l-4 border-[#d5a332] pl-4 text-sm leading-6 text-slate-600">Research demonstrator · Synthetic data only · Simulated Mock mode · Not for clinical use. Independently developed by BloomShield CIC’s founder.</p>
          </div>
          <figure className="overflow-hidden rounded-[2rem] border border-teal-900/10 bg-[#d9f3ed] shadow-xl">
            <Image
              src="/images/accept-sims-ai-human-care-hero.webp"
              alt="Illustration of a woman speaking with a community health navigator and clinician, with a connected pathway of follow-up support icons."
              width={1200}
              height={675}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="h-auto w-full"
            />
            <figcaption className="px-5 py-3 text-xs leading-5 text-slate-700">Illustrative human-centred concept artwork. It does not depict real programme participants or clinical performance.</figcaption>
          </figure>
        </div>
      </section>

      <section id="technology" className="section-space bg-white">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-teal-700">The technology in context</p>
          <h2 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">From ACCEPT SIMS™ to ACCEPT SIMS AI™</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[1.75rem] border border-teal-900/10 bg-[#f2faf8] p-7 sm:p-9">
              <ClipboardList className="h-9 w-9 text-teal-700" aria-hidden="true"/>
              <h3 className="mt-5 font-display text-2xl font-semibold">ACCEPT SIMS™: make pathways visible</h3>
              <p className="mt-4 leading-8 text-slate-700">The original BloomShield programme demonstrator explores how screening results, referrals, visits and outcomes could be brought into one longitudinal registry. It asks a practical question: after screening, what happened next?</p>
              <Link href="/research/accept" className="mt-6 inline-flex items-center gap-2 font-bold text-teal-800 underline underline-offset-4">Read about ACCEPT SIMS™ <ArrowRight aria-hidden="true" size={16}/></Link>
            </article>
            <article className="rounded-[1.75rem] border border-teal-900/10 bg-[#fdf8eb] p-7 sm:p-9">
              <Sparkles className="h-9 w-9 text-[#b88110]" aria-hidden="true"/>
              <h3 className="mt-5 font-display text-2xl font-semibold">ACCEPT SIMS AI™: explore intelligent support</h3>
              <p className="mt-4 leading-8 text-slate-700">The separately developed founder edition builds on that pathway concept with exploratory referral-time modelling, event-triggered review alerts, resource-aware navigation proposals and human review—tested only with synthetic scenarios.</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">This is a research and product-development progression, not evidence that the AI improves outcomes in real patients.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#eef9f6]">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-teal-700">Six connected capabilities</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-[#073c44] sm:text-4xl">What the demonstrator explores</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">Each capability is shown in a simulated environment. The system makes information visible for review; it does not diagnose, contact patients, arrange services or execute care.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map(({ icon: Icon, name, detail, tag }) => (
              <article key={name} className="rounded-[1.75rem] border border-teal-900/10 bg-white p-7 shadow-sm">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-800"><Icon aria-hidden="true" size={29}/></span>
                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-[#987018]">{tag}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-slate-900">{name}</h3>
                <p className="mt-3 leading-7 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <HeartHandshake className="h-10 w-10 text-teal-700" aria-hidden="true"/>
            <h2 className="mt-5 font-display text-3xl font-bold text-[#073c44] sm:text-4xl">Why it was built</h2>
            <p className="mt-6 text-lg leading-8 text-slate-700">A screening programme may successfully identify a concerning result, yet still lose sight of what follows. People face transport difficulties, delayed appointments, communication barriers and stretched services.</p>
            <p className="mt-5 text-lg leading-8 text-slate-700">ACCEPT SIMS AI™ was built to explore whether clearer pathway information and responsible, human-supervised decision support could help programme teams recognise unresolved follow-up earlier and organise feasible next steps.</p>
            <p className="mt-5 border-l-4 border-[#d5a332] pl-5 font-semibold leading-8 text-teal-900">The technology should support people and care teams—not replace their judgement.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-[#073c44]">Who it is for</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {users.map(([title, detail]) => (
                <article key={title} className="rounded-3xl border border-teal-900/10 bg-mist p-6">
                  <h3 className="font-display text-lg font-bold text-slate-900">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#eff8f9]">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold text-[#073c44] sm:text-4xl">Potential technical, research and funding pathways</h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">The demonstrator may be relevant to international health organisations, public-service innovation programmes, research consortia and early-stage funders. The names below are areas of prospective engagement, <strong>not confirmed collaborators, sponsors, funders or endorsements</strong>.</p>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {prospectGroups.map(({ heading, names, detail }) => (
              <article key={heading} className="rounded-[1.75rem] border border-teal-900/10 bg-white p-7">
                <h3 className="font-display text-xl font-bold text-slate-900">{heading}</h3>
                <p className="mt-4 font-semibold text-teal-800">{names}</p>
                <p className="mt-4 leading-7 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-600">These organisations and programmes have not been presented as partners in this product. Their names are used for contextual discussion only; no third-party logos or marks are displayed.</p>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_.9fr]">
          <article className="rounded-[1.75rem] border border-teal-900/10 p-8 sm:p-10">
            <ShieldCheck className="h-9 w-9 text-teal-700" aria-hidden="true"/>
            <h2 className="mt-5 font-display text-2xl font-bold text-slate-900">What it can—and cannot—show today</h2>
            <p className="mt-4 leading-8 text-slate-700">The current research build uses fictional participant records, a synthetic five-site programme, a limited exploratory prediction model and simulated navigation responses. Human review is illustrated in-browser; it is not a durable clinical audit system.</p>
            <p className="mt-4 leading-8 text-slate-700">The demonstrator has not been clinically validated, is not a regulated medical device or live health-system integration, and cannot establish effectiveness, safety or equity in practice. Real-world evaluation would require local leadership, approvals, safeguards and prospective evidence.</p>
          </article>
          <div className="flex flex-col justify-center rounded-[1.75rem] bg-[#073c44] p-8 text-white sm:p-10">
            <h2 className="font-display text-3xl font-bold">Explore the pathway, not a promise.</h2>
            <p className="mt-5 text-lg leading-8 text-white/80">Follow the fictional EXP-0885 referral through a fixed historical observation date and see how resource-aware proposals remain subject to human review.</p>
            <div className="mt-8"><DemonstratorLink dark /></div>
            <p className="mt-6 text-sm leading-6 text-white/70">Synthetic data only · Mock mode · Not for clinical use</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 font-semibold text-white underline underline-offset-4">Discuss research and evaluation <ArrowRight aria-hidden="true" size={16}/></Link>
          </div>
        </div>
      </section>
    </>
  );
}
