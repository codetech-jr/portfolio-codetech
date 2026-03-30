"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

const ProjectCard = ({ project, priority = false }) => {
  const t = useTranslations("work");

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden group hover:border-accent/30 dark:hover:border-accent/30 transition-all backdrop-blur-md shadow-sm dark:shadow-none">
      {/* --- SECCIÓN DE LA IMAGEN --- */}
      <div className="relative w-full aspect-[4/3] bg-black/50 overflow-hidden">
        <Image
          src={project.image}
          fill
          priority={priority}
          alt={`Imagen de ${project.title}`}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* --- 1. OVERLAY DE ICONOS SÓLO PARA DESKTOP --- */}
        <div className="absolute inset-0 items-center justify-center hidden gap-6 transition-all duration-300 opacity-0 bg-black/50 backdrop-blur-[2px] group-hover:opacity-100 md:flex">
          {/* Botón de Live Project (Desktop) */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex justify-center items-center transition-all duration-300 hover:bg-accent/80 hover:scale-110 scale-0 group-hover:scale-100 shadow-xl"
                  style={{ transitionDelay: '0.1s' }}
                >
                  <BsArrowUpRight className="text-3xl text-white" />
                </a>
              </TooltipTrigger>
              <TooltipContent><p>{t("viewProject")}</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Botón de GitHub (Desktop) */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex justify-center items-center transition-all duration-300 hover:bg-accent/80 hover:scale-110 scale-0 group-hover:scale-100 shadow-xl"
                  style={{ transitionDelay: '0.2s' }}
                >
                  <BsGithub className="text-3xl text-white" />
                </a>
              </TooltipTrigger>
              <TooltipContent><p>Repositorio Github</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* --- SECCIÓN DE CONTENIDO --- */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex justify-between items-start mb-3">
            <span className="px-3 py-1 text-xs font-semibold text-accent bg-accent/10 border border-accent/20 rounded-full">
                {project.category}
            </span>
            {project.isDemo && (
                <span className="px-3 py-1 text-xs font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full">
                    Demo
                </span>
            )}
        </div>
        
        <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors font-display">
            {project.title}
        </h3>
        
        <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-white/60 font-primary flex-grow">
          {project.description}
        </p>
        
        {/* --- 2. BOTONES DE ACCIÓN SÓLO PARA MÓVIL/TABLET --- */}
        <div className="flex items-center gap-4 mb-6 md:hidden">
            <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-semibold text-[#0C0C2C] bg-accent rounded-xl hover:bg-accent/90 transition-colors shadow-lg"
            >
                <BsArrowUpRight /> {t("viewProject")}
            </a>
            <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"
            >
                <BsGithub /> GitHub
            </a>
        </div>
        
        {/* Stack de tecnologías */}
        <div className="flex flex-wrap items-center gap-2 pt-4 mt-auto border-t border-slate-200 dark:border-white/10">
            {project.techStack.map((tech, index) => (
                 <span key={index} className="px-2 py-1 text-xs font-medium rounded-md text-slate-600 dark:text-white/70 bg-slate-200 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    {tech}
                 </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;