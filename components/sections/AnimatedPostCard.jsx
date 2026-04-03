"use client";

import Motion from '../ui/Motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
// inline SVGs used instead of react-icons to avoid large icon bundles

export default function AnimatedPostCard({ post, isFeatured = false, isSearchResult = false, index = 0 }) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Motion as="article"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`group overflow-hidden rounded-lg border border-[#003B8D] transition-all duration-300 hover:border-[#00C6FF] hover:shadow-xl hover:shadow-[#00C6FF]/10 ${isFeatured ? 'bg-[#1B1F3B]' : 'bg-[#0C0C2C]'}`}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden">
          {post.mainImage ? (
            <Motion as="div" variants={imageVariants}>
              <Image
                src={urlFor(post.mainImage).width(600).height(400).url()}
                alt={`Imagen de portada para ${post.title}`}
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-48 object-cover"
              />
            </Motion>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-[#1B1F3B] to-[#003B8D] flex items-center justify-center">
              <span className="text-[#A3A8CC] text-lg">Sin imagen</span>
            </div>
          )}
          
          {/* Badge de categoría */}
          {post.categories && post.categories.length > 0 && (
            <Motion as="div" 
              className="absolute top-4 left-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="px-3 py-1 bg-[#00C6FF] text-[#0C0C2C] text-xs font-semibold rounded-full">
                {post.categories[0]}
              </span>
            </Motion>
          )}
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <Motion as="div" 
              className="absolute bottom-4 left-4 flex flex-wrap gap-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
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
          
          {/* Badge de resultado de búsqueda */}
          {isSearchResult && post.matchType && (
            <Motion as="div" 
              className="absolute top-4 right-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                post.matchType === 'title' ? 'bg-green-500 text-white' :
                post.matchType === 'excerpt' ? 'bg-yellow-500 text-black' :
                'bg-blue-500 text-white'
              }`}>
                {post.matchType === 'title' ? 'Título' :
                 post.matchType === 'excerpt' ? 'Extracto' : 'Contenido'}
              </span>
            </Motion>
          )}
        </div>
        
        <div className="p-6">
          <Motion as="h2"
            className="text-xl font-bold text-[#00C6FF] mb-3 group-hover:text-white transition-colors line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {post.title}
          </Motion>
          
          <Motion as="div"
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isSearchResult && post.highlightedExcerpt ? (
              <div 
                className="text-[#A3A8CC] line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.highlightedExcerpt }}
              />
            ) : (
              <p className="text-[#A3A8CC] line-clamp-3">
                {post.excerpt}
              </p>
            )}
            </Motion>
          
          <Motion as="div"
            className="flex items-center justify-between text-sm text-[#A3A8CC]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor" />
                  <path d="M4 20c0-2.67 5.33-4 8-4s8 1.33 8 4v1H4v-1z" fill="currentColor" />
                </svg>
                <span>{post.authorName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M16 2v4M8 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
            
            {post.estimatedReadingTime && (
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{post.estimatedReadingTime} min</span>
              </div>
            )}
          </Motion>
          
          <Motion as="div"
            className="mt-4 flex items-center text-[#00C6FF] group-hover:text-white transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-sm font-medium">Leer más</span>
              <Motion as="div"
              className="ml-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M5 12h14M13 5l6 7-6 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Motion>
          </Motion>
        </div>
      </Link>
    </Motion>
  );
} 