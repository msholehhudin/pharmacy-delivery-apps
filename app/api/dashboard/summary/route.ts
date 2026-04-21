import { dashboardService } from "@/lib/services/dashboard/transactionSummaryService"
import { createServer } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req: NextRequest) => {
  const {searchParams} = new URL(req.url)
  const month = searchParams.get('month')

  if(!month){
    return NextResponse.json(
        {message: 'month is required'},
        {status: 400}
    )
  }

  const supabase = await createServer()
  const {data: {user}} = await supabase.auth.getUser()

  if(!user) return NextResponse.json(
    {error: 'Unauthorized!'},
    {status: 401}
  )

  try {
    const summary = await dashboardService.transactionSummaryService(month)
    return NextResponse.json(summary)
  } catch (error: any) {
    return NextResponse.json(
        {error: error.message},
        {status: 500}
    )
  }


}
