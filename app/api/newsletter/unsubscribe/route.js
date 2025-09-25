import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const writeToken = process.env.SANITY_WRITE_TOKEN
const client = writeToken ? createClient({ projectId, dataset, apiVersion, token: writeToken, useCdn: false }) : null

export async function GET(request) {
  try {
    if (!client) return NextResponse.json({ error: 'No hay token de escritura' }, { status: 500 })
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'Falta email' }, { status: 400 })

    const sub = await client.fetch(`*[_type == "newsletterSubscriber" && email == $email][0]{ _id }`, { email })
    if (!sub?._id) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })

    await client.patch(sub._id).set({ unsubscribedAt: new Date().toISOString() }).commit()
    return NextResponse.redirect(new URL('/?newsletter=unsubscribed', request.url))
  } catch (e) {
    return NextResponse.json({ error: 'Error al darse de baja' }, { status: 500 })
  }
} 