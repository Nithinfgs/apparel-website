import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/site/home/hero";
import { TrustStrip } from "@/components/site/home/trust-strip";
import { WhatWeDo } from "@/components/site/home/what-we-do";
import { ProductRail } from "@/components/site/home/product-rail";
import { WhyTexcroft } from "@/components/site/home/why-texcroft";
import { DesignLabPreview } from "@/components/site/home/design-lab-preview";
import { BuyerVisibility } from "@/components/site/home/buyer-visibility";
import { QuoteForm } from "@/components/site/quote-form";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Texcroft — From Your Vision to Finished Garment",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhatWeDo />
      <ProductRail />
      <WhyTexcroft />
      <DesignLabPreview />
      <BuyerVisibility />

      <section className="px-5 py-24 md:px-8" id="quote">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-wide" style={{ color: "var(--tx-gold)" }}>
              SEND YOUR REQUIREMENT
            </p>
            <h2 className="tx-heading mt-2 text-4xl font-extrabold md:text-5xl">WE RESPOND FAST.</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--tx-muted)" }}>
              We typically respond within 2 hours during business hours. Or{" "}
              <Link href="/blog" className="underline">
                read our manufacturing guides
              </Link>{" "}
              first.
            </p>
          </Reveal>
          <div className="mt-8">
            <QuoteForm source="website_quote" />
          </div>
        </div>
      </section>
    </>
  );
}
