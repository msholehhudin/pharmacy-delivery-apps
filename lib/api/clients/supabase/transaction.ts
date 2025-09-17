import { TransactionFormValues } from "@/components/Transactions/TransactionForm";
import { supabase } from "@/lib/supabase/client";
import { createServer } from "@/lib/supabase/server";
import { Transaction } from "@/types/transactions";

export class SupabaseTransactionRepository{
    // Client-side operations
    async getTransactions(): Promise<Transaction[]>{
        const {data: {session}} = await supabase.auth.getSession()
        if(!session) return []

        const {data, error} = await supabase
            .from('transactions')
            .select('*')
            .order('created_at', {ascending: false})

        if(error) throw error
        return data || []
    }

    // Server-side operations
    async createTransaction(values: TransactionFormValues): Promise<Transaction>{

        const supabase = await createServer()
        const {data: {session}} = await supabase.auth.getSession()
        if(!session) throw new Error('Not Authenticated!')

         const insertData = {
            patient_name: values.patientName,
            patient_address: values.patientAddress,
            patient_phone: values.patientPhone,
            courier_id: values.courier,
            prescription_details: values.prescriptionDetails,
            total_amount: values.totalAmount,
            payment_method: values.paymentMethod,
            status: 'pending',
            notes: values.notes || null,
            user_id: session.user.id
        }

        const {data, error} = await supabase
            .from('transactions')
            .insert(insertData)
            .select('*')
            .single()

        if(error) throw error

        return data
    }
}