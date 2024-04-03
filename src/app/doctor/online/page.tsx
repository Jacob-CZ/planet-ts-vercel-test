"use client"
import { createClient } from "@/src/lib/supabase/client"

export default function Page(){
    const supabase = createClient()
    const channel = supabase.channel('messages')
    async function handleIce(peerconnection: RTCPeerConnection) {
        peerconnection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('onicecandidate', event.candidate)
                supabase
                    .from('messages')
                    .insert([
                        {
                            type: 'ice',
                            payload: event.candidate,
                        },
                    ])
                    .then(() => {
                        console.log('ice sent')
                    })
            }
        }
    }
    async function Connect(){
        const peerconnection = new RTCPeerConnection()
    }

    return (
        <main>
            to be implemented
            ceate 3d prodict component
        </main>
        )}  