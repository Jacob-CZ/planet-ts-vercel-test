"use client";
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import Peer, { DataConnection } from 'peerjs';
import { createClient } from "@/src/lib/supabase/client"
import { AiOutlineAudioMuted } from "react-icons/ai";
import { HiMiniVideoCameraSlash } from 'react-icons/hi2';
import { ImPhoneHangUp } from 'react-icons/im';
export default function Page({params}: {params: {sessionId : string}}) {
  const [message, setMessage] = useState<string>(''); 
  const [messages, setMessages] = useState<Array<{message: string, sender: string}>>([]);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer>();
  const client = createClient();
  const aRef = useRef<HTMLAnchorElement>(null);
  const dataRef = useRef<DataConnection>();
  const inputRef = useRef<HTMLInputElement>(null)
  const ProductSearch = dynamic(() => import('@/components/product_search'),{
    loading: () => <p>Loading...</p>
  })
  const channelA = client
  .channel('table-filter-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'doctor_sessions',
      filter: `id=eq.${params.sessionId}`,
    },
    (payload) =>{
      if ((payload.new as any).active === true) {
        initiate_call()
      }
    }
  )
  .subscribe()
  
  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      console.log("my id is: " + id)
    });
    
    peerInstance.current = peer;

    test_doctor_presence()
  }, [])
  const test_doctor_presence = async () => {
    const {data, error} = await client.from('doctor_sessions').select('*').eq('id', params.sessionId)
    if (error) {
      console.log(error)
    }
    if(data![0].active) {
      initiate_call()
    } 
  }
  const initiate_call = () => {
    call()
    start_data_chanel()
  } 
  const start_data_chanel = () => {
    console.log("starting data channel")
    const data = peerInstance.current?.connect(params.sessionId)
    data?.on("open", () => {
      console.log("opened")
    })
    data?.on("data", (data : any) => {
      data = data.toString()
      const message = {
        message: data,
        sender: 'doctor'
      }
      console.log(messages)
      setMessages(messages => [message, ...messages])
    })
    data?.on("error", (err) => {
      console.log(err.message)
    })
    dataRef.current = data;
  }

  const call = () => {
    navigator.mediaDevices.getUserMedia({video:true, audio: true })
    .then(mediaStream => {
      if (currentUserVideoRef.current) {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
      }

      const call = peerInstance.current?.call(params.sessionId, mediaStream)
      call?.on('stream', remoteStream => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        }
      });
    })
    .catch(error => {
      console.log('getUserMedia error: ', error);
    });
  }
  const send_data = () => {
    dataRef.current?.send(message)
  }
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      send_data()
      setMessages([{message : message, sender: 'user'} ,...messages])
      if (inputRef.current) {
    inputRef.current.value = "";
    }
        }
  }

  return (
    <main className="w-screen bg-slate-500 h-screen top-0 left-0 fixed flex justify-center">
      <video className=' h-fit w-full' ref={remoteVideoRef} />
      <button className=' left-0 bottom-0 bg-slate-600 fixed m-5 p-4 rounded-full' onClick={initiate_call}>Call</button>
        <video ref={currentUserVideoRef} className='fixed top-4 right-5 h-1/5 w-fit bg-black rounded-3xl'/>
      <div className='fixed bottom-2.5 w-54 h-16 bg-orange-400 rounded-full flex flex-row items-center justify-between'>
        <button className='h-14 w-14 mx-1 bg-green-600 rounded-full flex items-center justify-center'><AiOutlineAudioMuted/></button>
        <button className='h-14 w-14 mx-1 bg-zinc-500 rounded-full flex items-center justify-center'><HiMiniVideoCameraSlash /></button>
        <button onClick={() => peerInstance.current?.destroy()} className='h-14 w-14 mx-1 bg-red-600 rounded-full flex items-center justify-center'><ImPhoneHangUp /></button>
      </div>
      <a href="" ref={aRef}></a>
      <div className=' h-[80vh] w-[20vw] overflow-auto fixed left-10 top-[10vh] rounded-3xl flex flex-col-reverse '>
      <input ref={inputRef} type="text" className=' p-2 bg-transparent backdrop-blur-2xl border-blue-500 border-2 w-5/6 mx-auto mb-4 rounded-3xl h-[5vh]' onKeyDown={handleKeyDown} onChange={(e) => setMessage(e.target.value)}/>      
      {messages.map((message, index) => {
         return <p key={index} className={`p-3 rounded-full m-2 w-fit ${message.sender === "doctor" ? "bg-slate-400 mr-auto" : "bg-blue-500 ml-auto"}`}>{message.message}</p>
        })}
      </div>
      <div className='w-[20vw] h-[60vh] fixed  right-0 bottom-0 rounded-3xl p-6 m-5 backdrop-blur-md bg-[#779FA180]'>   
      <ProductSearch/>
      </div>

    </main>
  );
  }