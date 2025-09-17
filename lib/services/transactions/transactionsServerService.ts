
import { serverRepositories } from "@/lib/api/clients/supabase/server";
import { Transaction, TransactionFormValues } from "@/types/transactions";

export class TransactionServerService{

   async createTransaction(values: TransactionFormValues):Promise<Transaction>{
    return serverRepositories.transactions.createTransaction(values)
   }
}

export const transactionServerService = new TransactionServerService()