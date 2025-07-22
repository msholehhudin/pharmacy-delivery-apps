"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { transactions } from "@/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TransactionForm, {
  TransactionFormValues,
} from "@/components/Transactions/TransactionForm";
import { Transaction } from "@/types/transactions";

const TransactionView = ({ initialData }: { initialData: Transaction[] }) => {
  console.log("ini data fetching initial data :", initialData);
  return (
    <div className="container mx-auto py-10">
      <div className="py-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="cursor-pointer">
              <PlusCircle />
              Add New Transaction
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="lg:max-w-3xl lg:max-h-[calc(100vh-100px)] overflow-y-auto">
            <AlertDialogTitle>Add New Transaction</AlertDialogTitle>
            <hr />
            {/* <AlertDialogHeader>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            */}
            <TransactionForm />
            {/* <AlertDialogFooter className="mt-9">
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction>Submit</AlertDialogAction>
            </AlertDialogFooter> */}
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <DataTable columns={columns} data={initialData} />
    </div>
  );
};

export default TransactionView;
