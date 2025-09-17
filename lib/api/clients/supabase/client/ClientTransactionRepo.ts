import { supabase } from "@/lib/supabase/client";
import { Transaction } from "@/types/transactions";

export class ClientTransactionRepo{
    async getTransaction(): Promise<Transaction[]>{
        const {data: session} = await supabase.auth.getSession()
        if(!session) return []

        const {data, error} = await supabase
            .from('transactions')
            .select('*')
            .order('created_at', {ascending: false})

        if(error) throw error
        return data ||[]
    }
}