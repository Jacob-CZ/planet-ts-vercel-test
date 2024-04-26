import ReportError from "@/src/lib/error/report";
import { createClient } from "@/src/lib/supabase/client";

const supabase = createClient()
export async function getProduct(id: string) {
    const { data, error } = await supabase
        .from("products")
        .select()
        .match({ id })
    ReportError(error)
    console.log(error)
    if (!data) return []
    return data[0]
}
export async function updateProduct(product: any) {
    const { error } = await supabase
        .from("products")
        .update(product)
        .match({ id : product.id })
    ReportError(error)
}
export async function uploadProductImage(id: string, file: FormData) {
    const {error, data} = await supabase.storage.from("product_images").update(id, file)
    if (error) {
        const { data, error } = await supabase.storage.from("product_images").upload(id, file)
        ReportError(error)
    }
    ReportError(error)

}
