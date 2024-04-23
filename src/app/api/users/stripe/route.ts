import { NextRequest, NextResponse } from "next/server";
let user = {}
export async function POST(req:NextRequest){
    const data  = await req.json()
    user = data
    return NextResponse.json({message: "success"})
}
export function GET(req:NextRequest){
    return NextResponse.json(user)
}
