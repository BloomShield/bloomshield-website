import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Handshake, MoveUpRight, UsersRound } from "lucide-react";
import { africaCountries, africaDescription, africaEnquiryHref, africaInstitutions, africaPartnershipPath } from "@/lib/africa-partnerships";

export function AfricaCountryPanels() {
  return <ul className="grid gap-3 sm:grid-cols-3">{africaCountries.map(country => <li key={country.flag} className="flex items-start gap-3 rounded-2xl border border-sky-200/25 bg-sky-900/40 p-4">
    <Image src={`/images/flags/${country.flag}.svg`} alt={`${country.name} flag`} width={60} height={40} className="mt-1 h-9 w-[54px] shrink-0 rounded object-contain" />
    <div className="min-w-0"><h3 className="text-lg font-bold text-white">{country.name}</h3><p className="mt-1 text-sm leading-6 text-slate-100">{country.role}</p></div>
  </li>)}</ul>;
}

export function AfricaPartnershipFeature() {
  return <section id="african-research-partnerships" aria-labelledby="africa-feature-title" className="bg-[#071f34] text-white">
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-y-0 right-0 -z-20 hidden w-[52%] lg:block"><Image src="/images/accept-sims-africa-clinic.webp" alt="" fill sizes="52vw" className="object-cover object-center" /></div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071f34] via-[#071f34]/95 to-[#071f34]/10" />
      <div className="container-page py-14 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-200">Research &amp; Innovation | Africa</p>
        <h2 id="africa-feature-title" className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">ACCEPT SIMS™ —<br/>In Partnership for Stronger Cervical Cancer Care <span className="text-emerald-300">Across Africa</span></h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">{africaDescription}</p>
        <div className="mt-8 max-w-4xl"><AfricaCountryPanels /></div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href={africaPartnershipPath} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-emerald-300 px-6 py-3 text-sm font-bold text-[#071f34] transition hover:bg-emerald-200">Explore the Partnership <ArrowRight aria-hidden="true" size={18}/></Link>
          <Link href="/research/accept" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white px-6 py-3 text-sm font-bold transition hover:bg-white/10">View ACCEPT SIMS™ <ArrowRight aria-hidden="true" size={18}/></Link>
          <Link href={africaEnquiryHref} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#ffd056] px-6 py-3 text-sm font-bold text-[#071f34] transition hover:bg-[#ffe093]">Partnership Requests <ArrowRight aria-hidden="true" size={18}/></Link>
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-6 text-slate-200">Proposed research programme · Field validation subject to protocol development, local agreements, ethics and regulatory approvals, and resources. Image illustrates the research ambition.</p>
      </div>
    </div>
    <div className="container-page pb-8"><div className="rounded-3xl bg-white p-6 text-ink shadow-soft sm:p-8">
      <h3 className="text-sm font-bold text-teal-900">Institutional research relationships</h3>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{africaInstitutions.map(institution => <li key={institution.name} className="border-t border-teal-900/15 pt-4"><p className="text-sm font-bold leading-6">{institution.name}</p><p className="mt-2 text-xs leading-5 text-slate-600">{institution.role}</p></li>)}</ul>
      <p className="mt-6 border-t border-teal-900/10 pt-4 text-xs leading-6 text-slate-600">These institutional research relationships provide a framework for collaboration. Proposed ACCEPT SIMS™ field validation remains subject to local agreements, ethics and regulatory approvals, and resources.</p>
    </div></div>
    <div className="border-t border-white/15"><ul className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">{[{ Icon: UsersRound, title: "People-centred", text: "From screening to continued care" }, { Icon: BarChart3, title: "Evidence-driven", text: "Implementation and research" }, { Icon: Handshake, title: "Collaborative", text: "African partners, local solutions" }, { Icon: MoveUpRight, title: "Scalable", text: "Towards wider impact" }].map(({ Icon, title, text }) => <li key={title} className="flex gap-4"><Icon aria-hidden="true" className="h-9 w-9 shrink-0 text-emerald-200" strokeWidth={1.4}/><div><p className="font-bold">{title}</p><p className="mt-1 text-sm leading-6 text-slate-200">{text}</p></div></li>)}</ul></div>
  </section>;
}
