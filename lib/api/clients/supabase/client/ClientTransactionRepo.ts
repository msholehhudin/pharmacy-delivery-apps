import { supabase } from "@/lib/supabase/client";
import { Pagination } from "@/types/pagination";
import { Transaction } from "@/types/transactions";

export class ClientTransactionRepo{
    async getTransaction(pagination: Pagination): Promise<Transaction[]>{
        const {data: session} = await supabase.auth.getSession()
        if(!session) return []

        const from = (pagination.page - 1) * pagination.pageSize
        const to = from + pagination.pageSize - 1

        let query = supabase
            .from('transactions')
            .select('*')
            .order('created_at', {ascending: false})
            .range(from, to )

        if(pagination.search){
            query = query.ilike("patient_name", `%${pagination.search}%`)
        }

        if(pagination.status){
            query = query.eq("status", pagination.status)
        }
        
        const {data, error} = await query
        if(error) throw error
        return data || []
    }
}