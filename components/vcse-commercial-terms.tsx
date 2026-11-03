import { BadgeCheck, BadgePercent, Receipt } from "lucide-react";
import { ukCommercial } from "@/lib/vcse-declarations";

// Scoped to this section; these opaque pairs are checked against WCAG contrast.
export const commercialColors = {
  background: "#073c3e",
  onDark: "#ffffff",
  secondary: "#dcebea",
  card: "#fffcf6",
  label: "#142b3c",
  amount: "#a94708",
  icon: "#8f3d09",
  border: "#a97b50",
} as const;
const icons = [Receipt, BadgePercent, BadgeCheck];

export function VcseCommercialTerms() {
  return (
    <section id="commercial-terms" aria-labelledby="commercial-heading" className="section-space" style={{ backgroundColor: commercialColors.background, color: commercialColors.onDark }}>
      <div className="container-page">
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: commercialColors.secondary }}>Provisional commercial terms</p>
        <h2 id="commercial-heading" className="mt-5 max-w-4xl font-display text-3xl font-semibold leading-tight sm:text-4xl">{ukCommercial.headline}</h2>
        <div className="mt-7 max-w-4xl space-y-4 text-lg leading-8" style={{ color: commercialColors.secondary }}>
          <p>{ukCommercial.discoveryExplanation}</p>
          <p>{ukCommercial.postDiscoveryExplanation}</p>
        </div>

        <ul aria-label="Provisional implementation pricing" className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {ukCommercial.cards.map(([amount, label], index) => {
            const Icon = icons[index];
            return (
              <li key={label} className="min-w-0 rounded-[2rem] border p-6 shadow-sm lg:p-8" style={{ backgroundColor: commercialColors.card, color: commercialColors.label, borderColor: commercialColors.border }}>
                <Icon size={32} strokeWidth={1.8} aria-hidden="true" focusable="false" style={{ color: commercialColors.icon }} />
                <p className="mt-6 font-display text-4xl font-bold leading-tight xl:text-5xl" style={{ color: commercialColors.amount }}>{amount}</p>
                <h3 className="mt-4 text-lg font-bold leading-7">{label}</h3>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold leading-snug">{ukCommercial.paymentHeading}</h3>
            <p className="mt-5 leading-7" style={{ color: commercialColors.secondary }}>{ukCommercial.paymentBoundary}</p>
            <div className="mt-7 space-y-6">
              {ukCommercial.paymentOptions.map((option, index) => (
                <div key={option}>
                  <h4 className="text-lg font-bold">{ukCommercial.paymentOptionHeadings[index]}</h4>
                  <p className="mt-2 leading-7" style={{ color: commercialColors.secondary }}>{option}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold leading-snug">{ukCommercial.infrastructureHeading}</h3>
            <div className="mt-5 space-y-4 leading-7" style={{ color: commercialColors.secondary }}>
              <p>{ukCommercial.infrastructureExplanation}</p>
              <p>{ukCommercial.infrastructureConfirmation}</p>
            </div>
          </div>
        </div>
        <p className="mt-12 max-w-5xl border-t border-white/30 pt-6 text-base font-semibold leading-7">{ukCommercial.closingClarifier}</p>
      </div>
    </section>
  );
}
