import ReportError from "@/src/lib/error/report";
import { createClient } from "@/src/lib/supabase/client";

const supabase = createClient()
export async function getProduct(id: string) {
    const { data, error } = await supabase
        .from("products")
        .select()
        .match({ id })
    ReportError(error)
    if (!data) return []
    return data[0]
}