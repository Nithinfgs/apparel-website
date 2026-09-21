"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/reveal";
import { PUBLIC_PRODUCT_CATEGORIES } from "@/lib/site/products";

function ProductCard({ cat, big = false, delay = 0 }: { cat: (typeof PUBLIC_PRODUCT_CATEGORIES)[number]; big?: boolean; delay?: number }) {
  return (
    <Reveal delay={delay} className={big ? "md:row-span-2" : ""}>
      <Link
        href={`/products/${cat.slug}`}
        data-cursor="VIEW"
        className="group relative block h-full overflow-hidden rounded-2xl"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
          <Image
            src={cat.image}
            alt={cat.name}
            fill
            sizes={big ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 768px) 22vw, 100vw"}
            className="object-cover"
            style={{ filter: "grayscale(15%) contrast(1.05)" }}
          />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-300 group-hover:opacity-90"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.92) 100%)" }}
        />

        <div className={`relative flex h-full flex-col justify-end p-6 ${big ? "min-h-[420px] md:p-8" : "min-h-[220px]"}`}>
          <span className="text-[10px] font-semibold tracking-[0.2em] text-white/60">{cat.gsm}</span>
          <h3 className={`tx-heading mt-1 font-extrabold text-white ${big ? "text-4xl" : "text-xl"}`}>{cat.name.toUpperCase()}</h3>
          <p className="mt-1 text-xs text-white/60">{cat.moq} MOQ</p>
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
  );
}

export function ProductRail() {
  const featured = PUBLIC_PRODUCT_CATEGORIES.slice(4, 9);
  const [feature, ...rest] = featured;

  return (
    <section className="px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between gap-4">
          <h2 className="tx-heading text-5xl font-extrabold md:text-7xl">WHAT WE MANUFACTURE</h2>
          <Link href="/products" className="hidden text-sm font-semibold underline sm:block">
            View all products →
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <ProductCard cat={feature} big />
          {rest.slice(0, 4).map((cat, i) => (
            <ProductCard key={cat.slug} cat={cat} delay={0.06 * (i + 1)} />
          ))}
        </div>

        <Link href="/products" className="mt-6 block text-sm font-semibold underline sm:hidden">
          View all products →
        </Link>
      </div>
    </section>
  );
}
