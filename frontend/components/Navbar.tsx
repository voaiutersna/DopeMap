"use client";
import React from 'react'
import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  return (
    <div className='h-14 bg-[#161616] w-full border-b border-[#3a3d3f] flex justify-center items-center text-zinc-200 z-50 font-mono'>
      <div className='container flex justify-between '>
        <div className='flex space-x-5'>
          <h1>
            DopeMap
          </h1>
          <p>
            About
          </p>
        </div>
        <div>
          <div className='flex space-x-3 justify-center items-center cursor-pointer' onClick={()=>{router.push("/signin")}}>
            <LogIn className='w-4 h-4 mx-4'/>
            Sign In
          </div>
        </div>
      </div>
    </div>
  )
}
