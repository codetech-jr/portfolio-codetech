"use client";

import Motion from '../ui/Motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
// Inline SVGs used instead of react-icons to reduce bundle size

export default function FeaturedPost({ post, className = "" }) {
  if (!post) return null;

  return (
    <Motion as="div"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-xl border border-[#00C6FF] bg-gradient-to-br from-[#1B1F3B] to-[#0C0C2C] ${className}`}
    >
      {/* Badge de destacado */}
      <Motion as="div"
        className="absolute z-10 top-4 left-4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-[#00C6FF] to-[#FF6B6B] text-white text-sm font-bold rounded-full">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.76L6.82 21z" />
          </svg>
          <span>DESTACADO</span>
        </div>
      </Motion>

      <Link href={`/blog/${post.slug}`}>
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          {/* Imagen */}
          <Motion as="div" 
            className="relative h-64 overflow-hidden lg:h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage).width(800).height(600).url()}
                alt={`Imagen destacada para ${post.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1B1F3B] to-[#003B8D] flex items-center justify-center">
                <span className="text-[#A3A8CC] text-lg">Sin imagen</span>
              </div>
            )}
            
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </Motion>

          {/* Contenido */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <Motion as="div"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Categoría */}
              {post.categories && post.categories.length > 0 && (
                <Motion as="div"
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="px-4 py-2 bg-[#00C6FF] text-[#0C0C2C] text-sm font-semibold rounded-full">
                    {post.categories[0]}
                  </span>
                </Motion>
              )}

              {/* Título */}
              <Motion as="h2" 
                className="text-3xl lg:text-4xl font-bold text-[#00C6FF] mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {post.title}
              </Motion>

              {/* Extracto */}
              <Motion as="p" 
                className="text-[#A3A8CC] text-lg mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {post.excerpt}
              </Motion>

              {/* Meta información */}
              <Motion as="div" 
                className="flex flex-wrap items-center gap-4 text-sm text-[#A3A8CC] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor" />
                    <path d="M4 20c0-2.67 5.33-4 8-4s8 1.33 8 4v1H4v-1z" fill="currentColor" />
                  </svg>
                  <span>{post.authorName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M16 2v4M8 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                {post.estimatedReadingTime && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{post.estimatedReadingTime} min</span>
                  </div>
                )}
              </Motion>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <Motion as="div" 
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="flex items-center space-x-2 text-[#A3A8CC]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M20.59 13.41L13.41 20.59a2 2 0 01-2.83 0L3.41 13.41a2 2 0 010-2.83L10.59 3.41a2 2 0 012.83 0l7.17 7.17a2 2 0 010 2.83z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm">Tags:</span>
                  </div>
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        tag.color || 'bg-[#00C6FF]'
                      } text-[#0C0C2C]`}
                    >
                      {tag.title}
                    </span>
                  ))}
                </Motion>
              )}

              {/* Call to action */}
              <Motion as="div" 
                className="flex items-center text-[#00C6FF] font-semibold group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ x: 10 }}
              >
                <span className="text-lg">Leer artículo completo</span>
                <Motion as="div"
                  className="ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M5 12h14M13 5l6 7-6 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Motion>
              </Motion>
            </Motion>
          </div>
        </div>
      </Link>
    </Motion>
  );
}