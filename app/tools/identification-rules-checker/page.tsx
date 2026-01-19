import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
      <div className="bg-white text-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <Image
            src="/locations/mountain-view-1031-exchange.jpg"
            alt="Identification Rules Checker"
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
              IDENTIFICATION RULES
            </h1>
            <p className="mt-6 text-[13px] uppercase tracking-[0.25em] text-white/70 font-light">
              Validate Your Property Selection
            </p>
          </div>
        </section>

        <Breadcrumbs items={breadcrumbItems} />

        <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="text-gray-500 leading-relaxed font-light text-lg">
                Validate your property identification against the 3-property, 200%, or 95% identification rules for 1031 exchanges. These IRS rules determine how many replacement properties you can identify and their total value.
              </p>
            </div>

            <div className="bg-gray-50 p-8">
              <IdentificationRulesChecker />
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
                  href="/tools/exchange-cost-estimator"
                  className="group block border-t border-gray-200 pt-6 hover:border-gray-900 transition-colors duration-300"
                >
                  <h3 className="text-lg text-gray-900 font-normal mb-2 group-hover:text-gray-600 transition-colors duration-300">
                    Exchange Cost Estimator
                  </h3>
                  <p className="text-gray-500 text-sm font-light">Calculate QI fees, escrow costs, and closing expenses.</p>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
