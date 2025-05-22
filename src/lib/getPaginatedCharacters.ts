// src/lib/getPaginatedCharacters.ts
import { client } from '@/sanity/client'
import { groq } from 'next-sanity'

export const getPaginatedCharacters = async (page = 1, limit = 20) => {
  const start = (page - 1) * limit
  const end = start + limit

  const query = groq`*[_type == "character"] | order(name asc) [${start}...${end}] {
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

  const characters = await client.fetch(query)
  const total = await client.fetch(groq`count(*[_type == "character"])`)

  return {
    characters,
    total,
  }
}
