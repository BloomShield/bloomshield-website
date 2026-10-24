"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { countries, internationalNotice } from "@/lib/vcse-countries";
import { isStructuredKey, questionsForRoute, toolsHelper, toolsLabel } from "@/lib/vcse-eoi-questions";
import type { AcknowledgementKey, PresentationMap } from "@/lib/vcse-declarations";
import { acknowledgements, challenges, fields, sizeBands } from "@/lib/vcse-eoi-schema";

export function VcseEoiForm({ open, presentations: initialPresentations }: { open: boolean; presentations: PresentationMap }) {
  const [presentations, setPresentations] = useState(initialPresentations);
  const [review, setReview] = useState<PresentationMap | null>(null);
  const [acknowledged, setAcknowledged] = useState<Partial<Record<AcknowledgementKey, boolean>>>({});
  const [country, setCountry] = useState("");
  const international = Boolean(country && country !== "GB");
  const questions = questionsForRoute(international ? "international_interest" : "uk_early_adopter");
  const presentation = presentations[international ? "international_interest" : "uk_early_adopter"];
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState("");
  const lock = useRef(false);
  const summary = useRef<HTMLDivElement>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current || review) return;
    lock.current = true; setBusy(true); setErrors({}); setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const body = { ...payload, presentationToken: presentation.token, challenges: form.getAll("challenges"), operatingCountries: form.getAll("operatingCountries"), ...Object.fromEntries(acknowledgements.map(([key]) => [key, form.get(key) === "on"])) };
    try {
      const response = await fetch("/api/vcse-eoi", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) { setErrors(result.errors || {}); setMessage(result.error || "Please try again later."); if (result.reviewRequired && result.presentations) setReview(result.presentations); }
      else { setReceipt(result.receipt); setMessage(result.message); }
    } catch { setMessage("We could not confirm your submission. Your entries are still here. Please retry; identical submissions receive the same receipt."); }
    finally { lock.current = false; setBusy(false); requestAnimationFrame(() => summary.current?.focus()); }
  }
  const controlClass = "mt-2 block min-h-12 w-full rounded-xl border border-slate-400 bg-white p-3 text-base text-slate-900";
  function error(key: string) { return errors[key] ? <span id={`${key}-error`} className="mt-2 block text-sm font-semibold text-red-800">{errors[key]}</span> : null; }
  return <div data-clarity-mask="true" className="vcse-form">
    {!open && <p className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 font-semibold">Preparation preview: expressions of interest are not open yet. This form is shown for review.</p>}
    <p className="mb-8 text-slate-600">Tell us about your organisation and its workflows. All fields are required unless marked optional. Please do not include beneficiary records, sensitive personal information or confidential documents.</p>
    <div ref={summary} tabIndex={-1} role={receipt ? "status" : "alert"} className={message ? "mb-8 rounded-2xl border border-teal-700 bg-teal-50 p-5" : ""}>
      {message && <><p>{message}</p>{receipt ? <p className="mt-3 break-all font-bold">Receipt: {receipt}</p> : <ul className="mt-3 space-y-2">{Object.entries(errors).map(([key, value]) => <li key={key}><a className="underline" href={`#${key}`}>{value}</a></li>)}</ul>}{review && <button type="button" className="button-secondary mt-4" onClick={() => { setPresentations(review); setReview(null); setAcknowledged({}); setErrors({}); setMessage("Please review the programme information and declarations below, then tick each acknowledgement again. Your other entries have been kept."); }}>Review updated declarations</button>}</>}
    </div>
    {!receipt && <form onSubmit={submit} noValidate aria-busy={busy}>
      <fieldset disabled={busy || !open} className="space-y-10">
        <legend className="sr-only">Expression of interest</legend>
        <div><label htmlFor="country" className="font-semibold">Country where your organisation is based</label>
          <select id="country" name="country" required value={country} onChange={e => { setCountry(e.target.value); setAcknowledged({}); }} aria-invalid={Boolean(errors.country)} aria-describedby={errors.country ? "country-error" : undefined} className={controlClass + " scroll-mt-32"}>
            <option value="">Please choose a country</option>{countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>{error("country")}
          {international && <div role="status" className="mt-5 rounded-2xl border border-teal-700/20 bg-teal-50 p-5 leading-7"><p>{internationalNotice}</p><p className="mt-3">The UK subsidy and full free-discovery package do not apply automatically. A relevant exploratory conversation may be offered individually; deployment availability is not guaranteed.</p></div>}
        </div>
        <div><label htmlFor="operatingCountries" className="font-semibold">Countries where your organisation operates</label><p id="operatingCountries-help" className="mt-2 text-sm text-slate-600">Select all that apply. On a keyboard, hold Control (Windows) or Command (Mac) to select multiple countries. You can also use Shift and the arrow keys for a range.</p>
          <select id="operatingCountries" name="operatingCountries" required multiple size={6} aria-invalid={Boolean(errors.operatingCountries)} aria-describedby={"operatingCountries-help" + (errors.operatingCountries ? " operatingCountries-error" : "")} className={controlClass}>
            {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>{error("operatingCountries")}
        </div>
        <div className="grid gap-6 md:grid-cols-2">{fields.filter(([key]) => key !== "country").map(([key, label, max]) => {
          const question = isStructuredKey(key) ? questions[key] : undefined;
          const options = question?.options || (key === "staffSize" || key === "volunteerSize" ? sizeBands.map(value => ({ value, label: value })) : null);
          const helper = question?.helper || (key === "tools" ? toolsHelper : undefined);
          const long = ["activities", "decisionInvolvement", "example", "tools", "participation", "approver", "commercialReadiness", "timing"].includes(key);
          const attributes = { id: key, name: key, required: key !== "website" && key !== "referral", "aria-invalid": Boolean(errors[key]), "aria-describedby": [helper ? `${key}-help` : "", errors[key] ? `${key}-error` : ""].filter(Boolean).join(" ") || undefined, className: controlClass };
          const visibleLabel = question?.label || (key === "tools" ? toolsLabel : label);
          return <div key={key === "commercialReadiness" || key === "participation" ? `${key}-${international ? "international" : "uk"}` : key} className={long ? "md:col-span-2" : ""}><label htmlFor={key} className="font-semibold">{visibleLabel}</label>
            {helper && <p id={`${key}-help`} className="mt-2 text-sm leading-6 text-slate-600">{helper}</p>}
            {options ? <select {...attributes} disabled={(key === "commercialReadiness" || key === "participation") && !country} defaultValue=""><option value="">Please choose</option>{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
              : long ? <textarea {...attributes} maxLength={max} rows={3} />
              : <input {...attributes} maxLength={max} type={key === "email" ? "email" : key === "website" ? "url" : "text"} autoComplete={key === "email" ? "email" : key === "contactName" ? "name" : key === "organisation" ? "organization" : "off"} />}
            {error(key)}</div>;
        })}</div>
        <fieldset id="challenges" tabIndex={-1} aria-describedby={errors.challenges ? "challenges-error" : undefined}>
          <legend className="font-semibold">Which operational challenges matter most? Choose up to three.</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">{challenges.map(c => <label key={c} className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-300 p-4"><input type="checkbox" name="challenges" value={c} className="h-5 w-5 shrink-0" />{c}</label>)}</div>{error("challenges")}
        </fieldset>
        <div id="declaration-review" className="space-y-5 scroll-mt-32"><p className="rounded-2xl bg-teal-50 p-5 leading-7">{presentation.offerSummary}</p><p><Link className="font-bold text-teal-800 underline" href="/research/vcse-digital-workspace/privacy" target="_blank" rel="noopener">Read the programme privacy information (opens in a new tab)</Link>.</p>
          <div id="eoi-boundary" className="space-y-3 rounded-2xl border border-teal-900/15 bg-white p-5 leading-7">{presentation.preDeclarationExplanation.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          {presentation.declarations.map(([key, label]) => <div key={key}><label className="flex items-start gap-3"><input className="mt-1 h-5 w-5 shrink-0" type="checkbox" name={key} id={key} checked={acknowledged[key] === true} onChange={e => setAcknowledged(previous => ({ ...previous, [key]: e.target.checked }))} required aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} /><span>{label}</span></label>{error(key)}</div>)}
          <p className="text-sm text-slate-600">These are acknowledgements, not a purchase contract or marketing consent. Submitting this form does not trigger payment or subscribe you to marketing.</p>
        </div>
        <div className="hidden" aria-hidden="true"><label htmlFor="companyFax">Leave blank</label><input id="companyFax" name="companyFax" tabIndex={-1} autoComplete="off" /></div>
        <button className="button-primary disabled:cursor-not-allowed disabled:opacity-60" disabled={!open || busy || Boolean(review)} type="submit">{busy ? "Saving your interest…" : international ? "Register international interest" : "Submit expression of interest"}</button>
      </fieldset>
    </form>}
  </div>;
}


export function InternationalInterestLink() {
  return <a href="#country" className="font-semibold text-teal-800 underline underline-offset-4" onClick={event => { event.preventDefault(); const field = document.getElementById("country"); field?.focus({ preventScroll: true }); field?.scrollIntoView({ behavior: "instant", block: "start" }); }}>Register your international interest.</a>;
}
