import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/src/lib/supabase/admin";

export async function GET(req : NextRequest){
    const supabase = createClient()
    const users = await supabase.auth.admin.listUsers({perPage:5000})
    const key = req.nextUrl.searchParams.get("key")
    if(key !== process.env.ADMIN_KEY) return NextResponse.json({error: "wrong api key"}, {status: 403});

    return NextResponse.json(users)
}