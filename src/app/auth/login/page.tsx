"use client"
import { createClient } from "@/src/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { User, UserResponse } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Linktree from "@/components/Linktree"
export default function LoginPage() {
    const [resetpassword, setResetpassword] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()
    const path = usePathname()
    const patharray = path.split('/')
    console.log(patharray)
    console.log(path)
    async function login(Data : FormData){
        const {data, error} = await supabase.auth.signInWithPassword({
            email: Data.get('email') as string,
            password: Data.get('password') as string
        })
        if (error){
            console.error(error)
            setError(error.message)
        }
        if (data.user){
            console.log(data)
            setUser(data.user)
            setError(null)
        }
    }
    async function signup(Data : FormData){
        console.log(Data.get('email'))

        const {data, error} = await supabase.auth.signUp({
            email: Data.get('email') as string,
            password: Data.get('password') as string
        })
        if (error){
            console.error(error)
            setError(error.message)
        }
        if (data.user){
            console.log(data)
            setUser(data.user)
            setError(null)
        }
    }
    async function resetPassword(data : FormData){
        const {error} = await supabase.auth.resetPasswordForEmail(data.get('email') as string)
        if (error){
            console.error(error)
            setError(error.message)
        }
    }
    async function getUser(){
        const usr = await supabase.auth.getUser()
        console.log(usr)
        setUser(usr.data.user)
        return usr
    }
    async function logout(){
        const {error} = await supabase.auth.signOut()
        if (error){
            console.error(error)
            setError(error.message)
        }
        if (!error) setError(null)
        setUser(null)
    }
    async function LoginWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider:"google",
            options:{
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
    }
    
    async function LoginWithFacebook() {
        await supabase.auth.signInWithOAuth({
            provider:"facebook",
            options:{
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
    }
    useEffect(() => {
        getUser()
    },[])


  return (
    <>
    <Linktree/>
    {user?.email && <div>Logged in as {user?.email}
    <Button variant="destructive" onClick={logout}>Log out</Button>
    </div>}
    {!user?.email &&
    <div>
    <form>
      <label htmlFor="email">Email:</label>
      <Input className=" text-stone-900 max-w-96" id="email" name="email" type="email" required placeholder="email" />
      <label htmlFor="password">Password:</label>
      <Input className=" text-stone-900 max-w-96" id="password" name="password" type="password" required placeholder="password"  />
      <Button formAction={login}>Log in</Button>
      <Button  formAction={signup}>Sign up</Button>
      <p>{error}</p>
    </form>
    <Button onClick={() => setResetpassword(!resetpassword)}>Reset Password</Button>
    <Button onClick={LoginWithGoogle}>Log in with Google</Button>
    <Button variant="destructive" onClick={LoginWithFacebook}>Log in with Facebook</Button>
    {resetpassword && <form>
            <label htmlFor="email">Email:</label>
            <input className=" text-stone-900" id="email" name="email" type="email" required />
            <button formAction={resetPassword}>Reset password</button>
    </form>}
    </div>}
    </>
        )
    }
