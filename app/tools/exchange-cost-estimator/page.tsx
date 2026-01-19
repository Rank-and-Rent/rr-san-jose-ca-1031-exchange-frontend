import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import ExchangeCostEstimator from "@/components/tools/ExchangeCostEstimator";

export const metadata: Metadata = {
  title: "Exchange Cost Estimator | 1031 Exchange San Jose",
  description:
    "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange in San Jose, CA.",
  keywords: "1031 exchange costs, QI fees, escrow costs, title insurance, recording fees, San Jose, California",
  openGraph: {
    title: "Exchange Cost Estimator | 1031 Exchange San Jose",
    description:
      "Estimate all costs associated with your 1031 exchange. Free calculator for San Jose, CA investors.",
    type: "website",
    url: "https://www.1031exchangesanjose.com/tools/exchange-cost-estimator",
  },
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/tools/exchange-cost-estimator",
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Exchange Cost Estimator" },
];

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Exchange Cost Estimator",
  description:
    "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange.",
  url: "https://www.1031exchangesanjose.com/tools/exchange-cost-estimator",
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Exchange Cost Estimator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  description: "Calculate all costs associated with a 1031 exchange",
  url: "https://www.1031exchangesanjose.com/tools/exchange-cost-estimator",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ExchangeCostEstimatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <div className="bg-white text-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <Image
            src="/locations/palo-alto-1031-exchange.jpg"
            alt="Exchange Cost Estimator"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <p className="text-[11px] font-light uppercase tracking-[0.4em] text-white/60 mb-6">
              Exchange Tool
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-[0.1em] leading-tight">
              EXCHANGE COST ESTIMATOR
            </h1>
            <p className="mt-6 text-[13px] uppercase tracking-[0.25em] text-white/70 font-light">
              Calculate All Closing Costs
            </p>
          </div>
        </section>

        <Breadcrumbs items={breadcrumbItems} />

        <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="text-gray-500 leading-relaxed font-light text-lg">
                Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange. Understanding these costs helps you plan your exchange budget and make informed decisions.
              </p>
            </div>

            <div className="bg-gray-50 p-8">
              <ExchangeCostEstimator />
            </div>

            <div className="bg-gray-100 p-6">
              <p className="text-sm text-gray-500 font-light">
                <strong className="font-medium">Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions.
              </p>
            </div>

            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl text-gray-900 font-light tracking-wide uppercase mb-8">Related Tools</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  href="/tools/boot-calculator"
                  className="group block border-t border-gray-200 pt-6 hover:border-gray-900 transition-colors duration-300"
                >
                  <h3 className="text-lg text-gray-900 font-normal mb-2 group-hover:text-gray-600 transition-colors duration-300">
                    Boot Calculator
                  </h3>
                  <p className="text-gray-500 text-sm font-light">Calculate boot and estimate tax implications.</p>
                </Link>
                <Link
                  href="/tools/identification-rules-checker"
                  className="group block border-t border-gray-200 pt-6 hover:border-gray-900 transition-colors duration-300"
                >
                  <h3 className="text-lg text-gray-900 font-normal mb-2 group-hover:text-gray-600 transition-colors duration-300">
                    Identification Rules Checker
                  </h3>
                  <p className="text-gray-500 text-sm font-light">Validate against 3-property, 200%, and 95% rules.</p>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
