import type { Metadata } from "next";
import { Reveal } from "@/components/site/reveal";
import { QuoteForm } from "@/components/site/quote-form";
import { GoldButton, OutlineButton } from "@/components/site/gold-button";

export const metadata: Metadata = {
  title: "Contact Texcroft — Get a Garment Manufacturing Quote",
  description: "Coimbatore HQ, Tiruppur factory, WhatsApp, phone and email. We respond within 2 hours during business hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Reveal>
            <h1 className="tx-heading text-5xl font-extrabold">GET IN TOUCH</h1>
            <p className="mt-3 max-w-sm text-sm" style={{ color: "var(--tx-muted)" }}>
              We respond within 2 hours during business hours. Choose your preferred way to reach us.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <GoldButton href="#quote">Start a Project</GoldButton>
            <OutlineButton href="https://wa.me/919003377035">WhatsApp Us</OutlineButton>
            <OutlineButton href="tel:+919003377035">Call Us</OutlineButton>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 space-y-6 text-sm">
            <div>
              <p className="tx-heading text-xs font-bold" style={{ color: "var(--tx-gold)" }}>
                HEAD OFFICE
              </p>
              <p style={{ color: "var(--tx-muted)" }}>61, GKD Nagar, PN Palayam, Coimbatore – 641037, Tamil Nadu, India</p>
            </div>
            <div>
              <p className="tx-heading text-xs font-bold" style={{ color: "var(--tx-gold)" }}>
                FACTORY &amp; OFFICE
              </p>
              <p style={{ color: "var(--tx-muted)" }}>8/191, Angeripalayam Main Rd, A.V.P. Layout, Tiruppur 641603, Tamil Nadu, India</p>
            </div>
            <div>
              <p className="tx-heading text-xs font-bold" style={{ color: "var(--tx-gold)" }}>
                WORKING HOURS
              </p>
              <p style={{ color: "var(--tx-muted)" }}>Mon–Sat: 9:00 AM – 6:00 PM IST · Sun: Closed</p>
            </div>
            <div>
              <p className="tx-heading text-xs font-bold" style={{ color: "var(--tx-gold)" }}>
                EMAIL
              </p>
              <a href="mailto:info@texcroft.com" className="underline" style={{ color: "var(--tx-ink)" }}>
                info@texcroft.com
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} id="quote">
          <div className="rounded-2xl border p-8" style={{ borderColor: "var(--tx-line)" }}>
            <h2 className="tx-heading text-2xl font-extrabold">SEND YOUR REQUIREMENT</h2>
            <div className="mt-6">
              <QuoteForm source="website_quote" />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
