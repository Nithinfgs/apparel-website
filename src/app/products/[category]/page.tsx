import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GoldButton, OutlineButton } from "@/components/site/gold-button";
import { Reveal } from "@/components/site/reveal";
import { PUBLIC_PRODUCT_CATEGORIES, getPublicProductCategory } from "@/lib/site/products";

export function generateStaticParams() {
  return PUBLIC_PRODUCT_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getPublicProductCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.name} Manufacturer — GSM ${cat.gsm}`,
    description: cat.description,
    alternates: { canonical: `/products/${cat.slug}` },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getPublicProductCategory(category);
  if (!cat) notFound();

  const specs: { label: string; value: string }[] = [
    { label: "GSM Range", value: cat.gsm },
    { label: "Fabric", value: cat.fabric },
    { label: "Finishes", value: cat.finishes },
    { label: "MOQ", value: cat.moq },
    { label: "Colour Options", value: "Any Pantone reference or our 18-swatch base palette" },
    { label: "Size Options", value: "XS – XXL, or your size chart" },
  ];

  return (
    <div className="px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
        <Reveal className="lg:sticky lg:top-28">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl" style={{ backgroundColor: "#0f0f0f" }}>
            <Image src={cat.image} alt={cat.name} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" style={{ filter: "grayscale(10%) contrast(1.05)" }} />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.15em]" style={{ color: "var(--tx-gold)" }}>
              PRODUCT CATEGORY
            </p>
            <h1 className="tx-heading mt-2 text-5xl font-extrabold">{cat.name.toUpperCase()}</h1>
            <p className="mt-4 text-sm" style={{ color: "var(--tx-muted)" }}>
              {cat.description}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-8 divide-y" style={{ borderColor: "var(--tx-line)" }}>
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-6 border-t py-3 text-sm" style={{ borderColor: "var(--tx-line)" }}>
                  <dt className="font-semibold" style={{ color: "var(--tx-muted)" }}>
                    {s.label}
                  </dt>
                  <dd className="text-right">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
            <GoldButton href={`/design?product=${encodeURIComponent(cat.name)}`}>Customize in Design Lab</GoldButton>
            <OutlineButton href={`/contact?product=${encodeURIComponent(cat.name)}`}>Request Quote</OutlineButton>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
