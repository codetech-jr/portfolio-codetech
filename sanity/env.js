// sanity/env.js (modificación para prueba rápida)

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-11-15'

// Se asigna directamente el valor si la variable de entorno no existe
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vzcmb61s' // <-- TU PROJECT ID AQUÍ
export const useCdn = false