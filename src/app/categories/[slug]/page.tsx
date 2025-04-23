import { getCharactersByCategory } from '@/lib/getCharactersByCategory'
import Image from 'next/image'
import Link from 'next/link'

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const characters = await getCharactersByCategory(params.slug)

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {params.slug.replaceAll('-', ' ')} Characters
      </h1>

      {characters.length === 0 ? (
        <p>No characters found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char: any) => (
            <Link key={char._id} href={`/wiki/characters/${char.slug.current}`} className="block bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition">
              {char.image && (
                <div className="w-full h-48 relative">
                  <Image
                    src={char.image.asset.url}
                    alt={char.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{char.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
