import Image from "next/image";
import { Sparkles, Sprout } from "lucide-react";

export function HomeEmblem() {
  return <div className="relative mx-auto w-full max-w-[520px]" aria-label="BloomShield emblem: shielded by care, empowered to bloom">
    <div className="relative aspect-square overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-[#073f4b] via-[#0d3b3e] to-[#071f2e] p-7 shadow-[0_40px_90px_-42px_rgba(7,63,75,.8)] sm:p-10">
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[52px] border-emerald-300/10"/>
      <div aria-hidden="true" className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"/>
      <div className="relative flex h-full flex-col items-center justify-center rounded-[2.7rem] border border-white/15 bg-white/[.06] text-center">
        <div className="relative flex h-[64%] w-[64%] items-center justify-center rounded-[2.5rem] bg-white p-4 shadow-2xl sm:p-5">
          <Image src="/bloomshield-icon-only.png" alt="BloomShield shield and bloom emblem" width={260} height={260} priority className="h-full w-full scale-[1.09] object-contain"/>
          <Sparkles aria-hidden="true" className="absolute -right-6 -top-5 h-9 w-9 text-gold-400"/>
        </div>
        <p className="mt-5 max-w-[88%] font-display text-xl font-semibold leading-snug tracking-tight text-white sm:mt-6 sm:text-2xl">Shielded by Care, <span className="text-emerald-300">Empowered to Bloom.</span></p>
      </div>
    </div>
    <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-teal-800/10 bg-white px-5 py-3 text-teal-900 shadow-soft"><Sprout className="text-emerald-600" size={19}/><span className="text-xs font-bold uppercase tracking-[.16em]">Equity by design</span></div>
  </div>;
}
