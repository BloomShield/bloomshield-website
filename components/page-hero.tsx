import Link from "next/link";
import {
  ArrowRight, BarChart3, Bot, BriefcaseBusiness, CircleDot, FlaskConical,
  Handshake, HeartPulse, MapPin, Network, Route, ShieldCheck, Sparkles,
  UsersRound, Workflow
} from "lucide-react";

type Visual = "about" | "programmes" | "consultancy" | "research" | "partnerships" | "contact";

const heroThemes: Record<Visual, { section: string; glow: string; accent: string }> = {
  about: { section: "bg-gradient-to-br from-teal-50 via-white to-emerald-50", glow: "bg-emerald-300/25", accent: "text-teal-700" },
  programmes: { section: "bg-gradient-to-br from-[#edf9f4] via-white to-[#e7f6f6]", glow: "bg-[#2baa7f]/20", accent: "text-[#087166]" },
  consultancy: { section: "bg-gradient-to-br from-slate-100 via-white to-[#e8edf5]", glow: "bg-slate-400/20", accent: "text-slate-700" },
  research: { section: "bg-gradient-to-br from-emerald-50 via-white to-purple-50", glow: "bg-purple-400/20", accent: "text-purple-700" },
  partnerships: { section: "bg-gradient-to-br from-amber-50/60 via-white to-blue-50", glow: "bg-blue-400/20", accent: "text-blue-800" },
  contact: { section: "bg-gradient-to-br from-teal-50 via-white to-amber-50/60", glow: "bg-gold-400/20", accent: "text-teal-700" }
};

function inferVisual(eyebrow: string): Visual {
  const value = eyebrow.toLowerCase();
  if (value.includes("consult")) return "consultancy";
  if (value.includes("research")) return "research";
  if (value.includes("partner")) return "partnerships";
  if (value.includes("programme")) return "programmes";
  if (value.includes("contact")) return "contact";
  return "about";
}

export function PageHero({ eyebrow, title, intro, cta, visual }: { eyebrow: string; title: string; intro: string; cta?: string; visual?: Visual }) {
  const selected = visual ?? inferVisual(eyebrow);
  const theme = heroThemes[selected];
  return <section data-hero={selected} className={`relative overflow-hidden ${theme.section}`}>
    <div aria-hidden="true" className={`absolute -right-28 -top-28 h-[30rem] w-[30rem] rounded-full blur-3xl ${theme.glow}`}/>
    <div className={`container-page relative grid min-h-[590px] items-center gap-14 py-24 md:py-32 lg:grid-cols-[1.08fr_.92fr] lg:gap-20 ${selected === "about" ? "max-sm:pb-8" : ""}`}>
      <div className="max-w-3xl"><p className={`eyebrow ${theme.accent}`}>{eyebrow}</p><h1 className="display max-w-4xl text-[2.85rem] sm:text-6xl lg:text-[4.35rem]">{title}</h1><p className="lead mt-8 max-w-2xl text-xl leading-9">{intro}</p>{cta && <Link href="/contact" className="button-primary mt-9">{cta}<ArrowRight size={17}/></Link>}</div>
      <HeroIllustration visual={selected}/>
    </div>
  </section>;
}

function HeroIllustration({ visual }: { visual: Visual }) {
  if (visual === "programmes") return <div aria-hidden="true" className="relative mx-auto h-[330px] w-full max-w-[390px]"><div className="absolute inset-x-8 top-5 h-64 rotate-3 rounded-[2.5rem] bg-[#073f4b] shadow-[0_30px_70px_-35px_rgba(7,63,75,.7)]"/><div className="absolute inset-x-2 top-16 grid gap-3 rounded-[2.5rem] border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur"><div className="flex items-center gap-4 rounded-2xl bg-[#e5f8f1] p-4 text-[#087166]"><UsersRound/><span className="font-bold">Community insight</span></div><div className="ml-5 flex items-center gap-4 rounded-2xl bg-[#d5f2eb] p-4 text-[#075e59]"><Route/><span className="font-bold">Earlier detection</span></div><div className="ml-10 flex items-center gap-4 rounded-2xl bg-[#c7ece6] p-4 text-[#064e4a]"><BarChart3/><span className="font-bold">Learning at scale</span></div></div></div>;

  if (visual === "consultancy") return <div aria-hidden="true" className="relative mx-auto h-[340px] w-full max-w-[390px]"><div className="absolute inset-3 rounded-[3rem] bg-gradient-to-br from-[#18283f] to-[#334866] shadow-[0_35px_80px_-38px_rgba(15,23,42,.75)]"><div className="absolute left-8 top-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white"><BriefcaseBusiness className="h-8 w-8"/></div><div className="absolute bottom-9 left-8 right-8 rounded-2xl border border-white/10 bg-white/[.08] p-5 text-white"><Workflow className="h-8 w-8 text-slate-300"/><div className="mt-5 flex items-end gap-2">{[35,55,42,75,62].map((h,i)=><span key={i} className="w-full rounded-t bg-gradient-to-t from-slate-400 to-white" style={{height:h}}/>)}</div></div></div><span className="absolute right-0 top-20 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-slate-700 shadow-soft"><BarChart3 className="h-9 w-9"/></span></div>;

  if (visual === "research") return <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[360px]"><div className="absolute inset-10 rounded-full border border-emerald-800/10 bg-white/70 shadow-soft"/><div className="absolute inset-[5.5rem] flex items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-emerald-700 to-teal-900 text-white shadow-xl"><FlaskConical className="h-16 w-16" strokeWidth={1.3}/></div><span className="absolute right-3 top-14 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-600 text-white shadow-lg"><Bot className="h-9 w-9"/></span><span className="absolute bottom-8 left-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 shadow-soft"><Sparkles/></span><span className="absolute left-4 top-8 h-3 w-3 rounded-full bg-gold-400"/><span className="absolute bottom-3 right-16 h-4 w-4 rounded-full bg-purple-300"/></div>;

  if (visual === "partnerships") return <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[370px]"><div className="absolute inset-10 rounded-full border border-dashed border-blue-800/20"/><span className="absolute inset-[7rem] flex items-center justify-center rounded-full bg-teal-900 text-white shadow-xl"><Handshake className="h-14 w-14"/></span>{[["left-2 top-32","bg-[#f26d4f]",UsersRound],["right-4 top-12","bg-[#3858c7]",Network],["bottom-4 right-20","bg-[#7b4caf]",HeartPulse],["left-16 top-3","bg-[#2baa7f]",ShieldCheck]].map(([pos,bg,Icon],i)=>{const NodeIcon=Icon as typeof UsersRound;return <span key={i} className={`absolute ${pos} ${bg} flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg`}><NodeIcon/></span>})}</div>;

  if (visual === "contact") return <div aria-hidden="true" className="relative mx-auto h-[320px] w-full max-w-[380px]"><div className="absolute inset-x-4 top-6 h-64 rounded-[3rem] bg-gradient-to-br from-teal-800 to-teal-900 shadow-soft"><div className="absolute left-8 top-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-emerald-300"><MapPin className="h-8 w-8"/></div><div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white p-5"><p className="text-xs font-bold uppercase tracking-widest text-teal-600">A thoughtful next step</p><div className="mt-4 h-2 rounded-full bg-teal-100"><div className="h-2 w-2/3 rounded-full bg-teal-600"/></div></div></div></div>;

  return <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[360px]"><div className="absolute inset-6 rotate-6 rounded-[3rem] border border-teal-700/10 bg-white/70"/><div className="absolute inset-14 -rotate-3 rounded-[2.7rem] bg-gradient-to-br from-teal-700 to-teal-900 shadow-[0_35px_75px_-35px_rgba(12,64,56,.7)]"><UsersRound className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-emerald-300" strokeWidth={1.25}/></div><span className="absolute left-0 top-16 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-soft"><HeartPulse/></span><span className="absolute bottom-5 right-2 flex h-20 w-20 items-center justify-center rounded-3xl bg-gold-400 text-teal-900 shadow-soft"><ShieldCheck className="h-9 w-9"/></span><CircleDot className="absolute right-5 top-9 text-emerald-500"/></div>;
}
