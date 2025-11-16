"use client";

export default function IdentificationRules() {
  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-[#0F172A] mb-6">1031 Exchange Identification Rules</h2>
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#E0E7FF] bg-[#F9FAFB] p-6">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-3">Three Property Rule</h3>
          <p className="text-sm text-[#4B5563]">
            You can identify up to three replacement properties of any combined value. You must acquire at least one of
            the identified properties to complete your 1031 exchange.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E0E7FF] bg-[#F9FAFB] p-6">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-3">200 Percent Rule</h3>
          <p className="text-sm text-[#4B5563]">
            You can identify any number of replacement properties if their combined value does not exceed 200 percent of
            your relinquished property value. You must acquire properties totaling at least 95 percent of the
            identified value.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E0E7FF] bg-[#F9FAFB] p-6">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-3">95 Percent Exception</h3>
          <p className="text-sm text-[#4B5563]">
            If you identify properties under the 200 percent rule, you must acquire at least 95 percent of the total
            identified value. This exception allows flexibility when identifying multiple properties.
          </p>
        </div>

        <p className="text-xs text-[#4B5563] mt-6">
          Identification must be made in writing and delivered to a Qualified Intermediary or other party involved in
          the exchange. Consult with your Qualified Intermediary and tax advisor for specific guidance.
        </p>
      </div>
    </div>
  );
}


