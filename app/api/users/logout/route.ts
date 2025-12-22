import { createServer } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const POST = async () => {
    const supabase = await createServer()
    await supabase.auth.signOut()

    return NextResponse.json({success: true})
}