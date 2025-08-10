import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '86eu1fqh', 
  dataset: 'production',
  token: process.env.SANITY_API_WRITE_TOKEN, 
  apiVersion: '2023-01-01',
  useCdn: false,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed')
  }

  const { name, message, characterId } = req.body

  if (!name || !message || !characterId) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    await client.create({
      _type: 'comment',
      name,
      message,
      character: {
        _type: 'reference',
        _ref: characterId,
      },
      createdAt: new Date().toISOString(),
    })

    return res.status(200).json({ message: 'Comment posted!' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to post comment' })
  }
}
