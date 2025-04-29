'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanityClient'
import { urlFor } from '@/lib/sanityImage'

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
    <main className="min-h-screen bg-black text-white px-6 py-12 font-pixel">
      <div className="max-w-6xl mx-auto">

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center drop-shadow mb-10">
          Characters
        </h1>

        {/* Filter Buttons */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-sm font-pixel text-sm border-2 ${
                selectedCategory === null
                  ? 'bg-[#435b87] border-[#aea693] text-white'
                  : 'bg-black border-gray-600 text-gray-300 hover:bg-gray-800'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category ?? null)}
                className={`px-4 py-2 rounded-sm font-pixel text-sm border-2 ${
                  selectedCategory === category
                    ? 'bg-[#435b87] border-[#aea693] text-white'
                    : 'bg-black border-gray-600 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Character Grid */}
        {filteredCharacters.length === 0 ? (
          <p className="text-center text-gray-400 font-pixel text-lg">No characters found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredCharacters.map((char) => (
              <Link key={char._id} href={`/wiki/characters/${char.slug.current}`}>
                <div className="border-2 border-[#435b87] rounded-lg p-4 shadow bg-black hover:brightness-110 transition cursor-pointer text-center">
                  
                  {char.image && (
                    <img
                      src={urlFor(char.image).width(300).url()}
                      alt={char.name}
                      className="rounded mb-4 w-full h-60 object-contain bg-black"
                    />
                  )}

                  <h2 className="text-2xl text-white mb-2">{char.name}</h2>

                  {char.category && (
                    <div className="bg-[#fed035] text-black text-xs px-3 py-1 rounded-sm font-pixel inline-block mt-2">
                      {char.category.name}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
