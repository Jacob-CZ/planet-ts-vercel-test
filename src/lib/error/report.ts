
export default async function ReportError(ReportedError: any) {
    if(!ReportedError || ReportedError === "" || ReportedError === null) return
  if(process.env.ENV === 'development') console.error(ReportedError)
  const {message, error} = await fetch('/api/error', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({error: ReportedError})
  }).then(res => res.json()).catch(error => console.error(error));
  if (error) console.error(error);
    return message
}