"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "../lib/supabase/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Link from "next/link";
import StripeCheckout from "@/components/stripe_checkout";
import { use, useEffect, useState } from "react";
import { Product } from "@/components/types";
import Cookies from 'js-cookie';
import { Input } from "@/components/ui/input";
import Login from "@/components/login";
import Script from "next/script";
import ReportError from "../lib/error/report";
export default function Home() {
  const [activated, setActivated] = useState<boolean>(false)
  const [adresses, setAdresses] = useState<any[]>([])
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
  const tryAdress = async (adress:string) => {
    var requestOptions = {
      method: 'GET',
    };
    
    fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${adress}&apiKey=ad212d62c2094206a8b5d8da0e586442`, requestOptions)
      .then(response => response.json())
      .then(result => {setAdresses(result.features); console.log(result)})
      .catch(error => reportError(error));
  }
  useEffect(() => {
  }, [])
  function Search(){
    const [results, setResults] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const VectorSearch = () => {
      if(search.length < 3) return
      fetch("/api/documents/query", {
        method: "POST",
        body: JSON.stringify({text: search})
      }).then((response) => response.json())
      .then((data) => {
        setResults(data)
        console.log(data)
      }
      )}
      useEffect(() => {
        VectorSearch()
      }, [search])
    return (
      <Input placeholder="search" onChange={(e) => setSearch(e.target.value)}/>
    ) 
  }
  return (
    <main className="grid gap-4 p-5">
        <Link href="/auth/login" className="w-fit"><Button>Login</Button></Link>
        <Link href="/admin/vedas" className="w-fit"><Button>edit vedas</Button></Link>
        <Link href="/vedas" className="w-fit"><Button>Vedas</Button></Link>
        <Link href="/store" className="w-fit"><Button>Store</Button></Link>
        <Link href="/error" className="w-fit"><Button>Error</Button></Link>
        <Link href="/admin/products" className="w-fit"><Button>products</Button></Link>
        <Input placeholder="search"
        onChange={(e) => tryAdress(e.target.value)}
        />
        {adresses && adresses.map((adress, index) => {
          return <p key={index}>{adress.properties.formatted}</p>
        })}
        <div className=" w-1/2"> 
        <Input type="number" onChange={(e) => setcookie(Number(e.target.value))} placeholder="amount"/>
        <StripeCheckout products={[product]}/>
        <Button onClick={() => setActivated(true)}>{activated  ? "activated"  : "not activated"}</Button>
        <Login classname=""/>
        <Search/>
        </div>
        <div className="h-[800vh]">

        </div>
    </main>
  );
}
