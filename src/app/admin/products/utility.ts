import ReportError from "@/src/lib/error/report"
import { createClient } from "@/src/lib/supabase/client"
const supabase = createClient()

export async function addProduct() {
		const { data, error } = await supabase
			.from("products")
			.insert({
				name: "Default",
				description: "Description",
				price: 0,
				stock: 0,
			})
		ReportError(error)
		return data
}
export async function deleteProduct(id: string) {
		const { data, error } = await supabase
			.from("products")
			.delete()
			.match({ id })
		ReportError(error)
		return data
}
export async function getProducts() {
		const { data, error } = await supabase
			.from("products")
			.select()
		ReportError(error)
		if (!data) return []
		return data
}
