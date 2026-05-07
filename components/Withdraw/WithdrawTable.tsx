"use client";

import { useWithdrawColumns, WithdrawRequest } from "./Columns";
import { DataTable } from "../Shrared/DataTable/data-table";

const mockData: WithdrawRequest[] = [
  {
    id: "1",
    user_name: "Bojes",
    role: "courier",
    amount: 2500000,
    status: "pending",
    requested_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_name: "Helos",
    role: "operator",
    amount: 1500000,
    status: "approved",
    requested_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_name: "Om Bo",
    role: "kurir",
    amount: 1000000,
    status: "rejected",
    requested_at: new Date().toISOString(),
  },
];

const WithdrawTable = () => {
  const columns = useWithdrawColumns();

  return <DataTable columns={columns} data={mockData} />;
};

export default WithdrawTable;
