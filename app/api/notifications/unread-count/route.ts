import { serverRepositories } from "@/lib/api/clients/supabase/server";
import { NotificationService } from "@/lib/services/notifications/notificationService";
import { createServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const supabase = await createServer()

        const {data: {user}} = await supabase.auth.getUser()
        // console.log('Route: ', user)
        if(!user){
            return NextResponse.json(
                {error: 'Unauthorized!'},
                {status: 401}
            )
        }
        const count = await serverRepositories.notifications.getUnreadCount(user.id)
        return NextResponse.json(count)
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}