import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import ContactForm from "./ContactForm";

const PRIMARY_CITY = "San Jose";
const PRIMARY_STATE_ABBR = "CA";
const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";
const email = "hello@1031exchangesanjose.com";
const address = "84 West Santa Clara St, San Jose, CA 95113";

export default function ContactPage() {

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Contact</p>
              <h1 className="text-4xl font-semibold text-[#0F172A] md:text-5xl">Get Started With Your 1031 Exchange</h1>
              <p className="text-lg text-[#4B5563]">
                Contact us to learn more about how we can help identify replacement properties and coordinate your 1031
                exchange timeline.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Phone</p>
                <a href={phoneNumberHref} className="text-[#3B82F6] hover:text-[#2563EB] transition">
                  {phoneNumberDisplay}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Email</p>
                <a href={`mailto:${email}`} className="text-[#3B82F6] hover:text-[#2563EB] transition">
                  {email}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Address</p>
                <p className="text-[#4B5563]">{address}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Hours</p>
                <p className="text-[#4B5563]">24 by 7 hours</p>
              </div>
            </div>

            <div className="h-64 w-full rounded-2xl overflow-hidden bg-[#1F2937]">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                allowFullScreen
                aria-label={`Map of ${address}`}
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            mainEntity: {
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
          }),
        }}
      />
    </div>
  );
}

