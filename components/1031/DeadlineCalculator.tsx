"use client";

import { useState } from "react";

export default function DeadlineCalculator() {
  const [saleDate, setSaleDate] = useState("");
  const [identificationDeadline, setIdentificationDeadline] = useState<Date | null>(null);
  const [acquisitionDeadline, setAcquisitionDeadline] = useState<Date | null>(null);

  const calculateDeadlines = (dateString: string) => {
    const sale = new Date(dateString);
    if (isNaN(sale.getTime())) {
      setIdentificationDeadline(null);
      setAcquisitionDeadline(null);
      return;
    }

    const identification = new Date(sale);
    identification.setDate(identification.getDate() + 45);

    const acquisition = new Date(sale);
    acquisition.setDate(acquisition.getDate() + 180);

    setIdentificationDeadline(identification);
    setAcquisitionDeadline(acquisition);
  };

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-[#0F172A] mb-6">1031 Exchange Deadline Calculator</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="saleDate" className="block text-sm font-medium text-[#0F172A] mb-2">
            Relinquished Property Sale Date
          </label>
          <input
            type="date"
            id="saleDate"
            value={saleDate}
            onChange={(e) => {
              setSaleDate(e.target.value);
              calculateDeadlines(e.target.value);
            }}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] shadow-inner focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
          />
        </div>

        {identificationDeadline && acquisitionDeadline && (
          <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
            <div className="rounded-2xl bg-[#EFF6FF] p-4">
              <p className="text-sm font-semibold text-[#3B82F6] mb-1">45 Day Identification Deadline</p>
              <p className="text-lg font-semibold text-[#0F172A]">
                {identificationDeadline.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="rounded-2xl bg-[#EFF6FF] p-4">
              <p className="text-sm font-semibold text-[#3B82F6] mb-1">180 Day Acquisition Deadline</p>
              <p className="text-lg font-semibold text-[#0F172A]">
                {acquisitionDeadline.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        )}

        <p className="text-xs text-[#4B5563] mt-6">
          Day zero begins the moment your relinquished property closes. Deadlines are calculated in calendar days. This
          calculator is for estimation only. Consult with your Qualified Intermediary for exact deadlines.
        </p>
      </div>
    </div>
  );
}


