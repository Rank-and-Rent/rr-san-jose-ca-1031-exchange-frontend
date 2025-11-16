"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { locationsData } from "../data/locations";
import { servicesData } from "../data/services";
import { propertyTypesData } from "../data/property-types";
import SearchInput from "./SearchInput";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  Calculator,
  CheckCircle2,
  DollarSign,
  Factory,
  FileText,
  Gavel,
  Globe,
  Hotel,
  Layers,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Store,
  Warehouse,
} from "lucide-react";
import ContactForm from "../app/contact/ContactForm";
import { LOCATIONS_ROUTE } from "../lib/config";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";
const hasStaffedOffice = false;

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

type Badge = {
  icon: LucideIcon;
  label: string;
  detail: string;
};

const trustBadges: Badge[] = [
  { icon: BarChart3, label: "CPA Partner", detail: "Workpapers synched to firm portals" },
  { icon: ShieldCheck, label: "Qualified Intermediary", detail: "Segregated escrow controls" },
  { icon: Gavel, label: "Legal Review", detail: "Counsel-ready documentation sets" },
  { icon: CheckCircle2, label: "IRS Compliant", detail: "Audit trails with timestamping" },
];

const timelineStats = [
  { label: "45 Days", detail: "Identification surveillance with alerts every morning" },
  { label: "180 Days", detail: "Closing countdown backed by redundant reminders" },
  { label: "0 Deadline Errors", detail: "Automated compliance logs since 2016" },
];

const services = [
  {
    title: "Exchange Intelligence Briefing",
    detail: "Model relinquished equity, gain exposure, and qualified intermediary routing in one intake.",
  },
  {
    title: "Qualified Escrow Administration",
    detail: "Segregated trust accounts with dual-authentication release procedures and 24 hour reporting.",
  },
  {
    title: "Replacement Benchmarking",
    detail: "Compare Silicon Valley and statewide assets with yield, debt, and depreciation tables.",
  },
  {
    title: "Compliance Clock Monitoring",
    detail: "Live timeline dashboard that mirrors IRS 45 and 180 day milestones with documented notices.",
  },
  {
    title: "Gain and Debt Modeling",
    detail: "Project federal and California 1031 tax deferral scenarios alongside refinance impacts.",
  },
  {
    title: "Advisor Coordination Desk",
    detail: "Central point for brokers, attorneys, and CPAs with encrypted file exchange and audit notes.",
  },
];

const propertyTypes: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: Store, title: "Single Tenant Retail", detail: "Convenience stores, drive thru QSR, pharmacies, and dollar stores." },
  { icon: Building2, title: "Net Lease Properties", detail: "Triple net lease properties featuring essential service tenants with investment-grade credit ratings, providing stable passive income with minimal landlord responsibilities." },
  { icon: Warehouse, title: "Last Mile Logistics", detail: "Flex space and logistics facilities for e-commerce." },
  { icon: Factory, title: "Auto Service Properties", detail: "Auto parts, oil change, and tire store locations." },
  { icon: Activity, title: "Medical Properties", detail: "Urgent care, veterinary, and dental facilities." },
  { icon: Store, title: "Specialty Retail", detail: "Specialty grocers, telecom retail, and ground leases." },
];

const californiaCities = [
  locationsData.find((l) => l.slug === "san-jose"),
  ...locationsData.filter((l) => l.slug !== "san-jose").slice(0, 7),
]
  .filter(Boolean)
  .map((l) => ({
    name: l!.name,
    slug: l!.route,
  }));

const irsLinks = [
  {
    label: "IRS Form 8824 instructions",
    href: "https://www.irs.gov/forms-pubs/about-form-8824",
  },
  {
    label: "Like-kind exchange guidance",
    href: "https://www.irs.gov/newsroom/like-kind-exchanges-real-estate-tax-tips",
  },
  {
    label: "Rev. Proc. 2008-16 Safe Harbor",
    href: "https://www.irs.gov/pub/irs-drop/rp-08-16.pdf",
  },
];

const whyCards = [
  "Local expertise across the Bay Area",
  "Intermediary and legal integration",
  "Transparent reporting dashboards",
  "Fast communication cycles",
  "Secure, compliant documentation",
];

const tools = [
  {
    name: "Boot Calculator",
    slug: "boot-calculator",
    description: "Calculate boot and estimate tax implications for your 1031 exchange.",
    icon: DollarSign,
  },
  {
    name: "Exchange Cost Estimator",
    slug: "exchange-cost-estimator",
    description: "Estimate QI fees, escrow costs, title insurance, and recording fees.",
    icon: Calculator,
  },
  {
    name: "Identification Rules Checker",
    slug: "identification-rules-checker",
    description: "Validate your property identification against IRS rules.",
    icon: CheckCircle2,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const faqItems = [
  {
    question: "What are the 45 and 180 day deadlines?",
    answer:
      "Day zero begins the moment the relinquished property closes. You receive forty five calendar days to identify up to three replacements and one hundred eighty days to acquire and close on one or more of those identified assets. Our compliance clock documents every notification to prove diligence.",
  },
  {
    question: "Which properties qualify as like-kind?",
    answer:
      "Like-kind real estate includes most real property held for investment or productive use, so an apartment tower may be exchanged for an industrial park, a medical office, or raw land. The assets must be inside the United States and held for business or investment, never for personal use.",
  },
  {
    question: "What is boot and how is it taxed?",
    answer:
      "Boot is any non-like-kind value received, such as cash, debt relief, or personal property. Boot is taxable up to the amount of realized gain and is reported on Form 8824 before flowing to Schedule D and Form 4797. We flag potential boot early so you can rebalance debt or consider promissory notes.",
  },
  {
    question: "Are California transfer taxes deferred?",
    answer:
      "California transfer taxes are generally due at the time of recording and are not deferred by a 1031 exchange. Counties may offer exemptions for specific intra-family or affordable housing transfers, so we coordinate with local recorders to confirm obligations before closing.",
  },
  {
    question: "Can I perform a reverse exchange?",
    answer:
      "Yes. A reverse exchange requires a qualified exchange accommodation arrangement in which the replacement property is parked by an accommodator until the relinquished asset sells. We coordinate title-holding entities, loan consents, and IRS Rev. Proc. 2000-37 requirements.",
  },
  {
    question: "How do I report with Form 8824?",
    answer:
      "Form 8824 captures the timeline, identification list, basis adjustments, and boot calculations. The form then informs Schedule D and Form 4797. We deliver organized ledgers, exchanger statements, and escrow proofs so your CPA can file with confidence.",
  },
];

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
  sameAs: [
    "https://www.linkedin.com",
    "https://www.youtube.com",
    "https://www.facebook.com",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "1031 Exchange San Jose",
  url: "https://www.1031exchangesanjose.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.1031exchangesanjose.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
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

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "1031 Exchange San Jose",
  description:
    "Bay Area 1031 exchange specialists offering compliant, technology-driven coordination for investors across Northern California.",
  url: "https://www.1031exchangesanjose.com/",
  areaServed: {
    "@type": "State",
    name: "California",
  },
  serviceType: "1031 Exchange Property Identification",
  provider: {
    "@type": "Organization",
    name: "1031 Exchange San Jose",
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
  },
};

export default function HomePage() {
  return (
    <>
      <div className="bg-[#F9FAFB] text-[#111827]">
        <main>
          <section
            id="hero"
            className="relative isolate overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#F9FAFB] text-white"
          >
            <div className="absolute inset-0">
              <img
                src="/san-jose-hero-1031-exchange.jpg"
                alt="San Jose skyline"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#111827]/85 to-[#0F172A]/90" />
              <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#3B82F6]/40 blur-3xl" />
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent opacity-60 backdrop-blur-xl" />
            </div>
            <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
              <div className="grid gap-12 lg:grid-cols-2">
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  className="space-y-8"
                >
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80">
                    <span className="h-2 w-2 rounded-full bg-[#3B82F6] animate-pulse" aria-hidden />
                    Precision for 1031 Exchange San Jose
                  </p>
                  <div className="space-y-6">
                    <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                      San Jose 1031 Exchange Experts
                    </h1>
                    <p className="max-w-xl text-lg text-white/80">
                      Compliant 1031 exchanges for Bay Area investors who need technology-driven coordination, zero tolerance for deadline risk, and verified qualified intermediary controls.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="#lead-form"
                      className="inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
                    >
                      Start My Exchange
                    </Link>
                    <a
                      href={phoneNumberHref}
                      className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:text-white"
                      aria-label={`Call ${phoneNumberDisplay}`}
                    >
                      Call {phoneNumberDisplay}
                    </a>
                  </div>
                  <p className="text-sm text-white/70">
                    45 Day identification. 180 Day closing. Stay compliant with every deadline.
                  </p>
                </motion.div>
                <motion.div
                  id="lead-form"
                  variants={scaleUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="rounded-3xl p-8"
                >
                  <div className="flex items-center gap-3 text-sm font-semibold text-white mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6]/20 text-white">
                      <PhoneCall className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p>Request a confidential consultation</p>
                      <p className="text-xs text-white/70">Responses within one business day</p>
                    </div>
                  </div>
                  <ContactForm className="!border-0 !shadow-none !p-0" darkMode={true} />
                </motion.div>
              </div>
            </div>
          </section>

          <section className="relative bg-[#0F172A] py-10 text-white">
            <motion.div
              className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {trustBadges.map((badge) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#3B82F6]">
                        <span className="absolute inset-0 rounded-full border border-white/20" aria-hidden />
                        <badge.icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">{badge.label}</h3>
                    </div>
                    <p className="text-sm text-white/70">{badge.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 md:px-10 grid gap-16 lg:grid-cols-2">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">
                  Proven California 1031 intermediary
                </p>
                <h2 className="text-3xl font-semibold text-[#0F172A]">
                  Local intelligence with compliance-grade precision
                </h2>
                <p className="text-lg text-[#374151]">
                  Our San Jose desk combines licensed qualified intermediary controls with a modular workflow that investors, brokers, and CPAs see in real time. Every exchange file receives a data room, encrypted ledger, and audit-ready documentation chain.
                </p>
                <ul className="space-y-4 text-[#1F2937]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[#3B82F6]" aria-hidden />
                    <span>California 1031 intermediary oversight tuned for Silicon Valley deal velocity.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[#3B82F6]" aria-hidden />
                    <span>Digital exchange binder with timestamped approvals, wire proofs, and intermediary instructions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[#3B82F6]" aria-hidden />
                    <span>Analyst team on the ground in San Jose, coordinating with brokers across Santa Clara County.</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                className="grid gap-6 sm:grid-cols-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {timelineStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={scaleUp}
                    className="rounded-3xl border border-[#E5E7EB] bg-gradient-to-br from-white to-[#F3F4F6] p-8 shadow-lg"
                  >
                    <p className="text-4xl font-semibold text-[#0F172A]">{stat.label}</p>
                    <p className="mt-3 text-sm text-[#4B5563]">{stat.detail}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="bg-[#F9FAFB] py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="space-y-6 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">
                  How a 1031 works
                </p>
                <h2 className="text-3xl font-semibold text-[#0F172A]">Connected timeline with monitored nodes</h2>
              </div>
              <div className="relative mt-12">
                <motion.div
                  className="absolute top-1/2 left-0 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent md:block"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  aria-hidden
                />
                <div className="grid gap-10 md:grid-cols-3">
                  {[
                    "Sell relinquished property",
                    "Identify replacements within 45 days",
                    "Close on new property within 180 days",
                  ].map((step, idx) => (
                    <motion.div
                      key={step}
                      className="relative rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-lg"
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">
                        Node {idx + 1}
                      </span>
                      <p className="mt-4 text-lg font-semibold text-[#0F172A]">{step}</p>
                      <p className="mt-2 text-sm text-[#4B5563]">
                        We capture every timestamp, wire, and document to protect the 1031 tax deferral.
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-[#2563EB]">
                {irsLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1D4ED8] transition hover:border-[#1D4ED8]"
                  >
                    <FileText className="h-4 w-4" aria-hidden />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-b from-[#F9FAFB] to-[#EEF2FF] py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">
              <div className="space-y-4 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">
                  Why California investors choose us
                </p>
                <h2 className="text-3xl font-semibold text-[#0F172A]">Glass deck of advantages</h2>
                <p className="text-lg text-[#4B5563]">
                  A data-first workflow purpose-built for Qualified intermediary San Jose engagements.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
                {whyCards.map((card) => (
                  <motion.div
                    key={card}
                    className="rounded-3xl border border-white/70 bg-white/60 p-6 text-sm font-medium text-[#0F172A] shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    {card}
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-[#4B5563]">
                A 1031 exchange defers federal and California income tax on qualifying real property. It does not remove city or state transfer taxes.{" "}
                <a
                  href="https://www.cdtfa.ca.gov/taxes-and-fees/property-tax.htm"
                  className="text-[#2563EB] underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Review California transfer tax guidance
                </a>
                .
              </p>
            </div>
          </section>

          <section className="bg-white py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">
                    Our exchange services
                  </p>
                  <h2 className="text-3xl font-semibold text-[#0F172A]">Services preview with neon precision</h2>
                </div>
                <Link
                  href="/services/"
                  className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1D4ED8] transition hover:bg-[#EFF6FF]"
                >
                  See all services
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="max-w-2xl">
                <SearchInput
                  placeholder="Search services..."
                  items={servicesData.slice(0, 6).map((s) => ({ title: s.name, slug: s.route }))}
                  className="mb-6"
                />
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {servicesData.slice(0, 6).map((service) => (
                  <motion.div
                    key={service.slug}
                    className="rounded-3xl border border-[#E0E7FF] bg-white p-6 shadow-lg transition hover:border-[#3B82F6] hover:shadow-blue-100"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B82F6]/10 text-[#1D4ED8]">
                      <Layers className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-[#0F172A]">{service.name}</h3>
                    <p className="mt-3 text-sm text-[#4B5563]">{service.short}</p>
                    <Link
                      href={service.route}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:gap-3 transition-all"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#F3F4F6] py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">
                  Property intelligence
                </p>
                <h2 className="text-3xl font-semibold text-[#0F172A]">Property types we manage</h2>
                <p className="text-lg text-[#4B5563]">
                  Explore eligible property categories and understand how capital can flow between Silicon Valley assets and statewide holdings without triggering immediate tax.
                </p>
                <Link
                  href="/property-types/"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0F172A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0F172A] transition hover:bg-white"
                >
                  Explore property types
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {propertyTypes.map((type) => (
                  <motion.div
                    key={type.title}
                    className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-md backdrop-blur"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <type.icon className="h-6 w-6 text-[#2563EB]" aria-hidden />
                    <p className="mt-4 text-base font-semibold text-[#0F172A]">{type.title}</p>
                    <p className="mt-2 text-sm text-[#4B5563]">{type.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-10">
              <div className="text-center space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">California coverage</p>
                <h2 className="text-3xl font-semibold text-[#0F172A]">
                  Serving investors across Silicon Valley and California
                </h2>
                <p className="text-lg text-[#4B5563]">
                  Coordination hubs in San Jose connect to brokers and advisors in every major market.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <motion.div
                  className="rounded-3xl border border-[#E5E7EB] bg-[#F9FAFB] p-8 shadow-inner"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 text-sm font-semibold text-[#0F172A]">
                    <Activity className="h-5 w-5 text-[#3B82F6]" aria-hidden />
                    Market nodes monitored
                  </div>
                  <div className="mt-6">
                    <SearchInput
                      placeholder="Search locations..."
                      items={locationsData.map((l) => ({ title: l.name, slug: l.route }))}
                      contactRedirectPrefix="Location: "
                      className="mb-6"
                    />
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {californiaCities.map((city) => (
                      <Link
                        key={city.name}
                        href={city.slug}
                        className="flex items-center gap-3 rounded-2xl border border-white/0 bg-white/70 px-4 py-3 text-sm font-semibold text-[#0F172A] shadow transition hover:border-[#3B82F6] hover:text-[#1D4ED8]"
                      >
                        <MapPin className="h-4 w-4 text-[#2563EB]" aria-hidden />
                        {city.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      href={LOCATIONS_ROUTE}
                      className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#3B82F6] transition hover:bg-[#EFF6FF]"
                    >
                      View All {locationsData.length} Locations
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  className="rounded-3xl border border-[#E5E7EB] bg-gradient-to-br from-white to-[#EFF6FF] p-8 shadow-lg"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Next step</p>
                  <h3 className="mt-4 text-2xl font-semibold text-[#0F172A]">Plan your statewide deployment</h3>
                  <p className="mt-4 text-sm text-[#4B5563]">
                    Whether you are rolling into Silicon Valley AI campuses or diversifying into Sacramento industrial parks, our Qualified intermediary San Jose team documents every compliance checkpoint.
                  </p>
                  <Link
                    href={LOCATIONS_ROUTE}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#111827]"
                  >
                    See locations
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="bg-white py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">
                    Exchange Tools
                  </p>
                  <h2 className="text-3xl font-semibold text-[#0F172A]">Free Calculators & Resources</h2>
                </div>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1D4ED8] transition hover:bg-[#EFF6FF]"
                >
                  View All Tools
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={tool.slug}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-[#0B3C5D] to-[#16486C] p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <Link href={`/tools/${tool.slug}`} className="block">
                        <Icon className="mb-4 h-12 w-12 text-[#C9A227]" />
                        <h3 className="mb-2 text-2xl font-semibold">{tool.name}</h3>
                        <p className="text-gray-100">{tool.description}</p>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-[#F9FAFB] py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-8">
              <div className="text-center space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Frequently asked questions</p>
                <h2 className="text-3xl font-semibold text-[#0F172A]">FAQ for investors, brokers, and advisors</h2>
              </div>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
                  >
                    <summary className="flex cursor-pointer items-center justify-between text-left text-lg font-semibold text-[#0F172A]">
                      {item.question}
                      <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-sm transition group-open:bg-[#3B82F6] group-open:text-white">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-sm text-[#4B5563]">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] py-20 md:py-28 text-white">
            <div className="max-w-4xl mx-auto px-6 md:px-10 text-center space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Final call to action</p>
              <h2 className="text-3xl font-semibold">Ready To Begin Your 1031 Exchange?</h2>
              <p className="text-lg text-white/80">
                Our San Jose team combines local knowledge with technology to help you stay compliant and protect your returns.
              </p>
              <Link
                href="#lead-form"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0F172A] transition hover:bg-[#F0F2F8]"
              >
                Start My Exchange
              </Link>
            </div>
          </section>
        </main>
        <footer className="bg-[#0B1220] text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid gap-10 lg:grid-cols-4">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">1031 Exchange San Jose</p>
              <p className="text-2xl font-semibold">California Qualified Intermediary Network</p>
              <p className="text-sm text-white/70">
                {hasStaffedOffice
                  ? "95 South Market Street, Floor 4, San Jose, CA 95113"
                  : "Serving all of California from Silicon Valley operations centers."}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Quick links</p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/services/" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/property-types/" className="hover:text-white">
                    Property Types
                  </Link>
                </li>
                <li>
                  <Link href={LOCATIONS_ROUTE} className="hover:text-white">
                    Locations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Compliance</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {irsLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 text-sm text-white/70">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Contact</p>
              <a href={phoneNumberHref} className="flex items-center gap-2 text-white hover:text-[#3B82F6]">
                <PhoneCall className="h-4 w-4" aria-hidden />
                {phoneNumberDisplay}
              </a>
              <p>CA DRE and intermediary partners available by appointment.</p>
              <p>Educational content only. Work with your CPA and attorney for formal tax and legal advice.</p>
            </div>
          </div>
          <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
            © {new Date().getFullYear()} 1031 Exchange San Jose. All rights reserved.
          </div>
        </footer>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
      />
    </>
  );
}
