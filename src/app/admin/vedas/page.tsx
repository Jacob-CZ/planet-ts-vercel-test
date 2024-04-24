"use client"
import { Input } from "@/components/ui/input";
import { createClient } from "@/src/lib/supabase/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ReportError from "@/src/lib/error/report";
export default function VedasAdmin() {
    const [vedas, setVedas] = useState<Array<{ title: string; id: string; }>>()
    const supabase = createClient();

    useEffect(() => {
        async function GetVedas (){
            const { data , error } = await supabase.from('Vedas').select('title, id')
            if (error){
                ReportError(error) 
            }
            if (data){
            setVedas(data as Array<{ title: string; id: string; }>)
            }
            return
        }
        GetVedas()
    }, [])

    async function AddVedas (files: FileList){
        const filearray = Array.from(files);
        filearray.forEach(file => {
            const reader = new FileReader();
            reader.onload = async function(event) {
                try {
                    const json = JSON.parse(event.target?.result as string);
                    console.log(json)
                    const {data , error} = await supabase.from('Vedas').insert({content: json, title: json.mainTitle})
                    if (error){
                        ReportError(error)
                    }
                    if (data){
                        console.log(data)
                    }
                } catch (error) {
                    ReportError(error)
                }
            };
            reader.readAsText(file);
        });
    }


    return (
        <main className="">
        {vedas?.map((veda, index) => (
            <Link key={index} href={`/admin/vedas/${veda.id}`}>
            <div key={index} className="bg-stone-100 rounded-lg p-4 m-4">
                <h1>{veda.title}</h1>
            </div>
            </Link>
        ))}
        <Input type="file" className=" max-w-60" accept=".json" onChange={(e) => e.target.files ? AddVedas(e.target.files) : console.log("select file")} multiple></Input>
        </main>
    );
}