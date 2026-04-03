"use client"

import React from "react";
import { motion } from "framer-motion"; // 1. Importar Framer Motion
import IconInstagram from "./icons/IconInstagram";
import IconLinkedin from "./icons/IconLinkedin";
import IconGithub from "./icons/IconGithub";
import IconEnvelope from "./icons/IconEnvelope";

// Paleta de colores (sin cambios)
const COLORS = {
  bg: "#0C0C2C",
  accent: "#00C6FF",
  accentDark: "#003B8D",
  white: "#FFFFFF",
  muted: "#A3A8CC",
  card: "#1B1F3B",
};

const socialLinks = [
  {
    href: "https://github.com/codetech-jr",
      icon: <IconGithub className="w-6 h-6" />,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/alejandro-gabriel-daniel-919a17187/",
      icon: <IconLinkedin className="w-6 h-6" />,
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/codetechjunior/",
      icon: <IconInstagram className="w-6 h-6" />,
    label: "Instagram",
  },
  {
    href: "mailto:codetechjr@gmail.com",
      icon: <IconEnvelope className="w-6 h-6" />,
    label: "Email",
  },
];

// 2. Definir variantes de animación
const footerContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Anima el texto y luego el contenedor de iconos
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const socialIconContainerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }, // Anima cada icono con un pequeño retraso
}

export default function Footer() {
  return (
    <motion.footer
      className="w-full border-t bg-white dark:bg-[#0C0C2C] border-slate-200 dark:border-[#1B1F3B]"
      // 3. Animar el footer cuando entre en la vista
      variants={footerContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="flex flex-col items-center justify-between max-w-5xl gap-4 px-4 py-8 mx-auto md:flex-row">
        {/* Animar el bloque de texto */}
        <motion.div className="text-center md:text-left" variants={itemVariants}>
          <span className="font-mono text-lg font-bold text-accent">
            © {new Date().getFullYear()} Codetech Junior
          </span>
          <span className="block mt-1 text-sm text-slate-500 dark:text-[#A3A8CC]">
            Todos los derechos reservados.
          </span>
        </motion.div>

        {/* Animar el contenedor de iconos sociales */}
        <motion.div 
            className="flex gap-5" 
            variants={socialIconContainerVariants}
        >
          {socialLinks.map((link) => (
            // 4. Convertir cada icono en un elemento animado con micro-interacciones
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-2xl text-accent"
              variants={itemVariants} // Reutilizamos la variante para el efecto de entrada
              whileHover={{ scale: 1.25, y: -2, color: "#00C6FF" }} // Keep accent on hover or adjust if needed
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
}