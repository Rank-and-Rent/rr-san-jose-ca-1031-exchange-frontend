"use client";

import { useState } from "react";

export default function BootCalculator() {
  const [relinquishedValue, setRelinquishedValue] = useState<string>("");
  const [replacementValue, setReplacementValue] = useState<string>("");
  const [cashReceived, setCashReceived] = useState<string>("");
  const [oldMortgage, setOldMortgage] = useState<string>("");
  const [newMortgage, setNewMortgage] = useState<string>("");

  const relinquishedValueNum = parseFloat(relinquishedValue) || 0;
  const replacementValueNum = parseFloat(replacementValue) || 0;
  const cashReceivedNum = parseFloat(cashReceived) || 0;
  const oldMortgageNum = parseFloat(oldMortgage) || 0;
  const newMortgageNum = parseFloat(newMortgage) || 0;

  // Calculate mortgage boot (debt relief)
  const mortgageBoot = Math.max(0, oldMortgageNum - newMortgageNum);

  // Calculate total boot
  const totalBoot = cashReceivedNum + mortgageBoot;

  // Estimate tax (using illustrative 20% rate - should note this is illustrative)
  const estimatedTax = totalBoot * 0.20;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const hasResults = relinquishedValueNum > 0 || replacementValueNum > 0 || cashReceivedNum > 0 || oldMortgageNum > 0 || newMortgageNum > 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#0B3C5D] mb-2">Boot Calculator</h2>
          <p className="text-gray-700">
            Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="relinquished-value" className="block text-sm font-medium text-[#111827]">
              Relinquished Property Value
            </label>
            <input
              id="relinquished-value"
              type="number"
              value={relinquishedValue}
              onChange={(e) => setRelinquishedValue(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">Sale price of the property you're selling</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="replacement-value" className="block text-sm font-medium text-[#111827]">
              Replacement Property Value
            </label>
            <input
              id="replacement-value"
              type="number"
              value={replacementValue}
              onChange={(e) => setReplacementValue(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">Purchase price of the replacement property</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="cash-received" className="block text-sm font-medium text-[#111827]">
              Cash Received
            </label>
            <input
              id="cash-received"
              type="number"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">Any cash you receive from the exchange</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="old-mortgage" className="block text-sm font-medium text-[#111827]">
              Old Mortgage Balance
            </label>
            <input
              id="old-mortgage"
              type="number"
              value={oldMortgage}
              onChange={(e) => setOldMortgage(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">Mortgage balance on relinquished property</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="new-mortgage" className="block text-sm font-medium text-[#111827]">
              New Mortgage Balance
            </label>
            <input
              id="new-mortgage"
              type="number"
              value={newMortgage}
              onChange={(e) => setNewMortgage(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">Mortgage balance on replacement property</p>
          </div>
        </div>

        {hasResults && (
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-[#0B3C5D] mb-4">Calculation Results</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-gray-700">Cash Boot:</span>
                <span className="font-semibold text-[#111827]">{formatCurrency(cashReceivedNum)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-gray-700">Mortgage Boot (Debt Relief):</span>
                <span className="font-semibold text-[#111827]">{formatCurrency(mortgageBoot)}</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-[#0B3C5D] pb-2 pt-2">
                <span className="text-lg font-semibold text-[#0B3C5D]">Total Boot:</span>
                <span className="text-lg font-bold text-[#0B3C5D]">{formatCurrency(totalBoot)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-700">Estimated Tax on Boot (20% illustrative rate):</span>
                <span className="font-semibold text-[#111827]">{formatCurrency(estimatedTax)}</span>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Boot is any non-like-kind value received in a 1031 exchange. Cash boot occurs when you receive cash, and mortgage boot (debt relief) occurs when your new mortgage is less than your old mortgage. The estimated tax rate shown (20%) is illustrative only. Actual tax rates depend on your specific situation, holding period, and other factors.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



