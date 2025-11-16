"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { servicesData } from "../data/services";
import { locationsData } from "../data/locations";
import { LOCATIONS_ROUTE } from "../lib/config";

const PRIMARY_CITY = "San Jose";
const PRIMARY_STATE_ABBR = "CA";

// Top services - prioritize property identification services
const mainServiceSlugs = [
  "replacement-property-identification",
  "multifamily-property-search",
  "industrial-property-discovery",
  "retail-property-lists",
  "nnn-lease-property-discovery",
  "medical-office-identification",
];

const topServices = [
  ...servicesData.filter((s) => mainServiceSlugs.includes(s.slug)).slice(0, 6),
  ...servicesData.filter((s) => !mainServiceSlugs.includes(s.slug)).slice(0, 2),
].slice(0, 8).map((s) => ({
  title: s.name,
  slug: s.route,
}));

// Top locations - San Jose first, then most populous cities
const topLocationSlugs = [
  "san-jose-ca",
  "palo-alto-ca",
  "mountain-view-ca",
  "sunnyvale-ca",
  "santa-clara-ca",
  "fremont-ca",
  "milpitas-ca",
  "hayward-ca",
];

const topLocations = locationsData
  .filter((l) => topLocationSlugs.includes(l.slug))
  .sort((a, b) => {
    const aIndex = topLocationSlugs.indexOf(a.slug);
    const bIndex = topLocationSlugs.indexOf(b.slug);
    return aIndex - bIndex;
  })
  .slice(0, 8)
  .map((l) => ({
    title: l.name,
    slug: l.route,
  }));

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export default function Header() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const locationsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const toolsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setLocationsOpen(false);
        setToolsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 500); // Increased timeout for better UX
  };

  const handleLocationsMouseEnter = () => {
    if (locationsTimeoutRef.current) clearTimeout(locationsTimeoutRef.current);
    setLocationsOpen(true);
  };

  const handleLocationsMouseLeave = () => {
    if (locationsTimeoutRef.current) clearTimeout(locationsTimeoutRef.current);
    locationsTimeoutRef.current = setTimeout(() => {
      setLocationsOpen(false);
    }, 500); // Increased timeout for better UX
  };

  const handleToolsMouseEnter = () => {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    setToolsOpen(true);
  };

  const handleToolsMouseLeave = () => {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    toolsTimeoutRef.current = setTimeout(() => {
      setToolsOpen(false);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 md:px-10" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition">
            <Image
              src="/1031-exchange-san-jose-logo.png"
              alt="1031 Exchange San Jose Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-[#111827] hover:text-[#3B82F6] transition aria-expanded:text-[#3B82F6]"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <span className="text-xs" aria-hidden>
                  {servicesOpen ? "▲" : "▼"}
                </span>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl border border-[#E5E7EB] bg-white shadow-xl p-4 max-h-[80vh] overflow-y-auto">
                  <div className="space-y-1">
                    {topServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={service.slug}
                        className="block rounded-xl px-4 py-2 text-sm text-[#111827] hover:bg-[#F3F4F6] hover:text-[#3B82F6] transition"
                        onClick={() => setServicesOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/services"
                    className="mt-4 block rounded-xl border border-[#3B82F6] px-4 py-2 text-center text-sm font-semibold text-[#3B82F6] hover:bg-[#EFF6FF] transition"
                    onClick={() => setServicesOpen(false)}
                  >
                    View All {servicesData.length} Services
                  </Link>
                </div>
              )}
            </div>

            <div
              ref={locationsRef}
              className="relative"
              onMouseEnter={handleLocationsMouseEnter}
              onMouseLeave={handleLocationsMouseLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-[#111827] hover:text-[#3B82F6] transition aria-expanded:text-[#3B82F6]"
                aria-expanded={locationsOpen}
                aria-haspopup="true"
                onClick={() => setLocationsOpen(!locationsOpen)}
              >
                Locations
                <span className="text-xs" aria-hidden>
                  {locationsOpen ? "▲" : "▼"}
                </span>
              </button>
              {locationsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl border border-[#E5E7EB] bg-white shadow-xl p-4">
                  <div className="space-y-1">
                    {topLocations.map((location) => (
                      <Link
                        key={location.slug}
                        href={location.slug}
                        className="block rounded-xl px-4 py-2 text-sm text-[#111827] hover:bg-[#F3F4F6] hover:text-[#3B82F6] transition"
                        onClick={() => setLocationsOpen(false)}
                      >
                        {location.title}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={LOCATIONS_ROUTE}
                    className="mt-4 block rounded-xl border border-[#3B82F6] px-4 py-2 text-center text-sm font-semibold text-[#3B82F6] hover:bg-[#EFF6FF] transition"
                    onClick={() => setLocationsOpen(false)}
                  >
                    View All {locationsData.length} Locations
                  </Link>
                </div>
              )}
            </div>

            <div
              ref={toolsRef}
              className="relative"
              onMouseEnter={handleToolsMouseEnter}
              onMouseLeave={handleToolsMouseLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-[#111827] hover:text-[#3B82F6] transition aria-expanded:text-[#3B82F6]"
                aria-expanded={toolsOpen}
                aria-haspopup="true"
                onClick={() => setToolsOpen(!toolsOpen)}
              >
                Tools
                <span className="text-xs" aria-hidden>
                  {toolsOpen ? "▲" : "▼"}
                </span>
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-[#E5E7EB] bg-white shadow-xl p-4">
                  <div className="space-y-1">
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="block rounded-xl px-4 py-2 text-sm text-[#111827] hover:bg-[#F3F4F6] hover:text-[#3B82F6] transition"
                        onClick={() => setToolsOpen(false)}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/tools"
                    className="mt-4 block rounded-xl border border-[#3B82F6] px-4 py-2 text-center text-sm font-semibold text-[#3B82F6] hover:bg-[#EFF6FF] transition"
                    onClick={() => setToolsOpen(false)}
                  >
                    View All Tools
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/property-types"
              className="text-sm font-medium text-[#111827] hover:text-[#3B82F6] transition"
            >
              Property Types
            </Link>

            <Link
              href="/blog"
              className="text-sm font-medium text-[#111827] hover:text-[#3B82F6] transition"
            >
              Blog
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-[#111827] hover:text-[#3B82F6] transition"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="rounded-full bg-[#3B82F6] px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
            >
              Contact
            </Link>
          </div>

          <div className="md:hidden">
            <Link
              href="/contact"
              className="rounded-full bg-[#3B82F6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

