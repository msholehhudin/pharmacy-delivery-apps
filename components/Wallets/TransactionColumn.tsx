"use client";

import { formatCurrency } from "@/lib/utils/formatters/currency";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { formatDateTime } from "@/lib/utils/formatters/datetimeFormatters";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

type TransactionType = "income" | "withdrawal";

export type WalletTransactionRow = {
  transactionId: string;
  type: TransactionType;
  amount: number;
  date: string;
};

type TypeConfig = {
  label: string;
  icon: React.ReactNode;
  className: string;
};

const typeConfig: Record<TransactionType, TypeConfig> = {
  income: {
    label: "Pendapatan",
    icon: <ArrowDownCircle className="w-3 h-3" />,
    className:
      "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-50",
  },
  withdrawal: {
    label: "Penarikan",
    icon: <ArrowUpCircle className="w-3 h-3" />,
    className: "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-50",
  },
};

export const TransactionTypeBadge = ({ type }: { type: TransactionType }) => {
  const config = typeConfig[type] ?? typeConfig.income;
  return (
    <Badge
      variant="outline"
      className={cn("gap-1 text-xs font-medium", config.className)}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
};

export const TransactionAmount = ({
  amount,
  type,
}: {
  amount: number;
  type: TransactionType;
}) => {
  const isIncome = type === "income";
  return (
    <span
      className={cn(
        "font-medium",
        isIncome
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-red-600 dark:text-red-400",
      )}
    >
      {isIncome ? "+" : "-"}
      {formatCurrency(amount)}
    </span>
  );
};

export const useTransactionColumns = (): ColumnDef<WalletTransactionRow>[] => {
  const t = useTranslations("walletTransactionColumns");
  return [
    {
      header: t("transactionId"),
      accessorKey: "transaction_id",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.original.transactionId}
        </span>
      ),
    },
    {
      header: t("type"),
      accessorKey: "type",
      cell: ({ row }) => <TransactionTypeBadge type={row.original.type} />,
    },
    {
      header: t("amount"),
      accessorKey: "amount",
      cell: ({ row }) => (
        <TransactionAmount
          amount={row.original.amount}
          type={row.original.type}
        />
      ),
    },
    {
      header: t("date"),
      accessorKey: "date",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {formatDateTime(row.original.date)}
        </span>
      ),
    },
  ];
};
