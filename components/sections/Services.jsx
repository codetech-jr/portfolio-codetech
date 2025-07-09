"use client";
import { useState } from "react";
import { useForm } from "react-hook-form"; // 1. Importar useForm
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

// --- DATOS (sin cambios) ---
const packages = [
  {
    name: "Presencia Inicial",
    description: "Ideal para emprendedores o negocios que necesitan una presencia profesional en internet de forma rápida.",
    features: ["Landing Page profesional (varias secciones)", "Diseño 100% adaptable (responsive)", "Formulario de contacto funcional", "Conexión con redes sociales", "Optimización SEO básica", "Construido con React/Next.js"],
    price: "$350 USD",
    highlight: false,
  },
  {
    name: "Negocio Profesional",
    description: "Para empresas y negocios que necesitan un sitio web completo, personalizado y fácil de gestionar.",
    features: ["Todo lo de 'Presencia Inicial'", "Hasta 5 páginas (Inicio, Sobre Nosotros, Servicios, Blog, Contacto)", "CMS para el blog", "Diseño alineado a tu marca", "Mapa de ubicación (Google Maps)"],
    price: "$750 USD",
    highlight: true,
  },
  {
    name: "E-commerce / Catálogo Avanzado",
    description: "Para negocios que quieren vender o mostrar productos en línea de manera profesional.",
    features: ["Todo lo de 'Negocio Profesional'", "Catálogo de productos con filtros y búsqueda", "Carrito de compras", "Integración con pasarela de pago", "Panel de administración sencillo", "Carga inicial de hasta 20 productos"],
    price: "Desde $1,500 USD",
    highlight: false,
  },
];

const addons = [
  {
    title: "Mantenimiento Web Mensual",
    description: "Actualizaciones, backups, soporte y pequeños cambios de contenido.",
    price: "$60 USD/mes",
  },
  {
    title: "Optimización SEO Avanzada",
    description: "Investigación de palabras clave, optimización de velocidad, sitemap y registro en Google.",
    price: "$200 USD (único pago)",
  },
  {
    title: "Desarrollo de Contenido para Blog",
    description: "Redacción de artículos optimizados para SEO.",
    price: "$50 USD por artículo",
  },
  {
    title: "Sitio Multilenguaje",
    description: "Implementación técnica para un segundo idioma (traducciones provistas por el cliente).",
    price: "+30% sobre el paquete",
  },
];

// --- COMPONENTES INTERNOS (sin cambios) ---
const CheckIcon = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg> );
const PackageCard = ({ pkg, onSelect }) => ( <div className={cn("relative flex flex-col h-full p-8 rounded-2xl border-2 transition-all duration-300 bg-[#1B1F3B] border-[#003B8D]", pkg.highlight && "border-[#00C6FF] shadow-2xl shadow-[#00c6ff]/10 scale-105 z-10")}> {pkg.highlight && (<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 text-sm font-semibold text-[#0C0C2C] bg-[#00C6FF] rounded-full">Recomendado</div>)} <div className="flex flex-col flex-grow text-center"><h3 className={cn("text-2xl font-bold mb-2", pkg.highlight ? 'text-[#00C6FF]' : 'text-[#FFFFFF]')}>{pkg.name}</h3><p className="text-[#A3A8CC] mb-6 text-sm">{pkg.description}</p><ul className="space-y-3 text-left mb-8 text-[#A3A8CC] text-sm">{pkg.features.map((feature, i) => (<li key={i} className="flex items-start gap-3"><CheckIcon className="text-[#00C6FF] mt-1 flex-shrink-0" /><span>{feature}</span></li>))}</ul></div><div className="mt-auto text-center"><div className="mb-6 text-2xl font-extrabold text-[#FFFFFF]"><span className="text-[#00C6FF]">{pkg.price}</span></div><DialogTrigger asChild><Button onClick={() => onSelect(pkg)} size="lg" className={cn("w-full font-bold", pkg.highlight ? 'bg-[#00C6FF] text-[#0C0C2C] hover:bg-[#00C6FF]/90' : 'bg-transparent border-2 border-[#003B8D] text-[#A3A8CC] hover:bg-[#003B8D] hover:text-white')}>{pkg.price.includes("Desde") ? "Solicitar Cotización" : "Solicitar"}</Button></DialogTrigger></div></div> );
const AddonCard = ({ addon }) => ( <div className="p-6 rounded-xl bg-[#1B1F3B] border border-[#003B8D] flex flex-col"><h4 className="text-lg font-semibold text-[#00C6FF] mb-2">{addon.title}</h4><p className="text-[#A3A8CC] text-sm flex-grow mb-4">{addon.description}</p><div className="mt-auto font-bold text-right text-white">{addon.price}</div></div> );

// --- VARIANTES DE ANIMACIÓN (sin cambios) ---
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// --- COMPONENTE PRINCIPAL CON FORMULARIO FUNCIONAL ---
export default function Services() {
  // 2. Estados para manejar el formulario y su envío
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // 3. Inicializar react-hook-form
  const { register, handleSubmit, reset, setValue } = useForm();

  // 4. Función que se ejecuta al seleccionar un paquete
  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setSubmitStatus(null); // Limpia mensajes de éxito/error anteriores
    setValue("selectedPackage", pkg.name); // Actualiza el valor en el formulario
  };

  // 5. Función que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Falló la respuesta del servidor');

      setSubmitStatus('success');
      reset(); // Limpia el formulario
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog onOpenChange={() => setSubmitStatus(null)}>
      <section id="servicios" className="py-24 bg-[#0C0C2C]">
        <div className="container px-4 mx-auto">
          {/* ... Encabezado de la sección sin cambios ... */}
          <motion.div className="text-center" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.8 }} variants={itemVariants}><h2 className="mb-6 text-4xl font-bold text-white">Paquetes de Desarrollo Web</h2><p className="max-w-2xl mx-auto text-[#A3A8CC] mb-12">Soluciones a la medida para llevar tu proyecto al siguiente nivel. Elige el paquete que mejor se adapte a tus necesidades.</p></motion.div>
          
          <motion.div className="grid items-stretch grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {packages.map((pkg) => (
              <motion.div key={pkg.name} variants={itemVariants} whileHover={{ scale: pkg.highlight ? 1.08 : 1.03, transition: { duration: 0.2 } }}>
                {/* 6. Usar la nueva función para seleccionar el paquete */}
                <PackageCard pkg={pkg} onSelect={handleSelectPackage} />
              </motion.div>
            ))}
          </motion.div>

          {/* ... Sección de Add-ons sin cambios ... */}
          <div className="mt-24"><motion.div className="text-center" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.8 }} variants={itemVariants}><h3 className="mb-10 text-3xl font-bold text-white">Servicios Adicionales</h3></motion.div><motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>{addons.map((addon) => (<motion.div key={addon.title} variants={itemVariants} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}><AddonCard addon={addon} /></motion.div>))}</motion.div></div>
        </div>
      </section>

      {/* 7. Contenido del Dialog con lógica condicional */}
      <DialogContent className="bg-[#1B1F3B] border-[#003B8D] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#00C6FF]">Solicitar Información para {selectedPackage?.name}</DialogTitle>
          <DialogDescription className="text-[#A3A8CC]">
            {submitStatus !== 'success' && "Estás a un paso de comenzar. Completa el formulario."}
          </DialogDescription>
        </DialogHeader>

        {submitStatus === 'success' ? (
          <div className="py-10 text-center">
            <h3 className="text-2xl font-bold text-green-400">¡Enviado con Éxito!</h3>
            <p className="text-[#A3A8CC] mt-2">Gracias por tu interés. Me pondré en contacto contigo a la brevedad.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="pt-4 space-y-4">
            <div>
              <label htmlFor="selectedPackage" className="block text-sm font-medium text-[#A3A8CC]">Paquete de Interés</label>
              <input {...register("selectedPackage")} id="selectedPackage" readOnly className="w-full mt-1 bg-[#0C0C2C] border border-[#003B8D] rounded-md p-2 focus:ring-0 focus:border-[#003B8D] cursor-default"/>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#A3A8CC]">Tu Nombre</label>
              <input {...register("name", { required: true })} id="name" type="text" className="w-full mt-1 bg-[#0C0C2C] border border-[#003B8D] rounded-md p-2 focus:ring-[#00C6FF] focus:border-[#00C6FF]"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#A3A8CC]">Tu Email</label>
              <input {...register("email", { required: true })} id="email" type="email" className="w-full mt-1 bg-[#0C0C2C] border border-[#003B8D] rounded-md p-2 focus:ring-[#00C6FF] focus:border-[#00C6FF]"/>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#A3A8CC]">Cuéntame sobre tu proyecto (opcional)</label>
              <textarea {...register("message")} id="message" rows="4" className="w-full mt-1 bg-[#0C0C2C] border border-[#003B8D] rounded-md p-2 focus:ring-[#00C6FF] focus:border-[#00C6FF]"></textarea>
            </div>
            {submitStatus === 'error' && (
              <p className="text-sm text-center text-red-500">Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.</p>
            )}
            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#00C6FF] text-[#0C0C2C] hover:bg-[#00C6FF]/90 font-bold disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}