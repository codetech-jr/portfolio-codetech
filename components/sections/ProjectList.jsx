"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { featuredProjects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

// ─── Spring config for smooth cursor tracking ───────────────────────────────
const SPRING = { damping: 28, stiffness: 200, mass: 0.5 };

// ─── Image size ──────────────────────────────────────────────────────────────
const IMG_W = 320;
const IMG_H = 210;

export default function ProjectList({ projects = featuredProjects, hideHeader = false }) {
  const t = useTranslations("projects");

  // Cursor tracking (relative to viewport)
  const cursorX = useMotionValue(-999);
  const cursorY = useMotionValue(-999);
  const springX = useSpring(cursorX, SPRING);
  const springY = useSpring(cursorY, SPRING);

  // Which project row is hovered (-1 = none)
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  const handleMouseMove = (e) => {
    cursorX.set(e.clientX - IMG_W / 2);
    cursorY.set(e.clientY - IMG_H / 2 - 40);
  };

  return (
    <section
      id="proyectos"
      className="relative py-16 md:py-24 min-h-[80vh]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIdx(-1)}
    >
      <div className="container mx-auto px-4 md:px-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        {!hideHeader && (
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-[-0.04em] uppercase leading-none opacity-90">
              {t("title") || "Selected Work"}
            </h2>
            <p className="max-w-xs text-white/40 text-sm leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        )}

        {/* ── Project List ────────────────────────────────────────────────── */}
        <ul className="flex flex-col w-full divide-y divide-white/10">
          {projects.map((project, idx) => {
            const isHovered = hoveredIdx === idx;
            const href =
              project.caseStudy ||
              (project.live !== "#" ? project.live : project.github);
            const isExternal = !project.caseStudy;

            return (
              <li key={project.id}>
                {/* ── Desktop Row (hidden on mobile) ── */}
                <div
                  className="group hidden md:flex items-center justify-between py-10 lg:py-14 px-2 cursor-pointer transition-colors duration-300 hover:bg-white/[0.025]"
                  onMouseEnter={() => setHoveredIdx(idx)}
                >
                  {/* Left: index + title */}
                  <div className="flex items-start gap-6">
                    <span className="text-white/20 text-sm font-mono mt-3 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      {isExternal ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <h3 className="font-bold text-[#888] group-hover:text-white transition-colors duration-500 text-5xl lg:text-7xl xl:text-8xl tracking-[-0.04em] uppercase leading-[0.85]">
                            {project.title}
                          </h3>
                        </a>
                      ) : (
                        <Link href={href} className="block">
                          <h3 className="font-bold text-[#888] group-hover:text-white transition-colors duration-500 text-5xl lg:text-7xl xl:text-8xl tracking-[-0.04em] uppercase leading-[0.85]">
                            {project.title}
                          </h3>
                        </Link>
                      )}

                      {/* Tech badges — slide in on hover */}
                      <div className="mt-4 flex flex-wrap gap-2 overflow-hidden">
                        {project.techStack.slice(0, 5).map((tech) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, y: 8 }}
                            animate={
                              isHovered
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 8 }
                            }
                            transition={{ duration: 0.25 }}
                          >
                            <Badge
                              variant="outline"
                              className="bg-transparent border-white/20 text-white/60 text-[10px] tracking-widest uppercase font-medium"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: category + arrow */}
                  <div className="flex flex-col items-end gap-3 shrink-0 ml-8">
                    <span className="text-white/30 text-xs font-mono uppercase tracking-widest group-hover:text-white/70 transition-colors">
                      {project.category}
                    </span>
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={
                        isHovered
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -12 }
                      }
                      transition={{ duration: 0.25 }}
                      className="rounded-full bg-white/10 border border-white/20 p-3"
                    >
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* ── Mobile Card (visible on mobile only) ── */}
                <div className="flex md:hidden flex-col gap-5 py-10 px-2">
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white tracking-[-0.03em] uppercase leading-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-white/50 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="bg-transparent border-white/20 text-white/50 text-[10px] tracking-widest uppercase"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-5">
                      {project.caseStudy ? (
                        <Link
                          href={project.caseStudy}
                          className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1"
                        >
                          Ver Caso de Estudio <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      ) : project.live !== "#" ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1"
                        >
                          Visitar Sitio <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        {!hideHeader && (
          <div className="mt-24 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 font-bold tracking-widest uppercase text-xs"
            >
              {t("ctaButton") || "Ver Todo el Portafolio"}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* ── Floating Image (Desktop Follow-Cursor) ───────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
        style={{
          x: springX,
          y: springY,
          width: IMG_W,
          height: IMG_H,
        }}
        animate={{
          opacity: hoveredIdx >= 0 ? 1 : 0,
          scale: hoveredIdx >= 0 ? 1 : 0.88,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        {hoveredIdx >= 0 && projects[hoveredIdx] && (
          <Image
            src={projects[hoveredIdx].image}
            alt={projects[hoveredIdx].title}
            fill
            className="object-cover"
            sizes={`${IMG_W}px`}
            priority
          />
        )}
      </motion.div>
    </section>
  );
}
