import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

export const getCategories = async () => {
  return await client.fetch(
    groq`*[_type == "category"]{
      _id,
      name,
      slug,
      image {
        asset->{
          url
        }
      }
    }`
  )
}
