import { serverRepositories } from "@/lib/api/clients/supabase/server"
import { transactionClientService } from "@/lib/services/transactions/transactionClientServices"
import { NextRequest } from "next/server"


export const POST = async (request: NextRequest) => {
    console.log("API ROUTE IS BEING CALLED!")
    try {

        // return request
        const {pagination, user} = await request.json()


        // const body = await request.json()
        console.log("API: Request : ", pagination, user)

        if(!user?.id || !user?.role){
            return Response.json(
                {error: "User authentication required"},
                {status: 401}
            )
        }

        if(!pagination?.page || !pagination?.pageSize){
            return Response.json(
                {error: "Pagination parameters required"},
                {status: 400}
            )
        }

        console.log("API: Processing transaction request for user:", user.id);

        // const result = await transactionClientService.getTransactions(pagination, user)

        const [transactionResult, couriers] = await Promise.all([
            serverRepositories.transactions.getTransaction(pagination, user),
            serverRepositories.courier.getCouriers()
        ])

        console.log("🔍 API Route: Processing results...");

        const courierMap = new Map(couriers.map(c => [c.id, c.name]));
        const mappedTransactions = transactionResult.data.map(tx => ({
            ...tx,
            courierName: courierMap.get(tx.courier) || 'Unknown Courier'
        }))

        
        console.log("✅ API Route: Success - returning", mappedTransactions.length, "transactions");

        console.log('API: Transaction request completed')
        return Response.json({
            data: mappedTransactions,
            totalCount: transactionResult.totalCount
        });

    } catch (error) {
        console.error('API error : ', error)

        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}