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