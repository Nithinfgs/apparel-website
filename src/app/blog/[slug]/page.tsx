import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { GoldButton } from "@/components/site/gold-button";
import { BLOG_POSTS, getBlogPost } from "@/lib/site/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Texcroft" },
    publisher: { "@type": "Organization", name: "Texcroft" },
  };

  return (
    <article className="px-5 py-16 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="tx-heading text-xs font-bold" style={{ color: "var(--tx-gold)" }}>
            {post.category.toUpperCase()}
          </p>
          <h1 className="tx-heading mt-2 text-4xl font-extrabold md:text-5xl">{post.title.toUpperCase()}</h1>
          <time dateTime={post.date} className="mt-3 block text-xs" style={{ color: "var(--tx-muted)" }}>
            {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · Team Texcroft
          </time>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 space-y-4 text-base" style={{ color: "var(--tx-ink)" }}>
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex items-center justify-between border-t pt-6" style={{ borderColor: "var(--tx-line)" }}>
            <Link href="/blog" className="text-sm underline">
              ← All articles
            </Link>
            <GoldButton href="/contact" className="px-5 py-2.5 text-xs">
              Get a Quote
            </GoldButton>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
