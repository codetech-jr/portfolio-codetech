import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Motores de búsqueda tradicionales ────────────────────────────────
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/studio', '/api/', '/_next/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/studio', '/api/', '/_next/'],
      },

      // ── Bots de IA para citación (PERMITIDOS = nos pueden mencionar) ──────
      // Fuente: ai-seo.md §"Step 4: AI Bot Access Check"
      {
        userAgent: 'GPTBot',          // OpenAI ChatGPT (búsqueda web)
        allow: '/',
        disallow: ['/studio', '/api/', '/_next/'],
      },
      {
        userAgent: 'ChatGPT-User',    // ChatGPT usuario (plugins)
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',   // Perplexity AI
        allow: '/',
        disallow: ['/studio', '/api/', '/_next/'],
      },
      {
        userAgent: 'ClaudeBot',       // Anthropic Claude (búsqueda)
        allow: '/',
        disallow: ['/studio', '/api/', '/_next/'],
      },
      {
        userAgent: 'anthropic-ai',    // Anthropic rastreador general
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Google Gemini + AI Overviews
        allow: '/',
        disallow: ['/studio'],
      },

      // ── Bots de entrenamiento (BLOQUEADOS) ────────────────────────────────
      // CCBot entrena modelos, no cita — diferencia clave vs. bots de citación
      {
        userAgent: 'CCBot',           // Common Crawl (datasets de entrenamiento)
        disallow: '/',
      },

      // ── Regla general (todo lo demás permitido) ──────────────────────────
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api/', '/_next/', '/sanity'],
      },
    ],

    // Sitemap principal para crawlers
    sitemap: `https://codetechjr.com/sitemap.xml`,

    // Host canónico (Yandex + herramientas SEO)
    host: 'https://codetechjr.com',
  };
}
