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
    { slug: params.slug },
    { cache: 'no-store' }
  );

  if (!character) {
    return <p className="text-center text-red-600 py-10 font-pixel">Character not found.</p>
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 font-pixel">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Back Button at Top */}
        <div className="flex justify-start pb-6">
          <a
            href="/wiki/characters"
            className="font-pixel text-white hover:underline text-[24px]"
          >
            ← Back to Characters
          </a>
        </div>

        {/* Character Name */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center drop-shadow">
          {character.name}
        </h1>

        {/* Character Image (force transparent format, no bg) */}
        {character.image && (
          <div className="flex justify-center">
            {/* wrapper keeps border but no background */}
            <div className="rounded-lg border-4 border-[#435b87] bg-transparent p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(character.image).format('png').width(600).url()}
                alt={character.name}
                loading="lazy"
                className="w-full max-w-sm object-contain bg-transparent"
              />
            </div>
          </div>
        )}

        {/* Character Description */}
        {character.description && (
          <p className="text-center text-lg text-gray-300 leading-relaxed whitespace-pre-line">
            {character.description}
          </p>
        )}

        {/* How to Obtain */}
        {character.howToObtain && (
          <>
            <div className="flex justify-center mb-2">
              <div className="bg-[#f08080] border-[3px] border-[#d46a6a] rounded-sm px-6 py-2 inline-block shadow-[2px_2px_0px_rgba(0,0,0,0.5)] font-pixel text-white text-2xl text-center">
                How to Obtain
              </div>
            </div>
            <p className="text-center text-lg text-gray-300 whitespace-pre-line leading-relaxed">
              {character.howToObtain}
            </p>
          </>
        )}

        {/* Titles */}
        {character.titles?.length > 0 && (
          <>
            <h3 className="text-2xl font-bold mt-10 mb-4 text-center text-white">Titles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              {character.titles.map((title: any, i: number) => (
                <div key={i} className="space-y-2 text-center w-[220px]">
                  <div className="bg-[#f08080] border-[2px] border-[#d46a6a] rounded-sm text-white text-base py-2 px-3 tracking-wide font-pixel shadow-[inset_1px_1px_0px_rgba(0,0,0,0.2),inset_-1px_-1px_0px_rgba(255,255,255,0.15),1px_1px_0px_rgba(0,0,0,0.3)]">
                    {title.name}
                  </div>
                  {title.howToObtain && (
                    <p className="text-gray-100 text-lg whitespace-pre-line font-pixel leading-snug">
                      {title.howToObtain}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Skins (also force transparent format, no bg) */}
        {character.skins?.length > 0 && (
          <>
            <h3 className="text-2xl font-bold mt-10 mb-4 text-center text-white">Skins</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {character.skins.map((skin: any, i: number) => (
                <div key={i} className="border-[2px] border-[#435b87] rounded-xl p-4 shadow bg-black">
                  {skin.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlFor(skin.image).format('png').width(400).url()}
                      alt={skin.name}
                      loading="lazy"
                      className="w-full h-64 object-contain rounded mb-3 bg-transparent"
                    />
                  )}
                  <p className="text-white font-pixel">{skin.name}</p>
                  <p className="text-gray-300 text-lg whitespace-pre-line font-pixel">
                    {skin.howToObtain}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
