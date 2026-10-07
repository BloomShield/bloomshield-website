import Image from "next/image";
import Link from "next/link";
import { featuredCampaign, tlcCampaign, tlcDisclaimer, tlcSteps } from "@/lib/screensmart-campaign";

export function CampaignArtwork({ priority = false, permanent = false }: { priority?: boolean; permanent?: boolean }) {
  const campaign = permanent ? tlcCampaign : featuredCampaign;
  return <Image src={campaign.image} alt={campaign.imageAlt} width={campaign.imageWidth} height={campaign.imageHeight} priority={priority} sizes="(min-width: 1024px) 520px, (min-width: 640px) 600px, 100vw" className="mx-auto h-auto w-full max-w-[600px] rounded-3xl shadow-soft" />;
}

export function CampaignSpotlight() {
  const campaign = featuredCampaign;
  const theme = campaign.accent === "pink" ? "border-pink-200 bg-pink-50" : "border-emerald-200 bg-emerald-50";
  return <section aria-labelledby="campaign-spotlight-title" className="py-8"><div className="container-page"><div className={`grid gap-6 rounded-3xl border p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center ${theme}`}><div><div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-widest"><p className="text-teal-800">{campaign.programme} Spotlight</p><p className={campaign.accent === "pink" ? "text-pink-800" : "text-emerald-800"}>{campaign.kicker}</p></div><h2 id="campaign-spotlight-title" className="mt-4 font-display text-2xl font-semibold text-teal-950 sm:text-3xl">{campaign.title}</h2><p className="mt-3 max-w-3xl leading-7 text-slate-700">{campaign.description}</p><p className="mt-2 font-semibold text-teal-900">{campaign.line}</p></div><Link href={campaign.href} className="button-primary text-center">{campaign.cta}</Link></div></div></section>;
}

export function TLCSteps() {
  return <div className="mt-8 grid gap-4 md:grid-cols-3">{tlcSteps.map(({ title, text }) => <article key={title} className="rounded-2xl border border-emerald-900/10 bg-white p-6"><h3 className="font-display text-xl font-bold text-emerald-900"><span className="mr-3 text-pink-800">{title.charAt(0)}</span>{title}</h3><p className="mt-3 leading-7 text-slate-700">{text}</p></article>)}</div>;
}

export function CurrentScreenSmartCampaign() {
  return <section aria-labelledby="current-campaign-title" className="section-space bg-emerald-50/50"><div className="container-page"><div className="rounded-3xl border border-emerald-800/15 bg-pink-50/60 p-6 sm:p-10"><p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-800">Current ScreenSmart Campaign</p><h2 id="current-campaign-title" className="mt-4 font-display text-3xl font-semibold text-emerald-950 sm:text-4xl">{tlcCampaign.title}</h2><p className="mt-5 text-xl leading-8 text-emerald-950">Breast awareness starts with knowing what is normal for you.</p><p className="mt-4 max-w-3xl leading-7 text-slate-700"><strong>{tlcCampaign.title}</strong> is BloomShield’s breast-awareness campaign, designed to make the message simple, memorable and easy to share across communities.</p><TLCSteps /><p className="mt-7 leading-7 text-slate-700">Most breast changes are not cancer, but new or unusual changes should be checked.</p><p className="mt-4 font-bold text-emerald-900">Small changes can matter. <span className="text-pink-800">TLC today for a healthier tomorrow.</span></p><Link href={tlcCampaign.href} className="button-primary mt-7">{tlcCampaign.cta}</Link><p className="mt-5 max-w-3xl text-sm leading-6 text-slate-600">{tlcDisclaimer}</p></div></div></section>;
}
