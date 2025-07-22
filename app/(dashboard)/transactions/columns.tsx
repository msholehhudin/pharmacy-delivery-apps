"use client";

import { Transaction } from "@/types/transactions";
import { ColumnDef } from "@tanstack/react-table";
import {
  BadgeCheck,
  BadgeCheckIcon,
  CircleX,
  ClockArrowDown,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateTime } from "@/utils/helper";

// const DragHandle = () => {
//   const {attributes, listeners} = useSortable
// }

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          aria-label="Select row"
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "patient_name",
    header: "Patient Name",
  },
  {
    accessorKey: "patient_phone",
    header: "Phone Number",
  },
  {
    accessorKey: "patient_address",
    header: "Address",
  },
  {
    accessorKey: "created_at",
    header: "Delivery Date",
    cell: ({ row }) => <span>{formatDateTime(row.original.created_at)}</span>,
  },
  {
    accessorKey: "courier_id",
    header: "Courier",
  },
  {
    accessorKey: "status",
    header: "Delivery Status",
    cell: ({ row }) => (
      <Badge variant={"default"} className=" px-1.5">
        {row.original.status == "delivered" ? (
          <BadgeCheckIcon className="fill-green-500 dark:fill-green-400" />
        ) : row.original.status == "cancelled" ? (
          <CircleX />
        ) : row.original.status == "on_delivery" ? (
          <Truck />
        ) : (
          <ClockArrowDown className="fill-yellow-500 dark:fill-yellow-400" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "payment_status",
    header: "Payment Status",
    cell: ({ row }) => (
      <Badge
        variant={`${
          row.original.payment_status == "paid" ? "secondary" : "destructive"
        }`}
        className={`${
          row.original.payment_status == "paid" ? "bg-green-700 text-white" : ""
        }`}
      >
        {row.original.payment_status}
      </Badge>
    ),
  },
];
