"use client";

import { motion } from "motion/react";

/**
 * A shaded, studio-lit garment illustration (no photography assets exist in
 * this environment — see docs/HANDOFF.md). Built from layered gradients
 * (base fill, ambient-occlusion shading, a soft sheen highlight, rib-knit
 * collar detail, fold lines and a ground shadow) so it reads as a rendered
 * product shot rather than a flat icon. The recolour path only ever
 * changes the base-fill gradient's stops — shading/highlights stay
 * constant, exactly like a real dye change on a real garment.
 */
function shadeStops(hex: string) {
  // Cheap perceived-lightness estimate to decide whether shading/highlight
  // layers should be light-on-dark or dark-on-light.
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return {
    isDark: lum < 0.5,
  };
}

const BODY_D =
  "M104 26 L64 58 L22 98 L54 132 L78 112 L78 306 L222 306 L222 112 L246 132 L278 98 L236 58 L196 26" +
  " C196 26 182 46 150 46 C118 46 104 26 104 26 Z";
const COLLAR_D = "M104 26 C104 26 118 46 150 46 C182 46 196 26 196 26";
const COLLAR_INNER_D = "M116 30 C116 30 128 40 150 40 C172 40 184 30 184 30";

export function TShirtSVG({ color = "#e5e5e5", className, id = "tshirt" }: { color?: string; className?: string; id?: string }) {
  const { isDark } = shadeStops(color);
  const gid = `g-${id}`;
  return (
    <svg viewBox="0 0 300 330" className={className} role="img" aria-label="T-shirt preview">
      <defs>
        <linearGradient id={`${gid}-base`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={isDark ? 0.92 : 1} />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity={isDark ? 1 : 0.88} />
        </linearGradient>
        <radialGradient id={`${gid}-sheen`} cx="35%" cy="18%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isDark ? 0.28 : 0.55} />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${gid}-ao`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="78%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity={isDark ? 0.22 : 0.12} />
        </linearGradient>
        <filter id={`${gid}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#000000" floodOpacity="0.18" />
        </filter>
      </defs>

      <ellipse cx="150" cy="318" rx="95" ry="10" fill="#000000" opacity="0.08" />

      <g filter={`url(#${gid}-shadow)`}>
        <path d={BODY_D} fill={`url(#${gid}-base)`} stroke="#000" strokeOpacity={isDark ? 0.35 : 0.12} strokeWidth="1.5" />
        <path d={BODY_D} fill={`url(#${gid}-ao)`} />
        <path d={BODY_D} fill={`url(#${gid}-sheen)`} />

        {/* Fold / seam lines for fabric realism */}
        <path d="M90 150 Q150 158 210 150" fill="none" stroke="#000" strokeOpacity={isDark ? 0.18 : 0.08} strokeWidth="1.5" />
        <path d="M96 200 Q150 207 204 200" fill="none" stroke="#000" strokeOpacity={isDark ? 0.14 : 0.06} strokeWidth="1.5" />
        <path d="M80 112 L80 300" fill="none" stroke="#000" strokeOpacity={isDark ? 0.16 : 0.07} strokeWidth="1.2" />
        <path d="M220 112 L220 300" fill="none" stroke="#000" strokeOpacity={isDark ? 0.16 : 0.07} strokeWidth="1.2" />

        {/* Rib-knit collar */}
        <path d={COLLAR_D} fill="none" stroke="#000" strokeOpacity={isDark ? 0.3 : 0.18} strokeWidth="3" />
        <path d={COLLAR_INNER_D} fill="none" stroke="#000" strokeOpacity={isDark ? 0.35 : 0.22} strokeWidth="2" />
      </g>
    </svg>
  );
}

/** Same illustration, but the fill colour crossfades smoothly on change (Design Lab step 2 — spec §16: "do not instant-switch harshly"). */
export function AnimatedTShirtSVG({ color, className, id = "tshirt-anim" }: { color: string; className?: string; id?: string }) {
  const { isDark } = shadeStops(color);
  const gid = `g-${id}`;
  return (
    <svg viewBox="0 0 300 330" className={className} role="img" aria-label="T-shirt preview">
      <defs>
        <linearGradient id={`${gid}-base`} x1="0" y1="0" x2="1" y2="1">
          <motion.stop offset="0%" animate={{ stopColor: color, stopOpacity: isDark ? 0.92 : 1 }} transition={{ duration: 0.45 }} />
          <motion.stop offset="55%" animate={{ stopColor: color }} transition={{ duration: 0.45 }} />
          <motion.stop offset="100%" animate={{ stopColor: color, stopOpacity: isDark ? 1 : 0.88 }} transition={{ duration: 0.45 }} />
        </linearGradient>
        <radialGradient id={`${gid}-sheen`} cx="35%" cy="18%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isDark ? 0.28 : 0.55} />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${gid}-ao`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="78%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity={isDark ? 0.22 : 0.12} />
        </linearGradient>
        <filter id={`${gid}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#000000" floodOpacity="0.18" />
        </filter>
      </defs>

      <ellipse cx="150" cy="318" rx="95" ry="10" fill="#000000" opacity="0.08" />

      <g filter={`url(#${gid}-shadow)`}>
        <motion.path
          d={BODY_D}
          fill={`url(#${gid}-base)`}
          animate={{ strokeOpacity: isDark ? 0.35 : 0.12 }}
          stroke="#000"
          strokeWidth="1.5"
        />
        <path d={BODY_D} fill={`url(#${gid}-ao)`} />
        <path d={BODY_D} fill={`url(#${gid}-sheen)`} />
        <path d="M90 150 Q150 158 210 150" fill="none" stroke="#000" strokeOpacity={isDark ? 0.18 : 0.08} strokeWidth="1.5" />
        <path d="M96 200 Q150 207 204 200" fill="none" stroke="#000" strokeOpacity={isDark ? 0.14 : 0.06} strokeWidth="1.5" />
        <path d="M80 112 L80 300" fill="none" stroke="#000" strokeOpacity={isDark ? 0.16 : 0.07} strokeWidth="1.2" />
        <path d="M220 112 L220 300" fill="none" stroke="#000" strokeOpacity={isDark ? 0.16 : 0.07} strokeWidth="1.2" />
        <path d={COLLAR_D} fill="none" stroke="#000" strokeOpacity={isDark ? 0.3 : 0.18} strokeWidth="3" />
        <path d={COLLAR_INNER_D} fill="none" stroke="#000" strokeOpacity={isDark ? 0.35 : 0.22} strokeWidth="2" />
      </g>
    </svg>
  );
}
