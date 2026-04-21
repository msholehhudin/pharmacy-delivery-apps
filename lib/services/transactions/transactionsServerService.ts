
import { serverRepositories } from "@/lib/api/clients/supabase/server";
import { Transaction, TransactionFormValues, UpdateTransactionValues } from "@/types/transactions";
import { notificationService } from "../notifications/notificationService";

export class TransactionServerService{

   async createTransaction(values: TransactionFormValues):Promise<Transaction>{
      try {
         
         // 1. create transaction
         const transaction = await serverRepositories.transactions.createTransaction(values)

         // 2. send notification to courier
         if(values.courier){
            try {
               await notificationService.sendTransactionNotification({
                  transactionId: transaction.id,
                  title: 'New Delivery Assignment',
                  message: `You have been assigned to deliver to ${values.patientName}`,
                  type: 'assignment',
                  targetUserIds: [values.courier]
               })
               
            } catch (notificationError) {
               console.error('Service: Notification failed: ', notificationError)
            }
         }

         return transaction
      } catch (error) {
         console.error('Service: Transaction creation failed: ', error)
         throw error
      }
      // return serverRepositories.transactions.createTransaction(values)
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