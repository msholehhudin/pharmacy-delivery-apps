import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { transactions } from "@/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Transaction = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="py-4">
        <Button className="cursor-pointer">
          <PlusCircle />
          Add New Transaction
        </Button>
      </div>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
};

export default Transaction;
