"use client";

import { useState } from "react";
import FeeSliderCard from "./FeeSlideCard";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const initialFee = {
  courier: 55,
  pharmacist: 15,
  medical: 15,
  system: 15,
};

const FeeSetting = () => {
  const [fees, setFees] = useState(initialFee);
  const t = useTranslations("FeeSettings");
  const l = useTranslations("FeeLabels");

  const total = fees.system + fees.pharmacist + fees.courier + fees.medical;

  return (
    <div>
      {/* Summary Row */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {Object.entries(fees).map(([key, val]) => (
          <div
            key={key}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center"
          >
            <p className="text-xl font-medium text-gray-900 dark:text-gray-100">
              {val.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 capitalize">{key}</p>
          </div>
        ))}
      </div>

      <FeeSliderCard
        label={l("courier")}
        description={t("courierDesc")}
        value={fees.courier}
        onChange={(v) => setFees((p) => ({ ...p, courier: v }))}
        badgeColor="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      />

      <FeeSliderCard
        label={l("pharmacist")}
        description={t("pharmacistDesc")}
        value={fees.pharmacist}
        onChange={(v) => setFees((p) => ({ ...p, pharmacist: v }))}
        badgeColor="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
      />

      <FeeSliderCard
        label={l("medical")}
        description={t("medicalDesc")}
        value={fees.medical}
        onChange={(v) => setFees((p) => ({ ...p, medical: v }))}
        badgeColor="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      />

      <FeeSliderCard
        label={l("system")}
        description={t("systemDesc")}
        value={fees.system}
        onChange={(v) => setFees((p) => ({ ...p, system: v }))}
        badgeColor="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      />

      {/* Total + Save  */}
      {/* <hr /> */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
        <Separator className="my-4" />
        <div className="flex justify-between text-sm mb-1">
          <span>{l("totalFee")}</span>
          <span>{total.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-500">{l("remainMargin")}</span>
          <span className="font-medium">{(100 - total).toFixed(1)}%</span>
        </div>

        {total > 100 && (
          <p className="text-red-500 text-xs mb-3">Total fee exceeds 100%</p>
        )}

        <Separator className="my-4" />

        <div className="text-end">
          <Button size={"lg"}>{t("saveButton")}</Button>
        </div>
      </div>
    </div>
  );
};

export default FeeSetting;
