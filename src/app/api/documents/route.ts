import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import OpenAi from 'openai'
const openai = new OpenAi({apiKey: process.env.OPENAI_API_KEY})
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!)
export async function POST(req: NextRequest) {
    const data = await req.json()
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-large',
        input: "test"
    })
    const responese2 = await supabase.from('documents').insert({title: data.text, body: "sracka", embedding: response.data[0].embedding}).then(console.log)
    console.log(response)
    console.log(responese2)
    return NextResponse.json(response, { status: 200})
}