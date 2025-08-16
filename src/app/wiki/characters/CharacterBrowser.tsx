'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { urlFor } from '@/lib/sanityImage'

type SanityImage = { asset: { _ref: string } }

type Character = {
  _id: string
  name: string
  description: string
  slug: { current: string }
  image?: SanityImage          // portrait or generic image (may have bg)
  sprite?: SanityImage         // transparent sprite if available
  category?: {
    name: string
    slug: { current: string }
  }
}

export default function CharacterBrowser({ characters }: { characters: Character[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [open, setOpen] = useState(false) // suggestions dropdown
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  const norm = (s: string) => s.trim().toLowerCase()

  // suggestions under the search bar (limit to 6)
  const suggestions = useMemo(() => {
    const q = norm(searchTerm)
    if (!q) return []
    return characters.filter(c => norm(c.name).includes(q)).slice(0, 6)
  }, [characters, searchTerm])

  // categories for filter chips
  const categories = useMemo(
    () => Array.from(new Set(characters.map(c => c.category?.name).filter(Boolean))) as string[],
    [characters]
  )

  // grid filters by category AND live search
  const filteredCharacters = useMemo(() => {
    const q = norm(searchTerm)
    return characters.filter(c => {
      const passCategory = selectedCategory ? c.category?.name === selectedCategory : true
      const passSearch = q ? norm(c.name).includes(q) : true
      return passCategory && passSearch
    })
  }, [characters, selectedCategory, searchTerm])

  // Enter goes to exact match
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && characters.length > 0) {
      const match = characters.find(c => norm(c.name) === norm(searchTerm))
      if (match) {
        router.push(`/wiki/characters/${match.slug.current}`)
        setOpen(false)
      }
    }
    if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <>
      {/* Search + Suggestions */}
      <div className="mb-10 text-center relative flex justify-center">
        <div className="w-full max-w-md relative">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setOpen(true)
            }}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => setOpen(Boolean(searchTerm))}
            onBlur={() => setTimeout(() => setOpen(false), 120)} // allow click
            placeholder="Search character name..."
            className="px-4 py-2 border-2 border-[#435b87] rounded bg-black text-white font-pixel w-full"
          />

          {open && suggestions.length > 0 && (
            <ul
              className="absolute left-0 right-0 mt-2 bg-[#0e0e12] border-2 border-[#435b87] rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,0.5)] text-left z-50"
              role="listbox"
            >
              {suggestions.map((s) => (
                <li key={s._id} role="option">
                  <Link
                    href={`/wiki/characters/${s.slug.current}`}
                    className="block px-4 py-2 font-pixel text-white hover:bg-[#1a1a22] transition"
                    onMouseDown={(e) => e.preventDefault()} // keep input from blurring first
                    onClick={() => setOpen(false)}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
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
          {filteredCharacters.map((char) => {
            // Prefer transparent sprite, fall back to image
            const imgSource = (char as any).sprite ?? char.image
            const imgUrl = imgSource ? urlFor(imgSource).format('png').width(300).url() : undefined

            return (
              <Link key={char._id} href={`/wiki/characters/${char.slug.current}`}>
                <div className="border-2 border-[#435b87] rounded-lg p-4 shadow bg-black hover:brightness-110 transition cursor-pointer text-center">
                  {imgUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imgUrl}
                      alt={char.name}
                      loading="lazy"
                      className="rounded mb-4 w-full h-60 object-contain bg-transparent"
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
            )
          })}
        </div>
      )}
    </>
  )
}
