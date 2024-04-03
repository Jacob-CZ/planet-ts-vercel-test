"use client"
import { createClient } from "@/src/lib/supabase/client"
export default function ResetPassword() {
    const Supabase = createClient()
    async function resetPassword(Data: FormData){
        const { data , error} = await Supabase.auth.updateUser({
            password: Data.get('password') as string,
        })
        if (error){
            console.error(error)
        }
        if (data){
            console.log(data)
        }
    }
    return (
        <form>
            <label htmlFor="password">Password</label>
            <input className=" text-stone-900" id="password" name="password" type="password" required />
            <button formAction={resetPassword}>Reset password</button>
        </form>
    )
}