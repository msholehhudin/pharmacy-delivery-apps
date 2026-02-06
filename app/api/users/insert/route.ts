import { supabaseAdmin } from "@/lib/supabase/admin"
import { createServer } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    let authUserId: string | null = null

    try{
        const {email, password, role, name, phone, status} = await req.json()

        if(!email || !password){
            return NextResponse.json(
                {error: 'Email and password are required!'},
                {status: 400}
            )
        }

        // 1. Create auth user
        const {data: authData, error: authError} = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            user_metadata: {role},
            email_confirm: true
        })

        if(authError){
            return NextResponse.json({error: authError.message}, {status: 400})
        }

        authUserId = authData.user.id

        // 2. Create profile in users table
        const supabaseServer = await createServer()
        const {error: profileError} = await supabaseAdmin
            .from('users')
            .insert([{
                id: authUserId,
                name,
                email,
                phone: phone || null,
                role: role || 'user',
                status: status || 'active',
                avatar: "/placeholder.svg?height=40&width=40",
                last_sign_in: null,
                created_at: new Date().toISOString(),
            }])
            .select()
            .single()

        if(profileError){
            // 3. Rollback
            await supabaseAdmin.auth.admin.deleteUser(authUserId);
            return NextResponse.json({error: 'Failed to create user profile: ' + profileError.message}, {status: 500})
        }

        // 4. SUCCESS: Return the created auth user
        return NextResponse.json(authData.user)
        
    }catch(err){

        if(authUserId){
            await supabaseAdmin.auth.admin.deleteUser(authUserId)
        }
        console.error('User creation error: ', err)
        return NextResponse.json(
            {error: "Internal server error"}, 
            {status: 500}
        )
    }
}