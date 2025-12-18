import { supabase } from "@/lib/supabase/client";

export class ClientUserRepo {
    async getCouriers(){
        const session = await supabase.auth.getSession()
        console.log('Supabase session in getCouriers: ', session)

        const {data, error} = await supabase
                .from("users")
                .select("id, name")
                .eq("role", "courier")
                .eq("status", "active")
                .order("name", {ascending: true})

        if(error) {
            console.error("[clientRepo Courier] supabase error : ", error)
            throw error
        }
        console.log("[clientRepo Courier] result : ", data)
        return data || [];
    }
}