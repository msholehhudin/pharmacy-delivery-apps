import { Transaction, TransactionFormValues } from "@/types/transactions";

export class TransactionApiService {
    async createTransaction(values: TransactionFormValues): Promise<Transaction> {
        const response = await fetch('/api/transactions/create',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        if(!response.ok){
            let errorMessage = 'Failed to create transaction'

            try {
                const errorData = await response.json()
                errorMessage = errorData.message || errorMessage
            } catch (error) {
                errorMessage = response.statusText || `HTTP error! status : ${response.status}`
            }
            
            throw new Error(errorMessage)
        }

        return response.json();
    }
}

export const transactionApiService = new TransactionApiService()