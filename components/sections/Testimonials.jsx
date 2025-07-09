"use client";
import { motion } from "framer-motion";

// --- DATOS ---
const testimonials = [
  {
    name: "Pedro Salazar",
    role: "Abogado Corporativo",
    testimonial:
      "Tenía una visión muy específica para mi web y Junior fue la elección perfecta para materializarla. Su capacidad para entender y plasmar mis ideas en un diseño tangible fue excepcional. Además, su trabajo fue rápido, puntual y muy profesional. Si buscas a alguien que sepa escuchar y ejecutar tu visión con compromiso y responsabilidad, él es la persona indicada.",
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
      "Necesitaba una web competitiva y fácil de entender, y Junior superó las expectativas. Lo que más destaco es su increíble profesionalismo: es puntual, eficiente y muestra un compromiso total con el proyecto de principio a fin. Es el tipo de colaborador que cualquier negocio serio necesita. Totalmente recomendado.",
    avatar: "/assets/avatar-guido.png",
  },
];

// --- Componente TestimonialCard ---
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex flex-col h-full p-8 rounded-2xl border-2 shadow-lg bg-[#1B1F3B] border-[#003B8D]">
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

// --- VARIANTES DE ANIMACIÓN ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


// --- COMPONENTE PRINCIPAL CON ANIMACIONES Y HOVER ---
export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-[#0C0C2C]">
      <div className="container px-4 mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
          variants={itemVariants}
        >
          <h2 className="mb-6 text-4xl font-bold text-white">Testimonios</h2>
          <p className="max-w-3xl mx-auto text-[#A3A8CC] mb-12">
            Nada habla mejor de mi trabajo que la satisfacción de mis clientes. 
            Estas son sus palabras sobre la experiencia de colaborar juntos y los resultados que obtuvimos.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}