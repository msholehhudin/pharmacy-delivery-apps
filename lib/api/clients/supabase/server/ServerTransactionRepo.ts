import { createServer } from "@/lib/supabase/server"
import { generateTransactionCode } from "@/lib/utils/generators/transactionCode"
import { TransactionDB } from "@/types/database"
import { Pagination } from "@/types/pagination"
import { Transaction, TransactionFormValues, TransactionQueryResult, UpdateTransactionValues } from "@/types/transactions"
import { mapTransaction } from "@/utils/transaction.mapper"

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
            created_by: session.user.id,
            prescription_code: generateTransactionCode(),
            type: values.type
        }

        const {data, error} = await supabase
            .from('transactions')
            .insert(insertData)
            .select('*')
            .single()

        if(error) throw error

        return data
    }

    async getTransaction(pagination: Pagination,  user?: {id:string, role: string}): Promise<TransactionQueryResult>{
            try {
                console.log("Repository: Starting query for user : ", user?.id)
    
                const from = (pagination.page - 1) * pagination.pageSize
                const to = from + pagination.pageSize - 1

                const supabase = await createServer()
    
                let query = supabase
                    .from('transactions')
                    .select('*', {count: 'exact'})
                    .order('created_at', {ascending: false})
                    .eq('isActive', true)
                    .range(from, to )
    
                const search = pagination.search?.trim()
                if(search && search.length > 2){
                    query = query.ilike("patient_name", `%${pagination.search}%`)
                }
    
                if(pagination.status && pagination.status !== 'all'){
                    query = query.eq("status", pagination.status)
                }
    
                if(user?.role == "courier"){
                    query = query.eq("courier_id", user.id)
                }
            
                // console.time("supabase-query")
                const {data, count, error} = await query
                // console.timeEnd("supabase-query")
    
                if(error) {
                    if(error.code == "PGRST103"){
                        console.warn("Supabase range exceeded total rows, returning empty result.")
                        return {data: [], totalCount: count ?? 0}
                    }
                    console.error("Supabase query error : ", error)
                    throw error
                }
    
                  console.log("Repository: Query successful", {
                    from, to, 
                    returned: data?.length, 
                    totalCount: count
                });
    
                // console.log("pagination debug: ", {from,to, pageSize: pagination.pageSize, seaerch: pagination.search, returned: data?.length, totalCount: count})
        
                return {
                    data: data?.map(mapTransaction) || [],
                    totalCount: count || 0,
                } 
            } catch (error) {
                console.error("Query failed: ", error)
                // return { data: [], totalCount:0 }
                throw error
            }
            
    }

    async updateTransaction(values: UpdateTransactionValues): Promise<Transaction>{
        const supabase = await createServer()
        const {data: {user}, error: userError} = await supabase.auth.getUser()
        if(userError || !user) throw new Error('Not Authenticated!')

        // =============================================
        // const {data: existing, error: checkError} = await supabase
        //     .from('transactions')
        //     .select('*')
        //     .eq('id', values.id)
        //     .single();

        // console.log("Existing Transaction : ", existing);
        // return existing
        // =============================================

        const updateData: Partial<TransactionDB> = {
            updated_by: user.id,
            updated_at: new Date().toISOString()
        }

        // Only update separated files

        if(values.patientName !== undefined) updateData.patient_name = values.patientName;
        if(values.patientAddress !== undefined) updateData.patient_address= values.patientAddress;
        if(values.patientPhone !== undefined) updateData.patient_phone= values.patientPhone;
        if(values.courier !== undefined) updateData.courier_id= values.courier;
        if(values.prescriptionDetails !== undefined) updateData.prescription_details= values.prescriptionDetails;
        if(values.totalAmount !== undefined) updateData.total_amount= values.totalAmount;
        if(values.paymentMethod !== undefined) updateData.payment_method= values.paymentMethod;
        if(values.status !== undefined) updateData.status = values.status;
        if(values.notes !== undefined) updateData.notes= values.notes;
        if(values.type !== undefined) updateData.type = values.type;

        console.log("data before update : ", updateData)

        const {data, error, count} = await supabase
            .from('transactions')
            .update(updateData)
            .eq('id', values.id)
            .select('*')
            

        console.log("Update response api : ", {data, error, count, rowsReturned: data?.length})

        if(error) {
            console.error("Database update error: ",error)
            throw error
        }

        if(!data || data.length == 0){
            console.error(`No data returned after update`)
            throw new Error(`Transaction ${values.id} not found or update failed`)
        }

        return data[0]
    }
}