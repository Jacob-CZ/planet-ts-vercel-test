import ReportError from "@/src/lib/error/report";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import OpenAi from 'openai'
const openai = new OpenAi({apiKey: process.env.OPENAI_API_KEY})
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!)
export async function POST(req: NextRequest) {
    const query = await req.json()
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-large',
        input: query.text
    })
    const { data,error } = await supabase.rpc('match_documents', {
        query_embedding: response.data[0].embedding,
        match_threshold: 0, // Choose an appropriate threshold for your data
        match_count: 10, // Choose the number of matches
      })
    ReportError(error)
    return NextResponse.json({text: data}, { status: 200})
}