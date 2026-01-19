import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "1031 Exchange Tools | Calculators & Resources | San Jose, CA",
  description:
    "Free 1031 exchange calculators and tools for San Jose, CA investors. Calculate boot, exchange costs, validate identification rules, and more.",
  keywords: "1031 exchange tools, calculators, boot calculator, exchange cost estimator, identification rules, San Jose, California",
  openGraph: {
    title: "1031 Exchange Tools | Calculators & Resources",
    description:
      "Free 1031 exchange calculators and tools for San Jose, CA investors. Calculate boot, exchange costs, and validate identification rules.",
    type: "website",
    url: "https://www.1031exchangesanjose.com/tools",
  },
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/tools",
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools" },
];

const tools = [
  {
    name: "Boot Calculator",
    slug: "boot-calculator",
    description: "Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange.",
  },
  {
    name: "Exchange Cost Estimator",
    slug: "exchange-cost-estimator",
    description: "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your exchange.",
  },
  {
    name: "Identification Rules Checker",
    slug: "identification-rules-checker",
    description: "Validate your property selection against the 3-property, 200%, or 95% identification rules for 1031 exchanges.",
  },
];

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "1031 Exchange Tools",
  description: "Free 1031 exchange calculators and tools for San Jose, CA investors",
  url: "https://www.1031exchangesanjose.com/tools",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.1031exchangesanjose.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://www.1031exchangesanjose.com/tools",
      },
    ],
  },
};

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <div className="bg-white text-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <Image
            src="/locations/mountain-view-1031-exchange.jpg"
            alt="1031 Exchange Tools"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-xs font-light uppercase tracking-[0.3em] text-white/70 mb-6">Resources</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide">
              Exchange Tools
            </h1>
            <p className="mt-6 text-white/80 text-lg font-light max-w-2xl mx-auto">
              Free calculators and tools to help you plan and execute your 1031 exchange.
            </p>
          </div>
        </section>

        <Breadcrumbs items={breadcrumbItems} />

        <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group block border-t border-gray-200 pt-8 hover:border-gray-900 transition-colors duration-300"
              >
                <h2 className="text-xl text-gray-900 font-normal mb-4 group-hover:text-gray-600 transition-colors duration-300">
                  {tool.name}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light">{tool.description}</p>
                <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                  Use Tool
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 p-8">
            <p className="text-sm text-gray-500 font-light">
              <strong className="font-medium">Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
