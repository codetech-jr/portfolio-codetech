// app/api/search/route.js
import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Función para resaltar el término buscado en el extracto
function highlightSearchTerm(text, query) {
  if (!text || !query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-[#00C6FF] text-[#0C0C2C] px-1 rounded">$1</mark>');
}

// Función para determinar dónde se encontró la coincidencia
function getMatchType(post, query) {
  const lowerQuery = query.toLowerCase();
  const lowerTitle = post.title.toLowerCase();
  const lowerExcerpt = post.excerpt.toLowerCase();

  if (lowerTitle.includes(lowerQuery)) {
    return 'title';
  } else if (lowerExcerpt.includes(lowerQuery)) {
    return 'excerpt';
  } else {
    return 'content';
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryTerm = searchParams.get('q');

    if (!queryTerm || queryTerm.trim().length < 2) {
      return NextResponse.json({ posts: [], total: 0 });
    }

    const params = { searchTerm: `*${queryTerm}*` };

    const searchQuery = `
      *[_type == "post" && (
        title match $searchTerm ||
        excerpt match $searchTerm ||
        pt::text(body) match $searchTerm
      )] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        mainImage,
        excerpt,
        publishedAt,
        "authorName": author->name,
        "authorImage": author->image,
        "categories": categories[]->title,
        "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
        "searchScore": (
          (title match $searchTerm) * 3 +
          (excerpt match $searchTerm) * 2 +
          (pt::text(body) match $searchTerm) * 1
        )
      } | order(searchScore desc, publishedAt desc)
    `;

    const posts = await client.fetch(searchQuery, params);

    const processedPosts = posts.map(post => ({
      ...post,
      highlightedExcerpt: highlightSearchTerm(post.excerpt, queryTerm),
      matchType: getMatchType(post, queryTerm)
    }));

    return NextResponse.json({
      posts: processedPosts,
      total: processedPosts.length,
      query: queryTerm
    });

  } catch (error) {
    console.error('Error en búsqueda:', error);
    return NextResponse.json(
      { error: 'Error al realizar la búsqueda' },
      { status: 500 }
    );
  }
}