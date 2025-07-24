import { client } from '@/sanity/lib/client';

/**
 * API para leer e incrementar estadísticas de un post
 * Métodos:
 *   - GET: obtener stats de un post (por id)
 *   - POST: incrementar un contador (views, likes, shares)
 * Body: { postId, type } donde type es 'views' | 'likes' | 'shares'
 */
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { postId } = req.query;
    if (!postId) return res.status(400).json({ error: 'Falta postId' });
    try {
      const query = `*[_type == "post" && _id == $postId][0]{ views, likes, shares }`;
      const stats = await client.fetch(query, { postId });
      return res.status(200).json(stats || { views: 0, likes: 0, shares: 0 });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  if (req.method === 'POST') {
    const { postId, type } = req.body;
    if (!postId || !['views','likes','shares'].includes(type)) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }
    try {
      // Incrementar el contador en Sanity
      await client.patch(postId)
        .setIfMissing({ [type]: 0 })
        .inc({ [type]: 1 })
        .commit();
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  return res.status(405).json({ error: 'Método no permitido' });
} 