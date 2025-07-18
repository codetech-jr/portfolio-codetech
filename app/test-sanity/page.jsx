import { client } from '@/sanity/lib/client';

export default async function TestSanityPage() {
  try {
    // Verificar configuración
    const config = client.config();
    console.log('Configuración Sanity:', config);
    
    // Probar consulta simple
    const testQuery = `*[_type == "post"]`;
    const posts = await client.fetch(testQuery);
    console.log('Posts encontrados:', posts);
    
    return (
      <div className="min-h-screen bg-[#0C0C2C] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#00C6FF] mb-6">
            Prueba de Configuración Sanity
          </h1>
          
          <div className="bg-[#1B1F3B] p-6 rounded-lg border border-[#003B8D] mb-6">
            <h2 className="text-xl font-bold text-[#00C6FF] mb-4">Configuración</h2>
            <pre className="text-[#A3A8CC] text-sm overflow-auto">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
          
          <div className="bg-[#1B1F3B] p-6 rounded-lg border border-[#003B8D]">
            <h2 className="text-xl font-bold text-[#00C6FF] mb-4">Posts Encontrados</h2>
            <p className="text-[#A3A8CC] mb-4">
              Total de posts: {posts ? posts.length : 0}
            </p>
            <pre className="text-[#A3A8CC] text-sm overflow-auto">
              {JSON.stringify(posts, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error en prueba Sanity:', error);
    
    return (
      <div className="min-h-screen bg-[#0C0C2C] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#00C6FF] mb-6">
            Error en Configuración Sanity
          </h1>
          
          <div className="bg-[#1B1F3B] p-6 rounded-lg border border-[#FF4C61]">
            <h2 className="text-xl font-bold text-[#FF4C61] mb-4">Error</h2>
            <p className="text-[#A3A8CC] mb-4">
              {error.message}
            </p>
            <pre className="text-[#A3A8CC] text-sm overflow-auto">
              {error.stack}
            </pre>
          </div>
        </div>
      </div>
    );
  }
} 