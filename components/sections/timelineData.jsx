import React from "react";

const IconHandshake = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);
const IconFileSignature = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="3" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M7 7h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const IconSitemap = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 6h6v6H3zM15 6h6v6h-6zM9 16h6v6H9z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCode = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M10 17l-5-5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCheck = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M9 16.2L4.8 12l1.4-1.4L9 13.4l8.8-8.8L19.2 6z" />
  </svg>
);
const IconRocket = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M14 3s3 1 5 3 3 5 3 5-2 1-4 3-5 3-5 3-1-3-3-5-3-4-3-4 2-3 4-5 4-3 4-3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconGraduate = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconTools = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M14 3l7 7-7 7-7-7 7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const timelinePhases = [
  {
    id: "contacto",
    title: "1. Contacto Inicial y Descubrimiento",
    icon: IconHandshake,
    summary: [
      "Primera reunión para entender el objetivo de tu web y tu negocio.",
      "Preguntas clave: público objetivo, funcionalidades, contenido, presupuesto y plazos.",
      "Recopilación de requisitos para evitar malentendidos."
    ],
  },
  {
    id: "propuesta",
    title: "2. Propuesta, Cotización y Contrato",
    icon: IconFileSignature,
    summary: [
      "Elaboración de propuesta detallada: alcance, cronograma y presupuesto.",
      "Redacción de contrato: condiciones de pago, revisiones, propiedad intelectual y cláusulas de cancelación."
    ],
  },
  {
    id: "planificacion",
    title: "3. Planificación y Diseño (UI/UX)",
    icon: IconSitemap,
    summary: [
      "Arquitectura de la información y sitemap.",
      "Wireframes para estructura y mockups para el diseño visual.",
      "Opcional: prototipos interactivos para validar la experiencia."
    ],
  },
  {
    id: "desarrollo",
    title: "4. Desarrollo",
    icon: IconCode,
    summary: [
      "Configuración del entorno y servidor de pruebas.",
      "Desarrollo frontend y backend.",
      "Integraciones con servicios externos."
    ],
  },
  {
    id: "pruebas",
    title: "5. Pruebas y Revisiones",
    icon: IconCheck,
    summary: [
      "Acceso al cliente para feedback.",
      "Pruebas de compatibilidad, responsividad, rendimiento y funcionalidad."
    ],
  },
  {
    id: "lanzamiento",
    title: "6. Lanzamiento",
    icon: IconRocket,
    summary: [
      "Checklist final y migración al servidor de producción.",
      "Configuración de dominio, SSL y pruebas finales."
    ],
  },
  {
    id: "entrega",
    title: "7. Entrega, Facturación y Formación",
    icon: IconGraduate,
    summary: [
      "Envío de factura final y entrega de credenciales.",
      "Formación para que gestiones tu web de forma autónoma, en caso de ser necesario."
    ],
  },
  {
    id: "post-lanzamiento",
    title: "8. Post-Lanzamiento: Mantenimiento y Soporte",
    icon: IconTools,
    summary: [
      "Planes de mantenimiento opcionales: actualizaciones, backups y soporte.",
      "Soporte por demanda para futuras mejoras."
    ],
  },
];