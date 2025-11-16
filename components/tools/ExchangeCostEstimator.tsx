"use client";

import { useState } from "react";

export default function ExchangeCostEstimator() {
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [qiFeePercentage, setQiFeePercentage] = useState<string>("1.0");
  const [escrowFee, setEscrowFee] = useState<string>("");
  const [titleInsuranceRate, setTitleInsuranceRate] = useState<string>("0.5");
  const [recordingFees, setRecordingFees] = useState<string>("500");

  const propertyValueNum = parseFloat(propertyValue) || 0;
  const qiFeePercentageNum = parseFloat(qiFeePercentage) || 0;
  const escrowFeeNum = parseFloat(escrowFee) || 0;
  const titleInsuranceRateNum = parseFloat(titleInsuranceRate) || 0;
  const recordingFeesNum = parseFloat(recordingFees) || 0;

  // Calculate costs
  const qiFee = propertyValueNum * (qiFeePercentageNum / 100);
  const titleInsurance = propertyValueNum * (titleInsuranceRateNum / 100);
  const totalCosts = qiFee + escrowFeeNum + titleInsurance + recordingFeesNum;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const hasResults = propertyValueNum > 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#0B3C5D] mb-2">Exchange Cost Estimator</h2>
          <p className="text-gray-700">
            Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="property-value" className="block text-sm font-medium text-[#111827]">
              Property Value
            </label>
            <input
              id="property-value"
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">Value of the property being exchanged</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="qi-fee-percentage" className="block text-sm font-medium text-[#111827]">
              QI Fee Percentage (%)
            </label>
            <input
              id="qi-fee-percentage"
              type="number"
              step="0.1"
              value={qiFeePercentage}
              onChange={(e) => setQiFeePercentage(e.target.value)}
              placeholder="1.0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">Qualified Intermediary fee percentage (typically 0.5% - 1.5%)</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="escrow-fee" className="block text-sm font-medium text-[#111827]">
              Escrow Fee
            </label>
            <input
              id="escrow-fee"
              type="number"
              value={escrowFee}
              onChange={(e) => setEscrowFee(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">Escrow company fees (flat fee or percentage)</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="title-insurance-rate" className="block text-sm font-medium text-[#111827]">
              Title Insurance Rate (%)
            </label>
            <input
              id="title-insurance-rate"
              type="number"
              step="0.1"
              value={titleInsuranceRate}
              onChange={(e) => setTitleInsuranceRate(e.target.value)}
              placeholder="0.5"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">Title insurance premium rate (typically 0.3% - 0.7%)</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="recording-fees" className="block text-sm font-medium text-[#111827]">
              Recording Fees
            </label>
            <input
              id="recording-fees"
              type="number"
              value={recordingFees}
              onChange={(e) => setRecordingFees(e.target.value)}
              placeholder="500"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">County recording fees (varies by county in California)</p>
          </div>
        </div>

        {hasResults && (
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-[#0B3C5D] mb-4">Cost Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-gray-700">QI Fee ({qiFeePercentageNum}%):</span>
                <span className="font-semibold text-[#111827]">{formatCurrency(qiFee)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-gray-700">Escrow Fee:</span>
                <span className="font-semibold text-[#111827]">{formatCurrency(escrowFeeNum)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-gray-700">Title Insurance ({titleInsuranceRateNum}%):</span>
                <span className="font-semibold text-[#111827]">{formatCurrency(titleInsurance)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-gray-700">Recording Fees:</span>
                <span className="font-semibold text-[#111827]">{formatCurrency(recordingFeesNum)}</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-[#0B3C5D] pb-2 pt-2">
                <span className="text-lg font-semibold text-[#0B3C5D]">Total Exchange Costs:</span>
                <span className="text-lg font-bold text-[#0B3C5D]">{formatCurrency(totalCosts)}</span>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> California does not impose a state real estate transfer tax. However, some local jurisdictions may charge transfer taxes. Recording fees vary by county. QI fees typically range from 0.5% to 1.5% of the property value. Title insurance rates vary based on property value and location. Actual costs may differ based on your specific transaction and service providers.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



