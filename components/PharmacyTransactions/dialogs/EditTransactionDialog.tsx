import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import TransactionForm from "../forms/TransactionForm";
import { useForm } from "react-hook-form";
import {
  baseTransactionSchema,
  Transaction,
  TransactionFormValues,
} from "@/types/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useUpdateTransaction } from "@/hooks/Transactions/useUpdateTransactions";
import { Loader2 } from "lucide-react";

interface EditTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

const EditTransactionDialog = ({
  open,
  onOpenChange,
  transaction,
}: EditTransactionDialogProps) => {
  console.log("this transaction on edit modal comp : ", transaction);

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(baseTransactionSchema),
    defaultValues: {
      patientName: "",
      patientPhone: "",
      patientAddress: "",
      type: "",
      prescriptionDetails: "",
      totalAmount: "",
      courier: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (transaction) {
      form.reset({
        patientName: transaction?.patientName,
        patientPhone: transaction?.patientPhone.toString() ?? "",
        patientAddress: transaction?.patientAddress,
        type: transaction?.type,
        prescriptionDetails: transaction?.prescriptionDetails,
        totalAmount: transaction?.amount.toString() ?? "",
        courier: transaction?.courier,
        paymentMethod:
          (transaction?.paymentMethod as
            | "cash"
            | "bank_transfer"
            | "credit_card"
            | "debit_card") ?? "cash",
        status:
          (transaction?.status as "pending" | "on_delivery" | "completed") ??
          "pending",
        notes: transaction?.notes ?? "",
      });
    }
  }, [transaction, form]);

  const updateMutation = useUpdateTransaction();

  const handleSubmit = async (values: TransactionFormValues) => {
    if (!transaction?.id) return;
    console.log("Form updated : ", values);
    try {
      const response = await updateMutation.mutateAsync({
        id: transaction.id,
        payload: values,
      });

      setTimeout(() => {
        onOpenChange(false);
      }, 1000);

      console.log("response submit : ", response);
    } catch (error: any) {
      console.error("Failed to update transaction: ", {
        message: error.message,
        name: error.name,
        fullError: error,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Make changes to the transaction.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <TransactionForm form={form} />

            <DialogFooter className="my-4">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Transaction...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionDialog;
