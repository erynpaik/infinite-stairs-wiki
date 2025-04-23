'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanityClient'
import { urlFor } from '@/lib/sanityImage'
import { useEffect } from 'react'

type Character = {
  _id: string
  name: string
  description: string
  slug: {
    current: string
  }
  image?: {
    asset: {
      _ref: string
    }
  }
  category?: {
    name: string
    slug: {
      current: string
    }
  }
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)


useEffect(() => {
  sanityClient
    .fetch(
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
    .then(setCharacters)
}, [])

  const categories = Array.from(
    new Set(characters.map((char) => char.category?.name).filter(Boolean))
  )

  const filteredCharacters = selectedCategory
    ? characters.filter((char) => char.category?.name === selectedCategory)
    : characters

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-white">Characters</h1>

      {/* Filter buttons */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-sm px-3 py-1 rounded-full ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category ?? null)}
              className={`text-sm px-3 py-1 rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {filteredCharacters.length === 0 ? (
        <p className="text-white">No characters found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCharacters.map((char) => (
            <div
              key={char._id}
              className="border border-zinc-700 rounded-xl p-4 shadow-md bg-zinc-900 hover:bg-zinc-800 transition"
            >
              <Link href={`/wiki/characters/${char.slug.current}`}>
                <h2 className="text-lg font-bold text-blue-400 hover:underline mb-1">
                  {char.name}
                </h2>

                {char.category && (
                  <span className="inline-block bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded-full mb-3">
                    {char.category.name}
                  </span>
                )}

                {char.image && (
                  <img
                    src={urlFor(char.image).width(300).url()}
                    alt={char.name}
                    className="rounded mb-3 w-full h-64 object-contain bg-black"
                  />
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
