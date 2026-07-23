import {
  Bot,
  ChartNoAxesCombined,
  ClipboardCheck,
  FlaskConical,
  Network,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";

const description = "Applied research in implementation science, digital health, responsible AI, evaluation and learning health systems from BloomShield CIC.";
export const metadata = createMetadata({ title: "Research & Innovation", description, path: "/research-innovation" });

const researchAreas = [
  [FlaskConical, "Implementation Science", "Study what enables evidence-based prevention to be adopted, adapted and sustained across real settings.", "from-emerald-50 to-teal-50", "text-teal-700"],
  [Smartphone, "Digital Health", "Design and assess inclusive digital approaches that strengthen access, navigation and human support.", "from-cyan-50 to-sky-50", "text-cyan-700"],
  [ShieldCheck, "Responsible AI", "Explore transparent, fair and accountable uses of AI where there is a clear public benefit.", "from-violet-50 to-indigo-50", "text-indigo-700"],
  [ClipboardCheck, "Evaluation", "Combine implementation, process and outcome measures to understand what changed, for whom and why.", "from-amber-50 to-orange-50", "text-amber-700"],
  [Network, "Learning Health Systems", "Create feedback loops that help communities, practitioners and leaders turn delivery experience into better decisions.", "from-teal-50 to-emerald-50", "text-emerald-700"],
];

export default function Research() {
  return (
    <>
      <PageStructuredData name="Research & Innovation" description={description} path="/research-innovation" breadcrumb="Research & Innovation" kind="research" />
      <PageHero
        visual="research"
        eyebrow="Research & innovation"
        title="Applied research for prevention that works."
        intro="BloomShield works at the intersection of implementation science, digital health and community knowledge—connecting rigorous inquiry with the realities of diverse health systems."
      />

      <section className="section-space">
        <div className="container-page">
          <SectionHeading
            eyebrow="Applied research institute"
            title="Five connected fields. One practical purpose."
            intro="Our research agenda is designed to produce useful knowledge: evidence that informs implementation, strengthens learning and improves equitable cancer prevention."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-6">
            {researchAreas.map(([Icon, title, description, gradient, colour], index) => (
              <article
                className={`group rounded-[2rem] border border-slate-200 bg-gradient-to-br ${gradient} p-7 transition hover:-translate-y-1 hover:shadow-xl ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
                key={title as string}
              >
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ${colour}`}>
                  <Icon size={28} />
                </span>
                <h2 className="mt-7 font-display text-2xl font-semibold">{title as string}</h2>
                <p className="mt-3 max-w-xl leading-7 text-slate-600">{description as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#071f34] text-white">
        <div className="container-page grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="eyebrow !text-emerald-300">From evidence to learning</p>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">Research designed to travel into practice.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">We develop questions with the people who will use the answers, combine quantitative and qualitative insight, and design dissemination as part of the work—not as an afterthought.</p>
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {["Community-engaged", "Methodologically rigorous", "Implementation-ready"].map((item) => (
                <div className="rounded-2xl border border-white/10 bg-white/[.06] p-4 text-sm font-semibold" key={item}>{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[.07] p-8">
            <ChartNoAxesCombined className="h-10 w-10 text-emerald-300" />
            <h3 className="mt-7 font-display text-2xl font-semibold">A learning cycle, not a linear hand-off</h3>
            <ol className="mt-7 space-y-4">
              {["Listen to context and lived experience", "Test evidence-informed approaches", "Evaluate reach, adoption and outcomes", "Adapt, share and sustain learning"].map((item, index) => (
                <li className="flex items-center gap-4" key={item}><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-300 font-bold text-[#071f34]">{index + 1}</span><span className="text-white/80">{item}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-space bg-mist">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Future AI platform"
            title="Human-centred intelligence for prevention pathways."
            intro="Our long-term ambition is to explore an AI-enabled platform that helps partners identify barriers, tailor support and learn across programmes—without losing the judgement, relationships and accountability that safe care requires."
          />
          <div className="rounded-3xl bg-teal-800 p-8 text-white">
            <Bot className="h-10 w-10 text-emerald-300" />
            <h3 className="mt-7 text-2xl font-bold">Principles before product</h3>
            <ul className="mt-5 space-y-4 text-white/75">
              {["Clear purpose and public benefit", "Community involvement in design and governance", "Data minimisation and meaningful transparency", "Fairness tested across relevant groups", "Human oversight and routes to challenge", "Independent evaluation before scale"].map((item) => (
                <li className="flex gap-3" key={item}><span aria-hidden="true" className="text-emerald-300">•</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CTA title="Build applied knowledge with us." text="We welcome research and innovation partnerships with a credible route to public benefit." />
    </>
  );
}
