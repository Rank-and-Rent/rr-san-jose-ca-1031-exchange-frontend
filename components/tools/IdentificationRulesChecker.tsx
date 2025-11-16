"use client";

import { useState } from "react";

export default function IdentificationRulesChecker() {
  const [numProperties, setNumProperties] = useState<string>("");
  const [totalIdentifiedValue, setTotalIdentifiedValue] = useState<string>("");
  const [relinquishedValue, setRelinquishedValue] = useState<string>("");

  const numPropertiesNum = parseInt(numProperties) || 0;
  const totalIdentifiedValueNum = parseFloat(totalIdentifiedValue) || 0;
  const relinquishedValueNum = parseFloat(relinquishedValue) || 0;

  // Check rules
  // 3-property rule: Can identify up to 3 properties without regard to value
  const threePropertyRule = numPropertiesNum <= 3 && numPropertiesNum > 0;
  
  // 200% rule: If identifying more than 3 properties, total value cannot exceed 200% of relinquished value
  const twoHundredPercentRule = numPropertiesNum > 3 
    ? (relinquishedValueNum > 0 && totalIdentifiedValueNum <= relinquishedValueNum * 2)
    : true; // Not applicable if 3 or fewer properties
  
  // 95% rule: If identifying more than 3 properties AND exceeding 200%, must acquire at least 95% of identified value
  // Note: This is about acquisition, but we check it for identification purposes
  const ninetyFivePercentRule = numPropertiesNum > 3 && totalIdentifiedValueNum > relinquishedValueNum * 2
    ? (relinquishedValueNum > 0 && totalIdentifiedValueNum >= relinquishedValueNum * 0.95)
    : true; // Not applicable if 3 or fewer properties or within 200% limit

  // Determine if compliant
  // If 3 or fewer properties: Compliant (3-property rule satisfied)
  // If more than 3 properties: Must satisfy 200% rule OR 95% rule
  const isCompliant = numPropertiesNum > 0 && relinquishedValueNum > 0 && totalIdentifiedValueNum > 0 &&
    (threePropertyRule || (twoHundredPercentRule || ninetyFivePercentRule));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const hasResults = numPropertiesNum > 0 && totalIdentifiedValueNum > 0 && relinquishedValueNum > 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#0B3C5D] mb-2">Identification Rules Checker</h2>
          <p className="text-gray-700">
            Validate your property identification against the 3-property, 200%, or 95% identification rules for 1031 exchanges.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="num-properties" className="block text-sm font-medium text-[#111827]">
              Number of Properties Identified
            </label>
            <input
              id="num-properties"
              type="number"
              min="1"
              value={numProperties}
              onChange={(e) => setNumProperties(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">Total number of replacement properties you've identified</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="total-identified-value" className="block text-sm font-medium text-[#111827]">
              Total Value of Identified Properties
            </label>
            <input
              id="total-identified-value"
              type="number"
              value={totalIdentifiedValue}
              onChange={(e) => setTotalIdentifiedValue(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#111827] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="text-xs text-gray-500">Combined value of all identified replacement properties</p>
          </div>

          <div className="space-y-2 md:col-span-2">
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
        </div>

        {hasResults && (
          <div className="mt-8 space-y-6">
            <div
              className={`rounded-lg border-2 p-6 ${
                isCompliant
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-2xl font-bold ${
                    isCompliant ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {isCompliant ? "✓" : "✗"}
                </span>
                <h3
                  className={`text-lg font-semibold ${
                    isCompliant ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {isCompliant ? "Compliant with Identification Rules" : "Not Compliant with Identification Rules"}
                </h3>
              </div>
              {!isCompliant && (
                <p className="text-sm text-red-700">
                  Your identification does not meet the requirements. Please review the rules below and adjust your identification accordingly.
                </p>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-[#0B3C5D] mb-4">Rule Validation</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#111827]">3-Property Rule</span>
                    <span
                      className={`font-semibold ${
                        threePropertyRule ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {threePropertyRule ? "✓ Pass" : "✗ Fail"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    You may identify up to 3 replacement properties without regard to their value.
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Identified: {numPropertiesNum} {numPropertiesNum === 1 ? "property" : "properties"}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#111827]">200% Rule</span>
                    <span
                      className={`font-semibold ${
                        twoHundredPercentRule ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {twoHundredPercentRule ? "✓ Pass" : "✗ Fail"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    If you identify more than 3 properties, the total value cannot exceed 200% of the relinquished property value.
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Total identified value: {formatCurrency(totalIdentifiedValueNum)} / Maximum allowed:{" "}
                    {formatCurrency(relinquishedValueNum * 2)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#111827]">95% Rule</span>
                    <span
                      className={`font-semibold ${
                        ninetyFivePercentRule ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {ninetyFivePercentRule ? "✓ Pass" : "✗ Fail"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    If you identify more than 3 properties and exceed 200% of value, you must acquire at least 95% of the total identified value.
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Total identified value: {formatCurrency(totalIdentifiedValueNum)} / Minimum required:{" "}
                    {formatCurrency(relinquishedValueNum * 0.95)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm text-gray-700">
                <strong>Understanding the Rules:</strong> To be compliant, you must satisfy the 3-property rule (identify 3 or fewer properties) OR satisfy both the 200% rule (if identifying more than 3 properties, total value ≤ 200% of relinquished value) AND the 95% rule (acquire at least 95% of identified value). These rules help ensure you have a realistic plan for completing your exchange.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

