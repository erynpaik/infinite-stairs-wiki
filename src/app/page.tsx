'use client';

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { client } from "@/sanity/client"
import { AuthButton } from 'src/components/AuthButton' 

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState<{ name: string, slug?: { current: string } }[]>([]);

  useEffect(() => {
    async function fetchCharacters() {
      const data = await client.fetch(`*[_type == "character"]{
        name,
        slug
      }`);
      setCharacters(data);
    }

    fetchCharacters();
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredCharacters.length > 0) {
      const trimmed = searchTerm.trim().toLowerCase();

      let match = filteredCharacters.find(
        (char) => char.name.trim().toLowerCase() === trimmed
      );

      if (!match) {
        match = filteredCharacters.find(
          (char) => char.name.toLowerCase().includes(trimmed)
        );
      }

      if (match && match.slug?.current) {
        window.location.href = `/wiki/characters/${match.slug.current}`;
      }
    }
  };

  return (
    <main className="relative min-h-screen text-white px-6 py-8 font-pixel overflow-hidden">
      {/*Auth button in top right */}
      <div className="absolute top-4 right-4 z-50">
        <AuthButton />
      </div>

      {/* dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto space-y-12 pt-24 sm:pt-35">
        {/* Logo image */}
        <Image
          src="/logostairs.png"
          alt="Infinite Stairs Logo"
          width={350}
          height={160}
          className="mx-auto"
          priority
        />

        {/* Header Title */}
        <h1
          className="text-5xl sm:text-6xl font-bold text-center bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(
              to bottom,
              #ffffff 0%,
              #ffffff 15%,
              #fee980 25%,
              #feeb84 35%,
              #ffdb3f 50%,
              #febb26 65%,
              #f37b00 80%,
              #cb5400 90%,
              #a63e00 100%
            )`
          }}
        >
          Infinite Stairs Wiki
        </h1>

        {/* Short intro */}
        <p className="text-center text-gray-300 font-pixel text-xl max-w-2xl mx-auto mb-6">
  Welcome! Explore characters, titles, unlock guides, and secrets from the 
  pixelated addicting game of Infinite Stairs! 
  
  Available on 
  <a 
    href="https://play.google.com/store/apps/details?id=com.nhnent.SKgame.InfiniteStair" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-blue-400 underline hover:text-blue-300 ml-1 mr-1"
  >
    Android
  </a> 
  and 
  <a 
    href="https://apps.apple.com/app/id909654226" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-blue-400 underline hover:text-blue-300 ml-1"
  >
    iOS
  </a>.
</p>

        {/* Search bar */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full p-3 text-lg sm:text-xl text-white bg-black rounded-md border-2"
            style={{ borderColor: "#435b87" }}
          />

          {searchTerm && (
            <ul>
              {filteredCharacters.length > 0 ? (
                filteredCharacters.map((char, index) => (
                  <li key={index} className="p-2 border-b border-gray-700">
                    {char.slug ? (
                      <Link href={`/wiki/characters/${char.slug.current}`} className="hover:underline text-yellow-300">
                        {char.name}
                      </Link>
                    ) : (
                      <span>{char.name}</span>
                    )}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-400">No characters found.</li>
              )}
            </ul>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <Link href="/wiki/characters">
            <div className="bg-[#fed035] border-[3px] border-[#aea693] rounded-sm px-4 py-3 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:brightness-110 transition cursor-pointer">
              <span className="font-pixel text-black text-xl sm:text-2xl">Characters</span>
            </div>
          </Link>
          <Link href="/categories">
            <div className="bg-[#fed035] border-[3px] border-[#aea693] rounded-sm px-4 py-3 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:brightness-110 transition cursor-pointer">
              <span className="font-pixel text-black text-xl sm:text-2xl">Categories</span>
            </div>
          </Link>
        </div>

        {/* CTA Button */}
        <div className="pt-8 text-center">
          <Link
            href="/wiki/characters"
            className="inline-block bg-[#435b87] border-[3px] border-[#aea693] hover:brightness-110 text-white px-6 py-3 rounded-sm shadow font-pixel text-xl sm:text-2xl"
          >
            Start Exploring →
          </Link>
        </div>
      </div>
    </main>
  );
}
