"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";

/**
 * Texcroft's abstract visual language for brand/storytelling moments —
 * flowing thread lines and stitch nodes rendered in gold/white, standing in
 * for literal garment photography (which doesn't exist in this
 * environment) with something more art-directed than product-shot clipart.
 * Used in the hero and the How We Work scroll journey.
 */

const THREADS = [
  { d: "M-40 120 C 120 40, 260 220, 420 90 S 700 40, 860 160", width: 1.4, opacity: 0.55, color: "var(--tx-gold)", delay: 0 },
  { d: "M-40 260 C 140 180, 300 360, 480 240 S 720 260, 900 340", width: 1, opacity: 0.3, color: "#ffffff", delay: 0.15 },
  { d: "M-40 40 C 160 140, 260 -20, 440 60 S 680 160, 880 20", width: 1, opacity: 0.22, color: "#ffffff", delay: 0.3 },
  { d: "M-40 380 C 120 320, 320 460, 500 360 S 760 420, 900 480", width: 1.2, opacity: 0.4, color: "var(--tx-gold)", delay: 0.45 },
];

/** Hero-scale ambient thread field — draws in once, then drifts gently. */
export function HeroFabricArt({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <svg viewBox="0 0 860 440" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {THREADS.map((t, i) => (
        <motion.path
          key={i}
          d={t.d}
          fill="none"
          stroke={t.color}
          strokeWidth={t.width}
          strokeOpacity={t.opacity}
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: t.opacity,
            x: reduceMotion ? 0 : [0, 8, 0],
          }}
          transition={{
            pathLength: { duration: 1.8, delay: 0.4 + t.delay, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 1, delay: 0.4 + t.delay },
            x: { duration: 8 + i, repeat: Infinity, ease: "easeInOut", delay: 2 },
          }}
        />
      ))}
      {/* stitch nodes along the primary thread */}
      {[120, 300, 480, 660].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={90 + (i % 2 === 0 ? 0 : 30)}
          r={3}
          fill="var(--tx-gold)"
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 1.4 + i * 0.12, duration: 0.4, ease: "backOut" }}
        />
      ))}
    </svg>
  );
}

export interface JourneyStop {
  cx: number;
  cy: number;
}

/**
 * A single continuous thread whose draw progress is driven by scroll
 * (`progress`, a 0..1 MotionValue from useScroll) rather than time — the
 * spine of the How We Work "garment journey". Stitch nodes light up gold
 * once the thread has reached them.
 */
export function ThreadJourneySVG({ progress, stops, viewBoxHeight }: { progress: MotionValue<number>; stops: JourneyStop[]; viewBoxHeight: number }) {
  const path = stops.reduce((acc, s, i) => (i === 0 ? `M ${s.cx} ${s.cy}` : `${acc} L ${s.cx} ${s.cy}`), "");

  return (
    <svg viewBox={`0 0 300 ${viewBoxHeight}`} className="h-full w-full" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      {/* faint full track */}
      <path d={path} fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="2" strokeLinecap="round" />
      {/* progress-drawn thread */}
      <motion.path d={path} fill="none" stroke="var(--tx-gold)" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: progress }} />
      {stops.map((s, i) => {
        const nodeThreshold = i / (stops.length - 1);
        return <JourneyNode key={i} cx={s.cx} cy={s.cy} progress={progress} threshold={nodeThreshold} index={i} />;
      })}
    </svg>
  );
}

function JourneyNode({ cx, cy, progress, threshold, index }: { cx: number; cy: number; progress: MotionValue<number>; threshold: number; index: number }) {
  const scale = useTransform(progress, [Math.max(0, threshold - 0.04), threshold], [0.7, 1]);
  const dotOpacity = useTransform(progress, [Math.max(0, threshold - 0.04), threshold], [0.3, 1]);
  return (
    <motion.g style={{ scale, transformOrigin: `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r={7} fill="var(--tx-ink)" stroke="var(--tx-gold)" strokeWidth={2} />
      <motion.circle cx={cx} cy={cy} r={3} fill="var(--tx-gold)" style={{ opacity: dotOpacity }} />
      <text x={cx} y={cy + 4.5} textAnchor="middle" fontSize="7" fill="#fff" fontWeight="700">
        {index + 1}
      </text>
    </motion.g>
  );
}
