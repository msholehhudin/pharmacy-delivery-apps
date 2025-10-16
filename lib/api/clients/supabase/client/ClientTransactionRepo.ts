import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabase/client";
import { Pagination } from "@/types/pagination";
import { Transaction, TransactionQueryResult } from "@/types/transactions";
import { mapTransaction } from "@/utils/transaction.mapper";

export class ClientTransactionRepo{
    async getTransaction(pagination: Pagination,  user?: {id:string, role: string}): Promise<TransactionQueryResult>{
        const {data: {session}} = await supabase.auth.getSession()
        if(!session) return { data: [],totalCount:0 }

        // console.log('User auth context : ', user)
        // Fetch user role 
        // const {data: user} = await supabase
        //     .from("users")
        //     .select("role")
        //     .eq("id", session.user.id)

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
        
        const {data, count, error} = await query
        if(error) throw error

        console.log("pagination debug: ", {from,to, pageSize: pagination.pageSize, seaerch: pagination.search, returned: data?.length, totalCount: count})

        return {
            data: data?.map(mapTransaction) || [],
            totalCount: count || 0,
        } 
        
    }

}