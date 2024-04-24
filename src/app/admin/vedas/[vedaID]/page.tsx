"use client"
import { GetVeda } from "@/src/app/vedas/[vedaId]/functions/getvedaClient"
import { useState, useEffect } from "react"
export default function Page({ params }: { params: { vedaID: string } }) {
	const [content, setContent] = useState<{
		mainTitle: string
		segments: { segmentTitle: string; segmentContent: string }[]
	}>()
	useEffect(() => {
        const fetchVedas = async () => {
		const veda = await GetVeda(params.vedaID)
		if (veda.data.content) setContent(veda.data.content)
        }
        fetchVedas()
	}, [])
	return (
		<main>
			{content?.segments ? (
				content.segments.map((section, index) => (
					<>
						<h1 key={index}>{section.segmentTitle}</h1>
						<p key={index}>{section.segmentContent}</p>
					</>
				))
			) : (
				<p>Loading...</p>
			)}
		</main>
	)
}
