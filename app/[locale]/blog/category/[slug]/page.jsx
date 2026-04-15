// app/blog/category/[slug]/page.jsx

import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
// Íconos inline (reemplazo de react-icons/fa)
function IconArrowLeft({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowRight({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

function IconFolder({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6l2 3h8a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
    </svg>
  );
}

// Metadatos SEO dinámicos
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categorySlug = slug;
  const category = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{title, description}`,
    { slug: categorySlug }
  );
  if (!category) {
    return { title: 'Categoría no encontrada' };
  }
  const pageTitle = `${category.title} | Blog de Codetech Junior`;
  const pageDescription = category.description || `Artículos sobre ${category.title} en el blog de desarrollo web de Codetech Junior.`;
  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://codetechjunior.com/blog/category/${slug}`,
      siteName: 'Blog de Codetech Junior',
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
    },
    alternates: {
      canonical: `https://codetechjunior.com/blog/category/${slug}`,
    },
  };
}

// Obtener posts de la categoría
async function getPostsByCategory(categorySlug) {
  const query = `
    *[_type == "post" && references(*[_type == 'category' && slug.current == $slug]._id)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      excerpt,
      publishedAt,
      "authorName": author->name,
      "categories": categories[]->title,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }
  `;
  return await client.fetch(query, { slug: categorySlug });
}

// Obtener info de la categoría
async function getCategoryInfo(categorySlug) {
  const query = `*[_type == 'category' && slug.current == $slug][0]{_id, title, description}`;
  return await client.fetch(query, { slug: categorySlug });
}

// Obtener todas las categorías
async function getAllCategories() {
  const query = `*[_type == 'category'] | order(title asc){_id, title, "slug": slug.current}`;
  return await client.fetch(query);
}

// Breadcrumbs
function Breadcrumbs({ category }) {
  return (
    <nav className="mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-[#A3A8CC]">
        <li>
          <Link href="/" className="hover:text-[#00C6FF] transition-colors">Inicio</Link>
        </li>
          <li className="flex items-center">
          <IconArrowLeft className="w-3 h-3 mx-2 rotate-180" />
          <Link href="/blog" className="hover:text-[#00C6FF] transition-colors">Blog</Link>
        </li>
        <li className="flex items-center">
          <IconArrowLeft className="w-3 h-3 mx-2 rotate-180" />
          <span className="text-[#00C6FF] font-medium">{category.title}</span>
        </li>
      </ol>
    </nav>
  );
}

// Header de la categoría
function CategoryHeader({ category }) {
  return (
    <header className="mb-8">
      <div className="flex items-center mb-6 space-x-4">
        <IconFolder className="w-6 h-6 text-[#00C6FF]" />
        <h1 className="text-4xl md:text-5xl font-bold text-[#00C6FF]">{category.title}</h1>
      </div>
      {category.description && (
        <p className="text-xl text-[#A3A8CC] mb-6 max-w-3xl">{category.description}</p>
      )}
    </header>
  );
}

// Card de post
function PostCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-[#003B8D] transition-all duration-300 hover:border-[#00C6FF] hover:shadow-xl hover:shadow-[#00C6FF]/10 bg-[#0C0C2C]">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden">
            {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(600).height(400).url()}
              alt={`Imagen de portada para ${post.title}`}
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-[#1B1F3B] to-[#003B8D] flex items-center justify-center">
              <span className="text-[#A3A8CC] text-lg">Sin imagen</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#00C6FF] mb-3 group-hover:text-white transition-colors line-clamp-2">{post.title}</h2>
          <p className="text-[#A3A8CC] mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-[#A3A8CC]">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                <IconUser className="w-3 h-3" />
                <span>{post.authorName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <IconCalendar className="w-3 h-3" />
                <span>{new Date(post.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
            {post.estimatedReadingTime && (
              <div className="flex items-center space-x-1">
                <IconClock className="w-3 h-3" />
                <span>{post.estimatedReadingTime} min</span>
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center text-[#00C6FF] group-hover:text-white transition-colors">
            <span className="text-sm font-medium">Leer más</span>
            <IconArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}

// Sidebar de categorías
function CategoriesSidebar({ categories, currentCategory }) {
  return (
    <div className="bg-[#1B1F3B] rounded-lg p-6 border border-[#003B8D]">
      <h3 className="text-xl font-bold text-[#00C6FF] mb-4">Todas las Categorías</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/blog/category/${category.slug}`}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${currentCategory._id === category._id ? 'bg-[#00C6FF] text-[#0C0C2C]' : 'text-[#A3A8CC] hover:bg-[#0C0C2C] hover:text-white'}`}
          >
            <span className="font-medium">{category.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Newsletter
function NewsletterSignup() {
  return (
    <div className="bg-gradient-to-br from-[#00C6FF] to-[#003B8D] rounded-lg p-6 text-center">
      <h3 className="mb-2 text-xl font-bold text-white">¡Suscríbete al Newsletter!</h3>
      <p className="mb-4 text-sm text-white/90">Recibe los mejores artículos sobre desarrollo web directamente en tu email.</p>
      <div className="flex space-x-2">
        <input type="email" placeholder="Tu email" className="flex-1 px-4 py-2 rounded-lg text-[#0C0C2C] placeholder-[#0C0C2C]/60 focus:outline-none focus:ring-2 focus:ring-white" />
        <button className="px-6 py-2 bg-white text-[#0C0C2C] font-semibold rounded-lg hover:bg-white/90 transition-colors">Suscribir</button>
      </div>
    </div>
  );
}

// Página de categoría
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categorySlug = slug;
  const [category, posts, allCategories] = await Promise.all([
    getCategoryInfo(categorySlug),
    getPostsByCategory(categorySlug),
    getAllCategories()
  ]);
  if (!category) {
    return (
      <div className="min-h-screen bg-[#0C0C2C] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#00C6FF] mb-4">Categoría no encontrada</h1>
          <Link href="/blog" className="text-[#A3A8CC] hover:text-[#00C6FF] transition-colors">Volver al blog</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0C0C2C]">
      <main className="container px-4 py-8 mx-auto">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs category={category} />
          <CategoryHeader category={category} />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="lg:col-span-3">
              {posts.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mb-4 text-6xl">📁</div>
                  <h3 className="text-xl font-semibold text-[#00C6FF] mb-2">No hay artículos en esta categoría</h3>
                  <p className="text-[#A3A8CC] mb-6">Aún no hemos publicado artículos en la categoría "{category.title}".</p>
                  <Link href="/blog" className="px-6 py-3 bg-[#00C6FF] text-[#0C0C2C] font-semibold rounded-lg hover:bg-[#00C6FF]/90 transition-colors">Ver todos los artículos</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-8 lg:col-span-1">
              <CategoriesSidebar categories={allCategories} currentCategory={category} />
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}