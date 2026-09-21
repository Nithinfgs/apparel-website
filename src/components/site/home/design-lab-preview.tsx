"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GoldButton } from "@/components/site/gold-button";
import { TShirtSVG } from "@/components/site/garment-svg";
import { Reveal } from "@/components/site/reveal";

const SWATCHES = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#f5f5f0" },
  { name: "Royal Blue", hex: "#1a4fcf" },
  { name: "Forest Green", hex: "#1e5631" },
  { name: "Burgundy", hex: "#6b1f2a" },
  { name: "Mustard", hex: "#c99a3c" },
];

/** Homepage teaser for the full Design Lab (/design) — a real, working colour picker, not a static screenshot (spec §30). */
export function DesignLabPreview() {
  const [selected, setSelected] = useState(SWATCHES[2]);

  return (
    <section className="px-5 py-24 md:px-8" style={{ backgroundColor: "var(--tx-ink)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal className="flex justify-center">
          <motion.div key={selected.hex} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <TShirtSVG color={selected.hex} className="h-72 w-72" />
          </motion.div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs font-semibold tracking-[0.15em]" style={{ color: "var(--tx-gold)" }}>
            AI DESIGN LAB
          </p>
          <h2 className="tx-heading mt-3 text-4xl font-extrabold text-white md:text-5xl">DESIGN YOUR GARMENT</h2>
          <p className="mt-3 max-w-sm text-sm text-white/60">
            Pick a colour, upload or generate artwork, and send your configuration straight into Texcroft&apos;s production system.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {SWATCHES.map((s) => (
              <button
                key={s.hex}
                type="button"
                aria-label={s.name}
                onClick={() => setSelected(s)}
                className="h-9 w-9 rounded-full border border-white/30 transition-transform hover:scale-110"
                style={{ backgroundColor: s.hex, boxShadow: selected.hex === s.hex ? "0 0 0 2px var(--tx-gold)" : "none" }}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-white/50">{selected.name}</p>

          <div className="mt-8">
            <GoldButton href={`/design?colour=${encodeURIComponent(selected.hex)}&name=${encodeURIComponent(selected.name)}`}>
              Design Your Garment
            </GoldButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
