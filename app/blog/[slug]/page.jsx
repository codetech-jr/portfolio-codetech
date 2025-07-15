import { notFound } from 'next/navigation';
import Image from 'next/image'; // ¡Importante! Usaremos el componente de Next para optimizar imágenes.

// --- Configuración de Next.js para permitir imágenes desde tu dominio de Strapi ---
// OJO: Este cambio va en el archivo `next.config.js`, no aquí.
// Solo es un recordatorio de que debes tenerlo configurado.
// module.exports = {
//   images: {
//     domains: ['127.0.0.1'], 
//   },
// }

// --- La función para obtener el artículo no cambia ---
async function getSingleArticle(slug) {
  try {
    const res = await fetch(`http://127.0.0.1:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch article');
    const data = await res.json();
    if (!data.data || data.data.length === 0) return null;
    return data.data[0];
  } catch (error) {
    console.error("Error en getSingleArticle:", error);
    return null;
  }
}

// --- El componente principal de la página ---
export default async function ArticlePage({ params }) {
  const { slug } = params;
  const article = await getSingleArticle(slug);

  if (!article) {
    notFound();
  }

  // --- Lógica de renderizado actualizada ---
  const renderNode = (node, index) => {
    if (node.type === 'text') {
      let child = <span key={index}>{node.text}</span>;
      if (node.bold) child = <strong key={index}>{child}</strong>;
      if (node.italic) child = <em key={index}>{child}</em>;
      if (node.underline) child = <u key={index}>{child}</u>;
      return child;
    }
    if (node.type === 'link') {
      return (
        <a href={node.url} key={index} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400">
          {node.children.map(renderNode)}
        </a>
      );
    }
    return null;
  };

  const renderContent = () => {
    return article.content.map((block, index) => {
      switch (block.type) {
        case 'heading':
          const Tag = `h${block.level}`;
          return <Tag key={index}>{block.children.map(renderNode)}</Tag>;
        
        case 'paragraph':
          return <p key={index}>{block.children.map(renderNode)}</p>;

        case 'list':
          const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
          return (
            <ListTag key={index}>
              {block.children.map((listItem, i) => (
                <li key={i}>{listItem.children.map(renderNode)}</li>
              ))}
            </ListTag>
          );
        
        // --- ¡NUEVO! AQUÍ ESTÁ LA LÓGICA PARA RENDERIZAR IMÁGENES ---
        case 'image':
          return (
            <div key={index} className="my-8">
              <Image
                src={`http://127.0.0.1:1337${block.image.url}`}
                alt={block.image.alternativeText || 'Imagen del artículo'}
                width={block.image.width}
                height={block.image.height}
                className="mx-auto rounded-lg shadow-lg" // Clases para centrar y estilizar
              />
            </div>
          );
        // -------------------------------------------------------------

        default:
          return null;
      }
    });
  };

  return (
    <div className="container py-12 mx-auto">
      <article className="prose prose-invert lg:prose-xl max-w-none">
        <h1>{article.Title}</h1>
        <p className="lead !-mt-4 !mb-8">Publicado el: {new Date(article.publishedAt).toLocaleDateString()}</p>
        
        {renderContent()}
      </article>
    </div>
  );
}