export interface Notification {
    id: string
    user_id: string
    title: string
    message: string
    type: 'transaction_change' | 'status_update' | 'assignment'
    related_entity_type: 'transaction'
    related_entity_id: string
    is_read: boolean
    created_at: string
    updated_at: string
}

export interface CreateNotificationInput {
    user_id: string
    title: string
    message: string
    type: 'transaction_change' | 'status_update' | 'assignment'
    related_entity_type?: 'transaction'
    related_entity_id: string
}

export interface NotificationFilters {
    limit?: number
    is_read?: boolean
}