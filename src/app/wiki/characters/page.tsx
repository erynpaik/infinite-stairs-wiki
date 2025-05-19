import { sanityClient } from '@/lib/sanityClient'
import CharacterBrowser from './CharacterBrowser'
import Link from 'next/link' // ⬅️ Add this if not already imported

export default async function CharactersPage() {
  const characters = await sanityClient.fetch(
    `*[_type == "character"]{
      _id,
      name,
      description,
      slug,
      image,
      category->{
        name,
        slug
      }
    }`
  )

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 font-pixel">
      <div className="max-w-6xl mx-auto">
        {/* Back to Home */}
        <Link
          href="/"
          className="font-pixel text-white hover:underline text-[24px] mb-6 inline-block"
        >
          ← Back to Home
        </Link>

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center drop-shadow mb-10">
          Characters
        </h1>

        {/* Character Grid */}
        <CharacterBrowser characters={characters} />
      </div>
    </main>
  )
}

