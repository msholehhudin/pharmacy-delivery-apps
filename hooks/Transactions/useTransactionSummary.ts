import { useQuery } from '@tanstack/react-query'

export type TransactionSummary = {
    totalRevenue: number
    totalItemSold: number
    completedOrderCount: number
    pendingOrderCount: number
}

type summaryProps = {
    month?: string
}

const useTransactionSummary = ({month}: summaryProps) => {
  return useQuery<TransactionSummary>({
    queryKey: ['transaction-summary',month] ,
    queryFn: async() =>  {
        const res = await fetch(`/api/dashboard/summary${month ? `?month=${month}` : ""}`)
        
        if(!res.ok) throw new Error("Failed to fetch transaction summary")
        return res.json()
    }
  })
}

export default useTransactionSummary