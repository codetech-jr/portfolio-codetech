// /data/case-studies/pedro-salazar.jsx

export const caseStudyData = {
  slug: "deylena-barboza-abogada",
  title: "landing page para Deylena Barboza",
  tagline: "Rediseño de la presencia online de Deylena Barboza, abogada en trámites migratorios.",
  heroImage: "/assets/deylena-abogada-logo.png", // Una imagen grande y de alta calidad del proyecto

  challenge: {
    title: "El Desafío",
    description: "La abogada Deylena Barboza necesitaba una landing page que reflejara su experiencia y confiabilidad en el ámbito de los trámites migratorios. Esta página debía ser una vitrina efectiva para sus servicios legales. Su anterior sitio web no transmitía profesionalismo ni generaba confianza en los visitantes.",
  },

  solution: {
    title: "La Solución",
    description: "Mi enfoque fue crear una web que transmitiera confianza y profesionalismo, estructurada para guiar a los usuarios hacia los servicios y el contacto. El proceso se dividió en tres fases clave:",
    steps: [
      {
        title: "1. Investigación y Arquitectura de la Información",
        content: "Realicé una investigación exhaustiva sobre la competencia y las mejores prácticas en sitios web legales. Luego, diseñé una arquitectura de la información clara y lógica, asegurando que los usuarios pudieran encontrar fácilmente la información que necesitaban.",
        image: "/assets/mockup-deylena-1.png", // Mockup o captura de pantalla
      },
      {
        title: "2. Diseño UX/UI Centrado en la Búsqueda",
        content: "El diseño se centró en la usabilidad y la accesibilidad, con un enfoque 'mobile-first'. Utilicé una paleta de colores sobria y profesional, tipografía legible y elementos visuales que reforzaran la confianza. La navegación fue simplificada para facilitar el acceso a los servicios y la información de contacto.",
        image: "/assets/mockup-deylena-2.png",
      },
      {
        title: "3. Desarrollo del Frontend Interactivo",
        content: "Utilicé Next.js y TailwindCSS para construir una interfaz de usuario dinámica y completamente responsive. La web incluye formularios de contacto optimizados para la conversión, integración con Google Maps para la ubicación de la oficina, y optimización SEO para mejorar la visibilidad en buscadores.",
        image: "/assets/mockup-deylena-3.png",
      }
    ]
  },

  results: {
    title: "El Resultado",
    description: "La nueva web profesional transformó la presencia online de Pedro Salazar, posicionándolo como un abogado confiable y accesible, y generando un impacto medible en la captación de clientes.",
    stats: [
        { value: "+150%", label: "Visitas al sitio web" },
        { value: "+40%", label: "Consultas de clientes potenciales" },
        { value: "4.5/5", label: "Satisfacción del cliente" },
    ],
    testimonial: {
      quote: "Mi landing page ha dado un giro radical de 160 grados. El diseño es impecable y mis clientes ahora encuentran lo que necesitan al instante. He notado un aumento significativo en las consultas gracias a este rediseño.",
      author: "Deylena Barboza, Abogada en trámites migratorios",
    }
  },

  technologies: ["React", "Node.js", "TailwindCSS", "Supabase", "Express", "Next.js"],
  liveLink: "https://abogado-pedro-salazar.vercel.app/",
};