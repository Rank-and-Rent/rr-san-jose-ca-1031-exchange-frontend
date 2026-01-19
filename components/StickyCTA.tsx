"use client";

import Link from "next/link";
import { useState } from "react";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";

export default function StickyCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop CTA */}
      <div className="hidden md:block fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 bg-gray-900 text-white px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] shadow-lg transition-all duration-300 hover:bg-gray-800"
        >
          Contact Us
          <svg
            className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute bottom-full left-0 mb-3 bg-white shadow-2xl border border-gray-100 p-5 min-w-[220px]">
            <div className="space-y-4">
              <a
                href={phoneNumberHref}
                className="flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-medium">{phoneNumberDisplay}</span>
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Send a Message</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        {isOpen ? (
          <div className="p-4 space-y-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full border border-gray-300 px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-700 transition hover:bg-gray-50"
            >
              Close
            </button>
            <a
              href={phoneNumberHref}
              className="block w-full bg-gray-900 px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-gray-800"
            >
              Call {phoneNumberDisplay}
            </a>
            <Link
              href="/contact"
              className="block w-full border border-gray-900 px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-gray-900 transition hover:bg-gray-900 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Contact Form
            </Link>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full bg-gray-900 px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-gray-800"
          >
            Get Started
          </button>
        )}
      </div>
    </>
  );
}
