"use client";
import { useEffect, useRef, useState, RefObject, Key } from 'react';
import Peer, { DataConnection } from 'peerjs';
import { createClient } from "@/src/lib/supabase/client"
import { AiOutlineAudioMuted } from "react-icons/ai";
import { HiMiniVideoCameraSlash } from 'react-icons/hi2';
import { ImPhoneHangUp } from 'react-icons/im';
import { Button } from '@/components/ui/button';
export default function Page({params}: {params: {sessionId : string}}) {
  const [message, setMessage] = useState<string>(''); 
  const [peerId, setPeerId] = useState('');
  const [messages, setMessages] = useState<Array<{message: string, sender: string}>>([]);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const [recordedChunks, setRecordedChunks] = useState<any[]>([]);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer>();
  const Recorder = useRef<MediaRecorder>();
  const client = createClient();
  const aRef = useRef<HTMLAnchorElement>(null);
  const dataRef = useRef<DataConnection>();
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    const peer = new Peer(params.sessionId);

    peer.on('open', (id) => {
      setPeerId(id)
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({video:true, audio: true })
      .then(mediaStream => {
        if (currentUserVideoRef.current) {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
      }
        call.answer(mediaStream)
        call.on('stream', function(remoteStream) {
          if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      }
        });
      })
      .catch(error => {
        console.log('getUserMedia error: ', error);
      });
    })

    peer.on("connection", (connection) => {
      connection.on('data', (data: any) => {
        data = data.toString()
        const mess = {message: data, sender: 'doctor'}
        setMessages(messages => [mess, ...messages])
      })
      dataRef.current = connection
    })

    peerInstance.current = peer;
    client.from('doctor_sessions').update({active: true}).eq('id', params.sessionId).then((res) => {
      console.log(res)
    })
  }, [])

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
      <video ref={currentUserVideoRef} className='fixed top-4 right-5 h-1/5 w-fit bg-black rounded-3xl'/>
      <div className='fixed bottom-2.5 w-54 h-16 bg-orange-400 rounded-full flex flex-row items-center justify-between'>
        <button className='h-14 w-14 mx-1 bg-green-600 rounded-full flex items-center justify-center'><AiOutlineAudioMuted/></button>
        <button className='h-14 w-14 mx-1 bg-zinc-500 rounded-full flex items-center justify-center'><HiMiniVideoCameraSlash /></button>
        <button onClick={() => peerInstance.current?.destroy()} className='h-14 w-14 mx-1 bg-red-600 rounded-full flex items-center justify-center'><ImPhoneHangUp /></button>
      </div>
      <div className=' h-[80vh] w-[20vw] bg-slate-600 fixed left-10 top-[10vh] rounded-3xl flex flex-col-reverse '>
      <input ref={inputRef} type="text" className=' w-5/6 mx-auto mb-4 rounded-3xl h-[5%]' onKeyDown={handleKeyDown} onChange={(e) => setMessage(e.target.value)}/>      
      {messages.map((message, index) => {
          return <p key={index} className={`p-5 rounded-full m-5 w-fit ${message.sender === "doctor" ? "bg-slate-400 mr-auto" : "bg-blue-500 ml-auto"}`}>{message.message}</p>
        })}
      </div>
      <a href="" ref={aRef}></a>
    </main>
  );
  }