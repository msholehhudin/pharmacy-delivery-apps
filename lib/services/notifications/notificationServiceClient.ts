import { clientRepositories } from "@/lib/api/clients/supabase/client"
import { Notification } from "@/types/notifications"

export class NotificationServiceClient {
       async getNotifications(): Promise<Notification[]>{
        try {
            // const userId = await this.getCurrentUserId()

            // if(!userId){
            //     throw new Error("User not authenticated!")
            // }

            const notifications = await clientRepositories.notifications.findByUserId({
                orderBy: {column: 'created_at', ascending: false},
                limit: 50
            })

            return notifications
        } catch (error) {
            console.error("Service: Error fetching notifications", error)
            throw error
        }
    }

    async markAsRead(notificationId: string): Promise<void>{
        try {
            console.log("[SERVICE] markAsRead called ", notificationId)
            const notification = await clientRepositories.notifications.findById(notificationId)
            if(!notification){
                throw new Error("Notification not found")
            }

            const update =  await clientRepositories.notifications.markAsRead(notificationId)
            console.log("Service: Update Notification found", update)


        } catch (error) {
            console.error("Service: Error making notification as read",error)
            throw error
        }
    }
}

export const notifServiceClient = new NotificationServiceClient()