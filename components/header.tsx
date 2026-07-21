"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const links = [
  ["About", "/about"], ["Programmes", "/programmes"], ["Consultancy", "/consultancy"],
  ["Research", "/research-innovation"], ["Partnerships", "/partnerships"]
];

export function Header() {
  const [open, setOpen] = useState(false); const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  return <header className="sticky top-0 z-50 border-b border-teal-900/10 bg-white/95 backdrop-blur-xl">
    <div className="container-page flex h-[106px] items-center justify-between sm:h-[120px]">
      <Logo />
      <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
        {links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={`text-sm font-semibold transition hover:text-teal-600 ${pathname === href ? "text-teal-600" : "text-slate-700"}`}>{label}</Link>)}
        <Link href="/contact" className="button-primary !min-h-10 !px-5">Talk to us</Link>
      </nav>
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} className="rounded-lg p-2 text-teal-900 lg:hidden">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav id="mobile-menu" aria-label="Mobile navigation" className="border-t border-teal-900/10 bg-white px-5 py-5 lg:hidden">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-1">{links.map(([label, href]) => <Link key={href} href={href} className="rounded-xl px-4 py-3 font-semibold hover:bg-teal-50">{label}</Link>)}<Link href="/contact" className="button-primary mt-3">Talk to us</Link></div>
    </nav>}
  </header>;
}
