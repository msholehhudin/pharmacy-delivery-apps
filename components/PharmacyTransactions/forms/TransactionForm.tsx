"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { TransactionFormValues } from "@/types/transactions";
import { cn } from "@/lib/utils";
import { useCouriers } from "@/hooks/Users/useUsers";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatters/currency";

const TransactionForm = ({
  form,
}: {
  form: UseFormReturn<TransactionFormValues>;
}) => {
  const { data: couriers = [], isLoading } = useCouriers();
  console.log("data courier : ", couriers);
  console.log("isLoading courier : ", isLoading);

  return (
    <>
      {/* Patient Information */}
      <div className="">
        <h4 className="font-medium">Patient Information</h4>
        <hr className="mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Patient Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Label htmlFor="patientName">Patient Name</Label>
              <Input id="patientName" placeholder="Enter patient name..." /> */}
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="patientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter patient phone..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="my-3">
          <FormField
            control={form.control}
            name="patientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Address</FormLabel>
                <FormControl>
                  <Textarea
                    id="notes"
                    placeholder="Enter patient address..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Transaction Details */}
      <div className="mt-6">
        <h4 className="font-medium">Transaction Details</h4>
        <hr className="mb-4" />
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <FormField
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          fieldState.invalid &&
                            "border-destructive focus:ring-destructive"
                        )}
                      >
                        <SelectValue placeholder="Choose Type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="refund">Refund</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          fieldState.invalid &&
                            "border-destructive focus:ring-destructive"
                        )}
                      >
                        <SelectValue placeholder="Choose Status..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on_delivery">On Delivery</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        {/* <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              name="paymentMethod"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          fieldState.invalid &&
                            "border-destructive focus:ring-destructive"
                        )}
                      >
                        <SelectValue placeholder="Choose Payment Method..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="debit_card">Debit Card</SelectItem>
                        <SelectItem value="bank_transfer">
                          Bank Transfer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Medicines */}
      {/* <div className="space-y-2"> */}
      {/* <h4 className="font-medium">Medicines</h4>
          <hr /> */}
      <div className="my-2">
        <FormField
          control={form.control}
          name="prescriptionDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medicines</FormLabel>
              <FormControl>
                <Textarea
                  id="notes"
                  placeholder="Enter medicine list..."
                  rows={2}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="totalAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Price</FormLabel>
                <FormControl>
                  <Input
                    type="numeric"
                    placeholder="Enter Price..."
                    // {...field}
                    value={formatCurrency(field.value || "")}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      field.onChange(raw);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            name="courier"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Courier</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        fieldState.invalid &&
                          "border-destructive focus:ring-destructive"
                      )}
                    >
                      <SelectValue placeholder="Choose Courier..." />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem disabled value="LoadingCourier">
                          <Loader2 className="h-4 w-4 mr-4 animate-spin text-gray-700 dark:text-white" />
                          Loading couriers...
                        </SelectItem>
                      ) : couriers.length === 0 ? (
                        <SelectItem disabled value="NoCourier">
                          No couriers found
                        </SelectItem>
                      ) : (
                        couriers.map((courier) => (
                          <SelectItem key={courier.id} value={courier.id}>
                            {courier.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      {/* </div> */}

      {/* <div className="space-y-2">
          <Label>Notes</Label>
          <Textarea
            id="notes"
            placeholder="Additional notes about this transaction"
            rows={3}
          />
        </div> */}
    </>
  );
};

export default TransactionForm;
