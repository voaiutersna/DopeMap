import React from 'react'

export default function SignOut() {
  return (
  <button
    onClick={() => {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }}
    className="px-4 py-2 border border-red-500 text-red-400 rounded-md hover:bg-red-500/10 transition"
  >
    Logout
  </button>

  )
}
