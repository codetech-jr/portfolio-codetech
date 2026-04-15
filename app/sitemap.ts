import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

const BASE_URL = 'https://codetechjr.com';
const LOCALES = ['en', 'es'] as const;

// Prioridades semánticas: homepage > servicios/work > contenido > contacto
// Basado en seo-structure-architect: páginas de alta conversión = máxima prioridad
const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '',              changeFrequency: 'monthly',  priority: 1.0  }, // Homepage
  { path: '/services',     changeFrequency: 'monthly',  priority: 0.95 }, // Servicios = alta conversión
  { path: '/work',         changeFrequency: 'weekly',   priority: 0.90 }, // Portafolio = prueba social
  { path: '/about',        changeFrequency: 'monthly',  priority: 0.85 }, // About = E-E-A-T
  { path: '/blog',         changeFrequency: 'daily',    priority: 0.85 }, // Blog index
  { path: '/contact',      changeFrequency: 'yearly',   priority: 0.75 }, // Contacto
  { path: '/resume',       changeFrequency: 'monthly',  priority: 0.70 }, // CV descargable
];

async function fetchSanityPosts(): Promise<Array<{ slug: string; updatedAt: string }>> {
  try {
    const query = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    } | order(_updatedAt desc)`;
    return await client.fetch(query);
  } catch {
    // Fallo silencioso para no romper el build si Sanity no responde
    console.warn('[sitemap.ts] No se pudieron obtener posts de Sanity');
    return [];
  }
}

async function fetchSanityProjects(): Promise<Array<{ slug: string; updatedAt: string }>> {
  try {
    const query = `*[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    }`;
    return await client.fetch(query);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    fetchSanityPosts(),
    fetchSanityProjects(),
  ]);

  // URLs estáticas x locales
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE_URL}/${l}${route.path}`])
        ),
      },
    }))
  );

  // URLs de blog posts x locales
  const blogEntries: MetadataRoute.Sitemap = posts.flatMap((post) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.80,
    }))
  );

  // URLs de proyectos x locales
  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/work/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }))
  );

  return [...staticEntries, ...blogEntries, ...projectEntries];
}
