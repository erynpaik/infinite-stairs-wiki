import Link from 'next/link'
import { getPaginatedCharacters } from '@/lib/getPaginatedCharacters'
import CharacterBrowser from './CharacterBrowser'

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams;   // <-- await it
  const page = parseInt(pageParam ?? '1', 10);
  const limit = 20;

  const { characters, total } = await getPaginatedCharacters(page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 font-pixel">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="font-pixel text-white hover:underline text-[24px] mb-6 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold text-center drop-shadow mb-10">
          Characters (Page {page})
        </h1>

        <CharacterBrowser characters={characters} />

        <div className="mt-12 flex justify-center gap-6 text-xl">
          {page > 1 && <Link href={`?page=${page - 1}`} className="hover:underline text-yellow-300">← Previous</Link>}
          {page < totalPages && <Link href={`?page=${page + 1}`} className="hover:underline text-yellow-300">Next →</Link>}
        </div>
      </div>
    </main>
  );
}
