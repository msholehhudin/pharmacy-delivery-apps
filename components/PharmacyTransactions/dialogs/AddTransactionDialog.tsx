import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import TransactionForm from "../forms/TransactionForm";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { formSchema, TransactionFormValues } from "@/types/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddTransaction } from "@/hooks/Transactions/useAddTransaction";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddTransactionDialog = ({
  open,
  onOpenChange,
}: AddTransactionDialogProps) => {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      patientPhone: "",
      patientAddress: "",
      type: "",
      status: "pending",
      prescriptionDetails: "",
      totalAmount: "",
      courier: "",
    },
  });

  const addTransaction = useAddTransaction();

  const handleSubmit = async (values: TransactionFormValues) => {
    console.log("Form submitted : ", values);
    try {
      const response = await addTransaction.mutateAsync(values);

      toast.success("Transaction created successfully!", {
        description: "The transaction has been added to the system",
      });

      setTimeout(() => {
        form.reset();
        onOpenChange(false);
      }, 1000);
      // console.log("Response add : ", response);
    } catch (error) {
      console.error("Failed to create transaction : ", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Create a new transaction with medicines.
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
              <Button
                type="submit"
                className="hover:cursor-pointer"
                disabled={addTransaction.isPending}
              >
                {addTransaction.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Transaction...
                  </>
                ) : (
                  "Add Transaction"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
