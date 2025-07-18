// app/api/search/route.js
import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ posts: [], total: 0 });
    }

    // Búsqueda avanzada en Sanity usando GROQ
    // Busca en título, extracto y contenido del post
    const searchQuery = `
      *[_type == "post" && (
        title match "*${query}*" ||
        excerpt match "*${query}*" ||
        pt::text(body) match "*${query}*"
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
        "searchScore": boost(
          select(
            title match "*${query}*" => 3,
            excerpt match "*${query}*" => 2,
            pt::text(body) match "*${query}*" => 1,
            0
          )
        )
      } | order(searchScore desc, publishedAt desc)
    `;

    const posts = await client.fetch(searchQuery);

    // Procesar los resultados para resaltar el término buscado
    const processedPosts = posts.map(post => ({
      ...post,
      // Crear un extracto resaltado si se encuentra el término
      highlightedExcerpt: highlightSearchTerm(post.excerpt, query),
      // Indicar dónde se encontró la coincidencia
      matchType: getMatchType(post, query)
    }));

    return NextResponse.json({
      posts: processedPosts,
      total: processedPosts.length,
      query: query
    });

  } catch (error) {
    console.error('Error en búsqueda:', error);
    return NextResponse.json(
      { error: 'Error al realizar la búsqueda' },
      { status: 500 }
    );
  }
}

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