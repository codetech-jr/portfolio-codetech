// app/sitemap.js
import { client } from '@/sanity/lib/client'; // Ajusta la ruta si es necesario

export default async function sitemap() {
  const baseUrl = 'https://tu-dominio.com'; // Cambia por tu dominio real

  // Obtiene todos los posts
  const postsQuery = `*[_type == "post"]{ "slug": slug.current, _updatedAt }`;
  const posts = await client.fetch(postsQuery);

  // URLs de los posts
  const postUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // URLs estáticas importantes
  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
  ];

  return [...staticUrls, ...postUrls];
}