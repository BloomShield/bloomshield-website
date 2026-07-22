import { BarChart3, Compass, Eye, Handshake, Heart, Lightbulb, Route, Scale, ShieldCheck, Sparkles, Users } from "lucide-react";
import { AboutHero } from "@/components/about-hero";
import { CTA } from "@/components/cta";
import { SectionHeading } from "@/components/section-heading";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";

const description = "Learn about BloomShield CIC's mission, values and Cancer Care Partnership Ecosystem framework for equitable cancer prevention.";
export const metadata = createMetadata({ title: "About BloomShield", description, path: "/about" });

const values = [
  [Heart, "Care", "We treat trust, dignity and compassion as essential conditions for better health."],
  [Scale, "Equity", "We focus on avoidable differences in access, experience and outcomes."],
  [Users, "Partnership", "We share power, knowledge and credit with the people who make change possible."],
  [Sparkles, "Curiosity", "We ask better questions, test ideas responsibly and learn in the open."]
];

const ccpe = [
  { icon: Users, number: "01", title: "Community Insight & Co-design", text: "Begin with lived experience, local assets and shared decision-making.", surface: "from-emerald-50 to-teal-50", accent: "bg-emerald-600 text-white" },
  { icon: ShieldCheck, number: "02", title: "Prevention & Earlier Detection", text: "Turn knowledge and informed choice into practical prevention action.", surface: "from-teal-50 to-cyan-50", accent: "bg-teal-700 text-white" },
  { icon: Route, number: "03", title: "Connected Care Pathways", text: "Create clearer, more navigable routes between communities and care.", surface: "from-blue-50 to-indigo-50", accent: "bg-blue-700 text-white" },
  { icon: Handshake, number: "04", title: "Partnership & Implementation", text: "Align people, roles and resources for delivery in real-world settings.", surface: "from-amber-50 to-orange-50", accent: "bg-[#b85a32] text-white" },
  { icon: BarChart3, number: "05", title: "Evidence, Learning & Sustainability", text: "Measure what matters, adapt with purpose and plan for lasting value.", surface: "from-purple-50 to-indigo-50", accent: "bg-purple-700 text-white" },
  { icon: Lightbulb, number: "06", title: "Equity by Design", text: "Examine who benefits, who is missing and what must change at every stage.", surface: "from-yellow-50 to-amber-50", accent: "bg-[#8a641d] text-white" }
];

export default function About() {
  return <>
    <PageStructuredData name="About BloomShield CIC" description={description} path="/about" breadcrumb="About" />
    <AboutHero />

    <section className="section-space max-sm:pt-10"><div className="container-page grid gap-8 md:grid-cols-2"><div className="rounded-4xl bg-gradient-to-br from-teal-800 to-teal-900 p-10 text-white shadow-soft"><Compass className="h-10 w-10 text-emerald-300"/><p className="mt-8 text-sm font-bold uppercase tracking-widest text-emerald-300">Our mission</p><h2 className="mt-4 font-display text-3xl font-semibold">Protect lives. Prevent cancer. Empower communities.</h2><p className="mt-5 leading-7 text-white/75">We work to make cancer prevention, awareness and screening more understandable, accessible and responsive to diverse communities.</p></div><div className="rounded-4xl bg-gradient-to-br from-white to-teal-50 p-10 shadow-soft"><Eye className="h-10 w-10 text-teal-600"/><p className="mt-8 text-sm font-bold uppercase tracking-widest text-teal-600">Our vision</p><h2 className="mt-4 font-display text-3xl font-semibold">A future where everyone has a fair opportunity to prevent cancer or find it earlier.</h2><p className="mt-5 leading-7 text-slate-600">A future shaped with communities, supported by capable systems and strengthened by responsible innovation.</p></div></div></section>

    <section className="section-space bg-mist"><div className="container-page"><SectionHeading eyebrow="Our values" title="How we show up matters."/><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{values.map(([I,t,d])=>{const Icon=I as typeof Heart;return <div className="card" key={t as string}><Icon className="text-teal-600"/><h3 className="mt-6 text-xl font-bold">{t as string}</h3><p className="mt-3 leading-7 text-slate-600">{d as string}</p></div>})}</div></div></section>

    <section className="section-space bg-gradient-to-b from-white to-teal-50"><div className="container-page"><SectionHeading eyebrow="Our intellectual framework" title="Cancer Care Partnership Ecosystem (CCPE)" intro="BloomShield's implementation framework connects communities, prevention, care pathways, partnerships and evidence as one practical ecosystem."/><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{ccpe.map(({icon:Icon,number,title,text,surface,accent})=><article key={title} className={`group relative overflow-hidden rounded-4xl border border-white bg-gradient-to-br ${surface} p-8 shadow-[0_24px_60px_-36px_rgba(12,64,56,.35)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-34px_rgba(12,64,56,.42)]`}><div className="flex items-center justify-between"><span className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-md ${accent}`}><Icon className="h-7 w-7"/></span><span className="font-display text-sm font-bold text-slate-500">{number}</span></div><h3 className="mt-7 text-xl font-bold text-ink">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div><div className="mt-8 rounded-3xl bg-teal-900 px-7 py-6 text-white shadow-soft"><p className="max-w-4xl leading-7 text-white/80"><strong className="text-white">CCPE is BloomShield’s intellectual framework:</strong> a structured way to design scalable programmes that stay responsive to community context, connected to care and accountable to evidence.</p></div></div></section>

    <section className="section-space bg-teal-50"><div className="container-page grid gap-12 md:grid-cols-2"><SectionHeading eyebrow="Leadership" title="Purpose-led, evidence-informed leadership." intro="BloomShield is being built by people committed to public benefit, inclusive practice and accountable innovation. Formal leadership profiles will be published following governance approval."/><div><h3 className="text-xl font-bold">A UK Community Interest Company with international ambition</h3><p className="mt-4 leading-7 text-slate-600">Our CIC structure locks community benefit into our purpose. We work with advisers, delivery partners and communities to bring the right expertise to each programme and collaboration.</p><dl className="mt-7 border-t border-teal-900/10 pt-6"><div className="flex justify-between gap-6"><dt className="text-slate-600">Company number</dt><dd className="font-bold">17341879</dd></div><div className="mt-3 flex justify-between gap-6"><dt className="text-slate-600">Registration</dt><dd className="font-bold">England & Wales</dd></div></dl></div></div></section>
    <CTA/>
  </>;
}
