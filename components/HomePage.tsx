"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { LOCATIONS_ROUTE } from "../lib/config";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";

// Stats data
const stats = [
  { value: "500+", label: "Exchanges Coordinated" },
  { value: "$2.5B+", label: "Total Exchange Volume" },
  { value: "$250K-$50M", label: "Property Range" },
  { value: "100%", label: "Compliance Rate" },
];

// Property types for carousel - 3 at a time
const propertyCategories = [
  {
    title: "Single Tenant Retail",
    description: "NNN properties with credit tenants",
    image: "/locations/san-jose-1031-exchange.jpg",
    href: "/property-types/convenience-store-gas-c-store",
  },
  {
    title: "Medical Office",
    description: "Clinics and urgent care facilities",
    image: "/locations/palo-alto-1031-exchange.jpg",
    href: "/property-types/urgent-care-medical-clinic",
  },
  {
    title: "Industrial & Logistics",
    description: "Warehouses and distribution centers",
    image: "/locations/fremont-1031-exchange.jpg",
    href: "/property-types/last-mile-logistics-flex",
  },
  {
    title: "Quick Service Restaurant",
    description: "Drive-thru QSR and coffee locations",
    image: "/locations/sunnyvale-1031-exchange.jpg",
    href: "/property-types/drive-thru-qsr",
  },
  {
    title: "Auto Service",
    description: "Oil change and tire stores",
    image: "/locations/santa-clara-1031-exchange.jpg",
    href: "/property-types/auto-service-oil-change",
  },
  {
    title: "Grocery & Discount",
    description: "Hard discount grocers and dollar stores",
    image: "/locations/mountain-view-1031-exchange.jpg",
    href: "/property-types/hard-discount-grocer",
  },
];

// Featured tools
const tools = [
  {
    name: "Boot Calculator",
    description: "Calculate boot and estimate tax implications for your 1031 exchange. Understand cash and debt boot to maximize tax deferral.",
    href: "/tools/boot-calculator",
  },
  {
    name: "Exchange Cost Estimator",
    description: "Estimate QI fees, escrow costs, title insurance, and recording fees for your upcoming exchange transaction.",
    href: "/tools/exchange-cost-estimator",
  },
  {
    name: "Identification Rules Checker",
    description: "Validate your property identification against IRS rules including the 3-property, 200%, and 95% rules.",
    href: "/tools/identification-rules-checker",
  },
];

// Featured locations
const featuredLocations = [
  { name: "San Jose", slug: "/locations/san-jose-ca", image: "/locations/san-jose-1031-exchange.jpg" },
  { name: "Palo Alto", slug: "/locations/palo-alto-ca", image: "/locations/palo-alto-1031-exchange.jpg" },
  { name: "Mountain View", slug: "/locations/mountain-view-ca", image: "/locations/mountain-view-1031-exchange.jpg" },
  { name: "Sunnyvale", slug: "/locations/sunnyvale-ca", image: "/locations/sunnyvale-1031-exchange.jpg" },
  { name: "Santa Clara", slug: "/locations/santa-clara-ca", image: "/locations/santa-clara-1031-exchange.jpg" },
  { name: "Fremont", slug: "/locations/fremont-ca", image: "/locations/fremont-1031-exchange.jpg" },
];

// FAQ items
const faqItems = [
  {
    question: "What are the 45 and 180 day deadlines?",
    answer:
      "Day zero begins the moment the relinquished property closes. You receive forty-five calendar days to identify up to three replacement properties and one hundred eighty days to acquire and close on one or more of those identified assets.",
  },
  {
    question: "Which properties qualify as like-kind?",
    answer:
      "Like-kind real estate includes most real property held for investment or productive use, so an apartment tower may be exchanged for an industrial park, a medical office, or raw land. The assets must be inside the United States and held for business or investment.",
  },
  {
    question: "What is boot and how is it taxed?",
    answer:
      "Boot is any non-like-kind value received, such as cash, debt relief, or personal property. Boot is taxable up to the amount of realized gain and is reported on Form 8824.",
  },
  {
    question: "Can I perform a reverse exchange?",
    answer:
      "Yes. A reverse exchange requires a qualified exchange accommodation arrangement in which the replacement property is parked by an accommodator until the relinquished asset sells.",
  },
];

// JSON-LD for SEO
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "1031 Exchange San Jose",
  url: "https://www.1031exchangesanjose.com/",
  logo: "https://www.1031exchangesanjose.com/og-image.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-408-539-2254",
    contactType: "customer service",
    areaServed: "US-CA",
    availableLanguage: ["English"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "84 West Santa Clara St",
    addressLocality: "San Jose",
    addressRegion: "CA",
    postalCode: "95113",
    addressCountry: "US",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll property carousel to the right (showing 3 at a time)
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % propertyCategories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Get visible items for carousel (3 at a time)
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(propertyCategories[(carouselIndex + i) % propertyCategories.length]);
    }
    return items;
  };

  return (
    <>
      <div className="bg-white text-gray-900">
        <main>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/san-jose-hero-1031-exchange.jpg"
                alt="San Jose skyline"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-navy/60" />
            </div>
            
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20">
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white tracking-tight">
                1031 Exchange San Jose
              </h1>
              <p className="mt-6 text-sm md:text-base uppercase tracking-[0.25em] text-white/80 font-medium">
                Silicon Valley's Premier Exchange Specialists
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-navy px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-lime hover:text-navy-dark transition-all duration-300"
                >
                  Start Your Exchange
                </Link>
                <a
                  href={phoneNumberHref}
                  className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-navy transition-all duration-300"
                >
                  Call {phoneNumberDisplay}
                </a>
              </div>
            </div>
          </section>

          {/* Action Cards Section */}
          <section className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/services" className="group relative block h-72 overflow-hidden">
                  <Image
                    src="/locations/san-jose-1031-exchange.jpg"
                    alt="Find Properties"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-2xl md:text-3xl text-white uppercase tracking-wide">
                      Find Properties
                    </span>
                  </div>
                </Link>
                
                <Link href="/contact" className="group relative block h-72 overflow-hidden">
                  <Image
                    src="/locations/palo-alto-1031-exchange.jpg"
                    alt="Contact Us"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-2xl md:text-3xl text-white uppercase tracking-wide">
                      Contact Us
                    </span>
                  </div>
                </Link>
                
                <Link href="/tools" className="group relative block h-72 overflow-hidden">
                  <Image
                    src="/locations/mountain-view-1031-exchange.jpg"
                    alt="Exchange Tools"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-2xl md:text-3xl text-white uppercase tracking-wide">
                      Exchange Tools
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Property Types Carousel - 3 images at a time */}
          <section className="bg-navy py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white tracking-wide uppercase text-center">
                Property Types We Serve
              </h2>
            </div>
            
            <div className="relative" ref={carouselRef}>
              <div className="flex transition-transform duration-700 ease-in-out">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full">
                  {getVisibleItems().map((category, idx) => (
                    <Link
                      key={`${category.title}-${idx}`}
                      href={category.href}
                      className="group relative h-[400px] md:h-[500px] overflow-hidden block"
                    >
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-navy/50 group-hover:bg-navy/40 transition-colors duration-300" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <h3 className="font-heading text-2xl md:text-3xl text-white uppercase tracking-wide mb-3">
                          {category.title}
                        </h3>
                        <p className="text-white/80 text-sm mb-6 max-w-xs">
                          {category.description}
                        </p>
                        <span className="inline-flex items-center gap-2 bg-white text-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-wider group-hover:bg-lime transition-colors duration-300">
                          View Properties
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Carousel Navigation Dots */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {propertyCategories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCarouselIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === carouselIndex
                        ? "bg-lime w-8"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Featured Tools Section - Clean, no icons */}
          <section className="bg-cream py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy tracking-wide uppercase text-center mb-4">
                Exchange Tools
              </h2>
              <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
                Free calculators and resources to help you plan your 1031 exchange.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group block bg-white border border-gray-200 hover:border-navy transition-all duration-300"
                  >
                    <div className="p-8">
                      <h3 className="font-heading text-2xl text-navy mb-4 group-hover:text-lime-dark transition-colors duration-300">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {tool.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy group-hover:text-lime-dark transition-colors duration-300">
                        Use Tool
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center bg-navy text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-navy-light transition-colors duration-300"
                >
                  View All Tools
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Locations Grid - Edge to Edge */}
          <section className="bg-white">
            <div className="py-16 md:py-20">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy tracking-wide uppercase text-center mb-4 px-6">
                Featured Locations
              </h2>
              <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 px-6">
                Browse our areas of expertise below.
              </p>
            </div>
            
            {/* Edge-to-edge grid with no gaps */}
            <div className="grid grid-cols-2 lg:grid-cols-3">
              {featuredLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={location.slug}
                  className="group relative h-64 lg:h-80 overflow-hidden"
                >
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-heading text-2xl lg:text-3xl text-white uppercase tracking-wider">
                      {location.name}
                    </h3>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-navy p-4 text-center">
                      <span className="text-sm font-semibold uppercase tracking-wider text-lime">
                        Learn More
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center py-12">
              <Link
                href={LOCATIONS_ROUTE}
                className="inline-flex items-center justify-center bg-navy text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-navy-light transition-colors duration-300"
              >
                View All Locations
              </Link>
            </div>
          </section>

          {/* Stats Section - Moved here */}
          <section className="bg-navy py-16 md:py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-white italic">
                      {stat.value}
                    </p>
                    <p className="mt-3 text-xs md:text-sm uppercase tracking-wider text-white/70 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-cream py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-10">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy tracking-wide uppercase text-center mb-16">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="font-heading text-lg text-navy pr-4">{item.question}</span>
                      <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-navy text-navy transition-transform duration-300 ${openFaq === index ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/locations/fremont-1031-exchange.jpg"
                alt="Partner with our team"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy/80" />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-wide">
                Partner With Our Expert Team
              </h2>
              <p className="mt-6 text-white/80 text-lg max-w-2xl mx-auto">
                Our San Jose team delivers deep local knowledge and full-service support for your 1031 exchange. 
                Let us guide you through the process with precision, compliance, and personalized care.
              </p>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-navy px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-lime hover:text-navy-dark transition-all duration-300"
                >
                  Let's Get Started
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
