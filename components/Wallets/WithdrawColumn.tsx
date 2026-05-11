"use client";

import { formatCurrency } from "@/lib/utils/formatters/currency";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { formatDateTime } from "@/lib/utils/formatters/datetimeFormatters";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Check, X, Clock } from "lucide-react";

type WithdrawStatus = "approved" | "rejected" | "pending";

export type WalletRow = {
  wdId: string;
  amount: number;
  status: WithdrawStatus;
  date: string;
};

type StatusConfig = {
  label: string;
  icon: React.ReactNode;
  className: string;
};

const statusConfig: Record<WithdrawStatus, StatusConfig> = {
  approved: {
    label: "Disetujui",
    icon: <Check className="w-3 h-3" />,
    className:
      "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-50",
  },
  rejected: {
    label: "Ditolak",
    icon: <X className="w-3 h-3" />,
    className: "bg-red-50 text-red-800 border-red-200 hover:bg-red-50",
  },
  pending: {
    label: "Menunggu",
    icon: <Clock className="w-3 h-3" />,
    className: "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-50",
  },
};

export const WithdrawStatusBadge = ({ status }: { status: WithdrawStatus }) => {
  const config = statusConfig[status] ?? statusConfig.pending;
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

export const WithdrawAmount = ({ amount }: { amount: number }) => (
  <span className="font-medium text-red-600 dark:text-red-400">
    -{formatCurrency(amount)}
  </span>
);

export const useWithdrawColumns = (): ColumnDef<WalletRow>[] => {
  const t = useTranslations("walletWithdrawColumns");
  return [
    {
      header: t("wdId"),
      accessorKey: "transaction_id",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.original.wdId}
        </span>
      ),
    },
    {
      header: t("amount"),
      accessorKey: "amount",
      cell: ({ row }) => <WithdrawAmount amount={row.original.amount} />,
    },
    {
      header: t("status"),
      accessorKey: "status",
      cell: ({ row }) => <WithdrawStatusBadge status={row.original.status} />,
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
