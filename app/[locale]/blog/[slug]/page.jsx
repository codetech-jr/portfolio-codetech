// app/blog/[slug]/page.jsx

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import ImageWithSkeleton from '@/components/ui/ImageWithSkeleton';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// Íconos inline (reemplazo ligero por react-icons)
function IconArrowLeft({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconUser({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCalendar({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconClock({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTag({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20.59 13.41L11.17 4 4 11.17V20h8.83L20.59 13.41z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconShare({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6l-4-4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFacebook({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 2h-3a4 4 0 0 0-4 4v2H8v3h3v7h3v-7h2.5l.5-3H14V6a1 1 0 0 1 1-1h3V2z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
    </svg>
  );
}

function IconTwitter({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.83 1.08A4.52 4.52 0 0 0 16.5 0c-2.5 0-4.5 2.2-4.5 4.9 0 .38.04.75.12 1.1A12.94 12.94 0 0 1 3 1.6a4.82 4.82 0 0 0-.61 2.5c0 1.7.8 3.2 2 4.1A4.48 4.48 0 0 1 2 7.8v.06c0 2.4 1.6 4.4 3.8 4.9a4.52 4.52 0 0 1-2 .08c.56 1.8 2.2 3.1 4.1 3.2A9.06 9.06 0 0 1 1 19.5a12.8 12.8 0 0 0 7 2" stroke="currentColor" strokeWidth="0" fill="currentColor" />
    </svg>
  );
}

function IconLinkedin({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6h-4v-12h4v2" stroke="currentColor" strokeWidth="0" fill="currentColor" />
      <rect x="2" y="8" width="4" height="12" fill="currentColor" />
      <circle cx="4" cy="4" r="2" fill="currentColor" />
    </svg>
  );
}

function IconWhatsapp({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 12.1a9 9 0 1 0-2.6 6.2L21 22l-2.7-2.6A9 9 0 0 0 21 12.1z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
    </svg>
  );
}
import React from 'react'; // Added missing import for React
import TableOfContents from '@/components/sections/TableOfContents';
import Comments from '@/components/ui/Comments';
import ReadingStats from '@/components/sections/ReadingStats';

// Función para generar los metadatos dinámicos para SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    seoTitle,
    seoDescription,
    mainImage,
    seoImage,
    "authorName": author->name,
    "authorImage": author->image,
    publishedAt,
    "categories": categories[]->title,
    excerpt
  }`;
  const post = await client.fetch(query, { slug: slug });

  if (!post) {
    return { title: 'Post no encontrado' };
  }

  const pageTitle = post.seoTitle || post.title;
  const pageDescription = post.seoDescription || post.excerpt || 'Lee más sobre ' + post.title;
  const ogImage = post.seoImage ? urlFor(post.seoImage).width(1200).height(630).url() : urlFor(post.mainImage).width(1200).height(630).url();

  const domain = 'https://codetechjunior.com'; // Actualiza con tu dominio real

  return {
    title: `${pageTitle} | Blog de Codetech Junior`,
    description: pageDescription,
    keywords: post.categories ? post.categories.join(', ') : 'desarrollo web, diseño web, SEO',
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${domain}/blog/${slug}`,
      siteName: 'Blog de Codetech Junior',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: pageTitle
      }],
      locale: 'es_ES',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.authorName],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
      creator: '@codetechjunior',
    },
    alternates: {
      canonical: `${domain}/blog/${slug}`,
    },
  };
}

// Componente para los datos estructurados JSON-LD
function JsonLd({ post }) {
  const domain = 'https://codetechjunior.com';

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
      image: post.author.image ? urlFor(post.author.image).url() : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Codetech Junior - Desarrollador Freelance',
      logo: {
        '@type': 'ImageObject',
        url: `${domain}/logo.png`,
      },
      url: domain,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${domain}/blog/${post.slug.current}`,
    },
    articleSection: post.categories ? post.categories[0] : 'Desarrollo Web',
    keywords: post.categories ? post.categories.join(', ') : 'desarrollo web, diseño web, SEO',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}

// Componente para breadcrumbs
function Breadcrumbs({ post }) {
  return (
    <nav className="mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-[#A3A8CC]">
        <li>
          <Link href="/" className="hover:text-[#00C6FF] transition-colors">
            Inicio
          </Link>
        </li>
          <li className="flex items-center">
          <IconArrowLeft className="w-3 h-3 mx-2 rotate-180" />
          <Link href="/blog" className="hover:text-[#00C6FF] transition-colors">
            Blog
          </Link>
        </li>
        {post.categories && post.categories.length > 0 && (
          <>
              <li className="flex items-center">
                <IconArrowLeft className="w-3 h-3 mx-2 rotate-180" />
              <Link
                href={`/blog/category/${post.categories[0].toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-[#00C6FF] transition-colors"
              >
                {post.categories[0]}
              </Link>
            </li>
          </>
        )}
          <li className="flex items-center">
          <IconArrowLeft className="w-3 h-3 mx-2 rotate-180" />
          <span className="text-[#00C6FF] font-medium">{post.title}</span>
        </li>
      </ol>
    </nav>
  );
}

// Componente para información del autor - MODIFICADO
function AuthorInfo({ author }) {
  return (
    <div className="bg-[#1B1F3B] rounded-lg p-4 border border-[#003B8D] mb-8 w-full">
      <div className="flex flex-col space-y-4">
        {/* Imagen del autor */}
        {author.image && (
          <div className="flex justify-center">
            <Image
              src={urlFor(author.image).width(60).height(60).url()}
              alt={`Foto de ${author.name}`}
              width={60}
              height={60}
              sizes="60px"
              className="rounded-full border-2 border-[#00C6FF]"
            />
          </div>
        )}

        {/* Información del autor */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-[#00C6FF] mb-2">Sobre el autor</h3>
          <p className="mb-2 text-base font-semibold text-white">{author.name}</p>
          <p className="text-[#A3A8CC] mb-4 text-sm leading-relaxed">
            Desarrollador web freelance especializado en crear experiencias digitales excepcionales.
          </p>

          {/* Botones apilados */}
          <div className="flex flex-col space-y-2">
            <Link
              href="/contact"
              className="w-full px-3 py-2 bg-[#00C6FF] text-[#0C0C2C] rounded-lg font-semibold hover:bg-[#00C6FF]/90 transition-colors text-sm text-center"
            >
              Contratar
            </Link>
            <Link
              href="/work"
              className="w-full px-3 py-2 border border-[#00C6FF] text-[#00C6FF] rounded-lg font-semibold hover:bg-[#00C6FF] hover:text-[#0C0C2C] transition-colors text-sm text-center"
            >
              Ver Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para botones de compartir - MODIFICADO
function ShareButtons({ post }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post.title;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
  };

  return (
    <div className="bg-[#1B1F3B] rounded-lg p-4 border border-[#003B8D] mb-8 w-full">
      <h3 className="text-lg font-bold text-[#00C6FF] mb-4 flex items-center justify-center">
        <IconShare className="w-5 h-5 mr-2" />
        Compartir
      </h3>
      <div className="grid grid-cols-2 gap-2">
          <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full h-10 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-colors text-sm"
          aria-label="Compartir en Facebook"
        >
          <IconFacebook className="w-4 h-4 mr-2" />
          Facebook
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full h-10 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors text-sm"
          aria-label="Compartir en Twitter"
        >
          <IconTwitter className="w-4 h-4 mr-2" />
          Twitter
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full h-10 bg-[#0077B5] text-white rounded-lg hover:bg-[#0077B5]/90 transition-colors text-sm"
          aria-label="Compartir en LinkedIn"
        >
          <IconLinkedin className="w-4 h-4 mr-2" />
          LinkedIn
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full h-10 bg-[#25D366] text-white rounded-lg hover:bg-[#25D366]/90 transition-colors text-sm"
          aria-label="Compartir en WhatsApp"
        >
          <IconWhatsapp className="w-4 h-4 mr-2" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

// Componente para posts relacionados
function RelatedPosts({ currentPost, relatedPosts }) {
  return (
    <div className="bg-[#1B1F3B] rounded-lg p-6 border border-[#003B8D]">
      <h3 className="text-xl font-bold text-[#00C6FF] mb-6">Artículos Relacionados</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {relatedPosts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <div className="flex space-x-4">
                {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).width(120).height(80).url()}
                alt={`Imagen de ${post.title}`}
                width={120}
                height={80}
                sizes="120px"
                className="flex-shrink-0 object-cover rounded-lg"
              />
            )}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[#A3A8CC] group-hover:text-white transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-[#A3A8CC] mt-1">
                  {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
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
      body[]{ ..., 'language': coalesce(language, 'text'), 'code': code },
      publishedAt,
      _updatedAt,
      excerpt,
      seoDescription,
      "categories": categories[]->title,
      "tags": tags[]->{title, color},
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      author->{
        name,
        image
      }
    }
  `;
  const post = await client.fetch(query, { slug });
  return post;
}

// Función para obtener posts relacionados
async function getRelatedPosts(currentPostId, categories = []) {
  const query = `
    *[_type == "post" && _id != $currentPostId && count(categories[@->title in $categories]) > 0] | order(publishedAt desc)[0...4] {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt
    }
  `;
  const posts = await client.fetch(query, {
    currentPostId,
    categories: categories || []
  });
  return posts;
}

// La página del post
export default async function BlogPostPage({ params }) {
  try {
    const { slug } = await params;
    const post = await getPost(slug);
    
    if (!post) {
      return (
        <div className="min-h-screen bg-[#0C0C2C] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#00C6FF] mb-4">Post no encontrado</h1>
            <Link href="/blog" className="text-[#A3A8CC] hover:text-[#00C6FF] transition-colors">
              Volver al blog
            </Link>
          </div>
        </div>
      );
    }

    const relatedPosts = await getRelatedPosts(post._id, post.categories || []);

    // Componentes personalizados para PortableText
    const ptComponents = {
      types: {
        code: ({ value }) => {
          if (!value || !value.code) {
            return null;
          }
          return (
            <div className="my-6">
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={value.language}
                showLineNumbers
                className="rounded-lg"
              >
                {value.code.trim()}
              </SyntaxHighlighter>
            </div>
          );
        },
      },
      block: {
        normal: ({ children }) => {
          return (
            <p className="mb-6 leading-relaxed">
              {children.map((child, i) => {
                if (typeof child === 'string') {
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

    return (
      <div className="min-h-screen bg-[#0C0C2C]">
        <JsonLd post={post} />

        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumbs post={post} />

            {/* Header del post */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-[#00C6FF] mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta información */}
              <div className="flex flex-wrap items-center gap-6 text-[#A3A8CC] mb-6">
                <div className="flex items-center space-x-2">
                  <IconUser className="w-4 h-4" />
                  <span>{post.author?.name || 'Autor desconocido'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IconCalendar className="w-4 h-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                {post.estimatedReadingTime && (
                  <div className="flex items-center space-x-2">
                    <IconClock className="w-4 h-4" />
                    <span>{post.estimatedReadingTime} min de lectura</span>
                  </div>
                )}
              </div>

              {/* Categorías */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-[#00C6FF] text-[#0C0C2C] text-sm font-semibold rounded-full hover:bg-[#00C6FF]/90 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="flex items-center space-x-2 text-[#A3A8CC]">
                    <IconTag className="w-4 h-4" />
                    <span className="text-sm">Tags:</span>
                  </div>
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${tag.color || 'bg-[#00C6FF]'
                        } text-[#0C0C2C]`}
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Imagen principal */}
            {post.mainImage && (
              <div className="mb-8">
                <ImageWithSkeleton
                  src={urlFor(post.mainImage).width(1200).height(630).url()}
                  alt={`Imagen principal para ${post.title}`}
                  width={1200}
                  height={630}
                  className="rounded-lg shadow-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}

            {/* Layout de 2 columnas - MODIFICADO */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Contenido principal */}
              <div className="lg:col-span-3">
                {/* Contenido del post */}
                <article className="prose prose-invert lg:prose-xl max-w-none prose-headings:text-[#00C6FF] prose-a:text-[#00C6FF] hover:prose-a:text-[#00C6FF]/80 prose-strong:text-white prose-code:text-[#00C6FF] prose-code:bg-[#1B1F3B] prose-code:px-2 prose-code:py-1 prose-code:rounded">
                  <PortableText value={post.body} components={ptComponents} />
                </article>

                {/* Comentarios */}
                <Comments
                  postId={post._id}
                  postSlug={post.slug}
                  className="mt-12"
                />

                {/* Call to action */}
                <div className="mt-12 bg-gradient-to-r from-[#00C6FF] to-[#003B8D] rounded-lg p-8 text-center">
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    ¿Te gustó este artículo?
                  </h3>
                  <p className="mb-6 text-white/90">
                    Si necesitas ayuda con tu proyecto web o tienes alguna pregunta,
                    no dudes en contactarme. Estoy aquí para ayudarte a crear algo increíble.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                      href="/contact"
                      className="px-8 py-3 bg-white text-[#0C0C2C] font-semibold rounded-lg hover:bg-white/90 transition-colors"
                    >
                      Contactar
                    </Link>
                    <Link
                      href="/work"
                      className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0C0C2C] transition-colors"
                    >
                      Ver Portfolio
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar - MODIFICADO */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Tabla de contenidos */}
                  <div className="w-full">
                    <TableOfContents content={post.body} />
                  </div>

                  {/* Estadísticas de lectura */}
                  <div className="w-full">
                    <ReadingStats postId={post._id} postSlug={post.slug} readingTime={post.estimatedReadingTime || 0} />
                  </div>

                  {/* Información del autor */}
                  {post.author && (
                    <AuthorInfo author={post.author} />
                  )}

                  {/* Botones de compartir */}
                  <ShareButtons post={post} />
                </div>
              </div>
            </div>

            {/* Posts relacionados */}
            {relatedPosts && relatedPosts.length > 0 && (
              <RelatedPosts currentPost={post} relatedPosts={relatedPosts} />
            )}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    return (
      <div className="min-h-screen bg-[#0C0C2C] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#00C6FF] mb-4">Error al cargar el post</h1>
          <p className="text-[#A3A8CC] mb-4">Hubo un problema al cargar este artículo.</p>
          <Link href="/blog" className="text-[#A3A8CC] hover:text-[#00C6FF] transition-colors">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }
}