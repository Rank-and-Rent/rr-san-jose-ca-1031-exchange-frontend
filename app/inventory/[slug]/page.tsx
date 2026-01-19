import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { inventoryCategories } from "../../../data/inventory-categories";
import { inventoryBatches01 as inventoryBatches } from "../../../data";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { propertyTypesData } from "../../../data/property-types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return inventoryCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = inventoryCategories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Property Type Not Found",
    };
  }

  return {
    title: `${category.name} | San Jose 1031 Exchange Properties`,
    description: `Browse ${category.name.toLowerCase()} properties for 1031 exchange opportunities in Silicon Valley`,
    alternates: {
      canonical: `https://www.1031exchangesanjose.com${category.route}`,
    },
  };
}

const propertyTypeDescriptions: Record<string, string> = {
  "convenience-store-gas-c-store":
    "Single tenant convenience stores and gas stations with credit rated tenants offer stable, long-term income with minimal landlord responsibilities. These properties typically feature triple-net (NNN) leases with national brands.",
  "drive-thru-qsr":
    "Drive-thru quick service restaurants with national brands like McDonald's, Chick-fil-A, and Taco Bell provide recession-resistant income streams with corporate-backed lease guarantees.",
  pharmacy:
    "Single tenant pharmacy properties anchored by CVS, Walgreens, or Rite Aid offer essential retail characteristics with strong credit tenants and long-term lease commitments.",
  "dollar-store":
    "Dollar General, Dollar Tree, and Family Dollar properties provide defensive retail exposure with essential goods focus and consistent consumer demand regardless of economic conditions.",
  "coffee-drive-thru":
    "Single tenant coffee drive-thru properties with brands like Starbucks, Dutch Bros, and Scooter's Coffee benefit from habitual consumer behavior and drive-thru convenience trends.",
  "auto-parts-retail":
    "Auto parts retail properties with tenants like AutoZone, O'Reilly, and Advance Auto Parts serve the essential automotive aftermarket with strong credit profiles.",
  "hard-discount-grocer":
    "Hard discount grocers like Aldi and Lidl offer internet-resistant retail with essential goods focus and growing consumer preference for value-oriented shopping.",
  "ground-lease-outparcel":
    "Ground lease outparcel properties provide land ownership with tenant-owned improvements, offering the most passive investment structure with long-term income security.",
  "urgent-care-medical-clinic":
    "Urgent care and medical clinic properties serve essential healthcare needs with strong tenant credit and growing demand for convenient, accessible medical services.",
  "veterinary-clinic":
    "Veterinary clinic properties benefit from the growing pet industry with recession-resistant consumer spending on pet healthcare services.",
  "auto-service-oil-change":
    "Auto service and oil change properties with brands like Jiffy Lube, Valvoline, and Take 5 serve essential vehicle maintenance needs with quick-service formats.",
  "tire-store":
    "Single tenant tire store properties with Discount Tire, Big O Tires, and Les Schwab serve essential automotive needs with strong regional and national brands.",
  "last-mile-logistics-flex":
    "Last mile logistics and flex properties serve e-commerce distribution needs with growing demand from Amazon, FedEx, and other delivery networks.",
  "specialty-grocer":
    "Specialty grocer properties with Trader Joe's, Sprouts, and Whole Foods serve affluent demographics with differentiated product offerings and loyal customer bases.",
  "telecom-wireless-retail":
    "Telecom and wireless retail properties with Verizon, AT&T, and T-Mobile stores serve essential communication needs with strong corporate credit backing.",
  "dental-orthodontics":
    "Dental and orthodontics properties serve essential healthcare needs with stable patient bases and growing demand for cosmetic and corrective dental services.",
};

export default async function InventoryPage({ params }: Props) {
  const { slug } = await params;
  const category = inventoryCategories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const batchData = (inventoryBatches.inventorySpotlight01 as Array<{ type: string; copy: string }>).find(
    (item) => item.type === slug
  );

  // Get related property types
  const relatedTypes = propertyTypesData.filter((t) => t.slug !== slug).slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Property Types", href: "/property-types" },
    { label: category.name },
  ];

  const description = propertyTypeDescriptions[slug] || 
    `${category.name} properties qualify as like-kind real estate for 1031 exchanges, offering investors stable income and tax-deferred wealth building opportunities.`;

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section - Matching main page style */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={`/inventory/${slug}-1031-exchange.jpg`}
          alt={`${category.name} properties for 1031 exchange`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Small top text */}
          <p className="text-[11px] font-light uppercase tracking-[0.4em] text-white/60 mb-8">
            Property Type
          </p>
          
          {/* Large elegant title */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-[0.1em] leading-tight">
            {category.name.toUpperCase()}
          </h1>
          
          {/* Subtitle */}
          <p className="mt-8 text-[13px] uppercase tracking-[0.25em] text-white/70 font-light max-w-2xl mx-auto">
            1031 Exchange Qualified Properties
          </p>
          
          {/* CTA Button */}
          <div className="mt-12">
            <Link
              href={`/contact?projectType=${encodeURIComponent(category.name)}`}
              className="inline-flex items-center justify-center border border-white/60 text-white px-12 py-4 text-[11px] font-light uppercase tracking-[0.3em] hover:bg-white hover:text-gray-900 transition-all duration-500"
            >
              Explore Properties
            </Link>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbItems} />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <article className="space-y-20">
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide">
                About {category.name}
              </h2>
              <p className="text-gray-500 leading-relaxed font-light text-lg">
                {description}
              </p>
              {batchData && (
                <p className="text-gray-500 leading-relaxed font-light">
                  {batchData.copy}
                </p>
              )}
            </div>
            <div className="relative h-80 lg:h-full lg:min-h-[400px]">
              <Image
                src={`/inventory/${slug}-1031-exchange.jpg`}
                alt={category.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Key Benefits */}
          <section className="bg-gray-50 -mx-6 md:-mx-10 px-6 md:px-10 py-16">
            <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide text-center mb-12 uppercase">
              Investment Benefits
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <p className="text-4xl font-light text-navy mb-4">NNN</p>
                <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Triple Net Leases</p>
                <p className="mt-4 text-sm text-gray-500 font-light">Tenant pays taxes, insurance, and maintenance for truly passive income.</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-light text-navy mb-4">10-20</p>
                <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Year Lease Terms</p>
                <p className="mt-4 text-sm text-gray-500 font-light">Long-term leases provide income stability and predictable cash flow.</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-light text-navy mb-4">1031</p>
                <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Exchange Qualified</p>
                <p className="mt-4 text-sm text-gray-500 font-light">Like-kind real estate eligible for tax-deferred exchanges under IRC Section 1031.</p>
              </div>
            </div>
          </section>

          {/* Related Property Types */}
          <section>
            <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide uppercase mb-12">
              Related Property Types
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTypes.map((type) => (
                <Link
                  key={type.slug}
                  href={`/inventory/${type.slug}`}
                  className="group relative h-48 overflow-hidden"
                >
                  <Image
                    src={`/inventory/${type.slug}-1031-exchange.jpg`}
                    alt={type.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-sm text-white uppercase tracking-[0.15em] font-light text-center">
                      {type.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-navy py-16 px-8 text-center -mx-6 md:-mx-10">
            <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase">
              Ready to explore {category.name.toLowerCase()}?
            </h2>
            <p className="mt-6 text-white/70 font-light max-w-2xl mx-auto">
              Contact us to learn more about available {category.name.toLowerCase()} properties and how we can help with your 1031 exchange.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                href={`/contact?projectType=${encodeURIComponent(category.name)}`}
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
          </section>
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: category.name,
            description: description,
            category: "Real Estate Investment",
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
