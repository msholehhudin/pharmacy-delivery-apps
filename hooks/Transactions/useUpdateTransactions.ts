import { TransactionFormValues } from "@/types/transactions"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async({id, payload}
            : {
            id: string;
            payload: Partial<TransactionFormValues> 
        })=> {

            const res = await fetch(`/api/transactions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if(!res.ok){
                const errorData = await res.json()
                throw new Error(errorData.error || 'Failed to update transaction')
            }

            return res.json()
        },

        onSuccess: (data, variable) => {
            console.log("Update success : ", data)

            queryClient.invalidateQueries({
                queryKey: ['transactions']
            })
            queryClient.invalidateQueries({
                queryKey: ['transactions', variable.id]
            })
        },

        onError: (error) => {
            console.error("Error failed: ", error)
        }

        
    })

    return mutation
}