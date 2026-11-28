import Image from "next/image";
import Link from "next/link";
import { BookOpen, CheckCircle2, GraduationCap, HeartHandshake, Megaphone, Network, Route, Users } from "lucide-react";
import { ScreenSmartKentFunding } from "@/components/screensmart-kent-funding";
import { PageStructuredData } from "@/components/seo-json-ld";
import { kentPartnershipHref, kentProjectUpdates } from "@/lib/screensmart-kent";
import { createMetadata } from "@/lib/seo";

const path = "/programmes/screensmart-communities/kent";
const description = "A 12-month National Lottery-funded community cancer-awareness and NHS screening signposting programme across Kent and Medway. Explore partnership opportunities, planned delivery and project updates.";

export const metadata = createMetadata({
  title: "ScreenSmart Communities™ Kent",
  description,
  path,
  socialImage: { url: "/images/programmes/screensmart-kent-hero.png", width: 1774, height: 887, alt: "BloomShield ScreenSmart Communities™ Kent, funded by The National Lottery Community Fund." },
});

const delivery = [
  { icon: Megaphone, title: "Community cancer-awareness sessions", text: "Accessible conversations about cancer awareness, recognising changes and where to find trusted information.", accent: "bg-teal-100 text-teal-800", border: "border-t-teal-600" },
  { icon: GraduationCap, title: "Free Level 1 Community Champion training", text: "Equip local Champions to share approved information and support informed community conversations.", accent: "bg-amber-100 text-amber-900", border: "border-t-gold-400" },
  { icon: Route, title: "NHS screening information and signposting", text: "Help people understand NHS screening invitations and find information about eligibility and participation.", accent: "bg-sky-100 text-sky-900", border: "border-t-sky-700" },
  { icon: BookOpen, title: "Community partnerships and educational resources", text: "Work with trusted organisations and provide accessible materials for ongoing community messaging.", accent: "bg-violet-100 text-violet-900", border: "border-t-violet-700" },
];

const targets = [
  { value: "5", label: "community delivery partners", icon: HeartHandshake, accent: "bg-teal-100 text-teal-800", number: "text-teal-800" },
  { value: "10", label: "trained Community Champions", icon: GraduationCap, accent: "bg-amber-100 text-amber-900", number: "text-gold-500" },
  { value: "12", label: "community engagement activities", icon: Users, accent: "bg-sky-100 text-sky-900", number: "text-sky-900" },
];

const benefits = [
  "Free community cancer-awareness presentations",
  "Two free Level 1 Community Champion training places per selected partner",
  "Access to trusted NHS screening information and educational materials",
  "Ongoing support with approved community messaging and signposting",
  "Opportunities to contribute to a wider community-health partnership network",
];

const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function ScreenSmartKent() {
  return <>
    <PageStructuredData name="ScreenSmart Communities™ Kent" description={description} path={path} breadcrumb="Kent" breadcrumbParents={[{ name: "Programmes", path: "/programmes" }, { name: "ScreenSmart Communities™", path: "/programmes/screensmart-communities" }]} />
    <section className="bg-mist py-8 sm:py-12">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm leading-7 text-teal-800">
          <ol className="flex flex-wrap gap-x-3"><li><Link href="/programmes" className="underline underline-offset-4">Programmes</Link></li><li aria-hidden="true">/</li><li><Link href="/programmes/screensmart-communities" className="underline underline-offset-4">ScreenSmart Communities™</Link></li><li aria-hidden="true">/</li><li aria-current="page">Kent</li></ol>
        </nav>
        <h1 className="sr-only">ScreenSmart Communities™ Kent</h1>
        <Link href={kentPartnershipHref} aria-label="Partner With Us: enquire about ScreenSmart Communities Kent through our contact form" className="block rounded-2xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
          <Image src="/images/programmes/screensmart-kent-hero.png" alt="BloomShield and ScreenSmart Communities™ Kent shield identities. Community members talking with a healthcare professional. Funded by The National Lottery Community Fund. Partner With Us." width={1774} height={887} sizes="(min-width: 1280px) 1144px, 100vw" priority className="h-auto w-full rounded-2xl" />
        </Link>
      </div>
    </section>

    <section aria-labelledby="kent-funding-title" className="border-b border-teal-900/10 py-8 sm:py-10">
      <div className="container-page max-w-4xl"><h2 id="kent-funding-title" className="px-6 font-display text-2xl font-semibold">Funding acknowledgement</h2><ScreenSmartKentFunding programmeSummary /></div>
    </section>

    <section className="section-space" aria-labelledby="kent-about-title"><div className="container-page grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
      <div><p className="eyebrow">Trusted voices, local action</p><h2 id="kent-about-title" className="heading">About the programme</h2></div>
      <div className="space-y-5 text-lg leading-8 text-slate-700">
        <p>Cancer-screening participation is shaped by more than an invitation. Language, confidence, health literacy and practical access barriers can leave some communities less able to understand or take up NHS screening offers.</p>
        <p>Across Kent and Medway, ScreenSmart Communities™ will work with trusted faith-based and non-faith community organisations to bring clear, accessible cancer-awareness conversations closer to everyday community life.</p>
        <p>Community awareness and NHS screening signposting can help people understand their options, find reliable information and make informed decisions about participation.</p>
        <p className="rounded-2xl border-l-4 border-teal-600 bg-teal-50 p-6 text-base leading-7"><strong>Education and signposting:</strong> BloomShield does not provide clinical screening, medical diagnosis or individual medical advice through this programme. Screening eligibility, clinical advice, diagnosis and treatment remain with NHS services and appropriately qualified healthcare professionals.</p>
      </div>
    </div></section>

    <section className="section-space bg-mist" aria-labelledby="kent-delivery-title"><div className="container-page">
      <p className="eyebrow">Our planned activities</p><h2 id="kent-delivery-title" className="heading">What we will deliver</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">{delivery.map(({ icon: Icon, title, text, accent, border }) => <article key={title} className={`screensmart-card border-t-4 ${border} hover:shadow-soft`}>
        <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${accent}`}><Icon aria-hidden="true" className="!text-inherit" strokeWidth={1.7} /></span>
        <h3>{title}</h3><p>{text}</p>
      </article>)}</div>
    </div></section>

    <section className="section-space" aria-labelledby="kent-targets-title"><div className="container-page">
      <p className="eyebrow">A shared ambition</p><h2 id="kent-targets-title" className="heading">Programme delivery targets</h2>
      <p id="kent-targets-note" className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">These are planned targets for the 12-month programme, not completed achievements.</p>
      <ul aria-describedby="kent-targets-note" className="mt-10 grid gap-6 md:grid-cols-3">{targets.map(({ value, label, icon: Icon, accent, number }) => <li key={label} className="screensmart-card">
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}><Icon aria-hidden="true" className="!h-7 !w-7 !text-inherit" strokeWidth={1.7} /></span>
        <p className={`!mt-6 font-display !text-6xl font-semibold ${number} !leading-none`}><span className={number}>{value}</span></p>
        <h3 className="!mt-4 !text-lg">{label}</h3>
      </li>)}</ul>
    </div></section>

    <section className="section-space bg-teal-50" aria-labelledby="kent-partner-title"><div className="container-page grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
      <div><span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-800 text-white"><Network aria-hidden="true" size={28} /></span><h2 id="kent-partner-title" className="heading">Become a ScreenSmart Community Partner</h2>
        <p className="mt-6 text-lg leading-8 text-slate-700">Eligible faith-based and non-faith community organisations across Kent and Medway are invited to express interest in collaborating.</p>
        <p className="mt-4 leading-7 text-slate-700">Places are subject to eligibility and partner selection. An expression of interest does not guarantee selection or a delivery place.</p>
      </div>
      <div className="rounded-3xl border border-teal-900/10 bg-white p-6 shadow-soft sm:p-8"><h3 className="font-display text-2xl font-semibold">Support for selected partners</h3><ul className="mt-6 space-y-5">{benefits.map(benefit => <li key={benefit} className="flex gap-3 leading-7 text-slate-700"><CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-teal-600" /><span>{benefit}</span></li>)}</ul></div>
    </div></section>

    <section className="section-space" aria-labelledby="kent-updates-title"><div className="container-page max-w-4xl">
      <p className="eyebrow">Follow the programme</p><h2 id="kent-updates-title" className="heading">Project milestones and updates</h2>
      <p className="mt-5 text-lg leading-8 text-slate-700">Confirmed milestones and the next planned stage. We will add dated updates on partner recruitment, Champion training, community activities, mid-project learning and final evaluation as the programme progresses.</p>
      <ol className="mt-10 space-y-8">{kentProjectUpdates.map(update => <li key={update.id} className={`relative border-l-2 pl-7 sm:pl-10 ${update.status === "confirmed" ? "border-teal-600" : "border-dashed border-gold-500"}`}>
        <span aria-hidden="true" className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white ${update.status === "confirmed" ? "bg-teal-600" : "bg-gold-500"}`} />
        <div className="flex flex-wrap items-center gap-3"><span className={`rounded-full px-3 py-1 text-sm font-bold ${update.status === "confirmed" ? "bg-teal-100 text-teal-900" : "bg-amber-100 text-amber-900"}`}>{update.status === "confirmed" ? "Confirmed" : "Planned · upcoming"}</span>{update.date && <time dateTime={update.date} className="text-base font-semibold text-slate-700">{dateFormatter.format(new Date(`${update.date}T12:00:00Z`))}</time>}</div>
        <h3 className="mt-4 font-display text-2xl font-semibold">{update.title}</h3><p className="mt-3 leading-7 text-slate-700">{update.description}</p>
      </li>)}</ol>
    </div></section>

    <section className="screensmart-closing" aria-labelledby="kent-enquiry-title"><div className="container-page relative py-16 sm:py-20">
      <div className="max-w-3xl"><h2 id="kent-enquiry-title" className="font-display text-3xl font-semibold sm:text-4xl">Start a partnership conversation</h2><p className="mt-5 text-lg leading-8 text-white/90">Tell us about your organisation, the communities you work with and how you would like to get involved in Kent and Medway.</p><Link href={kentPartnershipHref} className="screensmart-button mt-8">Express Partnership Interest</Link></div>
    </div></section>
  </>;
}
