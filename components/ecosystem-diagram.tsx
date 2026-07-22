import Image from "next/image";
import { Hospital, Microscope, Route, UsersRound, type LucideIcon } from "lucide-react";

type DiagramNodeProps = {
  icon: LucideIcon;
  label: string;
  position: string;
  tone: string;
};

function DiagramNode({ icon: Icon, label, position, tone }: DiagramNodeProps) {
  return (
    <div className={`absolute z-10 flex w-[108px] flex-col items-center text-center sm:w-[138px] ${position}`}>
      <div className={`flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-white shadow-[0_18px_40px_-24px_rgba(5,80,70,.55)] sm:h-[104px] sm:w-[104px] ${tone}`}>
        <Icon className="h-8 w-8 sm:h-11 sm:w-11" strokeWidth={1.45} />
      </div>
      <p className="mt-2 text-[10px] font-bold uppercase leading-[1.25] tracking-[.075em] text-teal-800 sm:mt-3 sm:text-xs sm:tracking-[.1em]">
        {label}
      </p>
    </div>
  );
}

export function EcosystemDiagram() {
  return (
    <figure
      className="relative mx-auto aspect-[1/1.04] w-full max-w-[560px]"
      aria-label="BloomShield implementation ecosystem connecting communities, evidence and research, health systems, and implementation and impact"
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 104" fill="none">
        <path d="M7 22C20 8 28 14 36 19S52 27 62 17 80 5 95 18" stroke="#98d6c4" strokeWidth=".35" opacity=".62" />
        <path d="M3 82C19 68 30 78 39 84s19 10 29 1 19-13 30-5" stroke="#77c8b6" strokeWidth=".35" opacity=".5" />
        <circle cx="50" cy="50" r="35" stroke="#28aa86" strokeWidth=".6" opacity=".65" />
        <circle cx="50" cy="50" r="24" stroke="#159b78" strokeWidth=".55" strokeDasharray="2.2 1.8" opacity=".8" />
        <path d="M50 15V27M15 50H26M74 50H85M50 74V89" stroke="#168f76" strokeWidth=".65" strokeDasharray="2 1.5" />
        <path d="M27 27 34 34M73 27 66 34M27 73 34 66M73 73 66 66" stroke="#5abda5" strokeWidth=".45" />
        {["50,15", "15,50", "85,50", "50,85", "27,27", "73,27", "27,73", "73,73"].map((point) => {
          const [cx, cy] = point.split(",");
          return <circle key={point} cx={cx} cy={cy} r="1.05" fill="#77c8b6" />;
        })}
      </svg>

      <DiagramNode icon={UsersRound} label="Communities" position="left-1/2 top-0 -translate-x-1/2" tone="bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-800" />
      <DiagramNode icon={Microscope} label="Evidence & Research" position="left-0 top-1/2 -translate-y-1/2" tone="bg-gradient-to-br from-cyan-50 to-teal-100 text-teal-800" />
      <DiagramNode icon={Hospital} label="Health Systems" position="right-0 top-1/2 -translate-y-1/2" tone="bg-gradient-to-br from-teal-50 to-emerald-100 text-teal-800" />
      <DiagramNode icon={Route} label="Implementation & Impact" position="bottom-0 left-1/2 -translate-x-1/2" tone="bg-gradient-to-br from-amber-50 to-emerald-100 text-teal-800" />

      <div className="absolute left-1/2 top-1/2 z-20 flex h-[86px] w-[86px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-teal-700/15 bg-white shadow-[0_22px_55px_-28px_rgba(5,80,70,.65)] sm:h-[124px] sm:w-[124px]">
        <Image src="/bloomshield-icon-only.png" alt="" width={132} height={132} className="h-[64px] w-[64px] rounded-2xl object-contain opacity-95 sm:h-[92px] sm:w-[92px] sm:rounded-3xl" />
      </div>
      <svg aria-hidden="true" className="absolute left-1/2 top-[61%] z-10 h-9 w-28 -translate-x-1/2 text-teal-800 sm:top-[62%] sm:h-12 sm:w-40" viewBox="0 0 160 48" fill="none">
        <path d="M8 36h144M18 36V25c18-14 35-14 53 0v11M89 36V25c18-14 35-14 53 0v11" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity=".9" />
        <path d="M20 24c39 10 81 10 120 0" stroke="#42b89b" strokeWidth="2" />
      </svg>
    </figure>
  );
}
