import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(req: Request) {
  // (optional) verify a secret:
  const secret = new URL(req.url).searchParams.get('secret')
  if (process.env.SANITY_WEBHOOK_SECRET && secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  // revalidate list + all detail pages
  revalidateTag('characters')

  // (optional) if you want to revalidate only a single slug, parse it from the webhook payload and call:
  // revalidateTag(`character:${slug}`)

  return NextResponse.json({ revalidated: true })
}
