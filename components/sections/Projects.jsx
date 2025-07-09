"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

// --- DATOS DE PROYECTOS ---
const projectsData = [
    {
        title: "Catálogo Digital Repuestos Temuco",
        description: "Desarrollé un catálogo digital interactivo para una tienda de repuestos y electrodomésticos. El objetivo principal es ofrecer a los clientes una forma rápida y sencilla de consultar el inventario de productos disponibles, con un potente buscador y navegación por categorías. El sitio funciona como una vitrina online moderna que mejora la presencia digital del negocio.",
        technologies: ["React", "Node.js", "TailwindCSS", "Supabase", "Express", "Next.js"],
        videoSrc: "/videos/proyecto-temuco.mp4",
        thumbnail: "/assets/thumbnail-temuco.jpg", 
        link: "https://temuco-repuestos.vercel.app/", 
      },
      {
        title: "Web Profesional de Pedro Salazar",
        description: "Lideré el diseño y desarrollo del sitio web para el abogado Pedro Salazar, con un enfoque principal en la creación de una identidad visual sólida y una experiencia de usuario (UX) impecable. Mi labor incluyó la traducción de los atributos de la marca (seriedad, experiencia, confianza) a un diseño visual efectivo, seleccionando colores y tipografías acordes. El sitio está estructurado para guiar al usuario de forma intuitiva hacia los servicios y el contacto, optimizando el camino para la conversión.",
        technologies: ["Next.js", "TailwindCSS", "TypeScript", "React"],
        videoSrc: "/videos/proyecto-pedro.mp4",
        thumbnail: "/assets/thumbnail-pedro.jpg",
        link: "https://abogado-pedro-salazar.vercel.app/",
      },
      {
        title: "Portafolio de Miri",
        description: "Responsable del ciclo completo de diseño y desarrollo del portafolio para una modelo profesional. El objetivo fue crear una experiencia de usuario (UX) inmersiva y visualmente impactante. Mi labor principal fue conceptualizar la identidad visual, seleccionando una paleta de colores sofisticada y un diseño limpio que pusiera el foco en la fotografía. El corazón del proyecto es una galería de alta resolución, diseñada para una navegación fluida y elegante que refleja el profesionalismo de la modelo.",
        technologies: ["Next.js", "TailwindCSS", "TypeScript", "React"],
        videoSrc: "/videos/proyecto-miri.mp4",
        thumbnail: "/assets/thumbnail-miri.jpg",
        link: "https://miri-portfolio-model.vercel.app/",
      },
];

// --- COMPONENTES INTERNOS ---
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#00C6FF" viewBox="0 0 16 16" className="transition-transform duration-300 group-hover:scale-110">
    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
  </svg>
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
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/60 group-hover:bg-black/80">
              <button 
                aria-label={`Reproducir video de ${project.title}`}
                className="p-3 transition bg-[#1B1F3B]/50 rounded-full hover:bg-[#1B1F3B]/80"
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
        <h3 className="mb-3 text-xl font-bold text-[#FFFFFF]">{project.title}</h3>
        <p className="mb-4 text-left text-[#A3A8CC]">{project.description}</p>
        <div className="mt-auto">
          {project.technologies && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-semibold text-[#00C6FF] bg-[#003B8D] rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 mt-2 font-bold text-[#0C0C2C] transition-opacity duration-300 bg-[#00C6FF] rounded-md hover:opacity-90"
            >
              Ver proyecto
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// --- VARIANTES DE ANIMACIÓN ---
const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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
  return (
    <section id="proyectos" className="py-16 bg-[#0C0C2C] sm:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={headerTextVariants}
        >
          <h2 className="mb-4 text-4xl font-bold text-[#FFFFFF]">Mis mejores proyectos</h2>
          <p className="max-w-3xl mx-auto mb-12 text-[#A3A8CC]">
            Cada proyecto es una historia de colaboración, creatividad y tecnología. 
            Aquí te presento una selección de mis trabajos, donde el diseño cuidadoso y 
            el desarrollo robusto se unen para crear experiencias digitales impactantes y funcionales.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projectsData.map((project, idx) => (
            <motion.div key={idx} variants={projectCardVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;