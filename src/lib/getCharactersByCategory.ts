import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

export const getCharactersByCategory = async (slug: string) => {
  return await client.fetch(
    groq`
      *[_type == "character" && references(*[_type == "category" && slug.current == $slug]._id)]{
        _id,
        name,
        slug,
        image,
        // add more fields if needed
      }
    `,
    { slug }
  )
}
