import { NextRequest, NextResponse } from "next/server"

export function GET(req: NextRequest) {
	return new NextResponse(process.env.STRIPE_PUBLISHABLE_KEY, { status: 200 })
}
