"use client";

import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, Gavel, CheckCircle2 } from "lucide-react";

const trustBadges = [
  { icon: BarChart3, label: "CPA Partner", detail: "Workpapers synched to firm portals" },
  { icon: ShieldCheck, label: "Qualified Intermediary", detail: "Segregated escrow controls" },
  { icon: Gavel, label: "Legal Review", detail: "Counsel-ready documentation sets" },
  { icon: CheckCircle2, label: "IRS Compliant", detail: "Audit trails with timestamping" },
];

export default function TrustBadgesSection() {
  return (
    <section className="relative bg-[#0F172A] py-10 text-white">
      <motion.div
        className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((badge) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#3B82F6]">
                  <span className="absolute inset-0 rounded-full border border-white/20" aria-hidden />
                  <badge.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">{badge.label}</h3>
              </div>
              <p className="text-sm text-white/70">{badge.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
