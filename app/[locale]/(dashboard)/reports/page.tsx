import BarFilter from "@/components/Reports/BarFilter";
import SummaryCards from "@/components/Reports/SummaryCards";
import TableReports from "@/components/Reports/TableReports";
import React from "react";

const Reports = () => {
  return (
    <div className="min-h-screen">
      <div className="px-8 py-6">
        <div className="mb-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Laporan Keuangan
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-2">
            {/* {t("description")} */}
            Cek laporan keuangan anda
          </p>

          <BarFilter />

          <SummaryCards />

          <TableReports />
        </div>
      </div>
    </div>
  );
};

export default Reports;
