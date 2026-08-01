import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CircleAlert } from "lucide-react";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs, ExternalLink, HubTopicCard, RelatedProgrammes, ReviewDate } from "./components";
import { healthContentGovernance, hubGroups, officialLinks } from "./content";

const title = "Cancer Prevention and Screening Hub | BloomShield CIC";
const description = "Clear, evidence-led information about cancer prevention, NHS screening programmes, common screening tests and barriers to participation.";
const pageName = "Cancer Prevention & Screening Information Library";
const breadcrumbName = "Screening Information Library";

export const metadata = createMetadata({ title, description, path: "/cancer-prevention-screening", absoluteTitle: true });

export default function CancerPreventionScreeningHubPage() {
  return <>
    <PageStructuredData name={pageName} description={description} path="/cancer-prevention-screening" breadcrumb={breadcrumbName} kind="knowledgeHub"/>
    <Breadcrumbs current={breadcrumbName}/>

    <header className="border-y border-teal-900/10 bg-gradient-to-br from-teal-50 via-white to-amber-50/60">
      <div className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,.95fr)_minmax(27rem,1.05fr)] lg:gap-14 lg:py-20">
        <div>
          <p className="eyebrow">Public health knowledge library</p>
          <h1 className="font-display text-[clamp(2.65rem,5.25vw,4.75rem)] font-semibold leading-[1.02] tracking-[-.045em] text-ink">{pageName}</h1>
          <div className="mt-7 max-w-2xl space-y-4 text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
            <p>Clear, evidence-led information about cancer prevention, NHS screening programmes and common screening tests.</p>
            <p>BloomShield helps people understand screening, recognise barriers to participation and find trusted official health information.</p>
          </div>
          <ExternalLink href={officialLinks.nhsScreening} className="button-primary mt-8 w-full sm:w-auto">Visit official NHS screening information</ExternalLink>
        </div>
        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-3 rounded-[2.5rem] border border-teal-700/10 bg-white/60 shadow-[0_24px_64px_-42px_rgba(12,64,56,.38)] sm:-inset-4"/>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.25rem] border border-white/80 bg-white shadow-[0_26px_68px_-40px_rgba(12,64,56,.44)] sm:aspect-[3/2] lg:aspect-[4/3]">
            <Image
              src="/images/cancer-screening-conversation-hero.webp"
              alt="Two adults having a friendly conversation in a warm home setting"
              fill
              priority
              sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1279px) 46vw, 600px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </header>

    <section className="container-page py-12 sm:py-16" aria-labelledby="important-information-title">
      <div className="rounded-4xl border-2 border-amber-600/40 bg-amber-50 p-7 sm:p-9">
        <div className="flex gap-4"><CircleAlert aria-hidden="true" className="mt-1 shrink-0 text-amber-700"/><div><h2 id="important-information-title" className="font-display text-2xl font-semibold text-amber-950">Screening information is not a diagnosis</h2><ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-amber-950"><li>Screening is generally intended for people who do not have symptoms.</li><li>Do not wait for a screening invitation if you have symptoms or concerns. Contact your GP.</li><li>BloomShield provides public health education. This hub does not diagnose medical conditions or replace advice from a qualified healthcare professional.</li><li>For urgent advice in England, use <ExternalLink href={officialLinks.nhs111} className="font-bold underline underline-offset-4">NHS 111 online</ExternalLink>. Call 999 for a life-threatening emergency.</li></ul></div></div>
      </div>
    </section>

    <div className="bg-mist">
      {hubGroups.map((group, groupIndex) => <section key={group.title} className={`container-page py-16 sm:py-20 ${groupIndex > 0 ? "border-t border-teal-900/10" : ""}`} aria-labelledby={`hub-group-${groupIndex}`}><div className="max-w-3xl"><p className="eyebrow">{String(groupIndex + 1).padStart(2, "0")}</p><h2 id={`hub-group-${groupIndex}`} className="heading">{group.title}</h2><p className="lead mt-4">{group.intro}</p></div><div className="mt-9 grid gap-5 md:grid-cols-2">{group.topics.map(topic => <HubTopicCard key={topic.title} topic={topic}/>)}</div></section>)}
    </div>

    <section className="pb-20 pt-24 md:pb-28 md:pt-32" aria-labelledby="how-bloomshield-helps">
      <div className="container-page">
        <p className="eyebrow">From information to participation</p>
        <h2 id="how-bloomshield-helps" className="heading">How BloomShield helps</h2>
        <p className="lead mt-5 max-w-3xl">BloomShield connects accessible public health information with community engagement, practical access support and connected care pathways.</p>
        <RelatedProgrammes portfolioStyle/>
        <div className="mt-10"><Link href="/contact" className="button-primary">Work with BloomShield to improve screening access <ArrowRight aria-hidden="true" size={17}/></Link></div>
      </div>
    </section>

    <section className="border-t border-teal-900/10 bg-white py-10"><div className="container-page"><ReviewDate/><p className="mt-4 text-sm text-slate-500">Content status: {healthContentGovernance.status.replaceAll("-", " ")}. Official guidance can change between BloomShield reviews.</p></div></section>
  </>;
}
