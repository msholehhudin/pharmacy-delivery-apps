"use client";

import { formatCurrency } from "@/lib/utils/formatters/currency";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

export type LaporanRow = {
  id: string;
  patient_name: string;
  total_amount: number;
  corporate: number;
  system: number;
  courier: number;
  operator: number;
};

export const useReportColumns = (): ColumnDef<LaporanRow>[] => {
  const t = useTranslations("Reports");
  return [
    {
      header: t("patientName"),
      accessorKey: "patient_name",
    },
    {
      header: t("totalAmount"),
      accessorKey: "total_amount",
      cell: ({ row }) => {
        return formatCurrency(row.original.total_amount);
      },
    },
    {
      header: t("corporate"),
      accessorKey: "corporate",
      cell: ({ row }) => {
        return formatCurrency(row.original.corporate);
      },
    },
    {
      header: t("system"),
      accessorKey: "system",
      cell: ({ row }) => {
        return formatCurrency(row.original.system);
      },
    },
    {
      header: t("courier"),
      accessorKey: "courier",
      cell: ({ row }) => {
        return formatCurrency(row.original.courier);
      },
    },
    {
      header: t("operator"),
      accessorKey: "operator",
      cell: ({ row }) => {
        return formatCurrency(row.original.operator);
      },
    },
  ];
};
