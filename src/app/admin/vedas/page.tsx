"use client"
import { Input } from "@/components/ui/input";
import { createClient } from "@/src/lib/supabase/client";
import EditableParagraph from "@/components/ui/editableP";
import { useState, useEffect } from "react";
import Link from "next/link";
interface EditableParagraphProps {
    children: React.ReactNode;}
export default function VedasAdmin() {
    const [vedas, setVedas] = useState<Array<{ title: string; id: string; }>>()
    const [file, setFile] = useState<File | null>()
    const [jsonObject, setJsonObject] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        async function GetVedas (){
            const { data , error } = await supabase.from('Vedas').select('title, id')
            if (error){
            console.error(error)
            }
            if (data){
            console.log(data)
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
                        console.error(error)
                    }
                    if (data){
                        console.log(data)
                    }
                } catch (error) {
                    console.error('Invalid JSON:', error);
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
        {file?.name}
        {jsonObject && <pre>{JSON.stringify(jsonObject, null, 2)}</pre>}
        </main>
    );
}