import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "../../../data/services";
import { serviceBatches01, serviceBatches02, serviceBatches03 } from "../../../data";
import SearchInput from "../../../components/SearchInput";
import Breadcrumbs from "../../../components/Breadcrumbs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.name} | San Jose 1031 Exchange Services`,
    description: service.short,
    alternates: {
      canonical: `https://www.1031exchangesanjose.com${service.route}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const batchData =
    (serviceBatches01.servicesBatch01 as any)[slug] ||
    (serviceBatches02.servicesBatch02 as any)[slug] ||
    (serviceBatches03.servicesBatch03 as any)[slug];
  const relatedServices = servicesData.filter((s) => s.slug !== slug).slice(0, 4);
  const relatedItems = relatedServices.map((s) => ({
    title: s.name,
    slug: s.route,
  }));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.name },
  ];

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Breadcrumbs items={breadcrumbItems} />
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <article className="space-y-12">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Service</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">{service.name}</h1>
            <p className="text-lg text-[#4B5563] max-w-3xl">{service.short}</p>
          </div>

          {batchData && (
            <div className="prose prose-lg max-w-none">
              <div
                className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-lg"
                dangerouslySetInnerHTML={{ __html: batchData.mainDescription }}
              />
            </div>
          )}

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Related Services</h2>
            <div className="max-w-2xl">
              <SearchInput
                placeholder="Search related services..."
                items={relatedItems}
                contactRedirectPrefix=""
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={related.route}
                    className="group rounded-2xl border border-[#E0E7FF] bg-white p-6 shadow-md transition hover:border-[#3B82F6] hover:shadow-lg"
                  >
                    <h3 className="text-lg font-semibold text-[#0F172A] group-hover:text-[#3B82F6] transition">
                      {related.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#4B5563]">{related.short}</p>
                  </Link>
              ))}
            </div>
          </section>

          <div className="flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6] transition hover:bg-[#EFF6FF]"
            >
              View All {servicesData.length} Services
            </Link>
          </div>

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

          <div className="rounded-3xl border border-[#3B82F6] bg-gradient-to-br from-[#EFF6FF] to-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Ready to get started?</h2>
            <p className="mt-4 text-[#4B5563]">
              Contact us to learn more about {service.name.toLowerCase()} and how we can help with your 1031 exchange.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <Link
                href={`/contact?projectType=${encodeURIComponent(service.name)}`}
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
            "@type": "Service",
            name: service.name,
            description: service.short,
            provider: {
              "@type": "Organization",
              name: "1031 Exchange San Jose",
              url: "https://www.1031exchangesanjose.com/",
            },
            areaServed: {
              "@type": "State",
              name: "California",
            },
          }),
        }}
      />
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
    </div>
  );
}

