import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabase/client";
import { Pagination } from "@/types/pagination";
import { Transaction, TransactionQueryResult } from "@/types/transactions";
import { mapTransaction } from "@/utils/transaction.mapper";

export class ClientTransactionRepo{
    async getTransaction(pagination: Pagination,  user?: {id:string, role: string}): Promise<TransactionQueryResult>{
        try {
            console.log("Repository: Starting query for user : ", user?.id)

            const from = (pagination.page - 1) * pagination.pageSize
            const to = from + pagination.pageSize - 1

            let query = supabase
                .from('transactions')
                .select('*', {count: 'exact'})
                .order('created_at', {ascending: false})
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
        
            console.time("supabase-query")
            const {data, count, error} = await query
            console.timeEnd("supabase-query")

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

}