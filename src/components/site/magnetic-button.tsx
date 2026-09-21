"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "tx-heading relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold tracking-wide";

function useMagnetic(strength = 0.35) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, springX, springY, onMouseMove, onMouseLeave };
}

/** A gold pill CTA with a magnetic hover pull and an arrow that translates on hover — spec §32 microinteractions. */
export function MagneticButton({
  href,
  children,
  className,
  onClick,
  type,
  fullWidth,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
}) {
  const { ref, springX, springY, onMouseMove, onMouseLeave } = useMagnetic();
  const wrapperClass = fullWidth ? "block w-full" : "inline-block";

  const content = (
    <motion.div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ x: springX, y: springY }} className={wrapperClass}>
      <motion.span
        whileHover="hover"
        whileTap={{ scale: 0.96 }}
        className={cn(base, fullWidth && "w-full", className)}
        style={{ backgroundColor: "var(--tx-gold)", color: "var(--tx-gold-ink)" }}
      >
        <motion.span
          className="absolute inset-0"
          initial={{ x: "-100%" }}
          variants={{ hover: { x: "0%" } }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
        />
        <span className="relative">{children}</span>
        <motion.span className="relative" variants={{ hover: { x: 4 } }} transition={{ duration: 0.25 }}>
          →
        </motion.span>
      </motion.span>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cn(wrapperClass, "bg-transparent")}>
      {content}
    </button>
  );
}

/** Outline variant of MagneticButton — same pull/arrow interaction, transparent fill. */
export function MagneticOutlineButton({ href, children, className, onClick, type }: { href?: string; children: ReactNode; className?: string; onClick?: () => void; type?: "button" | "submit" }) {
  const { ref, springX, springY, onMouseMove, onMouseLeave } = useMagnetic();

  const content = (
    <motion.div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ x: springX, y: springY }} className="inline-block">
      <motion.span
        whileHover="hover"
        whileTap={{ scale: 0.96 }}
        className={cn(base, "border-2 bg-transparent", className)}
        style={{ borderColor: "var(--tx-gold)", color: "var(--tx-ink)" }}
      >
        <span className="relative">{children}</span>
        <motion.span className="relative" variants={{ hover: { x: 4 } }} transition={{ duration: 0.25 }}>
          →
        </motion.span>
      </motion.span>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className="inline-block bg-transparent">
      {content}
    </button>
  );
}
