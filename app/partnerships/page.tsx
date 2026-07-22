import {
  Building2,
  Globe2,
  GraduationCap,
  HandHeart,
  Hospital,
  Lightbulb,
  Network,
} from "lucide-react";
import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";

const description = "Partner with BloomShield across communities, health systems, universities, innovators, charities and international collaborations.";
export const metadata = createMetadata({ title: "Partnerships", description, path: "/partnerships" });

const ecosystem = [
  [HandHeart, "Communities", "Bring lived experience, trusted relationships and local knowledge into every stage of the work.", "bg-rose-600"],
  [Hospital, "NHS organisations", "Connect engagement with prevention pathways, service improvement and equitable implementation.", "bg-sky-700"],
  [GraduationCap, "Universities", "Develop applied research, evaluation and knowledge exchange around real-world priorities.", "bg-violet-600"],
  [Lightbulb, "Innovators", "Shape responsible solutions around user need, workflow, evidence and public benefit.", "bg-amber-700"],
  [Building2, "Charities", "Combine mission, reach and specialist expertise to strengthen prevention and support.", "bg-emerald-700"],
  [Globe2, "International partners", "Exchange learning across contexts while respecting local systems, knowledge and leadership.", "bg-cyan-700"],
];

export default function Partnerships() {
  return (
    <>
      <PageStructuredData name="Partnerships" description={description} path="/partnerships" breadcrumb="Partnerships" />
      <PageHero
        visual="partnerships"
        eyebrow="Partnerships"
        title="Connect the ecosystem. Strengthen the pathway."
        intro="Cancer prevention crosses organisational and geographic boundaries. BloomShield connects communities, care systems, research and innovation around shared outcomes and practical implementation."
        cta="Explore a partnership"
      />

      <section className="section-space">
        <div className="container-page">
          <SectionHeading
            eyebrow="Who we work with"
            title="Different capabilities. Connected around communities."
            intro="Our role is to make the connections useful: aligning insight, evidence, delivery capability and decision-making so that collaboration leads to action."
          />
          <div className="relative mt-14">
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 hidden h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-teal-300 lg:block" />
            <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ecosystem.map(([Icon, title, description, theme]) => (
                <article className="group rounded-[2rem] border border-teal-900/10 bg-white p-8 shadow-[0_16px_45px_-34px_rgba(6,78,75,.5)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_-32px_rgba(6,78,75,.55)]" key={title as string}>
                  <span className={`flex h-16 w-16 items-center justify-center rounded-[1.35rem] text-white shadow-lg shadow-slate-900/15 transition group-hover:scale-105 ${theme}`}>
                    <Icon size={31} strokeWidth={2.1} />
                  </span>
                  <h2 className="mt-8 text-[1.35rem] font-bold tracking-tight">{title as string}</h2>
                  <p className="mt-3.5 leading-7 text-slate-600">{description as string}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space overflow-hidden bg-[#071f34] text-white">
        <div className="container-page grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-300 text-[#071f34]"><Network size={28} /></span>
            <p className="mt-7 text-xs font-bold uppercase tracking-[.18em] text-emerald-300">Ecosystem thinking</p>
            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">The value is in the connections.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">BloomShield helps partners see the whole pathway: how community experience, service design, research evidence and implementation conditions interact.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Shared purpose before structure", "Communities as implementation partners", "Clear roles and decision rights", "Evidence that supports adaptation", "Learning across organisational boundaries", "Sustainability considered from the start"].map((item, index) => (
              <div className="rounded-2xl border border-white/10 bg-white/[.06] p-5 font-semibold" key={item}>
                <span className="mr-3 text-emerald-300">0{index + 1}</span>{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-mist">
        <div className="container-page grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Our partnership standard"
            title="Built on clarity, reciprocity and trust."
            intro="We want every collaboration to be valuable for communities, workable for partners and transparent about how decisions are made."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {["A shared definition of public benefit", "Meaningful community involvement", "Transparent roles and decision rights", "Proportionate governance and safeguarding", "Fair recognition of contributions", "Learning that can inform future practice"].map((item, index) => (
              <div className="rounded-2xl border border-teal-900/10 bg-white p-5 font-semibold" key={item}>
                <span className="mr-3 text-gold-500">0{index + 1}</span>{item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA title="What could we build together?" text="Tell us about the community, pathway or prevention challenge you are working on. We will explore where BloomShield can add meaningful value." />
    </>
  );
}
