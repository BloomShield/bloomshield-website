import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpenCheck, Mail } from "lucide-react";
import { InsightsShell } from "./insights-shell";
import type { InsightAuthor } from "@/lib/insights";

type InsightArticleProps = {
  category: string;
  crossTag: string;
  title: string;
  date: string;
  dateIso: string;
  authors: InsightAuthor[];
  publisher: string;
  standfirst: string;
  image: string;
  imageAlt: string;
  domains: string[];
  ccpeLens?: string[];
  tags?: string[];
  reflectionQuestion?: string;
  linkedinDiscussionUrl?: string;
  engagementContactLabel?: string;
  children: React.ReactNode;
  implementationLesson: React.ReactNode;
  references: { label: string; href: string; source: string }[];
  previous?: { label: string; href: string };
  next?: { label: string; href: string };
};

export function InsightArticle({ category, crossTag, title, date, dateIso, authors, publisher, standfirst, image, imageAlt, domains, ccpeLens, tags, reflectionQuestion, linkedinDiscussionUrl, engagementContactLabel = "Contact BloomShield", children, implementationLesson, references, previous, next }: InsightArticleProps) {
  return <InsightsShell>
    <article>
      <header className="bg-[#f7f5ef]">
        <div className="container-page py-14 md:py-20">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900"><ArrowLeft aria-hidden="true" size={18}/> All Insights</Link>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-xs font-extrabold uppercase tracking-[.15em] text-teal-700"><span className="rounded-full border border-teal-700/25 px-4 py-2">{category}</span><span>{crossTag}</span></div>
          <h1 className="mt-7 max-w-5xl font-display text-4xl font-semibold leading-[1.1] tracking-[-.035em] text-ink sm:text-5xl lg:text-[3.5rem]">{title}</h1>
          <p className="mt-8 max-w-[52rem] border-l-2 border-[#b9892f] pl-5 text-[1.2rem] leading-8 text-slate-700 sm:pl-7 sm:text-[1.4rem] sm:leading-9">{standfirst}</p>
          <div className="mt-9 max-w-[52rem] border-t border-teal-900/10 pt-7">
            <p className="text-lg text-slate-700">By <strong className="text-ink">{authors.map(author => author.name).join(" & ")}</strong></p>
            {authors.map(author => <p key={author.id} className="mt-2 text-sm italic leading-6 text-slate-600">{[author.credentials, author.affiliation].filter(Boolean).join(" | ")}</p>)}
            <time dateTime={dateIso} className="mt-3 block text-sm italic text-slate-600">{date}</time>
            <p className="mt-4 text-xs font-bold uppercase tracking-[.14em] text-teal-700">Published by {publisher}</p>
          </div>
        </div>
        <div className="container-page pb-12 md:pb-16"><div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-teal-900"><Image src={image} alt={imageAlt} fill sizes="(min-width: 1240px) 1150px, 100vw" className="object-cover" priority /></div></div>
      </header>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_15.5rem] lg:py-24">
        <div className="insight-prose min-w-0">
          {children}
          <aside className="my-14 rounded-[1.5rem] border-l-4 border-[#b9892f] bg-[#f3ead6] p-7 sm:p-9" aria-labelledby="implementation-lesson">
            <BookOpenCheck aria-hidden="true" className="text-[#75551b]" />
            <h2 id="implementation-lesson" className="mt-5 !text-2xl">Implementation Lesson</h2>
            <div className="mt-4 text-[1.0625rem] leading-8 text-slate-700">{implementationLesson}</div>
          </aside>
          <section aria-labelledby="ccpe-lens" className="my-12 rounded-[1.5rem] bg-[#073b3b] p-7 text-white sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#e7bd68]">Cancer Care Partnership Ecosystem</p>
            <h2 id="ccpe-lens" className="mt-4 !text-2xl !text-white sm:!text-3xl">CCPE Lens</h2>
            {ccpeLens?.length ? <ol className="mt-6 flex list-none flex-wrap items-center gap-3 !pl-0" aria-label="CCPE implementation cycle">{ccpeLens.map((stage, index) => <li className="flex items-center gap-3 !pl-0 font-bold" key={stage}><span className="rounded-full border border-[#e7bd68]/50 px-4 py-2">{stage}</span>{index < ccpeLens.length - 1 ? <span aria-hidden="true" className="text-[#e7bd68]">→</span> : null}</li>)}</ol> : null}
            <p className="mt-4 text-lg leading-8 text-white/75">This Insight is indexed through the domains most relevant to implementation and equitable impact.</p>
            <div className="relative mt-7 pt-5">
              <span aria-hidden="true" className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-gradient-to-b from-[#e7bd68]/80 to-[#e7bd68]/20" />
              <div className="rounded-xl border border-white/15 bg-white/[.06] px-5 py-4 sm:flex sm:items-center sm:gap-5 sm:px-6">
                <p className="shrink-0 text-[.68rem] font-extrabold uppercase tracking-[.18em] text-[#e7bd68]">Cross-cutting domains</p>
                <span aria-hidden="true" className="hidden h-7 w-px bg-white/20 sm:block" />
                <ul className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2 !pl-0 sm:mt-0 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5" aria-label="CCPE cross-cutting domains">{domains.map(domain => <li className="flex items-center gap-2 !pl-0 text-sm font-bold text-white/90" key={domain}><span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e7bd68]" />{domain}</li>)}</ul>
              </div>
            </div>
          </section>
          <section aria-labelledby="references">
            <h2 id="references">References and source links</h2>
            <ol className="mt-6 space-y-5">
              {references.map(reference => <li key={reference.href} className="pl-2"><a href={reference.href} target="_blank" rel="noopener noreferrer" className="font-bold text-teal-700 underline decoration-teal-700/30 underline-offset-4 hover:decoration-teal-700">{reference.label}</a><span className="mt-1 block text-sm text-slate-500">{reference.source}</span></li>)}
            </ol>
          </section>
          <section aria-labelledby="about-the-author">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">Contributor</p>
            <h2 id="about-the-author" className="mt-4">{authors.length > 1 ? "About the authors" : "About the author"}</h2>
            <div className="mt-7 space-y-6">
              {authors.map(author => <div className="rounded-[1.5rem] border border-teal-900/10 bg-white p-7 sm:p-8" key={author.id}>
                <h3 className="!mt-0">{author.name}</h3>
                {author.credentials ? <p className="!mt-2 italic text-slate-600">{author.credentials}</p> : null}
                {author.affiliation ? <p className="!mt-1 italic text-slate-600">{author.affiliation}</p> : null}
                <p>{author.biography}</p>
              </div>)}
            </div>
          </section>
          <section aria-label="Article engagement">
            {reflectionQuestion ? <div className="rounded-[1.5rem] border border-[#b9892f]/25 bg-[#f3ead6] p-7 sm:p-9">
              <p className="!mt-0 text-xs font-extrabold uppercase tracking-[.18em] text-[#75551b]">A question for reflection</p>
              <p className="mt-5 font-display text-[1.35rem] font-semibold leading-[1.4] text-ink sm:text-[1.55rem]">{reflectionQuestion}</p>
            </div> : null}
            <div className={`grid gap-4 ${reflectionQuestion ? "mt-6" : ""} ${linkedinDiscussionUrl ? "sm:grid-cols-2" : ""}`}>
              {linkedinDiscussionUrl ? <a href={linkedinDiscussionUrl} target="_blank" rel="noopener noreferrer" aria-label="Join the conversation about this article on LinkedIn (opens in a new tab)" className="group rounded-[1.5rem] border border-teal-900/15 bg-white p-6 text-ink transition hover:border-teal-700/35 hover:shadow-[0_24px_55px_-38px_rgba(12,64,56,.45)] sm:p-7">
                <span className="flex items-start justify-between gap-4"><span><span className="block font-display text-xl font-semibold text-teal-900">Join the conversation on LinkedIn</span><span className="mt-3 block text-base leading-7 text-slate-600">Share your perspective and tag BloomShield CIC.</span></span><ArrowUpRight aria-hidden="true" className="mt-1 shrink-0 text-[#85601e] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={21} /></span>
              </a> : null}
              <div className="rounded-[1.5rem] border border-teal-900/10 bg-[#f7f5ef] p-6 sm:p-7">
                <Mail aria-hidden="true" className="text-[#85601e]" size={22} />
                <h3 className="!mt-5 !text-xl">Corrections, evidence or partnership follow-up</h3>
                <p className="!mt-3 text-base leading-7 text-slate-600">If you would like to suggest a correction, share relevant evidence, explore a partnership or continue the discussion in more depth, contact BloomShield.</p>
                <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800">{engagementContactLabel}<ArrowRight aria-hidden="true" size={17} /></Link>
              </div>
            </div>
          </section>
        </div>
        <aside className="lg:sticky lg:top-36 lg:h-fit" aria-label="Article details">
          <div className="rounded-[1.5rem] border border-teal-900/10 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">Publication</p>
            <h2 className="mt-4 font-display text-2xl font-semibold">{publisher}</h2>
            <p className="mt-3 text-sm font-semibold text-ink">{category}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Published <time dateTime={dateIso}>{date}</time></p>
          </div>
          <div className="mt-5 rounded-[1.5rem] border border-teal-900/10 bg-[#f7f5ef] p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-teal-700">Tags</p><ul className="mt-4 flex flex-wrap gap-2">{(tags ?? [category, crossTag, ...domains]).map(tag => <li className="rounded-full bg-white px-3 py-2 text-xs font-bold text-teal-800" key={tag}>{tag}</li>)}</ul></div>
        </aside>
      </div>

      <nav aria-label="Article navigation" className="border-t border-teal-900/10 bg-white">
        <div className="container-page grid gap-4 py-10 sm:grid-cols-2">
          {previous ? <Link href={previous.href} className="rounded-2xl border border-teal-900/10 p-5 font-bold text-teal-800"><span className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Previous</span><span className="flex items-center gap-2"><ArrowLeft aria-hidden="true" size={17}/>{previous.label}</span></Link> : <span />}
          {next ? <Link href={next.href} className="rounded-2xl border border-teal-900/10 p-5 text-right font-bold text-teal-800"><span className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Next</span><span className="flex items-center justify-end gap-2">{next.label}<ArrowRight aria-hidden="true" size={17}/></span></Link> : null}
        </div>
      </nav>
    </article>
  </InsightsShell>;
}
