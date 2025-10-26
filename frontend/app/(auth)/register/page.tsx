"use client";
import React, { useState } from "react";
import { api, APIResponse } from "@/api";
import { toast } from "react-toastify";
import Toaster from "@/components/Toaster";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.info("🔄 Registering...");

    try {
      const response = await api.post<
        APIResponse<{ access_token: string }>
      >("/register", { name, email, password });

      if (response.data.success) {
        const { access_token } = response.data.data;
        localStorage.setItem("token", access_token);

        toast.update(toastId, {
          render: "✅ Registration successful!",
          type: "success",
        });

        // ต่างกันตรงที่ window.location.href จะ render ใหม่ทำให้ได้ getMe เเล้ว
        // router.push("/profile");
        window.location.href = "/profile";
      } else {
        toast.update(toastId, {
          render: response.data.error || "Registration failed",
          type: "error",
        });
      }
    } catch (err: any) {
      toast.update(toastId, {
        render: err.response?.data?.detail || "Registration failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Toaster/>
      <div className="bg-[#2f3131] flex flex-col items-center justify-center h-[calc(100vh-56px)] font-mono text-zinc-200">
        <div className="container flex flex-col justify-center items-center h-full space-y-5">
          <h1 className="text-2xl font-semibold text-start">Register</h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-0 duration-200"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-0 duration-200"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
