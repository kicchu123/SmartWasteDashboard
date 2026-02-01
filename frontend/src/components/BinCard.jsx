import React from 'react'

export default function BinCard({bin}){
  const level = Math.max(0, Math.min(100, Math.round(bin.fillLevel || 0)));
  let color = 'bg-green-400';
  if(level>70) color = 'bg-red-400';
  else if(level>40) color = 'bg-yellow-400';

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm w-72">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">Bin {bin.binId}</h3>
          <p className="text-xs text-slate-500">{bin.location || 'Unknown'}</p>
        </div>
        <div className="text-xs text-slate-400">{new Date(bin.lastSeen).toLocaleString()}</div>
      </div>

      <div className="mt-4">
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
          <div style={{width:`${level}%`}} className={`${color} h-full transition-all`}></div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm">{level}%</span>
          <span className="text-xs uppercase text-slate-600">{bin.status}</span>
        </div>
      </div>
    </div>
  )
}
