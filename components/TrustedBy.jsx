"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import styles from "./TrustedBy.module.css";

// --- DATOS CON LA PROPIEDAD 'url' ---
const clientLogos = [
    { 
        src: "/assets/repuestos-temuco.png", 
        alt: "Logo de Repuestos Temuco", 
        name: "Repuestos Temuco",
        url: "https://temuco-repuestos.vercel.app/"
      },
      { 
        src: "/assets/pedro-salazar-abogado-logo.png", 
        alt: "Logo de Pedro Salazar Abogado", 
        name: "Pedro Salazar Abogado",
        url: "https://abogado-pedro-salazar.vercel.app/" 
      },
      { 
        src: "/assets/miri-model-logo.png", 
        alt: "Logo de Miri Hernández Modelo", 
        name: "Miri Model",
        url: "https://miri-portfolio-model.vercel.app/" 
      },
      { 
        src: "/assets/deylena-abogada-logo.png", 
        alt: "Logo de Grupo Legal Barboza", 
        name: "Grupo Legal Barboza",
        url: "https://grupolegalbarboza.com/"
      },
      { 
        src: "/assets/dada-media.png", 
        alt: "Logo de Dada Media Design", 
        name: "Dada Media Design",
        url: "https://dada-react.vercel.app/" 
      },
];

const duplicatedLogos = [...clientLogos, ...clientLogos];

const TrustedBy = () => {
  return (
    <section id="trusted-by" className="py-16 bg-[#1B1F3B]">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-12 text-center text-lg font-semibold text-[#A3A8CC] tracking-wider uppercase">
            Marcas que confían en mi trabajo
          </h3>
          
          <div className={styles.logoSlider}>
            <div className={styles.sliderTrack}>
              {duplicatedLogos.map((logo, index) => (
                // --- 1. SE AÑADE LA CLASE 'group' AL ENLACE PADRE ---
                <a
                  key={index}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar el sitio de ${logo.name}`}
                  className="flex-shrink-0 block mx-8 group" // <-- ¡LA MAGIA VUELVE AQUÍ!
                >
                  <div className="relative w-40 h-16 md:w-48 md:h-20"> 
                    {/* --- 2. EL EFECTO DE SCALE SE AÑADE DIRECTAMENTE A LA IMAGEN --- */}
                    <Image
                      src={logo.src}
                      fill
                      alt={logo.alt}
                      className="object-contain transition-all duration-300 transform filter grayscale invert brightness-0 opacity-60 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110"
                      sizes="200px"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;