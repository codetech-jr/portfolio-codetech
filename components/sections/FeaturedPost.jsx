"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { 
  FaCalendar, 
  FaUser, 
  FaClock, 
  FaArrowRight,
  FaStar,
  FaTag
} from 'react-icons/fa';

export default function FeaturedPost({ post, className = "" }) {
  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-xl border border-[#00C6FF] bg-gradient-to-br from-[#1B1F3B] to-[#0C0C2C] ${className}`}
    >
      {/* Badge de destacado */}
      <motion.div
        className="absolute top-4 left-4 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-[#00C6FF] to-[#FF6B6B] text-white text-sm font-bold rounded-full">
          <FaStar className="w-3 h-3" />
          <span>DESTACADO</span>
        </div>
      </motion.div>

      <Link href={`/blog/${post.slug}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Imagen */}
          <motion.div 
            className="relative overflow-hidden h-64 lg:h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage).width(800).height(600).url()}
                alt={`Imagen destacada para ${post.title}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1B1F3B] to-[#003B8D] flex items-center justify-center">
                <span className="text-[#A3A8CC] text-lg">Sin imagen</span>
              </div>
            )}
            
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>

          {/* Contenido */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Categoría */}
              {post.categories && post.categories.length > 0 && (
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="px-4 py-2 bg-[#00C6FF] text-[#0C0C2C] text-sm font-semibold rounded-full">
                    {post.categories[0]}
                  </span>
                </motion.div>
              )}

              {/* Título */}
              <motion.h2 
                className="text-3xl lg:text-4xl font-bold text-[#00C6FF] mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {post.title}
              </motion.h2>

              {/* Extracto */}
              <motion.p 
                className="text-[#A3A8CC] text-lg mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {post.excerpt}
              </motion.p>

              {/* Meta información */}
              <motion.div 
                className="flex flex-wrap items-center gap-4 text-sm text-[#A3A8CC] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <FaUser className="w-4 h-4" />
                  <span>{post.authorName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendar className="w-4 h-4" />
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
                    <FaClock className="w-4 h-4" />
                    <span>{post.estimatedReadingTime} min</span>
                  </div>
                )}
              </motion.div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="flex items-center space-x-2 text-[#A3A8CC]">
                    <FaTag className="w-3 h-3" />
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
                </motion.div>
              )}

              {/* Call to action */}
              <motion.div 
                className="flex items-center text-[#00C6FF] font-semibold group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ x: 10 }}
              >
                <span className="text-lg">Leer artículo completo</span>
                <motion.div
                  className="ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 