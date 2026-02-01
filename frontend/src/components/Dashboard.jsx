import React, {useEffect, useState, useRef} from 'react'
import API from '../api'
import BinCard from './BinCard'
import Header from './Header'
import { io } from 'socket.io-client'

export default function Dashboard(){
  const [bins, setBins] = useState([])
  const socketRef = useRef(null)

  useEffect(()=>{
    fetchBins()
    // socket connection
    socketRef.current = io('http://localhost:4000')
    socketRef.current.on('connect', ()=> console.log('socket connected'))
    socketRef.current.on('bin:update', (bin)=>{
      setBins(prev => {
        const idx = prev.findIndex(b=>b.binId===bin.binId)
        if(idx===-1) return [bin, ...prev]
        const copy = [...prev]; copy[idx] = bin; return copy;
      })
    })
    return ()=> socketRef.current?.disconnect()
  },[])

  async function fetchBins(){
    try{
      const res = await API.get('/bins')
      setBins(res.data)
    }catch(err){ console.error(err) }
  }

  return (
    <div>
      <Header />
      <div className="flex gap-4 flex-wrap">
        {bins.length===0 && <div className="text-slate-500">No bins yet — run simulator or post telemetry.</div>}
        {bins.map(b=> <BinCard key={b.binId} bin={b} />)}
      </div>
    </div>
  )
}
