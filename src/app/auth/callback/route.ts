import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/src/lib/supabase/server";

export async function GET(req: NextRequest) {
    const supabase = createClient();
    if(req.nextUrl.searchParams.get("code")){
    const { error} = await supabase.auth.exchangeCodeForSession(req.nextUrl.searchParams.get("code") as string);
    }
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
}