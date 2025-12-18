import { transactionServerService } from "@/lib/services/transactions/transactionsServerService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({error: "Not implemented!"}, {status: 501})
}


export async function PUT(request: NextRequest, {params}: {params: Promise<{ id: string}> }){
    try {
        const { id } = await params
        const payload = await request.json()

        console.log("PUT request received for ID:", id);
        console.log("Payload:", payload);

        if(!id){
            return NextResponse.json(
                {error: "Transaction ID is required"},
                {status: 400}
            )
        }

        
        const updateTransaction = await transactionServerService.updateTransaction({
            id,
            ...payload
        })

        return NextResponse.json(updateTransaction)
    } catch (error: any) {
        console.error("PUT error : ", {
            message: error.message,
            stack: error.stack,
            name: error.name
        })

        return NextResponse.json(
            {error: "Failed to process request!"}, 
            {status: 500}
        )
    }
}

export async function DELETE(){
    return NextResponse.json({error: "Not implemented!"}, {status: 501})
}