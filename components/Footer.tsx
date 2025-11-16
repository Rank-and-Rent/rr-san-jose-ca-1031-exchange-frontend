import Link from "next/link";
import { servicesData } from "../data/services";
import { locationsData } from "../data/locations";
import { LOCATIONS_ROUTE, USE_SERVICE_AREAS } from "../lib/config";

const PRIMARY_CITY = "San Jose";
const PRIMARY_STATE_ABBR = "CA";
const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";
const email = "hello@1031exchangesanjose.com";
const address = "84 West Santa Clara St, San Jose, CA 95113";

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

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1220] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid gap-10 lg:grid-cols-6">
        <div className="space-y-4 lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">
            1031 Exchange {PRIMARY_CITY}
          </p>
          <p className="text-2xl font-semibold">California Property Finder</p>
          <p className="text-sm text-white/70">
            Serving all of California from Silicon Valley operations centers.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80 max-h-64 overflow-y-auto">
            {servicesData.map((service) => (
              <li key={service.slug}>
                <Link href={service.route} className="hover:text-white transition">
                  {service.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/services" className="hover:text-white transition font-semibold">
                View All {servicesData.length} Services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Locations</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80 max-h-64 overflow-y-auto">
            {locationsData.map((location) => (
              <li key={location.slug}>
                <Link href={location.route} className="hover:text-white transition">
                  {location.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href={LOCATIONS_ROUTE} className="hover:text-white transition font-semibold">
                View All {locationsData.length} Locations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Quick links</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/services" className="hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link href={LOCATIONS_ROUTE} className="hover:text-white transition">
                {USE_SERVICE_AREAS ? "Service Areas" : "Locations"}
              </Link>
            </li>
            <li>
              <Link href="/property-types" className="hover:text-white transition">
                Property Types
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-white transition">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4 text-sm text-white/70">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">Contact</p>
          <a href={phoneNumberHref} className="block text-white hover:text-[#3B82F6] transition">
            {phoneNumberDisplay}
          </a>
          <a href={`mailto:${email}`} className="block text-white hover:text-[#3B82F6] transition">
            {email}
          </a>
          <p className="text-white/80">{address}</p>
          <p>24 by 7 hours</p>
          <div className="mt-6 h-64 w-full rounded-2xl overflow-hidden bg-[#1F2937]">
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
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50 space-y-2">
        <p>© {new Date().getFullYear()} 1031 Exchange {PRIMARY_CITY}. All rights reserved.</p>
        <div className="space-y-1 max-w-3xl mx-auto">
          <p>
            This site helps investors identify potential replacement properties for Section 1031 exchanges.
          </p>
          <p>
            This site is not a Qualified Intermediary, law firm, broker, or CPA.
          </p>
          <p>
            Users should consult a Qualified Intermediary and tax advisor before acting.
          </p>
        </div>
      </div>
    </footer>
  );
}


