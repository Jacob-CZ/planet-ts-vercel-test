"use client";
import {  useEffect, useState } from "react"
import Cookies from 'js-cookie';
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Product } from "./types";
export default function StripeCheckout(props: {total?: number, products: Product[]}){
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
    const [activated, setActivated] = useState<boolean>(false)
    useEffect(() => {
        async function getPromise(){
            await fetch('/api/payment/get_key', {
                method: 'GET'
            }).then(res => res.text())
            .then(data => {
                console.log(data)
                const stripePromise = loadStripe(data)
                setStripePromise(stripePromise)
            })
        }
        getPromise()
    }, [])
    useEffect(() => {
        if(activated){
            console.log('activated')
            getIntent()
        }
    }
    , [activated])
    async function getIntent(){
        Cookies.set('cart', JSON.stringify({amount: 20}))
        const cart = Cookies.get('cart')
        let cartJson : any;
        if(!cart && !props.total){
            return <h1>Cart is empty</h1>
        }
        if (cart){
            cartJson = JSON.parse(cart)
        }
        fetch('/api/payment/create_intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: props.total ? props.total : cartJson.amount,
                curency: 'CZK'
            })
        })
        .then(res => res.text())
        .then(data => {
            setClientSecret(data as string)
            console.log(data) 
            console.log(stripePromise)
        })
        .catch(err => {
            console.log(err)
        })
    }
    function initiateCheckout(){
        setActivated(true)
    }

    return (
        <>
        <button className=" bg-red-700 p-8 rounded-3xl" onClick={initiateCheckout}>Pay</button>
        {clientSecret && stripePromise && props.products && activated &&(
            <div className=" w-screen h-screen pointer-events-[all] bg-[#00000000] top-0 left-0 fixed flex justify-center items-center "> 
                <div className="w-3/4 h-3/4 bg-slate-600 rounded-3xl p-6">  
                    <button className=" w-fit p-4 bg-green-50 rounded-3xl mb-6 active:bg-red-700" onClick={() => setActivated(false)}>close</button>
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
            )}
        </>
    )
}