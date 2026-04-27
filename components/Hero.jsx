"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";

import ParticleBackground from "./ParticleBackground";

export default function Hero() {
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
      className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden py-12 xl:py-24"
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

      <div className="container mx-auto relative z-10 px-6">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-16">
          {/* ─── Left: Copy Block ─── */}
          <div className="text-center xl:text-left order-2 xl:order-none flex-1 flex flex-col gap-6 max-w-2xl mx-auto xl:mx-0">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 text-xs text-accent uppercase tracking-widest font-medium mx-auto xl:mx-0">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Diseño web premium · Para negocios reales
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white font-primary">
              Tu negocio<br />merece una web<br />que <em className="not-italic text-accent relative">realmente</em><br />venda.
            </h1>

            {/* Sub-paragraph */}
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 font-primary font-light max-w-[520px] mx-auto xl:mx-0">
              No solo una página bonita. Creo <strong className="text-slate-900 dark:text-white font-medium">experiencias digitales premium</strong> — landing pages, sitios, catálogos y apps con IA — diseñados para convertir visitantes en clientes desde el primer clic.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center xl:justify-start mt-2">
              <Button
                size="lg"
                onClick={() => handleScroll("contacto")}
                className="w-full sm:w-auto hover:scale-105 transition-transform shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_0_50px_rgba(var(--accent-rgb),0.5)] font-primary font-bold text-base px-8 py-6 rounded-xl bg-accent text-primary"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.534 5.857L.057 23.676a.5.5 0 0 0 .632.632l5.818-1.477A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.937 0-3.745-.524-5.298-1.434l-.38-.225-3.78.96.974-3.78-.247-.393A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Quiero mi web
              </Button>
              <button
                onClick={() => handleScroll("servicios")}
                className="w-full sm:w-auto text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-primary font-medium text-base inline-flex items-center justify-center gap-2"
              >
                Ver servicios <span className="text-xl">↓</span>
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-8 xl:gap-12 mt-10 pt-8 border-t border-slate-200 dark:border-white/10">
              <div>
                <div className="text-3xl font-extrabold text-accent leading-none tracking-tight font-primary">+10</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 tracking-wide">Proyectos entregados</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-accent leading-none tracking-tight font-primary">3d</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 tracking-wide">Entrega promedio</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-accent leading-none tracking-tight font-primary">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 tracking-wide">Clientes satisfechos</div>
              </div>
            </div>
          </div>

          {/* ─── Right: Interactive Mockup ─── */}
          <div className="flex-1 w-full max-w-[420px] relative hidden xl:block z-20">
            <div className="bg-white/5 dark:bg-[#0D1422]/85 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
              {/* Browser Bar */}
              <div className="bg-slate-100 dark:bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-slate-200 dark:border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <div className="flex-1 bg-white dark:bg-white/5 rounded mx-2 px-3 py-1 text-[11px] text-slate-500 font-mono text-center">
                  temuco784.com
                </div>
              </div>
              
              {/* Mockup Body */}
              <div className="p-6">
                <div className="bg-gradient-to-br from-accent/10 to-transparent dark:to-primary/50 border border-slate-200 dark:border-white/10 rounded-xl p-5 mb-4">
                  <div className="text-[10px] text-accent font-bold uppercase tracking-wider mb-1">Caso de éxito real</div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-2 font-primary tracking-tight">
                    Repuestos<br />
                    <span className="text-accent">Temuco</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Catálogo digital + SEO Estratégico</p>
                  <Link 
                    href="/casos-de-exito/repuestos-temuco"
                    className="block bg-accent text-primary font-bold text-sm text-center py-3 rounded-lg cursor-pointer hover:bg-accent/90 transition-colors"
                  >
                    Ver Resultados →
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-accent font-primary">14k</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Vistas</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-accent font-primary">2.1%</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">CTR</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-accent font-primary">#7</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Google</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Mockup Glow */}
            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-accent/20 rounded-full blur-3xl -z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
