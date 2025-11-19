'use client'

import { DialogStates } from "@/types/dialogs"
import { Transaction } from "@/types/transactions"
import { useState } from "react"



const useTransactionDialogs = () => {
    const [dialogStates, setDialogStates] = useState<DialogStates>({
        viewMedicines: false,
        add: false,
        edit: false,
        delete: false
    })
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

    const openDialog = (dialog: keyof DialogStates, transaction?: Transaction) => {
        setDialogStates((prev) => ({...prev, [dialog]: true}))
        if(transaction){
            setSelectedTransaction(transaction)
            // console.log("selected tx on hooks : ", selectedTransaction)
        }
    }

    const closeDialog = (dialog: keyof DialogStates) => {
        // console.log('state hooks : ', dialogStates)
        setDialogStates((prev) => ({...prev, [dialog]: false}))
        // console.log('state hooks after set : ', dialogStates)
    }

    return {
        dialogStates,
        openDialog,
        closeDialog,
        selectedTransaction
    }
}

export default useTransactionDialogs