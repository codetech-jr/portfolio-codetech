"use client";

import React, { useState, useMemo } from "react";
import Motion from "@/components/ui/Motion";
import dynamic from "next/dynamic";

const AnimatePresence = dynamic(() => import('framer-motion').then(m => m.AnimatePresence), { ssr: false });
import ProjectCard from "@/components/ProjectCard"; 
import ProjectList from "@/components/sections/ProjectList";
import { projectsData } from "@/data/projects";
import { useTranslations } from "next-intl";

export default function WorkPage() {
  const t = useTranslations("work");
  
  // 1. Merge the static project data from data/projects.js with the translations
  const localizedProjects = useMemo(() => {
    return projectsData.map((project) => ({
      ...project,
      title: t(`items.${project.id}.title`),
      description: t(`items.${project.id}.description`),
      category: t(`items.${project.id}.category`)
    }));
  }, [t]);

  // 2. Extract unique categories from translated tags
  const uniqueCategories = useMemo(() => {
    const categoriesSet = new Set(localizedProjects.map(p => p.category));
    return [t("allFilter"), ...Array.from(categoriesSet)];
  }, [localizedProjects, t]);

  const [activeCategory, setActiveCategory] = useState(t("allFilter"));

  // 3. Filter projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === t("allFilter")) return localizedProjects;
    return localizedProjects.filter(p => p.category === activeCategory);
  }, [activeCategory, localizedProjects, t]);

  return (
    <Motion as="section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] py-16 xl:py-24 relative z-10 font-primary"
    >
      <div className="container mx-auto px-4">
        <Motion as="div" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
            <h2 className="mb-4 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-display">
                {t("title")}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-white/70">
                {t("subtitle")}
            </p>
        </Motion>

        {/* --- CUSTOM NEUMORPHIC FILTERS --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
          {uniqueCategories.map((category, index) => {
            const isActive = activeCategory === category;
            return (
                <button
                    key={index}
                    onClick={() => setActiveCategory(category)}
                    className="relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300"
                >
                    <span className={`relative z-10 ${isActive ? 'text-[#0C0C2C]' : 'text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white'}`}>
                        {category}
                    </span>
                    {isActive && (
                        <Motion as="div"
                            layoutId="activeFilterBubble"
                            className="absolute inset-0 bg-accent rounded-full shadow-[0_0_15px_rgba(0,198,255,0.4)]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            style={{ zIndex: 0 }}
                        />
                    )}
                    {!isActive && (
                        <div className="absolute inset-0 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors" style={{ zIndex: 0 }} />
                    )}
                </button>
            )
          })}
        </div>

        {/* --- MINIMALIST PROJECT LIST --- */}
        <div className="mt-8">
          {filteredProjects.length > 0 ? (
            <ProjectList projects={filteredProjects} hideHeader={true} />
          ) : (
            <div className="text-center py-20 text-white/50">
              No se encontraron proyectos para esta categoría.
            </div>
          )}
        </div>
      </div>
    </Motion>
  );
}
