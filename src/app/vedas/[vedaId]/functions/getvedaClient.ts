import { createClient } from "@/src/lib/supabase/client";
export function GetVeda(vedaid: string) {
    console.log(vedaid);
    const client = createClient();
    const veda = client.from("Vedas").select("*").eq("id", vedaid).single();
    console.log(veda); 
    return veda
}