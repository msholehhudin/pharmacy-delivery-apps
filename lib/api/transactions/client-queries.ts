"use client"

import { supabase } from "@/lib/supabase/client"


export const getClientTransactions = async() => {
    try{
        // const supabase = createClient()

        const {data: {session}} = await supabase.auth.getSession()

        if(!session) return []

        const {data, error} = await supabase
            .from("transactions")
            .select('*')
            .order('created_at', {ascending: false})


        if(error) throw error
        return data || []
    }catch(err){
        console.error('Unexpected error: ', err)
        return []
    }
}