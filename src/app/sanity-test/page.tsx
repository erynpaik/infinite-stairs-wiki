import { sanityClient } from '@/lib/sanityClient';

export default async function SanityTestPage() {
  const posts = await sanityClient.fetch(
    `*[_type == "post"]{title}`
  );

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Sanity Test 🧪</h1>
      {posts.length > 0 ? (
        <ul className="space-y-2">
          {posts.map((post: any, index: number) => (
            <li key={index} className="text-xl">
              {post.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </main>
  );
}
