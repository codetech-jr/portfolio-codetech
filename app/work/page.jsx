"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// 1. Importamos el nuevo componente de tarjeta que creamos
import ProjectCard from "@/components/ProjectCard"; 

// 2. Aquí va tu array de datos de proyectos ya actualizado con los 'tags'
const projectsData = [
    {
        num: '01',
        category: 'Full-Stack App',
        tags: ["Frontend", "UI/UX", "Backend", "Catálogo Digital", "E-commerce"],
        title: 'Repuestos Temuco',
        description: 'Desarrollé un catálogo digital interactivo para una tienda de repuestos y electrodomésticos. El objetivo principal es ofrecer a los clientes una forma rápida y sencilla de consultar el inventario de productos disponibles, con un potente buscador y navegación por categorías. El sitio funciona como una vitrina online moderna que mejora la presencia digital del negocio.',
        stack: ["React", "TailwindCss", "Typescript", "Next.Js", "Supabase"],
        image: "/assets/temuco.png",
        live: "https://temuco-repuestos.vercel.app/",
        github: "https://github.com/codetech-jr/temuco-repuestos", 
    },
    {
        num: '02',
        tags: ["Frontend", "UI/UX", "Landing Page"],
        category: 'Frontend - UI/UX',
        title: 'Grupo Legal Barboza, Deylena Barboza Abogada',
        description: 'Diseñé y desarrollé una landing page para la abogada Deylena Barboza, enfocándome en una experiencia de usuario (UX) clara y profesional. El diseño visual refleja los valores de confianza y seriedad, utilizando una paleta de colores sobria y una tipografía legible. La estructura del sitio guía al usuario de manera intuitiva hacia la información sobre los servicios legales ofrecidos y facilita el contacto, optimizando el recorrido del cliente potencial.',
        stack: ["React", "TailwindCss", "Typescript", "Next.Js"],
        image: "/assets/grupo-legal-barboza.png",
        live: "https://grupolegalbarboza.com/",
        github: "https://github.com/codetech-jr/grupo-legal-barboza-landing-page", 
    },
    {
        num: '03',
        tags: ["Frontend", "UI/UX", "Landing Page", "Branding"],
        category: 'Frontend - UI/UX - Branding',
        title: 'Pedro Salazar Abogado',
        description: 'Lideré el diseño y desarrollo del sitio web para el abogado Pedro Salazar, con un enfoque principal en la creación de una identidad visual sólida y una experiencia de usuario (UX) impecable. Mi labor incluyó la traducción de los atributos de la marca (seriedad, experiencia, confianza) a un diseño visual efectivo, seleccionando colores y tipografías acordes. El sitio está estructurado para guiar al usuario de forma intuitiva hacia los servicios y el contacto, optimizando el camino para la conversión.',
        stack: ["React", "TailwindCss", "Typescript", "Next.Js"],
        image: "/assets/pedro-salazar.png",
        live: "https://abogado-pedro-salazar.vercel.app/",
        github: "https://github.com/codetech-jr/abogado-pedro-salazar", 
    },
    {
        num: '04',
        tags: ["Frontend", "UI/UX", "Branding", "Sitio Web", "Galería", "Portafolio"],
        category: 'Frontend - UI/UX - Branding',
        title: 'Miri Model Portfolio',
        description: 'Responsable del ciclo completo de diseño y desarrollo del portafolio para una modelo profesional. El objetivo fue crear una experiencia de usuario (UX) inmersiva y visualmente impactante. Mi labor principal fue conceptualizar la identidad visual, seleccionando una paleta de colores sofisticada y un diseño limpio que pusiera el foco en la fotografía. El corazón del proyecto es una galería de alta resolución, diseñada para una navegación fluida y elegante que refleja el profesionalismo de la modelo.',
        stack: ["React", "TailwindCss", "Typescript", "Next.Js"],
        image: "/assets/portfolio-miri.png",
        live: "https://miri-portfolio-model.vercel.app/",
        github: "https://github.com/codetech-jr/miri-portfolio-model",
    },
    {
        num: '05',
        tags: ["Frontend", "UI/UX", "Landing Page", "Portafolio"],
        category: 'Frontend - UI/UX',
        title: 'Dada Videos',
        description: 'Creé una página de aterrizaje optimizada para la conversión, dirigida a un editor de vídeo profesional. El objetivo principal del sitio es transformar visitantes en clientes potenciales mediante la exhibición impactante de su portafolio de trabajos y la inclusión de llamadas a la acción claras y efectivas. La estructura está pensada para guiar al usuario a través de la calidad y el estilo de la edición, generando confianza e incentivando el contacto.',
        stack: ["Vue.js", "TailwindCss", "Typescript", "Nuxt"],
        image: "/assets/dada-videos.png",
        live: "https://dada-videos.vercel.app/",
        github: "https://github.com/codetech-jr/dada-videos",
    },
    {
        num: '06',
        tags: ["Frontend", "UI/UX", "Landing Page", "Portafolio"],
        category: 'Frontend - UX/UI',
        title: 'Dada Media Design',
        description: 'Desarrollé una landing page de alta conversión para un diseñador gráfico especializado en logos para emprendedores. El sitio web no solo funciona como un portafolio para exhibir sus mejores trabajos, sino que integra un embudo de ventas claro y directo, presentando planes y precios definidos para transformar visitantes en clientes. La estructura está diseñada estratégicamente para guiar al usuario desde la inspiración visual (los proyectos) hasta la decisión de compra (los planes y el contacto).',
        stack: ["React", "Next.Js", "TailwindCss"],
        image: "/assets/dada.png",
        live: "https://dada-react.vercel.app/",
        github: "https://github.com/codetech-jr/dada-react", 
    },
    {
        num: '07',
        tags: ["Frontend", "UI/UX", "Landing Page", "Branding"],
        category: 'Frontend - UI/UX - Branding',
        title: 'Proyecto Educativo Autodidacta',
        description: 'Desarrollé una landing page para un diseño educativo autodidacta sobre un spa de golden doodles, responsable del ciclo de diseño e interacción con el usuario, animaciones y transiciones.',
        stack: ["React", "TailwindCss", "Typescript", "Next.Js", "Gsap", "Framer Motion"],
        image: "/assets/golden-doodle-spa.png",
        live: "https://landing-doodles.vercel.app/",
        github: "https://github.com/codetech-jr/landing-doodles",
    },
    {
        num: '08',
        category: 'Frontend',
        tags: ["Frontend", "UI/UX", "Landing Page"],
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: ["Html5", "Css3", "Javascript"],
        image: "/assets/homevista.png",
        live: "https://homevista-js.vercel.app/",
        github: "https://github.com/codetech-jr/homevista-js", 
    },
    {
        num: '09',
        tags: ["Frontend", "UI/UX", "Landing Page"],
        category: 'Frontend',
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: ["Html5", "Css3", "Javascript"],
        image: "/assets/wecare.png",
        live: "https://landing-doctors-js.vercel.app/",
        github: "https://github.com/codetech-jr/landing-doctors-js",
    },
    {
        num: '10',
        category: 'Frontend',
        tags: ["Frontend", "UI/UX", "Sitio web"],
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: ["Html5", "Css3", "Javascript"],
        image: "/assets/egator.png",
        live: "https://education-page-six.vercel.app/",
        github: "https://github.com/codetech-jr/education-page",
    },
    {
        num: '11',
        category: 'Frontend',
        tags: ["Frontend", "UI/UX", "Landing Page"],
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: ["Html5", "Css3", "Javascript"],
        image: "/assets/portfolio.png",
        live: "https://portfolio-ux-js.vercel.app/",
        github: "https://github.com/codetech-jr/portfolio-js",
    },
    {
        num: '12',
        category: 'Frontend',
        tags: ["Frontend", "UI/UX", "Landing Page"],
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: ["Html5", "Css3", "Javascript"],
        image: "/assets/lawyer.png",
        live: "https://landing-lawyer.vercel.app/",
        github: "https://github.com/codetech-jr/landing-lawyer", 
    },
    {
        num: '13',
        category: 'Frontend',
        tags: ["Frontend", "UI/UX", "Landing Page"],
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: ["Html5", "Css3", "Javascript"],
        image: "/assets/resto.png",
        live: "https://restaurant-landing-ochre.vercel.app/",
        github: "https://github.com/codetech-jr/restaurant-landing", 
    },
];


// 3. Obtenemos todas las etiquetas únicas para crear los botones de filtro dinámicamente
const uniqueTags = ["Todos", ...new Set(projectsData.flatMap((project) => project.tags))];


const Work = () => {
  // 4. Creamos los estados para manejar el filtrado
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [activeTag, setActiveTag] = useState("Todos");

  // 5. Lógica para filtrar los proyectos
  const handleTagChange = (tag) => {
    setActiveTag(tag);

    if (tag === "Todos") {
      setFilteredProjects(projectsData);
    } else {
      const filtered = projectsData.filter((project) =>
        project.tags.includes(tag)
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4, ease: "easeIn" } }}
      className="min-h-[80vh] py-12 xl:py-24"
    >
      <div className="container mx-auto">
        <h2 className="mb-4 text-4xl font-bold text-center text-white">Mis Proyectos</h2>
        <p className="mb-12 text-center text-white/60">
            Explora una selección de mi trabajo. Usa los filtros para navegar por categorías.
        </p>

        {/* 6. Botones de Filtro */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {uniqueTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagChange(tag)}
              className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
                activeTag === tag
                  ? "bg-[#00C6FF] text-[#0C0C2C]" // Estilo activo
                  : "bg-[#1B1F3B] text-white hover:bg-[#00C6FF]/20" // Estilo inactivo
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 7. La Galería Animada */}
        <motion.div
          layout // ¡LA MAGIA DE LA ANIMACIÓN ESTÁ AQUÍ!
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.num} project={project} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Work;

