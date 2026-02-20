import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { locationsData } from "../../data/locations";
import Breadcrumbs from "../../components/Breadcrumbs";
import { LOCATIONS_ROUTE } from "../../lib/config";

export const metadata: Metadata = {
  title: "1031 Exchange Service Areas | San Jose Area Property Markets",
  description:
    "1031 exchange property markets across San Jose, Palo Alto, Mountain View, and Silicon Valley locations in California.",
  alternates: {
    canonical: `https://www.1031exchangesanjose.com${LOCATIONS_ROUTE}`,
  },
};

export default function ServiceAreasPage() {
  const cities = locationsData.filter((l) => l.type === "city");

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/service-areas/san-jose-ca/redwood-city-ca-sj.jpg"
          alt="Silicon Valley Service Areas"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-[11px] font-light uppercase tracking-[0.4em] text-white/60 mb-8">
            Service Areas
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-[0.1em] leading-none">
            SERVICE
          </h1>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-[0.1em] leading-none mt-2">
            AREAS
          </h1>
          <p className="mt-10 text-[13px] uppercase tracking-[0.25em] text-white/70 font-light">
            1031 Exchange Markets Across Silicon Valley
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />

      <main className="py-16 md:py-24">
        {/* Service Areas Grid - Edge to Edge */}
        <div className="grid grid-cols-2 lg:grid-cols-3">
          {cities.map((location) => (
            <Link
              key={location.slug}
              href={location.route}
              className="group relative h-48 sm:h-64 lg:h-96 overflow-hidden"
            >
              <Image
                src={location.heroImage || "/service-areas/san-jose-ca/redwood-city-ca-sj.jpg"}
                alt={`${location.name} 1031 Exchange`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-base sm:text-lg lg:text-xl text-white uppercase tracking-[0.15em] font-light text-center px-4">
                  {location.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-navy py-16 px-8 text-center">
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase">
            Looking for a different area?
          </h2>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "1031 Exchange Service Areas in Silicon Valley",
            itemListElement: cities.map((location, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${location.name}, CA`,
              url: `https://www.1031exchangesanjose.com${location.route}`,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.1031exchangesanjose.com/" },
              { "@type": "ListItem", position: 2, name: "Service Areas" },
            ],
          }),
        }}
      />
    </div>
  );
}
