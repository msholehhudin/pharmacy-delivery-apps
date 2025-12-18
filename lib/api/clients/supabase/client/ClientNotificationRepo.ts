"use client"

import { supabase } from "@/lib/supabase/client"
import { Notification } from "@/types/notifications"

type QueryOptions = {
    orderBy?: {column: string, ascending: boolean},
    limit?: number
}

export class ClientNotificationRepo{
    async findByUserId(options?: QueryOptions): Promise<Notification[]> {
            const {data: {session}, error:userError} = await supabase.auth.getSession()
            if(!session || userError) throw new Error('Not Authenticated!')

                // console.log('Repo Client : ', session)

            let query = supabase
                .from('notifications')
                .select('*')
                .eq("user_id", session.user.id)

            if(options?.orderBy){
                query = query.order(options.orderBy.column, {
                    ascending: options.orderBy.ascending
                })
            }
            
            if(options?.limit){
                query = query.limit(options.limit)
            }


            const {data, error} = await query;

            // console.log('Repo Client Data :', data)

            if(error){
                console.error("Repository: Error fetching notifications", error)
                throw new Error(`Failed to fetch notifications: ${error.message}` )
            }

            return data || []

        }

        /**
         * Find single notification by ID
         */
    async findById(notificationId: string): Promise<Notification | null>{

        console.log("[Repo] findById started : ", notificationId)

        const {data, error} = await supabase
                .from('notifications')
                .select('*')
                .eq("id", notificationId)
                .single();
        
        if(error){
            if(error.code === "PGRST116"){
                return null
            }
            console.error("Repository: Error fetching notification", error)
            throw new Error(`Failed to fetch notification: ${error.message}`)
        }

        console.log("[Repo] Query finished:", { data, error });

        return data;
    }

    /**
     * 
     * Mark notification as read
     */
    async markAsRead(notificationId: string): Promise<void>{
        console.log("[Repo] Update notification : ", notificationId)
        const {error} = await supabase
                .from("notifications")
                .update({is_read: true})
                .eq('id', notificationId)

        if(error){
            console.error("Repository: Error marking notification as read", error)
            throw new Error(`Failed to mark notification as read: ${error.message}`)
        }
    }
}


