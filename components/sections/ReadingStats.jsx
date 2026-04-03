"use client";

import { useState, useEffect } from 'react';
import Motion from '../ui/Motion';

function StatIcon({ name, className }) {
  switch (name) {
    case 'eye':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case 'clock':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'heart':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 21s-7-4.5-9-7.5C1 10.5 3 6 6 6c2.5 0 3 2 6 5 3-3 3.5-5 6-5 3 0 5 4.5 3 7.5-2 3-9 7.5-9 7.5z" />
        </svg>
      );
    case 'bookmark':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M6 2h12v20l-6-3-6 3V2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'share':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 6l-4-4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ReadingStats({ postId, postSlug, readingTime = 0, className = "" }) {
  const [stats, setStats] = useState({
    views: 0,
    likes: 0,
    shares: 0,
    bookmarks: 0,
    readingTime: readingTime || 0
  });
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    async function init() {
      // Cargar estadísticas reales desde la API
      await loadStats();

      // Evitar duplicados de vista por 12h usando TTL en localStorage
      const key = `viewed_${postId}`;
      const last = Number(localStorage.getItem(key) || 0);
      const twelveHoursMs = 12 * 60 * 60 * 1000;
      const now = Date.now();
      if (!last || now - last > twelveHoursMs) {
        await fetch(`/api/stats`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, type: 'views' })
        }).catch(() => {});
        localStorage.setItem(key, String(now));
      }

      // Verificar estado local de like y guardado
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
      setIsLiked(likedPosts.includes(postId));
      setIsBookmarked(bookmarkedPosts.includes(postId));
    }
    if (postId) init();
  }, [postId]);

  const loadStats = async () => {
    try {
      const res = await fetch(`/api/stats?postId=${postId}`);
      const data = await res.json();
      setStats((prev) => ({
        ...prev,
        views: data?.views || 0,
        likes: data?.likes || 0,
        shares: data?.shares || 0,
        readingTime: prev.readingTime || readingTime || 0,
      }));
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, type: 'likes' })
      });
      if (response.ok) {
        const nextLiked = !isLiked;
        setIsLiked(nextLiked);
        setStats(prev => ({ ...prev, likes: prev.likes + (nextLiked ? 1 : -1) }));

        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        if (nextLiked) {
          if (!likedPosts.includes(postId)) likedPosts.push(postId);
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        } else {
          const updated = likedPosts.filter(id => id !== postId);
          localStorage.setItem('likedPosts', JSON.stringify(updated));
        }
      }
    } catch (error) {
      console.error('Error dando like:', error);
    }
  };

  const handleBookmark = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    setStats(prev => ({ ...prev, bookmarks: prev.bookmarks + (next ? 1 : -1) }));

    const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
    if (next) {
      if (!bookmarkedPosts.includes(postId)) bookmarkedPosts.push(postId);
      localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts));
    } else {
      const updated = bookmarkedPosts.filter(id => id !== postId);
      localStorage.setItem('bookmarkedPosts', JSON.stringify(updated));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Artículo del Blog',
          text: 'Mira este artículo interesante',
          url: `${window.location.origin}/blog/${postSlug}`
        });
        await fetch(`/api/stats`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, type: 'shares' })
        }).catch(() => {});
        setStats(prev => ({ ...prev, shares: prev.shares + 1 }));
      } catch (error) {
        console.error('Error compartiendo:', error);
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/blog/${postSlug}`);
      await fetch(`/api/stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, type: 'shares' })
      }).catch(() => {});
      setStats(prev => ({ ...prev, shares: prev.shares + 1 }));
    }
  };

  const statItems = [
    { name: 'eye', label: 'Vistas', value: stats.views, color: 'text-blue-400' },
    { name: 'clock', label: 'Tiempo', value: `${stats.readingTime} min`, color: 'text-green-400' },
    { name: 'heart', label: 'Likes', value: stats.likes, color: 'text-red-400', interactive: true, isActive: isLiked, onClick: handleLike },
    { name: 'bookmark', label: 'Guardados', value: stats.bookmarks, color: 'text-yellow-400', interactive: true, isActive: isBookmarked, onClick: handleBookmark },
    { name: 'share', label: 'Compartidos', value: stats.shares, color: 'text-purple-400', interactive: true, onClick: handleShare }
  ];

  return (
    <div className={`bg-[#1B1F3B] rounded-lg p-6 border border-[#003B8D] ${className}`}>
      <h3 className="text-lg font-semibold text-[#00C6FF] mb-4">Estadísticas</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {statItems.map((item, index) => (
          <Motion as="div"
            key={index}
            className={`text-center p-3 rounded-lg transition-colors ${
              item.interactive 
                ? 'cursor-pointer hover:bg-[#0C0C2C]' 
                : 'bg-[#0C0C2C]'
            }`}
            whileHover={item.interactive ? { scale: 1.05 } : {}}
            whileTap={item.interactive ? { scale: 0.95 } : {}}
            onClick={item.onClick}
          >
            <div className={`flex justify-center mb-2 ${
              item.isActive ? 'text-[#00C6FF]' : item.color
            }`}>
              <StatIcon name={item.name} className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold text-white">
              {item.value}
            </div>
            <div className="text-xs text-[#A3A8CC]">
              {item.label}
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
} 