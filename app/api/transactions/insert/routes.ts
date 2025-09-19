import { TransactionFormValues } from "@/components/PharmacyTransactions/TransactionForm";
import { supabaseAdmin } from "@/lib/supabase/admin"
import { createServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server"

export const POST = async(req:TransactionFormValues) => {
    try{
        // const body = await req.json()

        const supabase = await createServer()

        const {data:{session}} = await supabase.auth.getSession()
        if(!session) throw new Error('Not Authenticated!')

        const insertData = {
            patient_name: req.patientName,
            patient_address: req.patientAddress,
            patient_phone: req.patientPhone,
            courier_id: req.courier,
            prescription_details: req.prescriptionDetails,
            total_amount: req.totalAmount,
            payment_method: req.paymentMethod,
            status: 'pending',
            notes: req.notes || null,
            user_id: session.user.id
        }

        const {data, error} = await supabaseAdmin
                .from('transactions')
                .insert(insertData)
                .select("*");

        if(error) return NextResponse.json(
            {error: error.message},
            {status: 400}
        )

        return NextResponse.json(data[0]);
    }catch(err){
        return NextResponse.json(
            {error: 'Internal server error.'},
            {status: 500}
        )
    }
}