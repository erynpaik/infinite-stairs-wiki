import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { postType } from './postType'
import { authorType } from './authorType'
import { character } from './character'
import { categoryType } from './category' // ✅ this is the one you want

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    character,
  ],
}

