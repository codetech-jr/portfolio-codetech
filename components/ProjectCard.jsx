"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
// Inline icons to avoid react-icons bundle
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

const ProjectCard = ({ project }) => {
  const t = useTranslations("work");

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden group hover:border-accent/30 dark:hover:border-accent/30 transition-all backdrop-blur-md shadow-sm dark:shadow-none">
      {/* --- SECCIÓN DE LA IMAGEN --- */}
      <div className="relative w-full aspect-[4/3] bg-black/50 overflow-hidden">
        <Image
          src={project.image}
          fill
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
                  <svg className="text-3xl text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M7 17v-7h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 17h10V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                  <svg className="text-3xl text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.19-3.37-1.19-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.53 2.36 1.09 2.94.83.09-.64.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.72 0 .27.16.59.67.49C19.14 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z" />
                  </svg>
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
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M5 12h14M13 5l6 7-6 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg> {t("viewProject")}
            </a>
            <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.19-3.37-1.19-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.53 2.36 1.09 2.94.83.09-.64.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.72 0 .27.16.59.67.49C19.14 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z" />
                </svg> GitHub
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