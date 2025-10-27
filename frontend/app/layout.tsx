"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import "md-editor-rt/lib/style.css";
import "./markdown.css";
import { getMe } from "./(user)/user-api";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { User } from "./(user)/type";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

interface UserContextValue {
  me: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextValue>({ me: null, loading: true });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const profile = await getMe();
        setMe(profile || null);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setMe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  return <UserContext.Provider value={{ me, loading }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100dvh] relative`}
      >
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
