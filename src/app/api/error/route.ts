import { createClient } from "@/src/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
export async function POST(req: NextRequest) {
	const supabase = createClient()
	const body = await req.json()
	const userObj = await supabase.auth.getUser()
	const { error, data } = await supabase
		.from("errors")
		.insert([{ error: body.error, user: userObj.data.user?.id }])
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
	return NextResponse.json({ message: "sucess", data }, { status: 200 })
}
