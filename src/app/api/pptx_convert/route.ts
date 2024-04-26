import JSZip from "jszip";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body = await req.formData();
    const file  = body.get("file");
    if(!file){
        return NextResponse.json({error: "No file provided"}, {status: 400});
    }
    try{
        const json  = await pptxToJSON(file as Blob);
        console.log(json);
    }
    catch(error){
        console.error(error);
        return NextResponse.json({error: "Failed to convert PPTX to JSON"}, {status: 500});
    }

    return NextResponse.json({success: true}, {status: 200});
} 
