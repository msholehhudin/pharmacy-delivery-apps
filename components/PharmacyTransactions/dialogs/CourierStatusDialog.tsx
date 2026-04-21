import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transaction } from "@/types/transactions";
import { changeText } from "@/utils/helper";
import { Package } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CourierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

const CourierStatusDialog = ({
  open,
  onOpenChange,
  transaction,
}: CourierDialogProps) => {
  const form = useForm<{
    status: "pending" | "on_delivery" | "delivered" | "cancelled";
  }>({
    defaultValues: {
      status: "pending",
    },
  });

  useEffect(() => {
    if (transaction?.status) {
      form.reset({
        status: transaction.status,
      });
    }
  }, [transaction, form]);
  console.log("this courier dialog to update status : ", transaction);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle>Update Delivery Status</DialogTitle>
              <DialogDescription>
                Order #{transaction?.prescriptionCode}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 border-t">
          <div className="mb-4 mt-6 p-4 bg-gray-100 dark:bg-blue-950/20 rounded-lg">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Customer :{" "}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {transaction?.patientName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300 ">
                  Delivery Address :{" "}
                </span>
                <span className="font-medium text-gray-900 dark:text-white text-right max-w-[200px]">
                  {transaction?.patientAddress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Current Status :{" "}
                </span>
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${
                    transaction?.status == "pending"
                      ? "bg-yellow-100  text-yellow-800"
                      : transaction?.status == "on_delivery"
                      ? "bg-blue-100 text-blue-800"
                      : transaction?.status == "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {changeText(transaction?.status)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Selector */}

        {/* <div>
          <label>New Status</label>
          <select>
            <option>Pending</option>
            <option>On Delivery</option>
            <option>Delivered</option>
          </select>
       
        </div> */}

        <Form {...form}>
          <form>
            {/* <TransactionForm form={form} /> */}

            <div>
              <FormField
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Status</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose Status..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="on_delivery">
                            On Delivery
                          </SelectItem>
                          <SelectItem value="delivered">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <p className="mt-2 text-xs text-gray-500">
                Update the delivery status based on current progress
              </p>
            </div>

            <DialogFooter className="my-4">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Update
                {/* {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Transaction...
                  </>
                ) : (
                  "Save Changes"
                )} */}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CourierStatusDialog;
