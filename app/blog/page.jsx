import Link from 'next/link';

async function getArticles() {
  try {
    // CAMBIO 1: Usamos 127.0.0.1 en lugar de localhost para evitar problemas de red de Node.js
    const res = await fetch('http://localhost:1337/api/articles?populate=*', { cache: 'no-store' });

    if (!res.ok) {
      // Si esto falla, el error se mostrará en la terminal de tu portafolio
      throw new Error(`Failed to fetch articles. Status: ${res.status}`);
    }

    const data = await res.json();
    // Devolvemos el array de datos
    return data.data;
  } catch (error) {
    console.error("Error en getArticles:", error);
    // Devolvemos un array vacío si hay un error para que la página no se rompa
    return [];
  }
}

export default async function BlogPage() {
  const articles = await getArticles();
  
  // Puedes usar este console.log para ver en tu terminal de Next.js lo que recibe el componente
  // console.log("Artículos recibidos en el componente:", articles);

  return (
    <div className="container py-12 mx-auto">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles && articles.length > 0 ? (
          articles
            // CAMBIO 2: Filtramos directamente por article.slug, sin .attributes
            .filter((article) => article && article.slug)
            .map((article) => (
            // CAMBIO 3: Usamos article.slug directamente para el enlace
            <Link href={`/blog/${article.slug}`} key={article.id}>
              <div className="overflow-hidden transition-shadow duration-300 border rounded-lg hover:shadow-lg">
                {/* CAMBIO 4: Si tienes un campo 'coverImage', se accede directamente. Si no, esta parte no se mostrará. */}
                {article.coverImage?.data && (
                  <img
                    src={`http://127.0.0.1:1337${article.coverImage.data.attributes.url}`}
                    alt={article.Title} // Usamos article.Title
                    className="object-cover w-full h-48"
                  />
                )}
                <div className="p-6">
                  {/* CAMBIO 5: Usamos article.Title (con 'T' mayúscula, como en tu API) */}
                  <h2 className="mb-2 text-2xl font-bold">{article.Title}</h2>
                  {/* CAMBIO 6: Usamos article.publishedAt directamente */}
                  <p className="text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No se encontraron artículos. ¿Ya has publicado alguno en Strapi?</p>
        )}
      </div>
    </div>
  );
}