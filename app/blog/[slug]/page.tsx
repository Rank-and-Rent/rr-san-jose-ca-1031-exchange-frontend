import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { PortableText } from "@portabletext/react";

type Props = {
  params: Promise<{ slug: string }>;
};

type BlogPost = {
  title: string;
  slug: string;
  excerpt?: string;
  seoTitle?: string;
  canonicalUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: { name: string };
  featuredImage?: any;
  content?: any;
  showCTA?: boolean;
  ctaHeader?: string;
  ctaButtonLink?: string;
  ctaButtonText?: string;
};

// Placeholder - replace with Sanity query when connected
const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  // This will be replaced with actual Sanity query
  return null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.excerpt,
    alternates: {
      canonical: post.canonicalUrl || `https://www.1031exchangesanjose.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Breadcrumbs items={breadcrumbItems} />
      <main className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <article className="space-y-12">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Article</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">{post.title}</h1>
            {post.excerpt && <p className="text-lg text-[#4B5563]">{post.excerpt}</p>}
            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
              {post.publishedAt && <time>{new Date(post.publishedAt).toLocaleDateString()}</time>}
              {post.author && <span>By {post.author.name}</span>}
            </div>
          </div>

          {post.featuredImage && (
            <div className="aspect-video rounded-3xl bg-[#F3F4F6] overflow-hidden">
              {/* Image will be rendered here */}
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {post.content && <PortableText value={post.content} />}
          </div>

          {post.showCTA && (
            <div className="rounded-3xl border border-[#3B82F6] bg-gradient-to-br from-[#EFF6FF] to-white p-8 text-center">
              <h2 className="text-2xl font-semibold text-[#0F172A]">{post.ctaHeader || "Ready to get started?"}</h2>
              <Link
                href={post.ctaButtonLink || "/contact"}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
              >
                {post.ctaButtonText || "Contact Us"}
              </Link>
            </div>
          )}
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            author: post.author
              ? {
                  "@type": "Person",
                  name: post.author.name,
                }
              : undefined,
            publisher: {
              "@type": "Organization",
              name: "1031 Exchange San Jose",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.label,
              item: item.href ? `https://www.1031exchangesanjose.com${item.href}` : undefined,
            })),
          }),
        }}
      />
    </div>
  );
}

