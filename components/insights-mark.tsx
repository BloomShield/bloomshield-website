import Image from "next/image";
import Link from "next/link";

export function InsightsMark({ light = false }: { light?: boolean }) {
  return <Link href="/insights" aria-label="BloomShield Insights home" className="group inline-flex w-fit max-w-full shrink-0 items-center gap-3.5 rounded-xl">
    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border p-1.5 shadow-[0_12px_30px_-18px_rgba(0,0,0,.65)] transition group-hover:-translate-y-0.5 ${light ? "border-white/18 bg-white/[.07]" : "border-teal-900/10 bg-teal-50"}`}>
      <Image src="/bloomshield-icon-only.png" alt="" aria-hidden="true" width={260} height={260} className="h-full w-full object-contain" />
    </span>
    <span className="flex min-w-0 flex-col leading-none">
      <span className={`whitespace-nowrap font-display text-[1.65rem] font-semibold tracking-[-.04em] sm:text-[1.85rem] ${light ? "text-white" : "text-teal-900"}`}>BloomShield</span>
      <span className="mt-1.5 text-[.7rem] font-extrabold uppercase tracking-[.46em] text-[#e7bd68]">Insights</span>
    </span>
  </Link>;
}
