import { notificationApi } from "@/lib/api/notificationApi";
import { supabase } from "@/lib/supabase/client";
import { Notification } from "@/types/notifications"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react";

export const NOTIFICATION_QUERY_KEY = "notifications";

export const useNotifications = () => {
    const queryClient = useQueryClient();

    // fetch notifications
    const {data: notifications = [], isLoading, isError, error} = useQuery<Notification[]>({
        queryKey: [NOTIFICATION_QUERY_KEY],
        queryFn: notificationApi.getNotifications,
        staleTime: 30000, // 30 seconds
        refetchOnWindowFocus: true
    })

    const unreadCount = notifications.filter(n => !n.is_read).length;

    const {mutateAsync: markAsRead, isPending: isMarkingAsRead} = useMutation({
        mutationFn: (notificationId: string) => {
            console.log("MUTATION FN CALLED: ", notificationId)
            return notificationApi.markAsRead(notificationId)
        },
        onMutate: async (notificationId) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({queryKey: [NOTIFICATION_QUERY_KEY]})

            // Snapshot previous value
            const previousNotifications = queryClient.getQueryData<Notification[]>([
                NOTIFICATION_QUERY_KEY
            ])

            // Optimistically update
            queryClient.setQueryData<Notification[]>(
                [NOTIFICATION_QUERY_KEY],
                (old = []) => 
                    old.map((n) => n.id === notificationId  ? {...n, is_read: true} : n)
            );

            return {previousNotifications}
        },
        onError: (_err, _notificationId, context) => {
            queryClient.setQueryData(
                [NOTIFICATION_QUERY_KEY],
                context?.previousNotifications
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: [NOTIFICATION_QUERY_KEY]})
        }
    })

    // Real-time subscription
    useEffect(() => {
        const channel = supabase
            .channel("notifications")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "notifications",
                },
                (payload) => {
                    console.log("Realtime RECEIVED: ", payload)
                    // Invalidate and refetch on any change
                    queryClient.invalidateQueries({queryKey: [NOTIFICATION_QUERY_KEY]})
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel)
        }
    }, [queryClient])

    return {
        notifications,
        unreadCount,
        isLoading,
        isError,
        error,
        markAsRead,
        isMarkingAsRead
    }
}
