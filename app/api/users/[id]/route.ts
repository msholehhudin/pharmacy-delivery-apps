import { NextResponse } from "next/server"

const GET = async(request: Request, {params}: {params: {id: string}}) => {
    return NextResponse.json({
        id: params.id
    })
}