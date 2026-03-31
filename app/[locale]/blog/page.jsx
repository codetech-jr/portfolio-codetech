"use client";

import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { 
  FaSearch, 
  FaCalendar, 
  FaUser, 
  FaClock, 
  FaArrowRight,
  FaSpinner,
  FaTimes,
  FaTag
} from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import AdvancedFilters from '@/components/sections/AdvancedFilters';
import SearchAutocomplete from '@/components/sections/SearchAutocomplete';
import AnimatedPostCard from '@/components/sections/AnimatedPostCard';
import FeaturedPost from '@/components/sections/FeaturedPost';
import { getCategories, getTags, getFilteredPosts } from '@/lib/sanityQueries';
import React from 'react';

// Función para obtener posts populares (los más recientes por ahora)
async function getPopularPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      "authorName": author->name
    }
  `;
  const posts = await client.fetch(query);
  return posts;
}

// Componente para el header del blog
function BlogHeader({ searchQuery, onSearchChange, onClearSearch, isSearching }) {
  return (
    <header className="bg-gradient-to-r from-[#0C0C2C] to-[#1B1F3B] border-b border-[#003B8D] py-8">
      <div className="container flex flex-col items-center px-4 mx-auto">
        <h1 className="text-5xl font-bold text-[#00C6FF] mb-4 text-center">
          Blog de Desarrollo Web
        </h1>
        <p className="text-xl text-[#A3A8CC] max-w-2xl mx-auto text-center mb-8">
          Artículos profesionales sobre diseño web, SEO, tecnologías modernas y mejores prácticas para crear experiencias digitales excepcionales.
        </p>
        <div className="w-full max-w-md">
          <SearchAutocomplete 
            onSearch={onSearchChange}
            placeholder="Buscar artículos..."
          />
        </div>
      </div>
    </header>
  );
}

// Componente para las categorías
function Categories({ categories }) {
  return (
    <div className="bg-[#1B1F3B] rounded-lg p-6 border border-[#003B8D]">
      <h3 className="text-xl font-bold text-[#00C6FF] mb-4">Categorías</h3>
      <div className="space-y-3">
        {categories.length === 0 && (
          <span className="text-[#A3A8CC]">No hay categorías disponibles.</span>
        )}
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/blog/category/${category.slug}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-[#0C0C2C] transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-[#00C6FF]"></div>
              <span className="text-[#A3A8CC] hover:text-white transition-colors">
                {category.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Componente para posts populares
function PopularPosts({ posts }) {
  return (
    <div className="bg-[#1B1F3B] rounded-lg p-6 border border-[#003B8D]">
      <h3 className="text-xl font-bold text-[#00C6FF] mb-4">Posts Populares</h3>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="flex items-start space-x-3 group hover:bg-[#0C0C2C] p-2 rounded-lg transition-colors duration-200"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-[#0C0C2C] rounded-lg flex items-center justify-center text-[#00C6FF] font-bold">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-[#A3A8CC] group-hover:text-white transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-[#A3A8CC] mt-1">
                Por {post.authorName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Componente para newsletter
function NewsletterSignup() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const subscribe = async () => {
    setStatus(null)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (res.ok) {
        setStatus('ok')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (e) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#00C6FF] to-[#003B8D] rounded-lg p-6 text-center">
      <h3 className="mb-2 text-xl font-bold text-white">
        ¡Suscríbete al Newsletter!
      </h3>
      <p className="mb-4 text-sm text-white/90">
        Recibe los mejores artículos sobre desarrollo web directamente en tu email.
      </p>
      <div className="flex flex-col space-y-2">
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg text-[#0C0C2C] placeholder-[#0C0C2C]/60 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button onClick={subscribe} disabled={loading} className="px-6 py-2 bg-white text-[#0C0C2C] font-semibold rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50">
          {loading ? 'Enviando...' : 'Suscribir'}
        </button>
        {status === 'ok' && <span className="text-sm text-green-100">¡Listo! Revisa tu correo.</span>}
        {status === 'error' && <span className="text-sm text-red-100">Email inválido o error al suscribir.</span>}
      </div>
    </div>
  );
}

// Componente para resultados de búsqueda
function SearchResults({ searchResults, searchQuery, totalResults }) {
  if (!searchQuery) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#00C6FF]">
          Resultados de búsqueda
        </h2>
        <span className="text-[#A3A8CC]">
          {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'} para "{searchQuery}"
        </span>
      </div>
      
      {searchResults.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h3 className="text-xl font-semibold text-[#00C6FF] mb-2">
            No se encontraron resultados
          </h3>
          <p className="text-[#A3A8CC]">
            No hay artículos que coincidan con "{searchQuery}". 
            Intenta con otros términos o revisa la ortografía.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {searchResults.map((post, index) => (
            <AnimatedPostCard key={post._id} post={post} isSearchResult={true} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

// La página principal del blog
export default function BlogIndexPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    tags: [],
    dateRange: '',
    sortBy: 'newest'
  });

  // Cargar datos iniciales (categorías, tags, posts populares)
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('📥 Cargando datos iniciales...');
        const [popularData, categoriesData, tagsData] = await Promise.all([
          getPopularPosts(),
          getCategories(),
          getTags()
        ]);
        
        setPopularPosts(popularData);
        setCategories(categoriesData);
        setTags(tagsData);
        
        console.log('✅ Datos iniciales cargados');
      } catch (error) {
        console.error('❌ Error cargando datos iniciales:', error);
      }
    };
    
    loadInitialData();
  }, []);

  // Cargar posts filtrados cuando cambien los filtros
  useEffect(() => {
    const loadFilteredPosts = async () => {
      setIsLoadingPosts(true);
      try {
        console.log('🔍 Aplicando filtros:', filters);
        const postsData = await getFilteredPosts(filters);
        setFilteredPosts(postsData);
        setPosts(postsData); // También actualizamos posts para mantener compatibilidad
        console.log(`✅ ${postsData.length} posts obtenidos con filtros`);
      } catch (error) {
        console.error('❌ Error cargando posts filtrados:', error);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    
    loadFilteredPosts();
  }, [filters]);

  // Función de búsqueda con debounce
  const searchPosts = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setTotalResults(0);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults(data.posts);
        setTotalResults(data.total);
      } else {
        console.error('Error en búsqueda:', data.error);
        setSearchResults([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce para la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPosts(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchPosts]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setTotalResults(0);
  };

  const handleFiltersChange = (newFilters) => {
    console.log('🎯 Nuevos filtros aplicados:', newFilters);
    setFilters(newFilters);
  };

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#0C0C2C]">
      <BlogHeader 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        isSearching={isSearching}
      />
      
      <main className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {/* Resultados de búsqueda */}
            <SearchResults 
              searchResults={searchResults}
              searchQuery={searchQuery}
              totalResults={totalResults}
            />
            
            {/* Contenido normal (solo si no hay búsqueda activa) */}
            {!searchQuery && (
              <>
                {/* Indicador de filtros activos */}
                {(filters.category || filters.tags.length > 0 || filters.dateRange) && (
                  <div className="mb-6 p-4 bg-[#1B1F3B] border border-[#003B8D] rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FaTag className="text-[#00C6FF]" />
                        <span className="text-[#A3A8CC]">
                          Filtros activos: 
                          {filters.category && ` Categoría`}
                          {filters.tags.length > 0 && ` ${filters.tags.length} Tag(s)`}
                          {filters.dateRange && ` Fecha`}
                        </span>
                      </div>
                      <button
                        onClick={() => setFilters({
                          category: '',
                          tags: [],
                          dateRange: '',
                          sortBy: 'newest'
                        })}
                        className="text-sm text-[#00C6FF] hover:text-white transition-colors"
                      >
                        Limpiar filtros
                      </button>
                    </div>
                  </div>
                )}

                {/* Loading state */}
                {isLoadingPosts ? (
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-[#1B1F3B] rounded-lg border border-[#003B8D] overflow-hidden animate-pulse"
                      >
                        <div className="h-48 bg-[#0C0C2C]" />
                        <div className="p-6 space-y-3">
                          <div className="h-4 bg-[#0C0C2C] rounded" />
                          <div className="h-4 bg-[#0C0C2C] rounded w-3/4" />
                          <div className="h-20 bg-[#0C0C2C] rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <>
                    {/* Post destacado */}
                    {featuredPost && (
                      <div className="mb-12">
                        <h2 className="text-2xl font-bold text-[#00C6FF] mb-6">Post Destacado</h2>
                        <FeaturedPost post={featuredPost} />
                      </div>
                    )}
                    
                    {/* Grid de posts regulares */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-[#00C6FF] mb-6">
                        Artículos {filters.category || filters.tags.length > 0 || filters.dateRange ? 'Filtrados' : 'Recientes'}
                      </h2>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {regularPosts.map((post, index) => (
                          <AnimatedPostCard key={post._id} post={post} index={index + 1} />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // No hay posts con los filtros actuales
                  <div className="py-16 text-center bg-[#1B1F3B] rounded-lg border border-[#003B8D]">
                    <div className="mb-4">
                      <svg 
                        className="mx-auto w-16 h-16 text-[#003B8D]" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      No se encontraron artículos
                    </h3>
                    <p className="text-[#A3A8CC] mb-4">
                      No hay posts que coincidan con los filtros seleccionados
                    </p>
                    <button
                      onClick={() => setFilters({
                        category: '',
                        tags: [],
                        dateRange: '',
                        sortBy: 'newest'
                      })}
                      className="px-6 py-2 bg-[#00C6FF] text-[#0C0C2C] font-semibold rounded-lg hover:bg-[#00C6FF]/90 transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8 lg:col-span-1">
            <AdvancedFilters 
              categories={categories}
              tags={tags}
              onFiltersChange={handleFiltersChange}
            />
            <Categories categories={categories} />
            <PopularPosts posts={popularPosts} />
            <NewsletterSignup />
          </div>
        </div>
      </main>
    </div>
  );
}