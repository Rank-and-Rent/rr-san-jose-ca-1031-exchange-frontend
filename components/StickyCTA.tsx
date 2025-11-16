"use client";

import Link from "next/link";
import { useState } from "react";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";

export default function StickyCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <Link
          href="/contact"
          className="flex items-center gap-2 rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-[#2563EB] hover:scale-105"
        >
          Contact Us
        </Link>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] shadow-lg">
        {isOpen ? (
          <div className="p-4 space-y-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#111827] transition hover:bg-[#F3F4F6]"
            >
              Close
            </button>
            <a
              href={phoneNumberHref}
              className="block w-full rounded-full bg-[#3B82F6] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
            >
              Call {phoneNumberDisplay}
            </a>
            <Link
              href="/contact"
              className="block w-full rounded-full border border-[#3B82F6] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6] transition hover:bg-[#EFF6FF]"
              onClick={() => setIsOpen(false)}
            >
              Contact Form
            </Link>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full rounded-t-2xl bg-[#3B82F6] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
          >
            Get Started
          </button>
        )}
      </div>
    </>
  );
}

