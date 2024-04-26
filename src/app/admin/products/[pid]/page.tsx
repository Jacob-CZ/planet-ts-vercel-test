"use client"
import { useEffect, useState } from "react"
import { getProduct, updateProduct, uploadProductImage } from "./utility"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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
		<main className="flex items-center flex-col">
			<Input
				className="bg-transparent w-fit text-black text-center mx-auto"
				value={product.name || ""}
				onChange={(e) =>
					setProduct({ ...product, name: e.target.value })
				}
			/>
			<Image
				src={`https://mlcrqjsxmozyimsniehq.supabase.co/storage/v1/object/public/product_images/${product.id}`}
				alt=""
				width={200}
				height={200}
			/>
			<Input
				type="file"
                className="bg-transparent w-fit text-black text-center mx-auto"
				onChange={(e) => {
					if (!e.target.files) return
                    const file = e.target.files[0];
                    const formData = new FormData();
                    formData.append('file', file);
                    uploadProductImage(product.id, formData);
				}}
			/>
			<Input
				className="bg-transparent w-fit text-black text-center mx-auto placeholder:text-slate-500"
				placeholder="description"
				value={product.description || ""}
				onChange={(e) =>
					setProduct({ ...product, description: e.target.value })
				}
			/>
			<Button onClick={() => updateProduct(product)}>Save</Button>
		</main>
	)
}
