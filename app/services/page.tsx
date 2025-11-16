import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "../../data/services";
import SearchInput from "../../components/SearchInput";
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
  const serviceItems = servicesData.map((s) => ({
    title: s.name,
    slug: s.route,
  }));

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="space-y-12">
          <div className="space-y-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Our Services</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">
              1031 Exchange Services for San Jose Investors
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-[#4B5563]">
              Comprehensive property identification, timeline management, and investment analysis services to support
              your 1031 exchange.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SearchInput
              placeholder="Search services..."
              items={serviceItems}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={service.route}
                className="group rounded-3xl border border-[#E0E7FF] bg-white p-6 shadow-lg transition hover:border-[#3B82F6] hover:shadow-blue-100"
              >
                <h2 className="text-xl font-semibold text-[#0F172A] group-hover:text-[#3B82F6] transition">
                  {service.name}
                </h2>
                <p className="mt-3 text-sm text-[#4B5563]">{service.short}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] group-hover:gap-3 transition-all">
                  Learn more
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="rounded-3xl border border-[#3B82F6] bg-gradient-to-br from-[#EFF6FF] to-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Need help finding a specific service?</h2>
            <p className="mt-4 text-[#4B5563]">
              We can help you identify replacement properties and coordinate your 1031 exchange timeline.
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

