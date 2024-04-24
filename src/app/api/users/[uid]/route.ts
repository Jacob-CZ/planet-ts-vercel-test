import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/src/lib/supabase/admin"
import ReportError from "@/src/lib/error/report"

export async function GET(req: NextRequest) {
	const supabase = createClient()
	const id = req.nextUrl.pathname.split("/").pop()
	console.log(id)
	if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 })
	const users = await supabase.auth.admin.getUserById(id)
	console.log(users)
	const key = req.nextUrl.searchParams.get("key")
	if (key !== process.env.ADMIN_KEY)
		return NextResponse.json({ error: "wrong api key" }, { status: 403 })

	return NextResponse.json(users)
}
export async function PUT(req: NextRequest) {
	const supabase = createClient()
	const id = req.nextUrl.pathname.split("/").pop()
	if (!id) {
		return NextResponse.json({ error: "missing id" }, { status: 400 })
		ReportError("missing id")
	}
	const key = req.nextUrl.searchParams.get("key")
	if (key !== process.env.ADMIN_KEY) {
		ReportError("wrong api key")
		return NextResponse.json({ error: "wrong api key" }, { status: 403 })
	}
	const updatedUserData = await req.json()

	const { data, error } = await supabase.auth.admin.updateUserById(
		id,
		updatedUserData
	)

	if (error) {
		ReportError(error)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json(data)
}
