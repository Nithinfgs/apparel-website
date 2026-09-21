"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { ThreadJourneySVG, type JourneyStop } from "@/components/site/fabric-art";
import type { ProcessStep } from "@/lib/site/process";

const VIEWBOX_H = 720;

function stopsFor(count: number): JourneyStop[] {
  const xs = [150, 205, 95, 205, 95, 150, 205, 95];
  const marginTop = 70;
  const usable = VIEWBOX_H - marginTop * 2;
  return Array.from({ length: count }, (_, i) => ({
    cx: xs[i % xs.length],
    cy: marginTop + (usable * i) / (count - 1),
  }));
}

function StepPanel({ step }: { step: ProcessStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <span className="text-xs font-semibold tracking-[0.2em]" style={{ color: "var(--tx-gold)" }}>
        STEP {step.step} — {step.duration}
      </span>
      <h3 className="tx-heading mt-3 text-4xl font-extrabold text-white md:text-5xl">{step.title.toUpperCase()}</h3>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60">{step.body}</p>
      <p className="mt-4 text-xs font-semibold text-white/80">
        WHAT YOU GET: <span className="font-normal text-white/50">{step.outcome}</span>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {step.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-medium text-white/70">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Signature moment — a scroll-driven "garment journey" replacing a static
 * step list. The page scrolls through a tall pinned section; a single
 * thread draws itself (via scroll-linked `pathLength`, not time) through 6
 * stitch nodes while the active step's content crossfades in the pinned
 * viewport. The active step is a discrete value derived from scroll
 * progress (`useMotionValueEvent`, not a continuous per-panel
 * interpolation) — simpler and more robust than crossfading every panel's
 * own opacity curve. Falls back to a plain stacked list under
 * prefers-reduced-motion (spec §39).
 */
export function HowWeWorkJourney({ steps }: { steps: ProcessStep[] }) {
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });
  const stops = stopsFor(steps.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  if (reduceMotion) {
    return (
      <div className="px-5 py-16 md:px-8" style={{ backgroundColor: "var(--tx-ink)" }}>
        <div className="mx-auto max-w-3xl space-y-14">
          {steps.map((s) => (
            <div key={s.step}>
              <span className="text-xs font-semibold tracking-[0.2em]" style={{ color: "var(--tx-gold)" }}>
                STEP {s.step} — {s.duration}
              </span>
              <h3 className="tx-heading mt-3 text-3xl font-extrabold text-white">{s.title.toUpperCase()}</h3>
              <p className="mt-3 text-sm text-white/60">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} style={{ height: `${steps.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: "var(--tx-ink)" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(55% 45% at 20% 50%, rgba(184,134,11,0.14) 0%, rgba(184,134,11,0) 70%)" }}
        />
        <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-8 px-5 md:grid-cols-[280px_1fr] md:px-8">
          <div className="hidden h-[80vh] md:block">
            <ThreadJourneySVG progress={scrollYProgress} stops={stops} viewBoxHeight={VIEWBOX_H} />
          </div>
          <div className="relative h-64 md:h-80">
            <AnimatePresence mode="wait">
              <StepPanel key={steps[activeIndex].step} step={steps[activeIndex]} />
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-[0.25em] text-white/40">
          SCROLL TO FOLLOW THE PROCESS
        </div>
      </div>
    </div>
  );
}
