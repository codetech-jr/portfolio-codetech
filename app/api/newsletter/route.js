import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const writeToken = process.env.SANITY_WRITE_TOKEN
const client = writeToken ? createClient({ projectId, dataset, apiVersion, token: writeToken, useCdn: false }) : null

// Memoria simple anti spam por email (1/min)
const emailBuckets = new Map()

function generateToken() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

export async function POST(request) {
  try {
    if (!client) return NextResponse.json({ error: 'No hay token de escritura' }, { status: 500 })
    const { email } = await request.json()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    const now = Date.now()
    const bucket = emailBuckets.get(email) || { at: 0 }
    if (now - bucket.at < 60000) {
      return NextResponse.json({ error: 'Intenta de nuevo en un minuto' }, { status: 429 })
    }
    emailBuckets.set(email, { at: now })

    const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

    // Crear/actualizar con token
    const existing = await client.fetch(`*[_type == "newsletterSubscriber" && email == $email][0]{ _id, confirmedAt }`, { email })
    const token = generateToken()

    if (existing?._id) {
      await client.patch(existing._id).set({ token, unsubscribedAt: null }).commit()
    } else {
      await client.create({ _type: 'newsletterSubscriber', email, token, createdAt: new Date().toISOString() })
    }

    // Enviar email con Resend
    const apiKey = process.env.RESEND_API_KEY_NEWSLETTER || process.env.RESEND_API_KEY
    const from = process.env.EMAIL_FROM_NEWSLETTER || process.env.EMAIL_FROM || 'noreply@example.com'
    if (!apiKey) return NextResponse.json({ error: 'Falta RESEND_API_KEY_NEWSLETTER/RESEND_API_KEY' }, { status: 500 })

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const confirmUrl = `${siteUrl}/api/newsletter/confirm?token=${token}`
    const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`

    await resend.emails.send({
      from,
      to: email,
      subject: 'Confirma tu suscripción',
      html: `<div style="font-family:sans-serif">
        <h2>Confirma tu suscripción</h2>
        <p>Gracias por suscribirte. Haz clic en el siguiente enlace para confirmar:</p>
        <p><a href="${confirmUrl}">Confirmar suscripción</a></p>
        <hr/>
        <p>Si no fuiste tú, puedes ignorar este correo o <a href="${unsubscribeUrl}">darte de baja</a>.</p>
      </div>`
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Newsletter subscribe error:', e)
    return NextResponse.json({ error: 'Error al suscribir' }, { status: 500 })
  }
} 