"use client";

import { formatCurrency } from "@/lib/utils/formatters/currency";
import { useTranslations } from "next-intl";
import { useState } from "react";

const DistanceRateSetting = () => {
  const t = useTranslations("DistanceRateSettings");
  const [ratePerKm, setRatePerKm] = useState(5000);
  const [baseFee, setBaseFee] = useState(10000);

  const SAMPLE_KM = [1, 3, 5, 10, 15];

  const calcCost = (km: number) => {
    const billable = Math.max(0, km);
    return baseFee + billable * ratePerKm;
  };

  return (
    <div>
      {/* Rate per Km */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-3">
        <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-900  dark:bg-amber-900 dark:text-amber-100 mb-3 inline-block">
          {t("baseRateLabel")}
        </span>
        <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
          {t("ratePerKmTitle")}
        </p>
        <p className="text-xs text-gray-400 mb-3">{t("ratePerKmDesc")}</p>
        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <span className="bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-500 border-r border-gray-200 dark:border-gray-700">
            Rp
          </span>
          <input
            type="number"
            value={ratePerKm}
            min={0}
            step={500}
            onChange={(e) => setRatePerKm(Number(e.target.value))}
            className="flex-1 px-3 py-2 text-right text-base font-medium bg-transparent outline-none"
          />
          <span className="bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-500 border-l border-gray-200 dark:border-gray-700">
            / km
          </span>
        </div>
      </div>

      {/* Minimum  */}

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-3">
        <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100 mb-3 inline-block">
          {t("baseFeeLabel")}
        </span>
        <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
          {t("baseFeeTitle")}
        </p>
        <p className="text-xs text-gray-400 mb-3">{t("baseFeeDesc")}</p>
        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <span className="bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-500 border-r border-gray-200 dark:border-gray-700">
            Rp
          </span>
          <input
            type="number"
            value={baseFee}
            min={0}
            step={500}
            onChange={(e) => setBaseFee(Number(e.target.value))}
            className="flex-1 px-3 py-2 text-right text-base font-medium bg-transparent outline-none"
          />
          <span className="bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-500 border-l border-gray-200 dark:border-gray-700">
            flat
          </span>
        </div>
      </div>

      {/* Preview */}

      {/* Preview + Save */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 dark:text-gray-100">
          {t("simulationTitle")}
        </p>
        <p className="text-xs text-gray-400 mb-3">{t("simulationDesc")}</p>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
          {SAMPLE_KM.map((km) => (
            <div key={km} className="flex justify-between text-sm py-1">
              <span className="text-gray-500">{km} km</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {formatCurrency(calcCost(km))}
              </span>
            </div>
          ))}
        </div>
        <hr className="my-4 border-gray-100 dark:border-gray-700" />
        <button className="w-full py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          {t("saveButton")}
        </button>
      </div>
    </div>
  );
};

export default DistanceRateSetting;
