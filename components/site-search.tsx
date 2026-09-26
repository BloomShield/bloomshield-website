"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useId, useRef, useState } from "react";
import { trackSiteSearchEvent } from "@/lib/analytics";
import { searchSite } from "@/lib/site-search";

type SiteSearchProps = { children: (openSearch: (trigger?: HTMLElement) => void) => ReactNode };

function getFocusableElements(dialog: HTMLElement) {
  return Array.from(dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])")).filter((element) => element.getClientRects().length > 0);
}

export function SiteSearch({ children }: SiteSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const inputId = useId();
  const results = searchSite(query);
  function close() { setOpen(false); setQuery(""); requestAnimationFrame(() => returnFocusRef.current?.focus()); }
  function show(trigger?: HTMLElement) { returnFocusRef.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null); setOpen(true); trackSiteSearchEvent("site_search_open"); }
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { close(); return; }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusableElements = getFocusableElements(dialog);
      if (focusableElements.length === 0) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;
      if (event.shiftKey && (activeElement === first || !dialog.contains(activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (activeElement === last || !dialog.contains(activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); };
  }, [open]);
  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((!event.ctrlKey && !event.metaKey) || event.key.toLowerCase() !== "k") return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable=true]")) return;
      event.preventDefault();
      if (!open) show();
    };
    document.addEventListener("keydown", onShortcut);
    return () => document.removeEventListener("keydown", onShortcut);
  }, [open]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim().length >= 2) { const parameters = { search_term: query.trim(), result_count: results.length }; trackSiteSearchEvent("site_search_submit", parameters); if (results.length === 0) trackSiteSearchEvent("site_search_no_results", parameters); }
  }
  return <>
    {children(show)}
    {open && <div className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/35 px-4 py-5 backdrop-blur-sm sm:items-center sm:p-8" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="max-h-[calc(100dvh-2.5rem)] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4"><h2 id={titleId} className="font-display text-2xl font-semibold tracking-[-.02em] text-ink">Search BloomShield</h2><button type="button" onClick={close} className="flex min-h-12 min-w-12 items-center justify-center rounded-full text-teal-900 hover:bg-teal-50" aria-label="Close search"><X aria-hidden="true" /></button></div>
        <form onSubmit={submit}><label htmlFor={inputId} className="sr-only">Search BloomShield</label><div className="flex items-center rounded-2xl border border-teal-900/20 bg-teal-50/50 px-4 focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-gold-500 focus-within:ring-offset-2"><Search aria-hidden="true" className="shrink-0 text-teal-700" size={20} /><input ref={inputRef} id={inputId} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search BloomShield…" className="min-h-14 w-full bg-transparent px-3 text-lg text-ink placeholder:text-slate-500 focus:outline-none" /></div></form>
        <div className="mt-5" aria-live="polite">
          {query.trim().length >= 2 && (results.length ? <ul className="space-y-2">{results.map((result) => <li key={result.href}><Link href={result.href} onClick={() => { trackSiteSearchEvent("site_search_result_click", { search_term: query.trim(), result_count: results.length, result_title: result.title, result_href: result.href, result_type: result.type }); close(); }} className="block rounded-2xl border border-teal-900/10 p-4 transition hover:border-teal-700/30 hover:bg-teal-50 focus-visible:ring-2 focus-visible:ring-gold-500"><span className="text-xs font-bold uppercase tracking-[.14em] text-teal-700">{result.type}</span><span className="mt-1 block font-display text-lg font-semibold text-ink">{result.title}</span><span className="mt-1 block leading-6 text-slate-600">{result.description}</span></Link></li>)}</ul> : <p className="rounded-2xl bg-slate-50 p-5 leading-7 text-slate-700">Nothing matched that search. Try another word or phrase.</p>)}
          {query.trim().length > 0 && query.trim().length < 2 && <p className="px-1 text-sm text-slate-600">Enter at least two characters to search.</p>}
        </div>
      </section>
    </div>}
  </>;
}
