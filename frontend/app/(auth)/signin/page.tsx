import React from 'react'
import SignInPage from './SignIn'
import { Suspense } from 'react'
import Loading from '@/components/Loading'

export default function LoginPage() {
  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <SignInPage />
      </Suspense>
    </div>
  )
}
