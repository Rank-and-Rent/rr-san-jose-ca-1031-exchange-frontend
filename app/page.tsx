import type { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata: Metadata = {
  title: "1031 Exchange San Jose | Free Turnkey Exchange Help",
  description:
    "Free 1031 exchange guidance for San Jose property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing.",
  openGraph: {
    title: "1031 Exchange San Jose | Free Turnkey Exchange Help",
    description:
      "Free 1031 exchange guidance for San Jose property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing.",
    url: "https://www.1031exchangesanjose.com/",
    siteName: "1031 Exchange San Jose",
    images: ["/san-jose-hero-1031-exchange.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1031 Exchange San Jose | Free Turnkey Exchange Help",
    description: "Free 1031 exchange guidance for San Jose property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing.",
    images: ["/san-jose-hero-1031-exchange.jpg"],
  },
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/",
  },
};

export default function Home() {
  return <HomePage />;
}
