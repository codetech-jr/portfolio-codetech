// app/api/contact/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Instancia de Resend usando la API Key de tu .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, selectedPackage } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Nombre y Email son requeridos.' }, { status: 400 });
    }

    // Envía el email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // ¡Usa el dominio de prueba o tu dominio verificado!
      to: ['tu-email-personal@gmail.com'], // El email donde QUIERES RECIBIR la notificación
      subject: `Nuevo contacto desde tu portfolio - Paquete: ${selectedPackage}`,
      react: (
        <div>
          <h1>Nueva solicitud de contacto</h1>
          <p><strong>Paquete de interés:</strong> {selectedPackage}</p>
          <p><strong>Nombre:</strong> {name}</p>
          <p><strong>Email del cliente:</strong> {email}</p>
          <hr />
          <p><strong>Mensaje:</strong></p>
          <p>{message}</p>
        </div>
      ),
    });

    if (error) {
      console.error("Error al enviar con Resend:", error);
      return NextResponse.json({ error: 'Error al enviar el email.' }, { status: 500 });
    }

    return NextResponse.json({ message: "Email enviado con éxito!", data }, { status: 200 });

  } catch (error) {
    console.error("Error general:", error);
    return NextResponse.json({ error: 'Hubo un error al procesar la solicitud.' }, { status: 500 });
  }
}