"use client";
import { useEffect, useState } from "react";

function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now - past) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff/60)}m`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h`;
  return past.toLocaleDateString();
}

function CommentItem({ comment, onReply, onLike, replyingTo, onSubmitReply }) {
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#00C6FF]">{comment.author}</span>
        <span className="text-xs text-[#A3A8CC]">{timeAgo(comment.createdAt)}</span>
      </div>
      <div className="text-[#A3A8CC] mb-2">{comment.content}</div>
      <div className="flex items-center gap-4 text-sm">
        <button
          className="flex items-center gap-1 text-[#00D68F] hover:underline"
          onClick={() => onLike(comment._id)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
          {comment.likes || 0}
        </button>
        <button
          className="text-[#00C6FF] hover:underline"
          onClick={() => setShowReply(!showReply)}
        >
          {showReply ? "Cancelar" : "Responder"}
        </button>
      </div>
      {showReply && (
        <form
          className="mt-2 flex flex-col gap-2"
          onSubmit={e => {
            e.preventDefault();
            onSubmitReply({
              content: reply,
              author: replyAuthor,
              email: replyEmail,
              parent: comment._id
            });
            setReply("");
            setReplyAuthor("");
            setReplyEmail("");
            setShowReply(false);
          }}
        >
          <input
            className="px-2 py-1 rounded bg-[#1B1F3B] text-[#A3A8CC] border border-[#003B8D]"
            placeholder="Tu nombre"
            value={replyAuthor}
            onChange={e => setReplyAuthor(e.target.value)}
            required
          />
          <input
            className="px-2 py-1 rounded bg-[#1B1F3B] text-[#A3A8CC] border border-[#003B8D]"
            placeholder="Tu email (opcional)"
            value={replyEmail}
            onChange={e => setReplyEmail(e.target.value)}
            type="email"
          />
          <textarea
            className="px-2 py-1 rounded bg-[#1B1F3B] text-[#A3A8CC] border border-[#003B8D]"
            placeholder="Tu respuesta..."
            value={reply}
            onChange={e => setReply(e.target.value)}
            required
          />
          <button className="self-end px-4 py-1 bg-[#00C6FF] text-[#0C0C2C] rounded hover:bg-[#0099cc] font-semibold">Enviar</button>
        </form>
      )}
      {/* Respuestas */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-2 border-l border-[#003B8D] pl-4">
          {comment.replies.map(reply => (
            <CommentItem
              key={reply._id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              replyingTo={replyingTo}
              onSubmitReply={onSubmitReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);

  // Verificar que estamos en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cargar comentarios
  useEffect(() => {
    if (!mounted) return;
    
    async function fetchComments() {
      setLoading(true);
      try {
        const res = await fetch(`/api/comments?postId=${postId}`);
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      }
      setLoading(false);
    }
    fetchComments();
  }, [postId, success, mounted]);

  // Crear comentario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!author || !content) {
      setError("Nombre y comentario son obligatorios");
      return;
    }
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, author, email, content })
      });
      if (res.ok) {
        setSuccess("¡Comentario enviado!");
        setAuthor("");
        setEmail("");
        setContent("");
      } else {
        setError("Error al enviar comentario");
      }
    } catch (error) {
      setError("Error de conexión");
    }
  };

  // Responder comentario
  const handleReply = async ({ content, author, email, parent }) => {
    if (!author || !content) return;
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, author, email, content, parent })
      });
      setSuccess("¡Respuesta enviada!");
    } catch (error) {
      setError("Error al enviar respuesta");
    }
  };

  // Like a comentario
  const handleLike = async (commentId) => {
    try {
      await fetch('/api/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId })
      });
      setSuccess("¡Gracias por tu like!");
    } catch (error) {
      setError("Error al dar like");
    }
  };

  // No renderizar nada hasta que estemos en el cliente
  if (!mounted) {
    return (
      <section className="bg-[#1B1F3B] rounded-lg p-6 border border-[#003B8D] mt-8">
        <h3 className="text-xl font-bold text-[#00C6FF] mb-4">Comentarios</h3>
        <p className="text-[#A3A8CC]">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="bg-[#1B1F3B] rounded-lg p-6 border border-[#003B8D] mt-8">
      <h3 className="text-xl font-bold text-[#00C6FF] mb-4">Comentarios</h3>
      <form className="flex flex-col gap-2 mb-6" onSubmit={handleSubmit}>
        <input
          className="px-2 py-1 rounded bg-[#0C0C2C] text-[#A3A8CC] border border-[#003B8D]"
          placeholder="Tu nombre"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
        <input
          className="px-2 py-1 rounded bg-[#0C0C2C] text-[#A3A8CC] border border-[#003B8D]"
          placeholder="Tu email (opcional)"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
        />
        <textarea
          className="px-2 py-1 rounded bg-[#0C0C2C] text-[#A3A8CC] border border-[#003B8D]"
          placeholder="Escribe tu comentario..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button className="self-end px-4 py-1 bg-[#00C6FF] text-[#0C0C2C] rounded hover:bg-[#0099cc] font-semibold">Comentar</button>
        {error && <p className="text-[#FF4C61] text-sm">{error}</p>}
        {success && <p className="text-[#00D68F] text-sm">{success}</p>}
      </form>
      {loading ? (
        <p className="text-[#A3A8CC]">Cargando comentarios...</p>
      ) : comments.length === 0 ? (
        <p className="text-[#A3A8CC]">Sé el primero en comentar.</p>
      ) : (
        <div>
          {comments.map(comment => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onReply={handleReply}
              onLike={handleLike}
              onSubmitReply={handleReply}
            />
          ))}
        </div>
      )}
    </section>
  );
} 