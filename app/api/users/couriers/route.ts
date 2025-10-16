import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET(){
    const {data, error} = await supabaseAdmin
            .from('users')
            .select('id, name')
            .eq('role', 'courier')
            .eq('status', 'active')
            .order('name', {ascending: true})

    if(error) return NextResponse.json(
        {error: error.message},
        {status: 400}
    )

    return Response.json(data)
}