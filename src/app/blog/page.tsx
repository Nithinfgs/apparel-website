import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { BLOG_POSTS } from "@/lib/site/blog";

export const metadata: Metadata = {
  title: "Manufacturing Knowledge — Industry Insights & Guides",
  description: "Practical guides for brands, buyers, and businesses on garment production, quality standards, and sourcing fundamentals.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h1 className="tx-heading text-5xl font-extrabold md:text-6xl">MANUFACTURING KNOWLEDGE</h1>
          <p className="mt-3 max-w-xl text-sm" style={{ color: "var(--tx-muted)" }}>
            Practical guides for brands, buyers, and businesses on garment production, quality standards, and sourcing fundamentals.
          </p>
        </Reveal>

        <div className="mt-12 divide-y" style={{ borderColor: "var(--tx-line)" }}>
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 4) * 0.05}>
              <Link href={`/blog/${post.slug}`} className="group grid gap-2 border-t py-8 sm:grid-cols-[140px_1fr]" style={{ borderColor: "var(--tx-line)" }}>
                <span className="tx-heading text-xs font-bold" style={{ color: "var(--tx-gold)" }}>
                  {post.category.toUpperCase()}
                </span>
                <div>
                  <h2 className="tx-heading text-2xl font-extrabold leading-tight group-hover:underline">{post.title.toUpperCase()}</h2>
                  <p className="mt-2 text-sm" style={{ color: "var(--tx-muted)" }}>
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
