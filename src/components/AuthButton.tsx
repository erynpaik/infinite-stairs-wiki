// src/components/AuthButton.tsx
'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p className="font-pixel text-white">Loading...</p>

  if (!session) {
    return (
      <button onClick={() => signIn('google')} className="font-pixel text-white bg-blue-600 px-4 py-2 rounded hover:brightness-110">
        Sign In with Google
      </button>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <p className="font-pixel text-white">Hello, {session.user?.name}</p>
      <button onClick={() => signOut()} className="font-pixel text-white bg-red-600 px-4 py-2 rounded hover:brightness-110">
        Sign Out
      </button>
    </div>
  )
}
