import { EcosystemDiagram } from "./ecosystem-diagram";

export function AboutHero() {
  return (
    <section data-hero="about" className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-emerald-600/20" viewBox="0 0 1440 760" fill="none" preserveAspectRatio="none">
        <path d="M550 118c130 118 220-63 344 28s232 34 361-74" stroke="currentColor" />
        <path d="M610 640c148-106 232 76 364-22s219-38 335 34" stroke="currentColor" />
        <circle cx="842" cy="127" r="6" fill="currentColor" />
        <circle cx="1292" cy="292" r="8" fill="currentColor" />
      </svg>
      <div className="container-page relative grid items-center gap-10 pb-8 pt-16 sm:gap-14 sm:py-20 md:min-h-[650px] md:py-24 lg:grid-cols-[.88fr_1.12fr] lg:gap-12 lg:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-teal-700">About BloomShield</p>
          <h1 className="display max-w-4xl text-[2.85rem] sm:text-6xl lg:text-[4.35rem]">Implementation shaped by communities, evidence and care.</h1>
          <p className="lead mt-8 max-w-2xl text-xl leading-9">BloomShield CIC connects community wisdom, implementation science and responsible innovation to reduce inequalities in cancer prevention across diverse communities and health systems.</p>
        </div>
        <EcosystemDiagram />
      </div>
    </section>
  );
}
