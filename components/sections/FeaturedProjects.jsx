"use client";

import React, { useState } from "react";
import Motion from "@/components/ui/Motion";
import dynamic from "next/dynamic";
const AnimatePresence = dynamic(() => import('framer-motion').then(m => m.AnimatePresence), { ssr: false });
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";

export function FeaturedProjects() {
  const t = useTranslations("projects");
  const projects = t.raw("items");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Map to the thumbnail/videos (these remain static/hardcoded for now as they are asset paths)
  const assets = [
    { video: "/videos/proyecto-temuco.mp4", thumb: "/assets/thumbnail-temuco.jpg", link: "https://temuco-repuestos.vercel.app/", case: "/casos-de-exito/repuestos-temuco" },
    { video: "/videos/proyecto-pedro.mp4", thumb: "/assets/thumbnail-pedro.jpg", link: "https://abogado-pedro-salazar.vercel.app/", case: "/casos-de-exito/pedro-salazar" },
    { video: "/videos/proyecto-deylena.mp4", thumb: "/assets/thumbnail-deylena.jpg", link: "https://www.grupolegalbarboza.com/", case: "/casos-de-exito/deylena-barboza" },
    { video: "/videos/proyecto-miri.mp4", thumb: "/assets/thumbnail-miri.jpg", link: "https://miri-portfolio-model.vercel.app/", case: "/casos-de-exito/miri-portfolio" },
  ];

  return (
    <section id="proyectos" className="py-24 relative z-10" ref={ref}>
      <div className="container mx-auto">
        <Motion as="div"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-white/70 font-primary">
            {t("subtitle")}
          </p>
        </Motion>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} assets={assets[index]} index={index} />
          ))}
        </div>

        <Motion as="div"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-[#1B1F3B]/50 border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-blur-md shadow-lg dark:shadow-none"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t("ctaTitle")}</h3>
          <p className="text-slate-600 dark:text-white/70 mb-8 max-w-xl mx-auto font-primary">
            {t("ctaSubtitle")}
          </p>
          <Link 
            href="/work"
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-[#0C0C2C] bg-accent rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,198,255,0.4)]"
          >
            {t("ctaButton")}
          </Link>
        </Motion>
      </div>
    </section>
  );
}

function ProjectCard({ project, assets, index }) {
  const [playing, setPlaying] = useState(false);
  const t = useTranslations("projects");

  return (
    <Motion as="div"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden group hover:border-accent/30 dark:hover:border-accent/30 transition-colors flex flex-col h-full shadow-sm dark:shadow-none"
    >
      <div className="relative aspect-video w-full bg-slate-200 dark:bg-white/5 overflow-hidden">
        <AnimatePresence mode="wait">
          {!playing ? (
            <Motion as="div"
              key="thumb"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setPlaying(true)}
            >
              <Image 
                src={assets.thumb} 
                alt={project.title} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center text-[#0C0C2C] transform group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,198,255,0.5)]">
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </div>
              </div>
            </Motion>
            ) : (
            <Motion as="video"
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={assets.video}
              controls
              autoPlay
              className="w-full h-full object-cover"
              poster={assets.thumb}
              onEnded={() => setPlaying(false)}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-white/60 mb-6 font-primary text-sm leading-relaxed flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs font-semibold text-accent bg-accent/10 border border-accent/20 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-auto">
          <Link
            href={assets.case}
            className="flex-1 text-center font-bold px-6 py-3 bg-accent/10 dark:bg-accent/20 hover:bg-accent/20 dark:hover:bg-accent/30 text-slate-900 dark:text-accent rounded-xl transition-colors border border-accent/30"
          >
            Ver Caso de Éxito
          </Link>
          <a
            href={assets.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-bold px-6 py-3 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-white rounded-xl transition-colors"
          >
            {t("viewProject")}
          </a>
        </div>
      </div>
    </Motion>
  );
}
export default FeaturedProjects;
