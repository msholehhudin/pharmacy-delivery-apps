
import { clientRepositories } from "@/lib/api/clients/supabase/client";
import { Pagination } from "@/types/pagination";
import { Transaction } from "@/types/transactions";

export class TransactionClientService{
   async getTransactions(pagination: Pagination): Promise<Transaction[]>{
    return clientRepositories.transactions.getTransaction(pagination)
   }

}

export const transactionClientService = new TransactionClientService()