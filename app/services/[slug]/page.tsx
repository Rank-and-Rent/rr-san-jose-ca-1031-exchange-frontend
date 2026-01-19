import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { servicesData } from "../../../data/services";
import { serviceBatches01, serviceBatches02, serviceBatches03 } from "../../../data";
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
    (serviceBatches01.servicesBatch01 as Record<string, { mainDescription: string; faqs?: { question: string; answer: string }[] }>)[slug] ||
    (serviceBatches02.servicesBatch02 as Record<string, { mainDescription: string; faqs?: { question: string; answer: string }[] }>)[slug] ||
    (serviceBatches03.servicesBatch03 as Record<string, { mainDescription: string; faqs?: { question: string; answer: string }[] }>)[slug];
  const relatedServices = servicesData.filter((s) => s.slug !== slug).slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.name },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/locations/san-jose-1031-exchange.jpg"
          alt={service.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-light uppercase tracking-[0.3em] text-white/70 mb-6">Service</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide">
            {service.name}
          </h1>
          <p className="mt-6 text-white/80 text-lg font-light max-w-2xl mx-auto">
            {service.short}
          </p>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbItems} />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <article className="space-y-16">
          {batchData && (
            <div className="prose prose-lg max-w-none prose-headings:font-light prose-headings:tracking-wide prose-p:text-gray-600 prose-p:font-light">
              <div
                className="bg-gray-50 p-8 md:p-12"
                dangerouslySetInnerHTML={{ __html: batchData.mainDescription }}
              />
            </div>
          )}

          <section className="space-y-8">
            <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide uppercase">Related Services</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={related.route}
                  className="group block border-t border-gray-200 pt-6 hover:border-gray-900 transition-colors duration-300"
                >
                  <h3 className="text-lg text-gray-900 font-normal mb-3 group-hover:text-gray-600 transition-colors duration-300">
                    {related.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-light">{related.short}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center border border-gray-900 text-gray-900 px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              View All {servicesData.length} Services
            </Link>
          </div>

          {batchData && batchData.faqs && (
            <section className="space-y-8">
              <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide uppercase">Frequently Asked Questions</h2>
              <div className="grid lg:grid-cols-2 gap-x-12 gap-y-0">
                {batchData.faqs.map((item: { question: string; answer: string }, index: number) => (
                  <details
                    key={index}
                    className="group border-t border-gray-200 last:border-b lg:last:border-b-0 lg:[&:nth-last-child(2)]:border-b"
                  >
                    <summary className="flex cursor-pointer items-center justify-between py-6 text-left text-base font-normal text-gray-900">
                      {item.question}
                      <span className="ml-4 flex-shrink-0 text-gray-400 transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="pb-6 text-gray-500 leading-relaxed font-light">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <div className="bg-navy py-16 px-8 text-center">
            <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase">Ready to get started?</h2>
            <p className="mt-6 text-white/70 font-light max-w-2xl mx-auto">
              Contact us to learn more about {service.name.toLowerCase()} and how we can help with your 1031 exchange.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                href={`/contact?projectType=${encodeURIComponent(service.name)}`}
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
