"use client";

import { useEffect, useState } from "react";
import Motion from "./ui/Motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Photo from "./Photo";

const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
  loading: () => null,
});

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
    if ("requestIdleCallback" in window) {
      idleId = requestIdleCallback(() => setLoadParticles(true), {
        timeout: 2000,
      });
    } else {
      idleId = window.setTimeout(() => setLoadParticles(true), 2000);
    }
    return () => {
      if ("cancelIdleCallback" in window && idleId) cancelIdleCallback(idleId);
      else clearTimeout(idleId);
    };
  }, []);

  return (
    <section
      className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden py-8 xl:py-16"
      aria-label="Hero principal"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/90 to-slate-100 dark:from-primary dark:via-primary/90 dark:to-primary/80 z-0" />

      {/* Glow orb */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div
          className="w-[700px] h-[700px] bg-accent/20 rounded-full blur-[120px]"
          aria-hidden
        />
      </div>

      {/* Particle Network (deferred) */}
      {loadParticles ? <ParticleBackground /> : null}

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-16">
          {/* ─── Left: Copy Block ─── */}
          <div className="text-center xl:text-left order-2 xl:order-none flex-1 flex flex-col gap-5">

            {/* [A] Badge */}
            <Motion
              as="div"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <Badge
                variant="accent"
                className="text-sm tracking-wide px-4 py-1.5 mx-auto xl:mx-0 font-primary"
              >
                {t("badge")}
              </Badge>
            </Motion>

            {/* [B] H1 – Headline */}
            <h1
              className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both"
              style={{ animationDelay: '150ms' }}
            >
              {t("headline")}
            </h1>

            {/* [C] Sub-paragraph */}
            <p
              className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 mx-auto xl:mx-0 font-primary animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both"
              style={{ animationDelay: '250ms' }}
            >
              {t("description")}
            </p>

            {/* [D] CTA Group */}
            <div
              className="flex flex-col sm:flex-row items-center gap-4 justify-center xl:justify-start animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both"
              style={{ animationDelay: '350ms' }}
            >
              {/* Primary CTA */}
              <Button
                size="lg"
                onClick={() => handleScroll("contacto")}
                className="w-full sm:w-auto hover:scale-105 transition-transform shadow-[0_0_24px_rgba(0,198,255,0.45)] font-primary font-semibold text-base"
              >
                {t("ctaPrimary")}
              </Button>

              {/* Secondary CTA */}
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleScroll("proyectos")}
                className="w-full sm:w-auto border-accent text-accent hover:bg-accent hover:text-primary backdrop-blur-sm font-primary font-semibold text-base"
              >
                {t("ctaSecondary")}
              </Button>
            </div>

            {/* [E] Micro-Proof */}
            <div
              className="flex flex-col gap-3 animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both"
              style={{ animationDelay: '450ms' }}
            >
              {/* Metric badges row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 justify-center xl:justify-start text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="text-accent font-bold">✓</span>
                  {t("proof1")}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-accent font-bold">✓</span>
                  {t("proof2")}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-accent font-bold">✓</span>
                  {t("proof3")}
                </span>
              </div>

              {/* Mini-Testimonial */}
              <p className="text-sm italic text-slate-500 dark:text-slate-400 text-center xl:text-left font-primary">
                <span className="not-italic">⭐⭐⭐⭐⭐</span>{" "}
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  {t("testimonial")}
                </span>
              </p>
            </div>
          </div>

          {/* ─── Right: Photo ─── */}
          <Photo />
        </div>
      </div>
    </section>
  );
}
