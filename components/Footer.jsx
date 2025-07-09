"use client"

import React from "react";
import { motion } from "framer-motion"; // 1. Importar Framer Motion
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

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
    href: "https://www.instagram.com/tuusuario", // Cambia por tu usuario real
    icon: <FaInstagram />,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/in/tuusuario", // Cambia por tu usuario real
    icon: <FaLinkedin />,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/tuusuario", // Cambia por tu usuario real
    icon: <FaGithub />,
    label: "GitHub",
  },
  {
    href: "mailto:tuemail@dominio.com", // Cambia por tu email real
    icon: <FaEnvelope />,
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
      className="w-full border-t"
      style={{ background: COLORS.bg, borderColor: COLORS.card }}
      // 3. Animar el footer cuando entre en la vista
      variants={footerContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="flex flex-col items-center justify-between max-w-5xl gap-4 px-4 py-8 mx-auto md:flex-row">
        {/* Animar el bloque de texto */}
        <motion.div className="text-center md:text-left" variants={itemVariants}>
          <span className="font-mono text-lg font-bold" style={{ color: COLORS.accent }}>
            © {new Date().getFullYear()} Codetech Junior
          </span>
          <span className="block mt-1 text-sm" style={{ color: COLORS.muted }}>
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
              className="text-2xl"
              style={{ color: COLORS.accent }}
              variants={itemVariants} // Reutilizamos la variante para el efecto de entrada
              whileHover={{ scale: 1.25, y: -2, color: COLORS.white }}
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