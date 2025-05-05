import { sanityClient } from '@/lib/sanityClient'
import CharacterBrowser from './CharacterBrowser'

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
        <h1 className="text-4xl sm:text-5xl font-bold text-center drop-shadow mb-10">
          Characters
        </h1>

        <CharacterBrowser characters={characters} />
      </div>
    </main>
  )
}
