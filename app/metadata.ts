import type { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: "San Jose 1031 Exchange Experts | California Qualified Intermediary Network",
  description:
    "Bay Area 1031 exchange specialists offering compliant, technology-driven coordination for investors across Northern California.",
  openGraph: {
    title: "San Jose 1031 Exchange Experts",
    description:
      "Trusted California 1031 advisors delivering precision, compliance, and clarity for property owners in San Jose and Silicon Valley.",
    url: "https://www.1031exchangesanjose.com/",
    siteName: "1031 Exchange San Jose",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "San Jose 1031 Exchange Experts",
    description: "Defer capital gains taxes with a compliant, technology-enabled 1031 exchange process.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/",
  },
};
