
import { clientRepositories } from "@/lib/api/clients/supabase/client";
import { Pagination } from "@/types/pagination";
import { Transaction, TransactionQueryResult } from "@/types/transactions";

export class TransactionClientService{
   async getTransactions(
      pagination: Pagination, 
      user?: {id: string, role: string}
   ): Promise<TransactionQueryResult>{
      const [transactionResult, couriers] = await Promise.all([
         clientRepositories.transactions.getTransaction(pagination, user),
         clientRepositories.couriers.getCouriers()
      ])
   //  return clientRepositories.transactions.getTransaction(pagination)

   const courierMap = new Map(couriers.map(c => [c.id, c.name]))
   console.log('service mapping courier : ', courierMap)

   const mappedTransactions = transactionResult.data.map(tx => ({
      ...tx,
      courierName: courierMap.get(tx.courier) || "Unknown Courier"
   }))

   return {
      data: mappedTransactions,
      totalCount: transactionResult.totalCount
   }
   }

}

export const transactionClientService = new TransactionClientService()