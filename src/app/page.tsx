import { Button } from "@/components/ui/button";
import { createClient } from "../lib/supabase/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Link from "next/link";
export default async function Home() {
  
  return (
    <main className="grid gap-4 p-5">
        <Link href="/auth/login"><Button>Login</Button></Link>
        <Link href="/admin/vedas"><Button>edit vedas</Button></Link>
        <Link href="/vedas"><Button>Vedas</Button></Link>
        <Link href="/store"><Button>Store</Button></Link>
        <Link href="/error"><Button>Error</Button></Link> 
    </main>
  );
}
