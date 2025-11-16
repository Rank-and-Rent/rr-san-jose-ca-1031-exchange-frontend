import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { inventoryCategories } from "../../../data/inventory-categories";
import { inventoryBatches01 as inventoryBatches } from "../../../data";
import Breadcrumbs from "../../../components/Breadcrumbs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return inventoryCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = inventoryCategories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Inventory Category Not Found",
    };
  }

  return {
    title: `${category.name} | San Jose 1031 Exchange Inventory`,
    description: `Browse ${category.name.toLowerCase()} for 1031 exchange opportunities`,
    alternates: {
      canonical: `https://www.1031exchangesanjose.com${category.route}`,
    },
  };
}

export default async function InventoryPage({ params }: Props) {
  const { slug } = await params;
  const category = inventoryCategories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const batchData = (inventoryBatches.inventorySpotlight01 as any).find(
    (item: any) => item.type === slug
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Inventory", href: "/inventory" },
    { label: category.name },
  ];

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`/inventory/${slug}-1031-exchange.jpg`}
            alt={`${category.name} for 1031 exchange investments`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {category.name}
              </h1>
              {batchData && (
                <p className="text-xl text-white/90">
                  {batchData.copy}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbItems} />
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <article className="space-y-12">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Inventory</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">
              {category.name}
            </h1>
            {batchData && (
              <div className="text-lg text-[#4B5563] max-w-3xl">
                {batchData.copy}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-[#3B82F6] bg-gradient-to-br from-[#EFF6FF] to-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Ready to explore {category.name.toLowerCase()}?</h2>
            <p className="mt-4 text-[#4B5563]">
              Contact us to learn more about available {category.name.toLowerCase()} and how we can help with your 1031 exchange.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <Link
                href={`/contact?projectType=${encodeURIComponent(category.name)}`}
                className="inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
              >
                Contact Us
              </Link>
              <a
                href="tel:+14085392254"
                className="inline-flex items-center justify-center rounded-full border border-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6] transition hover:bg-[#EFF6FF]"
              >
                Call (408) 539-2254
              </a>
            </div>
          </div>
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: category.name,
            description: `Browse ${category.name.toLowerCase()} for 1031 exchange opportunities`,
          }),
        }}
      />
    </div>
  );
}
