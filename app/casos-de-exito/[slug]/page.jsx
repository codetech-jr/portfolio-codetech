"use client";
import React from "react";
import { motion } from "framer-motion";
import { notFound } from 'next/navigation'; // Importamos una función para manejar errores 404

// --- 1. IMPORTAMOS NUESTRO "MAPA" DE CASOS DE ÉXITO ---
import { allCaseStudies } from "@/data/case-studies"; 

// --- 2. EL COMPONENTE AHORA RECIBE 'params' DE NEXT.JS ---
const CaseStudyPage = ({ params }) => {
  // Obtenemos el slug de la URL. Ej: "pedro-salazar"
  const { slug } = params; 

  // --- 3. BUSCAMOS LOS DATOS CORRECTOS USANDO EL SLUG ---
  const data = allCaseStudies[slug];

  // --- 4. MANEJO DE ERRORES: ¿QUÉ PASA SI LA URL NO COINCIDE CON NINGÚN CASO? ---
  // Si no se encuentran datos para ese slug, mostramos una página 404.
  if (!data) {
    notFound();
  }

  // Las variantes de animación no cambian
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // El resto de tu JSX es idéntico, ya que ahora 'data' contendrá
  // la información correcta según la URL.
  return (
    <div className="bg-[#0C0C2C] text-white">
      {/* --- SECCIÓN HERO --- */}
      <motion.header 
        className="relative flex items-center justify-center h-96"
        // Le añadimos una key para forzar el re-renderizado al cambiar de página
        key={slug} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt={data.title} className="object-cover w-full h-full opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C2C] to-transparent"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold md:text-6xl">{data.title}</h1>
          <p className="mt-4 text-xl text-[#A3A8CC]">{data.tagline}</p>
        </div>
      </motion.header>


      <main className="max-w-4xl px-4 py-16 mx-auto sm:py-24">
        {/* --- SECCIÓN DESAFÍO --- */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <h2 className="mb-4 text-3xl font-bold text-center text-[#00C6FF]">{data.challenge.title}</h2>
          <p className="text-lg text-center text-[#A3A8CC]">{data.challenge.description}</p>
        </motion.section>

        <hr className="my-16 border-t border-[#003B8D]" />

        {/* --- SECCIÓN SOLUCIÓN --- */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <h2 className="mb-4 text-3xl font-bold text-center text-[#00C6FF]">{data.solution.title}</h2>
          <p className="mb-12 text-lg text-center text-[#A3A8CC]">{data.solution.description}</p>
          
          <div className="space-y-16">
            {data.solution.steps.map((step, index) => (
              <motion.div key={index} className="grid items-center gap-8 md:grid-cols-2" variants={sectionVariants}>
                <div className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
                  <h3 className="mb-3 text-2xl font-bold">{step.title}</h3>
                  <p className="text-[#A3A8CC]">{step.content}</p>
                </div>
                <div className={index % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
                  <img src={step.image} alt={step.title} className="rounded-lg shadow-2xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <hr className="my-16 border-t border-[#003B8D]" />
        
        {/* --- SECCIÓN RESULTADOS --- */}
        <motion.section 
          className="p-8 rounded-lg bg-[#1B1F3B] sm:p-12"
          variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-center text-[#00C6FF]">{data.results.title}</h2>
          <p className="mb-12 text-lg text-center text-[#A3A8CC]">{data.results.description}</p>

          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            {data.results.stats.map((stat) => (
              <div key={stat.label} className="p-6 bg-[#0C0C2C] rounded-lg">
                <p className="text-4xl font-bold text-[#00C6FF]">{stat.value}</p>
                <p className="mt-2 text-[#A3A8CC]">{stat.label}</p>
              </div>
            ))}
          </div>

          {data.results.testimonial && (
            <blockquote className="p-6 mx-auto mt-12 border-l-4 border-[#00C6FF] bg-[#0C0C2C] max-w-2xl">
              <p className="text-xl italic">"{data.results.testimonial.quote}"</p>
              <cite className="block mt-4 not-italic font-semibold text-right text-[#A3A8CC]">— {data.results.testimonial.author}</cite>
            </blockquote>
          )}
        </motion.section>

        {/* --- CTA FINAL --- */}
        <motion.section 
          className="mt-20 text-center"
          variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-2xl font-semibold">¿Listo para empezar tu proyecto?</h3>
          <p className="max-w-xl mx-auto mt-4 mb-8 text-lg text-[#A3A8CC]">
            Hablemos de cómo puedo ayudarte a alcanzar tus objetivos.
          </p>
          <a
            href="/contacto"
            className="inline-block px-8 py-4 text-lg font-bold text-[#0C0C2C] transition-transform duration-300 bg-[#00C6FF] rounded-md hover:scale-105"
          >
            Contáctame
          </a>
        </motion.section>
      </main>
    </div>
  );
};

export default CaseStudyPage;