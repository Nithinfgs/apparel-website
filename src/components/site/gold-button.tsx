import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base = "tx-heading inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0";

/** The one primary CTA style for the public site — gold fill, pill shape. Never a second accent colour (spec §2/§22). */
export function GoldButton({ href, children, className, onClick, type }: { href?: string; children: ReactNode; className?: string; onClick?: () => void; type?: "button" | "submit" }) {
  const classes = cn(base, "shadow-[0_1px_0_rgba(0,0,0,0.05)]", className);
  const style = { backgroundColor: "var(--tx-gold)", color: "var(--tx-gold-ink)" };
  if (href) {
    return (
      <Link href={href} className={classes} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={classes} style={style}>
      {children}
    </button>
  );
}

/** Secondary outline CTA — gold border, transparent fill. `dark` swaps the text colour for use on the near-black footer band. */
export function OutlineButton({
  href,
  children,
  className,
  onClick,
  type,
  dark,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  dark?: boolean;
}) {
  const classes = cn(base, "border-2 bg-transparent", className);
  const style = { borderColor: "var(--tx-gold)", color: dark ? "#ffffff" : "var(--tx-ink)" };
  if (href) {
    return (
      <Link href={href} className={classes} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={classes} style={style}>
      {children}
    </button>
  );
}
