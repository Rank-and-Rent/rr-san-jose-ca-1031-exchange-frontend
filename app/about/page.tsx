import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Us | 1031 Exchange San Jose Property Finder",
  description:
    "Learn how we help San Jose investors identify replacement properties for 1031 exchanges and coordinate with Qualified Intermediaries and tax advisors.",
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <main className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <article className="space-y-12">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">About</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">
              About 1031 Exchange San Jose Property Finder
            </h1>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-[#374151]">
            <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-lg space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Our Mission</h2>
                <p>
                  This site is focused on helping you identify potential replacement properties for Section 1031
                  exchanges. We provide property search services, timeline coordination, and investment analysis to
                  support your exchange process.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">What We Do</h2>
                <p>
                  We help San Jose investors find qualified replacement properties that meet Section 1031 exchange
                  requirements. Our services include property identification, market analysis, and timeline management
                  to support your 45 day identification deadline and 180 day acquisition period.
                </p>
                <p className="mt-4">
                  We coordinate with Qualified Intermediaries, tax advisors, and lenders to ensure your exchange
                  process stays compliant and on schedule. We can also help you get in touch with tax professionals and
                  Qualified Intermediaries, but we are not a Qualified Intermediary ourselves.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Secure Intake Process</h2>
                <p>
                  Our secure intake process collects information about your relinquished property, investment
                  objectives, and timeline requirements. We use this information to identify qualified replacement
                  properties and coordinate with third party Qualified Intermediaries and lenders.
                </p>
                <p className="mt-4">
                  All information is handled securely and shared only with Qualified Intermediaries and service
                  providers you authorize. We do not share your information with unauthorized third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Property Matching Workflow</h2>
                <p>
                  Our property matching workflow begins with understanding your investment criteria, timeline, and
                  exchange parameters. We search our database of qualified properties and coordinate with brokers to
                  identify options that meet your requirements.
                </p>
                <p className="mt-4">
                  We provide detailed property summaries, financial analysis, and market comparables to help you make
                  informed identification decisions within your 45 day deadline. We coordinate with Qualified
                  Intermediaries to ensure proper documentation throughout the process.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Third Party Coordination</h2>
                <p>
                  We coordinate with Qualified Intermediaries, tax advisors, lenders, and brokers to ensure your 1031
                  exchange process stays compliant and on schedule. We are not a Qualified Intermediary, law firm,
                  broker, or CPA.
                </p>
                <p className="mt-4">
                  Users should consult a Qualified Intermediary and tax advisor before acting on any 1031 exchange
                  information. We provide property identification and coordination services only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Important Disclosures</h2>
                <div className="space-y-4 text-sm">
                  <p>
                    This site helps investors identify potential replacement properties for Section 1031 exchanges. This
                    site is not a Qualified Intermediary, law firm, broker, or CPA.
                  </p>
                  <p>
                    Users should consult a Qualified Intermediary and tax advisor before acting. Educational content
                    only. Not tax or legal advice.
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="rounded-3xl border border-[#3B82F6] bg-gradient-to-br from-[#EFF6FF] to-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Ready to get started?</h2>
            <p className="mt-4 text-[#4B5563]">
              Contact us to learn more about how we can help with your 1031 exchange property identification.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
              >
                Contact Us
              </Link>
              <a
                href="tel:+14085392254"
                className="inline-flex items-center justify-center rounded-full border border-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6] transition hover:bg-[#EFF6FF]"
              >
                Call (408) 539-2254
              </a>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}


