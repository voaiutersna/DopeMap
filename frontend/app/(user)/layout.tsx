// app/UserContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getMe } from "./user-api";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface UserContextValue {
  me: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextValue>({
  me: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const profile = await getMe();
        setMe(profile);
        if (profile == null){
          router.push("/signin")
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  return (
    <UserContext.Provider value={{ me, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}

export const useUser = () => useContext(UserContext);