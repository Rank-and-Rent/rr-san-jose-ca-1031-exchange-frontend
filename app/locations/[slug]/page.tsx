import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locationsData } from "../../../data/locations";
import { locationBatches01, locationBatches02, locationBatches03 } from "../../../data";
import { servicesData } from "../../../data/services";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LOCATIONS_ROUTE } from "../../../lib/config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: `1031 Exchange Properties in ${location.name} | San Jose Area`,
    description: `1031 exchange opportunities in ${location.name}, CA`,
    alternates: {
      canonical: `https://www.1031exchangesanjose.com${location.route}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  // Convert slug to batch key format (remove "-ca" suffix)
  const batchKey = slug.replace(/-ca$/, '');
  const batchData =
    (locationBatches01.locationsBatch01 as any)[batchKey] ||
    (locationBatches02.locationsBatch02 as any)[batchKey] ||
    (locationBatches03.locationsBatch03 as any)[batchKey];
  const relatedServices = servicesData.slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Locations", href: LOCATIONS_ROUTE },
    { label: location.name },
  ];

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={location.heroImage}
            alt={`${location.name} skyline for 1031 exchange properties`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                1031 Exchange in {location.name}
              </h1>
              <p className="text-xl text-white/90">
                Discover premium commercial real estate opportunities in {location.name}, California
              </p>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbItems} />
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <article className="space-y-12">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Location</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">
              1031 Exchange Properties in {location.name}
            </h1>
            {batchData && (
              <div
                className="text-lg text-[#4B5563] max-w-3xl prose prose-lg"
                dangerouslySetInnerHTML={{ __html: batchData.mainDescription }}
              />
            )}
          </div>

          {batchData && batchData.popularPaths && (
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-[#0F172A]">Popular Paths</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {batchData.popularPaths.map((path: any, index: number) => {
                  const service = path.type === "service" ? servicesData.find((s) => s.slug === path.slug) : null;
                  const href = service ? service.route : `/property-types/${path.slug}`;
                  return (
                    <Link
                      key={index}
                      href={href}
                      className="group rounded-2xl border border-[#E0E7FF] bg-white p-6 shadow-md transition hover:border-[#3B82F6] hover:shadow-lg"
                    >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-[#3B82F6]">#{path.rank}</span>
                      <h3 className="text-lg font-semibold text-[#0F172A] group-hover:text-[#3B82F6] transition">
                        {path.name}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-[#4B5563]">{path.whyPopular}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {batchData && batchData.faqs && (
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-[#0F172A]">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {batchData.faqs.map((item: any, index: number) => (
                  <details
                    key={index}
                    className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
                  >
                    <summary className="flex cursor-pointer items-center justify-between text-left text-lg font-semibold text-[#0F172A]">
                      {item.question}
                      <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-sm transition group-open:bg-[#3B82F6] group-open:text-white">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-sm text-[#4B5563]">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Services for {location.name}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={service.route}
                  className="group rounded-2xl border border-[#E0E7FF] bg-white p-6 shadow-md transition hover:border-[#3B82F6] hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-[#0F172A] group-hover:text-[#3B82F6] transition">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563]">{service.short}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="flex justify-center">
            <Link
              href={LOCATIONS_ROUTE}
              className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6] transition hover:bg-[#EFF6FF]"
            >
              View All {locationsData.length} Locations
            </Link>
          </div>

          <div className="rounded-3xl border border-[#3B82F6] bg-gradient-to-br from-[#EFF6FF] to-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Ready to find properties in {location.name}?</h2>
            <p className="mt-4 text-[#4B5563]">
              Contact us to learn more about 1031 exchange opportunities in {location.name} and how we can help.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <Link
                href={`/contact?projectType=${encodeURIComponent(`${location.name} Property Search`)}`}
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
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.label,
              item: item.href ? `https://www.1031exchangesanjose.com${item.href}` : undefined,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: `${location.name}, California`,
            description: `1031 exchange opportunities in ${location.name}, CA`,
            address: {
              "@type": "PostalAddress",
              addressLocality: location.name,
              addressRegion: "CA",
              addressCountry: "US",
            },
          }),
        }}
      />
    </div>
  );
}

