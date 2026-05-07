"use client";

import React from "react";
import { DataTable } from "../Shared/DataTable/data-table";
import { useReportColumns } from "./Columns";

const mockData = [
  {
    id: "1",
    patient_name: "Bojes",
    total_amount: 200000,
    corporate: 250000,
    system: 100000,
    courier: 100000,
    operator: 100000,
  },
];

const TableReports = () => {
  const columns = useReportColumns();
  return <DataTable columns={columns} data={mockData} />;
};

export default TableReports;
