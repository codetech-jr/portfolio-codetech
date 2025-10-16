"use client";
import React, { useEffect } from "react";
import { motion, useInView, useAnimation, animate, useMotionValue, useTransform } from "framer-motion";

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
  
    return <motion.span>{rounded}</motion.span>;
};


// --- COMPONENTE PRINCIPAL ---
const StatsServices = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <section ref={ref} className="py-12 bg-[#1B1F3B] xl:py-16">
      <div className="container mx-auto">
        <motion.div
          className="flex flex-col items-center justify-between gap-10 md:flex-row"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
                opacity: 1, 
                transition: { staggerChildren: 0.3 } 
            },
          }}
          initial="hidden"
          animate={mainControls}
        >
          {/* Texto Introductorio a la Izquierda */}
          <motion.div variants={{hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 }}} className="text-center md:text-left md:w-1/4">
            <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Tiempo en que realizaría tu sitio web
            </h2>
          </motion.div>

          {/* Estadísticas a la Derecha */}
          <div className="flex flex-wrap items-center justify-center flex-1 gap-12 md:justify-around">
            {statsData.map((item, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={{hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}}
              >
                <h3 className="mb-2 text-lg font-semibold tracking-widest text-white uppercase">
                  {item.title}
                </h3>
                <div className="text-7xl font-extrabold text-[#00C6FF] leading-none">
                  <AnimatedNumber value={item.value} />
                </div>
                <p className="mt-2 text-white/80">{item.unit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsServices;