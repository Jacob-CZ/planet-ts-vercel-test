"use client";
import { useEffect, useState } from "react";
// import convert from "./convert";
import { blob } from "stream/consumers";

export default function Page() {
    const [pptx, setPptx] = useState<Blob>();
    const [blobUrl, setBlobUrl] = useState<string>();

    useEffect(() => {
        if(pptx) {
            const url = URL.createObjectURL(pptx);
            // convert(url).then((json) => {
            //     console.log(json);
            // });
        }
    }, [pptx]);

    return (
        <div>
            <h1>Power Point</h1>
            <p>{pptx?.size}</p>
            <input type="file" accept=".pptx, application/vnd.openxmlformats-officedocument.presentationml.presentation" onChange={(e) => { if(e.target.files) setPptx(e.target.files[0]) }} />
            {blobUrl && <p>URL: {blobUrl}</p>}
        </div>
    )
}