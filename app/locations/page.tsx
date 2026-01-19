import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { locationsData } from "../../data/locations";
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
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/locations/san-jose-1031-exchange.jpg"
          alt="Silicon Valley Locations"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-light uppercase tracking-[0.3em] text-white/70 mb-6">{USE_SERVICE_AREAS ? "Service Areas" : "Locations"}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide">
            Silicon Valley {USE_SERVICE_AREAS ? "Service Areas" : "Locations"}
          </h1>
          <p className="mt-6 text-white/80 text-lg font-light max-w-2xl mx-auto">
            We help investors identify replacement properties across San Jose and surrounding Silicon Valley markets.
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: USE_SERVICE_AREAS ? "Service Areas" : "Locations" }]} />

      <main className="py-16 md:py-24">
        {/* Full-width grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3">
          {locationsData.map((location, index) => (
            <Link
              key={location.slug}
              href={location.route}
              className="group relative h-64 lg:h-80 overflow-hidden"
            >
              <Image
                src={`/locations/${location.slug.replace("-ca", "")}-1031-exchange.jpg`}
                alt={location.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl lg:text-2xl text-white uppercase tracking-[0.2em] font-light">
                  {location.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-navy py-16 px-8 text-center mx-6 lg:mx-10">
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase">Looking for a different location?</h2>
          <p className="mt-6 text-white/70 font-light max-w-2xl mx-auto">
            We can help you identify replacement properties across California and coordinate your 1031 exchange.
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
