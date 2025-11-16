import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Calculator, DollarSign, CheckCircle2 } from "lucide-react";

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
    description: "Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications.",
    icon: DollarSign,
  },
  {
    name: "Exchange Cost Estimator",
    slug: "exchange-cost-estimator",
    description: "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs.",
    icon: Calculator,
  },
  {
    name: "Identification Rules Checker",
    slug: "identification-rules-checker",
    description: "Validate against the 3-property, 200%, or 95% identification rules for 1031 exchanges.",
    icon: CheckCircle2,
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
      <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
              1031 Exchange Tools
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Free calculators and tools to help you plan and execute your 1031 exchange. All tools are designed to provide estimates and educational guidance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B3C5D]/10 text-[#0B3C5D] mb-4 group-hover:bg-[#C9A227]/10 group-hover:text-[#C9A227] transition">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h2 className="text-xl font-semibold text-[#0B3C5D] mb-2 group-hover:text-[#C9A227] transition">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-gray-700">{tool.description}</p>
                </Link>
              );
            })}
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm text-gray-700">
              <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions. California does not impose a state real estate transfer tax, but local transfer taxes may apply. Recording fees and title insurance premiums still apply.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}



