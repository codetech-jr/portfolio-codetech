// /data/case-studies/pedro-salazar.jsx

export const caseStudyData = {
  slug: "miri-portfolio",
  title: "Portafolio para Modelo Profesional",
  tagline: "Una vitrina digital para el talento de una modelo.",
  heroImage: "/assets/hero-miri.jpg", // Una imagen grande y de alta calidad del proyecto

  challenge: {
    title: "El Desafío",
    description: "La modelo necesitaba un portafolio que reflejara su estilo y profesionalismo. Este portafolio debía ser una herramienta efectiva para atraer a nuevos clientes y oportunidades laborales.",
  },

  solution: {
    title: "La Solución",
    description: "Mi enfoque fue crear un portafolio con una experiencia de usuario inmersiva y un diseño limpio que realza la fotografía. El proceso se dividió en tres fases clave:",
    steps: [
      {
        title: "1. Investigación y Arquitectura de la Información",
        content: "Realicé una investigación exhaustiva sobre la competencia y las mejores prácticas en sitios web de portafolios. Luego, diseñé una arquitectura de la información clara y lógica, asegurando que los usuarios pudieran encontrar fácilmente la información que necesitaban.",
        image: "/assets/mockup-miri-1.jpg", // Mockup o captura de pantalla
      },
      {
        title: "2. Diseño UX/UI Centrado en la Búsqueda",
        content: "El diseño se centró en la usabilidad y la accesibilidad, con un enfoque 'mobile-first'. Utilicé una paleta de colores sobria y profesional, tipografía legible y elementos visuales que reforzaran la confianza. La navegación fue simplificada para facilitar el acceso a los servicios y la información de contacto.",
        image: "/assets/mockup-miri-2.jpg",
      },
      {
        title: "3. Desarrollo del Frontend Interactivo",
        content: "Utilicé Next.js y TailwindCSS para construir una interfaz de usuario dinámica y completamente responsive. La web incluye formularios de contacto optimizados para la conversión, integración con Google Maps para la ubicación de la oficina, y optimización SEO para mejorar la visibilidad en buscadores.",
        image: "/assets/mockup-miri-3.jpg",
      }
    ]
  },

  results: {
    title: "El Resultado",
    description: "El nuevo portafolio transformó la presencia online de la modelo, posicionándola como una profesional confiable y accesible, y generando un impacto medible en la captación de clientes.",
    stats: [
        { value: "+150%", label: "Visitas al sitio web" },
        { value: "+40%", label: "Aumento de visibilidad en la red" },
        { value: "5/5", label: "Satisfacción del cliente" },
    ],
    testimonial: {
      quote: "El portafolio ha sido un cambio radical para mí. Mis clientes ahora encuentran lo que necesitan al instante y he notado un aumento en las oportunidades laborales. El trabajo fue impecable.",
      author: "Miri, Modelo Profesional",
    }
  },

  technologies: ["React", "Node.js", "TailwindCSS", "Supabase", "Express", "Next.js"],
  liveLink: "https://miri-portfolio-model.vercel.app/",
};