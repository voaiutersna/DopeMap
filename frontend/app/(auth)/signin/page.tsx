"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api, APIResponse } from "@/api";
import { toast } from "react-toastify";
import Toaster from "@/components/Toaster";
import { AxiosError } from "axios";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "token-expired") {
      toast.warning("Session expired. Please sign in again.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.info("🔄 Logging in...");

    try {
      const response = await api.post<
        APIResponse<{ access_token: string }>
      >("/login", { email, password });

      if (response.data.success) {
        const { access_token } = response.data.data;
        localStorage.setItem("token", access_token);

        toast.update(toastId, {
          render: "✅ Login successful!",
          type: "success",
          autoClose: 1000,
        });

        // Reload to refresh getMe or any auth data
        window.location.href = "/profile";
      } else {
        toast.update(toastId, {
          render: response.data.error || "Login failed",
          type: "error",
        });
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ detail: string }>;
      toast.update(toastId, {
        render: error.response?.data?.detail || "Login failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-[#2f3131] flex flex-col items-center justify-center h-[calc(100vh-104px)] font-mono text-zinc-200">
        <div className="container flex flex-col justify-center items-center h-full space-y-5">
          <h1 className="text-2xl font-semibold text-start">Sign In</h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-0 duration-200"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-0 duration-200"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 px-4 py-2 border border-blue-500 text-blue-400 rounded-md hover:bg-blue-500/10 hover:scale-105 transition-transform duration-200 cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-zinc-400 mt-3">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-400 hover:underline hover:text-blue-300 transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
