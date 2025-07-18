// app/api/comments/route.js
import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// GET - Obtener comentarios de un post
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ comments: [] });
    }

    // Por ahora, simularemos comentarios ya que no tenemos una base de datos real
    // En producción, esto se conectaría a una base de datos como MongoDB o PostgreSQL
    const mockComments = [
      {
        id: '1',
        postId: postId,
        name: 'María García',
        email: 'maria@example.com',
        content: 'Excelente artículo! Me ayudó mucho a entender los conceptos de SEO. ¿Tienes algún post sobre Core Web Vitals?',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
        likes: 3,
        liked: false,
        replies: [
          {
            id: '1-1',
            postId: postId,
            parentId: '1',
            name: 'Admin',
            email: 'admin@codetechjunior.com',
            content: '¡Gracias María! Sí, tengo planeado escribir sobre Core Web Vitals próximamente. ¡Mantente atenta!',
            createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 horas atrás
            likes: 1,
            liked: false
          }
        ]
      },
      {
        id: '2',
        postId: postId,
        name: 'Carlos Rodríguez',
        email: 'carlos@example.com',
        content: 'Muy bien explicado. ¿Podrías hacer un tutorial paso a paso sobre implementación?',
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 días atrás
        likes: 1,
        liked: true,
        replies: []
      },
      {
        id: '3',
        postId: postId,
        name: 'Ana López',
        email: 'ana@example.com',
        content: 'Interesante perspectiva. Nunca había pensado en eso de esa manera. ¡Gracias por compartir!',
        createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 días atrás
        likes: 2,
        liked: false,
        replies: []
      }
    ];

    return NextResponse.json({
      comments: mockComments,
      total: mockComments.length
    });

  } catch (error) {
    console.error('Error obteniendo comentarios:', error);
    return NextResponse.json(
      { error: 'Error al obtener comentarios' },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo comentario
export async function POST(request) {
  try {
    const body = await request.json();
    const { postId, postSlug, name, email, content, parentId } = body;

    // Validaciones básicas
    if (!postId || !name || !email || !content) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    if (content.length < 10) {
      return NextResponse.json(
        { error: 'El comentario debe tener al menos 10 caracteres' },
        { status: 400 }
      );
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // En producción, aquí guardarías el comentario en la base de datos
    // Por ahora, simulamos la creación
    const newComment = {
      id: Date.now().toString(),
      postId,
      postSlug,
      name,
      email,
      content,
      parentId,
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: []
    };

    // Aquí podrías enviar una notificación por email al autor del post
    // y guardar en la base de datos

    return NextResponse.json({
      success: true,
      comment: newComment,
      message: 'Comentario publicado exitosamente'
    });

  } catch (error) {
    console.error('Error creando comentario:', error);
    return NextResponse.json(
      { error: 'Error al crear comentario' },
      { status: 500 }
    );
  }
} 