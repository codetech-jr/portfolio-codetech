/**
 * @typedef {Object} Project
 * @property {string}   id          - Unique slug identifier
 * @property {string}   title       - Short project name (EN fallback, i18n preferred via messages)
 * @property {string}   description - Business-result description (max 2 lines)
 * @property {string}   category    - Category label (used for filter chips)
 * @property {string[]} techStack   - Technology badges list
 * @property {string}   image       - Path relative to /public
 * @property {string}   live        - Live URL
 * @property {string}   github      - GitHub repo URL
 * @property {string}   [caseStudy] - Internal case study path
 * @property {boolean}  featured    - true → Hero Card (2-col span in Bento Grid)
 * @property {boolean}  isDemo      - true → Concept/demo project (not a real client)
 */

/** @type {Project[]} */
export const projectsData = [
  // ── FEATURED HERO CARDS (featured: true → col-span-2 in Bento Grid) ──────────
  {
    id: "repuestos-temuco",
    title: "Catálogo Digital — Repuestos Temuco",
    description:
      "Transformé un negocio físico en una vitrina online rápida con buscador inteligente y categorías. Resultado: +60% de consultas digitales en el primer mes.",
    category: "E-Commerce Catalog",
    techStack: ["Next.js", "Supabase", "TailwindCSS", "TypeScript", "React"],
    image: "/assets/thumbnail-temuco.jpg",
    live: "https://temuco-repuestos.vercel.app/",
    github: "https://github.com/codetech-jr/temuco-repuestos",
    caseStudy: "/casos-de-exito/repuestos-temuco",
    featured: true,
    isDemo: false,
  },
  {
    id: "grupo-legal-barboza",
    title: "Grupo Legal Barboza",
    description:
      "Landing de alta conversión para despacho jurídico. CTAs estratégicos que aumentaron las consultas en un 45% desde el primer mes de lanzamiento.",
    category: "Landing Page",
    techStack: ["Next.js", "TailwindCSS", "TypeScript", "Vercel"],
    image: "/assets/thumbnail-deylena.jpg",
    live: "https://www.grupolegalbarboza.com/",
    github: "https://github.com/codetech-jr/grupo-legal-barboza-landing-page",
    caseStudy: "/casos-de-exito/deylena-barboza",
    featured: true,
    isDemo: false,
  },

  // ── SECONDARY CARDS ────────────────────────────────────────────────────────────
  {
    id: "pedro-salazar",
    title: "Pedro Salazar — Abogado",
    description:
      "Identidad visual y UX que transmiten confianza y jerarquía legal. Optimizado para convertir visitantes en clientes potenciales.",
    category: "Sitio Profesional",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "React"],
    image: "/assets/thumbnail-pedro.jpg",
    live: "https://abogado-pedro-salazar.vercel.app/",
    github: "https://github.com/codetech-jr/abogado-pedro-salazar",
    caseStudy: "/casos-de-exito/pedro-salazar",
    featured: true,
    isDemo: false,
  },
  {
    id: "miri-model",
    title: "Portfolio Modelo Miri",
    description:
      "Experiencia inmersiva de galería de alta resolución que refleja la estética y sofisticación de una modelo profesional internacional.",
    category: "Portfolio Premium",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"],
    image: "/assets/miri-2.png",
    live: "https://miri-portfolio-model.vercel.app/",
    github: "https://github.com/codetech-jr/miri-portfolio-model",
    caseStudy: "/casos-de-exito/miri-portfolio",
    featured: true,
    isDemo: false,
  },
  {
    id: "dada-videos",
    title: "Dada Videos",
    description:
      "Landing optimizada para la conversión, exhibiendo el portafolio de trabajos de un editor de vídeo profesional.",
    category: "Landing Page",
    techStack: ["Vue.js", "TailwindCSS", "TypeScript", "Nuxt"],
    image: "/assets/dada-videos-2.png",
    live: "https://dada-videos.vercel.app/",
    github: "https://github.com/codetech-jr/dada-videos",
    featured: false,
    isDemo: false,
  },
  {
    id: "dada-media",
    title: "Dada Media Design",
    description:
      "Landing de alta conversión para diseñador gráfico con embudo de ventas integrado. Posicionada para capturar leads orgánicos.",
    category: "Landing Page",
    techStack: ["React", "Next.js", "TailwindCSS"],
    image: "/assets/dada-media-2.png",
    live: "https://dada-react.vercel.app/",
    github: "https://github.com/codetech-jr/dada-react",
    featured: false,
    isDemo: false,
  },
  {
    id: "golden-spa",
    title: "Golden Doodle Spa",
    description:
      "Landing premium con interacciones y transiciones avanzadas. Micro-animaciones GSAP y Framer Motion para una experiencia diferenciadora.",
    category: "Landing Page",
    techStack: ["Next.js", "TailwindCSS", "GSAP", "Framer Motion"],
    image: "/assets/golden-doodle-2.png",
    live: "https://landing-doodles.vercel.app/",
    github: "https://github.com/codetech-jr/landing-doodles",
    featured: false,
    isDemo: false,
  },
  {
    id: "homevista",
    title: "Homevista JS",
    description:
      "Proyecto educativo explorando capacidades frontend avanzadas en Vanilla JS sin frameworks.",
    category: "Landing Page",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    image: "/assets/homevista-2.png",
    live: "https://homevista-js.vercel.app/",
    github: "https://github.com/codetech-jr/homevista-js",
    featured: false,
    isDemo: false,
  },
  {
    id: "wecare",
    title: "WeCare Platform",
    description:
      "Proyecto simulando una plataforma para clínicas médicas. Enfoque en formularios complejos y dashboards responsivos.",
    category: "Landing Page",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    image: "/assets/doctor-lawyer-2.png",
    live: "https://landing-doctors-js.vercel.app/",
    github: "https://github.com/codetech-jr/landing-doctors-js",
    featured: false,
    isDemo: false,
  },
  {
    id: "education-page",
    title: "Education Page",
    description:
      "Maquetado avanzado y diseño responsive puro orientado a plataformas educativas.",
    category: "Sitio Web",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    image: "/assets/egator-2.png",
    live: "https://education-page-six.vercel.app/",
    github: "https://github.com/codetech-jr/education-page",
    featured: false,
    isDemo: false,
  },
  {
    id: "portfolio-ux",
    title: "Portfolio Concept",
    description:
      "Refinamiento de UX en un portafolio conceptual clásico con foco en usabilidad.",
    category: "Portfolio",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    image: "/assets/portfolio-ux-2.png",
    live: "https://portfolio-ux-js.vercel.app/",
    github: "https://github.com/codetech-jr/portfolio-js",
    featured: false,
    isDemo: false,
  },
  {
    id: "landing-lawyer",
    title: "Landing Lawyer",
    description:
      "Plantilla de alta conversión orientada a servicios legales. Layout y copywriting optimizados para captar clientes.",
    category: "Landing Page",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    image: "/assets/lawyer-2.png",
    live: "https://landing-lawyer.vercel.app/",
    github: "https://github.com/codetech-jr/landing-lawyer",
    featured: false,
    isDemo: false,
  },
  {
    id: "restaurant-landing",
    title: "Restaurant Experience",
    description:
      "Landing page inmersiva para restaurante con diseño gastronómico y reservas integradas.",
    category: "Landing Page",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    image: "/assets/resto-2.png",
    live: "https://restaurant-landing-ochre.vercel.app/",
    github: "https://github.com/codetech-jr/restaurant-landing",
    featured: false,
    isDemo: false,
  },

  // ── DEMO PROJECTS (nuevas capacidades) ───────────────────────────────────────
  {
    id: "botpress-assistant",
    title: "AI Booking Assistant",
    description:
      "Chatbot que agenda via Telegram + Cal.com, responde 24/7 y sincroniza leads en Google Sheets usando Make automations.",
    category: "Chatbot IA",
    techStack: ["Botpress", "Make", "Cal.com", "Telegram API", "Google Sheets"],
    image: "", // Temporales por falta de capturas
    live: "#",
    github: "#",
    featured: true,
    isDemo: true,
  },
  {
    id: "react-native-app",
    title: "Mobile App — React Native",
    description:
      "App móvil con Expo y NativeWind: UI minimalista, animaciones nativas fluidas y autenticación integrada.",
    category: "App Móvil",
    techStack: ["React Native", "Expo", "NativeWind", "Firebase"],
    image: "", // Temporales por falta de capturas
    live: "#",
    github: "#",
    featured: false,
    isDemo: true,
  },
];

/** Proyectos destacados para la home (Bento Grid hero section) */
export const featuredProjects = projectsData.filter((p) => p.featured);

/** Todos los proyectos reales (sin demos) */
export const realProjects = projectsData.filter((p) => !p.isDemo);

/** Categorías únicas para los filtros de la página /work */
export const projectCategories = [
  "Todos",
  ...new Set(projectsData.map((p) => p.category)),
];
