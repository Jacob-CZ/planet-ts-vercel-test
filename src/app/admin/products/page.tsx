"use client"
import { Button } from "@/components/ui/button"
import { addProduct, deleteProduct, getProducts } from "./utility"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Page() {
	const [products, setProducts] = useState<any[]>([])
	useEffect(() => {
		getProd()
	}, [])
	const getProd = async () => {
		const products = await getProducts()
		setProducts(products)
	}
	return (
		<div>
			<Button
				className=" rounded-full m-4"
				onClick={() => {
					addProduct()
					setTimeout(() => {
						getProd()
					}, 100)
				}}
			>
				+
			</Button>
			<div className=" grid gap-4 p-4">
				{products.map((product) => (
					<div
						className="flex flex-row items-center justify-center w-fit gap-4"
						key={product.id}
					>
						<Link href={"products/" + product.id}><Button className=" w-fit">{product.name} </Button></Link>
						<Button
							className="bg-red-500"
							onClick={async () => {
								deleteProduct(product.id)
								getProd()
							}}
						>
							-
						</Button>
					</div>
				))}
			</div>
		</div>
	)
}
