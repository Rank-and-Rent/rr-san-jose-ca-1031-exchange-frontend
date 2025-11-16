import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog | 1031 Exchange San Jose Articles and Guides",
  description:
    "Articles, guides, and insights about 1031 exchanges, replacement property identification, and tax deferral strategies for San Jose investors.",
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/blog",
  },
};

type BlogPostPreview = {
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: any;
};

// Placeholder - replace with Sanity query when connected
const getBlogPosts = async (page: number = 1, perPage: number = 6): Promise<BlogPostPreview[]> => {
  // This will be replaced with actual Sanity query
  return [];
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const perPageDesktop = 6;
  const perPageMobile = 3;
  const posts = await getBlogPosts(currentPage, perPageDesktop);

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="space-y-12">
          <div className="space-y-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Blog</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">
              1031 Exchange Articles and Guides
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-[#4B5563]">
              Learn about 1031 exchanges, replacement property identification, and tax deferral strategies.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#4B5563]">No blog posts available yet. Check back soon.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group rounded-3xl border border-[#E0E7FF] bg-white p-6 shadow-lg transition hover:border-[#3B82F6] hover:shadow-blue-100"
                  >
                    {post.featuredImage && (
                      <div className="mb-4 aspect-video rounded-2xl bg-[#F3F4F6] overflow-hidden">
                        {/* Image will be rendered here */}
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-[#0F172A] group-hover:text-[#3B82F6] transition">
                      {post.title}
                    </h2>
                    {post.excerpt && <p className="mt-3 text-sm text-[#4B5563] line-clamp-3">{post.excerpt}</p>}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] group-hover:gap-3 transition-all">
                      Read more
                      <span aria-hidden>→</span>
                    </span>
                  </Link>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                {currentPage > 1 && (
                  <Link
                    href={`/blog?page=${currentPage - 1}`}
                    className="rounded-full border border-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6] transition hover:bg-[#EFF6FF]"
                  >
                    Previous
                  </Link>
                )}
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
                >
                  Next
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

