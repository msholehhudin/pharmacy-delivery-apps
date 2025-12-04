import { serverRepositories } from "@/lib/api/clients/supabase/server";
import { createServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest) => {
    try {
        const supabase = await createServer()
        const {data: {user}} = await supabase.auth.getUser()
        if(!user){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        const {searchParams} = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '50')

        const notifications = await serverRepositories.notifications.createMultiple(user.id, limit)

        return NextResponse.json(notifications)
    } catch (error) {
        console.error('API error :', error)

        return Response.json(
            {error: "Internal server error"},
            {status: 500}
        )
    }
}