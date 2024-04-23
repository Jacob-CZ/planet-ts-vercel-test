"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "../lib/supabase/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Link from "next/link";
import StripeCheckout from "@/components/stripe_checkout";
import { useState } from "react";
import { Product } from "@/components/types";
import Cookies from 'js-cookie';
import { Input } from "@/components/ui/input";
import Login from "@/components/login";
export default function Home() {
  const [activated, setActivated] = useState<boolean>(false)
  const product:Product = {
    id: 1,
    name: "Veda",
    price: 1400,
    description: "Veda",
    image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
  }
  const setcookie = (amount:number) => {
    Cookies.set('cart', JSON.stringify({amount: amount}))
  }

  return (
    <main className="grid gap-4 p-5">
        <Link href="/auth/login" className="w-fit"><Button>Login</Button></Link>
        <Link href="/admin/vedas" className="w-fit"><Button>edit vedas</Button></Link>
        <Link href="/vedas" className="w-fit"><Button>Vedas</Button></Link>
        <Link href="/store" className="w-fit"><Button>Store</Button></Link>
        <Link href="/error" className="w-fit"><Button>Error</Button></Link>
        <div className=" w-1/2"> 
        <Input type="number" onChange={(e) => setcookie(Number(e.target.value))} placeholder="amount"/>
        <StripeCheckout products={[product]}/>
        <Button onClick={() => setActivated(true)}>{activated  ? "activated"  : "not activated"}</Button>
        <Login classname=""/>
        </div>
    </main>
  );
}
