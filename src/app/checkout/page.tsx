"use client";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51FeMfIG3Ks4CHLRJvYOjBLY05dmeTT9oZLxqTspUtTlGyNv3EQDbyBPPRMY9vf72LOE4ZEWZMP5I5uoULSG49IPe00tasHNr6j');

export default function Page() {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
      }
    
      return (
        <Elements stripe={stripePromise} options={options}>
        </Elements>

)}


