import z from "zod"

export type MedicineItems = {
    name: string
    qty: number
    note?: string
}

export type TransactionStatus = 'pending' | 'on_delivery' | 'delivered' | 'cancelled'
export type PaymentStatus = 'unpaid' | 'paid' | 'cancelled'

export interface Transaction {
    id: number
    recipient_name: string
    recipient_address: string
    recipient_phone: number
    medicine_items: MedicineItems[]
    delivery_date: string
    courier_id: number
    status: TransactionStatus
    payment_status: PaymentStatus
    delivery_fee:number
    note?: string
    created_by: number;
    created_at: string
    updated_at: string
}

export interface CreateTransactionDTO {
    recipient_name: string
    recipient_address: string
    recipient_phone: number
    medicine_items: MedicineItems[]
    delivery_date: string
    courier_id: number
    delivery_fee: number
    note?: string
}

export const formSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  patientAddress: z.string().min(1, "Address is required"),
  patientPhone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\d+$/, "Must be a number"),
  courier: z.string().min(1, "Courier is required"),
  prescriptionDetails: z.string().min(1, "Prescription details are required"),
  totalAmount: z
    .string()
    .min(1, "Total amount is required")
    .regex(/^\d+$/, "Must be a number"),
  paymentMethod: z.enum(["cash", "transfer"], {
    error: "Payment method is required.",
  }),
  // status: z.enum(["pending", "on_delivery", "completed"], {
  //   error: "Status is required",
  // }),
  notes: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof formSchema>;