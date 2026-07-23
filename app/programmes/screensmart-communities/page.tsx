import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Church,
  ClipboardCheck,
  Compass,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Hospital,
  Languages,
  MapPinned,
  Megaphone,
  Network,
  Route,
  School,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";

const path = "/programmes/screensmart-communities" as const;
const description =
  "Explore ScreenSmart Communities™, BloomShield CIC’s flagship programme improving cancer prevention, screening participation and early diagnosis through trusted community partnerships, digital learning and implementation science.";

export const metadata = createMetadata({
  title: "ScreenSmart Communities™ | Community Cancer Prevention | BloomShield CIC",
  description,
  path,
  absoluteTitle: true,
});

const contactHref = (interest: string) => `/contact?interest=${encodeURIComponent(interest)}`;

const functions: [LucideIcon, string, string][] = [
  [Megaphone, "Community cancer awareness", "Accessible education supports informed conversations about prevention, symptoms and recognised screening programmes."],
  [Target, "Screening participation", "Behaviourally informed engagement helps people understand invitations and make informed choices."],
  [Users, "Trusted outreach", "Local partners and trusted messengers bring respectful conversations closer to everyday community life."],
  [Route, "Navigation and referral support", "Practical guidance helps people identify appropriate routes into recognised health services and follow-up."],
  [GraduationCap, "Community champion training", "Training equips community champions and volunteers to share accurate information within clear boundaries."],
  [BookOpen, "Digital health education", "Accessible resources extend consistent learning across settings, languages and delivery formats."],
  [BrainCircuit, "AI-enabled learning", "Responsible AI may support education and implementation learning where it is appropriate and safely governed."],
  [HeartHandshake, "Partnership development", "Community, health, research and delivery partners co-design locally workable approaches."],
  [ClipboardCheck, "Evaluation and improvement", "Proportionate monitoring supports learning about reach, experience, equity and implementation."],
  [ShieldCheck, "Clinically governed activity", "Any clinical pilot or screening activity is delivered with appropriately governed healthcare partners."],
];

const places: [LucideIcon, string][] = [
  [Church, "Faith communities"], [BriefcaseBusiness, "Workplaces"], [Users, "Community centres"],
  [Hospital, "Primary care and community health settings"], [Store, "Pharmacies"], [Building2, "Local authority initiatives"],
  [School, "Schools and colleges"], [HandHeart, "Voluntary and community organisations"], [Languages, "Ethnically diverse communities"],
  [MapPinned, "Underserved neighbourhoods"], [Compass, "Rural and isolated communities"], [Sparkles, "Pop-up community events"],
];

const pathway = [
  ["Understand", "Identify local needs, barriers, assets, priorities and opportunities."],
  ["Engage", "Build trusted relationships with communities, healthcare partners and local stakeholders."],
  ["Implement", "Deliver locally adapted, evidence-informed interventions and screening support."],
  ["Evaluate", "Measure participation, experience, outcomes, equity and implementation learning."],
  ["Scale", "Strengthen successful models and support wider adoption."],
];

const focusAreas = [
  "Cervical screening", "Breast screening awareness", "Bowel screening participation",
  "Lung cancer awareness and targeted pathways", "Prostate health information", "Symptom awareness",
  "HPV education", "Prevention and risk reduction", "Follow-up navigation", "Community health literacy",
];

const partners = [
  "NHS organisations", "Integrated Care Boards", "Primary Care Networks", "Local authorities",
  "Public health teams", "Universities and research institutions", "Community and voluntary organisations",
  "Employers", "Faith organisations", "Charitable foundations", "Grant funders",
  "Digital health and AI innovators", "Screening and diagnostic partners",
];

const models = [
  ["Community Pilot", "Develop a locally tailored ScreenSmart Communities™ pilot with community partners and health stakeholders.", "Discuss a Community Pilot", "ScreenSmart Community Pilot"],
  ["Commissioning and Delivery", "Explore structured delivery, implementation support and outcome measurement.", "Discuss Commissioning", "ScreenSmart Commissioning"],
  ["Research and Evaluation", "Collaborate on implementation science, health inequalities research, evaluation or digital innovation.", "Explore Research Collaboration", "ScreenSmart Research Collaboration"],
  ["Funding and Strategic Partnership", "Support programme development, community delivery, learning resources and scale-up.", "Become a Funding Partner", "ScreenSmart Funding Partnership"],
];

const outcomes = [
  "Greater understanding of cancer prevention and screening",
  "Increased confidence in informed health decisions",
  "Improved screening participation",
  "Reduced practical and informational barriers",
  "Stronger referral and navigation pathways",
  "Increased community capacity",
  "Better partnership working",
  "More equitable access",
  "Earlier presentation and diagnosis",
  "Evidence to support adaptation and scale",
];

function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <div className="max-w-3xl"><p className="screensmart-eyebrow">{eyebrow}</p><h2 className="screensmart-heading">{title}</h2>{intro && <p className="mt-5 text-lg leading-8 text-slate-600">{intro}</p>}</div>;
}

export default function ScreenSmartCommunities() {
  return (
    <>
      <PageStructuredData
        name="ScreenSmart Communities™"
        description={description}
        path={path}
        breadcrumb="ScreenSmart Communities™"
        kind="screensmart"
      />

      <section className="screensmart-theme relative overflow-hidden bg-[#062f2a] text-white">
        <div aria-hidden="true" className="absolute -right-32 -top-36 h-[34rem] w-[34rem] rounded-full border-[80px] border-emerald-300/10" />
        <div aria-hidden="true" className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-[#0a4138]/50 to-transparent" />
        <div className="container-page relative grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-[1.18fr_.82fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-emerald-100/80">
              <ol className="flex flex-wrap items-center gap-2"><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/programmes">Programmes</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-white">ScreenSmart Communities™</li></ol>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">BloomShield Flagship Programme</p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-[-.04em] sm:text-6xl lg:text-7xl">ScreenSmart<br />Communities™</h1>
            <p className="mt-6 max-w-2xl font-display text-2xl font-semibold leading-snug text-emerald-100">Community-based cancer prevention, screening and early diagnosis</p>
            <div className="mt-7 max-w-2xl space-y-4 text-lg leading-8 text-white/80">
              <p>Every community deserves equitable access to life-saving cancer prevention, screening and early diagnosis.</p>
              <p>ScreenSmart Communities™ is BloomShield’s flagship community implementation programme, designed to improve participation in cancer screening, promote earlier diagnosis and reduce health inequalities through trusted local partnerships, evidence-based practice and digital innovation.</p>
              <p>Rather than waiting for people to engage with healthcare services, the programme brings education, screening support, navigation and trusted conversations closer to where people live, work, learn and worship.</p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={contactHref("ScreenSmart Community Pilot")} className="screensmart-button">Bring ScreenSmart to Your Community <ArrowRight size={17} /></Link>
              <span aria-disabled="true" className="screensmart-button-muted" title="The programme overview is being prepared">Programme Overview Coming Soon</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-[2.5rem] border border-emerald-200/20 bg-white/[.07] p-7 shadow-2xl backdrop-blur">
              <p className="font-display text-3xl font-semibold">Protect.<br />Prevent.<br /><span className="text-emerald-300">Empower.</span></p>
              <div className="mt-8 space-y-3">{["Trusted local partnerships", "Behavioural insight", "Digital innovation", "Implementation science"].map((item, index) => <div key={item} className="flex items-center gap-4 rounded-2xl bg-white/[.07] p-4"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-300 text-xs font-bold text-[#062f2a]">0{index + 1}</span><span className="font-semibold">{item}</span></div>)}</div>
              <p className="mt-7 border-t border-white/15 pt-6 text-sm font-semibold text-emerald-100">Shielded by Care, Empowered to Bloom</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-emerald-50/60"><div className="container-page grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
        <SectionTitle eyebrow="The foundation" title="Local action, connected by a shared framework." />
        <div className="space-y-5 text-lg leading-8 text-slate-700"><p>ScreenSmart Communities™ combines community engagement, behavioural science, implementation science, digital learning and partnership working to create locally responsive models of cancer prevention and early diagnosis.</p><p>Built upon BloomShield’s <Link href="/about#ccpe" className="font-bold text-emerald-800 underline decoration-emerald-400 underline-offset-4">Cancer Care Partnership Ecosystem</Link>, the programme supports communities to understand barriers, build trust, improve screening participation, strengthen referral pathways, evaluate outcomes and scale effective interventions.</p></div>
      </div></section>

      <section className="section-space"><div className="container-page"><SectionTitle eyebrow="The need" title="Why ScreenSmart Communities™?" /><div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr]"><div className="space-y-5 text-lg leading-8 text-slate-600"><p>Many cancers can be prevented or treated more successfully when people participate in recommended screening programmes and seek medical advice promptly when symptoms develop. Yet significant inequalities remain.</p><p>Communities affected by socioeconomic disadvantage, cultural barriers, limited health literacy, digital exclusion, rural isolation, mistrust or reduced access to healthcare may experience lower screening participation and poorer cancer outcomes.</p><p>ScreenSmart Communities™ helps bridge those gaps by working with communities rather than simply delivering services to them.</p><p>The programme focuses on trust, informed choice, practical access, culturally responsive communication and clear pathways into appropriate healthcare and follow-up support.</p></div><ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{["Reduce barriers", "Build trust", "Improve participation", "Support earlier diagnosis", "Strengthen local capacity"].map((item) => <li key={item} className="flex items-center gap-4 rounded-2xl border border-emerald-800/10 bg-emerald-50 p-5 font-bold text-emerald-950"><CheckCircle2 className="shrink-0 text-emerald-700" />{item}</li>)}</ul></div></div></section>

      <section className="section-space bg-[#f5faf7]"><div className="container-page"><SectionTitle eyebrow="Programme delivery" title="What We Do" intro="A structured programme that connects education, trusted engagement, practical navigation and learning—without blurring the boundaries of clinical care." /><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{functions.map(([Icon, title, text]) => <article className="screensmart-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section-space"><div className="container-page"><SectionTitle eyebrow="Adaptable settings" title="Designed for the Places People Already Trust" /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{places.map(([Icon, title]) => <div key={title} className="flex items-center gap-4 rounded-2xl border border-emerald-900/10 p-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"><Icon size={22} /></span><span className="font-bold">{title}</span></div>)}</div><p className="mt-10 rounded-2xl bg-emerald-900 p-6 text-lg leading-8 text-white">Each implementation is adapted to local needs while maintaining consistent standards of quality, safeguarding, governance, inclusion and evaluation.</p></div></section>

      <section className="section-space overflow-hidden bg-[#062f2a] text-white"><div className="container-page"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">Implementation pathway</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">How ScreenSmart Works</h2><p className="mt-5 text-lg leading-8 text-white/75">The programme follows the established <Link href="/about#ccpe" className="font-bold text-emerald-200 underline underline-offset-4">Cancer Care Partnership Ecosystem</Link> sequence.</p></div><ol className="screensmart-timeline mt-14">{pathway.map(([title, text], index) => <li key={title}><span>{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>

      <section className="section-space"><div className="container-page"><SectionTitle eyebrow="Locally agreed priorities" title="Programme Focus" intro="ScreenSmart Communities™ can support locally agreed priorities across cancer prevention, screening participation, symptom awareness, navigation and early diagnosis." /><div className="mt-10 flex flex-wrap gap-3">{focusAreas.map((item) => <span key={item} className="rounded-full border border-emerald-700/20 bg-emerald-50 px-5 py-3 font-semibold text-emerald-950">{item}</span>)}</div><div className="mt-10 flex gap-4 rounded-2xl border-l-4 border-emerald-600 bg-slate-50 p-6"><Stethoscope className="mt-1 shrink-0 text-emerald-700" /><p className="leading-7 text-slate-700"><strong>Clinical responsibility:</strong> Screening eligibility, clinical advice, diagnosis and treatment remain the responsibility of appropriately qualified healthcare professionals and recognised health services.</p></div></div></section>

      <section className="section-space bg-gradient-to-br from-emerald-50 to-white"><div className="container-page grid gap-12 lg:grid-cols-[.85fr_1.15fr]"><div><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-800 text-white"><BrainCircuit size={32} /></span><SectionTitle eyebrow="Responsible innovation" title="Digital Learning with a Human Focus" /></div><div><p className="text-lg leading-8 text-slate-700">ScreenSmart Communities™ uses digital tools to extend the reach and consistency of cancer education while preserving trusted, person-centred engagement.</p><ul className="mt-7 grid gap-3 sm:grid-cols-2">{["Accessible cancer education", "Multilingual learning", "Community champion training", "Myth correction", "Screening reminders and navigation", "Remote learning", "Programme evaluation", "Responsible AI-supported education"].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-emerald-700" size={19} /><span>{item}</span></li>)}</ul><p className="mt-8 rounded-2xl bg-[#062f2a] p-6 leading-7 text-white"><strong className="text-emerald-300">Human judgement remains central.</strong> Artificial intelligence may support education, communication, programme design and implementation learning. It does not replace clinical judgement, diagnosis, consent or regulated healthcare practice.</p></div></div></section>

      <section className="section-space"><div className="container-page"><SectionTitle eyebrow="Partnership ecosystem" title="Who We Work With" intro="BloomShield works with partners to understand local needs, co-design practical interventions, strengthen participation pathways, support implementation and evaluate what works." /><ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{partners.map((partner) => <li key={partner} className="flex items-center gap-3 rounded-2xl border border-emerald-900/10 p-5 font-semibold"><Network className="shrink-0 text-emerald-700" size={20} />{partner}</li>)}</ul></div></section>

      <section className="section-space bg-[#f5faf7]"><div className="container-page"><SectionTitle eyebrow="Partnership models" title="Ways to Work With Us" /><div className="mt-12 grid gap-6 lg:grid-cols-2">{models.map(([title, text, label, interest]) => <article key={title} className="flex flex-col rounded-3xl border border-emerald-900/10 bg-white p-8 shadow-soft"><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-700">ScreenSmart partnership</p><h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3><p className="mt-4 flex-1 leading-7 text-slate-600">{text}</p><Link href={contactHref(interest)} className="mt-7 inline-flex items-center gap-2 font-bold text-emerald-800 underline decoration-emerald-400 decoration-2 underline-offset-8">{label} <ArrowRight size={17} /></Link></article>)}</div></div></section>

      <section className="section-space"><div className="container-page"><SectionTitle eyebrow="Measurable ambition" title="What Success Looks Like" intro="ScreenSmart Communities™ aims to support meaningful improvements while generating evidence for continuous adaptation." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{outcomes.map((outcome, index) => <div key={outcome} className="rounded-2xl border border-emerald-800/10 bg-gradient-to-br from-white to-emerald-50 p-5"><span className="text-xs font-bold text-emerald-700">0{index + 1}</span><p className="mt-3 font-semibold leading-6">{outcome}</p></div>)}</div></div></section>

      <section className="section-space bg-mist"><div className="container-page"><SectionTitle eyebrow="Resources" title="ScreenSmart Resources" /><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Resource title="ScreenSmart Communities™ Programme Overview" status="Coming Soon" />
        <Resource title="Partnership and Pilot Enquiry" href={contactHref("ScreenSmart Community Pilot")} linkLabel="Make an enquiry" />
        <Resource title="Community Learning Resources" status="In Development" />
        <Resource title="Implementation Resources" status="Future Member Resource" />
        <Resource title="Training and Capacity Building" href="/consultancy" linkLabel="Explore learning support" />
      </div></div></section>

      <section className="screensmart-closing"><div className="container-page relative py-20 text-center sm:py-24"><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">Protect. Prevent. Empower.</p><h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-semibold sm:text-5xl">Bring ScreenSmart Communities™ to Your Area</h2><p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80">Whether you represent a community organisation, healthcare service, local authority, employer, research institution or funding body, BloomShield welcomes conversations about locally responsive cancer prevention, screening participation and early-diagnosis programmes.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href={contactHref("ScreenSmart General Enquiry")} className="screensmart-button">Start a Conversation <ArrowRight size={17} /></Link><Link href="/partnerships" className="screensmart-button-outline">Explore BloomShield Partnerships</Link></div></div></section>
    </>
  );
}

function Resource({ title, status, href, linkLabel }: { title: string; status?: string; href?: string; linkLabel?: string }) {
  return <article className="flex min-h-48 flex-col rounded-3xl border border-emerald-900/10 bg-white p-7"><BookOpen className="text-emerald-700" /><h3 className="mt-5 text-xl font-bold">{title}</h3>{status && <span className="mt-auto pt-6 text-sm font-bold uppercase tracking-wider text-emerald-700">{status}</span>}{href && <Link href={href} className="mt-auto inline-flex items-center gap-2 pt-6 font-bold text-emerald-800">{linkLabel} <ArrowRight size={17} /></Link>}</article>;
}
