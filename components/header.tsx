"use client";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const links = [
  ["About", "/about"], ["Programmes", "/programmes"], ["Consultancy", "/consultancy"],
  ["Research", "/research-innovation"], ["Partnerships", "/partnerships"]
];

const programmeLinks = [
  ["All Programmes", "/programmes", "border-slate-400"],
  ["ScreenSmart Communities™", "/programmes/screensmart-communities", "border-emerald-600"],
  ["ScreenAccess™", "/programmes/screenaccess", "border-[#c55a3d]"],
  ["ScreenConnect™", "/programmes/screenconnect", "border-[#4051b5]"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [programmesOpen, setProgrammesOpen] = useState(false);
  const pathname = usePathname();
  const programmesActive = pathname === "/programmes" || pathname.startsWith("/programmes/");

  useEffect(() => {
    setOpen(false);
    setProgrammesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProgrammesOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function toggleMobileMenu() {
    setOpen(current => {
      if (current) setProgrammesOpen(false);
      return !current;
    });
  }

  function closeMobileMenu() {
    setOpen(false);
    setProgrammesOpen(false);
  }

  return <header className="sticky top-0 z-50 border-b border-teal-900/10 bg-white/95 backdrop-blur-xl">
    <div className="container-page flex h-[106px] items-center justify-between sm:h-[120px]">
      <Logo />
      <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
        {links.map(([label, href]) => {
          const active = href === "/programmes" ? programmesActive : pathname === href;
          return <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={`text-sm font-semibold transition hover:text-teal-600 ${active ? "text-teal-600" : "text-slate-700"}`}>{label}</Link>;
        })}
        <Link href="/contact" className="button-primary !min-h-10 !px-5">Talk to us</Link>
      </nav>
      <button onClick={toggleMobileMenu} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} className="flex min-h-12 min-w-12 items-center justify-center rounded-lg text-teal-900 lg:hidden">{open ? <X aria-hidden="true"/> : <Menu aria-hidden="true"/>}</button>
    </div>
    {open && <nav id="mobile-menu" aria-label="Mobile navigation" className="max-h-[calc(100dvh-106px)] overflow-y-auto overscroll-contain border-t border-teal-900/10 bg-white px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5 sm:max-h-[calc(100dvh-120px)] lg:hidden">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-1">
        {links.map(([label, href]) => label === "Programmes" ? <div key={href}>
          <button type="button" onClick={() => setProgrammesOpen(current => !current)} aria-expanded={programmesOpen} aria-controls="mobile-programmes-submenu" className={`flex min-h-12 w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold hover:bg-teal-50 ${programmesActive ? "text-teal-700" : "text-slate-800"}`}>
            <span>Programmes</span><ChevronDown aria-hidden="true" className={`shrink-0 transition-transform motion-reduce:transition-none ${programmesOpen ? "rotate-180" : ""}`} size={20}/>
          </button>
          {programmesOpen && <ul id="mobile-programmes-submenu" className="mb-2 ml-4 space-y-1 border-l border-teal-900/15 bg-teal-50/50 py-2 pl-3 pr-1">
            {programmeLinks.map(([name, route, accent]) => <li key={route}><Link href={route} onClick={closeMobileMenu} aria-current={pathname === route ? "page" : undefined} className={`flex min-h-12 items-center rounded-lg border-l-4 ${accent} px-4 py-2.5 text-[.925rem] font-semibold leading-6 text-slate-700 hover:bg-white aria-[current=page]:bg-white aria-[current=page]:text-teal-800`}>{name}</Link></li>)}
          </ul>}
        </div> : <Link key={href} href={href} onClick={closeMobileMenu} aria-current={pathname === href ? "page" : undefined} className={`flex min-h-12 items-center rounded-xl px-4 py-3 font-semibold hover:bg-teal-50 ${pathname === href ? "text-teal-700" : "text-slate-800"}`}>{label}</Link>)}
        <Link href="/contact" onClick={closeMobileMenu} className="button-primary mt-3">Talk to us</Link>
      </div>
    </nav>}
  </header>;
}
