import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Database,
  Download,
  Handshake,
  Landmark,
  Laptop2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import { studyConfig, type StudyStatus } from "./study-config";

const path = "/research/vcse-digital-capacity-study" as const;
const description = "BloomShield's 2026 study exploring digital systems, data, organisational capacity and support needs across grassroots voluntary, community and social enterprise organisations.";

export const metadata: Metadata = createMetadata({
  title: "VCSE Digital Capacity Study 2026",
  description,
  path,
  socialImage: {
    url: "/images/vcse-digital-capacity-study-campaign-poster.png",
    width: 1254,
    height: 1254,
    alt: "BloomShield Help shape what comes next research campaign.",
  },
});

const domains = [
  [Landmark, "Governance", "How organisations structure oversight, accountability and organisational decision-making."],
  [BriefcaseBusiness, "Funding", "Funding readiness, sustainability and the systems supporting income development."],
  [ShieldCheck, "Programmes", "How services and activities are planned, managed and delivered."],
  [Users, "People", "Workforce, volunteers, skills and organisational capacity."],
  [Database, "Data", "How organisations collect, organise and use information."],
  [BarChart3, "Impact & Evaluation", "How outcomes, learning and organisational impact are measured and communicated."],
  [Laptop2, "Digital Systems", "The tools, platforms and technology supporting everyday organisational work."],
  [Handshake, "Partnerships", "How organisations develop and manage relationships, collaborations and networks."],
] as const;

function statusDetails(status: StudyStatus) {
  if (status.state === "open") {
    return {
      label: "Take part in the study",
      closingLabel: "Take part in the 10-minute survey",
      href: studyConfig.surveyUrl,
      external: true,
      summary: `10-minute survey · Open until ${status.closes}`,
    };
  }
  if (status.state === "findings") {
    return {
      label: "Read the findings",
      closingLabel: "Read the findings",
      href: status.findingsUrl,
      external: false,
      summary: "Findings are now available",
    };
  }
  return {
    label: "Study closed",
    closingLabel: "Study closed",
    href: null,
    external: false,
    summary: "Thank you to everyone who took part. Analysis is underway.",
  };
}

function StudyAction({ closing = false }: { closing?: boolean }) {
  const details = statusDetails(studyConfig.status);
  if (!details.href) {
    return <p className="inline-flex min-h-12 items-center rounded-full border border-current/20 px-6 py-3 text-sm font-bold">{details.label}</p>;
  }

  const className = closing
    ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900 transition hover:bg-teal-50"
    : "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#d7ad58] px-6 py-3 text-sm font-bold text-[#102d2a] shadow-sm transition hover:bg-[#e6c77f]";
  const label = closing ? details.closingLabel : details.label;

  if (details.external) {
    return (
      <a className={className} href={details.href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
        {label}<ArrowRight aria-hidden="true" size={18} />
      </a>
    );
  }
  return <Link className={className} href={details.href}>{label}<ArrowRight aria-hidden="true" size={18} /></Link>;
}

export default function VcseDigitalCapacityStudyPage() {
  const details = statusDetails(studyConfig.status);

  return (
    <>
      <PageStructuredData
        name={studyConfig.title}
        description={description}
        path={path}
        breadcrumb="VCSE Digital Capacity Study 2026"
        parentBreadcrumb={{ name: "Research & Innovation", path: "/research-innovation" }}
      />

      <section className="relative overflow-hidden bg-[#082f2b] text-white">
        <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_10%_15%,rgba(215,173,88,.32),transparent_27%),radial-gradient(circle_at_80%_80%,rgba(79,199,153,.2),transparent_30%)]" />
        <div className="container-page relative grid gap-12 py-16 md:py-20 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-emerald-400">BloomShield Research</p>
            <h1 className="font-display text-4xl font-semibold leading-[1.03] tracking-[-.04em] text-white sm:text-5xl lg:text-6xl">Help shape what comes next.</h1>
            <p className="mt-6 max-w-2xl font-display text-xl font-semibold leading-8 text-[#f3dfb5] sm:text-2xl">{studyConfig.title}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">Help us understand how charities, CICs, community organisations and other voluntary, community and social enterprise organisations are using digital systems, data and organisational capacity — and where greater support is needed.</p>
            <p className="mt-7 font-bold text-white">{details.summary}</p>
            <div className="mt-7"><StudyAction /></div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl sm:min-h-[460px] lg:min-h-[570px]">
            <Image
              src="/images/vcse-digital-capacity-study-hero.png"
              alt="A diverse group of community-sector colleagues collaborating around a laptop."
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-center"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#082f2b]/45 to-transparent" />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="eyebrow">Listen</p>
            <h2 className="heading">Why this study matters</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-slate-700">
            <p>Grassroots and community organisations are often closest to the people and communities they serve. Their ability to deliver, demonstrate impact and grow sustainably increasingly depends on strong organisational and digital infrastructure.</p>
            <p>BloomShield is undertaking this study to better understand the capabilities, pressures and development needs experienced across the VCSE sector.</p>
            <p>The research will identify where organisations are doing well, where practical barriers remain, and what forms of infrastructure, capacity building, tools and support could make the greatest difference.</p>
          </div>
        </div>
      </section>

      <section className="section-space bg-mist">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Understand</p>
            <h2 className="heading">What we are exploring</h2>
            <p className="lead mt-5">Eight connected domains form one practical view of organisational capacity — from how decisions are made to how learning is shared.</p>
          </div>
          <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-teal-900/10 bg-white p-6 shadow-soft sm:p-9 lg:p-12">
            <div aria-hidden="true" className="absolute bottom-12 left-1/2 top-12 hidden w-px bg-gradient-to-b from-gold-400 via-teal-500 to-emerald-400 lg:block" />
            <div className="grid gap-x-16 lg:grid-cols-2">
              {domains.map(([Icon, title, copy], index) => (
                <article className="relative border-b border-teal-900/10 py-7 last:border-b-0 lg:[&:nth-last-child(-n+2)]:border-b-0" key={title}>
                  <div className="flex gap-5">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${index % 2 === 0 ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-[#7a5519]"}`}><Icon aria-hidden="true" size={24} /></span>
                    <div><h3 className="font-display text-xl font-semibold text-ink">{title}</h3><p className="mt-2 leading-7 text-slate-600">{copy}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:gap-10">
          <article className="rounded-[2rem] bg-[#fff9ed] p-7 sm:p-10">
            <p className="eyebrow">Who</p>
            <h2 className="heading">Who should take part?</h2>
            <p className="mt-6 leading-8 text-slate-700">People working in or leading charities, Community Interest Companies, voluntary organisations, community groups, faith-based organisations, social enterprises and other grassroots or community-focused organisations.</p>
            <p className="mt-5 leading-8 text-slate-700"><strong>Suitable respondents are leaders, managers and staff</strong> with a reasonable understanding of how their organisation operates.</p>
            <p className="mt-5 rounded-2xl bg-white p-5 font-semibold leading-7 text-teal-900">Our primary focus is Kent, Essex and London. Eligible organisations elsewhere in England are also welcome.</p>
          </article>
          <article className="rounded-[2rem] bg-teal-50 p-7 sm:p-10">
            <p className="eyebrow">Participate</p>
            <h2 className="heading">What participation involves</h2>
            <ul className="mt-6 space-y-4 text-slate-700">
              {["Complete an online survey in approximately 10 minutes.", "Participation is entirely voluntary.", "Respond using your knowledge and experience of your organisation.", "Avoid providing unnecessary personally identifiable or sensitive information."].map((item) => <li className="flex gap-3 leading-7" key={item}><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-600" />{item}</li>)}
            </ul>
            <div className="mt-8"><StudyAction /></div>
          </article>
        </div>
      </section>

      <section className="section-space bg-[#071f34] text-white">
        <div className="container-page grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-emerald-300">Learn → Build</p>
            <h2 className="font-display text-4xl font-semibold tracking-[-.03em] sm:text-5xl">From listening to action</h2>
            <p className="mt-6 text-lg leading-8 text-white/75">BloomShield will analyse responses to identify common themes, strengths, capability gaps and opportunities for practical support across participating organisations. Findings will be reported at an aggregate level where appropriate.</p>
          </div>
          <div>
            <p className="font-semibold text-white">Findings may inform:</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Future BloomShield research", "Capacity-building programmes", "Learning resources and toolkits", "Digital and organisational-support initiatives", "Partnership development", "Funding and commissioning propositions", "Future publications and sector learning"].map((item) => <li className="rounded-xl border border-white/10 bg-white/[.06] px-4 py-3 text-white/80" key={item}>{item}</li>)}
            </ul>
            <p className="mt-8 border-l-2 border-gold-400 pl-5 font-display text-xl font-semibold leading-8 text-[#f3dfb5]">Listening to the sector.<br />Building from evidence.<br />Creating stronger futures together.</p>
          </div>
        </div>
      </section>

      <section className="section-space bg-mist">
        <div className="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <p className="eyebrow">Campaign resources</p>
            <h2 className="heading">Share the study</h2>
            <p className="lead mt-5">Community organisations, partners and supporters are welcome to share the official campaign artwork with eligible networks across England.</p>
            <a
              href="/images/vcse-digital-capacity-study-campaign-poster.png"
              download
              className="button-secondary mt-7 gap-2"
            >
              Download campaign artwork <Download aria-hidden="true" size={18} />
            </a>
          </div>
          <div className="mx-auto w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-teal-900/10 bg-white p-3 shadow-soft sm:p-5">
            <Image
              src="/images/vcse-digital-capacity-study-campaign-poster.png"
              alt="BloomShield campaign poster inviting charity, CIC and community-organisation workers to take part in the 10-minute study by 24 August."
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container-page">
          <div className="grid gap-6 border-y border-teal-900/10 py-10 md:grid-cols-[auto_1fr] md:items-start md:gap-8">
            <ShieldCheck aria-hidden="true" className="text-teal-700" size={34} />
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Research governance and privacy</h2>
              <p className="mt-4 max-w-4xl leading-7 text-slate-600">Participation is voluntary. BloomShield is committed to handling research information responsibly and asks participants not to submit unnecessary personal or sensitive information. For more about how BloomShield handles personal information, read our <Link className="font-bold text-teal-700 underline decoration-teal-700/30 underline-offset-4 hover:decoration-teal-700" href="/privacy">privacy notice</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0c4038] to-[#071f34] px-7 py-12 text-white sm:px-12 md:py-16">
            <div aria-hidden="true" className="absolute -right-20 -top-28 h-72 w-72 rounded-full border-[42px] border-[#d7ad58]/10" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">BloomShield Research</p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Help shape what comes next.</h2>
              <p className="mt-5 text-lg leading-8 text-white/75">If you work with a charity, CIC, voluntary, community or social enterprise organisation, your experience can contribute to a clearer picture of what grassroots organisations need to thrive.</p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><StudyAction closing /><p className="font-bold text-white">{details.summary}</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
