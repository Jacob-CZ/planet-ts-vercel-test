import { createBrowserClient, CookieMethods } from '@supabase/ssr'

export function createClient() {
  const cookies: CookieMethods = {
    get: (name) => document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1],
    set: (name, value) => { document.cookie = `${name}=${value}`; },
    remove: (name) => { document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; }
  };

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth:{
        persistSession: true,
      },
      cookies: cookies
    }
  )
}