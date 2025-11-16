import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import IdentificationRulesChecker from "@/components/tools/IdentificationRulesChecker";

export const metadata: Metadata = {
  title: "Identification Rules Checker | 1031 Exchange San Jose",
  description:
    "Validate your property identification against the 3-property, 200%, or 95% identification rules for 1031 exchanges in San Jose, CA.",
  keywords: "1031 identification rules, 3-property rule, 200% rule, 95% rule, property identification, San Jose, California",
  openGraph: {
    title: "Identification Rules Checker | 1031 Exchange San Jose",
    description:
      "Validate your property identification against IRS rules for 1031 exchanges. Free tool for San Jose, CA investors.",
    type: "website",
    url: "https://www.1031exchangesanjose.com/tools/identification-rules-checker",
  },
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/tools/identification-rules-checker",
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Identification Rules Checker" },
];

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Identification Rules Checker",
  description:
    "Validate your property identification against the 3-property, 200%, or 95% identification rules for 1031 exchanges.",
  url: "https://www.1031exchangesanjose.com/tools/identification-rules-checker",
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
        name: "Identification Rules Checker",
        item: "https://www.1031exchangesanjose.com/tools/identification-rules-checker",
      },
    ],
  },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Identification Rules Checker",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  description: "Validate property identification against IRS rules for 1031 exchanges",
  url: "https://www.1031exchangesanjose.com/tools/identification-rules-checker",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function IdentificationRulesCheckerPage() {
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
            Identification Rules Checker
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Validate your property identification against the 3-property, 200%, or 95% identification rules for 1031 exchanges. These IRS rules determine how many replacement properties you can identify and their total value.
          </p>

          <IdentificationRulesChecker />

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
                <Link href="/tools/exchange-cost-estimator" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                  Exchange Cost Estimator
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



