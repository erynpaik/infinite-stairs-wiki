// src/app/categories/page.tsx
import { getCategories } from '@/lib/getCategories'
import Link from 'next/link'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category: any) => (
          <li key={category._id} className="bg-white shadow rounded-xl p-4 hover:bg-gray-100 transition">
            <Link href={`/categories/${category.slug.current}`} className="text-xl text-blue-600 hover:underline">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
