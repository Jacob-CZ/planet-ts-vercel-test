import { NextRequest, NextResponse } from "next/server";
import {Stripe} from "stripe";
import { createClient } from "@supabase/supabase-js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion: "2023-10-16",
    typescript: true
});
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
)
let data3 = {};
let data4 = {};
export async function POST(req:NextRequest){
    const data  = await req.json()
    const data2 = await stripe.customers.create({
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address
    })
    const { error}  = await supabase.auth.admin.updateUserById(data.id, {user_metadata: {stripe_id: data2.id}})

    data3 = data2
    if(error) data4 = {error: error.message}
    return NextResponse.json({message: "success"})
}
export function GET(req:NextRequest){
    return NextResponse.json({data3,data4})
}
