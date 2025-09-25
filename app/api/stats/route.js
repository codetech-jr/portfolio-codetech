import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

// Cliente de solo lectura (Cdn off en env)
const readClient = createClient({ projectId, dataset, apiVersion, useCdn: false })

// Cliente con token para escritura en Sanity
const writeToken = process.env.SANITY_WRITE_TOKEN
const writeClient = writeToken
	? createClient({ projectId, dataset, apiVersion, token: writeToken, useCdn: false })
	: null

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const postId = searchParams.get('postId')
		if (!postId) {
			return NextResponse.json({ error: 'Falta postId' }, { status: 400 })
		}
		const query = `*[_type == "post" && _id == $postId][0]{
			views, likes, shares
		}`
		const stats = await readClient.fetch(query, { postId })
		return NextResponse.json(stats || { views: 0, likes: 0, shares: 0 })
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	try {
		const body = await request.json()
		const { postId, type } = body || {}
		if (!postId || !['views', 'likes', 'shares'].includes(type)) {
			return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
		}
		if (!writeClient) {
			return NextResponse.json({ error: 'Falta SANITY_WRITE_TOKEN en variables de entorno' }, { status: 500 })
		}

		// Evitar vistas duplicadas por 12 horas mediante cookie por post
		if (type === 'views') {
			const cookieName = `viewed_${postId}`
			const incomingCookies = request.headers.get('cookie') || ''
			if (incomingCookies.split(';').some((c) => c.trim().startsWith(`${cookieName}=`))) {
				// Ya contamos recientemente, no incrementar
				return NextResponse.json({ success: true, deduped: true })
			}
			// Continuar y luego devolver cookie
			await writeClient
				.patch(postId)
				.setIfMissing({ [type]: 0 })
				.inc({ [type]: 1 })
				.commit()

			const res = NextResponse.json({ success: true })
			// 12 horas
			const maxAge = 60 * 60 * 12
			res.headers.append('Set-Cookie', `${cookieName}=1; Path=/; Max-Age=${maxAge}; SameSite=Lax`)
			return res
		}

		// Para likes/shares no deduplicamos aquí (cliente maneja UI)
		await writeClient
			.patch(postId)
			.setIfMissing({ [type]: 0 })
			.inc({ [type]: 1 })
			.commit()
		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
} 