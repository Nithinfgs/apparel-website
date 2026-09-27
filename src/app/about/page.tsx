import type { Metadata } from "next";
import { Reveal } from "@/components/site/reveal";
import { QuoteForm } from "@/components/site/quote-form";

export const metadata: Metadata = {
  title: "About Us — Full-Service Apparel Manufacturing Partner",
  description: "A full-service apparel production partner based in Tiruppur, India's knit manufacturing capital.",
  alternates: { canonical: "/about" },
};

const PILLARS = [
  { title: "SINGLE POINT OF ACCOUNTABILITY", body: "One team manages your entire production lifecycle, from fabric sourcing to shipment. No coordination between multiple vendors." },
  { title: "FULL VISIBILITY", body: "Daily production updates and milestone tracking mean you always know exactly where your order stands." },
  { title: "QUALITY AS A SYSTEM", body: "We don't just take orders — we help you produce correctly, guiding you through tech packs and specs from the first conversation." },
];

export default function AboutPage() {
  return (
    <div>
      <div className="px-5 py-16 md:px-8" style={{ backgroundColor: "#fafafa" }}>
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h1 className="tx-heading text-5xl font-extrabold md:text-6xl">
              YOUR MANUFACTURING
              <br />
              PARTNER
            </h1>
            <p className="mt-4 max-w-2xl text-sm" style={{ color: "var(--tx-muted)" }}>
              We are a full-service apparel production company based in Tiruppur, India&apos;s knit manufacturing capital. We produce
              finished garments for clothing brands, private labels, importers, wholesalers, and corporate buyers across Europe, the US, the
              Middle East, the UK, Australia and beyond.
            </p>
            <p className="mt-4 max-w-2xl text-sm" style={{ color: "var(--tx-muted)" }}>
              We operate dedicated production units in Tiruppur alongside a network of vetted partner factories — giving us the
              flexibility to handle orders from 50 pieces all the way to large-scale bulk production without compromising on oversight or
              quality.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8">
        <Reveal>
          <blockquote className="tx-heading border-l-4 pl-6 text-2xl font-bold italic" style={{ borderColor: "var(--tx-gold)" }}>
            &ldquo;We win when you win. Our reputation is built on delivering what we promise — the right product, on time, at the agreed quality
            standard.&rdquo;
          </blockquote>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="border-t pt-4" style={{ borderColor: "var(--tx-line)" }}>
                <h2 className="tx-heading text-lg font-extrabold">{p.title}</h2>
                <p className="mt-2 text-sm" style={{ color: "var(--tx-muted)" }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="px-5 py-16 md:px-8" style={{ backgroundColor: "#fafafa" }} id="quote">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="tx-heading text-3xl font-extrabold">SEND YOUR REQUIREMENT</h2>
            <p className="mt-1 text-sm" style={{ color: "var(--tx-muted)" }}>
              We typically respond within 2 hours during business hours.
            </p>
          </Reveal>
          <div className="mt-6">
            <QuoteForm source="website_quote" />
          </div>
        </div>
      </div>
    </div>
  );
}
