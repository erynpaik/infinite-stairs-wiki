import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { postType } from './postType'
import { authorType } from './authorType'
import { character } from './character'
import { categoryType } from './category' 
import pet from './pet'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    character,
    pet,
  ],
}

