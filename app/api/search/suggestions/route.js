// app/api/search/suggestions/route.js
import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request) {
  console.log('[API Suggestions] - Petición recibida.'); // Log 1

  try {
    const { searchParams } = new URL(request.url);
    const queryTerm = searchParams.get('q');

    if (!queryTerm || queryTerm.trim().length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    console.log(`[API Suggestions] - Buscando el término: "${queryTerm}"`); // Log 2

    const params = { searchTerm: `*${queryTerm}*` };

    // --- CONSULTA GROQ MEJORADA ---
    const postsQuery = `
      *[_type == "post" && (
        title match $searchTerm ||
        excerpt match $searchTerm ||
        pt::text(body) match $searchTerm
      )] {
        _id,
        title,
        excerpt,
        "slug": slug.current,
        "categories": categories[]->title,
        "tags": tags[]->title,
        "searchScore": (
          (title match $searchTerm) * 3 +
          (excerpt match $searchTerm) * 2 +
          (pt::text(body) match $searchTerm) * 1
        )
      } | order(searchScore desc, publishedAt desc)[0...5]
    `;

    console.log('[API Suggestions] - Ejecutando consulta de posts en Sanity...'); // Log 3
    
    const posts = await client.fetch(postsQuery, params);
    
    console.log(`[API Suggestions] - Sanity devolvió ${posts.length} resultados para posts.`); // Log 4

    // Búsqueda de tags
    const tagsQuery = `
      *[_type == "tag" && title match $searchTerm] | order(title asc)[0...3] {
        _id,
        title,
        "slug": slug.current,
        color
      }
    `;
    console.log('[API Suggestions] - Ejecutando consulta de tags en Sanity...'); // Log 5
    const tags = await client.fetch(tagsQuery, params);
    console.log(`[API Suggestions] - Sanity devolvió ${tags.length} resultados para tags.`); // Log 6

    // Devolver ambos resultados como sugerencias
    return NextResponse.json({
      suggestions: [
        ...posts.map(post => ({
          type: 'post',
          ...post
        })),
        ...tags.map(tag => ({
          type: 'tag',
          ...tag
        }))
      ]
    });

  } catch (error) {
    // ESTE ES EL ERROR QUE NECESITAMOS VER
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('[API Suggestions] - ¡¡¡ERROR EN EL SERVIDOR!!!', error);
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    
    return NextResponse.json(
      { error: 'Error interno en el servidor. Revisa la terminal.' },
      { status: 500 }
    );
  }
}