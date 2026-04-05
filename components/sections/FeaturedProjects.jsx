"use client";

import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ExternalLink, Github, ArrowRight, Sparkles } from "lucide-react";
import { featuredProjects } from "@/data/projects";

// ─────────────────────────────────────────────────────────────────────────────
// 🃏 ProjectCard – Bento Grid card following specs-proyectos.md
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const t = useTranslations("projects");
  const maxBadges = 4;
  const visibleStack = project.techStack.slice(0, maxBadges);
  const overflowCount = project.techStack.length - maxBadges;

  return (
    <Card
      className={[
        // Rule 2: Glassmorphism base
        "bg-transparent md:bg-white/[0.02]",
        "border border-white/[0.08]",                     // Glass border
        "backdrop-blur-sm",
        "overflow-hidden flex flex-col",
        "group relative",
        "transition-all duration-400 ease-in-out",
        "hover:border-white/20",
        "hover:shadow-[0_8px_40px_rgba(0,198,255,0.06),0_0_0_1px_rgba(255,255,255,0.05)]",
        "rounded-xl h-full",
        "py-0 gap-0",
      ].join(" ")}
    >
      {/* ── DEMO badge ── */}
      {project.isDemo && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-accent/10 border border-accent/25 text-accent backdrop-blur-sm">
          <Sparkles className="w-2.5 h-2.5" />
          Demo
        </div>
      )}

      {/* ── Category pill (top-left, no overlap with DEMO) ── */}
      {!project.isDemo && project.category && (
        <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-white/[0.06] border border-white/[0.08] text-white/50 backdrop-blur-sm">
          {project.category}
        </span>
      )}

      {/* ── Ghost action buttons (top-right, appear on hover) ── */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {project.github && project.github !== "#" && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-white/[0.06] border border-white/[0.10] text-white/60 hover:text-accent hover:bg-accent/10 hover:border-accent/30 rounded-full transition-all duration-200"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="Repositorio GitHub">
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>Ver en GitHub</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {project.live && project.live !== "#" && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-white/[0.06] border border-white/[0.10] text-white/60 hover:text-accent hover:bg-accent/10 hover:border-accent/30 rounded-full transition-all duration-200"
                  asChild
                >
                  <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Ver proyecto en vivo">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>Live Demo</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* ── Image Zone: naked screenshot, no device frames (Rule 2) ── */}
      <figure className="relative w-full flex-1 min-h-[200px] overflow-hidden">
        <Image
          src={project.image}
          alt={`Captura del proyecto ${project.title}`}
          fill
          sizes={
            project.featured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          // Rule 4: scale(1.05) on hover, smooth 0.4s ease-in-out
          className="object-cover object-top transform transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.04]"
          priority={project.featured}
        />
        {/* Gradient fade into card body */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0C0C2C]/90 to-transparent pointer-events-none" />
      </figure>

      {/* ── Card Header: Title + Description (Rule 3) ── */}
      <CardHeader className="px-5 pt-5 pb-0 gap-1.5">
        <CardTitle className="text-white font-bold text-lg leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-1">
          {project.title}
        </CardTitle>
        <CardDescription className="text-white/55 text-sm leading-relaxed line-clamp-2 font-primary">
          {project.description}
        </CardDescription>
      </CardHeader>

      {/* ── Card Content: Tech badges + CTAs ── */}
      <CardContent className="px-5 pt-4 pb-5 flex flex-col gap-4">
        {/* Tech stack pill badges (Rule 3) */}
        <div className="flex flex-wrap gap-1.5">
          {visibleStack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="rounded-full border-white/[0.08] bg-white/[0.04] text-white/50 text-[10px] font-medium px-2.5 py-0.5 hover:border-accent/30 hover:text-accent/70 transition-colors"
            >
              {tech}
            </Badge>
          ))}
          {overflowCount > 0 && (
            <Badge
              variant="outline"
              className="rounded-full border-white/[0.08] bg-white/[0.04] text-white/40 text-[10px] font-medium px-2.5 py-0.5"
            >
              +{overflowCount}
            </Badge>
          )}
        </div>

        {/* Mobile action buttons (visible on touch, hidden on desktop hover) */}
        <div className="flex items-center gap-3 md:hidden">
          {project.live && project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center flex-1 gap-2 px-4 py-2.5 text-xs font-bold text-[#0C0C2C] bg-accent rounded-full hover:opacity-90 transition-opacity shadow-[0_0_16px_rgba(0,198,255,0.3)]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t("viewProject")}
            </a>
          )}
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center flex-1 gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-white/[0.06] border border-white/[0.10] rounded-full hover:bg-white/10 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
        </div>

        {/* Case study link */}
        {project.caseStudy && (
          <Link
            href={project.caseStudy}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-accent transition-colors duration-200 group/link w-fit"
          >
            Ver caso de éxito
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-200" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🏗️ FeaturedProjects – Bento Grid Section
// Specs Rule 1:
//   Desktop: 3 cols, first featured card spans 2 cols, others span 1
//   Mobile:  single column stack
// ─────────────────────────────────────────────────────────────────────────────
export function FeaturedProjects() {
  const t = useTranslations("projects");

  return (
    <section id="proyectos" className="py-24 relative z-10">
      <div className="container mx-auto px-4">

        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-accent/20 bg-accent/[0.06] text-accent">
            Proyectos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4 leading-tight">
            {t("title")}
          </h2>
          <p className="max-w-2xl mx-auto text-white/55 font-primary text-base leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* ── Bento Grid ──────────────────────────────────────────────────────
            Layout: 3 columns on desktop
            - First project (featured) → col-span-2, taller row
            - Second project (featured) → col-span-1, same row
            - Remaining featured → 1-col each in a 3-col row
            Mobile: single column stack
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((project, index) => {
            // First card gets double width + taller height
            const isHeroCard = index === 0;
            // Second (companion) card sits beside the hero card
            const isMidCard = index === 1;

            return (
              <div
                key={project.id}
                className={[
                  isHeroCard
                    ? "md:col-span-2 md:row-span-1 md:min-h-[480px]"
                    : isMidCard
                    ? "md:col-span-1 md:min-h-[480px]"
                    : "md:col-span-1 md:min-h-[400px]",
                  "min-h-[380px]",
                ].join(" ")}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>

        {/* ── CTA Block ── */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm rounded-3xl px-8 py-10 md:px-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3 font-display">
              {t("ctaTitle")}
            </h3>
            <p className="text-white/55 mb-8 max-w-lg mx-auto text-sm leading-relaxed font-primary">
              {t("ctaSubtitle")}
            </p>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold text-[#0C0C2C] bg-accent rounded-full hover:scale-105 transition-transform shadow-[0_0_24px_rgba(0,198,255,0.35)] text-sm"
            >
              {t("ctaButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProjects;
