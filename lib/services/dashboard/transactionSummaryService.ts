import { serverRepositories } from '@/lib/api/clients/supabase/server'
import React from 'react'

export class DashboardService {
    async transactionSummaryService(month: string) {
        const startDate = `${month}-01`
        const endDate = new Date(startDate)
        endDate.setMonth(endDate.getMonth() + 1)
    
        try {
            const result = serverRepositories.transactions.getTransactionByMonth(startDate,endDate.toISOString())
            console.log("service summary dashboard")
            return result
        } catch (error) {
            throw error
        }
    
    }
}

export const dashboardService = new DashboardService()