import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";

export const metadata: Metadata = {
  title: "About Our San Jose 1031 Exchange Solutions",
  description:
    "Learn how San Jose property owners can get free 1031 exchange guidance, professional introductions, replacement-property information, and help comparing direct and passive options.",
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/about",
  },
};

const waysWeHelp = [
  {
    title: "Begin with the planned sale",
    copy: "We start with the property, ownership, expected timing, equity, debt, management burden, and the reason the owner is considering a change.",
  },
  {
    title: "Clarify the exchange path",
    copy: "Owners receive free educational guidance about the transaction sequence, deadlines, independent qualified intermediary, and questions for their CPA and attorney.",
  },
  {
    title: "Compare replacement possibilities",
    copy: "We help organize direct real estate, net-lease, and passive DST possibilities around control, income objectives, workload, diversification, risk, and closing feasibility.",
  },
  {
    title: "Keep the next decisions visible",
    copy: "Property information, financing, diligence, title, inspections, insurance, offering documents, and advisor questions are easier to address when the transaction facts remain organized.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">
      <section className="relative flex min-h-[620px] items-end overflow-hidden pt-24">
        <Image
          src="/san-jose-hero-1031-exchange.jpg"
          alt="San Jose skyline"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/75 to-navy-dark/35" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-28 text-white lg:px-10 lg:pb-24">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/[0.55]">About 1031 Exchange San Jose</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-light leading-[1.05] md:text-7xl">A practical place to begin a complicated property decision.</h1>
          <p className="mt-8 max-w-3xl text-lg font-light leading-8 text-white/[0.72]">
            We help San Jose investment-property owners understand their 1031 exchange choices, connect with the independent professionals the transaction requires, and explore replacement paths that fit what they want after the sale.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/60">The full transaction matters</p>
              <h2 className="mt-5 text-4xl font-light leading-tight md:text-5xl">The goal is not simply to explain a tax rule.</h2>
            </div>
            <div className="space-y-6 text-lg font-light leading-8 text-gray-600">
              <p>
                A successful conversation begins with why the owner is selling. The property may have appreciated, become too demanding to manage, created concentration in one market, passed through an inheritance, or no longer fit the owner&apos;s income and lifestyle objectives.
              </p>
              <p>
                From there, we help turn the facts into a usable exchange brief. That may include the relinquished property, sale timing, estimated exchange equity, debt, desired income profile, need for control, management capacity, geography, financing, and possible replacement structures.
              </p>
              <p>
                Some owners want another property they can operate directly. Others want a net-lease asset with fewer responsibilities or professionally managed DST possibilities. The right comparison depends on the owner, the transaction, and the independent tax, legal, real estate, lending, and securities professionals involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/60">How we help</p>
            <h2 className="mt-5 text-4xl font-light leading-tight md:text-5xl">Free guidance and a clearer path forward.</h2>
          </div>
          <div className="mt-14 grid gap-px border border-gray-200 bg-gray-200 md:grid-cols-2">
            {waysWeHelp.map((item) => (
              <div key={item.title} className="bg-white p-8 md:p-10 lg:p-12">
                <h3 className="text-2xl font-light">{item.title}</h3>
                <p className="mt-5 text-sm font-light leading-7 text-gray-500">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">One place to start</p>
            <h2 className="mt-5 text-4xl font-light leading-tight md:text-5xl">Selling, under contract, inheriting property, or ready to stop managing?</h2>
            <p className="mt-7 max-w-3xl text-base font-light leading-8 text-white/[0.62]">
              Call with the situation in front of you. We can help organize the next questions, explain the available paths, and make the appropriate independent professional introductions.
            </p>
          </div>
          <div className="space-y-4 border-l border-white/20 pl-8 md:pl-12">
            <a href={phoneNumberHref} className="flex min-h-14 items-center justify-center bg-white px-7 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:bg-gray-100">
              Call {phoneNumberDisplay}
            </a>
            <Link href="/contact" className="flex min-h-14 items-center justify-center border border-white/45 px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-navy">
              Start My Exchange
            </Link>
            <Link href="/contact?request=properties" className="flex min-h-14 items-center justify-center border border-white/20 px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white/85 transition hover:border-white/45 hover:text-white">
              Get a Free Property List
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6 text-xs leading-6 text-gray-500 lg:px-10">
          Educational guidance only. Tax and legal conclusions belong to the property owner&apos;s CPA and counsel. Qualified-intermediary, brokerage, lending, and securities work must be handled by the appropriate independent professionals. DST interests are securities and require eligibility, availability, offering-document, fee, risk, and suitability review through appropriately licensed professionals.
        </div>
      </section>
    </main>
  );
}
