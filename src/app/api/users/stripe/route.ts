import { NextRequest, NextResponse } from "next/server";
import {Stripe} from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion: "2023-10-16",
    typescript: true
});
let data3 = {};
export async function POST(req:NextRequest){
    const data  = await req.json()
    const data2 = await stripe.customers.create({
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address
    })
    data3 = data2
    return NextResponse.json({message: "success"})
}
export function GET(req:NextRequest){
    return NextResponse.json(data3)
}
