import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service | 1031 Exchange San Jose",
  description: "Terms of service for 1031 Exchange San Jose website.",
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <main className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <article className="space-y-8">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Terms of Service</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">Terms of Service</h1>
            <p className="text-lg text-[#4B5563]">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-[#4B5563]">
            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Use License</h2>
              <p>
                Permission is granted to temporarily access the materials on 1031 Exchange San Jose's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Disclaimer</h2>
              <p>
                The materials on 1031 Exchange San Jose's website are provided on an 'as is' basis. 1031 Exchange San Jose makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="mt-4">
                This website provides educational content only and is not tax or legal advice. Users should consult a Qualified Intermediary and tax advisor before acting on any information provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Limitations</h2>
              <p>
                In no event shall 1031 Exchange San Jose or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on 1031 Exchange San Jose's website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Accuracy of Materials</h2>
              <p>
                The materials appearing on 1031 Exchange San Jose's website could include technical, typographical, or photographic errors. 1031 Exchange San Jose does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Links</h2>
              <p>
                1031 Exchange San Jose has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by 1031 Exchange San Jose of the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Modifications</h2>
              <p>
                1031 Exchange San Jose may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:hello@1031exchangesanjose.com" className="text-[#3B82F6] hover:underline">
                  hello@1031exchangesanjose.com
                </a>
                {" "}or call{" "}
                <a href="tel:+14085392254" className="text-[#3B82F6] hover:underline">
                  (408) 539-2254
                </a>
                .
              </p>
            </section>
          </div>

          <div className="pt-8 border-t border-[#E5E7EB]">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
            >
              Contact Us
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

