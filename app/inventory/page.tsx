import type { Metadata } from "next";
import Link from "next/link";
import { inventoryCategories } from "../../data/inventory-categories";
import { inventoryBatches01 as inventoryBatches } from "../../data";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "1031 Exchange Inventory | San Jose Commercial Real Estate",
  description: "Browse our nationwide inventory of single-tenant commercial properties perfect for 1031 exchanges. Credit-rated tenants, long-term leases, and stable cash flows.",
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/inventory",
  },
};

export default function InventoryPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Inventory" },
  ];

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Breadcrumbs items={breadcrumbItems} />
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Inventory</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">
              Nationwide 1031 Exchange Inventory
            </h1>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              Browse our curated selection of single-tenant commercial properties with credit-rated tenants,
              long-term leases, and stable cash flows. Perfect for 1031 exchange replacement properties.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inventoryCategories.map((category) => {
              const batchData = (inventoryBatches.inventorySpotlight01 as any).find(
                (item: any) => item.type === category.slug
              );

              return (
                <Link
                  key={category.slug}
                  href={category.route}
                  className="group rounded-2xl border border-[#E0E7FF] bg-white p-6 shadow-md transition hover:border-[#3B82F6] hover:shadow-lg"
                >
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={`/inventory/${category.slug}-1031-exchange.jpg`}
                      alt={`${category.name} properties`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0F172A] group-hover:text-[#3B82F6] transition mb-2">
                    {category.name.replace(" Inventory", "")}
                  </h3>
                  {batchData && (
                    <p className="text-sm text-[#4B5563] line-clamp-3">
                      {batchData.copy}
                    </p>
                  )}
                  {category.note && (
                    <p className="text-xs text-[#6B7280] mt-2 italic">
                      {category.note}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-sm text-[#4B5563] max-w-2xl mx-auto">
              All properties featured in our inventory are available through licensed Qualified Intermediaries.
              Contact us to discuss specific opportunities and coordinate your 1031 exchange.
            </p>
          </div>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "1031 Exchange Inventory",
            description: "Nationwide inventory of single-tenant commercial properties for 1031 exchanges",
          }),
        }}
      />
    </div>
  );
}
