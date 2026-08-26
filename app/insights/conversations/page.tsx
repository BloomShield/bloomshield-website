import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InsightsShell } from "@/components/insights-shell";
import { ccpeDomains, conversationsSeries, insights } from "@/lib/insights";
import { createMetadata } from "@/lib/seo";

const description = conversationsSeries.description;
export const metadata: Metadata = createMetadata({ title: conversationsSeries.title, description, path: "/insights/conversations", socialImage: { url: conversationsSeries.image, width: 1672, height: 941, alt: conversationsSeries.imageAlt } });

export default function ConversationsPage() {
  const conversation = insights.find(item => item.slug === "saratani-ai")!;
  return <InsightsShell>
    <header className="bg-[#062f2f] text-white">
      <div className="container-page py-16 md:py-24">
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><ArrowLeft aria-hidden="true" size={18}/> All Insights</Link>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.22em] text-[#e7bd68]">BloomShield Insights series</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl font-semibold leading-[1.05] tracking-[-.04em] sm:text-6xl">{conversationsSeries.title}</h1>
        <p className="mt-8 max-w-4xl text-xl leading-9 text-white/72">{description}</p>
        <ul aria-label="Series framework" className="mt-10 flex flex-wrap gap-2">
          {ccpeDomains.map(domain => <li className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/82" key={domain}>{domain}</li>)}
        </ul>
      </div>
    </header>
    <section className="section-space">
      <div className="container-page">
        <div className="flex items-end justify-between gap-8"><div><p className="eyebrow">First conversation</p><h2 className="heading">On the horizon</h2></div><p className="hidden text-sm text-slate-500 sm:block">More conversations will be added to this series.</p></div>
        <article className="mt-10 overflow-hidden rounded-[2.25rem] border border-teal-900/10 bg-white shadow-soft">
          <div className="w-full border-b border-teal-900/10 bg-[#062f2f]"><div className="relative mx-auto aspect-[1672/941] w-full"><Image src={conversation.image!} alt={conversation.imageAlt!} fill sizes="(min-width: 1240px) 1150px, 100vw" className="object-contain object-center" priority /></div></div>
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:p-12">
            <div>
              <span className="w-fit rounded-full bg-[#f2d59b] px-4 py-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#594010]">Forthcoming</span>
              <h2 className="mt-6 font-display text-3xl font-semibold leading-tight">{conversation.title}</h2>
            </div>
            <div>
              <p className="mt-5 text-xl font-semibold leading-8 text-teal-800">Can AI bring cervical cancer screening closer to women who have historically been left behind?</p>
              <p className="mt-5 leading-8 text-slate-600">{conversation.description}</p>
              <p className="mt-7 text-sm font-semibold text-slate-500">The full conversation is not yet published.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </InsightsShell>;
}
