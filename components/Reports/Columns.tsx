import { ColumnDef } from "@tanstack/react-table";

export type LaporanRow = {
  id: string;
  patient_name: string;
  total_amount: number;
  corporate: number;
  system: number;
  courier: number;
  operator: number;
};

export const columns: ColumnDef<LaporanRow>[] = [
  {
    header: "Patient",
    accessorKey: "patient_name",
  },
  {
    header: "Total",
    accessorKey: "total_amount",
  },
  {
    header: "Corporate",
    accessorKey: "corporate",
  },
  {
    header: "System",
    accessorKey: "system",
  },
  {
    header: "Courier",
    accessorKey: "courier",
  },
  {
    header: "Operator",
    accessorKey: "operator",
  },
];
