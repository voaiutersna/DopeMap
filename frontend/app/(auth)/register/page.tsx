"use client"
import React, { useState } from "react";
import { api , APIResponse } from "@/api"; 

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post<APIResponse<{ access_token: string; }>>(
        "/register",
        { name, email, password }
      );

      console.log(response);

      if (response.data.success) {
        console.log("Registered:", response.data.data);
        const { access_token } = response.data.data;
        localStorage.setItem("token", access_token);

      } else {
        setError(response.data.error || "Registration failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="bg-[#2f3131] flex flex-col items-center justify-items-center h-[calc(100vh-56px)] font-mono text-zinc-200">
       <div className="container flex flex-col justify-center items-center h-full space-y-5">


        <h1 className="text-2xl font-semibold text-start">Register</h1>
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
            required
          />

          <button
            type="submit"
            className="mt-2 px-4 py-2 border border-blue-500 text-blue-400 rounded-md hover:bg-blue-500/10 hover:scale-105 transition-transform duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
