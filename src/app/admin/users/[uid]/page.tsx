"use client"
export default function Page(props:{uid:string}) {
    return (
        <div className='w-full h-fit flex items-start flex-col'>
            <h1>{props.uid}</h1>
        </div>
    )
}   