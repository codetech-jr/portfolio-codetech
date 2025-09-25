// sanity/schemaTypes/newsletterSubscriberType.js

const newsletterSubscriberType = {
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email' }),
    },
    {
      name: 'token',
      title: 'Confirm Token',
      type: 'string',
      description: 'Token de confirmación para doble opt-in',
    },
    {
      name: 'confirmedAt',
      title: 'Confirmado en',
      type: 'datetime',
    },
    {
      name: 'unsubscribedAt',
      title: 'Dado de baja en',
      type: 'datetime',
    },
    {
      name: 'createdAt',
      title: 'Fecha de suscripción',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
}

export default newsletterSubscriberType 