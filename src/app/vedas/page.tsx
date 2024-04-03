import { createClient } from "@/src/lib/supabase/server";

export default async function VedasPage() {
    const supabase = createClient();
    async function GetVedas (){
        const { data , error } = await supabase.from('Vedas').select('Name')
        if (error){
        console.error(error)
        }
        if (data){
        console.log(data)
        }
        return data
    }
    
    return (
        <main className="">
        {}
        </main>
    );
    }
