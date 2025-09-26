"use client"

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/ui/WorkSliderBtns"; // Asumo que este componente existe y funciona

const projects = [
    {
        num: '01',
        category: 'Frontend - UI/UX - Backend',
        title: 'Repuestos Temuco',
        description: 'Desarrollé un catálogo digital interactivo para una tienda de repuestos y electrodomésticos. El objetivo principal es ofrecer a los clientes una forma rápida y sencilla de consultar el inventario de productos disponibles, con un potente buscador y navegación por categorías. El sitio funciona como una vitrina online moderna que mejora la presencia digital del negocio.',
        stack: [{ name: "React" }, { name: "TailwindCss" }, { name: "Typescript" }, { name: "Next.Js" }, { name: "Supabase" }],
        image: "/assets/temuco.png", // Ruta corregida (asumiendo que está en public/assets/alejo.png)
        live: "https://temuco-repuestos.vercel.app/",
        github: "https://github.com/codetech-jr/temuco-repuestos", 
    },
    {
        num: '02',
        category: 'Frontend - UI/UX',
        title: 'Grupo Legal Barboza, Deylena Barboza Abogada',
        description: 'Diseñé y desarrollé una landing page para la abogada Deylena Barboza, enfocándome en una experiencia de usuario (UX) clara y profesional. El diseño visual refleja los valores de confianza y seriedad, utilizando una paleta de colores sobria y una tipografía legible. La estructura del sitio guía al usuario de manera intuitiva hacia la información sobre los servicios legales ofrecidos y facilita el contacto, optimizando el recorrido del cliente potencial.',
        stack: [{ name: "React" }, { name: "TailwindCss" }, { name: "Typescript" }, { name: "Next.Js"}],
        image: "/assets/grupo-legal-barboza.png", // Ruta corregida (asumiendo que está en public/assets/alejo.png)
        live: "https://grupolegalbarboza.com/",
        github: "https://github.com/codetech-jr/grupo-legal-barboza-landing-page", 
    },
    {
        num: '03',
        category: 'Frontend - UI/UX - Branding',
        title: 'Pedro Salazar Abogado',
        description: 'Lideré el diseño y desarrollo del sitio web para el abogado Pedro Salazar, con un enfoque principal en la creación de una identidad visual sólida y una experiencia de usuario (UX) impecable. Mi labor incluyó la traducción de los atributos de la marca (seriedad, experiencia, confianza) a un diseño visual efectivo, seleccionando colores y tipografías acordes. El sitio está estructurado para guiar al usuario de forma intuitiva hacia los servicios y el contacto, optimizando el camino para la conversión.',
        stack: [{ name: "React" }, { name: "TailwindCss" }, { name: "Typescript" }, { name: "Next.Js"}],
        image: "/assets/pedro-salazar.png", // Ruta corregida (asumiendo que está en public/assets/alejo.png)
        live: "https://abogado-pedro-salazar.vercel.app/",
        github: "https://github.com/codetech-jr/abogado-pedro-salazar", 
    },
    {
        num: '04',
        category: 'Frontend - UI/UX - Branding',
        title: 'Miri Model Portfolio',
        description: 'Responsable del ciclo completo de diseño y desarrollo del portafolio para una modelo profesional. El objetivo fue crear una experiencia de usuario (UX) inmersiva y visualmente impactante. Mi labor principal fue conceptualizar la identidad visual, seleccionando una paleta de colores sofisticada y un diseño limpio que pusiera el foco en la fotografía. El corazón del proyecto es una galería de alta resolución, diseñada para una navegación fluida y elegante que refleja el profesionalismo de la modelo.',
        stack: [{ name: "React" }, { name: "TailwindCss" }, { name: "Typescript" }, { name: "Next.Js"}],
        image: "/assets/portfolio-miri.png", // Ruta corregida (asumiendo que está en public/assets/alejo.png)
        live: "https://miri-portfolio-model.vercel.app/",
        github: "https://github.com/codetech-jr/miri-portfolio-model",
    },
    {
        num: '05',
        category: 'Frontend - UI/UX',
        title: 'Dada Videos',
        description: 'Creé una página de aterrizaje optimizada para la conversión, dirigida a un editor de vídeo profesional. El objetivo principal del sitio es transformar visitantes en clientes potenciales mediante la exhibición impactante de su portafolio de trabajos y la inclusión de llamadas a la acción claras y efectivas. La estructura está pensada para guiar al usuario a través de la calidad y el estilo de la edición, generando confianza e incentivando el contacto.',
        stack: [{ name: "Vue.js" }, { name: "TailwindCss" }, { name: "Typescript" }, { name: "Nuxt"}],
        image: "/assets/dada-videos.png", // Ruta corregida (asumiendo que está en public/assets/alejo.png)
        live: "https://dada-videos.vercel.app/",
        github: "https://github.com/codetech-jr/dada-videos",
    },
    {
        num: '06',
        category: 'Frontend - UX/UI',
        title: 'Dada Media Design',
        description: 'Desarrollé una landing page de alta conversión para un diseñador gráfico especializado en logos para emprendedores. El sitio web no solo funciona como un portafolio para exhibir sus mejores trabajos, sino que integra un embudo de ventas claro y directo, presentando planes y precios definidos para transformar visitantes en clientes. La estructura está diseñada estratégicamente para guiar al usuario desde la inspiración visual (los proyectos) hasta la decisión de compra (los planes y el contacto).',
        stack: [{ name: "React" }, { name: "Next.Js" }, { name: "TailwindCss" }],
        image: "/assets/dada.png", // Ruta corregida (asumiendo que está en public/assets/alejo.png)
        live: "https://dada-react.vercel.app/",
        github: "https://github.com/codetech-jr/dada-react", 
    },
    {
        num: '06',
        category: 'Frontend - UI/UX - Branding',
        title: 'Proyecto Educativo Autodidacta',
        description: 'Desarrollé una landing page para un diseño educativo autodidacta sobre un spa de golden doodles, responsable del ciclo de diseño e interacción con el usuario, animaciones y transiciones.',
        stack: [{ name: "React" }, { name: "TailwindCss" }, { name: "Typescript" }, { name: "Next.Js"}, {name: "Gsap"}, {name: "Framer Motion"}],
        image: "/assets/golden-doodle-spa.png", // Ruta corregida (asumiendo que está en public/assets/alejo.png)
        live: "https://landing-doodles.vercel.app/",
        github: "https://github.com/codetech-jr/landing-doodles",
    },
    {
        num: '07',
        category: 'Frontend',
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/homevista.png", // Ruta corregida (asumiendo que está en public/assets/alejo.png)
        live: "https://homevista-js.vercel.app/",
        github: "https://github.com/codetech-jr/homevista-js", 
    },
    {
        num: '08',
        category: 'Frontend',
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/wecare.png", // Sin imagen, se mostrará un placeholder
        live: "https://landing-doctors-js.vercel.app/", // Sin enlace live
        github: "https://github.com/codetech-jr/landing-doctors-js",
    },
    {
        num: '09',
        category: 'Frontend',
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/egator.png", // Ejemplo, asegúrate que exista en public/assets/
        live: "https://education-page-six.vercel.app/",
        github: "https://github.com/codetech-jr/education-page", // Sin enlace GitHub
    },
    {
        num: '10',
        category: 'Frontend',
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/portfolio.png", // Ejemplo, asegúrate que exista en public/assets/
        live: "https://portfolio-ux-js.vercel.app/",
        github: "https://github.com/codetech-jr/portfolio-js", // Sin enlace GitHub
    },
    {
        num: '11',
        category: 'Frontend',
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/lawyer.png", 
        live: "https://landing-lawyer.vercel.app/",
        github: "https://github.com/codetech-jr/landing-lawyer", 
    },
    {
        num: '12',
        category: 'Frontend',
        title: 'Proyecto Educativo Autodidacta',
        description: 'Proyecto para medir mis capacidades en lenguajes de programación.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/resto.png", 
        live: "https://restaurant-landing-ochre.vercel.app/",
        github: "https://github.com/codetech-jr/restaurant-landing", 
    },
];

const Work = () => {
    const [project, setProject] = useState(projects[0]);

    const handleSlideChange = (swiper) => {
        const currentIndex = swiper.activeIndex;
        setProject(projects[currentIndex]);
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 2.4, duration: 0.4, ease: "easeIn" }
            }}
            className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
        >
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row xl:gap-[30px]">
                    <div className="w-full xl:w-[50%] xl:h-[700px] flex flex-col xl:justify-between order-2 xl:order-none">
                        <div className="flex flex-col gap-[30px] h-[50%]">
                            {/* outline num */}
                            <div className="font-extrabold leading-none text-transparent text-8xl text-outline">
                                {project.num}
                            </div>
                            {/* project category */}
                            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-[#00C6FF] transition-all duration-500 capitalize">
                                {project.title}
                            </h2>
                            <h3 className="text-[32px] font-bold leading-none text-white group-hover:text-[#00C6FF] transition-all duration-500 capitalize">
                                {project.category} project
                            </h3>
                            {/* project description */}
                            <p className="text-white/60">{project.description}</p>
                            {/* stack */}
                            <ul className="flex flex-wrap items-center gap-4"> {/* Añadido flex-wrap por si hay muchos stacks */}
                                {project.stack.map((item, index) => {
                                    return (
                                        <li key={index} className="text-xl text-[#00C6FF]">
                                            {item.name}
                                            {/* remove the last comma */}
                                            {index !== project.stack.length - 1 && <span className="text-white/60">,</span>}
                                        </li>
                                    );
                                })}
                            </ul>
                            {/* border */}
                            <div className="border border-white/20"></div>
                            {/* buttons */}
                            <div className="flex items-center gap-4">
                                {/* Live Project Link */}
                                {project.live && (
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group"
                                                >
                                                    <BsArrowUpRight className="text-white text-3xl group-hover:text-[#00C6FF]" />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Live project</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}

                                {/* GitHub Repository Link */}
                                {project.github && (
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group"
                                                >
                                                    <BsGithub className="text-white text-3xl group-hover:text-[#00C6FF]" />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Repositorio Github</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-[50%]">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            className="xl:h-[520px] mb-12"
                            onSlideChange={handleSlideChange}
                        >
                            {projects.map((item, index) => { // Cambié 'project' a 'item' para evitar conflicto con el estado 'project'
                                return (
                                    <SwiperSlide key={index} className="w-full">
                                        <div className="border-[#0C0C2C] h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                                            {/* overlay */}
                                            <div className="absolute top-0 bottom-0 z-10 w-full h-full bg-black/10"></div>
                                            {/* image */}
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Ajusta los sizes según tu diseño
                                                    className="object-cover bg-[#0C0C2C]"
                                                    alt={`Imagen del ${item.title}`} // Alt text descriptivo
                                                    priority={index === 0} // Carga la primera imagen con prioridad
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-full bg-gray-600">
                                                    <p className="text-white">Sin imagen disponible</p>
                                                </div>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                            {/* slider buttons */}
                            {/* Asumo que WorkSliderBtns recibe el swiper instance o maneja su propia lógica para controlar este Swiper */}
                            <WorkSliderBtns
                                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                                btnStyles="bg-[#00C6FF] hover:bg-[#00A5D9] text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all rounded-md"
                            />
                        </Swiper>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default Work;