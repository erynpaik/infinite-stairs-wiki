import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 font-pixel">
      <div className="max-w-xl mx-auto space-y-12">

        {/* Logo image */}
        <Image
          src="/logostairs.png"
          alt="Infinite Stairs Logo"
          width={300}
          height={160}
          className="mx-auto"
          priority
        />

        {/* Header Title (now white) */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow text-center">
          Infinite Stairs Wiki
        </h1>

        {/* Short intro */}
        <p className="text-center text-base text-gray-300">
          Welcome! Explore characters, titles, unlock guides, and secrets from the pixelated addicting game of Infinite Stairs!
        </p>

        {/* Navigation Buttons - no emojis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
  <Link href="/wiki/characters">
    <div className="bg-[#fed035] border-[3px] border-[#aea693] rounded-sm px-4 py-3 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:brightness-110 transition cursor-pointer">
      <span className="font-pixel text-black text-lg">Characters</span>
    </div>
  </Link>
  <Link href="/categories">
    <div className="bg-[#fed035] border-[3px] border-[#aea693] rounded-sm px-4 py-3 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:brightness-110 transition cursor-pointer">
      <span className="font-pixel text-black text-lg">Categories</span>
    </div>
  </Link>
</div>

        {/* CTA Button - old version */}
<div className="pt-8 text-center">
<Link
  href="/wiki/characters"
  className="inline-block bg-[#435b87] border-[3px] border-[#aea693] hover:brightness-110 text-white px-6 py-2 rounded-sm shadow font-pixel text-lg"
>
  Start Exploring →
</Link>
</div>
      </div>
    </main>
  )
}
