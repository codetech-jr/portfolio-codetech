// /data/case-studies/repuestos-temuco.jsx

export const caseStudyData = {
  slug: "repuestos-temuco",
  title: "Catálogo Digital para Repuestos Temuco",
  tagline: "Modernizando el inventario para una mejor experiencia de cliente.",
  heroImage: "/assets/hero-temuco.jpg", // Una imagen grande y de alta calidad del proyecto
  
  challenge: {
    title: "El Desafío",
    description: "Repuestos Temuco gestionaba su inventario de forma manual, lo que dificultaba a los clientes saber qué productos estaban disponibles. Necesitaban una vitrina digital que fuera rápida, fácil de navegar y que reflejara un negocio moderno y eficiente, sin la complejidad de un e-commerce completo.",
  },

  solution: {
    title: "La Solución",
    description: "Mi enfoque fue crear un catálogo digital interactivo centrado en la velocidad y la experiencia de usuario. El proceso se dividió en tres fases clave:",
    steps: [
      {
        title: "1. Arquitectura y Base de Datos",
        content: "Diseñé una base de datos en Supabase para gestionar miles de productos y categorías de forma eficiente. La elección de Next.js permitió un renderizado rápido del lado del servidor (SSR), asegurando que el sitio fuera veloz y estuviera optimizado para SEO desde el principio.",
        image: "/assets/mockup-temuco-1.jpg", // Mockup o captura de pantalla
      },
      {
        title: "2. Diseño UX/UI Centrado en la Búsqueda",
        content: "El corazón de la experiencia es un potente motor de búsqueda y un sistema de filtrado por categorías. El diseño es limpio y directo, eliminando cualquier distracción para que el usuario encuentre lo que necesita en segundos. Se priorizó un diseño 'mobile-first', ya que la mayoría de las consultas se realizan desde el móvil.",
        image: "/assets/mockup-temuco-2.jpg",
      },
      {
        title: "3. Desarrollo del Frontend Interactivo",
        content: "Utilicé React y TailwindCSS para construir una interfaz de usuario dinámica y completamente responsive. La interacción es fluida, con cargas de productos casi instantáneas que mejoran drásticamente la percepción del usuario sobre el negocio.",
        image: "/assets/mockup-temuco-3.jpg",
      }
    ]
  },

  results: {
    title: "El Resultado",
    description: "El nuevo catálogo digital transformó la presencia online de Repuestos Temuco, posicionándolos como un referente tecnológico en su sector y generando un impacto medible en el negocio.",
    stats: [
      { value: "+200%", label: "Consultas de productos" },
      { value: "-70%", label: "Tiempo de búsqueda para clientes" },
      { value: "Nº 1", label: "Ranking local en Google" },
    ],
    testimonial: {
      quote: "El catálogo ha sido un cambio radical para nosotros. Los clientes ahora encuentran lo que necesitan al instante y nuestras ventas han mejorado notablemente. El trabajo fue impecable.",
      author: "Dueño de Repuestos Temuco",
    }
  },

  technologies: ["React", "Node.js", "TailwindCSS", "Supabase", "Express", "Next.js"],
  liveLink: "https://temuco-repuestos.vercel.app/",
};