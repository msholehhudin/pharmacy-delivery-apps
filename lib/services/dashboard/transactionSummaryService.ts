import { serverRepositories } from '@/lib/api/clients/supabase/server'

export class DashboardService {
    async transactionSummaryService(month: string) {
        // const startDate = `${month}-01`
        const startDate = new Date(`${month}-01T00:00:00.000Z`)
        const endDate = new Date(startDate)
        endDate.setUTCMonth(endDate.getUTCMonth() + 1)
        // endDate.setMonth(endDate.getMonth() + 1)
    
        try {
            const transaction = await serverRepositories.transactions.getTransactionByMonth(startDate.toISOString(),endDate.toISOString())
            // console.log("service summary dashboard")

            const summary = transaction.reduce(
                (acc: any, trx: any) => {
                    acc.totalRevenue += Number(trx.total_amount)

                    if(trx.status === 'completed') acc.completedOrderCount++
                    if(trx.status === 'pending') acc.pendingOrderCount++

                    return acc

                },
                {
                    totalRevenue: 0,
                    completedOrderCount: 0,
                    pendingOrderCount: 0
                }
            ) 

            return summary

        } catch (error) {
            throw error
        }
    
    }
}

export const dashboardService = new DashboardService()