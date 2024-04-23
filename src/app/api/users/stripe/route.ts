import { NextRequest, NextResponse } from "next/server";
import {Stripe} from "stripe";
import { createClient } from "@/src/lib/supabase/admin";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion: "2023-10-16",
    typescript: true
});
const supabase = createClient()
let data3 = {};
export async function POST(req:NextRequest){
    const data  = await req.json()
    const data2 = await stripe.customers.create({
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address
    })
    supabase.auth.admin.updateUserById(data.id, {user_metadata: {stripe_id: data2.id}})
    data3 = data2
    return NextResponse.json({message: "success"})
}
export function GET(req:NextRequest){
    return NextResponse.json(data3)
}
