import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request){
    try{

        const {email, password, role} = await req.json()

        const {data, error} = await supabase.auth.admin.createUser({
            email,
            password,
            user_metadata: {role}
        })

        if(error){
            return NextResponse.json({error: error.message}, {status: 400})
        }

        return NextResponse.json({user: data.user})
    }catch(err){
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}