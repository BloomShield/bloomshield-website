export function SectionHeading({ eyebrow, title, intro, align = "left" }: { eyebrow?: string; title: string; intro?: string; align?: "left" | "center" }) {
  return <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>{eyebrow && <p className={`eyebrow ${align === "center" ? "before:hidden" : ""}`}>{eyebrow}</p>}<h2 className="heading">{title}</h2>{intro && <p className="lead mt-5">{intro}</p>}</div>;
}
