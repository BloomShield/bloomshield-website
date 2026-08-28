import { ArrowRight, Building2, Compass, HandCoins, Lightbulb } from "lucide-react";

const stages = [
  {
    name: "Discover",
    descriptor: "Understand the opportunity and readiness to grow.",
    body: "We assess existing community activity, organisational capacity, funding readiness and potential opportunities — identifying where stronger programmes, evidence, systems or partnerships could unlock future development.",
    capabilities: "Funding intelligence · Organisational readiness · Programme review · Governance gaps · Community assets",
    icon: Compass,
  },
  {
    name: "Develop",
    descriptor: "Turn good community activity into fundable programmes.",
    body: "We help organisations define the need, target communities, activities, outcomes, delivery model, evidence, evaluation and budget required to create clear and credible programmes.",
    capabilities: "Programme design · Theory of change · Outcomes · Evidence · Evaluation · Budget development",
    icon: Lightbulb,
  },
  {
    name: "Fund",
    descriptor: "Connect strong programmes with appropriate opportunities.",
    body: "We identify relevant grants, commissioning opportunities and partnerships, support funding strategy and help organisations develop competitive applications and proposals.",
    capabilities: "Funding strategy · Grant matching · Bid development · Commissioning · Partnerships · Consortium opportunities",
    icon: HandCoins,
  },
  {
    name: "Build",
    descriptor: "Strengthen the organisation behind the programme.",
    body: "We help establish the systems, skills and organisational capability needed to manage funding, demonstrate impact and pursue future opportunities with increasing independence.",
    capabilities: "Funding pipelines · Impact systems · Project management · Organisational processes · Training · Funding capability",
    icon: Building2,
  },
] as const;

export function FundingDevelopmentPathway({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <ol aria-label="Discover, Develop, Fund, Build" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stages.map(({ name, capabilities }, index) => (
          <li className="relative rounded-2xl border border-white/15 bg-white/[.07] p-5" key={name}>
            <span className="text-xs font-bold tracking-[.16em] text-emerald-300">0{index + 1}</span>
            <h3 className="mt-3 font-display text-xl font-semibold text-white">{name}</h3>
            <p className="mt-2 text-sm leading-6 text-white/75">{capabilities.split(" · ").slice(0, 2).join(" and ")}.</p>
            {index < stages.length - 1 && <ArrowRight aria-hidden="true" className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-emerald-300 xl:block" />}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="relative grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
      {stages.map(({ name, descriptor, body, capabilities, icon: Icon }, index) => (
        <li className="relative flex h-full flex-col rounded-[2rem] border border-teal-900/10 bg-white p-7 shadow-[0_24px_65px_-42px_rgba(6,78,75,.48)]" key={name}>
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-800 text-white"><Icon aria-hidden="true" size={24} /></span>
            <span className="font-display text-xl font-bold text-gold-500">0{index + 1}</span>
          </div>
          <h3 className="mt-7 font-display text-2xl font-semibold">{name}</h3>
          <p className="mt-2 font-bold leading-6 text-teal-800">{descriptor}</p>
          <p className="mt-4 leading-7 text-slate-600">{body}</p>
          <p className="mt-6 border-t border-teal-900/10 pt-5 text-sm font-semibold leading-6 text-slate-700">{capabilities}</p>
          {index < stages.length - 1 && <ArrowRight aria-hidden="true" className="absolute -right-3 top-12 z-10 hidden h-5 w-5 text-teal-500 xl:block" />}
        </li>
      ))}
    </ol>
  );
}
