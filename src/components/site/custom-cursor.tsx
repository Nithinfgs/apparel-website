"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from "motion/react";

/**
 * A contextual cursor for the public site's highly visual areas (spec §33):
 * a small dot plus a lagging ring that expands and shows a short label when
 * hovering an element tagged `data-cursor="VIEW"` (etc). Desktop only —
 * disabled outright on touch devices and under prefers-reduced-motion, and
 * never replaces the native cursor's click affordance (pointer-events stay
 * on the real elements underneath; this is a purely visual overlay).
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  // Reads `window` in the lazy initializer — safe here only because this
  // component is imported with `next/dynamic({ ssr: false })` (see the
  // barrel below), so it never renders on the server and there is no
  // server-rendered markup for the client to reconcile against.
  const [enabled] = useState(() => typeof window !== "undefined" && !window.matchMedia("(pointer: coarse)").matches);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!enabled || reduceMotion) return;

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      setLabel(target?.getAttribute("data-cursor") ?? null);
    }
    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[999] h-1.5 w-1.5 rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%", backgroundColor: "var(--tx-gold)", opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[999] flex items-center justify-center rounded-full border mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--tx-gold)",
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: label ? 72 : 32, height: label ? 72 : 32 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="tx-heading text-[10px] font-bold tracking-wide text-white"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
