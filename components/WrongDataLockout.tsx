'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function WrongDataLockout(){
  const [time,setTime]=useState(30);
  const router = useRouter();

  useEffect(()=>{
    const t=setInterval(()=>{
      setTime(v=>{
        if(v<=1){
          localStorage.clear();
          router.push('/login');
        }
        return v-1;
      });
    },1000);
    return ()=>clearInterval(t);
  },[]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 text-white flex items-center justify-center">
      <div>
        <h2 className="text-xl font-bold">WE DON'T COMPROMISE DATA QUALITY</h2>
        <p>Account temporarily locked. Contact supervisor.</p>
        <p className="text-red-400 text-lg">{time}s</p>
      </div>
    </div>
  );
}
