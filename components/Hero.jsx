"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
  loading: () => null,
});
import Photo from "./Photo";

export default function Hero() {
  const t = useTranslations("hero");
  const [loadParticles, setLoadParticles] = useState(false);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    let idleId;
    if ('requestIdleCallback' in window) {
      idleId = requestIdleCallback(() => setLoadParticles(true), { timeout: 2000 });
    } else {
      idleId = window.setTimeout(() => setLoadParticles(true), 2000);
    }
    return () => {
      if ('cancelIdleCallback' in window && idleId) cancelIdleCallback(idleId);
      else clearTimeout(idleId);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-12 xl:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/90 to-slate-100 dark:from-primary dark:via-primary/90 dark:to-primary/80 z-0"></div>
      
      {/* 3D Particle Network Mesh (carga diferida) */}
      {loadParticles ? <ParticleBackground /> : null}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12">
          
          <div className="text-center xl:text-left order-2 xl:order-none flex-1">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-medium tracking-wider text-accent mb-4 block"
            >
              {t("role")}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="h1 mb-6 text-slate-900 dark:text-white"
            >
              {t("greeting")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                <Typewriter
                  words={t.raw("typewriterWords")}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-[500px] mb-9 text-slate-600 dark:text-white/80 mx-auto xl:mx-0 text-lg leading-relaxed font-primary"
            >
              {t("description")}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center xl:justify-start"
            >
              <Button 
                size="lg" 
                onClick={() => handleScroll('proyectos')}
                className="w-full sm:w-auto hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,198,255,0.4)] font-primary"
              >
                {t("ctaProjects")}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => handleScroll('contacto')}
                className="w-full sm:w-auto border-accent text-accent hover:bg-accent hover:text-primary backdrop-blur-sm font-primary"
              >
                {t("ctaContact")}
              </Button>
            </motion.div>
          </div>

          {/* Photo */}
          <Photo />

        </div>
      </div>
    </section>
  );
}
