'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter();

  const login = async () => {
    const res = await fetch('/api/login',{
      method:'POST',
      body: JSON.stringify({username,password})
    });

    if(!res.ok) return alert('Invalid login');

    const user = await res.json();
    localStorage.setItem('user',JSON.stringify(user));

    if(user.role===0) router.push('/suspended');
    if(user.role===1) router.push('/form');
    if(user.role===2) router.push('/kpi');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 w-full max-w-sm bg-white shadow rounded">
        <h1 className="text-xl font-bold mb-4">
          Household Waste Follow Up
        </h1>

        <input placeholder="Username" onChange={e=>setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={login} className="bg-green-600 text-white w-full mt-4">
          Login
        </button>
      </div>
    </div>
  );
}
