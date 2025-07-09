import React from "react";
import { FaRegHandshake, FaFileSignature, FaSitemap, FaCode, FaCheckCircle, FaRocket, FaUserGraduate, FaTools } from "react-icons/fa";

export const timelinePhases = [
  {
    id: "contacto",
    title: "1. Contacto Inicial y Descubrimiento",
    icon: FaRegHandshake,
    summary: [
      "Primera reunión para entender el objetivo de tu web y tu negocio.",
      "Preguntas clave: público objetivo, funcionalidades, contenido, presupuesto y plazos.",
      "Recopilación de requisitos para evitar malentendidos."
    ],
  },
  {
    id: "propuesta",
    title: "2. Propuesta, Cotización y Contrato",
    icon: FaFileSignature,
    summary: [
      "Elaboración de propuesta detallada: alcance, cronograma y presupuesto.",
      "Redacción de contrato: condiciones de pago, revisiones, propiedad intelectual y cláusulas de cancelación."
    ],
  },
  {
    id: "planificacion",
    title: "3. Planificación y Diseño (UI/UX)",
    icon: FaSitemap,
    summary: [
      "Arquitectura de la información y sitemap.",
      "Wireframes para estructura y mockups para el diseño visual.",
      "Opcional: prototipos interactivos para validar la experiencia."
    ],
  },
  {
    id: "desarrollo",
    title: "4. Desarrollo",
    icon: FaCode,
    summary: [
      "Configuración del entorno y servidor de pruebas.",
      "Desarrollo frontend y backend.",
      "Integraciones con servicios externos."
    ],
  },
  {
    id: "pruebas",
    title: "5. Pruebas y Revisiones",
    icon: FaCheckCircle,
    summary: [
      "Acceso al cliente para feedback.",
      "Pruebas de compatibilidad, responsividad, rendimiento y funcionalidad."
    ],
  },
  {
    id: "lanzamiento",
    title: "6. Lanzamiento",
    icon: FaRocket,
    summary: [
      "Checklist final y migración al servidor de producción.",
      "Configuración de dominio, SSL y pruebas finales."
    ],
  },
  {
    id: "entrega",
    title: "7. Entrega, Facturación y Formación",
    icon: FaUserGraduate,
    summary: [
      "Envío de factura final y entrega de credenciales.",
      "Formación para que gestiones tu web de forma autónoma, en caso de ser necesario."
    ],
  },
  {
    id: "post-lanzamiento",
    title: "8. Post-Lanzamiento: Mantenimiento y Soporte",
    icon: FaTools,
    summary: [
      "Planes de mantenimiento opcionales: actualizaciones, backups y soporte.",
      "Soporte por demanda para futuras mejoras."
    ],
  },
];