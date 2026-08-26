import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CircleDotDashed, FlaskConical, Landmark, LibraryBig, Waypoints } from "lucide-react";
import { InsightsShell } from "@/components/insights-shell";
import { createMetadata } from "@/lib/seo";
import { conversationsSeries, getInsightAuthors, insightAreas, insights, partnershipPlaybook } from "@/lib/insights";

const description = "Ideas, evidence and conversations advancing equitable cancer care. Explore BloomShield Insights on policy, implementation, innovation and partnership.";
export const metadata: Metadata = createMetadata({ title: "BloomShield Insights", description, path: "/insights" });

const areaPresentation = [
  { Icon: LibraryBig, plate: "bg-[#e7f3ef] text-[#0a6657]", accent: "group-hover:border-[#2da878]/45" },
  { Icon: Landmark, plate: "bg-[#f4e8cf] text-[#75551b]", accent: "group-hover:border-[#b9892f]/45" },
  { Icon: Waypoints, plate: "bg-[#e8edf8] text-[#334c91]", accent: "group-hover:border-[#536db3]/45" },
  { Icon: FlaskConical, plate: "bg-[#f0e9f6] text-[#67428c]", accent: "group-hover:border-[#7b4caf]/45" },
] as const;

export default function InsightsPage() {
  const hpvArticle = insights.find(item => item.slug === "hpv-self-testing-screening-gap")!;
  const hpvAuthors = getInsightAuthors(hpvArticle);
  return <InsightsShell>
    <section className="bg-[#021827]" aria-label="BloomShield Insights overview masthead">
      <Image src="/images/insights/overview-hero-banner.png" alt="BloomShield Insights institutional publishing masthead: Ideas, evidence and conversations advancing equitable cancer care, with the themes Ideas, Evidence, Policy, Implementation and Impact." width={1672} height={941} sizes="100vw" className="mx-auto block h-auto w-full max-w-[1672px] object-contain object-center" priority />
    </section>

    <section className="border-b border-teal-900/10 bg-white py-8" aria-label="Insights areas">
      <div className="container-page grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {insightAreas.map((area, index) => {
          const { Icon, plate, accent } = areaPresentation[index];
          return <a href={`#${index === 0 ? "series" : area.name.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}`} key={area.name} className={`group flex min-h-28 items-center gap-4 rounded-2xl border border-teal-900/10 bg-white p-4 shadow-[0_18px_45px_-34px_rgba(12,64,56,.5)] transition hover:-translate-y-1 hover:shadow-[0_22px_52px_-32px_rgba(12,64,56,.52)] ${accent}`}>
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${plate}`}><Icon aria-hidden="true" size={23}/></span>
            <span className="min-w-0"><span className="text-[.65rem] font-extrabold uppercase tracking-[.16em] text-slate-500">Explore 0{index + 1}</span><span className="mt-1 block font-display text-lg font-semibold leading-tight text-ink group-hover:text-teal-700">{area.name}</span></span>
            <ArrowUpRight aria-hidden="true" className="ml-auto shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-700" size={19}/>
          </a>;
        })}
      </div>
    </section>

    <section id="series" className="section-space scroll-mt-32">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div><p className="eyebrow">Series &amp; Collections</p><h2 className="heading">Questions that need more than one article.</h2></div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">Our collections connect evidence and lived experience over time—building practical understanding across people, partnerships, systems, innovation, equity and impact.</p>
        </div>

        <article className="mt-12 overflow-hidden rounded-[2.5rem] bg-[#082f36] text-white shadow-soft">
          <div className="w-full border-b border-white/10 bg-[#052b31]">
            <div className="relative mx-auto aspect-square w-full max-w-[54rem]">
              <Image src={conversationsSeries.overviewImage} alt={conversationsSeries.imageAlt} fill sizes="(min-width: 1024px) 864px, 100vw" className="object-contain object-center" priority />
            </div>
          </div>
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-[.22em] text-[#e7bd68]">Featured series</span>
              <h3 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl">{conversationsSeries.title}</h3>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{conversationsSeries.description}</p>
            </div>
            <Link href={conversationsSeries.href} className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-white px-6 py-3 font-bold text-teal-900 transition hover:bg-emerald-50">Explore the series <ArrowRight aria-hidden="true" size={19}/></Link>
          </div>
        </article>

        <article className="mt-8 grid gap-8 rounded-[2rem] border border-teal-900/10 bg-white p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.18em] text-teal-700">Foundational archive</span>
            <h3 className="mt-4 font-display text-3xl font-semibold">{partnershipPlaybook.title}</h3>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{partnershipPlaybook.description}</p>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-teal-50 px-5 py-3 text-sm font-bold text-teal-800"><BookOpen aria-hidden="true" size={20}/> 9 article slots prepared</div>
        </article>
      </div>
    </section>

    <section id="evidence-policy" className="section-space scroll-mt-32 bg-white">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Evidence &amp; Policy</p>
            <h2 className="heading">Policy is only the beginning.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">We examine whether policy reaches the people it is intended to serve—and what implementation requires next.</p>
          </div>
          <article className="overflow-hidden rounded-[2rem] border border-teal-900/10 bg-[#f7f5ef]">
            <Link href={hpvArticle.href!} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden"><Image src={hpvArticle.image!} alt={hpvArticle.imageAlt!} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.015]" /></div>
              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[.14em] text-teal-700"><span>{hpvArticle.area}</span><span aria-hidden="true">·</span><time dateTime={hpvArticle.publishedAtIso}>{hpvArticle.publishedAt}</time></div>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-.025em] group-hover:text-teal-700">{hpvArticle.title}</h3>
                <p className="mt-5 text-lg leading-8 text-slate-600">{hpvArticle.description}</p>
                <p className="mt-5 text-sm font-semibold text-slate-600">By {hpvAuthors.map(author => author.name).join(" & ")}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-bold text-teal-700">Read the Insight <ArrowRight aria-hidden="true" size={19}/></span>
              </div>
            </Link>
          </article>
        </div>
      </div>
    </section>

    <section id="implementation-equity" className="section-space border-t border-teal-900/10">
      <div className="container-page grid gap-8 lg:grid-cols-2">
        {[{ id: "implementation-equity", title: "Implementation & Equity", copy: "How access, trust, delivery design and follow-up determine whether an intervention narrows—or reproduces—inequality." }, { id: "innovation-in-practice", title: "Innovation in Practice", copy: "A grounded view of promising tools and models: the systems they enter, the people who deliver them and the evidence needed to scale." }].map(item => <article id={item.id} className="scroll-mt-32 rounded-[2rem] border border-teal-900/10 bg-white p-8 sm:p-10" key={item.title}>
          <CircleDotDashed className="text-[#9b7125]" aria-hidden="true" />
          <h2 className="mt-7 font-display text-3xl font-semibold">{item.title}</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">{item.copy}</p>
          <p className="mt-8 text-sm font-bold uppercase tracking-[.16em] text-teal-700">The collection will grow here</p>
        </article>)}
      </div>
    </section>
  </InsightsShell>;
}
