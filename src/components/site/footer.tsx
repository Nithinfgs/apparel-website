import Link from "next/link";
import { MagneticButton, MagneticOutlineButton } from "./magnetic-button";
import { SiteLogo } from "./logo";
import { Reveal } from "./reveal";

const FOOTER_LINKS = [
  { label: "Products", href: "/products" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Quality", href: "/quality" },
  { label: "Design Lab", href: "/design" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Buyer Portal", href: "/login" },
];

export function SiteFooter() {
  return (
    <>
      <section className="relative overflow-hidden px-5 py-24 md:px-8" style={{ backgroundColor: "var(--tx-ink)" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(45% 60% at 85% 50%, rgba(184,134,11,0.18) 0%, rgba(184,134,11,0) 70%)" }}
        />
        <Reveal className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:w-full">
            <h2 className="tx-heading text-5xl font-extrabold text-white md:text-7xl">
              READY TO START
              <br />
              <span style={{ color: "var(--tx-gold)" }}>PRODUCTION?</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/contact">Start a Project</MagneticButton>
              <MagneticOutlineButton href="https://wa.me/919003377035" className="!border-white/30 !text-white">
                WhatsApp
              </MagneticOutlineButton>
              <MagneticOutlineButton href="mailto:info@apparelops.demo" className="!border-white/30 !text-white">
                Email
              </MagneticOutlineButton>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="px-5 py-14 md:px-8" style={{ backgroundColor: "var(--tx-ink)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
          <div className="space-y-3">
            <SiteLogo dark />
            <p className="max-w-xs text-sm text-white/60">Full-service apparel production, Coimbatore &amp; Tiruppur, Tamil Nadu, India.</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-white/80 sm:grid-cols-4">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-xs text-white/40">© {new Date().getFullYear()} Apparel Studio. Coimbatore · Tiruppur, Tamil Nadu, India.</p>
      </footer>
    </>
  );
}
