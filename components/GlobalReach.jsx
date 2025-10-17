"use client";
import React, { useEffect } from "react";
import { motion, useInView, useAnimation, animate, useMotionValue, useTransform } from "framer-motion";

// Iconos relevantes para esta sección
import { FaGlobeAmericas } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";

// --- DATOS DE ALCANCE GLOBAL ---
// ¡Aquí es donde actualizas tus logros!
const globalStats = [
  {
    icon: <FaGlobeAmericas />,
    value: 2, // Cambia este número por la cantidad de países
    label: "Países",
  },
  {
    icon: <GoProjectSymlink />,
    value: 1, // Cambia por el número de proyectos internacionales
    label: "Proyectos Internacionales",
  },
  {
    icon: <FaGlobeAmericas />,
    value: 1, // Cambia por el número de clientes atendidos globalmente
    label: "Clientes",
  }
  // Puedes añadir más métricas si quieres
];

// Reutilizamos el componente para animar números de tu sección de Stats
const AnimatedNumber = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
    return controls.stop; 
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};


const GlobalReach = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <section 
      ref={ref} 
      className="py-24 bg-[#0C0C2C] relative overflow-hidden"
    >
      {/* --- Fondo del Mapa --- */}
      <div 
        className="absolute inset-0 bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url(/assets/world-map.svg)" }}
        aria-hidden="true"
      />
      
      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-white">
            Creando Soluciones Digitales Sin Fronteras
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-[#A3A8CC]">
            He tenido el privilegio de colaborar con clientes visionarios en diferentes partes del mundo,
            adaptándome a sus mercados y entregando resultados globales.
          </p>
        </motion.div>

        {/* --- Estadísticas Globales Animadas --- */}
        <motion.div 
          className="flex flex-wrap justify-center gap-12 mt-16 md:gap-24"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.3 } },
          }}
          initial="hidden"
          animate={mainControls}
        >
          {globalStats.map((stat, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="text-4xl text-[#00C6FF] mb-4">
                {stat.icon}
              </div>
              <div className="text-6xl font-extrabold text-white">
                +<AnimatedNumber value={stat.value} />
              </div>
              <div className="mt-2 text-lg text-[#A3A8CC]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalReach;