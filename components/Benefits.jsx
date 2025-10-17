"use client";
import React from "react";
import { motion } from "framer-motion";

// Usaremos iconos más conceptuales para los beneficios
import { TbBulb, TbHexagons, TbMessages, TbChartInfographic } from "react-icons/tb";

// --- DATOS DE LOS BENEFICIOS ---
const benefitsData = [
  {
    icon: <TbBulb size={40} className="text-[#00C6FF]" />,
    title: "Enfoque en tus Objetivos",
    description:
      "No solo construyo sitios web; creo soluciones digitales que responden a tus metas de negocio. Cada línea de código y cada elemento de diseño tiene un propósito comercial.",
  },
  {
    icon: <TbHexagons size={40} className="text-[#00C6FF]" />,
    title: "Tecnología de Vanguardia",
    description:
      "Tu proyecto será desarrollado con herramientas modernas y eficientes (React, Next.js) que garantizan velocidad, seguridad y una experiencia de usuario impecable.",
  },
  {
    icon: <TbMessages size={40} className="text-[#00C6FF]" />,
    title: "Comunicación Transparente",
    description:
      "Te mantendré informado en cada fase del proyecto. Creo en la comunicación constante y en un proceso colaborativo para asegurar que estemos siempre alineados.",
  },
  {
    icon: <TbChartInfographic size={40} className="text-[#00C6FF]" />,
    title: "Entrega de Resultados Medibles",
    description:
      "Mi objetivo final es que tu inversión tenga un retorno. Me centro en métricas clave como la velocidad de carga, la optimización para SEO y la conversión de visitantes a clientes.",
  },
];

// --- VARIANTES DE ANIMACIÓN ---
const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Anima cada hijo con un pequeño retraso
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


// --- COMPONENTE PRINCIPAL ---
const Benefits = () => {
  return (
    <section id="benefits" className="py-24 bg-[#1B1F3B]">
      <div className="container px-4 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Columna Izquierda: Título y Declaración */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white">
              Más que un Desarrollador, <br />
              <span className="text-[#00C6FF]">un Socio Estratégico</span>
            </h2>
            <p className="text-lg text-[#A3A8CC]">
              Mi compromiso va más allá de entregar un buen producto. Me involucro en tu proyecto para entender tu visión y tus desafíos. El objetivo no es solo lanzar una web, sino crear un activo digital que impulse tu negocio hacia adelante. Tu éxito es mi éxito.
            </p>
          </motion.div>

          {/* Columna Derecha: Lista de Beneficios */}
          <motion.div
            className="space-y-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {benefitsData.map((benefit, index) => (
              <motion.div key={index} className="flex items-start gap-6" variants={itemVariants}>
                <div className="flex-shrink-0 w-12 h-12 mt-1">{benefit.icon}</div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-white">{benefit.title}</h3>
                  <p className="text-[#A3A8CC]">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;