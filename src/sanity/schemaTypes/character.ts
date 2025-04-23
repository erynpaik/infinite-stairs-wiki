import { defineType } from 'sanity'

export const character = defineType({
  name: 'character',
  title: 'Characters',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'howToObtain',
      title: 'How to Obtain',
      type: 'text',
    },
    {
      name: 'titles',
      title: 'Titles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Title Name', type: 'string' },
            { name: 'howToObtain', title: 'How to Obtain', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'skins',
      title: 'Skins',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Skin Name', type: 'string' },
            { name: 'image', title: 'Skin Image', type: 'image', options: { hotspot: true } },
            { name: 'howToObtain', title: 'How to Obtain', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'image',
      title: 'Main Character Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }
  ],
})
