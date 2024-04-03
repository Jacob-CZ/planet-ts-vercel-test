import { createClient } from "@/src/lib/supabase/client"
import { Button } from "@/components/ui/button"
export default function Page({ params }: { params: { vedaId: string } }) {
    return (
        <main>
            to be implemented
            needs to be derived from user veda page <br />
            {params.vedaId}
        </main>
        )}
