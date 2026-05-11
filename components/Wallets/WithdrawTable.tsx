"use client";

import { useTranslations } from "next-intl";
import { DataTable } from "../Shared/DataTable/data-table";
import { useWithdrawColumns, WalletRow } from "./WithdrawColumn";

const mockData: WalletRow = [
  {
    wdId: "WD-001",
    amount: 120000,
    status: "approved",
    date: new Date().toISOString(),
  },
];

const WithdrawTable = () => {
  const t = useTranslations("walletWithdrawTable");
  const columns = useWithdrawColumns();
  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-semibold mb-3">{t("withdrawHeader")}</h2>

      <DataTable columns={columns} data={mockData} />
    </div>
  );
};

export default WithdrawTable;
