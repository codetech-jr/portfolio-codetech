
// schemas/author.js

const author = {
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true, // Permite enfocar la cara en diferentes tamaños de imagen
      },
    },
    {
      name: 'bio',
      title: 'Biografía',
      type: 'text', // Un campo de texto más largo que un string
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}

export default author