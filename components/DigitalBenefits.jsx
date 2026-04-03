"use client";
import React, { useState } from "react";
import Motion from "@/components/ui/Motion";
import dynamic from 'next/dynamic';
const AnimatePresence = dynamic(() => import('framer-motion').then(m => m.AnimatePresence), { ssr: false });

// Importaciones de los iconos necesarios
// Inline simple SVGs instead of react-icons/tb to avoid bundling large icon packs

// --- DATOS MEJORADOS ---
// Estructura de datos con iconos para cada beneficio
const benefitsData = [
  {
    title: "Landing Page",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 2l7 4-7 4-7-4 7-4z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    benefits: [
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden><circle cx="12" cy="8" r="3" /><path d="M4 20c0-3 4-5 8-5s8 2 8 5v1H4v-1z"/></svg>), text: "Captura de clientes potenciales (leads) de forma altamente efectiva." },
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1" /><path d="M8 11h8" stroke="currentColor" strokeWidth="1" /></svg>), text: "Comunica un mensaje claro y enfocado para un producto o campaña." },
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M3 20h18" stroke="currentColor" strokeWidth="1" /><path d="M7 14l5-9 5 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>), text: "Maximiza el retorno de inversión de tus anuncios (Google/Facebook Ads)." },
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M6 19l6-6 6 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>), text: "Validación rápida de una idea de negocio con mínima inversión." },
    ],
  },
  {
    title: "Página Web",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><rect x="3" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1" /></svg>),
    benefits: [
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" /><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>), text: "Tu negocio abierto 24/7, accesible desde cualquier parte del mundo." },
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><rect x="3" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1" /><path d="M7 9h10" stroke="currentColor" strokeWidth="1" /></svg>), text: "Genera credibilidad y confianza, profesionalizando tu imagen de marca." },
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M12 2l7 4-7 4-7-4 7-4z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>), text: "Funciona como un centro de operaciones para tu marketing digital." },
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M3 20h18" stroke="currentColor" strokeWidth="1" /><path d="M7 14l5-9 5 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>), text: "Atrae clientes a través de un buen posicionamiento en Google (SEO)." },
    ],
  },
  {
    title: "E-Commerce",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M3 6h15l3 6v6a2 2 0 01-2 2H7a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="1" /></svg>),
    benefits: [
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M3 20h18v-6" stroke="currentColor" strokeWidth="1" /><rect x="5" y="6" width="6" height="8" stroke="currentColor" strokeWidth="1" /></svg>), text: "Vende tus productos sin barreras geográficas y a toda hora." },
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M6 19l6-6 6 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>), text: "Automatiza el proceso de venta, desde el pago hasta la gestión de inventario." },
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M3 20h18" stroke="currentColor" strokeWidth="1" /><path d="M7 14l5-9 5 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>), text: "Escala tu negocio de forma mucho más rápida que una tienda física." },
      { icon: (<svg className="text-[#00C6FF]" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1" /></svg>), text: "Recopila datos valiosos de tus clientes para mejorar tus estrategias." },
    ],
  },
];

// Variantes de animación para el contenido de las pestañas
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
};

const DigitalBenefits = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="digital-benefits" className="py-24 bg-[#0C0C2C]">
      <div className="container px-4 mx-auto">
        
        {/* Encabezado de la sección */}
        <Motion as="div" 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-white">Un Activo Digital Estratégico para tu Negocio</h2>
          <p className="max-w-3xl mx-auto mb-12 text-lg text-[#A3A8CC]">
            Tener presencia en internet es fundamental, pero cada negocio tiene necesidades distintas. 
            Descubre qué tipo de plataforma es la ideal para alcanzar tus objetivos.
          </p>
        </motion.div>

        {/* Botones de las pestañas (Tabs) */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {benefitsData.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-4 py-3 text-sm md:text-base font-bold rounded-lg transition-all duration-300 ${
                activeTab === index
                  ? "bg-[#00C6FF] text-[#0C0C2C]"
                  : "bg-[#1B1F3B] text-white hover:bg-[#00C6FF]/20"
              }`}
            >
              {tab.icon}
              {tab.title}
            </button>
          ))}
        </div>

        {/* Contenido de la pestaña activa */}
        <div className="relative p-8 bg-[#1B1F3B] border border-[#003B8D] rounded-xl">
          <AnimatePresence mode="wait">
            <Motion as="div"
              key={activeTab} // La 'key' le dice a AnimatePresence que este es un nuevo elemento a animar
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 gap-8 md:grid-cols-2" // La rejilla de beneficios
            >
              {benefitsData[activeTab].benefits.map((benefit, i) => (
                <Motion as="div" key={i} className="flex items-start gap-4" variants={itemVariants}>
                  <div className="flex-shrink-0 w-8 h-8 mt-1">
                    {benefit.icon}
                  </div>
                  <p className="text-lg text-[#A3A8CC]">{benefit.text}</p>
                </Motion>
              ))}
            </Motion>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DigitalBenefits;