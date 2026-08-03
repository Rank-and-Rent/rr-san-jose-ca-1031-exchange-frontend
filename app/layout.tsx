import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.1031exchangesanjose.com"),
  title: "1031 Exchange San Jose | Free Turnkey Exchange Help",
  description:
    "Free 1031 exchange guidance for San Jose property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing.",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome", url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "android-chrome", url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",

  alternates: { canonical: "/" },

  twitter: { card: "summary_large_image", title: "1031 Exchange San Jose | Free Turnkey Exchange Help", description: "Free 1031 exchange guidance for San Jose property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing." },

  openGraph: { title: "1031 Exchange San Jose | Free Turnkey Exchange Help", description: "Free 1031 exchange guidance for San Jose property owners. Get help with QI setup, replacement properties, DST options, deadlines, and closing." },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${sourceSans.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
        <StickyCTA />
        <Analytics />
      </body>
    </html>
  );
}
