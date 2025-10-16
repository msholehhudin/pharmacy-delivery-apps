import z from "zod"

export type MedicineItems = {
    id: string
    name: string
    dosage: string
    qty: number
    price: number
    instructions?: string
}

export type TransactionStatus = 'pending' | 'on_delivery' | 'delivered' | 'cancelled'
export type PaymentStatus = 'unpaid' | 'paid' | 'cancelled'

export interface Transaction {
    id: number
    patientName: string
    patientAddress: string
    patientPhone: number
    prescriptionDetails: string
    medicineItems: MedicineItems[]
    type: string
    amount: number
    transactionDate: string
    courier: string
    status: TransactionStatus
    // paymentStatus: PaymentStatus
    paymentMethod: String
    // fee:number
    notes?: string
    createdBy: string
    courierName: String
    prescriptionCode: string
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
  type: z.string().min(1, "Insert type of transaction"),
  // status: z.string().min(1, "Status transaction is required"),
  prescriptionDetails: z.string().min(1, "Prescription details are required"),
  totalAmount: z
    .string()
    .min(1, "Total amount is required")
    .regex(/^\d+$/, "Must be a number"),
  paymentMethod: z.enum(["cash", "bank_transfer", "credit_card", "debit_card"], {
    error: "Payment method is required.",
  }),
  status: z.enum(["pending", "on_delivery", "completed"], {
    error: "Status is required",
  }),
  notes: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof formSchema>;


// DEMO


export type TransactionDemoType = {
  id: string;
  customerName: string;
  patientAddress: string;
  amount: number;
  type: "payment" | "refund" | "chargeback";
  status: "completed" | "pending" | "failed" | "cancelled";
  method: "credit_card" | "debit_card" | "bank_transfer" | "cash";
  date: string;
  medicines: string;
  notes: string;
  fee: number;
}

export const initialTransactionsDemo: TransactionDemoType[] = [
  {
    id: "TXN-001",
    customerName: "Bojes o uno",
    patientAddress: "Jalan By Pass, Pandaan",
    amount: 129000,
    type: "payment",
    status: "completed",
    method: "credit_card",
    date: "2024-01-15T10:30:00Z",
    medicines: "Panadol 500mg",
    notes: "REF-2024-001",
    fee: 12900,
  },
  {
    id: "TXN-002",
    customerName: "Onde Mande",
    patientAddress: "Taman Dayu no. 4",
    amount: 149000,
    type: "payment",
    status: "pending",
    method: "bank_transfer",
    date: "2024-01-14T15:45:00Z",
    medicines: "Omeprazol 20mg",
    notes: "REF-2024-002",
    fee: 14900,
  },
  {
    id: "TXN-003",
    customerName: "Mike Sinoda",
    patientAddress: "Taman Dayu No. 1",
    amount: 89999,
    type: "refund",
    status: "completed",
    method: "credit_card",
    date: "2024-01-13T09:15:00Z",
    medicines: "Amoxilin 20mg",
    notes: "REF-2024-003",
    fee: 8900,
  },
  {
    id: "TXN-004",
    customerName: "Emily Armstrong",
    patientAddress: "Gempol, Pandaan",
    amount: 59900,
    type: "payment",
    status: "failed",
    method: "debit_card",
    date: "2024-01-12T14:20:00Z",
    medicines: "Metformin 500mg",
    notes: "REF-2024-004",
    fee: 5900,
  },
  {
    id: "TXN-005",
    customerName: "Alexandre Ichal",
    patientAddress: "Gempol, Pandaan",
    amount: 61000,
    type: "payment",
    status: "completed",
    method: "cash",
    date: "2024-01-11T11:00:00Z",
    medicines: "Ibuprofen 20mg",
    notes: "REF-2024-005",
    fee: 6100,
  },
];

export interface TransactionQueryResult {
  data: Transaction[]
  totalCount: number
}