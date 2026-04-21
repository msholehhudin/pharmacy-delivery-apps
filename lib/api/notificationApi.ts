import { Notification } from "@/types/notifications";
import { notifServiceClient } from "../services/notifications/notificationServiceClient";

export const notificationApi = {

    // Get all notifications for current user
    async getNotifications(): Promise<Notification[]>{
        try {
            const notifications = await notifServiceClient.getNotifications()

            return notifications.map(notif => ({
                ...notif,
                isNew: isNewNotification(notif.created_at)
            }))
        } catch (error) {
            console.error("API: Failed to fetch notifications", error)
            throw new Error("Failed to fetch notifications")
        }
    },

    // Mark single notification as read
    async markAsRead(notificaionId: string): Promise<void>{
        try {
            console.log("[API Layer] call service", notificaionId)
            const notification = await notifServiceClient.markAsRead(notificaionId)
            console.log("[API Layer] result from ", notification)
            return notification
        } catch (error) {
            console.error(`API: Failed to mark notification ${notificaionId} as read`, error)
            throw new Error("Failed to mark notification as read")
        }
    }
}

const  isNewNotification = (createdAt: string) => {
        const diffInMinutes = (Date.now() - new Date(createdAt).getTime()) / 60000
        return diffInMinutes < 5
}