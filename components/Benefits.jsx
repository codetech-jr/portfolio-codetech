"use client";
import React from "react";
import { motion } from "framer-motion";

// Use inline SVGs for benefit icons to avoid importing react-icons

// --- DATOS DE LOS BENEFICIOS ---
const benefitsData = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 2a7 7 0 017 7c0 3-2 4-2 4s-1 1-1 2-1 2-3 2-3-1-3-2-1-2-1-2-2-1-2-4a7 7 0 017-7z" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
    title: "Enfoque en tus Objetivos",
    description:
      "No solo construyo sitios web; creo soluciones digitales que responden a tus metas de negocio. Cada línea de código y cada elemento de diseño tiene un propósito comercial.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 2l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
    title: "Tecnología de Vanguardia",
    description:
      "Tu proyecto será desarrollado con herramientas modernas y eficientes (React, Next.js) que garantizan velocidad, seguridad y una experiencia de usuario impecable.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
    title: "Comunicación Transparente",
    description:
      "Te mantendré informado en cada fase del proyecto. Creo en la comunicación constante y en un proceso colaborativo para asegurar que estemos siempre alineados.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 20h18M7 14l5-9 5 9" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
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