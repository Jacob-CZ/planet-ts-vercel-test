import { createClient } from "../lib/supabase/client";
const supabase = createClient()
export async function testApi(){
    const {data , error} = await supabase.from("products").select()
    console.log(data)
    console.log(error)
} 