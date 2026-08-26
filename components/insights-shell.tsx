import Link from "next/link";
import { InsightsMark } from "./insights-mark";

const links = [
  ["Overview", "/insights"],
  ["Conversations", "/insights/conversations"],
  ["Evidence & Policy", "/insights#evidence-policy"],
] as const;

export function InsightsShell({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#f7f5ef]">
    <div className="border-b border-white/10 bg-[#062f2f] text-white">
      <div className="container-page flex min-w-0 flex-col gap-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
        <InsightsMark light />
        <nav aria-label="Insights navigation" className="min-w-0 sm:ml-auto">
          <ul className="flex flex-wrap gap-x-2 gap-y-2 text-sm font-semibold text-white/75">
            {links.map(([label, href]) => <li key={href}><Link className="inline-flex min-h-10 items-center rounded-full px-4 transition hover:bg-white/10 hover:text-white" href={href}>{label}</Link></li>)}
          </ul>
        </nav>
      </div>
    </div>
    {children}
  </div>;
}
