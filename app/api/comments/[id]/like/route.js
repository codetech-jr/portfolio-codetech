// app/api/comments/[id]/like/route.js
import { NextResponse } from 'next/server';

// POST - Dar/quitar like a un comentario
export async function POST(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID de comentario requerido' },
        { status: 400 }
      );
    }

    // En producción, aquí verificarías si el usuario ya dio like
    // y actualizarías la base de datos
    // Por ahora, simulamos la respuesta

    // Simular un like exitoso
    const response = {
      success: true,
      message: 'Like actualizado exitosamente',
      commentId: id,
      // En producción, devolverías el nuevo conteo de likes
      newLikeCount: Math.floor(Math.random() * 10) + 1
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error actualizando like:', error);
    return NextResponse.json(
      { error: 'Error al actualizar like' },
      { status: 500 }
    );
  }
} 