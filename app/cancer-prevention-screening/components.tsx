import Link from "next/link";
import { AlertTriangle, ArrowRight, CalendarClock, ExternalLink as ExternalLinkIcon, ShieldCheck } from "lucide-react";
import type { ExternalResource, HubTopic } from "./content";
import { healthContentGovernance } from "./content";

export function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ExternalLinkIcon aria-hidden="true" className="ml-1.5 inline h-4 w-4"/><span className="sr-only"> (external link, opens in a new tab)</span></a>;
}

export function Breadcrumbs({ current, parent }: { current: string; parent?: { label: string; href: string } }) {
  return <nav aria-label="Breadcrumb" className="container-page py-5 text-sm text-slate-600"><ol className="flex flex-wrap items-center gap-2"><li><Link href="/" className="font-semibold text-teal-700 underline-offset-4 hover:underline">Home</Link></li>{parent && <><li aria-hidden="true">/</li><li><Link href={parent.href} className="font-semibold text-teal-700 underline-offset-4 hover:underline">{parent.label}</Link></li></>}<li aria-hidden="true">/</li><li aria-current="page" className="text-slate-700">{current}</li></ol></nav>;
}

export function HubTopicCard({ topic }: { topic: HubTopic }) {
  const content = <><div className="flex items-start justify-between gap-4"><h3 className="font-display text-xl font-semibold text-ink">{topic.title}</h3><span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${topic.status === "published" ? "bg-emerald-100 text-teal-800" : "border border-slate-300 bg-slate-50 text-slate-600"}`}>{topic.status === "published" ? "Read guide" : "Coming soon"}</span></div><p className="mt-4 leading-7 text-slate-600">{topic.description}</p>{topic.href && <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-700">Explore this guide <ArrowRight aria-hidden="true" size={16}/></span>}</>;
  if (topic.href) return <Link href={topic.href} className="group block rounded-3xl border border-teal-900/10 bg-white p-6 shadow-[0_18px_50px_-38px_rgba(12,64,56,.45)] transition motion-safe:hover:-translate-y-1 hover:border-teal-700/25 hover:shadow-soft">{content}</Link>;
  return <article className="rounded-3xl border border-slate-200 bg-white/75 p-6">{content}</article>;
}

export function MedicalSafetyAlert({ title = "Important: screening and symptoms" }: { title?: string }) {
  return <aside aria-label="Important medical information" className="rounded-3xl border-2 border-amber-600/40 bg-amber-50 p-6 text-amber-950 sm:p-7"><div className="flex gap-4"><AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0 text-amber-700"/><div><h2 className="font-display text-xl font-bold">{title}</h2><p className="mt-2 leading-7"><strong>Screening is for people who do not have symptoms. Do not wait for a screening invitation or FIT screening kit if you have symptoms or concerns. Contact your GP.</strong></p></div></div></aside>;
}

export function AtAGlance({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return <section aria-labelledby="at-a-glance-title" className="rounded-4xl border border-teal-800/15 bg-teal-50 p-6 shadow-soft sm:p-8"><p className="eyebrow">Quick guide</p><h2 id="at-a-glance-title" className="font-display text-3xl font-semibold text-ink">Bowel screening at a glance</h2><dl className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-teal-900/10 bg-teal-900/10 md:grid-cols-2">{items.map(({ label, value }) => <div key={label} className="bg-white p-5 md:last:col-span-2"><dt className="text-xs font-bold uppercase tracking-[.12em] text-teal-700">{label}</dt><dd className="mt-2 leading-7 text-slate-700">{value}</dd></div>)}</dl></section>;
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

const programmes = [
  { name: "ScreenSmart Communities™", href: "/programmes/screensmart-communities", text: "builds understanding, confidence and informed participation through trusted community engagement." },
  { name: "ScreenAccess™", href: "/programmes/screenaccess", text: "identifies and helps address practical, social and service barriers to screening access." },
  { name: "ScreenConnect™", href: "/programmes/screenconnect", text: "supports navigation, coordination and continuity across screening and care pathways." },
];

export function RelatedProgrammes() {
  return <div className="mt-8 grid gap-4 md:grid-cols-3">{programmes.map(programme => <article key={programme.name} className="rounded-3xl border border-teal-900/10 bg-white p-6"><h3 className="font-display text-xl font-semibold"><Link href={programme.href} className="text-teal-800 underline decoration-teal-800/25 underline-offset-4 hover:decoration-teal-800">{programme.name}</Link></h3><p className="mt-3 leading-7 text-slate-600">{programme.text}</p></article>)}</div>;
}
