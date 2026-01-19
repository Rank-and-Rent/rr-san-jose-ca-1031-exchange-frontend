import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
      <div className="bg-white text-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <Image
            src="/locations/san-jose-1031-exchange.jpg"
            alt="Boot Calculator"
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
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-[0.1em] leading-tight">
              BOOT CALCULATOR
            </h1>
            <p className="mt-6 text-[13px] uppercase tracking-[0.25em] text-white/70 font-light">
              Estimate Tax Implications
            </p>
          </div>
        </section>

        <Breadcrumbs items={breadcrumbItems} />

        <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="text-gray-500 leading-relaxed font-light text-lg">
                Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange. Boot is any non-like-kind value received in an exchange and may be subject to taxation.
              </p>
            </div>

            <div className="bg-gray-50 p-8">
              <BootCalculator />
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
                  href="/tools/exchange-cost-estimator"
                  className="group block border-t border-gray-200 pt-6 hover:border-gray-900 transition-colors duration-300"
                >
                  <h3 className="text-lg text-gray-900 font-normal mb-2 group-hover:text-gray-600 transition-colors duration-300">
                    Exchange Cost Estimator
                  </h3>
                  <p className="text-gray-500 text-sm font-light">Calculate QI fees, escrow costs, and closing expenses.</p>
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
