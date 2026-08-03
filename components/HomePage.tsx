"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ContactFormWrapper } from "../app/contact/contact-form";
import { LOCATIONS_ROUTE } from "../lib/config";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";

const ownerSituations = [
  {
    title: "Planning a Property Sale",
    copy: "Start before the listing or purchase agreement so the exchange structure and independent qualified intermediary can be addressed before proceeds change hands.",
    href: "/contact?projectType=Planning+a+property+sale",
  },
  {
    title: "Already Under Contract",
    copy: "The calendar is moving. Call now to organize the exchange team, closing instructions, replacement criteria, and the questions that still need answers.",
    href: "/contact?projectType=Property+already+under+contract",
  },
  {
    title: "Selling Inherited Property",
    copy: "Review inherited investment real estate, ownership, intended use, management burden, and potential sale paths with the appropriate tax and legal professionals.",
    href: "/services/inherited-property-capital-gains",
  },
  {
    title: "Leaving Landlord Work Behind",
    copy: "Compare another directly owned property with net-lease and professionally managed DST possibilities when tenants, maintenance, or capital projects have become too much.",
    href: "/services/passive-real-estate-income",
  },
  {
    title: "Finding Replacement Property",
    copy: "Build a practical search around exchange equity, debt, income objectives, control, geography, management responsibilities, and the ability to close on time.",
    href: "/contact?request=properties",
  },
  {
    title: "Buying Before You Sell",
    copy: "Explore reverse-exchange questions when the preferred replacement opportunity appears before the San Jose property is ready to close.",
    href: "/services/reverse-1031-exchange-explained",
  },
];

const exchangeSupport = [
  {
    title: "Exchange Setup",
    copy: "Clarify the sale, ownership, timing, estimated equity, debt, and the independent professionals who need to be involved before closing.",
  },
  {
    title: "Replacement Strategy",
    copy: "Compare direct real estate, net-lease properties, and passive DST possibilities against the same income, control, workload, and diversification goals.",
  },
  {
    title: "Property Information",
    copy: "Request current property information and organize primary and backup candidates around diligence, financing, risk, and realistic closing probability.",
  },
  {
    title: "Professional Handoffs",
    copy: "Keep the qualified intermediary, CPA, attorney, brokers, lenders, inspectors, and licensed securities professionals aligned with the transaction facts.",
  },
];

const replacementPaths = [
  {
    path: "Direct Property",
    control: "The owner directs leasing, financing, improvements, and the eventual sale.",
    management: "The owner or a hired property manager operates the asset.",
    review: "Title, leases, condition, operations, market, financing, and closing feasibility.",
  },
  {
    path: "Net-Lease Property",
    control: "The owner controls the real estate subject to the tenant and lease terms.",
    management: "The lease assigns specified responsibilities to the tenant, but ownership duties remain.",
    review: "Tenant and guaranty strength, lease terms, property condition, residual value, and reletting market.",
  },
  {
    path: "DST Interest",
    control: "The sponsor controls the trust, financing, property operations, and disposition.",
    management: "Professional management removes day-to-day landlord decisions.",
    review: "Offering documents, sponsor, fees, conflicts, leverage, property risk, illiquidity, eligibility, and suitability.",
  },
];

const exchangeStages = [
  {
    title: "Before the Property Sells",
    copy: "Discuss ownership, use, basis questions, expected equity, debt, management goals, and the independent qualified intermediary before sale proceeds can reach the seller.",
  },
  {
    title: "When the Sale Is Under Contract",
    copy: "Confirm exchange documents, closing instructions, the calendar, lender needs, and a written replacement-property brief while there is still time to act.",
  },
  {
    title: "During the Replacement Search",
    copy: "Compare primary and backup candidates for diligence, financing, control, workload, risk, and the probability of closing within the exchange period.",
  },
  {
    title: "Through Replacement Closing",
    copy: "Keep open questions visible across title, inspections, environmental review, insurance, entity documents, financing, and funding directions.",
  },
];

const featuredLocations = [
  { name: "San Jose", slug: "/locations/san-jose-ca", image: "/san-jose-hero-1031-exchange.jpg" },
  { name: "Palo Alto", slug: "/locations/palo-alto-ca", image: "/service-areas/palo-alto-ca/palo-alto-ca-sj.jpg" },
  { name: "Mountain View", slug: "/locations/mountain-view-ca", image: "/service-areas/mountain-view-ca/mountain-view-ca-sj.jpg" },
  { name: "Sunnyvale", slug: "/locations/sunnyvale-ca", image: "/service-areas/sunnyvale-ca/sunnyvale-ca-sj.jpg" },
  { name: "Santa Clara", slug: "/locations/santa-clara-ca", image: "/service-areas/santa-clara-ca/santa-clara-ca.webp" },
  { name: "Fremont", slug: "/locations/fremont-ca", image: "/service-areas/fremont-ca/fremont-ca.jpg" },
];

const tools = [
  {
    name: "Boot Calculator",
    copy: "Estimate potential cash and debt boot before discussing the transaction with a tax professional.",
    href: "/tools/boot-calculator",
  },
  {
    name: "Exchange Cost Estimator",
    copy: "Organize possible intermediary, escrow, title, recording, and other transaction costs.",
    href: "/tools/exchange-cost-estimator",
  },
  {
    name: "Identification Rules Checker",
    copy: "Review how a proposed replacement list fits the common three-property, 200%, and 95% identification limits.",
    href: "/tools/identification-rules-checker",
  },
];

const faqItems = [
  {
    question: "Can you help if my San Jose property is already under contract?",
    answer:
      "Yes. Call as soon as possible. A qualified intermediary generally needs to be engaged and the exchange documents need to be in place before the relinquished-property sale closes and the seller receives the proceeds.",
  },
  {
    question: "What if this is my first 1031 exchange?",
    answer:
      "The process can begin with a free conversation about the property, ownership, sale timing, estimated equity, debt, management goals, and possible replacement paths. The appropriate independent qualified intermediary, CPA, attorney, brokers, lenders, and other professionals can then address their respective work.",
  },
  {
    question: "Can inherited property be used in a 1031 exchange?",
    answer:
      "Inherited property may qualify after it is held for investment or productive use, but basis, ownership, estate matters, prior use, and the owner's intent can materially change the analysis. Those facts should be reviewed with a CPA and attorney before the sale advances.",
  },
  {
    question: "How can I leave active property management?",
    answer:
      "Owners can compare another directly owned asset with a net-lease property or a professionally managed DST interest. Each path has different tradeoffs involving control, workload, financing, concentration, liquidity, fees, and risk.",
  },
  {
    question: "Does a DST require me to manage tenants or repairs?",
    answer:
      "The DST sponsor and property manager handle day-to-day property operations. The investor gives up operational control and must evaluate the sponsor, fees, leverage, property risks, conflicts, illiquidity, offering terms, eligibility, and suitability with an appropriately licensed professional.",
  },
  {
    question: "Can I compare direct real estate and DST replacement options?",
    answer:
      "Yes. The useful comparison starts with the same transaction objective: desired income profile, control, management responsibility, diversification, financing, liquidity, risk, and the ability to close within the exchange period.",
  },
  {
    question: "Can I receive a current replacement-property list?",
    answer:
      "Yes. Submit the short form and describe the planned sale, expected timing, approximate exchange equity, and the type of ownership or management profile you want to consider. Current availability changes and should be confirmed before relying on any property information.",
  },
  {
    question: "How early should I call before selling?",
    answer:
      "Before listing is ideal, and before signing a sale contract is even better. Early planning creates more time to clarify ownership, select the independent qualified intermediary, estimate exchange equity, and build a replacement-property strategy before the deadlines begin.",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "1031 Exchange San Jose",
  url: "https://www.1031exchangesanjose.com/",
  logo: "https://www.1031exchangesanjose.com/1031-exchange-san-jose-logo.png",
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

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <div className="bg-white text-gray-900">
        <main>
          <section className="relative flex min-h-[720px] items-center overflow-hidden pt-20 sm:min-h-[740px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 hidden h-full w-full object-cover md:block"
            >
              <source src="/49ers!.mp4" type="video/mp4" />
            </video>
            <Image
              src="/san-jose-hero-1031-exchange.jpg"
              alt="San Jose skyline"
              fill
              priority
              sizes="100vw"
              className="object-cover md:hidden"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1629]/95 via-[#0F1629]/78 to-[#0F1629]/40" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
              <div className="max-w-4xl">
                <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.35em] text-white/65">
                  Free 1031 Exchange Guidance for San Jose Property Owners
                </p>
                <h1 className="max-w-4xl font-heading text-5xl font-light leading-[1.02] tracking-[0.03em] text-white sm:text-6xl md:text-7xl lg:text-[4.7rem]">
                  Turnkey 1031 Exchange Solutions in San Jose, CA
                </h1>
                <p className="mt-6 max-w-3xl text-base font-light leading-7 text-white/[0.82] sm:text-lg">
                  Selling a rental, inherited investment property, multifamily building, or commercial asset? Get help understanding the exchange, assembling the right independent professionals, and comparing direct real estate, net-lease, and passive DST replacement possibilities.
                </p>

                <div className="mt-6 grid max-w-3xl gap-3 text-sm text-white/[0.82] sm:grid-cols-3">
                  {[
                    "Start before listing or call while under contract",
                    "Compare direct and passive replacement paths",
                    "Request current property information",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 border-l border-white/35 pl-4 leading-6">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <a
                    href={phoneNumberHref}
                    className="inline-flex min-h-14 items-center justify-center gap-3 bg-white px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:bg-gray-100"
                  >
                    Call {phoneNumberDisplay}
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/65 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-navy"
                  >
                    Start My Exchange <ArrowIcon />
                  </Link>
                  <Link
                    href="/contact?request=properties"
                    className="inline-flex min-h-14 items-center justify-center gap-3 px-3 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white underline decoration-white/35 underline-offset-8 transition hover:decoration-white"
                  >
                    Get a Free Property List
                  </Link>
                </div>
                <p className="mt-5 text-xs leading-5 text-white/[0.55]">Free educational guidance. No obligation.</p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 bg-white">
            <div className="mx-auto grid max-w-7xl divide-y divide-gray-200 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-10">
              {[
                ["Selling soon?", "Build the exchange plan before proceeds change hands.", "/contact?projectType=Planning+a+property+sale"],
                ["Already under contract?", "Call now while there is still time to protect the exchange path.", phoneNumberHref],
                ["Want less management?", "Compare direct property, net lease, and DST possibilities.", "/services/passive-real-estate-income"],
              ].map(([title, copy, href]) => (
                <Link key={title} href={href} className="group px-0 py-7 sm:px-7 lg:px-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">{title}</p>
                  <p className="mt-2 flex items-center justify-between gap-4 text-sm leading-6 text-gray-500">
                    <span>{copy}</span>
                    <span className="transition group-hover:translate-x-1"><ArrowIcon /></span>
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                <div className="relative min-h-[460px] overflow-hidden lg:min-h-[620px]">
                  <Image
                    src="/service-areas/palo-alto-ca/palo-alto-ca-sj.jpg"
                    alt="Bay Area investment property"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 max-w-md p-8 text-white md:p-10">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/65">A better place to begin</p>
                    <p className="mt-4 text-2xl font-light leading-9">Start with the property, the sale, and the life you want after closing.</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/60">One conversation can organize the next move</p>
                  <h2 className="mt-5 text-4xl font-light leading-tight text-gray-900 md:text-5xl">
                    The exchange should fit the reason you are selling.
                  </h2>
                  <p className="mt-7 text-lg font-light leading-8 text-gray-600">
                    San Jose owners come to a 1031 exchange from very different situations. Some want another property they can control. Others want to reduce landlord responsibilities, diversify beyond Silicon Valley, replace income, or create a more manageable real estate portfolio.
                  </p>
                  <p className="mt-5 text-base font-light leading-7 text-gray-500">
                    The useful starting point is not a technical rule. It is a clear picture of the current property, sale timing, ownership, equity, debt, desired income, management capacity, and the tradeoffs the owner is willing to make.
                  </p>
                  <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                    <a href={phoneNumberHref} className="btn-primary">Talk to a 1031 Expert</a>
                    <Link href="/contact?request=guide" className="btn-outline">Get Free Information</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/60">Whatever brought you here</p>
                <h2 className="mt-5 text-4xl font-light leading-tight text-gray-900 md:text-5xl">Get help with the transaction in front of you.</h2>
                <p className="mt-6 text-lg font-light leading-8 text-gray-500">Choose the situation that sounds closest to yours or call for a free conversation.</p>
              </div>

              <div className="mt-14 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2 lg:grid-cols-3">
                {ownerSituations.map((item) => (
                  <Link key={item.title} href={item.href} className="group flex min-h-[270px] flex-col bg-white p-8 transition hover:bg-gray-50 md:p-10">
                    <h3 className="text-2xl font-light text-gray-900">{item.title}</h3>
                    <p className="mt-5 flex-1 text-sm font-light leading-7 text-gray-500">{item.copy}</p>
                    <span className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy">
                      Learn More <span className="transition group-hover:translate-x-1"><ArrowIcon /></span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-navy py-20 text-white md:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Turnkey 1031 exchange solutions</p>
                  <h2 className="mt-5 text-4xl font-light leading-tight md:text-5xl">Bring the sale, replacement search, and professional team into one clear plan.</h2>
                  <p className="mt-7 text-base font-light leading-8 text-white/65">
                    Free guidance gives San Jose property owners a place to begin. The qualified intermediary, CPA, attorney, brokers, lenders, inspectors, and licensed securities professionals remain responsible for their regulated work.
                  </p>
                  <a href={phoneNumberHref} className="mt-9 inline-flex min-h-14 items-center justify-center bg-white px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:bg-gray-100">
                    Call {phoneNumberDisplay}
                  </a>
                </div>

                <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2">
                  {exchangeSupport.map((item) => (
                    <div key={item.title} className="bg-navy p-8 md:p-10">
                      <h3 className="text-xl font-light text-white">{item.title}</h3>
                      <p className="mt-4 text-sm font-light leading-7 text-white/[0.58]">{item.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/60">Passive replacement possibilities</p>
                  <h2 className="mt-5 text-4xl font-light leading-tight text-gray-900 md:text-5xl">Move beyond tenants, maintenance, and renovations.</h2>
                  <p className="mt-7 text-lg font-light leading-8 text-gray-600">
                    A Delaware Statutory Trust may give an eligible investor fractional ownership in professionally managed, institutional-quality real estate without personally handling tenant calls, leasing, repairs, or capital projects.
                  </p>
                  <div className="mt-8 space-y-4">
                    {[
                      "No day-to-day property management responsibilities",
                      "Access to larger professionally managed real estate",
                      "Some offerings may begin around a $100,000 investment",
                      "Potential to divide exchange equity among multiple offerings",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-4 border-b border-gray-200 pb-4 text-sm leading-6 text-gray-600">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-navy" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-xs leading-6 text-gray-500">
                    DST interests are securities. Availability, distributions, fees, leverage, sponsor and property risk, conflicts, illiquidity, eligibility, and suitability vary and require review with an appropriately licensed professional.
                  </p>
                  <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                    <Link href="/contact?request=properties" className="btn-primary">See the Free Property List</Link>
                    <a href={phoneNumberHref} className="btn-outline">Free Consultation</a>
                  </div>
                </div>

                <div className="relative min-h-[500px] overflow-hidden lg:min-h-[650px]">
                  <Image
                    src="/property-types/multifamily/multifamily-sj.jpg"
                    alt="Professionally managed multifamily property"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 text-white md:p-12">
                    <p className="max-w-lg text-2xl font-light leading-9">Real estate ownership can continue without continuing the same landlord job.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/60">Compare ownership paths</p>
                <h2 className="mt-5 text-4xl font-light leading-tight text-gray-900 md:text-5xl">Different replacements solve different problems.</h2>
                <p className="mt-6 text-lg font-light leading-8 text-gray-500">Use the same San Jose sale objective to compare control, management responsibility, and the diligence each path requires.</p>
              </div>

              <div className="mt-12 overflow-x-auto border border-gray-200">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  <thead className="bg-navy text-white">
                    <tr>
                      <th className="px-7 py-5 text-xs font-semibold uppercase tracking-[0.16em]">Replacement Path</th>
                      <th className="px-7 py-5 text-xs font-semibold uppercase tracking-[0.16em]">Control</th>
                      <th className="px-7 py-5 text-xs font-semibold uppercase tracking-[0.16em]">Management</th>
                      <th className="px-7 py-5 text-xs font-semibold uppercase tracking-[0.16em]">Primary Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {replacementPaths.map((row) => (
                      <tr key={row.path} className="border-t border-gray-200 align-top">
                        <th className="w-[17%] bg-gray-50 px-7 py-7 text-base font-semibold text-gray-900">{row.path}</th>
                        <td className="w-[25%] px-7 py-7 text-sm font-light leading-6 text-gray-600">{row.control}</td>
                        <td className="w-[25%] px-7 py-7 text-sm font-light leading-6 text-gray-600">{row.management}</td>
                        <td className="px-7 py-7 text-sm font-light leading-6 text-gray-600">{row.review}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/60">A clear path through the transaction</p>
                  <h2 className="mt-5 text-4xl font-light leading-tight text-gray-900 md:text-5xl">How a San Jose 1031 exchange moves forward.</h2>
                  <p className="mt-7 text-base font-light leading-8 text-gray-500">The strongest exchange starts before the sale closes and keeps the replacement search tied to the owner&apos;s real objectives.</p>
                  <a href={phoneNumberHref} className="btn-primary mt-9">First Exchange? Talk to an Expert</a>
                </div>

                <div className="border-t border-gray-300">
                  {exchangeStages.map((stage) => (
                    <div key={stage.title} className="grid gap-4 border-b border-gray-300 py-7 sm:grid-cols-[0.36fr_0.64fr] sm:gap-8">
                      <h3 className="text-xl font-light text-gray-900">{stage.title}</h3>
                      <p className="text-sm font-light leading-7 text-gray-500">{stage.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/60">Silicon Valley and nationwide replacement reach</p>
                  <h2 className="mt-5 text-4xl font-light leading-tight text-gray-900 md:text-5xl">Local sale questions. Replacement options beyond one market.</h2>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href={LOCATIONS_ROUTE} className="btn-outline">View All Locations</Link>
                  <Link href="/contact?request=properties" className="btn-primary">Get a Free Property List</Link>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 lg:grid-cols-3">
                {featuredLocations.map((location) => (
                  <Link key={location.slug} href={location.slug} className="group relative h-56 overflow-hidden sm:h-72 lg:h-80">
                    <Image
                      src={location.image}
                      alt={`${location.name} 1031 exchange services`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/45 transition group-hover:bg-black/35" />
                    <div className="absolute inset-0 flex items-center justify-center p-5 text-center">
                      <h3 className="text-base font-light uppercase tracking-[0.16em] text-white sm:text-xl">{location.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-navy py-20 text-white md:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">Free planning tools</p>
                  <h2 className="mt-4 text-3xl font-light md:text-4xl">Understand the questions before the deadlines begin.</h2>
                </div>
                <Link href="/tools" className="text-xs font-semibold uppercase tracking-[0.18em] text-white underline decoration-white/30 underline-offset-8">View All Tools</Link>
              </div>
              <div className="mt-10 grid gap-px bg-white/15 md:grid-cols-3">
                {tools.map((tool) => (
                  <Link key={tool.href} href={tool.href} className="group bg-navy p-8 transition hover:bg-navy-light md:p-10">
                    <h3 className="text-xl font-light">{tool.name}</h3>
                    <p className="mt-4 text-sm font-light leading-7 text-white/[0.55]">{tool.copy}</p>
                    <span className="mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">Use Tool <span className="transition group-hover:translate-x-1"><ArrowIcon /></span></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gray-50 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/60">Frequently asked questions</p>
                  <h2 className="mt-5 text-4xl font-light leading-tight text-gray-900 md:text-5xl">Questions that usually come before the property search.</h2>
                  <p className="mt-7 text-base font-light leading-8 text-gray-500">Have a different situation? Call for free educational guidance.</p>
                  <a href={phoneNumberHref} className="btn-primary mt-9">Call {phoneNumberDisplay}</a>
                </div>

                <div className="border-t border-gray-300">
                  {faqItems.map((item, index) => (
                    <div key={item.question} className="border-b border-gray-300">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="flex w-full items-center justify-between gap-5 py-6 text-left"
                        aria-expanded={openFaq === index}
                      >
                        <span className="text-base font-normal text-gray-900">{item.question}</span>
                        <span className={`text-2xl font-light text-gray-400 transition ${openFaq === index ? "rotate-45" : ""}`}>+</span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-96 pb-6" : "max-h-0"}`}>
                        <p className="max-w-3xl text-sm font-light leading-7 text-gray-500">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-navy-dark py-20 text-white md:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">Free 1031 exchange guidance</p>
                  <h2 className="mt-5 text-4xl font-light leading-tight md:text-5xl">Tell us what you are selling and where you are in the process.</h2>
                  <p className="mt-7 text-base font-light leading-8 text-white/[0.62]">Use the short form or call now. The first conversation can focus on the transaction, the reason for selling, and the help needed next.</p>
                  <a href={phoneNumberHref} className="mt-9 inline-flex min-h-14 items-center justify-center bg-white px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:bg-gray-100">Call {phoneNumberDisplay}</a>
                </div>
                <ContactFormWrapper />
              </div>
            </div>
          </section>
        </main>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
