import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle, ArrowRight, CalendarClock, ClipboardCheck, DoorOpen, Droplet,
  ExternalLink as ExternalLinkIcon, GitFork, HandHeart, Languages, MailOpen, Microscope,
  Ribbon, RouteOff, ScanLine, ScanSearch, ShieldCheck, Spline, Syringe, TestTubeDiagonal,
  UsersRound, Waypoints, Wind, type LucideIcon,
} from "lucide-react";
import type { ExternalResource, HubTopic } from "./content";
import { healthContentGovernance } from "./content";

export function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ExternalLinkIcon aria-hidden="true" className="ml-1.5 inline h-4 w-4"/><span className="sr-only"> (external link, opens in a new tab)</span></a>;
}

export function Breadcrumbs({ current, parent }: { current: string; parent?: { label: string; href: string } }) {
  return <nav aria-label="Breadcrumb" className="container-page py-5 text-sm text-slate-600"><ol className="flex flex-wrap items-center gap-2"><li><Link href="/" className="font-semibold text-teal-700 underline-offset-4 hover:underline">Home</Link></li>{parent && <><li aria-hidden="true">/</li><li><Link href={parent.href} className="font-semibold text-teal-700 underline-offset-4 hover:underline">{parent.label}</Link></li></>}<li aria-hidden="true">/</li><li aria-current="page" className="text-slate-700">{current}</li></ol></nav>;
}

const topicIdentities: Record<string, { icon: LucideIcon; cardTone: string; iconTone: string }> = {
  "Bowel cancer screening": { icon: Spline, cardTone: "border-teal-700/15 !bg-[#f8fcfb]", iconTone: "bg-teal-50 text-teal-700" },
  "Cervical screening": { icon: Ribbon, cardTone: "border-[#76559a]/15 !bg-[#fcfaff]", iconTone: "bg-[#f3edfb] text-[#6f4d92]" },
  "Breast screening": { icon: ScanLine, cardTone: "border-[#a85d76]/15 !bg-[#fffafd]", iconTone: "bg-[#faedf2] text-[#98536b]" },
  "NHS Lung Health Checks": { icon: Wind, cardTone: "border-[#4d6f9f]/15 !bg-[#f9fbff]", iconTone: "bg-[#edf3fb] text-[#46678f]" },
  "FIT test": { icon: TestTubeDiagonal, cardTone: "border-teal-700/15 !bg-[#f8fcfb]", iconTone: "bg-teal-50 text-teal-700" },
  "HPV test": { icon: Microscope, cardTone: "border-[#76559a]/15 !bg-[#fcfaff]", iconTone: "bg-[#f3edfb] text-[#6f4d92]" },
  "Mammogram": { icon: ScanSearch, cardTone: "border-[#a85d76]/15 !bg-[#fffafd]", iconTone: "bg-[#faedf2] text-[#98536b]" },
  "PSA test": { icon: Droplet, cardTone: "border-[#3e5579]/15 !bg-[#fafbfe]", iconTone: "bg-[#edf0f6] text-[#354d70]" },
  "Cancer symptoms": { icon: ClipboardCheck, cardTone: "border-amber-700/15 !bg-[#fffcf7]", iconTone: "bg-[#fff2dc] text-[#855a18]" },
  "Reducing cancer risk": { icon: ShieldCheck, cardTone: "border-gold-500/20 !bg-[#fffdf7]", iconTone: "bg-[#f7eed4] text-teal-700" },
  "HPV vaccination": { icon: Syringe, cardTone: "border-[#76559a]/15 !bg-[#fcfaff]", iconTone: "bg-[#f3edfb] text-[#6f4d92]" },
  "Family history and inherited risk": { icon: GitFork, cardTone: "border-[#3e5579]/15 !bg-[#fafbfe]", iconTone: "bg-[#edf0f6] text-[#354d70]" },
  "Understanding your screening invitation": { icon: MailOpen, cardTone: "border-[#4d6f9f]/15 !bg-[#f9fbff]", iconTone: "bg-[#edf3fb] text-[#46678f]" },
  "Why people miss cancer screening": { icon: RouteOff, cardTone: "border-[#b9634b]/15 !bg-[#fffaf8]", iconTone: "bg-[#fbeee9] text-[#9b503c]" },
  "Screening and language barriers": { icon: Languages, cardTone: "border-[#76559a]/15 !bg-[#fcfaff]", iconTone: "bg-[#f3edfb] text-[#6f4d92]" },
  "Supporting someone to attend screening": { icon: HandHeart, cardTone: "border-emerald-700/15 !bg-[#f9fcfa]", iconTone: "bg-emerald-50 text-emerald-700" },
};

export function HubTopicCard({ topic }: { topic: HubTopic }) {
  const identity = topicIdentities[topic.title];
  const Icon = identity.icon;
  const content = <><div className="flex items-start justify-between gap-4"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${identity.iconTone}`}><Icon aria-hidden="true" size={20}/></span><span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${topic.status === "published" ? "bg-emerald-100 text-teal-800" : "border border-slate-300 bg-slate-50 text-slate-600"}`}>{topic.status === "published" ? "Read guide" : "Coming soon"}</span></div><h3 className="mt-4 font-display text-xl font-semibold text-ink">{topic.title}</h3><p className="mt-4 leading-7 text-slate-600">{topic.description}</p>{topic.href && <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-700">Explore this guide <ArrowRight aria-hidden="true" size={16}/></span>}</>;
  if (topic.href) return <Link href={topic.href} className={`group block rounded-3xl border p-6 shadow-[0_18px_50px_-38px_rgba(12,64,56,.45)] transition motion-safe:hover:-translate-y-1 hover:border-teal-700/25 hover:shadow-soft ${identity.cardTone}`}>{content}</Link>;
  return <article className={`rounded-3xl border p-6 ${identity.cardTone}`}>{content}</article>;
}

export function MedicalSafetyAlert({ title = "Important: screening and symptoms" }: { title?: string }) {
  return <aside aria-label="Important medical information" className="rounded-3xl border-2 border-amber-600/40 bg-amber-50 p-6 text-amber-950 sm:p-7"><div className="flex gap-4"><AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0 text-amber-700"/><div><h2 className="font-display text-xl font-bold">{title}</h2><p className="mt-2 leading-7"><strong>Screening is for people who do not have symptoms. Do not wait for a screening invitation or FIT screening kit if you have symptoms or concerns. Contact your GP.</strong></p></div></div></aside>;
}

const heroAccents = {
  green: "from-emerald-50 via-white to-green-50/70",
  teal: "from-teal-50 via-white to-cyan-50/60",
  pink: "from-rose-50 via-white to-pink-50/70",
  blue: "from-sky-50 via-white to-blue-50/70",
} as const;

export function ScreeningArticleHero({
  title,
  intro,
  imageSrc,
  imageAlt,
  accent,
  children,
}: {
  title: string;
  intro: string;
  imageSrc: string;
  imageAlt: string;
  accent: keyof typeof heroAccents;
  children: React.ReactNode;
}) {
  return <header className={`overflow-hidden border-y border-teal-900/10 bg-gradient-to-br ${heroAccents[accent]}`}>
    <div className="container-page grid lg:grid-cols-[minmax(0,.92fr)_minmax(28rem,1.08fr)] lg:items-stretch">
      <div className="relative z-10 py-14 lg:flex lg:min-h-[32rem] lg:flex-col lg:justify-center lg:py-20 lg:pr-12">
        <p className="eyebrow">Evidence-led screening guide</p>
        <h1 className="display max-w-4xl">{title}</h1>
        <p className="lead mt-7 max-w-3xl text-xl leading-9">{intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">{children}</div>
      </div>
      <div className="relative -mx-5 h-72 overflow-hidden sm:-mx-8 sm:h-96 lg:mx-0 lg:h-auto lg:min-h-[32rem] lg:overflow-visible">
        <Image src={imageSrc} alt={imageAlt} fill priority sizes="(max-width: 1023px) 100vw, 54vw" className="object-cover object-center"/>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-white via-white/45 to-transparent lg:block"/>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/45 to-transparent lg:hidden"/>
      </div>
    </div>
  </header>;
}

export function AtAGlance({ title, items }: { title: string; items: { label: string; value: React.ReactNode }[] }) {
  return <section aria-labelledby="at-a-glance-title" className="rounded-4xl border border-teal-800/15 bg-teal-50 p-6 shadow-soft sm:p-8"><p className="eyebrow">Quick guide</p><h2 id="at-a-glance-title" className="font-display text-3xl font-semibold text-ink">{title}</h2><dl className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-teal-900/10 bg-teal-900/10 md:grid-cols-2">{items.map(({ label, value }) => <div key={label} className="bg-white p-5 md:last:col-span-2"><dt className="text-xs font-bold uppercase tracking-[.12em] text-teal-700">{label}</dt><dd className="mt-2 leading-7 text-slate-700">{value}</dd></div>)}</dl></section>;
}

export function ContentsNav({ items }: { items: { id: string; title: string }[] }) {
  return <nav aria-label="On this page" className="rounded-3xl border border-teal-900/10 bg-white p-6 lg:sticky lg:top-36"><h2 className="font-display text-xl font-semibold">On this page</h2><ol className="mt-4 space-y-2 text-sm leading-5">{items.map((item, index) => <li key={item.id}><a href={`#${item.id}`} className="block rounded-lg px-2 py-1.5 text-slate-700 hover:bg-teal-50 hover:text-teal-800"><span className="mr-1 font-bold text-teal-700">{index + 1}.</span> {item.title}</a></li>)}</ol></nav>;
}

export function ResourceList({ resources }: { resources: ExternalResource[] }) {
  return <ul className="mt-7 grid gap-4">{resources.map(resource => <li key={resource.href} className="rounded-2xl border border-teal-900/10 bg-white p-5"><ExternalLink href={resource.href} className="font-bold text-teal-700 underline decoration-teal-700/30 underline-offset-4 hover:decoration-teal-700">{resource.title}</ExternalLink><p className="mt-2 leading-7 text-slate-600">{resource.description}</p><p className="mt-2 text-sm font-semibold text-slate-500">Source: {resource.organisation}</p></li>)}</ul>;
}

export function FaqList({ faqs }: { faqs: readonly { question: string; answer: string }[] }) {
  return <div className="mt-7 divide-y divide-teal-900/10 overflow-hidden rounded-3xl border border-teal-900/10 bg-white">{faqs.map(({ question, answer }) => <details key={question} className="group"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-ink marker:content-none hover:bg-teal-50 sm:px-6"><span>{question}</span><span aria-hidden="true" className="text-2xl font-normal text-teal-700 group-open:rotate-45">+</span></summary><div className="px-5 pb-5 leading-7 text-slate-700 sm:px-6">{answer}</div></details>)}</div>;
}

export function ReviewDate() {
  return <div className="flex flex-wrap gap-x-8 gap-y-3 rounded-2xl border border-teal-900/10 bg-mist p-5 text-sm"><p className="flex items-center gap-2 font-semibold text-slate-700"><CalendarClock aria-hidden="true" size={18} className="text-teal-700"/>Last reviewed: <time dateTime={healthContentGovernance.lastReviewedIso}>{healthContentGovernance.lastReviewed}</time></p><p className="font-semibold text-slate-700">Next review due: <time dateTime={healthContentGovernance.nextReviewIso}>{healthContentGovernance.nextReview}</time></p></div>;
}

export function EditorialInformation() {
  return <aside aria-labelledby="editorial-information-title" className="rounded-3xl border border-teal-900/15 bg-teal-900 p-7 text-white"><div className="flex items-center gap-3"><ShieldCheck aria-hidden="true" className="text-emerald-400"/><h2 id="editorial-information-title" className="font-display text-2xl font-semibold">Editorial information</h2></div><dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="font-bold text-emerald-300">Published by</dt><dd className="mt-1 text-white/80">BloomShield CIC</dd></div><div><dt className="font-bold text-emerald-300">Resource type</dt><dd className="mt-1 text-white/80">Public health education resource</dd></div><div><dt className="font-bold text-emerald-300">Last reviewed</dt><dd className="mt-1 text-white/80"><time dateTime={healthContentGovernance.lastReviewedIso}>{healthContentGovernance.lastReviewed}</time></dd></div><div><dt className="font-bold text-emerald-300">Evidence sources</dt><dd className="mt-1 text-white/80">NHS, NHS England, GOV.UK, UK NSC and Cancer Research UK</dd></div></dl><p className="mt-6 border-t border-white/15 pt-5 text-sm leading-6 text-white/75">This resource has not been presented as externally clinically reviewed. To report an error or suggest a correction, use the <Link href="/contact" className="font-bold text-emerald-300 underline underline-offset-4">BloomShield contact form</Link>.</p></aside>;
}

const programmes: {
  name: string;
  href: string;
  text: string;
  icon: LucideIcon;
  card: string;
  iconTone: string;
  linkTone: string;
}[] = [
  { name: "ScreenSmart Communities™", href: "/programmes/screensmart-communities", text: "builds understanding, confidence and informed participation through trusted community engagement.", icon: UsersRound, card: "border-emerald-700/15 !bg-[#f3fbf7]", iconTone: "bg-emerald-700 text-white", linkTone: "text-emerald-900 decoration-emerald-600/40 hover:decoration-emerald-700" },
  { name: "ScreenAccess™", href: "/programmes/screenaccess", text: "identifies and helps address practical, social and service barriers to screening access.", icon: DoorOpen, card: "border-[#c55a3d]/20 !bg-[#fff7f4]", iconTone: "bg-[#c55a3d] text-white", linkTone: "text-[#74301f] decoration-[#c55a3d]/45 hover:decoration-[#a9432d]" },
  { name: "ScreenConnect™", href: "/programmes/screenconnect", text: "supports navigation, coordination and continuity across screening and care pathways.", icon: Waypoints, card: "border-[#4051b5]/20 !bg-[#f5f7ff]", iconTone: "bg-[#4051b5] text-white", linkTone: "text-[#293474] decoration-[#5267dc]/45 hover:decoration-[#4051b5]" },
];

export function RelatedProgrammes({ portfolioStyle = false }: { portfolioStyle?: boolean }) {
  return <div className="mt-8 grid gap-4 md:grid-cols-3">{programmes.map(programme => {
    const Icon = programme.icon;
    return <article key={programme.name} className={`rounded-3xl border p-6 ${portfolioStyle ? `portfolio-programme-card ${programme.card} shadow-[0_22px_55px_-38px_rgba(12,64,56,.38)]` : "border-teal-900/10 bg-white"}`}>
      {portfolioStyle && <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${programme.iconTone}`}><Icon aria-hidden="true" size={24}/></span>}
      <h3 className={`font-display text-xl font-semibold ${portfolioStyle ? "mt-6" : ""}`}><Link href={programme.href} className={`underline underline-offset-4 ${portfolioStyle ? programme.linkTone : "text-teal-800 decoration-teal-800/25 hover:decoration-teal-800"}`}>{programme.name}</Link></h3>
      <p className={`mt-3 leading-7 ${portfolioStyle ? "text-slate-700" : "text-slate-600"}`}>{programme.text}</p>
    </article>;
  })}</div>;
}
