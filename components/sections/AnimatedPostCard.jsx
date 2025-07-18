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
  FaTag
} from 'react-icons/fa';

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
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`group overflow-hidden rounded-lg border border-[#003B8D] transition-all duration-300 hover:border-[#00C6FF] hover:shadow-xl hover:shadow-[#00C6FF]/10 ${isFeatured ? 'bg-[#1B1F3B]' : 'bg-[#0C0C2C]'}`}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden">
          {post.mainImage ? (
            <motion.div variants={imageVariants}>
              <Image
                src={urlFor(post.mainImage).width(600).height(400).url()}
                alt={`Imagen de portada para ${post.title}`}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
            </motion.div>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-[#1B1F3B] to-[#003B8D] flex items-center justify-center">
              <span className="text-[#A3A8CC] text-lg">Sin imagen</span>
            </div>
          )}
          
          {/* Badge de categoría */}
          {post.categories && post.categories.length > 0 && (
            <motion.div 
              className="absolute top-4 left-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="px-3 py-1 bg-[#00C6FF] text-[#0C0C2C] text-xs font-semibold rounded-full">
                {post.categories[0]}
              </span>
            </motion.div>
          )}
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div 
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
            </motion.div>
          )}
          
          {/* Badge de resultado de búsqueda */}
          {isSearchResult && post.matchType && (
            <motion.div 
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
            </motion.div>
          )}
        </div>
        
        <div className="p-6">
          <motion.h2 
            className="text-xl font-bold text-[#00C6FF] mb-3 group-hover:text-white transition-colors line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {post.title}
          </motion.h2>
          
          <motion.div 
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
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-between text-sm text-[#A3A8CC]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <FaUser className="w-3 h-3" />
                <span>{post.authorName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaCalendar className="w-3 h-3" />
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
                <FaClock className="w-3 h-3" />
                <span>{post.estimatedReadingTime} min</span>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            className="mt-4 flex items-center text-[#00C6FF] group-hover:text-white transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-sm font-medium">Leer más</span>
            <motion.div
              className="ml-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <FaArrowRight className="w-3 h-3" />
            </motion.div>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
} 