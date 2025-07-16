// schemas/blockContent.js

/**
 * Este es el schema para el cuerpo del post.
 * Permite texto enriquecido estándar (negritas, listas, etc.) y
 * añade un tipo personalizado para bloques de código.
 */
const blockContentType = {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block', // El tipo de bloque de texto estándar
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Cita', value: 'blockquote'},
      ],
      lists: [{title: 'Viñetas', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Negrita', value: 'strong'},
          {title: 'Énfasis', value: 'em'},
          {title: 'Código', value: 'code'}, // Para código inline
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    // Permite añadir imágenes directamente en el cuerpo del texto
    {
      type: 'image',
      options: {hotspot: true},
    },
    // ¡Nuestro bloque de código personalizado!
    {
      type: 'code', // Este es el tipo que provee el plugin @sanity/code-input
      options: {
        withFilename: true, // Permite añadir un nombre de archivo al bloque de código
      },
    },
  ],
}

export default blockContentType