import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { propertyTypesData } from "../../data/property-types";
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
    "Single tenant convenience stores and gas stations with credit rated tenants qualify as like-kind real estate.",
  "drive-thru-qsr":
    "Single tenant drive thru quick service restaurants with national brand tenants qualify as like-kind real estate.",
  pharmacy:
    "Single tenant pharmacy properties with credit rated tenants qualify as like-kind real estate.",
  "dollar-store":
    "Single tenant dollar store properties with national brand tenants qualify as like-kind real estate.",
  "coffee-drive-thru":
    "Single tenant coffee drive thru properties with national brand tenants qualify as like-kind real estate.",
  "auto-parts-retail":
    "Single tenant auto parts retail properties with credit rated tenants qualify as like-kind real estate.",
  "hard-discount-grocer":
    "Single tenant hard discount grocer properties with credit rated tenants qualify as like-kind real estate.",
  "ground-lease-outparcel":
    "Ground lease outparcel properties with long term leases qualify as like-kind real estate.",
  "urgent-care-medical-clinic":
    "Single tenant urgent care and medical clinic properties with healthcare tenants qualify as like-kind real estate.",
  "veterinary-clinic":
    "Single tenant veterinary clinic properties with healthcare tenants qualify as like-kind real estate.",
  "auto-service-oil-change":
    "Single tenant auto service and oil change properties with credit rated tenants qualify as like-kind real estate.",
  "tire-store":
    "Single tenant tire store properties with national brand tenants qualify as like-kind real estate.",
  "last-mile-logistics-flex":
    "Last mile logistics and flex properties with strong tenant demand qualify as like-kind real estate.",
  "specialty-grocer":
    "Single tenant specialty grocer properties with credit rated tenants qualify as like-kind real estate.",
  "telecom-wireless-retail":
    "Single tenant telecom and wireless retail properties with credit rated tenants qualify as like-kind real estate.",
  "dental-orthodontics":
    "Single tenant dental and orthodontics properties with healthcare tenants qualify as like-kind real estate.",
};

export default function PropertyTypesPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/locations/sunnyvale-1031-exchange.jpg"
          alt="Property Types"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-light uppercase tracking-[0.3em] text-white/70 mb-6">Property Types</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide">
            Qualified Properties
          </h1>
          <p className="mt-6 text-white/80 text-lg font-light max-w-2xl mx-auto">
            Property types that qualify as like-kind real estate for 1031 exchanges in California.
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Property Types" }]} />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {propertyTypesData.map((type) => (
            <Link
              key={type.slug}
              href={`/inventory/${type.slug}`}
              className="group block"
            >
              <div className="relative h-56 overflow-hidden mb-6">
                <Image
                  src={`/inventory/${type.slug}-1031-exchange.jpg`}
                  alt={`${type.name} properties`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <h2 className="text-xl text-gray-900 font-normal mb-3 group-hover:text-gray-600 transition-colors duration-300">
                {type.name}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                {propertyTypeDescriptions[type.slug] ||
                  "Single tenant properties with credit rated tenants qualify as like-kind real estate."}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-navy py-16 px-8 text-center">
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase">Need help finding replacement properties?</h2>
          <p className="mt-6 text-white/70 font-light max-w-2xl mx-auto">
            We can help you identify qualified replacement properties and coordinate your 1031 exchange timeline.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-gray-900 px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-100 transition-all duration-300"
            >
              Contact Us
            </Link>
            <a
              href="tel:+14085392254"
              className="inline-flex items-center justify-center border border-white/50 text-white px-10 py-4 text-xs font-light uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-300"
            >
              Call (408) 539-2254
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
