import React from "react";
import AddTransactionDialog from "./dialogs/AddTransactionDialog";
import { Transaction } from "@/types/transactions";

interface DialogStates {
  add: boolean;
  edit: boolean;
  delete: boolean;
}

interface TransactionDialogProps {
  dialogStates: DialogStates;
  //   selectedTransaction: Transaction | null;
  onClose: (dialog: keyof DialogStates) => void;
}

const TransactionDialogs = ({
  dialogStates,
  onClose,
}: TransactionDialogProps) => {
  return (
    <>
      <AddTransactionDialog
        open={dialogStates.add}
        onOpenChange={() => onClose("add")}
      />
    </>
  );
};

export default TransactionDialogs;
