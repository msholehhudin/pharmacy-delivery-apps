"use client";

import { Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalData: number;
}

export function DataTablePagination<TData>({
  table,
  totalData,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;

  const pageSize = table.getState().pagination.pageSize;

  const from = pageIndex * pageSize + 1;

  const to = Math.min(from + pageSize - 1, totalData);

  return (
    <div className="flex items-center justify-between py-4">
      {/* LEFT */}
      <div className="text-sm text-muted-foreground">
        Showing {from}-{to} of {totalData} results
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* PAGE SIZE */}
        <div className="flex items-center gap-2">
          <p className="text-sm">Rows per page</p>

          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {[10, 20, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* PAGE INFO */}
        <div className="text-sm">
          Page {pageIndex + 1} of {table.getPageCount()}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
