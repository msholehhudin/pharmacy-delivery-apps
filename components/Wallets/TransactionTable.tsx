"use client";

import { DataTable } from "../Shared/DataTable/data-table";
import { useTranslations } from "next-intl";
import { useTransactionColumns } from "./TransactionColumn";

const mockData = [
  {
    transaction_id: "1239127",
    type: "Pendapatan",
    amount: 120000,
    date: new Date().toISOString(),
  },
];

const TransactionTable = () => {
  const t = useTranslations("walletTransactionTable");
  const columns = useTransactionColumns();
  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-semibold mb-3">{t("transactionHeader")}</h2>

      <DataTable columns={columns} data={mockData} />
    </div>
  );
};

export default TransactionTable;
