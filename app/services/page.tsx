import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "../../data/services";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "1031 Exchange Services | San Jose Property Identification",
  description:
    "Comprehensive 1031 exchange services including replacement property identification, timeline management, and investment analysis for San Jose investors.",
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/locations/san-jose-1031-exchange.jpg"
          alt="1031 Exchange Services"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-light uppercase tracking-[0.3em] text-white/70 mb-6">Our Services</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide">
            1031 Exchange Services
          </h1>
          <p className="mt-6 text-white/80 text-lg font-light max-w-2xl mx-auto">
            Comprehensive property identification, timeline management, and investment analysis for San Jose investors.
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={service.route}
              className="group block border-t border-gray-200 pt-8 hover:border-gray-900 transition-colors duration-300"
            >
              <h2 className="text-xl text-gray-900 font-normal mb-4 group-hover:text-gray-600 transition-colors duration-300">
                {service.name}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light">{service.short}</p>
              <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                Learn more
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-navy py-16 px-8 text-center">
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase">Need help finding a specific service?</h2>
          <p className="mt-6 text-white/70 font-light max-w-2xl mx-auto">
            We can help you identify replacement properties and coordinate your 1031 exchange timeline.
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
