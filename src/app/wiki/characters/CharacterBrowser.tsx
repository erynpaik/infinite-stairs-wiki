'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

export default function CharacterBrowser({ characters }: { characters: Character[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const router = useRouter()

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && characters.length > 0) {
      const trimmed = searchTerm.trim().toLowerCase()
      const match = characters.find(
        (char) => char.name.trim().toLowerCase() === trimmed
      )
      if (match) {
        router.push(`/wiki/characters/${match.slug.current}`)
      }
    }
  }

  const categories = Array.from(
    new Set(characters.map((char) => char.category?.name).filter(Boolean))
  )

  const filteredCharacters = selectedCategory
    ? characters.filter((char) => char.category?.name === selectedCategory)
    : characters

  return (
    <>
      {/* Search Bar */}
      <div className="mb-10 text-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search character name..."
          className="px-4 py-2 border-2 border-[#435b87] rounded bg-black text-white font-pixel w-full max-w-md"
        />
      </div>

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
        <p className="text-center text-gray-400 font-pixel text-lg">
          No characters found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredCharacters.map((char) => (
            <Link key={char._id} href={`/wiki/characters/${char.slug.current}`}>
              <div className="border-2 border-[#435b87] rounded-lg p-4 shadow bg-black hover:brightness-110 transition cursor-pointer text-center">
                {char.image && (
                  <img
                    src={urlFor(char.image).width(300).url()}
                    alt={char.name}
                    loading="lazy"
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
    </>
  )
}
