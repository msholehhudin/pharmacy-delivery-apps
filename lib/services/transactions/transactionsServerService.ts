
import { serverRepositories } from "@/lib/api/clients/supabase/server";
import { Transaction, TransactionFormValues, UpdateTransactionValues } from "@/types/transactions";

export class TransactionServerService{

   async createTransaction(values: TransactionFormValues):Promise<Transaction>{
    return serverRepositories.transactions.createTransaction(values)
   }


   async updateTransaction(values: UpdateTransactionValues): Promise<Transaction>{
      try {
         const result = serverRepositories.transactions.updateTransaction(values)
         console.log("Service: Update successful: ", result)
         return result
      } catch (error) {
         console.error('Service: Update failed: ', error)
         throw error
      }
   }
}

export const transactionServerService = new TransactionServerService()