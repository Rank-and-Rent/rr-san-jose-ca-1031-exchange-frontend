"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { servicesData } from "../data/services";
import { locationsData } from "../data/locations";
import { LOCATIONS_ROUTE } from "../lib/config";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";

const topServices = servicesData.slice(0, 8).map((s) => ({
  title: s.name,
  slug: s.route,
}));

const topLocations = locationsData.slice(0, 8).map((l) => ({
  title: l.name,
  slug: l.route,
}));

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const locationsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const toolsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setLocationsOpen(false);
        setToolsOpen(false);
        setMobileMenuOpen(false);
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
    servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 300);
  };

  const handleLocationsMouseEnter = () => {
    if (locationsTimeoutRef.current) clearTimeout(locationsTimeoutRef.current);
    setLocationsOpen(true);
  };

  const handleLocationsMouseLeave = () => {
    if (locationsTimeoutRef.current) clearTimeout(locationsTimeoutRef.current);
    locationsTimeoutRef.current = setTimeout(() => setLocationsOpen(false), 300);
  };

  const handleToolsMouseEnter = () => {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    setToolsOpen(true);
  };

  const handleToolsMouseLeave = () => {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    toolsTimeoutRef.current = setTimeout(() => setToolsOpen(false), 300);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-navy/95 backdrop-blur-sm" : "bg-transparent"}`}>
      <nav className="max-w-[1600px] mx-auto px-6 lg:px-12" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Kim Bibb Style: Two lines, elegant spacing */}
          <Link href="/" className="flex flex-col hover:opacity-80 transition shrink-0">
            <span className="text-white text-[13px] font-light tracking-[0.35em] uppercase leading-tight">
              1031 Exchange
            </span>
            <span className="text-white/70 text-[11px] font-light tracking-[0.3em] uppercase">
              San Jose
            </span>
          </Link>

          {/* Desktop Navigation - Kim Bibb Style */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {/* Services Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                type="button"
                className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/90 hover:text-white transition"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-6 w-80 bg-white shadow-2xl py-6 z-50">
                  <div className="space-y-1">
                    {topServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={service.slug}
                        className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy transition"
                        onClick={() => setServicesOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 mt-4 pt-4 px-6">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-navy hover:text-gray-600 transition"
                      onClick={() => setServicesOpen(false)}
                    >
                      View All Services
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              ref={locationsRef}
              className="relative"
              onMouseEnter={handleLocationsMouseEnter}
              onMouseLeave={handleLocationsMouseLeave}
            >
              <button
                type="button"
                className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/90 hover:text-white transition"
                aria-expanded={locationsOpen}
                aria-haspopup="true"
                onClick={() => setLocationsOpen(!locationsOpen)}
              >
                Locations
              </button>
              {locationsOpen && (
                <div className="absolute top-full left-0 mt-6 w-64 bg-white shadow-2xl py-6 z-50">
                  <div className="space-y-1">
                    {topLocations.map((location) => (
                      <Link
                        key={location.slug}
                        href={location.slug}
                        className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy transition"
                        onClick={() => setLocationsOpen(false)}
                      >
                        {location.title}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 mt-4 pt-4 px-6">
                    <Link
                      href={LOCATIONS_ROUTE}
                      className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-navy hover:text-gray-600 transition"
                      onClick={() => setLocationsOpen(false)}
                    >
                      View All Locations
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div
              ref={toolsRef}
              className="relative"
              onMouseEnter={handleToolsMouseEnter}
              onMouseLeave={handleToolsMouseLeave}
            >
              <button
                type="button"
                className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/90 hover:text-white transition"
                aria-expanded={toolsOpen}
                aria-haspopup="true"
                onClick={() => setToolsOpen(!toolsOpen)}
              >
                Tools
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-6 w-72 bg-white shadow-2xl py-6 z-50">
                  <div className="space-y-1">
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy transition"
                        onClick={() => setToolsOpen(false)}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 mt-4 pt-4 px-6">
                    <Link
                      href="/tools"
                      className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-navy hover:text-gray-600 transition"
                      onClick={() => setToolsOpen(false)}
                    >
                      View All Tools
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/property-types"
              className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/90 hover:text-white transition"
            >
              Property Types
            </Link>

            <Link
              href="/contact"
              className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/90 hover:text-white transition"
            >
              Contact
            </Link>

            <a
              href={phoneNumberHref}
              className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/90 hover:text-white transition"
            >
              {phoneNumberDisplay}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-10 h-10 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy/95 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
            <Link
              href="/services"
              className="block text-sm font-normal uppercase tracking-[0.15em] text-white/90 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href={LOCATIONS_ROUTE}
              className="block text-sm font-normal uppercase tracking-[0.15em] text-white/90 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Locations
            </Link>
            <Link
              href="/tools"
              className="block text-sm font-normal uppercase tracking-[0.15em] text-white/90 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/property-types"
              className="block text-sm font-normal uppercase tracking-[0.15em] text-white/90 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Property Types
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-normal uppercase tracking-[0.15em] text-white/90 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href={phoneNumberHref}
              className="block text-sm font-normal uppercase tracking-[0.15em] text-white/90 hover:text-white transition"
            >
              {phoneNumberDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
