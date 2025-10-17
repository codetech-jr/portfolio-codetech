"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Importaciones de los iconos necesarios
import { 
  TbBrowser, TbTargetArrow, TbShoppingCart, TbUsers, TbMessageBolt, 
  TbChartArrowsVertical, TbFlask, TbClock24, TbCertificate, TbWorldWww, 
  TbSeo, TbBuildingStore, TbRobot, TbArrowBigUpLines, TbDatabase 
} from "react-icons/tb";

// --- DATOS MEJORADOS ---
// Estructura de datos con iconos para cada beneficio
const benefitsData = [
  {
    title: "Landing Page",
    icon: <TbTargetArrow size={24} />,
    benefits: [
      { icon: <TbUsers size={32} className="text-[#00C6FF]" />, text: "Captura de clientes potenciales (leads) de forma altamente efectiva." },
      { icon: <TbMessageBolt size={32} className="text-[#00C6FF]" />, text: "Comunica un mensaje claro y enfocado para un producto o campaña." },
      { icon: <TbChartArrowsVertical size={32} className="text-[#00C6FF]" />, text: "Maximiza el retorno de inversión de tus anuncios (Google/Facebook Ads)." },
      { icon: <TbFlask size={32} className="text-[#00C6FF]" />, text: "Validación rápida de una idea de negocio con mínima inversión." },
    ],
  },
  {
    title: "Página Web",
    icon: <TbBrowser size={24} />,
    benefits: [
      { icon: <TbClock24 size={32} className="text-[#00C6FF]" />, text: "Tu negocio abierto 24/7, accesible desde cualquier parte del mundo." },
      { icon: <TbCertificate size={32} className="text-[#00C6FF]" />, text: "Genera credibilidad y confianza, profesionalizando tu imagen de marca." },
      { icon: <TbWorldWww size={32} className="text-[#00C6FF]" />, text: "Funciona como un centro de operaciones para tu marketing digital." },
      { icon: <TbSeo size={32} className="text-[#00C6FF]" />, text: "Atrae clientes a través de un buen posicionamiento en Google (SEO)." },
    ],
  },
  {
    title: "E-Commerce",
    icon: <TbShoppingCart size={24} />,
    benefits: [
      { icon: <TbBuildingStore size={32} className="text-[#00C6FF]" />, text: "Vende tus productos sin barreras geográficas y a toda hora." },
      { icon: <TbRobot size={32} className="text-[#00C6FF]" />, text: "Automatiza el proceso de venta, desde el pago hasta la gestión de inventario." },
      { icon: <TbArrowBigUpLines size={32} className="text-[#00C6FF]" />, text: "Escala tu negocio de forma mucho más rápida que una tienda física." },
      { icon: <TbDatabase size={32} className="text-[#00C6FF]" />, text: "Recopila datos valiosos de tus clientes para mejorar tus estrategias." },
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
        <motion.div 
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
            <motion.div
              key={activeTab} // La 'key' le dice a AnimatePresence que este es un nuevo elemento a animar
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 gap-8 md:grid-cols-2" // La rejilla de beneficios
            >
              {benefitsData[activeTab].benefits.map((benefit, i) => (
                <motion.div key={i} className="flex items-start gap-4" variants={itemVariants}>
                  <div className="flex-shrink-0 w-8 h-8 mt-1">
                    {benefit.icon}
                  </div>
                  <p className="text-lg text-[#A3A8CC]">{benefit.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DigitalBenefits;