import { createClient } from "@/src/lib/supabase/server"
import { redirect } from "next/navigation"
export default async function Page(){
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const { data, error } = await supabase.from('Doctors').select('*').eq('user_ref', user.data.user?.id )
    if(!data) redirect('/error')
    console.log(error)
    console.log(data)
        return (
        <main>
            to be implemented
            ceate 3d prodict component
        </main>
        )}