import React from "react";
import AddTransactionDialog from "./dialogs/AddTransactionDialog";
import { Transaction } from "@/types/transactions";
import EditTransactionDialog from "./dialogs/EditTransactionDialog";

interface DialogStates {
  add: boolean;
  edit: boolean;
  delete: boolean;
}

interface TransactionDialogProps {
  dialogStates: DialogStates;
  //   selectedTransaction: Transaction | null;
  onClose: (dialog: keyof DialogStates) => void;
  selectedTransaction: Transaction | null;
}

const TransactionDialogs = ({
  dialogStates,
  onClose,
  selectedTransaction,
}: TransactionDialogProps) => {
  return (
    <>
      <AddTransactionDialog
        open={dialogStates.add}
        onOpenChange={() => onClose("add")}
      />

      <EditTransactionDialog
        open={dialogStates.edit}
        onOpenChange={() => onClose("edit")}
        transaction={selectedTransaction}
      />
    </>
  );
};

export default TransactionDialogs;
