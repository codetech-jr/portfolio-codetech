"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "../../app/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- DATOS DE PROYECTOS ---
const projectsData = [
    {
        title: "Catálogo Digital para Repuestos Temuco",
        description: "Creé un catálogo digital para modernizar la consulta de inventario. El resultado es una vitrina online rápida y fácil de usar, con un potente buscador y navegación por categorías que ha mejorado la presencia digital del negocio.",
        technologies: ["React", "Node.js", "TailwindCSS", "Supabase", "Express", "Next.js"],
        videoSrc: "/videos/proyecto-temuco.mp4",
        thumbnail: "/assets/thumbnail-temuco.jpg", 
        link: "https://temuco-repuestos.vercel.app/",
        caseStudyLink: "/casos-de-exito/repuestos-temuco"
      },
      {
        title: "Web Profesional para Pedro Salazar",
        description: "Diseñé una identidad visual y una experiencia de usuario (UX) que transmiten confianza y profesionalismo. La web está estructurada para guiar a los usuarios hacia los servicios y contacto, optimizando la conversión de clientes.",
        technologies: ["Next.js", "TailwindCSS", "TypeScript", "React"],
        videoSrc: "/videos/proyecto-pedro.mp4",
        thumbnail: "/assets/thumbnail-pedro.jpg",
        link: "https://abogado-pedro-salazar.vercel.app/",
        caseStudyLink: "/casos-de-exito/pedro-salazar"
      },
      {
        title: "Landing Page para la abogada Deylena Barboza",
        description: "Diseñé una landing page moderna y profesional para destacar los servicios legales ofrecidos. La página está optimizada para conversiones, con un diseño claro y llamado a la acción enfocado en captar clientes potenciales.",
        technologies: ["Next.js", "TailwindCSS", "React", "Vercel"],
        videoSrc: "/videos/proyecto-deylena.mp4",
        thumbnail: "/assets/thumbnail-deylena.jpg",
        link: "https://www.grupolegalbarboza.com/",
        caseStudyLink: "/casos-de-exito/deylena-barboza"
      },
      {
        title: "Portafolio para Modelo Profesional",
        description: "Desarrollé un portafolio con una experiencia de usuario inmersiva y un diseño limpio que realza la fotografía. El foco principal fue crear una galería de alta resolución que refleja la sofisticación y profesionalismo de la modelo.",
        technologies: ["Next.js", "TailwindCSS", "TypeScript", "React"],
        videoSrc: "/videos/proyecto-miri.mp4",
        thumbnail: "/assets/thumbnail-miri.jpg",
        link: "https://miri-portfolio-model.vercel.app/",
        caseStudyLink: "/casos-de-exito/miri-portfolio"
      },
];

// --- COMPONENTES INTERNOS ---
const PlayIcon = () => (
    <div className="relative flex items-center justify-center w-20 h-20 transition-transform duration-300 rounded-full group-hover:scale-110">
      <div className="absolute inset-0 bg-[#00C6FF] rounded-full opacity-40 blur-lg transition-opacity duration-300 group-hover:opacity-60"></div>
      <div className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-inset ring-white/20"></div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="48" 
        height="48" 
        fill="#00C6FF"
        viewBox="0 0 16 16" 
        className="relative"
      >
        <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
      </svg>
    </div>
);
  
const ProjectCard = ({ project }) => {
    const [playing, setPlaying] = useState(false);
  
    return (
      <div className="flex flex-col h-full overflow-hidden transition-transform duration-300 transform bg-[#1B1F3B] border border-[#003B8D] rounded-lg shadow-lg hover:-translate-y-2">
        <div className="relative w-full aspect-video">
          {!playing ? (
            <div className="relative w-full h-full cursor-pointer group" onClick={() => setPlaying(true)}>
              <img
                src={project.thumbnail}
                alt={`Thumbnail de ${project.title}`}
                className="object-cover w-full h-full"
                loading="lazy" 
              />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/50 group-hover:bg-black/60">
                <button 
                  aria-label={`Reproducir video de ${project.title}`}
                  className="focus:outline-none"
                >
                  <PlayIcon />
                </button>
              </div>
            </div>
          ) : (
            <video
              src={project.videoSrc}
              controls
              autoPlay
              className="w-full h-full"
              poster={project.thumbnail}
              onEnded={() => setPlaying(false)}
            />
          )}
        </div>
        <div className="flex flex-col flex-grow p-6">
          <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
          <p className="mb-4 text-left text-base text-[#A3A8CC]">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs font-semibold text-[#00C6FF] bg-[#003B8D] rounded-full">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-auto">
            <a
              href={project.caseStudyLink}
              className="inline-block px-5 py-2 font-bold text-[#0C0C2C] transition-opacity duration-300 bg-[#00C6FF] rounded-md hover:opacity-90"
            >
              Ver Caso de Éxito
            </a>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white transition-colors duration-300 hover:text-[#00C6FF]"
            >
              Ver Proyecto →
            </a>
          </div>
        </div>
      </div>
    );
};

// --- VARIANTES DE ANIMACIÓN ---
const projectCardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const headerTextVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

// --- COMPONENTE PRINCIPAL ---
const Projects = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Puedes poner 2 o 3 en desktop si prefieres
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <section id="projects" className="py-16 bg-[#0C0C2C] sm:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={headerTextVariants}
        >
          <h2 className="mb-4 text-4xl font-bold text-white">Proyectos Destacados</h2>
          <p className="max-w-3xl mx-auto mb-12 text-lg text-[#A3A8CC]">
            Aquí tienes una selección de mis trabajos. Cada proyecto es una historia de cómo transformo desafíos en soluciones digitales efectivas y atractivas.
          </p>
        </motion.div>

        {/* --- SLIDER DE PROYECTOS --- */}
        <Slider {...sliderSettings}>
          {projectsData.map((project, idx) => (
            <div key={idx} className="px-2">
              <motion.div variants={projectCardVariants}>
                <ProjectCard project={project} />
              </motion.div>
            </div>
          ))}
        </Slider>

        {/* --- INICIO: NUEVO BLOQUE DE CTA --- */}
        <motion.div
          className="mt-20 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerTextVariants}
        >
          <h3 className="text-2xl font-semibold text-white">¿Quieres ver más?</h3>
          <p className="max-w-xl mx-auto mt-4 mb-8 text-lg text-[#A3A8CC]">
            Estos son solo algunos de los proyectos que he liderado. Explora mi portafolio completo para conocer la diversidad de mi trabajo.
          </p>
          <a
            href="/work"
            className="inline-block px-8 py-4 text-lg font-bold text-[#0C0C2C] transition-transform duration-300 bg-[#00C6FF] rounded-md hover:scale-105"
          >
            Ver Mi Portafolio Completo
          </a>
        </motion.div>
        {/* --- FIN: NUEVO BLOQUE DE CTA --- */}
        
      </div>
    </section>
  );
};

export default Projects;