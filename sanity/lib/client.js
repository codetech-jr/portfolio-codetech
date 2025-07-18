import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

console.log('Creando cliente Sanity con:', { projectId, dataset, apiVersion });

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Cambiado a false para desarrollo
})
