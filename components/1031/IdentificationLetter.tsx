"use client";

import { useState } from "react";

export default function IdentificationLetter() {
  const [formData, setFormData] = useState({
    exchangerName: "",
    relinquishedProperty: "",
    replacementProperty1: "",
    replacementProperty2: "",
    replacementProperty3: "",
    date: new Date().toISOString().split("T")[0],
  });

  const generateLetter = () => {
    const letter = `IDENTIFICATION OF REPLACEMENT PROPERTY

Date: ${formData.date}

To: Qualified Intermediary

I, ${formData.exchangerName}, hereby identify the following replacement property(ies) in connection with my Section 1031 exchange:

Relinquished Property: ${formData.relinquishedProperty}

Replacement Property(ies):
${formData.replacementProperty1 ? `1. ${formData.replacementProperty1}` : ""}
${formData.replacementProperty2 ? `2. ${formData.replacementProperty2}` : ""}
${formData.replacementProperty3 ? `3. ${formData.replacementProperty3}` : ""}

This identification is made pursuant to Treasury Regulation Section 1.1031(k)-1.

Signature: _________________________

Date: _________________________`;

    return letter;
  };

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-[#0F172A] mb-6">Identification Letter Helper</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="exchangerName" className="block text-sm font-medium text-[#0F172A] mb-2">
            Exchanger Name
          </label>
          <input
            type="text"
            id="exchangerName"
            value={formData.exchangerName}
            onChange={(e) => setFormData({ ...formData, exchangerName: e.target.value })}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] shadow-inner focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
          />
        </div>

        <div>
          <label htmlFor="relinquishedProperty" className="block text-sm font-medium text-[#0F172A] mb-2">
            Relinquished Property Address
          </label>
          <input
            type="text"
            id="relinquishedProperty"
            value={formData.relinquishedProperty}
            onChange={(e) => setFormData({ ...formData, relinquishedProperty: e.target.value })}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] shadow-inner focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-[#0F172A]">Replacement Properties</label>
          {[1, 2, 3].map((num) => (
            <input
              key={num}
              type="text"
              placeholder={`Replacement Property ${num} Address`}
              value={formData[`replacementProperty${num}` as keyof typeof formData] as string}
              onChange={(e) =>
                setFormData({ ...formData, [`replacementProperty${num}`]: e.target.value } as any)
              }
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] shadow-inner focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
            />
          ))}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-[#0F172A] mb-2">
            Identification Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] shadow-inner focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            const letter = generateLetter();
            const blob = new Blob([letter], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "identification-letter.txt";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="w-full rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2563EB]"
        >
          Generate Letter
        </button>

        <p className="text-xs text-[#4B5563]">
          This is a draft template only. Consult with your Qualified Intermediary and tax advisor before submitting
          your identification letter.
        </p>
      </div>
    </div>
  );
}


