import type { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata: Metadata = {
  title: "1031 Exchange San Jose | Direct & Passive Options",
  description:
    "Planning a San Jose investment-property sale? Compare direct replacements and passive DST possibilities, then request free information.",
  openGraph: {
    title: "1031 Exchange San Jose | Direct & Passive Options",
    description:
      "Planning a San Jose investment-property sale? Compare direct replacements and passive DST possibilities, then request free information.",
    url: "https://www.1031exchangesanjose.com/",
    siteName: "1031 Exchange San Jose",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1031 Exchange San Jose | Direct & Passive Options",
    description: "Planning a San Jose investment-property sale? Compare direct replacements and passive DST possibilities, then request free information.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/",
  },
};

export default function Home() {
  return <HomePage />;
}
