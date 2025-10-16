'use client'

import { DialogStates } from "@/types/dialogs"
import { useState } from "react"



const useTransactionDialogs = () => {
    const [dialogStates, setDialogStates] = useState<DialogStates>({
        viewMedicines: false,
        add: false,
        edit: false,
        delete: false
    })

    const openDialog = (dialog: keyof DialogStates) => {
        setDialogStates((prev) => ({...prev, [dialog]: true}))
    }

    const closeDialog = (dialog: keyof DialogStates) => {
        // console.log('state hooks : ', dialogStates)
        setDialogStates((prev) => ({...prev, [dialog]: false}))
        // console.log('state hooks after set : ', dialogStates)
    }

    return {
        dialogStates,
        openDialog,
        closeDialog
    }
}

export default useTransactionDialogs