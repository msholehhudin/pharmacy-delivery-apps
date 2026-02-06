import { createServer } from "@/lib/supabase/server";
import { CreateNotificationInput, Notification } from "@/types/notifications";



export class ServerNotificationRepo {
    // create DIFFERENT notifications (each can have different content)
    async createMultiple(notifications: CreateNotificationInput[]): Promise<Notification[]>{
        const supabase = await createServer()
        const {data: {user}, error: userError} = await supabase.auth.getUser()

        if(userError || !user) throw new Error('Not Authenticated!')


        const notificationsWithTimestamps = notifications.map(notification => ({
            ...notification,
            related_entity_type: notification.related_entity_type || 'transaction',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }))


        const {data, error} = await supabase
            .from('notifications')
            .insert(notificationsWithTimestamps)

        if(error) throw error
        return data || []
    }

    // create the SAME notification for MULTIPLE users
    async createForUsers(userIds: string[], notificationData: any){
        const supabase = await createServer()
    }

    async getUnreadCount(userId: string){
        const supabase = await createServer()
        const {count, error} = await supabase
            .from('notifications')
            .select('*', {count: 'exact', head: true})
            .eq('user_id', userId)
            .eq('is_read', false)

        // console.log("Repo : ", userId)

        if(error) throw error
        return count || 0
    }

}