"use client";

import React, { ReactNode, useEffect } from "react";
import { useUser } from "@/app/layout"; // global context
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function UserLayout({ children }: { children: ReactNode }) {
  const { me, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !me) {
      router.push("/signin");
    }
  }, [loading, me, router]);

  if (loading || !me) return <Loading />;

  return <>{children}</>;
}
