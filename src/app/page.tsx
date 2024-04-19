"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "../lib/supabase/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Link from "next/link";
import StripeCheckout from "@/components/stripe_checkout";
import { useState } from "react";
export default function Home() {
  const [activated, setActivated] = useState<boolean>(false)
  return (
    <main className="grid gap-4 p-5">
        <Link href="/auth/login" className="w-fit"><Button>Login</Button></Link>
        <Link href="/admin/vedas" className="w-fit"><Button>edit vedas</Button></Link>
        <Link href="/vedas" className="w-fit"><Button>Vedas</Button></Link>
        <Link href="/store" className="w-fit"><Button>Store</Button></Link>
        <Link href="/error" className="w-fit"><Button>Error</Button></Link>
        <div className=" w-1/2"> 
        <StripeCheckout activated={activated}/>
        <Button onClick={() => setActivated(true)}>{activated  ? "activated"  : "not activated"}</Button>
        </div>
    </main>
  );
}
