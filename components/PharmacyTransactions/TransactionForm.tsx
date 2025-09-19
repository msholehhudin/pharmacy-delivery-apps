"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createTransaction } from "@/lib/api/transactions/actions";
import { useRouter } from "next/navigation";
import { formSchema, TransactionFormValues } from "@/types/transactions";

// const supabase = createClient();
// const router = useRouter();

const courier = [
  { id: "1", name: "Courier 1" },
  { id: "2", name: "Courier 2" },
];

const handleSubmit = async (values: TransactionFormValues) => {
  console.log("Submit value : ", values);

  try {
    const newTransaction = await createTransaction(values);

    toast("Success !", {
      description: "Transaction created successfully !",
    });
    // router.refresh();
  } catch (error) {
    toast("Error", {
      description: `${error}`,
    });
    console.error("Error inserting : ", error);
  }

  // return (...)

  // const { data, error } = await supabase
  //   .from("transactions")
  //   .insert({
  //     patient_name: values.patientName,
  //     patient_address: values.patientAddress,
  //     patient_phone: values.patientPhone,
  //     courier_id: values.courier,
  //     prescription_details: values.prescriptionDetails,
  //     total_amount: values.totalAmount,
  //     payment_method: values.paymentMethod,
  //     status: values.status,
  //     notes: values.notes || null,
  //   })
  //   .select("*");

  // if (error) {
  //   console.error("Failed to create transaction : ", error);
  // } else {
  //   console.log("Transaction created. ", data);
  // }
};

const TransactionForm = () => {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      courier: "",
      patientPhone: "",
      totalAmount: "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input placeholder="Patient Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patientAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Address</FormLabel>
              <FormControl>
                {/* <Input placeholder="Patient Address..." {...field} /> */}
                <Textarea placeholder="Patient address..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patientPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Patient Phone..."
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Courier</FormLabel>
              <FormControl>
                {/* <Input placeholder="Courier Name..." {...field} /> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose Courier..." />
                  </SelectTrigger>
                  <SelectContent>
                    {courier.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                    {/* <SelectItem value="transfer">Transfer</SelectItem> */}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prescriptionDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prescription Details</FormLabel>
              <FormControl>
                <Textarea placeholder="Prescription Details..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount</FormLabel>
              <FormControl>
                <Input placeholder="Total Amount..." {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                {/* <Input placeholder="Total Amount..." {...field} /> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose Payment Method..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose Payment Method..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="on_delivery">On Delivery</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Notes..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3 mt-8">
          <AlertDialogCancel asChild>
            <Button variant={"outline"} className="cursor-pointer">
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button type="submit" className="cursor-pointer">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;
