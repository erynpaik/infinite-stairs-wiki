import { sanityClient } from '@/lib/sanityClient'
import { urlFor } from '@/lib/sanityImage'

type Props = {
  params: {
    slug: string
  }
}

export default async function CharacterDetailPage({ params }: Props) {
  const character = await sanityClient.fetch(
    `*[_type == "character" && slug.current == $slug][0]{
      name,
      description,
      howToObtain,
      image,
      titles[]{
        name,
        howToObtain
      },
      skins[]{
        name,
        howToObtain,
        image
      }
    }`,
    { slug: params.slug }
  )

  if (!character) {
    return <p className="text-center text-red-600 py-10">Character not found.</p>
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-white">{character.name}</h1>

      {character.image && (
        <img
          src={urlFor(character.image).width(600).url()}
          alt={character.name}
          className="w-full h-64 object-contain rounded shadow-lg mb-6 bg-zinc-900"
        />
      )}

      {character.description && (
        <p className="text-lg text-white mb-6 whitespace-pre-line">
          {character.description}
        </p>
      )}

      {character.howToObtain && (
        <>
          <h3 className="text-xl font-semibold mt-6 text-white">How to Obtain</h3>
          <p className="text-white whitespace-pre-line">{character.howToObtain}</p>
        </>
      )}

{character.titles?.length > 0 && (
  <>
    <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Titles</h3>
    <div className="space-y-4">
      {character.titles.map((title: any, i: number) => (
        <div key={i} className="space-y-2">
          <div className="w-[180px] bg-[#f08080] border-[2px] border-[#d46a6a] rounded-sm text-white text-sm py-[6px] px-2 tracking-wide text-center font-pixel shadow-[inset_1px_1px_0px_rgba(0,0,0,0.2),inset_-1px_-1px_0px_rgba(255,255,255,0.15),1px_1px_0px_rgba(0,0,0,0.3)]">
            {title.name}
          </div>
          {title.howToObtain && (
            <p className="text-gray-100 text-base whitespace-pre-line w-[180px] pl-1 font-pixel leading-snug">
              {title.howToObtain}
            </p>
          )}
        </div>
      ))}
    </div>
  </>
)}

      {character.skins?.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Skins</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {character.skins.map((skin: any, i: number) => (
              <div key={i} className="border rounded-xl p-4 shadow bg-zinc-900">
                {skin.image && (
                  <img
                    src={urlFor(skin.image).width(400).url()}
                    alt={skin.name}
                    className="w-full h-64 object-contain rounded mb-3 bg-black"
                  />
                )}
                <p className="text-white font-medium">{skin.name}</p>
                <p className="text-gray-300 text-sm whitespace-pre-line">
                  {skin.howToObtain}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-8">
        <a href="/wiki/characters" className="text-blue-400 hover:underline">
          ← Back to all characters
        </a>
      </div>
    </main>
  )
}
