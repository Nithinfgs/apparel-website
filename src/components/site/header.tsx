"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SiteLogo } from "./logo";
import { MagneticButton } from "./magnetic-button";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Quality", href: "/quality" },
  { label: "Design Lab", href: "/design" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

function NavLink({ href, label, dark }: { href: string; label: string; dark: boolean }) {
  return (
    <Link href={href} className="group relative text-sm font-medium tracking-wide" style={{ color: dark ? "#ffffff" : "var(--tx-ink)" }}>
      {label}
      <span
        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
        style={{ backgroundColor: "var(--tx-gold)" }}
      />
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  // Only the homepage opens on a full-bleed dark hero — everywhere else the
  // page starts on a white background, so the header must stay dark-on-white
  // from the first frame. Once scrolled, the blurred white pill reads fine
  // on any page, so it always switches to the light styling.
  const overDarkHero = pathname === "/" && !scrolled;

  // Close the mobile drawer on navigation — adjusted during render (React's
  // recommended pattern for "reset state when a prop changes") rather than
  // in an effect, so it doesn't fire an extra post-navigation render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(1.6)" : "none",
        boxShadow: scrolled ? "0 1px 0 var(--tx-line)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <SiteLogo dark={overDarkHero} />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} dark={overDarkHero} />
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/login" className="text-sm font-semibold" style={{ color: overDarkHero ? "#ffffff" : "var(--tx-ink)" }}>
            Track Order
          </Link>
          <MagneticButton href="/contact" className="px-5 py-2.5 text-xs">
            Get a Quote
          </MagneticButton>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          style={{ color: overDarkHero && !mobileOpen ? "#ffffff" : "var(--tx-ink)" }}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-7 bg-white px-8 lg:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                <Link href={link.href} className="tx-heading text-4xl font-bold" style={{ color: "var(--tx-ink)" }}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + NAV_LINKS.length * 0.05 }}>
              <Link href="/login" className="text-lg font-semibold" style={{ color: "var(--tx-muted)" }}>
                Track Order
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + NAV_LINKS.length * 0.05 }}
              className="mt-2"
            >
              <MagneticButton href="/contact" fullWidth className="py-4 text-sm">
                Get a Quote
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
