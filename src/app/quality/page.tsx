import type { Metadata } from "next";
import { Reveal } from "@/components/site/reveal";
import { GoldButton } from "@/components/site/gold-button";

export const metadata: Metadata = {
  title: "Quality Assurance — GSM, AQL & Inline Inspection",
  description: "GSM verification, lab dip approvals, size set samples, inline audits, AQL 2.5/4.0 inspection. Quality is a system, not a final check.",
  alternates: { canonical: "/quality" },
};

const CHECKPOINTS = [
  { title: "GSM Verification", body: "Every fabric lot is weighed and tested against the approved GSM before cutting begins. No lot proceeds without sign-off." },
  { title: "Lab Dip Approvals", body: "Colour matching is done through lab dips with buyer sign-off before dyeing in bulk. Pantone references accepted." },
  { title: "Size Set Samples", body: "Full size set samples are produced and approved before bulk cutting. Measurement charts verified against tech pack." },
  { title: "Inline Measurement Audits", body: "Measurements are checked at cutting, stitching, and finishing stages during production — not just at the end." },
  { title: "Visual Defect Checks", body: "Every piece goes through visual inspection for stitching defects, stains, finishing issues, and packing compliance." },
  { title: "Packing Compliance", body: "Final packed goods are checked for correct labelling, folding, poly bag sealing, and carton markings before dispatch." },
  { title: "AQL-Based Inspection", body: "AQL 2.5 for major defects, AQL 4.0 for minor defects, as standard. Third-party and buyer-nominated inspectors welcome." },
];

export default function QualityPage() {
  return (
    <div>
      <div className="px-5 py-16 md:px-8" style={{ backgroundColor: "#fafafa" }}>
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h1 className="tx-heading text-5xl font-extrabold md:text-6xl">
              QUALITY THAT MATCHES
              <br />
              THE APPROVED SAMPLE
            </h1>
            <p className="mt-4 max-w-2xl text-sm" style={{ color: "var(--tx-muted)" }}>
              Quality isn&apos;t a final inspection. It&apos;s a system of checkpoints that starts before fabric is cut. We ship only what meets
              the approved standard.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKPOINTS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-2xl border p-6" style={{ borderColor: "var(--tx-line)" }}>
                <h2 className="tx-heading text-xl font-bold">{c.title.toUpperCase()}</h2>
                <p className="mt-2 text-sm" style={{ color: "var(--tx-muted)" }}>
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12">
          <div className="rounded-2xl p-10 text-center text-white" style={{ backgroundColor: "var(--tx-ink)" }}>
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-16">
              <div>
                <p className="tx-heading text-4xl font-extrabold" style={{ color: "var(--tx-gold)" }}>
                  AQL 2.5
                </p>
                <p className="text-xs tracking-wide text-white/60">MAJOR DEFECTS</p>
              </div>
              <div>
                <p className="tx-heading text-4xl font-extrabold" style={{ color: "var(--tx-gold)" }}>
                  AQL 4.0
                </p>
                <p className="text-xs tracking-wide text-white/60">MINOR DEFECTS</p>
              </div>
            </div>
            <p className="tx-heading mt-6 text-lg font-bold">ZERO DEFECT FORWARDING POLICY</p>
            <p className="mt-1 text-sm text-white/60">Ensuring every container meets technical specifications before departure.</p>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 text-center">
          <GoldButton href="/contact">Request a Quality-Focused Quote</GoldButton>
        </Reveal>
      </div>
    </div>
  );
}
