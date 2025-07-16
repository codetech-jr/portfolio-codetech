// app/blog/[slug]/page.jsx

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import React from 'react'; // Added missing import for React

// Función para generar los metadatos dinámicos para SEO
export async function generateMetadata({ params }) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    seoTitle,
    seoDescription,
    mainImage,
    seoImage,
    "authorName": author->name
  }`;
  const post = await client.fetch(query, { slug: params.slug });

  if (!post) {
    return { title: 'Post no encontrado' };
  }

  const pageTitle = post.seoTitle || post.title;
  const pageDescription = post.seoDescription || 'Lee más sobre ' + post.title;
  const ogImage = post.seoImage ? urlFor(post.seoImage).width(1200).height(630).url() : urlFor(post.mainImage).width(1200).height(630).url();

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://TU-DOMINIO.com/blog/${params.slug}`, // <-- ¡REEMPLAZA ESTO!
      siteName: 'El Blog de Codetech Junior',
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: 'es_ES',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://TU-DOMINIO.com/blog/${params.slug}`, // <-- ¡REEMPLAZA ESTO!
    },
  };
}

// Componente para los datos estructurados JSON-LD
function JsonLd({ post }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: urlFor(post.mainImage).url(),
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Codetech Junior - Desarrollador Freelance', // <-- ¡REEMPLAZA ESTO!
      logo: {
        '@type': 'ImageObject',
        url: 'https://TU-DOMINIO.com/logo.png', // <-- URL a tu logo
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://TU-DOMINIO.com/blog/${post.slug.current}`, // <-- ¡REEMPLAZA ESTO!
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}

// Función para obtener los datos del post específico
async function getPost(slug) {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      mainImage,
      body,
      publishedAt,
      _updatedAt,
      excerpt,
      seoDescription,
      author->{
        name,
        image
      }
    }
  `;
  const post = await client.fetch(query, { slug });
  return post;
}

// --- COMPONENTES PERSONALIZADOS PARA PORTABLE TEXT ---
const portableTextComponents = {
  block: {
    normal: ({ children }) => {
      // Unimos los hijos y reemplazamos los saltos de línea por <br />
      return (
        <p>
          {children.map((child, i) => {
            if (typeof child === 'string') {
              // Si el texto tiene saltos de línea, los separamos y los renderizamos con <br />
              const parts = child.split(/\n/g);
              return parts.map((part, j) => (
                <React.Fragment key={j}>
                  {part}
                  {j < parts.length - 1 && <br />}
                </React.Fragment>
              ));
            }
            return child;
          })}
        </p>
      );
    },
  },
};

// La página del post
export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post no encontrado</div>;
  }

  return (
    <article className="min-h-screen bg-[#0C0C2C] text-white px-4 py-12">
        <div className="container max-w-3xl mx-auto">
            <JsonLd post={post} />

            <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl text-[#00C6FF]">{post.title}</h1>
            <div className="flex items-center mb-8 text-[#A3A8CC]">
                {post.author.image && (
                <Image
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={`Foto de ${post.author.name}`}
                    width={40}
                    height={40}
                    className="mr-4 rounded-full"
                />
                )}
                <span>Por {post.author.name}</span>
                <span className="mx-2">•</span>
                <span>
                {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric', month: 'long', day: 'numeric'
                })}
                </span>
            </div>
            
            {post.mainImage && (
                <Image
                src={urlFor(post.mainImage).width(1200).height(630).url()}
                alt={`Imagen principal para ${post.title}`}
                width={1200}
                height={630}
                className="w-full mb-8 rounded-lg"
                priority
                />
            )}

            {/* --- CONTENEDOR DE ESTILOS PARA EL CONTENIDO DEL POST --- */}
            <div className="prose prose-invert lg:prose-xl max-w-none blog-content prose-headings:text-[#00C6FF] prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-p:my-6">
                <PortableText value={post.body} components={portableTextComponents} />
            </div>
        </div>
    </article>
  );
}