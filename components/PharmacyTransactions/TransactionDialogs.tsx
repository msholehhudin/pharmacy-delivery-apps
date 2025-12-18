import React from "react";
import AddTransactionDialog from "./dialogs/AddTransactionDialog";
import { Transaction } from "@/types/transactions";
import EditTransactionDialog from "./dialogs/EditTransactionDialog";
import CourierStatusDialog from "./dialogs/CourierStatusDialog";

interface DialogStates {
  add: boolean;
  edit: boolean;
  delete: boolean;
  updateStatus: boolean;
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

      <CourierStatusDialog
        open={dialogStates.updateStatus}
        onOpenChange={() => onClose("updateStatus")}
        transaction={selectedTransaction}
      />
    </>
  );
};

export default TransactionDialogs;
