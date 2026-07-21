import Link from "next/link";
import { Instagram, Linkedin, Rss, Twitter } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  return <footer className="bg-teal-900 text-white">
    <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
      <div><Logo light/><p className="mt-6 max-w-sm text-sm leading-7 text-white/70">Reducing inequalities in cancer prevention through community partnership, implementation science and responsible innovation.</p><p className="mt-5 text-sm font-semibold text-emerald-400">Shielded by Care, Empowered to Bloom.</p></div>
      <div><h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400">Explore</h2><ul className="mt-5 space-y-3 text-sm text-white/75"><li><Link className="hover:text-white" href="/about">About</Link></li><li><Link className="hover:text-white" href="/programmes">Programmes</Link></li><li><Link className="hover:text-white" href="/consultancy">Consultancy & advisory</Link></li><li><Link className="hover:text-white" href="/research-innovation">Research & innovation</Link></li><li><Link className="hover:text-white" href="/partnerships">Partnerships</Link></li></ul></div>
      <div><h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400">Connect</h2><Link href="/contact" className="mt-5 inline-block text-sm font-semibold text-white/80 underline decoration-emerald-400 underline-offset-4 hover:text-white">Contact form</Link><address className="mt-5 text-sm not-italic leading-6 text-white/60">BloomShield Community Interest Company<br/>124 City Road<br/>London EC1V 2NX<br/>United Kingdom</address><div className="mt-5 flex gap-2" aria-label="Social media channels—launching soon">{[[Linkedin,"LinkedIn"],[Instagram,"Instagram"],[Twitter,"X"],[Rss,"Substack"]].map(([Icon,label])=>{const SocialIcon=Icon as typeof Linkedin;return <span key={label as string} aria-label={`${label as string} — coming soon`} role="img" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/55" title={`${label as string} — coming soon`}><SocialIcon size={16}/></span>})}</div></div>
    </div>
    <div className="border-t border-white/10"><div className="container-page flex flex-col gap-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} BloomShield Community Interest Company · Company Number: 17341879 · Registered in England & Wales</p><div className="flex flex-wrap gap-5"><Link href="/contact">Contact form</Link><Link href="/privacy">Privacy Policy</Link><Link href="/cookies">Cookies</Link><Link href="/accessibility">Accessibility Statement</Link></div></div></div>
  </footer>;
}
