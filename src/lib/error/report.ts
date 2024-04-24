
import { createClient } from "../supabase/client";

export default async function ReportError(ReportedError: any) {
    if(!ReportedError) return
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  console.log(ReportedError);
  const {error, data} = await supabase.from("errors").insert({ error: String(ReportedError), user: user?.data.user?.id || null});
  if (error) console.error(error);
    return data
}