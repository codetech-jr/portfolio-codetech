// schemas/tag.js

const tag = {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nombre del Tag',
      type: 'string',
      validation: (Rule) => Rule.required().error('El nombre del tag es obligatorio.'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Descripción opcional del tag para SEO.',
    },
    {
      name: 'color',
      title: 'Color del Tag',
      type: 'string',
      options: {
        list: [
          {title: 'Azul', value: 'bg-[#00C6FF]'},
          {title: 'Rojo', value: 'bg-[#FF6B6B]'},
          {title: 'Verde', value: 'bg-[#4ECDC4]'},
          {title: 'Amarillo', value: 'bg-[#FFE66D]'},
          {title: 'Morado', value: 'bg-[#A8E6CF]'},
          {title: 'Naranja', value: 'bg-[#FF8A80]'},
        ]
      },
      initialValue: 'bg-[#00C6FF]'
    }
  ],

  preview: {
    select: {
      title: 'title',
      color: 'color',
    },
    prepare(selection) {
      const {title, color} = selection;
      const colorLabel = (
        color === 'bg-[#00C6FF]' ? 'Azul' :
        color === 'bg-[#FF6B6B]' ? 'Rojo' :
        color === 'bg-[#4ECDC4]' ? 'Verde' :
        color === 'bg-[#FFE66D]' ? 'Amarillo' :
        color === 'bg-[#A8E6CF]' ? 'Morado' :
        color === 'bg-[#FF8A80]' ? 'Naranja' : 'Azul'
      );
      return {
        title: title,
        subtitle: `Tag: ${title} · Color: ${colorLabel}`,
      };
    },
  },
};

export default tag; 