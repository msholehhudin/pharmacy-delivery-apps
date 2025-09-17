import { createServer } from "@/lib/supabase/server"
import { Transaction, TransactionFormValues } from "@/types/transactions"

export class ServerTransactionRepo{
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