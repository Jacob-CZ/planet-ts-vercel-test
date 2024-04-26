import JSZip from "jszip";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    return NextResponse.json({success: false}, {status: 404});
} 
