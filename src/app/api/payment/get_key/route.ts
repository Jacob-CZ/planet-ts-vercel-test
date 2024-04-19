import { NextRequest,NextResponse } from "next/server"

export function GET(req: NextRequest, res: NextResponse) {
  return new NextResponse(process.env.STRIPE_PUBLISHABLE_KEY, {status: 200})
}