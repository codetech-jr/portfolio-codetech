// app/api/comments/route.js
import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

const readClient = createClient({ projectId, dataset, apiVersion, useCdn: false });
const writeToken = process.env.SANITY_WRITE_TOKEN;
const writeClient = writeToken
  ? createClient({ projectId, dataset, apiVersion, token: writeToken, useCdn: false })
  : null;

// Palabras prohibidas básicas
const BANNED_WORDS = ['spam', 'oferta', 'casino', 'xxx'];

// Memoria simple para rate limit por IP (resetea con el proceso)
const ipBuckets = new Map(); // key: `${ip}:${postId}`, value: { count, resetAtMs }
const LIMIT_PER_MINUTE = 1;
const WINDOW_MS = 60 * 1000;

function getClientIp(request) {
  // Encabezados comunes detrás de proxies
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || request.headers.get('cf-connecting-ip')
    || request.headers.get('x-client-ip')
    || request.headers.get('x-forwarded')
    || request.headers.get('fastly-client-ip')
    || request.headers.get('true-client-ip')
    || request.headers.get('x-cluster-client-ip')
    || request.headers.get('x-forwarded-for')
    || request.headers.get('forwarded')
    || request.headers.get('remote-addr')
    || 'unknown';
  return ip;
}

// GET - Obtener comentarios de un post con replies
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json([]);
    }

    // 1) Traer comentarios raíz
    const rootsQuery = `*[_type == "comment" && post._ref == $postId && !defined(parent)] | order(createdAt asc){
      _id, author, content, createdAt, likes
    }`;
    const roots = await readClient.fetch(rootsQuery, { postId });

    if (!roots?.length) return NextResponse.json([]);

    // 2) Traer todas las replies en un solo query y agrupar por parent
    const rootIds = roots.map(r => r._id);
    const repliesQuery = `*[_type == "comment" && defined(parent) && parent._ref in $rootIds] | order(createdAt asc){
      _id, author, content, createdAt, likes, parent
    }`;
    const replies = await readClient.fetch(repliesQuery, { rootIds });

    const parentToReplies = new Map();
    for (const r of replies || []) {
      const list = parentToReplies.get(r.parent?._ref) || [];
      list.push({ _id: r._id, author: r.author, content: r.content, createdAt: r.createdAt, likes: r.likes, parent: r.parent });
      parentToReplies.set(r.parent?._ref, list);
    }

    const withReplies = roots.map(root => ({
      ...root,
      replies: parentToReplies.get(root._id) || []
    }));

    return NextResponse.json(withReplies);
  } catch (error) {
    console.error('Error obteniendo comentarios:', error);
    return NextResponse.json({ error: String(error?.message || error) }, { status: 500 });
  }
}

// POST - Crear un nuevo comentario
export async function POST(request) {
  try {
    const body = await request.json();
    const { postId, author, email, content, parent } = body || {};

    if (!postId || !author || !content) {
      return NextResponse.json({ error: 'Datos requeridos faltantes' }, { status: 400 });
    }
    if (!writeClient) {
      return NextResponse.json({ error: 'Falta SANITY_WRITE_TOKEN' }, { status: 500 });
    }

    // Rate limit por IP (1/min)
    const ip = getClientIp(request);
    const key = `${ip}:${postId}`;
    const now = Date.now();
    const bucket = ipBuckets.get(key) || { count: 0, resetAtMs: now + WINDOW_MS };
    if (now > bucket.resetAtMs) {
      bucket.count = 0;
      bucket.resetAtMs = now + WINDOW_MS;
    }
    if (bucket.count >= LIMIT_PER_MINUTE) {
      const retrySec = Math.ceil((bucket.resetAtMs - now) / 1000);
      return NextResponse.json({ error: `Demasiado rápido desde tu IP. Intenta en ${retrySec}s.` }, { status: 429 });
    }
    bucket.count += 1;
    ipBuckets.set(key, bucket);

    // Rate limit simple por cookie 60s por post (cliente)
    const rlCookie = `comment_rl_${postId}`;
    const cookies = request.headers.get('cookie') || '';
    if (cookies.split(';').some(c => c.trim().startsWith(`${rlCookie}=`))) {
      return NextResponse.json({ error: 'Demasiado rápido. Intenta de nuevo en 1 minuto.' }, { status: 429 });
    }

    // Filtro de palabras prohibidas
    const lower = content.toLowerCase();
    if (BANNED_WORDS.some(w => lower.includes(w))) {
      return NextResponse.json({ error: 'Tu comentario contiene palabras no permitidas.' }, { status: 400 });
    }

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

    const created = await writeClient.create(doc);
    const res = NextResponse.json(created, { status: 201 });
    res.headers.append('Set-Cookie', `${rlCookie}=1; Path=/; Max-Age=60; SameSite=Lax`);
    return res;
  } catch (error) {
    console.error('Error creando comentario:', error);
    return NextResponse.json({ error: 'Error al crear comentario' }, { status: 500 });
  }
}

// PATCH - Like a un comentario
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { commentId } = body || {};
    if (!commentId) {
      return NextResponse.json({ error: 'Falta commentId' }, { status: 400 });
    }
    if (!writeClient) {
      return NextResponse.json({ error: 'Falta SANITY_WRITE_TOKEN' }, { status: 500 });
    }
    await writeClient
      .patch(commentId)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error dando like:', error);
    return NextResponse.json({ error: 'Error al dar like' }, { status: 500 });
  }
}

// DELETE - Eliminar comentario (admin)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');
    const adminKey = request.headers.get('x-admin-key') || '';

    if (!commentId) {
      return NextResponse.json({ error: 'Falta commentId' }, { status: 400 });
    }
    if (!writeClient) {
      return NextResponse.json({ error: 'Falta SANITY_WRITE_TOKEN' }, { status: 500 });
    }
    if (!adminKey || adminKey !== (process.env.ADMIN_DELETE_KEY || '')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Borrar replies primero
    const replies = await readClient.fetch(`*[_type == "comment" && parent._ref == $id]{ _id }`, { id: commentId });
    const tx = writeClient.transaction();
    for (const r of replies || []) {
      tx.delete(r._id);
    }
    tx.delete(commentId);
    await tx.commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error eliminando comentario:', error);
    return NextResponse.json({ error: 'Error al eliminar comentario' }, { status: 500 });
  }
} 