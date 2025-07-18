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
      return {
        title: title,
        subtitle: `Tag: ${title}`,
        media: () => (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: color === 'bg-[#00C6FF]' ? '#00C6FF' : 
                           color === 'bg-[#FF6B6B]' ? '#FF6B6B' :
                           color === 'bg-[#4ECDC4]' ? '#4ECDC4' :
                           color === 'bg-[#FFE66D]' ? '#FFE66D' :
                           color === 'bg-[#A8E6CF]' ? '#A8E6CF' :
                           color === 'bg-[#FF8A80]' ? '#FF8A80' : '#00C6FF'
          }} />
        )
      };
    },
  },
};

export default tag; 