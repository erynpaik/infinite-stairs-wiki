'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') return null

  return (
    <div className="absolute top-4 right-4 z-50">
      {session ? (
        <button
          onClick={() => signOut()}
          className="font-pixel bg-[#fed035] text-black border-[3px] border-[#aea693] px-6 py-2 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,0.5)] whitespace-nowrap text-sm hover:brightness-110 transition"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn('google')}
          className="font-pixel bg-[#435b87] text-white border-[3px] border-[#aea693] px-6 py-2 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,0.5)] whitespace-nowrap text-sm hover:brightness-110 transition"
        >
          Sign In
        </button>
      )}
    </div>
  )
}
