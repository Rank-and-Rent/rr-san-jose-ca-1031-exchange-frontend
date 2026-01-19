import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../../components/Breadcrumbs";
import ContactForm from "./ContactForm";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";
const email = "hello@1031exchangesanjose.com";
const address = "84 West Santa Clara St, San Jose, CA 95113";

export default function ContactPage() {

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/locations/palo-alto-1031-exchange.jpg"
          alt="Contact Us"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-light uppercase tracking-[0.3em] text-white/70 mb-6">Contact</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide">
            Get In Touch
          </h1>
          <p className="mt-6 text-white/80 text-lg font-light max-w-2xl mx-auto">
            Contact us to learn more about how we can help with your 1031 exchange.
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide">Start Your 1031 Exchange</h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Contact us to learn more about how we can help identify replacement properties and coordinate your 1031
                exchange timeline.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-t border-gray-200 pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400 mb-2">Phone</p>
                <a href={phoneNumberHref} className="text-gray-900 hover:text-gray-600 transition text-lg">
                  {phoneNumberDisplay}
                </a>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400 mb-2">Email</p>
                <a href={`mailto:${email}`} className="text-gray-900 hover:text-gray-600 transition text-lg">
                  {email}
                </a>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400 mb-2">Address</p>
                <p className="text-gray-900 text-lg">{address}</p>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400 mb-2">Hours</p>
                <p className="text-gray-900 text-lg">Available 24/7</p>
              </div>
            </div>

            <div className="h-64 w-full overflow-hidden bg-gray-100">
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
