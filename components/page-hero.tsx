import Link from "next/link";
import {
  ArrowRight, BarChart3, Bot, BriefcaseBusiness, CircleDot, DoorOpen, FlaskConical,
  Handshake, HeartPulse, MapPin, Network, ShieldCheck, Sparkles,
  UsersRound, Waypoints, Workflow
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
  if (visual === "programmes") {
    const programmes = [
      { href: "#screen-smart", icon: UsersRound, step: "Step 1", stage: "Community Awareness", name: "ScreenSmart Communities™", text: "Building understanding, trust and informed participation in cancer prevention.", card: "border-2 border-[#15967e]/30 bg-gradient-to-br from-white to-[#dff5ee] text-[#075e59] shadow-md", badge: "h-10 w-10 bg-[#087166] text-white" },
      { href: "#screen-access", icon: DoorOpen, step: "Step 2", stage: "Understanding Barriers", name: "ScreenAccess™", text: "Making barriers visible and co-designing practical routes to equitable access.", card: "border border-[#d96748]/25 bg-gradient-to-br from-white to-[#fde4d8] text-[#74301f]", badge: "h-9 w-9 bg-[#d96748] text-white" },
      { href: "#screen-connect", icon: Waypoints, step: "Step 3", stage: "Connecting People to Services", name: "ScreenConnect™", text: "Connecting communities, primary care and screening services through trusted pathways.", card: "border border-[#5267dc]/25 bg-gradient-to-br from-white to-[#e2e6ff] text-[#293474]", badge: "h-9 w-9 bg-[#5267dc] text-white" }
    ];

    return (
      <nav aria-label="Flagship programme pathway" className="mx-auto w-full max-w-[440px]">
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-[.16em] text-teal-800">From awareness, to access, to connection.</p>
        <div className="relative">
          <span aria-hidden="true" className="absolute bottom-4 left-1/2 top-4 w-px -translate-x-1/2 bg-gradient-to-b from-teal-600/20 via-teal-700/45 to-teal-600/20"/>
          <ol className="relative grid gap-11">
            {programmes.map(({ href, icon: Icon, step, stage, name, text, card, badge }) => (
              <li key={name} className="relative z-10">
                <Link href={href} className={`group block rounded-3xl p-3 shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-soft ${card}`}>
                  <span className="flex items-center gap-2 text-[9px] font-bold uppercase leading-none tracking-[.13em] opacity-75"><span>{step}</span><span aria-hidden="true" className="h-1 w-1 rounded-full bg-current opacity-50"/><span>{stage}</span></span>
                  <span className="mt-1.5 flex items-center gap-3">
                    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-2xl shadow-sm ${badge}`}><Icon className="h-5 w-5"/></span>
                    <span className="min-w-0 font-display text-[1.05rem] font-bold tracking-tight sm:text-lg">{name}</span>
                    <ArrowRight aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"/>
                  </span>
                  <span className="mt-1.5 block text-sm leading-5 opacity-80">{text}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="relative z-10 mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-teal-700/20 bg-gradient-to-r from-white via-emerald-50 to-white px-4 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-teal-900 shadow-[0_12px_30px_-18px_rgba(8,113,102,.65)]"><span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-700 text-white"><ShieldCheck className="h-3.5 w-3.5"/></span>Better Prevention Outcomes</div>
        </div>
        <div className="mt-4 text-center"><p className="text-[11px] font-bold tracking-[.04em] text-teal-900">The BloomShield Implementation Pathway™</p><p className="mt-1 text-xs leading-5 text-slate-600">Moving communities from awareness to equitable cancer prevention.</p></div>
      </nav>
    );
  }

  if (visual === "consultancy") return <div aria-hidden="true" className="relative mx-auto h-[340px] w-full max-w-[390px]"><div className="absolute inset-3 rounded-[3rem] bg-gradient-to-br from-[#18283f] to-[#334866] shadow-[0_35px_80px_-38px_rgba(15,23,42,.75)]"><div className="absolute left-8 top-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white"><BriefcaseBusiness className="h-8 w-8"/></div><div className="absolute bottom-9 left-8 right-8 rounded-2xl border border-white/10 bg-white/[.08] p-5 text-white"><Workflow className="h-8 w-8 text-slate-300"/><div className="mt-5 flex items-end gap-2">{[35,55,42,75,62].map((h,i)=><span key={i} className="w-full rounded-t bg-gradient-to-t from-slate-400 to-white" style={{height:h}}/>)}</div></div></div><span className="absolute right-0 top-20 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-slate-700 shadow-soft"><BarChart3 className="h-9 w-9"/></span></div>;

  if (visual === "research") return <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[360px]"><div className="absolute inset-10 rounded-full border border-emerald-800/10 bg-white/70 shadow-soft"/><div className="absolute inset-[5.5rem] flex items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-emerald-700 to-teal-900 text-white shadow-xl"><FlaskConical className="h-16 w-16" strokeWidth={1.3}/></div><span className="absolute right-3 top-14 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-600 text-white shadow-lg"><Bot className="h-9 w-9"/></span><span className="absolute bottom-8 left-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 shadow-soft"><Sparkles/></span><span className="absolute left-4 top-8 h-3 w-3 rounded-full bg-gold-400"/><span className="absolute bottom-3 right-16 h-4 w-4 rounded-full bg-purple-300"/></div>;

  if (visual === "partnerships") return <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[370px]"><div className="absolute inset-10 rounded-full border border-dashed border-blue-800/20"/><span className="absolute inset-[7rem] flex items-center justify-center rounded-full bg-teal-900 text-white shadow-xl"><Handshake className="h-14 w-14"/></span>{[["left-2 top-32","bg-[#f26d4f]",UsersRound],["right-4 top-12","bg-[#3858c7]",Network],["bottom-4 right-20","bg-[#7b4caf]",HeartPulse],["left-16 top-3","bg-[#2baa7f]",ShieldCheck]].map(([pos,bg,Icon],i)=>{const NodeIcon=Icon as typeof UsersRound;return <span key={i} className={`absolute ${pos} ${bg} flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg`}><NodeIcon/></span>})}</div>;

  if (visual === "contact") return <div aria-hidden="true" className="relative mx-auto h-[320px] w-full max-w-[380px]"><div className="absolute inset-x-4 top-6 h-64 rounded-[3rem] bg-gradient-to-br from-teal-800 to-teal-900 shadow-soft"><div className="absolute left-8 top-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-emerald-300"><MapPin className="h-8 w-8"/></div><div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white p-5"><p className="text-xs font-bold uppercase tracking-widest text-teal-600">A thoughtful next step</p><div className="mt-4 h-2 rounded-full bg-teal-100"><div className="h-2 w-2/3 rounded-full bg-teal-600"/></div></div></div></div>;

  return <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[360px]"><div className="absolute inset-6 rotate-6 rounded-[3rem] border border-teal-700/10 bg-white/70"/><div className="absolute inset-14 -rotate-3 rounded-[2.7rem] bg-gradient-to-br from-teal-700 to-teal-900 shadow-[0_35px_75px_-35px_rgba(12,64,56,.7)]"><UsersRound className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-emerald-300" strokeWidth={1.25}/></div><span className="absolute left-0 top-16 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-soft"><HeartPulse/></span><span className="absolute bottom-5 right-2 flex h-20 w-20 items-center justify-center rounded-3xl bg-gold-400 text-teal-900 shadow-soft"><ShieldCheck className="h-9 w-9"/></span><CircleDot className="absolute right-5 top-9 text-emerald-500"/></div>;
}
