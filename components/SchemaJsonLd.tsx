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
