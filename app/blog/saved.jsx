"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from '@/lib/sanityQueries';

export default function SavedPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedPosts() {
      const savedIds = JSON.parse(localStorage.getItem("savedPosts") || "[]");
      if (savedIds.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }
      // Consulta a Sanity para traer los posts guardados
      const query = `*[_type == 'post' && _id in $ids]{ _id, title, slug, mainImage }`;
      const sanityClient = (await import('@/sanity/lib/client')).client;
      const result = await sanityClient.fetch(query, { ids: savedIds });
      setPosts(result);
      setLoading(false);
    }
    fetchSavedPosts();
  }, []);

  const handleRemove = (id) => {
    let saved = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    saved = saved.filter((pid) => pid !== id);
    localStorage.setItem("savedPosts", JSON.stringify(saved));
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0C0C2C] py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-[#00C6FF] mb-8 text-center">Posts Guardados</h1>
        {loading ? (
          <p className="text-[#A3A8CC] text-center">Cargando...</p>
        ) : posts.length === 0 ? (
          <p className="text-[#A3A8CC] text-center">No tienes posts guardados.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post._id} className="bg-[#1B1F3B] p-6 rounded-lg border border-[#003B8D] flex items-center justify-between">
                <div>
                  <Link href={`/blog/${post.slug}`} className="text-lg font-semibold text-[#00C6FF] hover:underline">
                    {post.title}
                  </Link>
                </div>
                <button
                  onClick={() => handleRemove(post._id)}
                  className="ml-4 px-4 py-2 bg-[#FFC857] text-[#0C0C2C] rounded-lg font-semibold hover:bg-[#FFD580] transition-colors"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-[#00C6FF] hover:underline">&larr; Volver al blog</Link>
        </div>
      </div>
    </div>
  );
} 