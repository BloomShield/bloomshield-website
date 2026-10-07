import Link from "next/link";
import { CampaignArtwork, TLCSteps } from "@/components/screensmart-campaign";
import { PageStructuredData } from "@/components/seo-json-ld";
import { tlcCampaign, tlcDisclaimer } from "@/lib/screensmart-campaign";
import { createMetadata } from "@/lib/seo";

const description = "BloomShield's TLC breast awareness campaign helps people get to know what is normal, notice breast changes and seek appropriate medical advice.";
export const metadata = createMetadata({
  title: "TLC — Touch. Look. Check. | Breast Awareness | BloomShield CIC",
  description,
  path: tlcCampaign.href,
  absoluteTitle: true,
  socialImage: { url: tlcCampaign.image, width: 1254, height: 1254, alt: tlcCampaign.imageAlt, type: "image/png" },
});

const changes = [
  "A new lump or swelling in the breast, chest or armpit",
  "A change in breast size or shape",
  "Skin changes such as dimpling, puckering or persistent redness",
  "A nipple that becomes inverted or changes position",
  "Unusual nipple discharge",
  "Persistent breast or nipple pain",
  "Any other change that is new or unusual for you",
];

const sources = [
  { label: "NHS: breast cancer symptoms and breast changes", href: "https://www.nhs.uk/conditions/breast-cancer-in-women/symptoms-of-breast-cancer-in-women/" },
  { label: "NHS: breast screening (mammogram)", href: "https://www.nhs.uk/tests-and-treatments/breast-screening-mammogram/" },
  { label: "Breast Cancer Now: signs and symptoms — Touch Look Check", href: "https://breastcancernow.org/about-breast-cancer/touch-look-check" },
];

export default function TLCCampaignPage() {
  return <>
    <PageStructuredData name={tlcCampaign.title} description={description} path={tlcCampaign.href} breadcrumb={tlcCampaign.title} parentBreadcrumb={{ name: "Insights", path: "/insights" }} />
    <section className="bg-pink-50/60 py-12 sm:py-16">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm leading-7 text-teal-800"><ol className="flex flex-wrap gap-x-2"><li><Link href="/" className="underline underline-offset-4">Home</Link><span aria-hidden="true"> /</span></li><li><Link href="/insights" className="underline underline-offset-4">Insights</Link><span aria-hidden="true"> /</span></li><li><span>Campaigns</span><span aria-hidden="true"> /</span></li><li aria-current="page">{tlcCampaign.title}</li></ol></nav>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div><p className="eyebrow">ScreenSmart Campaign</p><h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-teal-950 sm:text-5xl">{tlcCampaign.title}</h1><p className="lead mt-6">Small changes can matter. Getting to know what is normal for your breasts can make it easier to notice when something changes.</p><p className="mt-6 font-semibold text-pink-800">TLC today for a healthier tomorrow.</p></div>
          <CampaignArtwork permanent priority />
        </div>
      </div>
    </section>
    <section className="section-space"><div className="container-page"><h2 className="font-display text-3xl font-semibold text-teal-950">Know what is normal for you</h2><TLCSteps /><div className="mt-8 rounded-2xl border-l-4 border-emerald-700 bg-emerald-50 p-6"><p className="leading-7 text-slate-700">Most breast changes are not cancer, but persistent or unusual changes should be checked by a healthcare professional.</p><p className="mt-3 leading-7 text-slate-700">If you notice a new or unusual change, contact your GP.</p></div></div></section>
    <section className="section-space bg-mist"><div className="container-page grid gap-10 lg:grid-cols-2"><div><h2 className="font-display text-3xl font-semibold text-teal-950">What changes should prompt advice?</h2><p className="mt-4 leading-7 text-slate-700">Changes can include the following. This list is not exhaustive.</p><ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-slate-700">{changes.map(change => <li key={change}>{change}</li>)}</ul><p className="mt-6 font-semibold text-teal-900">If you notice a new or unusual change, contact your GP.</p></div><div className="self-start rounded-3xl border border-teal-900/10 bg-white p-6 sm:p-8"><h2 className="font-display text-3xl font-semibold text-teal-950">Breast awareness and NHS screening</h2><p className="mt-5 leading-7 text-slate-700">TLC is about breast awareness and recognising change. NHS breast screening is a separate population screening programme.</p><p className="mt-4 leading-7 text-slate-700">Breast awareness does not replace NHS breast screening. If you are invited for NHS breast screening, attend according to the guidance in your invitation.</p><p className="mt-4 leading-7 text-slate-700">Eligible people should follow NHS screening invitations and guidance.</p><p className="mt-6 text-sm leading-6 text-slate-600">{tlcDisclaimer}</p></div></div></section>
    <section className="section-space"><div className="container-page"><h2 className="font-display text-3xl font-semibold text-teal-950">Further information</h2><ul className="mt-6 space-y-4">{sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="inline-block py-2 font-semibold text-teal-800 underline underline-offset-4">{source.label}<span className="ml-2 text-sm font-normal">(opens in a new tab)</span></a></li>)}</ul><p className="mt-6 max-w-3xl text-sm leading-6 text-slate-600">BloomShield provides health education and awareness information. It does not replace advice from a qualified healthcare professional.</p></div></section>
    <section className="section-space bg-emerald-50"><div className="container-page grid gap-8 md:grid-cols-2"><article className="rounded-3xl bg-white p-6 sm:p-8"><h2 className="font-display text-2xl font-semibold text-emerald-950">Part of ScreenSmart Communities™</h2><p className="mt-5 leading-7 text-slate-700">TLC is a ScreenSmart Communities™ awareness campaign designed to support informed conversations, earlier help-seeking and clearer routes into appropriate healthcare.</p><Link href="/programmes/screensmart-communities" className="button-primary mt-6">Explore ScreenSmart Communities™</Link></article><article className="rounded-3xl bg-white p-6 sm:p-8"><h2 className="font-display text-2xl font-semibold text-emerald-950">Share TLC in your community</h2><p className="mt-5 leading-7 text-slate-700">Community, faith and voluntary organisations can use the TLC message to support responsible breast-awareness conversations and encourage people to seek appropriate healthcare advice when they notice changes.</p><Link href="/partnerships" className="button-primary mt-6">Partner with BloomShield</Link></article></div></section>
  </>;
}
