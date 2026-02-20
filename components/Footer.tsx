import Link from "next/link";
import { servicesData } from "../data/services";
import { locationsData } from "../data/locations";
import { LOCATIONS_ROUTE } from "../lib/config";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";
const email = "hello@1031exchangesanjose.com";
const address = "84 West Santa Clara St, San Jose, CA 95113";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Property Types", href: "/property-types" },
  { label: "Locations", href: LOCATIONS_ROUTE },
  { label: "Contact Us", href: "/contact" },
];

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export default function Footer() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <footer className="bg-navy text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Logo & Contact Info */}
          <div className="lg:col-span-1 space-y-6 min-w-0">
            {/* Logo - Two lines, elegant like header */}
            <Link href="/" className="inline-block">
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-light tracking-[0.35em] uppercase text-white">
                  1031 Exchange
                </span>
                <span className="text-[11px] font-light tracking-[0.3em] uppercase text-white/60">
                  San Jose
                </span>
              </div>
            </Link>

            <div className="space-y-4 pt-6">
              <a
                href={phoneNumberHref}
                className="block text-lg text-white hover:text-white/70 transition-colors"
              >
                {phoneNumberDisplay}
              </a>
              <a
                href={`mailto:${email}`}
                className="block text-sm text-white hover:text-white/70 transition-colors break-all"
              >
                {email}
              </a>
            </div>
            
            <div className="pt-4">
              <p className="text-white/80 font-light">
                {address.split(",")[0]}
              </p>
              <p className="text-white/80 font-light">
                {address.split(",").slice(1).join(",")}
              </p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">
              Quick Links
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
        </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">
              Services
            </p>
            <ul className="space-y-3">
              {servicesData.slice(0, 6).map((service) => (
              <li key={service.slug}>
                  <Link
                    href={service.route}
                    className="text-white/80 hover:text-white transition-colors text-sm font-light"
                  >
                  {service.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
                <Link
                  href="/services"
                  className="text-white hover:text-white/70 transition-colors text-xs font-medium uppercase tracking-[0.15em]"
                >
                  View All Services
              </Link>
            </li>
          </ul>
        </div>

          {/* Locations */}
          <div className="lg:col-span-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">
              Locations
            </p>
            <ul className="space-y-3">
              {locationsData.slice(0, 8).map((location) => (
                <li key={location.slug}>
                  <Link
                    href={location.route}
                    className="text-white/80 hover:text-white transition-colors text-sm font-light"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href={LOCATIONS_ROUTE}
                  className="text-white hover:text-white/70 transition-colors text-xs font-medium uppercase tracking-[0.15em]"
                >
                  View All Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div className="lg:col-span-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">
              Exchange Tools
            </p>
            <ul className="space-y-3">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-white/80 hover:text-white transition-colors text-sm font-light"
                  >
                    {tool.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
                <Link
                  href="/tools"
                  className="text-white hover:text-white/70 transition-colors text-xs font-medium uppercase tracking-[0.15em]"
                >
                  View All Tools
              </Link>
            </li>
          </ul>
            
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <div className="w-full h-64 rounded-lg overflow-hidden border border-white/20">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
              title="Office Location Map"
            />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          <p className="text-white/40 text-xs leading-relaxed max-w-4xl font-light">
            All information is deemed reliable but not guaranteed and should be independently reviewed and verified.
            This site helps investors identify potential replacement properties for Section 1031 exchanges.
            This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult a Qualified Intermediary and tax advisor before acting.
          </p>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-light">
            Copyright &copy; {new Date().getFullYear()} 1031 Exchange San Jose
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-white/40 hover:text-white text-xs transition-colors font-light"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/40 hover:text-white text-xs transition-colors font-light"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-white/40 hover:text-white text-xs transition-colors font-light"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
