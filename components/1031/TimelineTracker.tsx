"use client";

import { useState } from "react";

export default function TimelineTracker() {
  const [saleDate, setSaleDate] = useState("");
  const [milestones, setMilestones] = useState<Array<{ label: string; date: Date; status: string }>>([]);

  const calculateMilestones = (dateString: string) => {
    const sale = new Date(dateString);
    if (isNaN(sale.getTime())) {
      setMilestones([]);
      return;
    }

    const identification = new Date(sale);
    identification.setDate(identification.getDate() + 45);

    const acquisition = new Date(sale);
    acquisition.setDate(acquisition.getDate() + 180);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setMilestones([
      {
        label: "Relinquished Property Sale",
        date: sale,
        status: sale <= today ? "completed" : "upcoming",
      },
      {
        label: "45 Day Identification Deadline",
        date: identification,
        status: identification < today ? "overdue" : identification <= today ? "due" : "upcoming",
      },
      {
        label: "180 Day Acquisition Deadline",
        date: acquisition,
        status: acquisition < today ? "overdue" : acquisition <= today ? "due" : "upcoming",
      },
    ]);
  };

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-[#0F172A] mb-6">1031 Exchange Timeline Tracker</h2>
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
              calculateMilestones(e.target.value);
            }}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] shadow-inner focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
          />
        </div>

        {milestones.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`rounded-2xl p-4 ${
                  milestone.status === "completed"
                    ? "bg-[#F0FDF4] border border-[#86EFAC]"
                    : milestone.status === "overdue"
                    ? "bg-[#FEF2F2] border border-[#FCA5A5]"
                    : milestone.status === "due"
                    ? "bg-[#FEF3C7] border border-[#FCD34D]"
                    : "bg-[#EFF6FF] border border-[#BFDBFE]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-[#0F172A]">{milestone.label}</p>
                  <span
                    className={`text-xs font-semibold uppercase px-2 py-1 rounded ${
                      milestone.status === "completed"
                        ? "bg-[#86EFAC] text-[#166534]"
                        : milestone.status === "overdue"
                        ? "bg-[#FCA5A5] text-[#991B1B]"
                        : milestone.status === "due"
                        ? "bg-[#FCD34D] text-[#92400E]"
                        : "bg-[#BFDBFE] text-[#1E40AF]"
                    }`}
                  >
                    {milestone.status}
                  </span>
                </div>
                <p className="text-lg font-semibold text-[#0F172A]">
                  {milestone.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-[#4B5563] mt-6">
          Track key milestones from sale to close. This tracker is for estimation only. Consult with your Qualified
          Intermediary for exact deadlines and status updates.
        </p>
      </div>
    </div>
  );
}


