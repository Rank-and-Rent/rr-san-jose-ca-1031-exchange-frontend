import type { Metadata } from "next";
import Link from "next/link";
import { propertyTypesData } from "../../data/property-types";
import SearchInput from "../../components/SearchInput";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "1031 Exchange Property Types | San Jose Qualified Properties",
  description:
    "Learn about property types that qualify for 1031 exchanges including multifamily, industrial, retail, office, and more in California.",
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/property-types",
  },
};

const propertyTypeDescriptions: Record<string, string> = {
  "convenience-store-gas-c-store":
    "Single tenant convenience stores and gas stations with credit rated tenants qualify as like-kind real estate for 1031 exchanges.",
  "drive-thru-qsr":
    "Single tenant drive thru quick service restaurants with national brand tenants qualify as like-kind real estate for 1031 exchanges.",
  pharmacy:
    "Single tenant pharmacy properties with credit rated tenants qualify as like-kind real estate for 1031 exchanges.",
  "dollar-store":
    "Single tenant dollar store properties with national brand tenants qualify as like-kind real estate for 1031 exchanges.",
  "coffee-drive-thru":
    "Single tenant coffee drive thru properties with national brand tenants qualify as like-kind real estate for 1031 exchanges.",
  "auto-parts-retail":
    "Single tenant auto parts retail properties with credit rated tenants qualify as like-kind real estate for 1031 exchanges.",
  "hard-discount-grocer":
    "Single tenant hard discount grocer properties with credit rated tenants qualify as like-kind real estate for 1031 exchanges.",
  "ground-lease-outparcel":
    "Ground lease outparcel properties with long term leases qualify as like-kind real estate for 1031 exchanges.",
  "urgent-care-medical-clinic":
    "Single tenant urgent care and medical clinic properties with healthcare tenants qualify as like-kind real estate for 1031 exchanges.",
  "veterinary-clinic":
    "Single tenant veterinary clinic properties with healthcare tenants qualify as like-kind real estate for 1031 exchanges.",
  "auto-service-oil-change":
    "Single tenant auto service and oil change properties with credit rated tenants qualify as like-kind real estate for 1031 exchanges.",
  "tire-store":
    "Single tenant tire store properties with national brand tenants qualify as like-kind real estate for 1031 exchanges.",
  "last-mile-logistics-flex":
    "Last mile logistics and flex properties with strong tenant demand qualify as like-kind real estate for 1031 exchanges.",
  "specialty-grocer":
    "Single tenant specialty grocer properties with credit rated tenants qualify as like-kind real estate for 1031 exchanges.",
  "telecom-wireless-retail":
    "Single tenant telecom and wireless retail properties with credit rated tenants qualify as like-kind real estate for 1031 exchanges.",
  "dental-orthodontics":
    "Single tenant dental and orthodontics properties with healthcare tenants qualify as like-kind real estate for 1031 exchanges.",
};

export default function PropertyTypesPage() {
  const propertyItems = propertyTypesData.map((p) => ({
    title: p.name,
    slug: `/inventory/${p.slug}`,
  }));

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Property Types" }]} />
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="space-y-12">
          <div className="space-y-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Property Types</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">
              Qualified Property Types for 1031 Exchanges
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-[#4B5563]">
              Learn about property types that qualify as like-kind real estate for 1031 exchanges in California.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SearchInput
              placeholder="Search property types..."
              items={propertyItems}
              contactRedirectPrefix=""
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {propertyTypesData.map((type) => (
              <Link
                key={type.slug}
                href={`/inventory/${type.slug}`}
                className="group rounded-3xl border border-[#E0E7FF] bg-white p-6 shadow-lg transition hover:border-[#3B82F6] hover:shadow-lg block"
              >
                <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={`/inventory/${type.slug}-1031-exchange.jpg`}
                    alt={`${type.name} properties for 1031 exchanges`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2 className="text-xl font-semibold text-[#0F172A] group-hover:text-[#3B82F6] transition">{type.name}</h2>
                <p className="mt-3 text-sm text-[#4B5563]">
                  {propertyTypeDescriptions[type.slug] ||
                    "Single tenant properties with credit rated tenants qualify as like-kind real estate for 1031 exchanges."}
                </p>
              </Link>
            ))}
          </div>

          <div className="rounded-3xl border border-[#3B82F6] bg-gradient-to-br from-[#EFF6FF] to-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Need help finding replacement properties?</h2>
            <p className="mt-4 text-[#4B5563]">
              We can help you identify qualified replacement properties and coordinate your 1031 exchange timeline.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
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
        </div>
      </main>
    </div>
  );
}


