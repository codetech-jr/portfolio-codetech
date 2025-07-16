// app/blog/page.jsx

import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image'; // Ajusta la ruta a tu cliente Sanity

// Metadatos para la página principal del blog
export const metadata = {
  title: 'Blog Técnico | Mi Portafolio Profesional',
  description: 'Explora artículos y tutoriales sobre desarrollo web, performance y tecnologías modernas.',
};

// Función para obtener los datos de Sanity
async function getPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      excerpt,
      publishedAt
    }
  `;
  const posts = await client.fetch(query);
  return posts;
}

// La página en sí
export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#0C0C2C] text-[#FFFFFF] container px-4 py-12 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-[#00C6FF]">Mi Blog Técnico</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug}`} className="block overflow-hidden transition-shadow duration-200 border border-[#00C6FF]/50 rounded-lg hover:shadow-lg bg-[#0C0C2C]">
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage).width(500).height(300).url()}
                alt={`Imagen de portada para ${post.title}`}
                width={500}
                height={300}
                className="object-cover w-full h-48"
              />
            ) : <div className="w-full h-48 bg-[#1B1F3B]"></div>}
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold text-[#00C6FF]">{post.title}</h2>
              <p className="mb-4 text-[#A3A8CC]">{post.excerpt}</p>
              <span className="text-sm text-[#A3A8CC]">
                {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}