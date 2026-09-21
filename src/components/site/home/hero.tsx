"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { MagneticButton, MagneticOutlineButton } from "@/components/site/magnetic-button";
import { HeroFabricArt } from "@/components/site/fabric-art";

const HEADLINE_LINE_1 = "FROM YOUR VISION";
const HEADLINE_LINE_2 = "TO FINISHED GARMENT";

function SplitLine({ text, delayStart, className, style }: { text: string; delayStart: number; className?: string; style?: React.CSSProperties }) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  let letterIndex = 0;
  return (
    <span className={className} style={{ ...style, display: "inline-block" }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", overflow: "hidden", whiteSpace: "nowrap", verticalAlign: "top" }}>
          {Array.from(word).map((ch, i) => {
            const delay = delayStart + letterIndex * 0.02;
            letterIndex += 1;
            return (
              <motion.span
                key={i}
                initial={reduceMotion ? false : { y: "112%", rotate: 5 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "inline-block" }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/**
 * Signature moment #1 — a dark, cinematic, asymmetric hero. Oversized type
 * breaks out of a centered grid and overlaps an abstract gold thread-art
 * field (spec follow-up: literal garment clipart read as generic; this
 * replaces it with Texcroft's own visual language). The thread field
 * responds to cursor position with a slow parallax drift.
 * prefers-reduced-motion renders the resting state immediately, with no
 * parallax tracking.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.6 });
  const artX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const artY = useTransform(springY, [-0.5, 0.5], [-14, 14]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={stageRef}
      onPointerMove={handlePointerMove}
      className="relative isolate -mt-[76px] min-h-[92vh] overflow-hidden"
      style={{ backgroundColor: "var(--tx-ink)" }}
    >
      {/* vignette + spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 55% at 78% 30%, rgba(184,134,11,0.22) 0%, rgba(184,134,11,0.05) 45%, rgba(0,0,0,0) 72%)," +
            "radial-gradient(120% 90% at 50% 100%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Abstract thread-art field, full bleed, drifts with cursor */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ x: artX, y: artY }}>
        <HeroFabricArt className="h-full w-full" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-between px-5 pt-32 pb-16 md:px-10">
        <div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-white/70"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: "var(--tx-gold)" }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--tx-gold)" }} />
            </span>
            FULL SERVICE APPAREL PRODUCTION — TIRUPPUR, TAMIL NADU
          </motion.p>

          <h1 className="tx-heading mt-6 text-white">
            <span className="block text-[15vw] leading-[0.85] sm:text-[11vw] lg:text-[8.2vw]">
              <SplitLine text={HEADLINE_LINE_1} delayStart={0.15} />
            </span>
            <span
              className="ml-[4vw] block text-[15vw] leading-[0.85] sm:text-[11vw] lg:ml-[10vw] lg:text-[8.2vw]"
              style={{
                backgroundImage: "linear-gradient(90deg, #8a6510, var(--tx-gold) 40%, #f0d68e 55%, var(--tx-gold) 70%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              <span className="tx-shimmer inline-block">
                <SplitLine text={HEADLINE_LINE_2} delayStart={0.55} />
              </span>
            </span>
          </h1>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.15 }}
            className="max-w-md text-base leading-relaxed text-white/60"
          >
            From sampling and sourcing to bulk manufacturing, quality control and worldwide dispatch — Texcroft handles the complete garment
            production journey.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <span data-cursor="GO">
              <MagneticButton href="/contact">Start a Project</MagneticButton>
            </span>
            <span data-cursor="VIEW">
              <MagneticOutlineButton href="/products" className="!border-white/30 !text-white">
                Explore Products
              </MagneticOutlineButton>
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.5, ease: "backOut" }}
          className="tx-heading absolute top-28 right-5 flex h-24 w-24 rotate-6 flex-col items-center justify-center rounded-full text-center shadow-2xl md:right-10"
          style={{ backgroundColor: "var(--tx-gold)", color: "#fff" }}
        >
          <span className="text-2xl font-extrabold leading-none">50</span>
          <span className="text-[9px] tracking-wide">PCS MOQ</span>
        </motion.div>
      </div>

      {!reduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        >
          <span className="text-[10px] font-semibold tracking-[0.25em] text-white/50">SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="h-8 w-px bg-white/40" />
        </motion.div>
      )}
    </section>
  );
}
