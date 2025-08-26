

import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
// import {createClient} from "@/lib/supabase/server"
import { supabase } from "@/lib/supabase/client";
import { createServer } from "@/lib/supabase/server";

export async function POST(req: Request){
    try{

        const {email, password, role} = await req.json()

        if(!email || !password){
            return NextResponse.json(
                {error: 'Email and password are required!'},
                {status: 400}
            )
        }

        const {data, error} = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            user_metadata: {role}
        })

        if(error){
            return NextResponse.json({error: error.message}, {status: 400})
        }

        return NextResponse.json({user: data.user})
    }catch(err){
        return NextResponse.json(
            {error: "Something went wrong"}, 
            {status: 500}
        )
    }
}

export const GET = async () => {
    try{
        const supabase = await createServer()
        const {data: {user: currentUser}, error: authError} = await supabase.auth.getUser()

        if(authError || !currentUser){
            return NextResponse.json({error: 'Unauthorized'}, {status: 401})
        }

        // Fetch users table
        const {data: users, error} = await supabase
            .from('users')
            .select('id, name, email, role, phone, created_at, last_sign_in, status, avatar')
            .order('created_at', {ascending: false})

        if(error){
            console.error('Error fetching users: ', error)
            return NextResponse.json({error: 'Failed to fetch users'}, {status: 500})
        }

        return NextResponse.json(users || null)

    }catch(err){
        return NextResponse.json(
            {error: "Something went wrong"},
            {status: 500}
        )
    }
}
