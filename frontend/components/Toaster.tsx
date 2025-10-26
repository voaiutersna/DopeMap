import React from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function Toaster() {
  return (
     <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
  )
}
