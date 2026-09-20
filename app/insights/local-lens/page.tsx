import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPinned } from "lucide-react";
import { InsightsAnalytics } from "@/components/insights-analytics";
import { InsightsCollectionStructuredData } from "@/components/insights-structured-data";
import { InsightsShell } from "@/components/insights-shell";
import { insights, localLensSeries } from "@/lib/insights";
import { createInsightMetadata } from "@/lib/seo";

export const metadata: Metadata = createInsightMetadata({
  title: localLensSeries.seoTitle,
  description: localLensSeries.seoDescription,
  path: localLensSeries.canonicalUrl,
  socialImage: localLensSeries.socialImage,
  socialImageAlt: localLensSeries.socialImageAlt,
  socialImageWidth: localLensSeries.socialImageWidth,
  socialImageHeight: localLensSeries.socialImageHeight,
  keywords: localLensSeries.keywords,
});

export default function LocalLensPage() {
  const medwayArticle = insights.find(item => item.slug === "medway-kent")!;

  return <InsightsShell>
    <InsightsAnalytics contentSection="Local Lens" />
    <InsightsCollectionStructuredData title={localLensSeries.title} description={localLensSeries.seoDescription} path={localLensSeries.canonicalUrl} image={localLensSeries.socialImage} keywords={localLensSeries.keywords} items={[{ name: medwayArticle.title, url: medwayArticle.href! }]} />
    <header className="relative overflow-hidden bg-[#062f2f] text-white">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_35%,rgba(86,199,176,.2),transparent_58%)]" />
      <div className="container-page relative py-16 md:py-24">
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-white"><ArrowLeft aria-hidden="true" size={18}/> All Insights</Link>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#e7bd68]">A BloomShield Insights series</p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.04em] sm:text-6xl">BloomShield Local Lens</h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-white/75">{localLensSeries.description}</p>
          </div>
          <div className="border-l border-[#e7bd68]/45 pl-6 sm:pl-8">
            <p className="font-display text-2xl font-semibold leading-snug text-[#f2d18d]">Local data. Local voices. Local action.</p>
            <p className="mt-4 leading-7 text-white/70">Each edition moves from baseline and progress to the inequality gap, local response and the voices needed to shape what happens next.</p>
          </div>
        </div>
      </div>
    </header>

    <section className="section-space" aria-labelledby="current-edition">
      <div className="container-page">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="eyebrow">Current edition</p><h2 id="current-edition" className="heading">Beginning in Medway &amp; Kent.</h2></div>
          <div className="flex items-center gap-3 text-sm font-bold text-teal-800"><MapPinned aria-hidden="true" size={19}/> Edition 01</div>
        </div>
        <article className="mt-10 overflow-hidden rounded-[2.25rem] border border-teal-900/10 bg-white shadow-soft">
          <Link href={medwayArticle.href!} className="group block">
            <div className="relative aspect-[1672/941] w-full overflow-hidden bg-[#062f2f]">
              <Image src={localLensSeries.image} alt={localLensSeries.imageAlt} fill sizes="(min-width: 1240px) 1150px, 100vw" className="object-contain object-center transition duration-500 group-hover:scale-[1.005]" priority />
            </div>
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start lg:p-12">
              <div>
                <span className="inline-flex rounded-full bg-[#d9eee7] px-4 py-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#075548]">Published</span>
                <p className="mt-6 text-sm font-bold uppercase tracking-[.16em] text-teal-700">Local Lens: Medway &amp; Kent</p>
              </div>
              <div>
                <h3 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{medwayArticle.title}</h3>
                <p className="mt-5 text-lg leading-8 text-slate-600">{medwayArticle.description}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-bold text-teal-700">Read the full article <ArrowRight aria-hidden="true" size={19}/></span>
              </div>
            </div>
          </Link>
        </article>
      </div>
    </section>

    <section className="border-t border-teal-900/10 bg-white py-14 sm:py-16" aria-labelledby="series-method">
      <div className="container-page grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
        <div><p className="eyebrow">Series method</p><h2 id="series-method" className="heading">A repeatable local lens.</h2></div>
        <p className="max-w-3xl text-lg leading-8 text-slate-600">Local data → inequality gap → what is already being done → who is being missed → community and system response → local voices → action</p>
      </div>
    </section>
  </InsightsShell>;
}
