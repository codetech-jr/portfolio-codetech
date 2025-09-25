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

function CommentItem({ comment, onReply, onLike, replyingTo, onSubmitReply, onDelete, canDelete }) {
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#00C6FF]">{comment.author}</span>
        <span className="text-xs text-[#A3A8CC]">{timeAgo(comment.createdAt)}</span>
        {canDelete && (
          <button
            className="ml-2 text-xs text-[#FF4C61] hover:underline"
            onClick={() => onDelete(comment._id)}
          >
            Eliminar
          </button>
        )}
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
          onSubmit={async e => {
            e.preventDefault();
            setSubmitting(true);
            await onSubmitReply({
              content: reply,
              author: replyAuthor,
              email: replyEmail,
              parent: comment._id
            });
            setSubmitting(false);
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
          <button disabled={submitting} className="self-end px-4 py-1 bg-[#00C6FF] text-[#0C0C2C] rounded hover:bg-[#0099cc] font-semibold disabled:opacity-50">{submitting ? 'Enviando...' : 'Enviar'}</button>
        </form>
      )}
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
              onDelete={onDelete}
              canDelete={canDelete}
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
  const [canDelete, setCanDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    const k = localStorage.getItem('adminKey');
    setCanDelete(Boolean(k));
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!author || !content) {
      setError("Nombre y comentario son obligatorios");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, author, email, content })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSuccess("¡Comentario enviado!");
        setAuthor("");
        setEmail("");
        setContent("");
      } else {
        setError(data?.error || "Error al enviar comentario");
      }
    } catch (error) {
      setError("Error de conexión");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async ({ content, author, email, parent }) => {
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, author, email, content, parent })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setSuccess("¡Respuesta enviada!");
      else setError(data?.error || "Error al enviar respuesta");
    } catch (error) {
      setError("Error al enviar respuesta");
    }
  };

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

  const handleDelete = async (commentId) => {
    const adminKey = localStorage.getItem('adminKey') || '';
    if (!adminKey) return alert('Falta adminKey. Guarda tu clave en localStorage como "adminKey".');
    if (!confirm('¿Eliminar este comentario y sus respuestas?')) return;
    try {
      const res = await fetch(`/api/comments?commentId=${commentId}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey }
      });
      if (res.ok) setSuccess('Comentario eliminado');
      else {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || 'No autorizado o error al eliminar');
      }
    } catch (e) {
      alert('Error de conexión');
    }
  };

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
        <button disabled={submitting} className="self-end px-4 py-1 bg-[#00C6FF] text-[#0C0C2C] rounded hover:bg-[#0099cc] font-semibold disabled:opacity-50">{submitting ? 'Enviando...' : 'Comentar'}</button>
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
              onDelete={handleDelete}
              canDelete={canDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
} 