const comment = {
  name: 'comment',
  title: 'Comentario',
  type: 'document',
  fields: [
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'text',
      validation: Rule => Rule.required(),
    },
    {
      name: 'createdAt',
      title: 'Fecha de creación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'parent',
      title: 'Comentario padre',
      type: 'reference',
      to: [{ type: 'comment' }],
      description: 'Si es una respuesta, referencia al comentario padre',
    },
  ],
};

export default comment; 