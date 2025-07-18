"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaHeart, FaShare, FaBookmark, FaClock } from 'react-icons/fa';

export default function ReadingStats({ postId, postSlug, className = "" }) {
  const [stats, setStats] = useState({
    views: 0,
    likes: 0,
    shares: 0,
    bookmarks: 0,
    readingTime: 0
  });
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Cargar estadísticas del post
    loadStats();
    
    // Verificar si el usuario ya dio like o guardó el post
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
    
    setIsLiked(likedPosts.includes(postId));
    setIsBookmarked(bookmarkedPosts.includes(postId));
  }, [postId]);

  const loadStats = async () => {
    try {
      // En producción, esto vendría de una API
      // Por ahora, simulamos estadísticas
      const mockStats = {
        views: Math.floor(Math.random() * 1000) + 100,
        likes: Math.floor(Math.random() * 50) + 5,
        shares: Math.floor(Math.random() * 20) + 2,
        bookmarks: Math.floor(Math.random() * 15) + 1,
        readingTime: Math.floor(Math.random() * 10) + 3
      };
      setStats(mockStats);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setIsLiked(!isLiked);
        setStats(prev => ({
          ...prev,
          likes: isLiked ? prev.likes - 1 : prev.likes + 1
        }));
        
        // Guardar en localStorage
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        if (isLiked) {
          const updated = likedPosts.filter(id => id !== postId);
          localStorage.setItem('likedPosts', JSON.stringify(updated));
        } else {
          likedPosts.push(postId);
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        }
      }
    } catch (error) {
      console.error('Error dando like:', error);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setStats(prev => ({
      ...prev,
      bookmarks: isBookmarked ? prev.bookmarks - 1 : prev.bookmarks + 1
    }));
    
    // Guardar en localStorage
    const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
    if (isBookmarked) {
      const updated = bookmarkedPosts.filter(id => id !== postId);
      localStorage.setItem('bookmarkedPosts', JSON.stringify(updated));
    } else {
      bookmarkedPosts.push(postId);
      localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts));
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
        setStats(prev => ({ ...prev, shares: prev.shares + 1 }));
      } catch (error) {
        console.error('Error compartiendo:', error);
      }
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(`${window.location.origin}/blog/${postSlug}`);
      setStats(prev => ({ ...prev, shares: prev.shares + 1 }));
    }
  };

  const statItems = [
    {
      icon: FaEye,
      label: 'Vistas',
      value: stats.views,
      color: 'text-blue-400'
    },
    {
      icon: FaClock,
      label: 'Tiempo',
      value: `${stats.readingTime} min`,
      color: 'text-green-400'
    },
    {
      icon: FaHeart,
      label: 'Likes',
      value: stats.likes,
      color: 'text-red-400',
      interactive: true,
      isActive: isLiked,
      onClick: handleLike
    },
    {
      icon: FaBookmark,
      label: 'Guardados',
      value: stats.bookmarks,
      color: 'text-yellow-400',
      interactive: true,
      isActive: isBookmarked,
      onClick: handleBookmark
    },
    {
      icon: FaShare,
      label: 'Compartidos',
      value: stats.shares,
      color: 'text-purple-400',
      interactive: true,
      onClick: handleShare
    }
  ];

  return (
    <div className={`bg-[#1B1F3B] rounded-lg p-6 border border-[#003B8D] ${className}`}>
      <h3 className="text-lg font-semibold text-[#00C6FF] mb-4">Estadísticas</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {statItems.map((item, index) => (
          <motion.div
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
              <item.icon className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold text-white">
              {item.value}
            </div>
            <div className="text-xs text-[#A3A8CC]">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 