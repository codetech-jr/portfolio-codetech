// schemas/post.js

const post = {
  name: 'post',
  title: 'Post',
  type: 'document',
  // Agrupamos los campos para una mejor UI en el Studio
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'meta', title: 'Metadatos' },
    { name: 'seo', title: 'SEO' }, // <-- NUEVO GRUPO
  ],
  fields: [
    // --- Grupo de Contenido ---
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().error('El título es obligatorio.'),
    },
    {
      name: 'slug',
      title: 'Slug (URL Amigable)',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [ // Campo opcional para el texto alternativo (muy bueno para SEO y accesibilidad)
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          description: 'Describe la imagen para accesibilidad y SEO.',
        }
      ]
    },
    {
      name: 'excerpt',
      title: 'Extracto / Resumen',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Un resumen corto para vistas previas y SEO. Máx 200 caracteres.',
      validation: Rule => Rule.max(200).warning('Un extracto corto es mejor para SEO.')
    },
    {
      name: 'body',
      title: 'Cuerpo del Post',
      type: 'blockContent', // Hacemos referencia a nuestro schema de texto enriquecido
      group: 'content',
      validation: (Rule) => Rule.required(),
    },

    // --- Grupo de Metadatos ---
    {
      name: 'author',
      title: 'Autor',
      type: 'reference', // Crea una relación con otro documento
      to: {type: 'author'}, // Apunta al schema de 'author'
      group: 'meta',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      group: 'meta',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'meta',
      of: [{type: 'reference', to: {type: 'tag'}}],
      description: 'Tags para mejorar la búsqueda y organización del contenido.',
    },
    {
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    },
     {
      name: 'seoTitle',
      title: 'Título para SEO',
      type: 'string',
      group: 'seo',
      description: 'Título que aparecerá en Google (máx. 60 caracteres). Si se deja vacío, se usará el título principal del post.',
      validation: Rule => Rule.max(60).warning('Un título más corto es mejor para SEO.'),
    },
    {
      name: 'seoDescription',
      title: 'Meta Descripción',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Descripción para Google (máx. 155 caracteres). Crucial para el CTR.',
      validation: Rule => Rule.max(155).error('La meta descripción no puede exceder los 155 caracteres.'),
    },
    {
      name: 'seoImage',
      title: 'Imagen para Redes Sociales (Open Graph)',
      type: 'image',
      group: 'seo',
      description: 'Imagen que se mostrará al compartir el enlace (ej. en Twitter, LinkedIn). Dimensiones recomendadas: 1200x630px.',
    },
  ],

  // Ordena los posts por fecha de publicación descendente por defecto en el Studio
  orderings: [{
    title: 'Fecha de Publicación, Recientes primero',
    name: 'publishedAtDesc',
    by: [{field: 'publishedAt', direction: 'desc'}]
  }],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection;
      return {...selection, subtitle: author && `por ${author}`};
    },
  },
};

export default post;