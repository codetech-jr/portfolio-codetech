"use client";

import Link from "next/link";
import Image from "next/image";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col h-full bg-[#1B1F3B] border border-[#003B8D] rounded-xl overflow-hidden group">
      {/* --- SECCIÓN DE LA IMAGEN --- */}
      <div className="relative w-full h-64">
        <Image
          src={project.image}
          fill
          alt={`Imagen de ${project.title}`}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* --- 1. OVERLAY DE ICONOS SÓLO PARA DESKTOP --- */}
        {/* Se oculta en pantallas pequeñas (hidden) y se muestra como flex en medianas o más grandes (md:flex) */}
        <div className="absolute inset-0 items-center justify-center hidden gap-4 transition-opacity duration-300 opacity-0 bg-black/60 group-hover:opacity-100 md:flex">
          {/* Botón de Live Project (Desktop) */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={project.live}
                  target="_blank"
                  className="w-16 h-16 rounded-full bg-white/10 flex justify-center items-center transition-all duration-300 hover:bg-[#00C6FF] scale-0 group-hover:scale-100"
                  style={{ transitionDelay: '0.1s' }}
                >
                  <BsArrowUpRight className="text-3xl text-white" />
                </Link>
              </TooltipTrigger>
              <TooltipContent><p>Ver proyecto</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Botón de GitHub (Desktop) */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={project.github}
                  target="_blank"
                  className="w-16 h-16 rounded-full bg-white/10 flex justify-center items-center transition-all duration-300 hover:bg-[#00C6FF] scale-0 group-hover:scale-100"
                  style={{ transitionDelay: '0.2s' }}
                >
                  <BsGithub className="text-3xl text-white" />
                </Link>
              </TooltipTrigger>
              <TooltipContent><p>Repositorio Github</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* --- SECCIÓN DE CONTENIDO --- */}
      <div className="flex flex-col flex-grow p-6">
        <p className="text-sm text-[#00C6FF] mb-2">{project.category}</p>
        <h3 className="mb-3 text-2xl font-bold text-white">{project.title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-white/60">
          {project.description}
        </p>
        
        {/* --- 2. BOTONES DE ACCIÓN SÓLO PARA MÓVIL/TABLET --- */}
        {/* Se muestran como flex en pantallas pequeñas y se ocultan en medianas o más grandes (md:hidden) */}
        <div className="flex items-center gap-4 mb-6 md:hidden">
            <Link
                href={project.live}
                target="_blank"
                className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 bg-white/5 rounded-lg hover:bg-[#00C6FF]/20"
            >
                <BsArrowUpRight /> Ver Proyecto
            </Link>
            <Link
                href={project.github}
                target="_blank"
                className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 bg-white/5 rounded-lg hover:bg-[#00C6FF]/20"
            >
                <BsGithub /> GitHub
            </Link>
        </div>
        
        {/* Stack de tecnologías (se empuja hacia abajo) */}
        <div className="flex flex-wrap items-center gap-3 pt-4 mt-auto border-t border-white/10">
            {project.stack.slice(0, 5).map((tech, index) => (
                 <span key={index} className="px-2 py-1 text-xs rounded text-white/80 bg-white/5">
                    {tech}
                 </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;