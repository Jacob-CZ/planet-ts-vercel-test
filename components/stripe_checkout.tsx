"use client";
import {  useEffect, useState } from "react"
import Cookies from 'js-cookie';
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
export default function StripeCheckout(props: {activated: boolean, total?: number}){
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
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
        if(props.activated){
            console.log('activated')
            getIntent()
        }
    }
    , [props.activated])
    async function getIntent(){
        Cookies.set('cart', JSON.stringify({amount: 1400}))
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
    return (
        <>
        {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
        </Elements>)}
        </>
    )
}