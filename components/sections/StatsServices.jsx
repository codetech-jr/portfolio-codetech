"use client";
import Motion from "@/components/ui/Motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

// --- DATOS DE LAS ESTADÍSTICAS ---
// Mantenemos los datos separados para que sea fácil actualizarlos en el futuro.
const statsData = [
  {
    title: "Pagina Landing Page",
    value: 1,
    unit: "Semanas",
  },
  {
    title: "Pagina Web Corporativa",
    value: 2,
    unit: "Semanas",
  },
  {
    title: "Tienda - Catálogo Digital",
    value: 4,
    unit: "Semanas",
  },
];

// --- COMPONENTE PARA ANIMAR LOS NÚMEROS ---
// Este componente se encarga de la animación de conteo
const AnimatedNumber = ({ value }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));
  
    useEffect(() => {
      const controls = animate(count, value, {
        duration: 2, // Duración de la animación en segundos
        ease: "easeOut",
      });
      // Cleanup function to stop animation if component unmounts
      return controls.stop; 
    }, [value, count]);
  
    return <Motion as="span">{rounded}</Motion>;
};


// --- COMPONENTE PRINCIPAL ---
const StatsServices = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <section ref={ref} className="py-12 bg-[#1B1F3B] xl:py-16">
      <div className="container mx-auto">
        <div className={`flex flex-col items-center justify-between gap-10 md:flex-row ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700` }>
          {/* Texto Introductorio a la Izquierda */}
          <div className={`text-center md:text-left md:w-1/4 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'} transition-all duration-700` }>
            <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Tiempo en que realizaría tu sitio web
            </h2>
          </div>

          {/* Estadísticas a la Derecha */}
          <div className="flex flex-wrap items-center justify-center flex-1 gap-12 md:justify-around">
            {statsData.map((item, index) => (
              <div key={index} className={`text-center ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700 delay-${index}` }>
                <h3 className="mb-2 text-lg font-semibold tracking-widest text-white uppercase">
                  {item.title}
                </h3>
                <div className="text-7xl font-extrabold text-[#00C6FF] leading-none">
                  <AnimatedNumber value={inView ? item.value : 0} />
                </div>
                <p className="mt-2 text-white/80">{item.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsServices;