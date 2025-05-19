import { getCategories } from '@/lib/getCategories'
import Link from 'next/link'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 font-pixel">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* ← Back to Home Button */}
        <Link
          href="/"
          className="font-pixel text-white hover:underline text-[24px]"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold text-center drop-shadow">
          Categories
        </h1>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Dynamic categories from Sanity */}
          {categories.map((category: any) => (
            <li key={category._id}>
              <Link
                href={`/categories/${category.slug.current}`}
                className="block bg-[#fed035] text-black text-center border-[3px] border-[#aea693] rounded-sm px-4 py-6 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:brightness-110 transition text-xl sm:text-2xl"
              >
                {category.name}
              </Link>
            </li>
          ))}

          {/* 🐾 Hardcoded extras */}
          <li>
            <Link
              href="/wiki/pets"
              className="block bg-[#fed035] text-black text-center border-[3px] border-[#aea693] rounded-sm px-4 py-6 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:brightness-110 transition text-xl sm:text-2xl"
            >
              Pets
            </Link>
          </li>
          <li>
            <Link
              href="/wiki/maps"
              className="block bg-[#fed035] text-black text-center border-[3px] border-[#aea693] rounded-sm px-4 py-6 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:brightness-110 transition text-xl sm:text-2xl"
            >
              Maps
            </Link>
          </li>
          <li>
            <Link
              href="/wiki/modes"
              className="block bg-[#fed035] text-black text-center border-[3px] border-[#aea693] rounded-sm px-4 py-6 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:brightness-110 transition text-xl sm:text-2xl"
            >
              Modes
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
