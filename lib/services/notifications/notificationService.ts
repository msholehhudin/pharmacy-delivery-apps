
// import { clientRepositories } from "@/lib/api/clients/supabase/client";
import { serverRepositories } from "@/lib/api/clients/supabase/server";
// import { createServer } from "@/lib/supabase/server";
import { CreateNotificationInput, Notification } from "@/types/notifications";

export interface NotificationProps {
    transactionId: string
    title: string
    message: string
    type: 'transaction_change' | 'status_update' | 'assignment'
    targetUserIds: string[]
}

export class NotificationService {
    async sendTransactionNotification ({transactionId, title, message, type, targetUserIds}: NotificationProps) : Promise<Notification[]>{

        if(targetUserIds.length == 0){
            return []
        }

        const notifications: CreateNotificationInput[] = targetUserIds.map(userId => ({
            user_id: userId,
            title,
            message,
            type,
            related_entity_type: 'transaction',
            related_entity_id: transactionId
        }))

        return await serverRepositories.notifications.createMultiple(notifications)
    }

    async getUnreadCount(userId: string){
        return await serverRepositories.notifications.getUnreadCount(userId)
    }

 
    
    // async getCurrentUserId(): Promise<string | null>{
    //     // const {supabase} = await import("@/lib/supabase/client")
    //     const supabase = await createServer()
    //     const {data: {user}, error} = await supabase.auth.getUser()
    //     return user?.id || null
    // }
}

export const notificationService = new NotificationService()