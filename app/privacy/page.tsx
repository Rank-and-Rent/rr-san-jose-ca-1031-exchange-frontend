import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | 1031 Exchange San Jose",
  description: "Privacy policy for 1031 Exchange San Jose website.",
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <main className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <article className="space-y-8">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Privacy Policy</p>
            <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">Privacy Policy</h1>
            <p className="text-lg text-[#4B5563]">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-[#4B5563]">
            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Introduction</h2>
              <p>
                1031 Exchange San Jose ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Information We Collect</h2>
              <p>We may collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email address, phone number)</li>
                <li>Company information</li>
                <li>Project details and requirements</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and provide services</li>
                <li>Send you information about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist us in operating our website and conducting our business</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
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

