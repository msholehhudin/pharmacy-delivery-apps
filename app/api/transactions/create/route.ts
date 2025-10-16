import { transactionServerService } from "@/lib/services/transactions/transactionsServerService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const transaction = await transactionServerService.createTransaction(body)
        
        return NextResponse.json(transaction, {status: 201})
    } catch (error: any) {
        console.error('Error creating transaction : ', error)

        const errorMessage = error.message || 'Internal server error';
        const statusCode = error.message?.includes('Not Autheticated') ? 401 : 500

        return NextResponse.json(
            {message: errorMessage},
            {status: statusCode}
        )
    }
}