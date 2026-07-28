import { ExternalLink, FileText } from "lucide-react";

type ProgrammeTheme = "green" | "coral" | "blue";

const themeStyles = {
  green: {
    card: "border-emerald-900/10 bg-gradient-to-br from-white to-emerald-50",
    eyebrow: "text-emerald-700",
    icon: "bg-emerald-800 text-white",
    title: "text-emerald-950",
    button: "bg-emerald-800 text-white hover:bg-emerald-900 focus-visible:ring-emerald-700",
  },
  coral: {
    card: "border-[#a9432d]/15 bg-gradient-to-br from-white to-[#fff3ee]",
    eyebrow: "text-[#a9432d]",
    icon: "bg-[#b84d32] text-white",
    title: "text-[#71301f]",
    button: "bg-[#a9432d] text-white hover:bg-[#873822] focus-visible:ring-[#a9432d]",
  },
  blue: {
    card: "border-blue-900/15 bg-gradient-to-br from-white to-[#edf0ff]",
    eyebrow: "text-[#3858c7]",
    icon: "bg-[#3858c7] text-white",
    title: "text-[#1d337d]",
    button: "bg-[#2946a2] text-white hover:bg-[#1d337d] focus-visible:ring-[#3858c7]",
  },
} satisfies Record<ProgrammeTheme, Record<string, string>>;

export function ProgrammeOverviewDownload({
  programmeName,
  pdfUrl,
  theme,
  volume,
  fileSize,
  accessibleLabel,
}: {
  programmeName: string;
  pdfUrl: string;
  theme: ProgrammeTheme;
  volume: number;
  fileSize: string;
  accessibleLabel: string;
}) {
  const styles = themeStyles[theme];

  return (
    <article className={`min-w-0 rounded-[2rem] border p-7 shadow-soft sm:p-9 ${styles.card}`}>
      <div className="flex min-w-0 items-start gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.icon}`}>
          <FileText aria-hidden="true" size={24} />
        </span>
        <div className="min-w-0">
          <p className={`text-xs font-bold uppercase tracking-[.18em] ${styles.eyebrow}`}>
            BloomShield Programme Portfolio · Volume {volume}
          </p>
          <h2 className={`mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl ${styles.title}`}>
            {programmeName} Programme Overview
          </h2>
        </div>
      </div>
      <p className="mt-6 leading-7 text-slate-600">
        A concise introduction to the programme&apos;s purpose, model, implementation approach and intended outcomes.
      </p>
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${accessibleLabel} (opens in a new tab)`}
        className={`mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto ${styles.button}`}
      >
        Download Programme Overview
        <ExternalLink aria-hidden="true" className="shrink-0" size={17} />
      </a>
      <p className="mt-4 text-sm font-semibold text-slate-600">
        PDF · 7 pages · {fileSize} · opens in a new tab
      </p>
    </article>
  );
}
