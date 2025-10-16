"use client";
import React from "react";
import { motion } from "framer-motion";

// --- 1. IMPORTAMOS SLICK Y SUS ESTILOS ---
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// --- DATOS DE TESTIMONIOS (Sin cambios) ---
const testimonials = [
    {
        name: "Pedro Salazar",
        role: "Abogado Corporativo",
        testimonial:
          "Tenía una visión muy específica para mi web y Junior fue la elección perfecta para materializarla. Su capacidad para entender y plasmar mis ideas en un diseño tangible fue excepcional. Además, su trabajo fue rápido, puntual y muy profesional...",
        avatar: "/assets/avatar-pedro.png",
      },
      {
        name: "Miri Hernández",
        role: "Modelo Internacional",
        testimonial:
          "¡Mi portafolio quedó increíble! Ahora puedo mostrar mi trabajo a agencias y clientes de todo el mundo. El diseño es elegante y la web carga rapidísimo. El proceso fue rápido y muy profesional, él es el mejor.",
        avatar: "/assets/avatar-miri.jpg",
      },
      {
        name: "Guido Gaviola",
        role: "CEO de Repuestos Temuco",
        testimonial:
          "Necesitaba una web competitiva y fácil de entender, y Junior superó las expectativas. Lo que más destaco es su increíble profesionalismo: es puntual, eficiente y muestra un compromiso total con el proyecto de principio a fin...",
        avatar: "/assets/avatar-guido.png",
      },
      { 
        name: "Deylena Barboza",
        role: "Abogada en Trámites Migratorios",
        testimonial:
          "¡Estoy encantada con la página web que Daniel me hizo! El trabajo que ha hecho es súper chévere. Los colores, el mensaje, las imágenes y toda la información contenida en la página quedaron espectaculares. Todo está en orden y la letra es completamente legible, lo cual valoro mucho. Me encanta que, al abrir la página, los colores sean armónicos a la vista. Es exactamente lo que pedí. ¡Súper alegre con los resultados!",
        avatar: "/assets/avatar-deylena.jpg",
      },
];

// --- Componente TestimonialCard (Sin cambios) ---
const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="flex flex-col h-full p-8 mx-2 rounded-2xl border-2 shadow-lg bg-[#1B1F3B] border-[#003B8D]">
          <div className="flex items-center gap-4 mb-6">
            {testimonial.avatar && (
              <img
                src={testimonial.avatar}
                alt={`Avatar de ${testimonial.name}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#00C6FF]"
                loading="lazy"
              />
            )}
            <div>
              <div className="text-lg font-bold text-[#00C6FF]">{testimonial.name}</div>
              <div className="text-sm text-[#A3A8CC]">{testimonial.role}</div>
            </div>
          </div>
          <div className="flex-grow">
            <p className="text-[#A3A8CC] italic leading-relaxed">
              “{testimonial.testimonial}”
            </p>
          </div>
        </div>
      );
};


// --- COMPONENTE PRINCIPAL ACTUALIZADO CON SLICK CAROUSEL ---
export default function Testimonials() {

  // --- 2. CONFIGURACIÓN PARA SLICK CAROUSEL ---
  const settings = {
    dots: true,       // Muestra los puntos de paginación
    infinite: true,   // Habilita el loop infinito
    speed: 500,       // Velocidad de la transición en ms
    slidesToShow: 3,  // Cuántos testimonios mostrar en escritorio
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000, // Igual que el delay de Swiper
    responsive: [     // Configuración para diferentes tamaños de pantalla
      {
        breakpoint: 1024, // Para tablets
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768, // Para móviles
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section id="testimonios" className="py-24 bg-[#0C0C2C]">
      <div className="container px-4 mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="mb-6 text-4xl font-bold text-white">Testimonios</h2>
          <p className="max-w-3xl mx-auto text-[#A3A8CC] mb-16">
            Nada habla mejor de mi trabajo que la satisfacción de mis clientes. 
            Estas son sus palabras sobre la experiencia de colaborar juntos.
          </p>
        </motion.div>

        {/* --- 3. IMPLEMENTACIÓN DEL SLIDER CON SLICK --- */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="pb-8" // Padding para los dots
        >
          <Slider {...settings}>
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="h-full px-2">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>

       {/* --- 4. NUEVOS ESTILOS PERSONALIZADOS PARA SLICK --- */}
       <style jsx global>{`
        /* Personalización de los Puntos (Dots) */
        .slick-dots li button:before {
            font-size: 10px;
            color: #003B8D !important;
            opacity: 0.7;
            transition: all 0.2s ease;
        }
        
        .slick-dots li.slick-active button:before {
            color: #00C6FF !important;
            opacity: 1;
        }

        /* Personalización de las Flechas (Arrows) */
        .slick-prev:before, .slick-next:before {
            font-size: 24px;
            color: #00C6FF !important;
            opacity: 0.8;
            transition: all 0.2s ease;
        }

        .slick-prev:hover:before, .slick-next:hover:before {
            opacity: 1;
        }
       `}</style>
    </section>
  );
}