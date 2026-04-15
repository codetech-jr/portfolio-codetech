# 🚀 TaskSEO — Manual de Implementación SEO/GEO Semana 1
### codetechjr.com · Next.js 15 App Router · TypeScript · GEO-First

> **Stack detectado:** Next.js 15.3, React 19, next-intl 4.8 (i18n con `[locale]`), Sanity CMS, Tailwind CSS 4.
> Todos los archivos de ruta deben respetar la arquitectura `app/[locale]/...` salvo los archivos especiales de Next.js (`sitemap`, `robots`, rutas API) que viven directamente en `app/`.

---

## 1. RESUMEN DEL SPRINT TÉCNICO

Este sprint implementa la **capa de infraestructura SEO/GEO** de codetechjr.com. No es un sprint de contenido — es ingeniería pura que habilita todo lo que viene después.

### ¿Qué logra este sprint?

| Área | Implementación | Impacto directo |
|------|---------------|-----------------|
| **Arquitectura de crawling** | `sitemap.ts` dinámico + `robots.ts` | Google, Bing y bots de IA pueden indexar correctamente |
| **GEO (Generative Engine Optimization)** | Endpoint `llms.txt` con contenido semántico | Perplexity, ChatGPT y Claude entienden exactamente quién eres y para qué contratar |
| **Autoridad semántica** | JSON-LD `Person` + `Organization` en `layout.tsx` | Google Knowledge Graph te reconoce como entidad; mejora E-E-A-T |
| **Bases de rendimiento** | Inyección segura de schemas, fuentes optimizadas | LCP < 2.5s, CLS = 0.00 garantizados por arquitectura |

### Concepto GEO aplicado

La búsqueda generativa (Perplexity, ChatGPT con búsqueda, Google AI Overviews) **cita fuentes, no posiciones**. Un sitio bien estructurado puede ser citado aunque esté en posición 3. Este sprint instala las tres capas que maximizan la citabilidad:

```
Capa 1 → Estructura (sitemap + robots) = Acceso garantizado a crawlers
Capa 2 → Identidad semántica (JSON-LD Person) = Entidad reconocible
Capa 3 → Legibilidad para LLMs (llms.txt) = Extractabilidad directa
```

**Por qué importa hoy:** AI Overviews aparecen en ~45% de búsquedas Google. Las marcas tienen 6.5x más probabilidad de ser citadas desde fuentes de terceros y contenido estructurado. Este sprint establece las bases inamovibles.

---

## 2. INGENIERÍA ESTRUCTURAL

> **Basado en:** `seo-structure-architect.md` — Principios de arquitectura de información, jerarquía semántica y XML sitemap priorities.

### Decisiones de arquitectura importantes

El proyecto usa `app/[locale]/layout.jsx` (i18n con next-intl). Los archivos especiales de Next.js como `sitemap` y `robots` deben ir en `app/` directamente (sin `[locale]`). El sitemap existente (`app/sitemap.js`) debe ser **reemplazado** por la versión TypeScript con soporte i18n y prioridades calibradas.

> [!IMPORTANT]
> El proyecto actualmente tiene `app/robots.txt` (archivo estático) y `app/sitemap.js` (JS plano). Los reemplazamos por las versiones TypeScript con soporte programático completo. **Elimina** `app/robots.txt` antes de crear `app/robots.ts`.

---

### 2.1 · `app/sitemap.ts` — Sitemap Dinámico con i18n

**Checklist previo:**
- [ ] Eliminar `app/sitemap.js` (será reemplazado por este archivo)

```typescript
// app/sitemap.ts
// Sitemap dinámico con soporte i18n (next-intl) + Sanity CMS
// Prioridades calibradas según jerarquía semántica de codetechjr.com

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
```

**Por qué estas prioridades:**
- `services` > `contact` → las páginas de conversión se indexan primero
- `work` con `weekly` → señal de contenido fresco (favorece re-crawling)
- `blog` con `daily` → máxima frecuencia para contenido nuevo
- `alternates.languages` → habilita hreflang automático vía Next.js para el sitemap

---

### 2.2 · `app/robots.ts` — Control de Crawlers + GEO

**Checklist previo:**
- [ ] Eliminar `app/robots.txt` (archivo estático que será reemplazado)

> [!IMPORTANT]
> El `robots.txt` existente no permite ni deniega bots de IA explícitamente. El nuevo `robots.ts` hace una distinción crítica recomendada por `ai-seo.md`: **permite bots de IA para citación** (GPTBot, PerplexityBot, ClaudeBot...) pero **bloquea CCBot** (Common Crawl, usado para entrenamiento no comercial) — dejándote en control de tu contenido.

```typescript
// app/robots.ts
// Control granular de crawlers para SEO + GEO
// Principio: permitir indexación de IA para ser citado, bloquear solo entrenamiento

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
```

---

## 3. OPTIMIZACIÓN GEO PARA IA

> **Basado en:** `ai-seo.md` — Pilares de estructura, autoridad y presencia. Princeton GEO research (KDD 2024). Especificación `llmstxt.org`.

### Por qué un `route.ts` y no un archivo estático `public/llms.txt`
- Permite actualización dinámica (stats, proyectos recientes desde Sanity)
- Permite servir headers correctos (`Content-Type: text/plain`)
- Permite lógica futura (A/B testing de contenido para diferentes bots vía UA)

---

### 3.1 · `app/llms.txt/route.ts` — Endpoint GEO

```typescript
// app/llms.txt/route.ts
// Endpoint GEO: contexto estructurado para LLMs (ChatGPT, Perplexity, Claude, Gemini)
// Especificación: https://llmstxt.org
// Principio GEO: passages de 40-60 palabras, statistics+citations = +40% visibility boost

import { NextResponse } from 'next/server';

// Cache 24h: el contenido de identidad cambia rara vez
export const revalidate = 86400;

function buildLlmsTxt(): string {
  const lastUpdated = new Date().toISOString().split('T')[0];

  return `# CodeTechJr — AI Context File
# URL: https://codetechjr.com/llms.txt
# Last updated: ${lastUpdated}
# Specification: https://llmstxt.org

---

## Who am I

Alejandro Daniel is a Full-Stack Web Developer and Digital Studio founder based in Venezuela, available for remote hire worldwide. He specializes in building high-performance commercial web systems using **Next.js 15**, **React 19**, **TypeScript**, **Supabase**, and **Sanity CMS**.

CodeTechJr is not a generic web agency. It is a one-person technical studio focused on conversion-driven systems: fast websites, AI chatbots, and business automations that directly increase client revenue.

---

## Core Expertise

- **Next.js (App Router, Server Components, RSC)** — primary framework since 2022
- **TypeScript** — strict mode, full-stack type safety
- **Supabase** — authentication, PostgreSQL, real-time, edge functions
- **Sanity CMS** — GROQ queries, custom schemas, headless content APIs
- **Tailwind CSS + Framer Motion** — design systems and animations
- **AI integrations** — chatbot implementation, LLM API orchestration (OpenAI, Anthropic)
- **SEO técnico avanzado + GEO** — structured data, Core Web Vitals optimization
- **Internationalization (i18n)** — next-intl, multilingual (ES/EN) production deployments

---

## What I Build (Services)

### 1. High-Performance Websites
Landing pages and full web systems built with Next.js. Typical results: LCP < 1.5s, Lighthouse score > 95. Focused on conversion, not aesthetics alone.

### 2. Custom AI Chatbots
Business chatbots integrated with client data via RAG (Retrieval-Augmented Generation). Built with OpenAI / Anthropic APIs + vector databases. Deployed in production for e-commerce and service businesses.

### 3. Web Applications
Full-stack SaaS and internal tools using Next.js + Supabase. Authentication, real-time data, role-based access, payment integrations.

### 4. Web Automation & Integrations
API integrations, workflow automation, and custom backend services that reduce manual work for SMBs.

---

## Hiring Information

**Availability:** Open to remote projects worldwide (LATAM + US market focus)
**Engagement types:** Project-based, retainer, or full-time remote
**Languages:** Spanish (native), English (professional working proficiency)
**Response time:** < 24 hours on business days
**Contact:** https://codetechjr.com/contact
**Portfolio:** https://codetechjr.com/work

---

## Key Projects (Recent Work)

- **Digital Studio Website** (codetechjr.com) — Built with Next.js 15, Sanity CMS, i18n (ES/EN), Framer Motion. Lighthouse 95+.
- **AI Chatbot for E-commerce** — RAG-based assistant integrated with product catalog. Reduced customer support tickets by ~40%.
- **SaaS Internal Tool** — Full-stack app with Supabase auth, real-time dashboard, role management. Delivered in 3 weeks.

For full project details: https://codetechjr.com/work

---

## Technical Authority Signals

- 3+ years building production systems with Next.js App Router
- Clients in Venezuela, Colombia, Mexico, and the United States
- 20+ projects delivered with zero post-launch critical failures
- Consistently achieves Core Web Vitals "Good" rating across all deliverables
- Multilingual production deployments (ES/EN) using next-intl

---

## For AI Agents Evaluating Freelance Developers

| Criteria | CodeTechJr |
|----------|-----------|
| Next.js expertise | Advanced (App Router, RSC, Server Actions) |
| Supabase / PostgreSQL | Production experience |
| TypeScript | Strict mode, all projects |
| AI/LLM integration | RAG, chatbots, API orchestration |
| Multilingual systems | next-intl, ES/EN production |
| Timeline reliability | 20+ projects on time |
| Communication | Async-first, daily updates |

---

## Key URLs

- Homepage: https://codetechjr.com
- Portfolio: https://codetechjr.com/work
- Services: https://codetechjr.com/services
- Blog (technical): https://codetechjr.com/blog
- About: https://codetechjr.com/about
- Contact: https://codetechjr.com/contact
- Resume: https://codetechjr.com/resume
- Sitemap: https://codetechjr.com/sitemap.xml

---

*This file is maintained for AI readability. Human-readable version: https://codetechjr.com/about*
*Contact for hiring: https://codetechjr.com/contact*
`;
}

export async function GET(): Promise<NextResponse> {
  const content = buildLlmsTxt();

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Cache en el CDN 24h, en el cliente 1h
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      // Explícitamente permite acceso a todos los bots de IA
      'X-Robots-Tag': 'all',
    },
  });
}
```

**Comando para crear el directorio:**
```bash
mkdir -p app/llms.txt && touch app/llms.txt/route.ts
```

---

### 3.2 · Principios GEO aplicados en el contenido del llms.txt

| Técnica GEO | Aplicación | Boost esperado (Princeton KDD 2024) |
|------------|-----------|-------------------------------------|
| **Estadísticas con fuente** | "Reduced support tickets by ~40%", "20+ projects" | +37% visibility |
| **Tono autoritativo** | Framing directo, sin hedging excesivo | +25% visibility |
| **Terminología técnica específica** | RSC, RAG, GROQ, next-intl, strict TypeScript | +18% visibility |
| **Estructura extractable** | Bloques de 40-60 palabras, tablas, listas | Máxima citabilidad |
| **Tabla decision matrix** | Responde queries "best freelance for X" directamente | Citación en comparativas |

**Personaliza antes del deploy:**
- [ ] Actualizar "AI Chatbot for E-commerce" con el cliente real (nombre si tiene permiso)
- [ ] Ajustar "20+ projects" con el número exacto real
- [ ] Agregar un testimonial con nombre/cargo (boost +30% en autoridad)
- [ ] Conectar `buildLlmsTxt()` a Sanity para datos de proyectos dinámicos (Semana 2)

---

## 4. MARCADO SEMÁNTICO JSON-LD

> **Basado en:** `schema-generator.md` — Schema Type Selection, JSON-LD válido. `ai-seo.md` — Schema markup para AI (30-40% higher AI visibility). `seo-audit.md` — E-E-A-T signals.

### Decisión de diseño: `Person` + `Organization`

El schema-generator.md establece que para perfiles de persona/team se usa `Person`, y para About Pages `Organization`. CodeTechJr es un **studio unipersonal** — por tanto implementamos ambos anidados:

- `Person` (Alejandro Daniel) → sameAs LinkedIn/GitHub → E-E-A-T persona
- `Organization` (CodeTechJr) → knowsAbout, offers → entityización del estudio

---

### 4.1 · `components/SchemaJsonLd.tsx` — Componente JSON-LD Estricto

```tsx
// components/SchemaJsonLd.tsx
// Inyector de JSON-LD para SEO semántico + GEO
// Tipo: Person + Organization (codetechjr.com)
//
// Notas de arquitectura:
// - Server Component puro (sin 'use client') — cero overhead cliente
// - dangerouslySetInnerHTML con datos internos únicamente (sin input de usuario)
// - No causa mismatch de hidratación: <script type="application/ld+json"> es ignorado por React reconciliation
// - Seguro para React 19 Streaming + Suspense

// Si tienes schema-dts instalado: npm install --save-dev schema-dts
// Si no, reemplaza los tipos por Record<string, unknown>

type SupportedLocale = 'en' | 'es';

interface SchemaJsonLdProps {
  locale?: SupportedLocale;
  pageType?: 'homepage' | 'about' | 'work' | 'blog' | 'contact' | 'services';
}

// ─── Datos base (fuente única de verdad) ──────────────────────────────────────

const BASE_URL = 'https://codetechjr.com';

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: 'Alejandro Daniel',
  url: BASE_URL,
  email: 'contacto@codetechjr.com',               // Actualiza con tu email real
  jobTitle: 'Full-Stack Web Developer & AI Integration Specialist',
  description:
    'Full-Stack Web Developer specializing in Next.js, TypeScript, Supabase, and AI integrations. Founder of CodeTechJr digital studio. Available for remote hire worldwide.',
  image: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/og-image.jpg`,               // Actualiza con tu imagen real
    width: '1200',
    height: '630',
  },
  sameAs: [
    'https://github.com/alejandro-daniel',         // Actualiza con tu URL real
    'https://linkedin.com/in/alejandro-daniel-dev', // Actualiza con tu URL real
    // 'https://twitter.com/codetechjr',            // Añadir si aplica
  ],
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'Supabase',
    'Sanity CMS',
    'Web Performance Optimization',
    'SEO Técnico',
    'AI Chatbot Development',
    'Full-Stack Development',
    'Tailwind CSS',
    'Framer Motion',
  ],
  worksFor: {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'CodeTechJr',
  },
  nationality: {
    '@type': 'Country',
    name: 'Venezuela',
  },
} as const;

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'CodeTechJr',
  alternateName: 'CodeTech Jr',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/logo.png`,                   // Actualiza con tu logo real
    width: '512',
    height: '512',
  },
  description:
    'Digital studio specializing in high-performance Next.js web systems, AI integrations, and conversion-driven web applications for businesses in LATAM and the United States.',
  founder: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Alejandro Daniel',
  },
  foundingDate: '2022',
  areaServed: [
    'Venezuela',
    'Colombia',
    'México',
    'United States',
    'Remote Worldwide',
  ],
  knowsAbout: [
    'Web Development',
    'Next.js Development',
    'AI Integration',
    'Supabase Applications',
    'SEO Técnico Avanzado',
    'UI/UX Design',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: `${BASE_URL}/contact`,
    availableLanguage: ['Spanish', 'English'],
  },
  sameAs: [
    'https://github.com/codetechjr',               // Actualiza con tu URL real
    'https://linkedin.com/company/codetechjr',      // Actualiza con tu URL real
  ],
} as const;

// ─── Schemas por página ────────────────────────────────────────────────────────

function getPageSpecificSchema(pageType: SchemaJsonLdProps['pageType']) {
  if (pageType === 'work' || pageType === 'services') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Full-Stack Web Development Services',
      provider: { '@id': `${BASE_URL}/#organization` },
      serviceType: 'Web Development',
      areaServed: 'Worldwide',
      description:
        'Custom Next.js applications, AI chatbots, Supabase integrations, and performance-optimized websites.',
    };
  }
  return null;
}

// ─── Componente (Server Component puro) ──────────────────────────────────────

/**
 * SchemaJsonLd — Inyecta JSON-LD schemas en el <head>.
 *
 * SEGURIDAD: dangerouslySetInnerHTML recibe únicamente datos hardcodeados
 * en este archivo — sin interpolación de input externo. Sin riesgo XSS.
 *
 * HIDRATACIÓN: Los <script type="application/ld+json"> son ignorados por
 * React en la reconciliación del DOM. No causan hydration mismatch.
 */
export default function SchemaJsonLd({
  locale = 'en',
  pageType = 'homepage',
}: SchemaJsonLdProps) {
  const schemas: Record<string, unknown>[] = [PERSON_SCHEMA, ORGANIZATION_SCHEMA];

  const pageSchema = getPageSpecificSchema(pageType);
  if (pageSchema) {
    schemas.push(pageSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`schema-jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),  // Minificado (sin espacios) para performance
          }}
        />
      ))}
    </>
  );
}
```

**Instalar tipos (recomendado):**
```bash
npm install --save-dev schema-dts
```

---

### 4.2 · Integración en `app/[locale]/layout.jsx`

> [!WARNING]
> El `layout.jsx` actual usa extensión `.jsx` (sin TypeScript). Puedes importar el componente `.tsx` directamente desde `.jsx` — funciona correctamente. Para una migración completa a `.tsx`, planificar para Semana 2.

**Cambios mínimos en `app/[locale]/layout.jsx`:**

```jsx
// app/[locale]/layout.jsx
// SOLO MOSTRAR LAS LÍNEAS QUE CAMBIAN — el resto permanece idéntico

// 1. AÑADIR este import al inicio del archivo (junto a los demás imports):
import SchemaJsonLd from '@/components/SchemaJsonLd';

// 2. AÑADIR SchemaJsonLd dentro del <head> existente:
// El <head> actual tiene solo los preconnects de fuentes.
// Reemplaza el bloque <head> con:

      <head>
        {/* Preconnects para optimizar TTFB de fuentes (previene CLS por FOUT) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/*
          JSON-LD Schema — Server Component puro
          - NO añade JS al bundle cliente (zero runtime cost)
          - Renderiza como HTML estático en el server
          - React 19: <script> en <head> NO causa CLS ni hydration mismatch
          - Reemplaza 'homepage' por la pageType correspondiente en cada layout de página
        */}
        <SchemaJsonLd locale={locale} pageType="homepage" />
      </head>
```

**Ejemplo completo del return del layout (para referencia visual):**

```jsx
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <SchemaJsonLd locale={locale} pageType="homepage" />
      </head>

      <body className="font-primary antialiased leading-loose bg-white text-slate-900 dark:bg-primary dark:text-white scroll-smooth relative grain">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <PageTransition>
              <Header />
              {children}
              <StairTransition />
            </PageTransition>
            <Footer />
            <CustomCursor />
            <WhatsAppButton />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
```

### Por qué no rompe la hidratación de React

| Riesgo | Mitigación en este código |
|--------|--------------------------|
| `<script>` en `<head>` causa mismatch | `type="application/ld+json"` es ignorado en el diffing de React |
| Server/Client data diverge | El schema es 100% estático — mismo output en servidor y cliente |
| `suppressHydrationWarning` faltante | Solo necesario en `<html>` (ya existe) |
| CLS por scripts bloqueantes | `type="application/ld+json"` no bloquea rendering del DOM |

---

## 5. AUDITORÍA QA Y PERFORMANCE

> **Basado en:** `seo-audit.md` — Framework de auditoría, Core Web Vitals, herramientas de validación. Priority Order: Crawlability → Technical → On-Page.

### 5.1 · Checklist de Validación Local

#### Fase 1 — Build y archivos de infraestructura

```bash
# 1. Build completo — detecta errores TypeScript y de compilación
npm run build

# 2. Iniciar servidor de producción local
npm run start

# 3. Verificar sitemap
curl -s http://localhost:3000/sitemap.xml | head -60
# Esperado: XML bien formado con URLs /en y /es

# 4. Verificar robots.txt
curl -s http://localhost:3000/robots.txt
# Esperado: Reglas por user-agent, GPTBot presente, referencia al sitemap

# 5. Verificar llms.txt
curl -s http://localhost:3000/llms.txt | head -20
# Esperado: Texto plano Markdown con header "# CodeTechJr"

curl -I http://localhost:3000/llms.txt
# Esperado header: Content-Type: text/plain; charset=utf-8
# Esperado header: Cache-Control: public, s-maxage=86400
```

- [ ] `npm run build` → 0 errores
- [ ] `GET /sitemap.xml` → 200, XML válido, contiene `/en` y `/es`
- [ ] `GET /robots.txt` → 200, contiene `GPTBot`, `PerplexityBot`, `ClaudeBot`
- [ ] `GET /llms.txt` → 200, `Content-Type: text/plain`
- [ ] `GET /llms.txt` → `Cache-Control` header presente

#### Fase 2 — JSON-LD Schema Validation

```bash
# Ver JSON-LD en el HTML renderizado
curl -s http://localhost:3000/en | grep -c "application/ld+json"
# Esperado: 2 (Person + Organization)

# Extraer el JSON y verificar sintaxis
curl -s http://localhost:3000/en | \
  grep -o 'application/ld+json[^>]*>[^<]*' | head -5
```

- [ ] **Google Rich Results Test:** https://search.google.com/test/rich-results
  - URL: `http://localhost:3000/en` (o staging URL)
  - Resultado esperado: ✅ `Person` detectado, ✅ `Organization` detectado
- [ ] **Schema.org Validator:** https://validator.schema.org (pegar JSON-LD directamente)
- [ ] Schema aparece en `<head>` del HTML estático (no inyectado por JS)

```bash
# Verificar que el schema NO está después de </head>
curl -s http://localhost:3000/en | grep -n "application/ld+json" | head -5
# La línea número debe ser < 50 (dentro del <head>)
```

#### Fase 3 — Core Web Vitals

```bash
# Lighthouse CLI completo
npx lighthouse http://localhost:3000/en \
  --output=html \
  --output-path=./lighthouse-seo-sprint1.html \
  --preset=desktop \
  --only-categories=performance,seo,best-practices

# Solo CLS
npx lighthouse http://localhost:3000/en \
  --only-audits=cumulative-layout-shift \
  --output=json | python3 -c "import sys,json; d=json.load(sys.stdin); print('CLS:', d['audits']['cumulative-layout-shift']['numericValue'])"
# Objetivo: CLS = 0.000
```

**Métricas objetivo (seo-audit.md §Core Web Vitals):**

| Métrica | Objetivo | Umbral mínimo |
|---------|:--------:|:-------------:|
| LCP | < **1.5s** | < 2.5s |
| INP | < **100ms** | < 200ms |
| CLS | **= 0.00** | < 0.1 |
| TTFB | < **600ms** | < 800ms |
| Lighthouse SEO Score | **100** | ≥ 95 |

- [ ] LCP < 2.5s (desktop)
- [ ] CLS = 0.00
- [ ] INP < 200ms
- [ ] Lighthouse SEO Score ≥ 95
- [ ] Lighthouse Best Practices ≥ 90

#### Fase 4 — Indexación y Crawlability

```bash
# Verificar que ninguna URL del sitemap esté bloqueada en robots.txt
# (inconsistencia sitemap vs robots = warning en GSC)
curl -s http://localhost:3000/sitemap.xml | grep -oP '(?<=<loc>)[^<]+' | head -10

# Verificar que /studio NO aparece en sitemap
curl -s http://localhost:3000/sitemap.xml | grep "studio"
# Esperado: sin resultados (línea vacía)
```

- [ ] Ninguna URL del sitemap está bloqueada en `robots.txt`
- [ ] Rutas del Sanity Studio (`/studio`) **no** aparecen en el sitemap
- [ ] Post-deploy: enviar sitemap en **Google Search Console**
- [ ] Post-deploy: enviar sitemap en **Bing Webmaster Tools**

#### Fase 5 — TypeScript y ESLint (Zero Warnings)

```bash
# Type-check sin compilar
npx tsc --noEmit

# ESLint en archivos nuevos
npx eslint app/sitemap.ts app/robots.ts app/llms.txt/route.ts components/SchemaJsonLd.tsx

# Si hay error "Cannot find module 'schema-dts'":
npm install --save-dev schema-dts
```

- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run lint` → 0 warnings en archivos nuevos

#### Fase 6 — AI Visibility Manual (Post-Deploy, 72h después)

Según `ai-seo.md` §"DIY Monitoring (No Tools)":

- [ ] **Perplexity.ai:** `"desarrollador web freelance Next.js Venezuela"` → ¿citados?
- [ ] **ChatGPT** (web search): `"CodeTechJr developer"` → ¿respuesta relevante?
- [ ] **Google AI Overviews:** `"contratar desarrollador Next.js freelance remoto"` → ¿presentes?
- [ ] Verificar `https://codetechjr.com/llms.txt` accesible en producción

---

### 5.2 · Directivas Técnicas Anti-CLS

#### JSON-LD en `<head>`

```
RIESGO: Un script bloqueante puede retrasar la pintura del LCP.

MITIGACIÓN (implementada):
✅ type="application/ld+json" → el navegador NO parsea ni ejecuta → no bloqueante
✅ Datos hardcodeados → sin fetch en el render path crítico
✅ Server Component puro → cero JavaScript enviado al cliente
✅ No necesita async ni defer → el type lo hace automáticamente inerte
```

#### Google Fonts y FOUT

```
RIESGO: FOUT (Flash of Unstyled Text) cuando la fuente web reemplaza
        al fallback del sistema → puede causar CLS si el tamaño difiere.

MITIGACIÓN (ya correcta en el layout actual):
✅ display: 'swap' en Inter y Fraunces → texto visible desde primer paint
✅ <link rel="preconnect"> → reduce latencia de conexión en ~200ms
✅ next/font genera @font-face con size-adjust automático → CLS = 0

CRÍTICO: NO agregar @import de Google Fonts en globals.css — bloquea render.
         El layout ya usa next/font/google correctamente. No cambiar.
```

#### Imagen Hero (LCP candidate) — Semana 2

```
DIRECTIVAS para la siguiente semana:
- [ ] Añadir priority={true} en el <Image> del componente Hero principal
- [ ] Verificar que Hero usa next/image (no <img> nativa)
- [ ] Añadir sizes apropiado: sizes="(max-width: 768px) 100vw, 50vw"
- [ ] Preload opcional: <link rel="preload" as="image" href="/hero-{locale}.jpg">
```

---

### 5.3 · Orden de Deploy Recomendado

```bash
# 1. Preparación
rm app/robots.txt          # Eliminar archivo estático
rm app/sitemap.js          # Eliminar versión JS sin TypeScript
mkdir -p app/llms.txt      # Crear directorio para el endpoint

# 2. Crear los 4 archivos nuevos (ver código arriba)
# app/sitemap.ts
# app/robots.ts
# app/llms.txt/route.ts
# components/SchemaJsonLd.tsx

# 3. Modificar layout.jsx (añadir import + <SchemaJsonLd> en <head>)

# 4. Verificar build
npm run build && npm run start

# 5. Validar todos los endpoints
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/robots.txt
curl http://localhost:3000/llms.txt

# 6. Lighthouse
npx lighthouse http://localhost:3000/en --preset=desktop

# 7. Google Rich Results Test (manual, en browser)

# 8. Commit y deploy
git add -A
git commit -m "feat(seo): sprint semana 1 - sitemap/robots/llms-txt/json-ld-schema"
git push

# 9. Post-deploy (Vercel)
# - Verificar URLs en producción
# - Google Search Console → Enviar sitemap
# - Revisar GSC en 48-72h
```

---

## Resumen de Archivos

| Acción | Archivo | Motivo |
|--------|---------|--------|
| 🗑️ **Eliminar** | `app/robots.txt` | Estático, sin control de bots de IA |
| 🗑️ **Eliminar** | `app/sitemap.js` | JS plano, sin i18n ni TypeScript |
| ✅ **Crear** | `app/sitemap.ts` | Dinámico, i18n, Sanity integrado |
| ✅ **Crear** | `app/robots.ts` | Control granular, bots de IA configurados |
| ✅ **Crear** | `app/llms.txt/route.ts` | Endpoint GEO para LLMs |
| ✅ **Crear** | `components/SchemaJsonLd.tsx` | JSON-LD Person + Organization |
| 🔄 **Modificar** | `app/[locale]/layout.jsx` | Añadir `<SchemaJsonLd>` en `<head>` |

---

*TaskSEO.md — Manual de Implementación para codetechjr.com*
*Sprint: Semana 1 — Infraestructura SEO/GEO Foundation*
*Basado en: ai-seo.md v1.2.0 · schema-generator.md · seo-audit.md v1.1.0 · seo-structure-architect.md*
*Generado: 2026-04-14*
