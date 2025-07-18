"use client";

import { useState, useEffect } from 'react';
import { FaComment, FaUser, FaCalendar, FaReply, FaHeart, FaTrash } from 'react-icons/fa';

export default function Comments({ postId, postSlug, className = "" }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  // Cargar comentarios existentes
  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Error cargando comentarios:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.content.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          postSlug,
          ...newComment,
          parentId: replyTo?.id || null
        }),
      });

      if (response.ok) {
        setNewComment({ name: '', email: '', content: '' });
        setReplyTo(null);
        loadComments(); // Recargar comentarios
      }
    } catch (error) {
      console.error('Error enviando comentario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        loadComments(); // Recargar para actualizar likes
      }
    } catch (error) {
      console.error('Error dando like:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderComment = (comment, level = 0) => (
    <div key={comment.id} className={`${level > 0 ? 'ml-6 border-l-2 border-[#003B8D] pl-4' : ''}`}>
      <div className="bg-[#0C0C2C] rounded-lg p-4 mb-4 border border-[#003B8D]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#00C6FF] rounded-full flex items-center justify-center">
              <FaUser className="w-4 h-4 text-[#0C0C2C]" />
            </div>
            <div>
              <h4 className="font-semibold text-white">{comment.name}</h4>
              <p className="text-xs text-[#A3A8CC] flex items-center">
                <FaCalendar className="w-3 h-3 mr-1" />
                {formatDate(comment.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleLike(comment.id)}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                comment.liked ? 'text-[#00C6FF]' : 'text-[#A3A8CC] hover:text-[#00C6FF]'
              }`}
            >
              <FaHeart className={`w-3 h-3 ${comment.liked ? 'fill-current' : ''}`} />
              <span>{comment.likes || 0}</span>
            </button>
            <button
              onClick={() => setReplyTo(comment)}
              className="text-[#A3A8CC] hover:text-[#00C6FF] transition-colors"
            >
              <FaReply className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        <p className="text-[#A3A8CC] leading-relaxed">{comment.content}</p>
        
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map(reply => renderComment(reply, level + 1))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <FaComment className="text-[#00C6FF] w-5 h-5" />
        <h3 className="text-2xl font-bold text-[#00C6FF]">
          Comentarios ({comments.length})
        </h3>
      </div>

      {/* Formulario de comentario */}
      <div className="bg-[#1B1F3B] rounded-lg p-6 border border-[#003B8D] mb-8">
        {replyTo && (
          <div className="mb-4 p-3 bg-[#0C0C2C] rounded-lg border border-[#003B8D]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#A3A8CC]">
                Respondiendo a <span className="text-[#00C6FF] font-semibold">{replyTo.name}</span>
              </p>
              <button
                onClick={() => setReplyTo(null)}
                className="text-[#A3A8CC] hover:text-[#00C6FF] transition-colors"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Tu nombre *"
              value={newComment.name}
              onChange={(e) => setNewComment({...newComment, name: e.target.value})}
              className="px-4 py-3 bg-[#0C0C2C] border border-[#003B8D] rounded-lg text-white placeholder-[#A3A8CC] focus:outline-none focus:border-[#00C6FF]"
              required
            />
            <input
              type="email"
              placeholder="Tu email *"
              value={newComment.email}
              onChange={(e) => setNewComment({...newComment, email: e.target.value})}
              className="px-4 py-3 bg-[#0C0C2C] border border-[#003B8D] rounded-lg text-white placeholder-[#A3A8CC] focus:outline-none focus:border-[#00C6FF]"
              required
            />
          </div>
          
          <textarea
            placeholder="Escribe tu comentario... *"
            value={newComment.content}
            onChange={(e) => setNewComment({...newComment, content: e.target.value})}
            rows={4}
            className="w-full px-4 py-3 bg-[#0C0C2C] border border-[#003B8D] rounded-lg text-white placeholder-[#A3A8CC] focus:outline-none focus:border-[#00C6FF] resize-none"
            required
          />
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#00C6FF] text-[#0C0C2C] font-semibold rounded-lg hover:bg-[#00C6FF]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Publicar Comentario'}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-[#A3A8CC]">
              Sé el primero en comentar este artículo
            </p>
          </div>
        ) : (
          comments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
} 