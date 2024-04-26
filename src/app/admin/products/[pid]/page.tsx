"use client"
import { useEffect, useState } from "react"
import { getProduct } from "./utility"

export default function Page({ params }: { params: { pid: string } }) {
    const [product, setProduct] = useState<any>({})
    const getProd = async () => {
        const data = await getProduct(params.pid)
        setProduct(data)
        console.log(data)
    }
    useEffect(() => {
        getProd()
    }, [])
	return (
		<main className="grid">
            <h1 className="mx-auto text-3xl p-4">{product.name}</h1>
            <img src={window.origin + "/product_images/" + product.image_url} alt="" />
		</main>
	)
}
