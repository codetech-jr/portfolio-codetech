import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const writeToken = process.env.SANITY_WRITE_TOKEN
const client = writeToken ? createClient({ projectId, dataset, apiVersion, token: writeToken, useCdn: false }) : null

export async function GET(request) {
  try {
    if (!client) return NextResponse.json({ error: 'No hay token de escritura' }, { status: 500 })
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    if (!token) return NextResponse.json({ error: 'Falta token' }, { status: 400 })

    const sub = await client.fetch(`*[_type == "newsletterSubscriber" && token == $token][0]{ _id }`, { token })
    if (!sub?._id) return NextResponse.json({ error: 'Token inválido' }, { status: 400 })

    await client.patch(sub._id).set({ confirmedAt: new Date().toISOString(), token: null }).commit()
    return NextResponse.redirect(new URL('/?newsletter=confirmed', request.url))
  } catch (e) {
    return NextResponse.json({ error: 'Error al confirmar' }, { status: 500 })
  }
} 