// lib/sanity.queries.ts o donde tengas tus queries
import { client } from '@/sanity/lib/client';

/**
 * Obtiene todas las categorías desde Sanity
 * @returns {Promise<Array<{_id: string, title: string, slug: string, description?: string}>>}
 */
export async function getCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }`;
  
  try {
    const categories = await client.fetch(query);
    console.log('✅ Categorías obtenidas:', categories);
    return categories;
  } catch (error) {
    console.error('❌ Error al obtener categorías de Sanity:', error);
    return [];
  }
}

/**
 * Obtiene todos los tags desde Sanity (si los tienes configurados)
 * @returns {Promise<Array<{_id: string, title: string, color?: string}>>}
 */
export async function getTags() {
  const query = `*[_type == "tag"] | order(title asc) {
    _id,
    title,
    color
  }`;
  
  try {
    const tags = await client.fetch(query);
    console.log('✅ Tags obtenidos:', tags);
    return tags;
  } catch (error) {
    console.log('ℹ️ No hay tags configurados o hubo un error:', error);
    return [];
  }
}

/**
 * Obtiene posts filtrados según los criterios proporcionados
 * @param {Object} filters - Objeto con los filtros a aplicar
 * @returns {Promise<Array>}
 */
export async function getFilteredPosts(filters = {}) {
  const {
    category = '',
    tags = [],
    dateRange = '',
    sortBy = 'newest',
    searchQuery = ''
  } = filters;

  // Construir condiciones del filtro
  const conditions = [`_type == "post"`];
  
  // Filtro por categoría
  if (category) {
    conditions.push(`category->slug.current == "${category}"`);
  }
  
  // Filtro por tags
  if (tags && tags.length > 0) {
    const tagsCondition = tags
      .map(tag => `"${tag}" in tags[]->title`)
      .join(' || ');
    conditions.push(`(${tagsCondition})`);
  }
  
  // Filtro por búsqueda de texto
  if (searchQuery) {
    const sanitizedQuery = searchQuery.replace(/"/g, '\\"');
    conditions.push(`(
      title match "*${sanitizedQuery}*" ||
      excerpt match "*${sanitizedQuery}*"
    )`);
  }
  
  // Filtro por fecha
  if (dateRange) {
    const now = new Date();
    let dateCondition = '';
    
    switch (dateRange) {
      case 'today':
        const today = now.toISOString().split('T')[0];
        dateCondition = `publishedAt >= "${today}"`;
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        dateCondition = `publishedAt >= "${weekAgo}"`;
        break;
      case 'month':
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString();
        dateCondition = `publishedAt >= "${monthAgo}"`;
        break;
      case 'year':
        const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString();
        dateCondition = `publishedAt >= "${yearAgo}"`;
        break;
    }
    
    if (dateCondition) conditions.push(dateCondition);
  }
  
  const whereClause = conditions.join(' && ');
  
  // Configurar ordenamiento
  let orderBy = 'publishedAt desc';
  switch (sortBy) {
    case 'oldest':
      orderBy = 'publishedAt asc';
      break;
    case 'title':
      orderBy = 'title asc';
      break;
    case 'popular':
      orderBy = 'views desc, publishedAt desc';
      break;
    default:
      orderBy = 'publishedAt desc';
  }
  
  const query = `*[${whereClause}] | order(${orderBy}) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      name,
      "imageUrl": image.asset->url
    },
    category->{
      _id,
      title,
      "slug": slug.current
    },
    tags[]->{
      _id,
      title,
      color
    },
    views
  }`;
  
  try {
    console.log('🔍 Query aplicada:', query);
    const posts = await client.fetch(query);
    console.log(`✅ ${posts.length} posts obtenidos`);
    return posts;
  } catch (error) {
    console.error('❌ Error al obtener posts:', error);
    return [];
  }
}

/**
 * Obtiene posts con paginación
 * @param {Object} filters - Filtros a aplicar
 * @param {number} start - Índice de inicio
 * @param {number} end - Índice final
 * @returns {Promise<Array>}
 */
export async function getFilteredPostsWithPagination(filters = {}, start = 0, end = 12) {
  const {
    category = '',
    tags = [],
    dateRange = '',
    sortBy = 'newest',
    searchQuery = ''
  } = filters;

  const conditions = [`_type == "post"`];
  
  if (category) {
    conditions.push(`category->slug.current == "${category}"`);
  }
  
  if (tags && tags.length > 0) {
    const tagsCondition = tags
      .map(tag => `"${tag}" in tags[]->title`)
      .join(' || ');
    conditions.push(`(${tagsCondition})`);
  }
  
  if (searchQuery) {
    const sanitizedQuery = searchQuery.replace(/"/g, '\\"');
    conditions.push(`(
      title match "*${sanitizedQuery}*" ||
      excerpt match "*${sanitizedQuery}*"
    )`);
  }
  
  if (dateRange) {
    const now = new Date();
    let dateCondition = '';
    
    switch (dateRange) {
      case 'today':
        const today = now.toISOString().split('T')[0];
        dateCondition = `publishedAt >= "${today}"`;
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        dateCondition = `publishedAt >= "${weekAgo}"`;
        break;
      case 'month':
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString();
        dateCondition = `publishedAt >= "${monthAgo}"`;
        break;
      case 'year':
        const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString();
        dateCondition = `publishedAt >= "${yearAgo}"`;
        break;
    }
    
    if (dateCondition) conditions.push(dateCondition);
  }
  
  const whereClause = conditions.join(' && ');
  
  let orderBy = 'publishedAt desc';
  switch (sortBy) {
    case 'oldest':
      orderBy = 'publishedAt asc';
      break;
    case 'title':
      orderBy = 'title asc';
      break;
    case 'popular':
      orderBy = 'views desc, publishedAt desc';
      break;
    default:
      orderBy = 'publishedAt desc';
  }
  
  const query = `*[${whereClause}] | order(${orderBy}) [${start}...${end}] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      name,
      "imageUrl": image.asset->url
    },
    category->{
      _id,
      title,
      "slug": slug.current
    },
    tags[]->{
      _id,
      title,
      color
    },
    views
  }`;
  
  try {
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error('❌ Error al obtener posts con paginación:', error);
    return [];
  }
}

/**
 * Cuenta el total de posts que coinciden con los filtros
 * @param {Object} filters - Filtros a aplicar
 * @returns {Promise<number>}
 */
export async function getPostsCount(filters = {}) {
  const {
    category = '',
    tags = [],
    dateRange = '',
    searchQuery = ''
  } = filters;

  const conditions = [`_type == "post"`];
  
  if (category) {
    conditions.push(`category->slug.current == "${category}"`);
  }
  
  if (tags && tags.length > 0) {
    const tagsCondition = tags
      .map(tag => `"${tag}" in tags[]->title`)
      .join(' || ');
    conditions.push(`(${tagsCondition})`);
  }
  
  if (searchQuery) {
    const sanitizedQuery = searchQuery.replace(/"/g, '\\"');
    conditions.push(`(
      title match "*${sanitizedQuery}*" ||
      excerpt match "*${sanitizedQuery}*"
    )`);
  }
  
  if (dateRange) {
    const now = new Date();
    let dateCondition = '';
    
    switch (dateRange) {
      case 'today':
        const today = now.toISOString().split('T')[0];
        dateCondition = `publishedAt >= "${today}"`;
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        dateCondition = `publishedAt >= "${weekAgo}"`;
        break;
      case 'month':
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString();
        dateCondition = `publishedAt >= "${monthAgo}"`;
        break;
      case 'year':
        const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString();
        dateCondition = `publishedAt >= "${yearAgo}"`;
        break;
    }
    
    if (dateCondition) conditions.push(dateCondition);
  }
  
  const whereClause = conditions.join(' && ');
  const query = `count(*[${whereClause}])`;
  
  try {
    const count = await client.fetch(query);
    return count;
  } catch (error) {
    console.error('❌ Error al contar posts:', error);
    return 0;
  }
}