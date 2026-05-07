"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils/formatters/datetimeFormatters";
import { formatCurrency } from "@/lib/utils/formatters/currency";
import { useTranslations } from "next-intl";
import { ArrowUpDown } from "lucide-react";

export type WithdrawRequest = {
  id: string;
  user_name: string;
  role: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  requested_at: string;
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "approved":
      return "default";

    case "rejected":
      return "destructive";

    case "pending":
      return "info";

    default:
      return "secondary";
  }
};

export const useWithdrawColumns = (): ColumnDef<WithdrawRequest>[] => {
  const t = useTranslations("WithdrawColumn");

  return [
    {
      accessorKey: "user_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("user")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    {
      accessorKey: "role",
      header: t("role"),
    },

    {
      accessorKey: "amount",
      header: t("amount"),
      cell: ({ row }) => {
        const amount = row.original.amount;

        return formatCurrency(amount);
      },
    },

    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => {
        return (
          <Badge variant={getStatusVariant(row.original.status)}>
            {row.original.status}
          </Badge>
        );
      },
    },

    {
      accessorKey: "requested_at",
      header: t("requestedAt"),
      cell: ({ row }) => {
        return formatDateTime(row.original.requested_at);
      },
    },

    {
      id: "actions",
      header: t("actions"),
      cell: ({ row }) => {
        const data = row.original;

        if (data.status !== "pending") {
          return null;
        }

        return (
          <div className="flex gap-2">
            <Button size="sm" className="hover:cursor-pointer">
              Approve
            </Button>

            <Button
              size="sm"
              variant="destructive"
              className="hover:cursor-pointer"
            >
              Reject
            </Button>
          </div>
        );
      },
    },
  ];
};
