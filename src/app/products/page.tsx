import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { PUBLIC_PRODUCT_CATEGORIES } from "@/lib/site/products";

export const metadata: Metadata = {
  title: "Products — Custom Apparel Manufacturing",
  description: "Kids & baby wear, innerwear, sleepwear, workwear, hoodies, polos and crew necks — GSM-verified, MOQ from 50 pieces.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <div className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h1 className="tx-heading text-5xl font-extrabold md:text-6xl">WHAT WE MANUFACTURE</h1>
          <p className="mt-3 max-w-xl text-sm" style={{ color: "var(--tx-muted)" }}>
            Each product category is manufactured with precise specs, GSM-verified fabrics, and consistent quality control. Minimum order: 50
            pieces per style.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PUBLIC_PRODUCT_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={(i % 3) * 0.06}>
              <Link
                href={`/products/${cat.slug}`}
                data-cursor="VIEW"
                className="group relative block h-72 overflow-hidden rounded-2xl"
                style={{ backgroundColor: "#0f0f0f" }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "grayscale(15%) contrast(1.05)" }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.92) 100%)" }}
                />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <h2 className="tx-heading text-xl font-bold leading-tight text-white">{cat.name.toUpperCase()}</h2>
                  <dl className="mt-2 space-y-0.5 text-xs text-white/60">
                    <div className="flex justify-between gap-2">
                      <dt className="font-semibold">GSM</dt>
                      <dd className="text-right">{cat.gsm}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="font-semibold">MOQ</dt>
                      <dd className="text-right">{cat.moq}</dd>
                    </div>
                  </dl>
                  <span
                    className="tx-heading mt-3 inline-flex w-fit items-center gap-1 text-xs font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ color: "var(--tx-gold)" }}
                  >
                    EXPLORE →
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/0 transition-colors duration-300 group-hover:border-[var(--tx-gold)]/60" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
