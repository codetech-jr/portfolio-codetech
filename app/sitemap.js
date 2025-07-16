// app/sitemap.js
import { client } from '../lib/sanity'; // Ajusta la ruta

export default async function sitemap() {
  const baseUrl = 'https://tu-dominio.com';

  // Obtiene todos los posts
  const postsQuery = `*[_type == "post"]{ "slug": slug.current, _updatedAt }`;
  const posts = await client.fetch(postsQuery);

  const postUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Añade tus páginas estáticas
  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    // Añade aquí otras páginas importantes (proyectos, contacto, sobre mí)
  ];

  return [...staticUrls, ...postUrls];
}