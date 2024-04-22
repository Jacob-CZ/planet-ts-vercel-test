import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion: "2023-10-16",
    typescript: true
});
export async function POST(req: NextRequest) {
  const { amount } = await req.json();
  console.log(amount)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "CZK",
      description: "test payment intent",
      automatic_payment_methods: {
        enabled: true,
        },
      customer: "cus_PyGs73j868r6oD",
      receipt_email: "hladikjakubis@gmail.com"
    });

    return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}