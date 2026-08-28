import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileCheck2,
  Handshake,
  Network,
  Sprout,
  UsersRound,
} from "lucide-react";
import { FundingDevelopmentPathway } from "@/components/funding-development-pathway";
import { PageStructuredData } from "@/components/seo-json-ld";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";

const path = "/faith-community-funding-development" as const;
const description = "BloomShield helps faith and community organisations strengthen funding readiness, programme design, evidence, partnerships and organisational capacity for sustainable community impact.";

export const metadata = createMetadata({
  title: "Faith & Community Funding Development",
  description,
  path,
  socialImage: {
    url: "/images/faith-community-funding-hero.png",
    width: 1536,
    height: 1024,
    alt: "Community and faith-sector leaders collaborating on programme and funding development.",
  },
});

const audiences = [
  "Churches and Christian community organisations",
  "Mosques and Islamic community organisations",
  "Temples and other faith communities",
  "Faith-based charities",
  "Community associations",
  "Migrant and diaspora organisations",
  "Grassroots charities",
  "Small CICs",
  "Patient and community groups",
  "Locally rooted voluntary organisations",
];

const capabilities = [
  [BarChart3, "Funding Readiness", "Understand what is currently fundable and what needs strengthening first."],
  [Sprout, "Programme Development", "Turn existing activities and ideas into structured programmes with clear outcomes."],
  [BriefcaseBusiness, "Funding Strategy", "Build a realistic pipeline across grants, partnerships and commissioning opportunities."],
  [FileCheck2, "Bid & Proposal Development", "Develop credible applications and partnership proposals."],
  [BookOpenCheck, "Evidence & Impact", "Establish practical approaches for demonstrating need, activity, outcomes and learning."],
  [Building2, "Organisational Systems", "Improve the internal structures needed to manage projects, funding and relationships."],
  [Network, "Partnership Readiness", "Prepare organisations to participate more confidently in collaborations, consortiums and commissioned programmes."],
  [UsersRound, "Capacity Building", "Develop staff, trustee or volunteer capability so organisations become progressively more self-sufficient."],
] as const;

export default function FaithCommunityFundingDevelopment() {
  return (
    <>
      <PageStructuredData name="Faith & Community Funding Development" description={description} path={path} breadcrumb="Faith & Community Funding Development" parentBreadcrumb={{ name: "Consultancy & Advisory", path: "/consultancy" }} kind="consultancy" />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#062f2a] via-[#075144] to-[#0a6758] text-white">
        <div aria-hidden="true" className="absolute -left-28 -top-36 h-96 w-96 rounded-full border-[64px] border-emerald-300/[.07]" />
        <div className="container-page relative grid min-h-[680px] items-center gap-12 py-20 lg:grid-cols-[.92fr_1.08fr] lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">Specialist Consultancy Practice</p>
            <h1 className="mt-6 font-display text-[2.8rem] font-semibold leading-[1.04] tracking-[-.04em] text-white sm:text-6xl lg:text-[4.25rem]">Faith &amp; Community Funding Development</h1>
            <p className="mt-7 text-xl font-semibold leading-8 text-emerald-200">Helping trusted community organisations turn local presence into fundable, sustainable community impact.</p>
            <p className="mt-6 text-lg leading-8 text-white/80">Faith and community organisations often hold what programmes need most: trust, local knowledge, volunteers, community spaces and sustained relationships.</p>
            <p className="mt-4 text-lg leading-8 text-white/80">BloomShield helps transform those assets into stronger programmes, credible funding propositions, better evidence and the organisational capacity needed to deliver sustainably.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact?interest=Faith%20%26%20Community%20Funding%20Development" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-bold text-[#062f2a] transition hover:bg-emerald-200">Discuss your organisation <ArrowRight aria-hidden="true" size={17} /></Link>
              <Link href="#our-approach" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">How we help <ArrowDown aria-hidden="true" size={17} /></Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[2.25rem] border border-white/15 shadow-[0_35px_90px_-35px_rgba(0,0,0,.65)]">
              <Image src="/images/faith-community-funding-hero.png" alt="Community and faith-sector leaders collaborating on programme and funding development." fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover object-center" />
            </div>
            <div className="absolute -bottom-7 left-5 flex max-w-[18rem] items-center gap-3 rounded-2xl border border-white/20 bg-white p-3 pr-5 text-[#062f2a] shadow-xl sm:left-8">
              <Image src="/images/faith-community-funding-shield.jpeg" alt="" width={58} height={58} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              <p className="text-sm font-bold leading-5">Build fundable organisations and programmes — not dependency.</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Practice at a glance" className="border-b border-teal-900/10 bg-white py-8">
        <dl className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Practice", "Consultancy & Advisory"],
            ["Focus", "Faith & community organisations"],
            ["Method", "Discover · Develop · Fund · Build"],
            ["Support", "Funding readiness · Programme development · Organisational capacity"],
          ].map(([term, detail]) => <div className="border-l-2 border-emerald-400 pl-4" key={term}><dt className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">{term}</dt><dd className="mt-2 font-semibold leading-6 text-slate-700">{detail}</dd></div>)}
        </dl>
      </section>

      <section className="section-space">
        <div className="container-page grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
          <SectionHeading eyebrow="Why this practice exists" title="Community presence is valuable. But presence alone is not a programme." />
          <div className="space-y-5 text-lg leading-8 text-slate-600">
            <p>Faith and community organisations are often deeply embedded in the communities they serve. They may already have trusted relationships, volunteers, facilities, recurring activities and insight into local needs.</p>
            <p>Yet these strengths do not automatically translate into programmes that funders, commissioners and partners can confidently support.</p>
            <p>BloomShield helps bridge that gap — strengthening the programme design, evidence, funding strategy and organisational capability needed to turn community activity into sustainable impact.</p>
          </div>
        </div>
      </section>

      <section id="our-approach" className="scroll-mt-28 bg-mist section-space">
        <div className="container-page">
          <SectionHeading eyebrow="Our approach" title="Discover → Develop → Fund → Build" intro="A capability-building approach designed to leave organisations stronger." />
          <div className="mt-12"><FundingDevelopmentPathway /></div>
        </div>
      </section>

      <section className="section-space bg-[#071f34] text-white">
        <div className="container-page grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">Who we work with</p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">Built for organisations rooted in community.</h2>
            <p className="mt-6 text-lg leading-8 text-white/75">The practice is designed particularly for smaller and developing organisations with strong community relationships but limited specialist funding or programme-development capacity.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {audiences.map((audience) => <li className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4 font-semibold leading-6" key={audience}><CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />{audience}</li>)}
          </ul>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <SectionHeading eyebrow="Practical support" title="What BloomShield can help with" intro="Support can begin with one immediate organisational challenge and develop into a practical route towards stronger programmes, partnerships and systems." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map(([Icon, title, text]) => <article className="card" key={title}><Icon aria-hidden="true" className="text-teal-700" /><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-emerald-50/60">
        <div className="container-page">
          <SectionHeading eyebrow="Why BloomShield" title="More than bid writing." intro="BloomShield combines programme development, implementation thinking, evidence, evaluation, organisational capacity and community-engagement expertise." />
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">That means we do not begin with the application form. We begin with the organisation, the community need and the programme itself — then determine how funding can support credible delivery.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Programme-first", "We build the proposition before chasing the funding."],
              ["Evidence-led", "Need, outcomes and evaluation are designed into the programme."],
              ["Capacity-building", "Our aim is increasing organisational independence."],
              ["Partnership-aware", "We help organisations become stronger collaborators as well as stronger applicants."],
            ].map(([title, text], index) => <article className="rounded-3xl border border-teal-900/10 bg-white p-7" key={title}><span className="text-xs font-bold tracking-[.16em] text-gold-600">0{index + 1}</span><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="flex aspect-[4/3] items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-teal-800 to-[#071f34] p-10 text-white">
            <div className="text-center"><Handshake aria-hidden="true" className="mx-auto h-16 w-16 text-emerald-300" /><p className="mt-6 font-display text-2xl font-semibold">Trusted locally.<br />Stronger organisationally.<br />Ready for sustainable impact.</p></div>
          </div>
          <div>
            <p className="eyebrow">Wider community value</p>
            <h2 className="heading">From community capacity to community impact</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Strong community organisations are an important part of healthy and resilient communities.</p>
            <p className="mt-5 text-lg leading-8 text-slate-600">BloomShield’s wider work recognises the particular value of trusted local institutions in reaching people whom conventional systems may struggle to engage.</p>
            <p className="mt-5 text-lg leading-8 text-slate-600">Strengthening community organisations can therefore create benefits beyond an individual funding application — supporting stronger local infrastructure, better partnerships and more sustainable community action.</p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-page">
          <aside className="rounded-3xl border border-teal-900/15 bg-slate-50 p-7 sm:p-9" aria-labelledby="independence-principle">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-700">Ethical firewall</p>
            <h2 id="independence-principle" className="mt-4 font-display text-2xl font-semibold">Our independence principle</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">BloomShield’s funding-development consultancy operates independently from our community health programmes. Purchasing consultancy support is never a condition of participating in a BloomShield programme or partnership, and consultancy clients receive no preferential access to programme funding or delivery opportunities.</p>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#062f2a] via-[#075144] to-[#096b58] py-20 text-white md:py-24">
        <div aria-hidden="true" className="absolute -right-20 -top-28 h-80 w-80 rounded-full border-[52px] border-emerald-300/10" />
        <div className="container-page relative">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">A practical first step</p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">Start with what you already have.</h2>
            <p className="mt-6 text-lg leading-8 text-white/75">You do not need a finished project or funding application. Bring us the community activity, idea or organisational challenge. We can help determine what is fundable, what needs strengthening and what the next practical step should be.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact?interest=Faith%20%26%20Community%20Funding%20Development" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-bold text-[#062f2a] transition hover:bg-emerald-200">Discuss your organisation <ArrowRight aria-hidden="true" size={17} /></Link>
              <Link href="/consultancy" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">Explore Consultancy &amp; Advisory</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
