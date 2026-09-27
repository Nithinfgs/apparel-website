"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/site/reveal";
import { HeroFabricArt } from "@/components/site/fabric-art";

const CAPABILITIES = [
  { n: "01", title: "Product Development", body: "Tech packs built or refined from your brief, before a single sample is cut." },
  { n: "02", title: "Fabric & Trim Sourcing", body: "GSM-verified lots from vetted Tiruppur mills, matched trims and hardware." },
  { n: "03", title: "Sampling", body: "Proto, fit, lab dip and size set — signed off before bulk ever starts." },
  { n: "04", title: "Manufacturing", body: "Cutting through finishing, tracked daily across owned and partner units." },
  { n: "05", title: "Quality Control", body: "Inline checks at every stage, AQL-based final inspection before packing." },
  { n: "06", title: "Packing & Export", body: "Export-ready cartons, full documentation, coordinated worldwide dispatch." },
];

/**
 * A dark, numbered capability grid — replaces a plain bulleted list +
 * floating-badge garment icon (both read as generic template filler) with
 * the same bold, asymmetric language as the hero and footer, so the
 * homepage reads as one continuous world rather than a dark hero followed
 * by default light-template sections.
 */
export function WhatWeDo() {
  return (
    <section className="relative overflow-hidden px-5 py-28 md:px-8" style={{ backgroundColor: "var(--tx-ink)" }}>
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <HeroFabricArt className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em]" style={{ color: "var(--tx-gold)" }}>
            OUR CAPABILITIES
          </p>
          <h2 className="tx-heading mt-3 max-w-4xl text-5xl font-extrabold text-white md:text-7xl">
            ONE PARTNER.
            <br />
            <span style={{ color: "var(--tx-gold)" }}>THE ENTIRE PRODUCTION JOURNEY.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.n} delay={(i % 3) * 0.06}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(184,134,11,0.08)" }}
                className="group h-full p-8"
                style={{ backgroundColor: "var(--tx-ink)" }}
              >
                <span className="tx-heading text-lg font-extrabold" style={{ color: "var(--tx-gold)" }}>
                  {c.n}
                </span>
                <h3 className="tx-heading mt-4 text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
                  {c.title.toUpperCase()}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{c.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
