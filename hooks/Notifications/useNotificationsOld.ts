// import { Notification } from "@/types/notifications"
// import { useQuery } from "@tanstack/react-query"

// export const useNotifications = (limit: number = 50) => {
//     return useQuery({
//         queryKey: ['notifications', 'list', limit],
//         queryFn: async (): Promise<Notification[]> => {
//             const res = await fetch(`/api/notificaitons?limit=${limit}`)
//             if(!res.ok) throw new Error('Failed to fetch notificaions')
            
//             return res.json()
//         },
//         staleTime: 1000 * 60, // 1 Minute cache
//         // enabled: options
//     })
// }

// export const useNotificationCount = () => {
//     return useQuery({
//         queryKey: ['notification', 'unread-count'],
//         queryFn: async(): Promise<number> => {
//             const res = await fetch(`/api/notifications/unread-count`)
//             if(!res.ok) throw new Error('Failed to fetch notification count')
            
//             return res.json()
//         },
//         refetchInterval: 30000, // Poll every 30 seconds
//         staleTime: 0, // Always consider stale
//         refetchOnWindowFocus: true // Refetch when tab becomes active
//     })
// }