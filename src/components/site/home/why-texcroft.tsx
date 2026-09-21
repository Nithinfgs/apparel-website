import { Reveal } from "@/components/site/reveal";

const PILLARS = [
  { title: "LOW MOQ", body: "Start from 50 pcs." },
  { title: "ONE POINT OF CONTACT", body: "From development through dispatch." },
  { title: "PRODUCTION VISIBILITY", body: "Track progress through the Texcroft system." },
  { title: "QUALITY CONTROL", body: "Inline inspection and final AQL-based checks." },
];

export function WhyTexcroft() {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.15em]" style={{ color: "var(--tx-gold)" }}>
            WHY BUYERS CHOOSE TEXCROFT
          </p>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="border-t pt-5" style={{ borderColor: "var(--tx-line)" }}>
                <h3 className="tx-heading text-xl font-extrabold">{p.title}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--tx-muted)" }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
