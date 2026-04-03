"use client";
import React from "react";
import Motion from "@/components/ui/Motion";

// --- 1. IMPORTAMOS LOS ICONOS ---
// Elige los que mejor representen cada servicio. Aquí te doy algunas ideas:
// Use small inline SVGs instead of react-icons to reduce bundle size

// --- 2. DEFINIMOS LOS DATOS DE LOS SERVICIOS ---
// Esto hace que sea muy fácil añadir, quitar o modificar servicios en el futuro.
const servicesData = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path d="M3 12c5 0 7-5 12-5s7 5 7 5-4 5-7 5-7-5-12-5z" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
    title: "Landing Page",
    description: "Una página única y enfocada, diseñada para convertir visitantes en clientes. Ideal para campañas de marketing, productos o eventos.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="0.8" />
        <path d="M8 9h8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Sitio Web Profesional",
    description: "La cara digital de tu negocio. Un sitio web completo, con múltiples páginas, diseñado para informar, atraer y generar confianza.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 6h15l3 6v6a2 2 0 01-2 2H7a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
    title: "E-commerce / Catálogo",
    description: "Una tienda online robusta o un catálogo digital interactivo para mostrar y vender tus productos de manera eficiente y segura.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 20h18" stroke="currentColor" strokeWidth="0.8" />
        <path d="M7 14l5-9 5 9" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "SEO Básico",
    description: "Optimizo tu sitio web para que los motores de búsqueda como Google lo encuentren y lo posicionen mejor, atrayendo más tráfico orgánico.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M4 13h6v6H4zM14 4h6v6h-6z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Mantenimiento y Soporte",
    description: "Aseguro que tu sitio web funcione siempre a la perfección con actualizaciones, copias de seguridad y soporte técnico continuo.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="0.8">
          <ellipse cx="12" cy="12" rx="6" ry="2" />
          <ellipse cx="12" cy="12" rx="6" ry="2" transform="rotate(60 12 12)" />
        </g>
      </svg>
    ),
    title: "Desarrollo a Medida",
    description: "Soluciones personalizadas para necesidades específicas, desde aplicaciones web hasta integraciones complejas.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 2l7 4-7 4-7-4 7-4zM5 10v8l7 4 7-4v-8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Diseño UI/UX",
    description: "Diseños atractivos y funcionales que mejoran la experiencia del usuario y aumentan la interacción en tu sitio web.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="3" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="0.8" />
        <path d="M7 17h10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Branding",
    description: "Creación de una identidad visual coherente y atractiva que refleje los valores y la misión de tu marca.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 7h18v10H3z" stroke="currentColor" strokeWidth="0.8" />
        <path d="M7 7v10" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
    title: "Rediseño Web",
    description: "Actualización y modernización de sitios web existentes para mejorar su apariencia, funcionalidad y rendimiento.",
  },
];

// --- 3. DEFINIMOS LAS VARIANTES DE ANIMACIÓN ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Esto hace que las tarjetas aparezcan una tras otra
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

// --- 4. EL COMPONENTE PRINCIPAL ---
const Services = () => {
  return (
    <section id="services" className="py-16 bg-[#0C0C2C] sm:py-24">
      <div className="container px-4 mx-auto">
        {/* Encabezado de la sección */}
        <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={headerVariants}
        >
          <h2 className="mb-4 text-4xl font-bold text-white">¿Cómo Puedo Ayudarte?</h2>
          <p className="max-w-3xl mx-auto mb-12 text-lg text-[#A3A8CC]">
            Desde una idea hasta un producto digital completo. Ofrezco soluciones a medida para llevar tu proyecto al siguiente nivel.
          </p>
        </motion.div>

        {/* Contenedor de las tarjetas de servicios */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {servicesData.map((service, index) => (
            <Motion as="div" 
                  key={index}
                  className="p-8 text-center bg-[#1B1F3B] border border-[#003B8D] rounded-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#00C6FF]/20"
                  variants={cardVariants}
                  // --- Animación al pasar el cursor ---
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
              <div className="flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">{service.title}</h3>
              <p className="text-[#A3A8CC]">{service.description}</p>
            </motion.div>
          ))}
        </Motion>
      </div>
    </section>
  );
};

export default Services;