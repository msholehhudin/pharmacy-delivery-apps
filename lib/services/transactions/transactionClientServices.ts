
import { clientRepositories } from "@/lib/api/clients/supabase/client";
import { Transaction } from "@/types/transactions";

export class TransactionClientService{
   async getTransactions(): Promise<Transaction[]>{
    return clientRepositories.transactions.getTransaction()
   }

}

export const transactionClientService = new TransactionClientService()