"use client";
import React from "react";
import { motion } from "framer-motion";

// --- 1. IMPORTAMOS LOS ICONOS ---
// Elige los que mejor representen cada servicio. Aquí te doy algunas ideas:
import { FaBullseye, FaLaptopCode, FaShoppingCart, FaChartLine, FaWrench, FaReact, FaBrain, FaPaintBrush, FaPalette} from "react-icons/fa";

// --- 2. DEFINIMOS LOS DATOS DE LOS SERVICIOS ---
// Esto hace que sea muy fácil añadir, quitar o modificar servicios en el futuro.
const servicesData = [
  {
    icon: <FaBullseye size={40} className="text-[#00C6FF]" />,
    title: "Landing Page",
    description: "Una página única y enfocada, diseñada para convertir visitantes en clientes. Ideal para campañas de marketing, productos o eventos.",
  },
  {
    icon: <FaLaptopCode size={40} className="text-[#00C6FF]" />,
    title: "Sitio Web Profesional",
    description: "La cara digital de tu negocio. Un sitio web completo, con múltiples páginas, diseñado para informar, atraer y generar confianza.",
  },
  {
    icon: <FaShoppingCart size={40} className="text-[#00C6FF]" />,
    title: "E-commerce / Catálogo",
    description: "Una tienda online robusta o un catálogo digital interactivo para mostrar y vender tus productos de manera eficiente y segura.",
  },
  {
    icon: <FaChartLine size={40} className="text-[#00C6FF]" />,
    title: "SEO Básico",
    description: "Optimizo tu sitio web para que los motores de búsqueda como Google lo encuentren y lo posicionen mejor, atrayendo más tráfico orgánico.",
  },
  {
    icon: <FaWrench size={40} className="text-[#00C6FF]" />,
    title: "Mantenimiento y Soporte",
    description: "Aseguro que tu sitio web funcione siempre a la perfección con actualizaciones, copias de seguridad y soporte técnico continuo.",
  },
  {
    icon: <FaReact size={40} className="text-[#00C6FF]" />,
    title: "Desarrollo a Medida",
    description: "Soluciones personalizadas para necesidades específicas, desde aplicaciones web hasta integraciones complejas.",
  },
  {
    icon: <FaBrain size={40} className="text-[#00C6FF]" />,
    title: "Diseño UI/UX",
    description: "Diseños atractivos y funcionales que mejoran la experiencia del usuario y aumentan la interacción en tu sitio web.",
  },
  {
    icon: <FaPalette size={40} className="text-[#00C6FF]" />,
    title: "Branding",
    description: "Creación de una identidad visual coherente y atractiva que refleje los valores y la misión de tu marca.",
  },
  {
    icon: <FaPaintBrush size={40} className="text-[#00C6FF]" />,
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
            <motion.div
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
        </motion.div>
      </div>
    </section>
  );
};

export default Services;