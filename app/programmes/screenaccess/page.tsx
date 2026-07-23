import type { LucideIcon } from "lucide-react";
import {
  Accessibility, ArrowDown, ArrowRight, BarChart3, Building2,
  Bus, CalendarClock, CheckCircle2, CircleDollarSign, ClipboardCheck, Compass,
  DoorOpen, HeartHandshake, Languages, Laptop, MapPinned,
  Network, Route, ShieldCheck, Smartphone, Users,
} from "lucide-react";
import Link from "next/link";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";

const path = "/programmes/screenaccess" as const;
const description =
  "ScreenAccess™ removes practical, social, geographical and organisational barriers to cancer screening, helping underserved communities participate in early detection programmes.";

export const metadata = createMetadata({
  title: "ScreenAccess™ | Equitable Cancer Screening Access | BloomShield CIC",
  description,
  path,
  absoluteTitle: true,
});

const contactHref = `/contact?interest=${encodeURIComponent("ScreenAccess™")}`;

const barriers: [LucideIcon, string][] = [
  [MapPinned, "Geographical distance"], [Bus, "Transport difficulties"],
  [CalendarClock, "Inconvenient appointment times"], [CircleDollarSign, "Deprivation and financial pressures"],
  [Accessibility, "Disability and accessibility needs"], [Languages, "Language and communication barriers"],
  [Laptop, "Digital exclusion"], [ClipboardCheck, "Low health literacy"],
  [Users, "Cultural concerns"], [ShieldCheck, "Fear or mistrust"],
  [HeartHandshake, "Previous negative healthcare experiences"], [Route, "Fragmented referral pathways"],
  [Building2, "Workforce and service capacity constraints"],
];

const objectives = [
  "Improve screening uptake in underserved communities.",
  "Reduce inequalities in cancer screening participation.",
  "Support earlier cancer diagnosis.",
  "Improve navigation through screening pathways.",
  "Help commissioners achieve population health objectives.",
  "Reduce avoidable late-stage presentations.",
  "Develop sustainable community screening access models.",
];

const pillars = [
  {
    title: "Access Assessment",
    summary: "Understanding where and why people are unable to participate.",
    items: ["Community needs assessments", "Stakeholder engagement", "Service mapping", "Population segmentation", "Access audits", "Pathway gap analysis"],
  },
  {
    title: "Community Outreach",
    summary: "Taking information, engagement and services closer to communities.",
    items: ["Faith organisations", "Employers", "Pharmacies", "Libraries", "Schools", "Community centres", "Voluntary organisations", "Local events"],
  },
  {
    title: "Navigation Support",
    summary: "Helping individuals complete the full screening journey.",
    items: ["Appointment booking", "Reminders", "Transport solutions", "Translation and interpretation", "Digital support", "Reasonable adjustments", "Follow-up coordination"],
  },
  {
    title: "Service Innovation",
    summary: "Supporting partners to redesign how screening is accessed.",
    items: ["Mobile screening services", "Community-based clinics", "Evening appointments", "Weekend appointments", "Workplace screening", "Outreach clinics", "Integrated referral pathways", "Flexible booking systems"],
  },
  {
    title: "Equity Intelligence",
    summary: "Using data and local insight to identify and reduce inequalities.",
    items: ["Screening uptake analysis", "Postcode mapping", "Demographic analysis", "Inequality dashboards", "Pathway completion analysis", "Quality improvement cycles"],
  },
];

const pathway = [
  ["Understand", "Identify barriers, underserved populations and pathway gaps."],
  ["Validate", "Confirm needs through evidence, data, community engagement and stakeholder insight."],
  ["Implement", "Deliver practical access interventions with local partners."],
  ["Evaluate", "Measure participation, pathway completion, experience, equity and outcomes."],
  ["Scale", "Expand successful models through commissioning, partnerships and shared learning."],
];

const populations = [
  "Communities with low screening uptake", "Ethnic minority populations", "Rural and coastal communities",
  "People experiencing homelessness", "Refugees and asylum seekers", "People with disabilities",
  "People with learning disabilities", "People living with severe mental illness", "Digitally excluded populations",
  "Older adults", "Occupational groups with limited access to routine services", "Communities affected by deprivation",
];

const activities = [
  "Community screening access campaigns", "GP practice engagement", "Employer partnerships",
  "Faith-based initiatives", "Mobile screening events", "Transport support schemes",
  "Community navigator programmes", "Screening literacy workshops", "Digital inclusion support",
  "Behavioural insight projects", "Appointment support", "Outreach pathway pilots",
];

const partners = [
  "NHS organisations", "Integrated Care Boards", "Cancer Alliances", "Local authorities",
  "Primary Care Networks", "GP practices", "Community pharmacies", "Employers",
  "Voluntary and community organisations", "Faith organisations", "Universities",
  "Research institutions", "Public health teams", "Screening providers",
];

const outcomeGroups = [
  ["Health outcomes", ["Increased screening participation", "Improved early diagnosis", "Reduced inequalities", "Fewer avoidable late presentations"]],
  ["Service outcomes", ["Improved pathway completion", "Reduced missed appointments", "Stronger community engagement", "Improved participant experience", "More responsive service design"]],
  ["System outcomes", ["Improved use of screening capacity", "Stronger community partnerships", "Better evidence for commissioning", "More efficient access pathways", "Scalable models for reducing inequalities"]],
] as const;

const indicators = [
  "Screening uptake", "First-time participation", "Non-attendance rates", "Referral completion",
  "Pathway completion", "Time to follow-up", "Participant experience", "Community engagement",
  "Equity gap reduction", "Cost per additional participant reached or screened",
];

function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <div className="max-w-3xl"><p className="screenaccess-eyebrow">{eyebrow}</p><h2 className="screenaccess-heading">{title}</h2>{intro && <p className="mt-5 text-lg leading-8 text-slate-600">{intro}</p>}</div>;
}

function TickList({ items }: { items: readonly string[] }) {
  return <ul className="mt-6 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 leading-7 text-slate-700"><CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-[#b84d32]" size={19}/><span>{item}</span></li>)}</ul>;
}

export default function ScreenAccess() {
  return <>
    <PageStructuredData name="ScreenAccess™" description={description} path={path} breadcrumb="ScreenAccess™" kind="screenaccess" />

    <section className="relative overflow-hidden bg-[#3d1d18] text-white">
      <div aria-hidden="true" className="absolute -right-28 -top-32 h-[34rem] w-[34rem] rounded-full border-[78px] border-[#f09a7d]/10"/>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#6e2d21]/35 to-transparent"/>
      <div className="container-page relative grid min-h-[720px] min-w-0 items-center gap-12 py-20 lg:grid-cols-[1.15fr_.85fr]">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#ffd8ca]/75"><ol className="flex flex-wrap items-center gap-2"><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/programmes">Programmes</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-white">ScreenAccess™</li></ol></nav>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#f6a88d]">BloomShield Programme Portfolio · Volume 2</p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-[-.04em] sm:text-6xl lg:text-7xl">ScreenAccess™</h1>
          <p className="mt-6 max-w-2xl font-display text-2xl font-semibold leading-snug text-[#ffd8ca]">Removing barriers. Expanding access. Enabling earlier diagnosis.</p>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78">ScreenAccess™ works with communities, healthcare providers, commissioners and local partners to identify and remove the barriers that prevent people from participating in cancer screening and early diagnosis pathways.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href={contactHref} className="screenaccess-button">Discuss a ScreenAccess™ Partnership <ArrowRight size={17}/></Link><Link href="#overview" className="screenaccess-button-outline">Explore the Programme <ArrowDown size={17}/></Link></div>
        </div>
        <div className="mx-auto w-full max-w-md rounded-[2.5rem] border border-[#ffd8ca]/15 bg-white/[.06] p-7 shadow-2xl backdrop-blur">
          <DoorOpen className="h-12 w-12 text-[#f6a88d]" strokeWidth={1.5}/>
          <p className="mt-7 font-display text-3xl font-semibold">Awareness becomes impact only when access becomes participation.</p>
          <div className="mt-8 space-y-3">{["Practical support", "Equitable participation", "Community reach", "Pathway improvement"].map((item, index) => <div key={item} className="flex items-center gap-4 rounded-2xl bg-white/[.07] p-4"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f6a88d] text-xs font-bold text-[#3d1d18]">0{index + 1}</span><span className="font-semibold">{item}</span></div>)}</div>
        </div>
      </div>
    </section>

    <section id="overview" className="section-space scroll-mt-24 bg-[#fff8f5]"><div className="container-page grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><SectionTitle eyebrow="Programme overview" title="Availability is not the same as access."/><div className="space-y-5 text-lg leading-8 text-slate-700"><p>Screening programmes may exist, but participation is not always equitable. Transport, geography, deprivation, disability, language, digital exclusion, low health literacy, cultural concerns, fear, fragmented services and inflexible appointments can all stand between an invitation and successful participation.</p><p>ScreenAccess™ helps partners identify where people are being lost from the pathway and develop practical, community-centred interventions that improve participation.</p><blockquote className="rounded-2xl border-l-4 border-[#c55a3d] bg-white p-6 font-display text-2xl font-semibold text-[#71301f] shadow-sm">Screening cannot reduce inequalities if the people at greatest risk cannot access it.</blockquote></div></div></section>

    <section className="section-space"><div className="container-page"><SectionTitle eyebrow="Why ScreenAccess™ exists" title="Making the difference between a service being available and genuinely accessible." intro="Barriers are shaped by systems and circumstances. Understanding them respectfully is the first step towards practical change."/><ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{barriers.map(([Icon, title]) => <li key={title} className="flex items-center gap-4 rounded-2xl border border-[#873822]/12 bg-white p-5 shadow-sm"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fde3d8] text-[#a9432d]"><Icon size={22}/></span><span className="font-bold text-slate-800">{title}</span></li>)}</ul></div></section>

    <section className="section-space bg-[#4b211a]"><div className="container-page grid gap-6 lg:grid-cols-2"><article className="screenaccess-purpose-card rounded-3xl border border-[#d96748]/20 bg-white p-8 text-[#3d1d18] sm:p-10"><p className="screenaccess-eyebrow">Vision</p><h2 className="font-display text-3xl font-semibold text-[#4b211a]">Equitable access for every eligible person.</h2><p className="mt-5 text-lg leading-8 text-slate-700">To ensure that every eligible person has equitable access to evidence-based cancer screening regardless of geography, socioeconomic circumstances, ethnicity, disability, digital literacy or other barriers.</p></article><article className="screenaccess-purpose-card rounded-3xl border border-[#d96748]/20 bg-white p-8 text-[#3d1d18] sm:p-10"><p className="screenaccess-eyebrow">Mission</p><h2 className="font-display text-3xl font-semibold text-[#4b211a]">Remove barriers through partnership.</h2><p className="mt-5 text-lg leading-8 text-slate-700">To work with communities, healthcare providers, commissioners, employers and policymakers to identify, understand and remove barriers that prevent people from participating in life-saving screening programmes.</p></article></div></section>

    <section className="section-space"><div className="container-page"><SectionTitle eyebrow="Programme objectives" title="From participation to sustainable system change."/><ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{objectives.map((item, index) => <li key={item} className="rounded-3xl border border-[#873822]/10 bg-gradient-to-br from-white to-[#fff3ee] p-7"><span className="text-sm font-bold text-[#b84d32]">0{index + 1}</span><p className="mt-4 text-lg font-semibold leading-7">{item}</p></li>)}</ol></div></section>

    <section className="section-space bg-[#fff8f5]"><div className="container-page"><SectionTitle eyebrow="Strategic pillars" title="Five connected capabilities for equitable access." intro="Each pillar can be adapted to local priorities while retaining a consistent implementation structure."/><div className="mt-12 grid gap-6 lg:grid-cols-2">{pillars.map((pillar, index) => <article key={pillar.title} className={`rounded-3xl border border-[#873822]/10 bg-white p-8 shadow-sm ${index === 4 ? "lg:col-span-2" : ""}`}><div className="flex items-start gap-5"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c55a3d] font-bold text-white">0{index + 1}</span><div><h3 className="font-display text-2xl font-semibold text-[#71301f]">{pillar.title}</h3><p className="mt-2 leading-7 text-slate-600">{pillar.summary}</p></div></div><div className="mt-6 flex flex-wrap gap-2">{pillar.items.map((item) => <span key={item} className="rounded-full bg-[#fff0ea] px-4 py-2 text-sm font-semibold text-[#74301f]">{item}</span>)}</div></article>)}</div></div></section>

    <section className="section-space overflow-hidden bg-[#3d1d18] text-white"><div className="container-page"><p className="screenaccess-dark-eyebrow">CCPE implementation pathway</p><h2 className="font-display text-4xl font-semibold sm:text-5xl">Understand → Validate → Implement → Evaluate → Scale</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">ScreenAccess™ operates through BloomShield’s <Link href="/about#ccpe" className="font-bold text-[#ffc2ad] underline underline-offset-4">Cancer Care Partnership Ecosystem</Link> implementation framework.</p><ol className="screenaccess-pathway mt-14">{pathway.map(([title, text], index) => <li key={title}><span>{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>

    <section className="section-space"><div className="container-page"><SectionTitle eyebrow="Target populations" title="Locally defined, evidence-led and co-designed." intro="ScreenAccess™ may support populations experiencing unequal access. Populations and interventions will always be defined through local evidence, community engagement and co-design—not assumptions."/><div className="mt-10 flex flex-wrap gap-3">{populations.map((item) => <span key={item} className="rounded-full border border-[#a9432d]/20 bg-[#fff8f5] px-5 py-3 font-semibold text-[#71301f]">{item}</span>)}</div></div></section>

    <section className="section-space bg-mist"><div className="container-page"><SectionTitle eyebrow="Example programme activities" title="Practical interventions shaped around local need." intro="The following are examples of potential activity, not claims that every service is currently operational."/><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{activities.map((item) => <div key={item} className="flex gap-3 rounded-2xl bg-white p-5 font-semibold shadow-sm"><Compass className="shrink-0 text-[#b84d32]" size={20}/>{item}</div>)}</div></div></section>

    <section className="section-space"><div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><SectionTitle eyebrow="Partnership model" title="Improving what exists through collaborative implementation."/><Link href={contactHref} className="screenaccess-link mt-8">Explore a ScreenAccess™ Collaboration <ArrowRight size={17}/></Link></div><div><p className="text-lg leading-8 text-slate-700">ScreenAccess™ is designed as a collaborative implementation programme. BloomShield does not seek to duplicate existing screening services. It works with local partners to improve reach, access, participation and pathway completion.</p><ul className="mt-8 grid gap-3 sm:grid-cols-2">{partners.map((partner) => <li key={partner} className="flex items-center gap-3 rounded-xl border border-[#873822]/10 p-4 font-semibold"><Network className="shrink-0 text-[#b84d32]" size={19}/>{partner}</li>)}</ul></div></div></section>

    <section className="section-space bg-[#fff8f5]"><div className="container-page"><SectionTitle eyebrow="Expected outcomes" title="Aims for health, services and systems." intro="ScreenAccess™ aims to support these outcomes; results will depend on context, delivery partners and the interventions agreed."/><div className="mt-12 grid gap-6 lg:grid-cols-3">{outcomeGroups.map(([title, items]) => <article key={title} className="rounded-3xl border border-[#873822]/10 bg-white p-8"><h3 className="font-display text-2xl font-semibold text-[#71301f]">{title}</h3><TickList items={items}/></article>)}</div></div></section>

    <section className="section-space"><div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><SectionTitle eyebrow="Monitoring and evaluation" title="Measures agreed with delivery and commissioning partners." intro="A proportionate evaluation plan will connect implementation learning with participation, experience and equity."/><div className="grid gap-3 sm:grid-cols-2">{indicators.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#fff3ee] p-5 font-semibold text-[#71301f]"><BarChart3 className="shrink-0" size={20}/>{item}</div>)}</div></div></section>

    <section className="section-space bg-[#f7f8ff]"><div className="container-page"><SectionTitle eyebrow="Programme portfolio" title="An integrated pathway from awareness to coordinated care."/><div className="mx-auto mt-12 max-w-3xl space-y-4 text-center"><PortfolioStep href="/programmes/screensmart-communities" colour="green" title="ScreenSmart Communities™" text="Builds awareness, understanding, confidence and motivation."/><ArrowDown aria-hidden="true" className="mx-auto text-slate-400"/><PortfolioStep href={path} colour="coral" title="ScreenAccess™" text="Removes barriers and enables equitable participation." current/><ArrowDown aria-hidden="true" className="mx-auto text-slate-400"/><PortfolioStep href="/programmes#screen-connect" colour="blue" title="ScreenConnect™" text="Supports navigation, coordination, follow-up and continuity of care."/></div><p className="mx-auto mt-10 max-w-2xl text-center text-lg leading-8 text-slate-600">Together, the three programmes provide an integrated pathway from awareness to access to coordinated care.</p></div></section>

    <section className="section-space"><div className="container-page grid gap-12 lg:grid-cols-2"><div><SectionTitle eyebrow="Programme development" title="Flexible by design, rigorous in development."/><p className="mt-6 text-lg leading-8 text-slate-700">ScreenAccess™ is being developed as a flexible implementation programme that can be adapted to local screening priorities, populations and service environments.</p><TickList items={["Community co-design", "Local access audits", "Implementation pilots", "Mobile and outreach models", "Digital inclusion initiatives", "Navigation support", "Evaluation partnerships", "Commissioning models"]}/></div><div className="rounded-[2rem] border border-[#a9432d]/15 bg-[#fff8f5] p-8 sm:p-10"><Smartphone className="h-10 w-10 text-[#b84d32]"/><p className="mt-7 screenaccess-eyebrow">Programme literature</p><h2 className="font-display text-3xl font-semibold text-[#71301f]">ScreenAccess™ Programme Overview</h2><div className="mt-7 rounded-2xl border border-dashed border-[#a9432d]/30 bg-white p-6"><p className="font-bold text-[#71301f]">Programme Overview Coming Soon</p><p className="mt-3 leading-7 text-slate-600">A downloadable overview of the ScreenAccess™ model, implementation pathway and partnership opportunities is currently being developed.</p></div></div></div></section>

    <section className="screenaccess-closing"><div className="container-page relative py-20 text-center sm:py-24"><p className="screenaccess-dark-eyebrow">Equity in action</p><h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold sm:text-5xl">Let’s make screening genuinely accessible.</h2><p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/75">BloomShield works with health systems, commissioners, community organisations, employers and research partners to design practical approaches that reduce barriers and improve participation.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href={contactHref} className="screenaccess-button">Discuss a Partnership <ArrowRight size={17}/></Link><Link href={contactHref} className="screenaccess-button-outline">Contact BloomShield</Link></div></div></section>
  </>;
}

function PortfolioStep({ href, colour, title, text, current = false }: { href: string; colour: "green" | "coral" | "blue"; title: string; text: string; current?: boolean }) {
  const styles = { green: "border-emerald-700/20 bg-emerald-50 text-emerald-950", coral: "border-[#a9432d]/25 bg-[#fff0ea] text-[#71301f]", blue: "border-indigo-700/20 bg-indigo-50 text-indigo-950" };
  return <article className={`rounded-3xl border p-7 ${styles[colour]}`}><h3 className="font-display text-2xl font-semibold"><Link href={href} aria-current={current ? "page" : undefined} className="underline decoration-current/30 underline-offset-4">{title}</Link></h3><p className="mt-3 leading-7">{text}</p></article>;
}
