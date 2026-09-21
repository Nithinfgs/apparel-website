import type { Metadata } from "next";
import { Reveal } from "@/components/site/reveal";
import { GoldButton } from "@/components/site/gold-button";
import { HowWeWorkJourney } from "@/components/site/how-we-work-journey";
import { PROCESS_STEPS } from "@/lib/site/process";

export const metadata: Metadata = {
  title: "How We Work — 6-Step Garment Manufacturing Process",
  description: "A structured 6-step process from requirements to export-ready cartons. MOQ from 50 pieces.",
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  return (
    <div>
      <div className="px-5 py-16 md:px-8" style={{ backgroundColor: "#fafafa" }}>
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h1 className="tx-heading text-5xl font-extrabold md:text-6xl">HOW WE WORK</h1>
            <p className="mt-2 text-xs font-semibold tracking-wide" style={{ color: "var(--tx-gold)" }}>
              FULL SERVICE APPAREL PRODUCTION COMPANY
            </p>
            <p className="mt-4 max-w-2xl text-sm" style={{ color: "var(--tx-muted)" }}>
              A structured 6-step process that gives you complete visibility and control — from your first brief to export-ready cartons. Minimum
              order quantities start from 50 pieces. Scroll to follow the thread through each stage.
            </p>
          </Reveal>
        </div>
      </div>

      <HowWeWorkJourney steps={PROCESS_STEPS} />

      <div className="px-5 py-16 text-center md:px-8">
        <GoldButton href="/contact">Get a Quote</GoldButton>
      </div>
    </div>
  );
}
