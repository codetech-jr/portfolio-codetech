"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATOS (sin cambios) ---
const faqs = [
  {
    question: "¿Cuánto cuesta una página web?",
    answer: `Esta es la pregunta más importante, y la respuesta honesta es: depende. Cada proyecto es único. Es como preguntar cuánto cuesta construir una casa; depende del tamaño, los materiales y las funcionalidades extra.\n\nPara darte una idea, una página web informativa estándar para un profesional o una pequeña empresa suele partir de 950 USD. Este precio puede variar según la complejidad, como la inclusión de una tienda online, sistemas de reservas o funcionalidades personalizadas.\n\nLa mejor forma de saber el precio exacto para tu proyecto es que me cuentes tu idea. Con gusto prepararé un presupuesto detallado y sin compromiso adaptado 100% a tus necesidades.`,
    category: "Sobre la Inversión (Costos y Presupuesto)",
  },
  {
    question: "¿Qué suele incluir un presupuesto estándar?",
    answer: `Mi objetivo es entregarte una solución completa y lista para funcionar. Un proyecto web estándar conmigo siempre incluye:\n- Diseño personalizado y único para tu marca.\n- Desarrollo responsive, para que tu web se vea perfecta en móviles, tablets y ordenadores.\n- Hasta 5 páginas internas (Ej: Inicio, Sobre Mí, Servicios, Blog, Contacto).\n- Formulario de contacto para que tus clientes puedan comunicarse contigo.\n- Optimización SEO básica para ayudar a Google a encontrar y entender tu sitio.\n- Conexión con redes sociales.\n- Una breve capacitación para que aprendas a actualizar el contenido básico tú mismo/a.`,
    category: "Sobre la Inversión (Costos y Presupuesto)",
  },
  {
    question: "¿Hay costos adicionales que deba tener en cuenta?",
    answer: `¡Transparencia total! Además del diseño y desarrollo de la web, hay dos costos externos que toda página web necesita para funcionar:\n- Dominio: Es la dirección de tu web (ej: www.minombre.com). Cuesta aproximadamente 10-15$ al año.\n- Hosting (Alojamiento): Es el "alquiler" del espacio en internet donde vivirá tu web. Los planes de calidad suelen rondar los 80-150$ al año.\n\nPuedes contratar estos servicios tú mismo/a, o si lo prefieres, yo puedo gestionarlo todo para que no tengas que preocuparte por nada, los precios del hosting pueden variar según los requerimientos de tu proyecto. Lo discutiremos claramente en el presupuesto.`,
    category: "Sobre la Inversión (Costos y Presupuesto)",
  },
    {
    question: "¿Cuáles son tus métodos de pago?",
    answer: `Si se encuentra fuera de Venezuela, los pagos se realizan a través de PayPal y Binance. Si se encuentra en Venezuela, los pagos se realizan en bolívares, mediante pago móvil, transferencia bancaria, Binance u última instancia si se encuentra cerca de mi localidad, en Divisa.`,
    category: "Sobre la Inversión (Costos y Presupuesto)",
  },
  {
    question: "¿Cómo es la forma de pago?",
    answer: `El plan de pago del proyecto consta de 3 partes, cancelas el 50% después de formalizar el contrato con el cliente e inicializar el proyecto, 25% al llegar a la fase de Desarrollo y el último 25% a la fase entrega y facturación` ,
    category: "Sobre la Inversión (Costos y Presupuesto)",
  },
  {
    question: "¿Cuánto tiempo tardarás en tener mi web lista?",
    answer: `Un proyecto de página web informativa estándar suele tomar entre 1 y 2 semanas desde que tenemos todo el material necesario (textos, imágenes, etc.).\n\nEste plazo puede ser más corto o más largo dependiendo de la complejidad del proyecto y de la fluidez en la comunicación y entrega de contenidos. Mi proceso está diseñado para ser eficiente y mantenerte informado/a en cada etapa, desde el diseño inicial hasta el lanzamiento final.`,
    category: "Sobre el Proceso y los Tiempos",
  },
  {
    question: "¿Qué necesitas de mí para empezar el proyecto?",
    answer: `¡Tu participación es clave! Para empezar, generalmente necesito:\n- El logo de tu marca (si lo tienes) y tus colores corporativos.\n- Los textos para cada sección de la web (quién eres, qué servicios ofreces, etc.).\n- Imágenes y videos que quieras incluir.\n\nNo te preocupes si no tienes todo listo. Nuestra primera reunión servirá para definir exactamente qué necesitamos y te daré una guía para que puedas prepararlo todo de forma sencilla.`,
    category: "Sobre el Proceso y los Tiempos",
  },
  {
    question: "¿Ofreces soporte o mantenimiento una vez lanzada la web?",
    answer: `¡Sí! Tu tranquilidad es importante. Todos mis proyectos incluyen 30 días de soporte gratuito post-lanzamiento para corregir cualquier error o problema técnico que pudiera surgir.\n\nAdemás, ofrezco planes de mantenimiento mensual opcionales para quienes no quieren preocuparse por los aspectos técnicos. Estos planes incluyen actualizaciones de seguridad, copias de seguridad, y soporte continuo, asegurando que tu web esté siempre rápida, segura y funcionando a la perfección.`,
    category: "Sobre la Tecnología y el Mantenimiento",
  },
];

// --- COMPONENTE ACORDEÓN MEJORADO CON FRAMER MOTION ---
function AccordionItem({ faq, isOpen, onClick }) {
  return (
    <div className="mb-3 overflow-hidden border rounded-lg bg-[#1B1F3B] border-[#003B8D]">
      <motion.button
        className="flex items-center justify-between w-full px-5 py-4 font-semibold text-left text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C6FF]"
        onClick={onClick}
        aria-expanded={isOpen}
        type="button"
        whileHover={{ backgroundColor: "#1f2347" }}
        initial={false}
      >
        <span className="font-medium text-[#00C6FF]">{faq.question}</span>
        <motion.span
          className="ml-4 text-2xl text-[#00C6FF]"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? '−' : '+'}
        </motion.span>
      </motion.button>
      
      {/* AnimatePresence es clave para las animaciones de entrada y salida */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: "1rem", marginBottom: "1rem" },
              collapsed: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="px-5 overflow-hidden"
          >
            <p className="text-[#A3A8CC] leading-relaxed whitespace-pre-line">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- VARIANTES DE ANIMACIÓN PARA LA ENTRADA DE LA SECCIÓN ---
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  // --- MEJORA: Agrupamos las FAQs por categoría ---
  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});

  return (
    <section className="py-24 bg-[#0C0C2C] font-mono">
      <div className="container max-w-4xl px-4 mx-auto">
        <motion.div 
            className="text-center"
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.8 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-white">
            Preguntas Frecuentes
          </h2>
          <p className="mb-12 text-lg text-[#A3A8CC] max-w-3xl mx-auto">
            Invertir en una página web es una decisión importante. Aquí he recopilado las dudas más comunes para darte toda la claridad que necesitas.
          </p>
        </motion.div>
        
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
          {/* Mapeamos sobre las categorías agrupadas */}
          {Object.entries(groupedFaqs).map(([category, faqsInCategory], categoryIndex) => (
            <motion.div key={category} className="mb-10" variants={itemVariants}>
              <h3 className="mb-6 text-2xl font-bold text-center text-[#00C6FF] border-b-2 border-[#003B8D] pb-2">
                {category}
              </h3>
              <div>
                {faqsInCategory.map((faq, idx) => (
                  <AccordionItem
                    key={faq.question}
                    faq={faq}
                    isOpen={openIndex === `${categoryIndex}-${idx}`}
                    onClick={() => setOpenIndex(openIndex === `${categoryIndex}-${idx}` ? null : `${categoryIndex}-${idx}`)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}