
import { createServer } from "@/lib/supabase/server";

export const getServerTransactions = async() =>{
    try{
        const supabase = await createServer()

        // Verify session
        const {data: {session}, error: sessionError} = await supabase.auth.getSession()
        if(sessionError || !session){
            console.error('Authentication error : ', sessionError)
            return []
        }
    
        const {data, error} =  await supabase
            .from("transactions")
            .select("*")
            .order('created_at', {ascending: false})
    
            console.log('Query executed')
            console.log('Raw data from Supabase: ', data)
    
        if(error){
            console.error("Failed to fetch transactions", error)
            return [];
        }
    
        return data
    }catch(err){
        console.error('Unexpected error: ', err)
        return []
    }
}