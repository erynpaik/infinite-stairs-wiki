import { sanityClient } from "@/lib/sanityClient";

export async function getPaginatedCharacters(page = 1, limit = 20) {
  const start = (page - 1) * limit;
  const end = start + limit;

  // One round trip: characters + total count
  const query = /* groq */ `
    {
      "characters": *[_type == "character"]
        | order(name asc)[$start...$end]{
          _id,
          name,
          slug,
          image,
          // include these if you use them on the grid
          sprite,
          category->{ name, slug }
        },
      "total": count(*[_type == "character"])
    }
  `;

  // cache + revalidate + tag
  return sanityClient.fetch(
    query,
    { start, end },
    {
      cache: "force-cache",
      next: { revalidate: 300, tags: ["characters"] }, // 5 minutes + tag
    }
  );
}
