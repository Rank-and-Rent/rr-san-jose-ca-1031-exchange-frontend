import type { Metadata } from "next";
import Link from "next/link";
import { locationsData } from "../../data/locations";
import SearchInput from "../../components/SearchInput";
import Breadcrumbs from "../../components/Breadcrumbs";
import { LOCATIONS_ROUTE, USE_SERVICE_AREAS } from "../../lib/config";

export const metadata: Metadata = {
  title: USE_SERVICE_AREAS ? "1031 Exchange Service Areas | San Jose Area Property Markets" : "1031 Exchange Locations | San Jose Area Property Markets",
  description:
    "1031 exchange property markets across San Jose, Palo Alto, Mountain View, and Silicon Valley locations in California.",
  alternates: {
    canonical: `https://www.1031exchangesanjose.com${LOCATIONS_ROUTE}`,
  },
};

export default function LocationsPage() {
  const locationItems = locationsData.map((l) => ({
    title: l.name,
    slug: l.route,
  }));

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="space-y-12">
          <div className="space-y-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">{USE_SERVICE_AREAS ? "Service Areas" : "Locations"}</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">
              1031 Exchange {USE_SERVICE_AREAS ? "Service Areas" : "Locations"} Across Silicon Valley
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-[#4B5563]">
              We help investors identify replacement properties across San Jose and surrounding Silicon Valley markets.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SearchInput
              placeholder="Search locations..."
              items={locationItems}
              contactRedirectPrefix="Location: "
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locationsData.map((location) => (
              <Link
                key={location.slug}
                href={location.route}
                className="group rounded-3xl border border-[#E0E7FF] bg-white p-6 shadow-lg transition hover:border-[#3B82F6] hover:shadow-blue-100"
              >
                <h2 className="text-xl font-semibold text-[#0F172A] group-hover:text-[#3B82F6] transition">
                  {location.name}
                </h2>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] group-hover:gap-3 transition-all">
                  Learn more
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="rounded-3xl border border-[#3B82F6] bg-gradient-to-br from-[#EFF6FF] to-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Looking for a different location?</h2>
            <p className="mt-4 text-[#4B5563]">
              We can help you identify replacement properties across California and coordinate your 1031 exchange.
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

