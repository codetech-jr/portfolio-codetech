import { client } from '@/sanity/lib/client';

/**
 * Obtiene todas las categorías desde Sanity
 * @returns {Promise<Array<{_id: string, title: string, slug: string}>>}
 */
export async function getCategories() {
  const query = `*[_type == "category"]{ _id, title, "slug": slug.current }`;
  try {
    const categories = await client.fetch(query);
    return categories;
  } catch (error) {
    console.error('Error al obtener categorías de Sanity:', error);
    return [];
  }
} 