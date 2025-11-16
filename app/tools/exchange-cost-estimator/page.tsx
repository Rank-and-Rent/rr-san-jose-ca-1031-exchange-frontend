import type { Metadata } from "next";
import Link from "next/link";
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Exchange Cost Estimator",
        item: "https://www.1031exchangesanjose.com/tools/exchange-cost-estimator",
      },
    ],
  },
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
      <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
          <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
            Exchange Cost Estimator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange. Understanding these costs helps you plan your exchange budget and make informed decisions.
          </p>

          <ExchangeCostEstimator />

          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm text-gray-700">
              <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions. California does not impose a state real estate transfer tax, but local transfer taxes may apply. Recording fees and title insurance premiums still apply.
            </p>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">Related Resources</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/boot-calculator" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                  Boot Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/identification-rules-checker" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                  Identification Rules Checker
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                  Our Services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}



