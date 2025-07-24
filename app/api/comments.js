import { client } from '@/sanity/lib/client';

/**
 * API para comentarios de posts
 * Métodos:
 *   - GET: listar comentarios de un post (?postId=...)
 *   - POST: crear comentario (body: { postId, author, email, content, parent })
 *   - PATCH: dar like a un comentario (body: { commentId })
 */
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { postId } = req.query;
    if (!postId) return res.status(400).json({ error: 'Falta postId' });
    try {
      // Traer comentarios raíz y sus respuestas
      const query = `*[_type == "comment" && post._ref == $postId && !defined(parent)] | order(createdAt asc){
        _id, author, content, createdAt, likes,
        replies: *[_type == 'comment' && parent._ref == ^._id] | order(createdAt asc){
          _id, author, content, createdAt, likes, parent
        }
      }`;
      const comments = await client.fetch(query, { postId });
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  if (req.method === 'POST') {
    const { postId, author, email, content, parent } = req.body;
    if (!postId || !author || !content) {
      return res.status(400).json({ error: 'Datos requeridos faltantes' });
    }
    try {
      const doc = {
        _type: 'comment',
        post: { _type: 'reference', _ref: postId },
        author,
        email,
        content,
        createdAt: new Date().toISOString(),
        likes: 0,
        parent: parent ? { _type: 'reference', _ref: parent } : undefined,
      };
      const created = await client.create(doc);
      return res.status(201).json(created);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  if (req.method === 'PATCH') {
    const { commentId } = req.body;
    if (!commentId) return res.status(400).json({ error: 'Falta commentId' });
    try {
      await client.patch(commentId)
        .setIfMissing({ likes: 0 })
        .inc({ likes: 1 })
        .commit();
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  return res.status(405).json({ error: 'Método no permitido' });
} 