// app/api/search/suggestions/route.js
import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    // Búsqueda para sugerencias - más limitada que la búsqueda principal
    const searchQuery = `
      *[_type == "post" && (
        title match "*${query}*" ||
        excerpt match "*${query}*" ||
        pt::text(body) match "*${query}*"
      )] | order(publishedAt desc)[0...5] {
        _id,
        title,
        excerpt,
        "slug": slug.current,
        "categories": categories[]->title,
        "tags": tags[]->title,
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

    // También buscar en tags
    const tagsQuery = `
      *[_type == "tag" && title match "*${query}*"] | order(title asc)[0...3] {
        _id,
        title,
        "slug": slug.current,
        color
      }
    `;

    const tags = await client.fetch(tagsQuery);

    // Procesar sugerencias
    const suggestions = [
      // Posts como sugerencias principales
      ...posts.map(post => ({
        type: 'post',
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        categories: post.categories,
        tags: post.tags
      })),
      // Tags como sugerencias secundarias
      ...tags.map(tag => ({
        type: 'tag',
        title: `Tag: ${tag.title}`,
        slug: tag.slug,
        color: tag.color
      }))
    ];

    return NextResponse.json({
      suggestions: suggestions.slice(0, 8), // Máximo 8 sugerencias
      query: query
    });

  } catch (error) {
    console.error('Error en sugerencias:', error);
    return NextResponse.json(
      { error: 'Error al obtener sugerencias' },
      { status: 500 }
    );
  }
} 