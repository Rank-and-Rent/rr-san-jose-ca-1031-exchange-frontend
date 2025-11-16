"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import ContactForm from "../app/contact/ContactForm";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#F9FAFB] text-white"
    >
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#3B82F6]/40 blur-3xl" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent opacity-60 backdrop-blur-xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="space-y-8"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#3B82F6] animate-pulse" aria-hidden />
              Precision for 1031 Exchange San Jose
            </p>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                San Jose 1031 Exchange Experts
              </h1>
              <p className="max-w-xl text-lg text-white/80">
                Compliant 1031 exchanges for Bay Area investors who need technology-driven coordination, zero tolerance for deadline risk, and verified qualified intermediary controls.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#lead-form"
                className="inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
              >
                Start My Exchange
              </Link>
              <a
                href={phoneNumberHref}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:text-white"
                aria-label={`Call ${phoneNumberDisplay}`}
              >
                Call {phoneNumberDisplay}
              </a>
            </div>
            <p className="text-sm text-white/70">
              45 Day identification. 180 Day closing. Stay compliant with every deadline.
            </p>
          </motion.div>
          <motion.div
            id="lead-form"
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-3xl border border-white/20 bg-white/90 p-8 text-[#111827] shadow-2xl backdrop-blur"
          >
            <div className="flex items-center gap-3 text-sm font-semibold text-[#0F172A] mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6]/10 text-[#3B82F6]">
                <span className="h-5 w-5">📞</span>
              </div>
              <div>
                <p>Request a confidential consultation</p>
                <p className="text-xs text-[#4B5563]">Responses within one business day</p>
              </div>
            </div>
            <ContactForm className="!border-0 !shadow-none !p-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
