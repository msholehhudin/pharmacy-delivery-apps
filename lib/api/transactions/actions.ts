'use server'

import { TransactionFormValues } from "@/components/Transactions/TransactionForm"
import { createServer } from "@/lib/supabase/server"

export const createTransaction = async(values: TransactionFormValues) => {
    const supabase = await createServer()

    const {data: {session}} = await supabase.auth.getSession();
    if(!session) throw new Error('Not authenticated')

    const inserData = {
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
        .insert(inserData)
        .select('*')
        .single();

    if(error) throw error
    return data
}