"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

const ProjectCard = ({ project }) => {
  const t = useTranslations("work");

  const maxBadges = 4;
  const visibleStack = (project.techStack ?? project.technologies ?? []).slice(0, maxBadges);
  const overflowCount = (project.techStack ?? project.technologies ?? []).length - maxBadges;

  return (
    <Card className={[
      "bg-transparent md:bg-white/[0.02]",
      "border border-white/10",
      "backdrop-blur-sm",
      "overflow-hidden flex flex-col",
      "group relative",
      "transition-all duration-300",
      "hover:border-white/20",
      "hover:shadow-[0_0_40px_rgba(0,198,255,0.05)]",
      "rounded-xl h-full",
      "py-0 gap-0",
    ].join(" ")}>

      {/* Category pill */}
      {project.category && (
        <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-white/5 border border-white/10 text-white/50 backdrop-blur-sm">
          {project.category}
        </span>
      )}

      {/* Ghost icon action buttons */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {project.github && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-white/5 border border-white/10 text-white/60 hover:text-accent hover:bg-accent/10 hover:border-accent/30 rounded-full"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="Repositorio GitHub">
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>Repositorio GitHub</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {(project.live ?? project.link) && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-white/5 border border-white/10 text-white/60 hover:text-accent hover:bg-accent/10 hover:border-accent/30 rounded-full"
                  asChild
                >
                  <a href={project.live ?? project.link} target="_blank" rel="noopener noreferrer" aria-label="Ver proyecto en vivo">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>{t("viewProject")}</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Naked screenshot image */}
      <figure className="relative w-full flex-1 min-h-[210px] overflow-hidden">
        <Image
          src={project.image}
          fill
          alt={`Captura del proyecto ${project.title}`}
          className="object-cover object-top transform transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0C0C2C]/80 to-transparent pointer-events-none" />
      </figure>

      {/* Card header */}
      <CardHeader className="px-5 pt-5 pb-0 gap-1">
        <CardTitle className="text-white font-semibold text-lg leading-snug group-hover:text-accent transition-colors duration-300">
          {project.title}
        </CardTitle>
        <CardDescription className="text-white/55 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      {/* Card content: badges + optional CTA */}
      <CardContent className="px-5 pt-4 pb-5 flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {visibleStack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="rounded-full border-white/10 bg-white/[0.04] text-white/50 text-[10px] font-medium px-2.5 py-0.5 hover:border-accent/30 hover:text-accent/70 transition-colors"
            >
              {tech}
            </Badge>
          ))}
          {overflowCount > 0 && (
            <Badge
              variant="outline"
              className="rounded-full border-white/10 bg-white/[0.04] text-white/40 text-[10px] font-medium px-2.5 py-0.5"
            >
              +{overflowCount}
            </Badge>
          )}
        </div>

        {/* Mobile action buttons */}
        <div className="flex items-center gap-3 md:hidden mt-1">
          {(project.live ?? project.link) && (
            <a
              href={project.live ?? project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center flex-1 gap-2 px-4 py-2.5 text-xs font-bold text-[#0C0C2C] bg-accent rounded-full hover:opacity-90 transition-opacity shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t("viewProject")}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center flex-1 gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
        </div>

        {project.caseStudy && (
          <Link
            href={project.caseStudy}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-accent transition-colors duration-200 group/link"
          >
            Ver caso de éxito
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-200" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;