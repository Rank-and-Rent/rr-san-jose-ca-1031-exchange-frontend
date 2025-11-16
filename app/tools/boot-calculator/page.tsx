import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BootCalculator from "@/components/tools/BootCalculator";

export const metadata: Metadata = {
  title: "Boot Calculator | 1031 Exchange San Jose",
  description:
    "Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange in San Jose, CA.",
  keywords: "boot calculator, 1031 exchange boot, mortgage boot, cash boot, tax calculator, San Jose, California",
  openGraph: {
    title: "Boot Calculator | 1031 Exchange San Jose",
    description:
      "Calculate boot and estimate tax implications for your 1031 exchange. Free tool for San Jose, CA investors.",
    type: "website",
    url: "https://www.1031exchangesanjose.com/tools/boot-calculator",
  },
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/tools/boot-calculator",
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Boot Calculator" },
];

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Boot Calculator",
  description:
    "Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange.",
  url: "https://www.1031exchangesanjose.com/tools/boot-calculator",
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
        name: "Boot Calculator",
        item: "https://www.1031exchangesanjose.com/tools/boot-calculator",
      },
    ],
  },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Boot Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  description: "Calculate boot and estimate tax implications for 1031 exchanges",
  url: "https://www.1031exchangesanjose.com/tools/boot-calculator",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function BootCalculatorPage() {
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
            Boot Calculator
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange. Boot is any non-like-kind value received in an exchange and may be subject to taxation.
          </p>

          <BootCalculator />

          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm text-gray-700">
              <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions. California does not impose a state real estate transfer tax, but local transfer taxes may apply. Recording fees and title insurance premiums still apply.
            </p>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">Related Resources</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/exchange-cost-estimator" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                  Exchange Cost Estimator
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



