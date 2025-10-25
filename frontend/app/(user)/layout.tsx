"use client";
import React, { useEffect } from 'react'
import { getMe } from './user-api';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(()=>{
    const getProfile = async() => {

      const profile = await getMe()
      console.log(profile);
    }
    getProfile()
  },[])
  return (
    <>
      {children}
    </>
  )
}
