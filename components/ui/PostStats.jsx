"use client";
import { useEffect, useState } from "react";

const iconStyle = "w-6 h-6 cursor-pointer transition-transform hover:scale-110";

export default function PostStats({ postId }) {
  const [stats, setStats] = useState({ views: 0, likes: 0, shares: 0 });
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [saved, setSaved] = useState(false);

  // Leer stats del API
  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await fetch(`/api/stats?postId=${postId}`);
        const data = await res.json();
        setStats(data || { views: 0, likes: 0, shares: 0 });
      } catch (e) {
        setStats({ views: 0, likes: 0, shares: 0 });
      }
      setLoading(false);
    }
    fetchStats();
    // Registrar una vista automáticamente
    fetch(`/api/stats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, type: "views" })
    });
    // Verificar si está guardado
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    setSaved(savedPosts.includes(postId));
  }, [postId]);

  // Handler para likes y shares
  const handleStat = async (type) => {
    if ((type === "likes" && liked) || (type === "shares" && shared)) return;
    await fetch(`/api/stats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, type })
    });
    setStats((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    if (type === "likes") setLiked(true);
    if (type === "shares") setShared(true);
  };

  // Handler para guardados
  const handleSave = () => {
    let savedPosts = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    if (saved) {
      savedPosts = savedPosts.filter((id) => id !== postId);
      setSaved(false);
    } else {
      savedPosts.push(postId);
      setSaved(true);
    }
    localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
  };

  return (
    <div className="flex items-center gap-6 mt-4">
      {/* Vistas */}
      <div className="flex items-center gap-1 text-[#A3A8CC]">
        <svg className={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        <span>{loading ? "-" : stats.views}</span>
      </div>
      {/* Likes */}
      <div className={`flex items-center gap-1 ${liked ? "text-[#00D68F]" : "text-[#A3A8CC]"}`}
        onClick={() => handleStat("likes")}
        title={liked ? "¡Ya diste like!" : "Dar like"}
      >
        <svg className={iconStyle} fill={liked ? "#00D68F" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        <span>{loading ? "-" : stats.likes}</span>
      </div>
      {/* Compartidos */}
      <div className={`flex items-center gap-1 ${shared ? "text-[#00C6FF]" : "text-[#A3A8CC]"}`}
        onClick={() => handleStat("shares")}
        title={shared ? "¡Ya compartiste!" : "Compartir"}
      >
        <svg className={iconStyle} fill={shared ? "#00C6FF" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01" /></svg>
        <span>{loading ? "-" : stats.shares}</span>
      </div>
      {/* Guardados */}
      <div className={`flex items-center gap-1 ${saved ? "text-[#FFC857]" : "text-[#A3A8CC]"}`}
        onClick={handleSave}
        title={saved ? "Quitar de guardados" : "Guardar post"}
      >
        <svg className={iconStyle} fill={saved ? "#FFC857" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" /></svg>
        <span>{saved ? "Guardado" : "Guardar"}</span>
      </div>
    </div>
  );
} 