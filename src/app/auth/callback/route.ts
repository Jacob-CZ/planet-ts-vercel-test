import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/src/lib/supabase/server"
import ReportError from "@/src/lib/error/report"

export async function GET(req: NextRequest) {
	const supabase = createClient()
	if (req.nextUrl.searchParams.get("code")) {
		const { error } = await supabase.auth.exchangeCodeForSession(
			req.nextUrl.searchParams.get("code") as string
		)
		if (error) {
			ReportError(error)
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
	const { error } = await supabase.auth.updateUser({
		data: {
			last_login: new Date().toISOString(),
			dick: "big",
		},
	})
	if (error) {
		ReportError(error)
		return NextResponse.json({ error: error }, { status: 500 })
	}
	return NextResponse.redirect(new URL("/auth/login", req.nextUrl))
}
