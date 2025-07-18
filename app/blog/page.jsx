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

// Metadatos para la página principal del blog
// export const metadata = {
//   title: 'Blog de Desarrollo Web | Codetech Junior - Artículos sobre Diseño Web, SEO y Tecnologías',
//   description: 'Explora artículos profesionales sobre desarrollo web, diseño UX/UI, SEO, y las últimas tecnologías web. Consejos prácticos para mejorar tu presencia digital.',
//   openGraph: {
//     title: 'Blog de Desarrollo Web | Codetech Junior',
//     description: 'Artículos profesionales sobre desarrollo web, diseño y tecnologías modernas',
//     type: 'website',
//     url: 'https://codetechjunior.com/blog',
//   },
// };

// Función para obtener los posts con más datos
async function getPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      excerpt,
      publishedAt,
      "authorName": author->name,
      "authorImage": author->image,
      "categories": categories[]->title,
      "tags": tags[]->{title, color},
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }
  `;
  const posts = await client.fetch(query);
  return posts;
}

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

// Función para obtener todas las categorías
async function getAllCategories() {
  const query = `*[_type == 'category'] | order(title asc){_id, title, "slug": slug.current}`;
  return await client.fetch(query);
}

// Función para obtener todos los tags
async function getAllTags() {
  const query = `*[_type == 'tag'] | order(title asc){_id, title, "slug": slug.current, color}`;
  return await client.fetch(query);
}

// Componente para el header del blog
function BlogHeader({ searchQuery, onSearchChange, onClearSearch, isSearching }) {
  return (
    <header className="bg-gradient-to-r from-[#0C0C2C] to-[#1B1F3B] border-b border-[#003B8D] py-8">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-[#00C6FF] mb-4 text-center">
          Blog de Desarrollo Web
        </h1>
        <p className="text-xl text-[#A3A8CC] max-w-2xl mx-auto text-center mb-8">
          Artículos profesionales sobre diseño web, SEO, tecnologías modernas y mejores prácticas para crear experiencias digitales excepcionales.
        </p>
        <div className="max-w-md w-full">
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
function Categories() {
  const categories = [
    { name: 'Desarrollo Web', count: 12, color: 'bg-[#00C6FF]' },
    { name: 'Diseño UX/UI', count: 8, color: 'bg-[#FF6B6B]' },
    { name: 'SEO', count: 6, color: 'bg-[#4ECDC4]' },
    { name: 'Tecnologías', count: 10, color: 'bg-[#45B7D1]' },
    { name: 'Performance', count: 4, color: 'bg-[#96CEB4]' },
  ];

  return (
    <div className="bg-[#1B1F3B] rounded-lg p-6 border border-[#003B8D]">
      <h3 className="text-xl font-bold text-[#00C6FF] mb-4">Categorías</h3>
      <div className="space-y-3">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-[#0C0C2C] transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
              <span className="text-[#A3A8CC] hover:text-white transition-colors">
                {category.name}
              </span>
            </div>
            <span className="text-sm text-[#A3A8CC] bg-[#0C0C2C] px-2 py-1 rounded-full">
              {category.count}
            </span>
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
  return (
    <div className="bg-gradient-to-br from-[#00C6FF] to-[#003B8D] rounded-lg p-6 text-center">
      <h3 className="text-xl font-bold text-white mb-2">
        ¡Suscríbete al Newsletter!
      </h3>
      <p className="text-white/90 mb-4 text-sm">
        Recibe los mejores artículos sobre desarrollo web directamente en tu email.
      </p>
      <div className="flex flex-col space-y-2">
        <input
          type="email"
          placeholder="Tu email"
          className="flex-1 px-4 py-2 rounded-lg text-[#0C0C2C] placeholder-[#0C0C2C]/60 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button className="px-6 py-2 bg-white text-[#0C0C2C] font-semibold rounded-lg hover:bg-white/90 transition-colors">
          Suscribir
        </button>
      </div>
    </div>
  );
}

// Componente para una card de post
function PostCard({ post, isFeatured = false, isSearchResult = false }) {
  return (
    <article className={`group overflow-hidden rounded-lg border border-[#003B8D] transition-all duration-300 hover:border-[#00C6FF] hover:shadow-xl hover:shadow-[#00C6FF]/10 ${isFeatured ? 'bg-[#1B1F3B]' : 'bg-[#0C0C2C]'}`}>
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(600).height(400).url()}
              alt={`Imagen de portada para ${post.title}`}
              width={600}
              height={400}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-[#1B1F3B] to-[#003B8D] flex items-center justify-center">
              <span className="text-[#A3A8CC] text-lg">Sin imagen</span>
            </div>
          )}
          
          {/* Badge de categoría */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[#00C6FF] text-[#0C0C2C] text-xs font-semibold rounded-full">
                {post.categories[0]}
              </span>
            </div>
          )}
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
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
            </div>
          )}
          
          {/* Badge de resultado de búsqueda */}
          {isSearchResult && post.matchType && (
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                post.matchType === 'title' ? 'bg-green-500 text-white' :
                post.matchType === 'excerpt' ? 'bg-yellow-500 text-black' :
                'bg-blue-500 text-white'
              }`}>
                {post.matchType === 'title' ? 'Título' :
                 post.matchType === 'excerpt' ? 'Extracto' : 'Contenido'}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#00C6FF] mb-3 group-hover:text-white transition-colors line-clamp-2">
            {post.title}
          </h2>
          
          <div className="mb-4">
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
          </div>
          
          <div className="flex items-center justify-between text-sm text-[#A3A8CC]">
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
          </div>
          
          <div className="mt-4 flex items-center text-[#00C6FF] group-hover:text-white transition-colors">
            <span className="text-sm font-medium">Leer más</span>
            <FaArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
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
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-[#00C6FF] mb-2">
            No se encontraron resultados
          </h3>
          <p className="text-[#A3A8CC]">
            No hay artículos que coincidan con "{searchQuery}". 
            Intenta con otros términos o revisa la ortografía.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
  const [popularPosts, setPopularPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState({
    category: '',
    tags: [],
    dateRange: '',
    sortBy: 'newest'
  });

  // Cargar posts iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [postsData, popularData, categoriesData, tagsData] = await Promise.all([
          getPosts(),
          getPopularPosts(),
          getAllCategories(),
          getAllTags()
        ]);
        setPosts(postsData);
        setPopularPosts(popularData);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error cargando posts:', error);
      }
    };
    
    loadInitialData();
  }, []);

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
    setFilters(newFilters);
    // Aquí podrías aplicar los filtros a los posts
    // Por ahora solo actualizamos el estado
  };

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-[#0C0C2C]">
      <BlogHeader 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        isSearching={isSearching}
      />
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                {/* Post destacado */}
                {featuredPost && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#00C6FF] mb-6">Post Destacado</h2>
                    <FeaturedPost post={featuredPost} />
                  </div>
                )}
                
                {/* Grid de posts regulares */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#00C6FF] mb-6">Artículos Recientes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {regularPosts.map((post, index) => (
                      <AnimatedPostCard key={post._id} post={post} index={index + 1} />
                    ))}
                  </div>
                </div>
                
                {/* Paginación básica */}
                <div className="flex justify-center mt-12">
                  <nav className="flex space-x-2">
                    <button className="px-4 py-2 bg-[#1B1F3B] border border-[#003B8D] text-[#A3A8CC] rounded-lg hover:bg-[#00C6FF] hover:text-[#0C0C2C] transition-colors">
                      Anterior
                    </button>
                    <button className="px-4 py-2 bg-[#00C6FF] text-[#0C0C2C] rounded-lg font-semibold">
                      1
                    </button>
                    <button className="px-4 py-2 bg-[#1B1F3B] border border-[#003B8D] text-[#A3A8CC] rounded-lg hover:bg-[#00C6FF] hover:text-[#0C0C2C] transition-colors">
                      2
                    </button>
                    <button className="px-4 py-2 bg-[#1B1F3B] border border-[#003B8D] text-[#A3A8CC] rounded-lg hover:bg-[#00C6FF] hover:text-[#0C0C2C] transition-colors">
                      Siguiente
                    </button>
                  </nav>
                </div>
              </>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <AdvancedFilters 
              categories={categories}
              tags={tags}
              onFiltersChange={handleFiltersChange}
            />
            <Categories />
            <PopularPosts posts={popularPosts} />
            <NewsletterSignup />
          </div>
        </div>
      </main>
    </div>
  );
}