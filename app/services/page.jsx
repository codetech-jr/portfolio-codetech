"use client"

import style from "@/app/services/ServicesPage.module.css"
import { BsArrowDownRight } from "react-icons/bs"
import Link from "next/link";

const services = [
    {
        num: '01',
        title: 'Desarrollo Web',
        description: 'Ofrezco servicios de desarrollo web enfocados en la creación de sitios modernos, rápidos y responsivos. Utilizo tecnologías como HTML, CSS, JavaScript y frameworks como Tailwind CSS para construir interfaces atractivas y funcionales. Mi enfoque incluye la optimización del rendimiento y la integración de componentes interactivos para garantizar una experiencia fluida y atractiva para los usuarios.',
        href: "https://blog.hubspot.es/website/que-es-desarrollo-web"
    },
    {
        num: '02',
        title: 'Diseño UI/UX',
        description: 'Ofrezco servicios de diseño UI/UX centrados en crear interfaces intuitivas y atractivas que mejoren la experiencia del usuario. Desde la investigación y diseño de prototipos hasta la implementación visual, garantizo que cada proyecto combine funcionalidad y estética, asegurando una navegación fluida y una experiencia memorable para los usuarios.',
        href: "https://www.ironhack.com/es/blog/que-es-y-que-hace-un-disenador-ux-ui"
    },
    {
        num: '03',
        title: 'SEO',
        description: 'Ofrezco servicios de optimización SEO para mejorar la visibilidad de tu sitio web en motores de búsqueda. Implemento estrategias de palabras clave, optimización de contenido, mejora de velocidad de carga y configuración de etiquetas meta, garantizando que tu sitio alcance mejores posiciones en los resultados de búsqueda y atraiga más tráfico orgánico.',
        href: "https://rockcontent.com/es/blog/que-es-seo/",
    },
];

import {motion} from "framer-motion"
import { Target } from "lucide-react";

const Services = () => {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
            <div className="container mx-auto">
                <motion.div 
                initial={{opacity: 0}}
                animate={{
                    opacity: 1, 
                    transition: { delay: 2.4, duration: 0.4, ease: "easeIn"},
                }}
                className="grid grid-cols md:grid-cols-2 gap-[60px]"
                >
                    {services.map((service, index) =>{
                        return (
                        <div 
                            key={index}
                            className="flex-1 flex flex-col justify-center gap-6 group"
                        >
                            {/* top */}
                            <div className="w-full flex justify-between items-center">
                            <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-300">{service.num}</div>
                                <Link href={service.href} className="w-[78px] h-[78px] rounded-full bg-white group-hover:bg-[#00C6FF] transition-all duration-500 flex justify-center items-center hover:-rotate-45">
                                    <BsArrowDownRight className="text-[#0C0C2C] text-3xl" />
                                </Link>
                            </div>
                            {/* title */}
                            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-[#00C6FF] transition-all duration-500">{service.title}</h2>
                            {/* description */}
                            <p className="text-white/60">{service.description}</p>
                            {/* border */}
                            <div className="border-b border-white/20 w-full"></div>
                        </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    )
}

export default Services;