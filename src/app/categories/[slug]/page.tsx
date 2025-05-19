import { getCharactersByCategory } from '@/lib/getCharactersByCategory'
import CharacterBrowser from '@/app/wiki/characters/CharacterBrowser'
import Link from 'next/link'

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const characters = await getCharactersByCategory(params.slug)

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 font-pixel">
      <div className="max-w-6xl mx-auto">
        {/* ← Back to Categories */}
       <Link href="/categories" className="font-pixel text-white hover:underline text-[24px] mb-6 inline-block">
  ← Back to Categories
</Link>
        <h1 className="text-4xl sm:text-5xl font-bold text-center drop-shadow mb-10 capitalize">
          {params.slug.replaceAll('-', ' ')} Characters
        </h1>

        {characters.length === 0 ? (
          <p className="text-center text-gray-400">No characters found in this category.</p>
        ) : (
          <CharacterBrowser characters={characters} />
        )}
      </div>
    </main>
  )
}
