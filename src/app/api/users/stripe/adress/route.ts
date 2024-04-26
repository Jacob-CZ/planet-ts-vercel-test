import { createClient } from "@/src/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
export async function POST(req : NextRequest){
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
        apiVersion: "2023-10-16",
        typescript: true
    });
    const supabase = createClient()
    const data = await req.json()
    const user = await supabase.auth.getUser()
    if(!user) {
        return NextResponse.json({error: "user not found"}, {status: 404})
        }
    const stripeId = user.data.user!.user_metadata.stripe_id
    stripe.customers.update(stripeId, {
        address: data
    })    
    return NextResponse.json({message: "success"}, {status: 200})
}