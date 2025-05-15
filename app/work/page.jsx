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
        category: 'Frontend',
        title: 'Dada',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, laboriosam.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/dada.png", // Ruta corregida (asumiendo que está en public/assets/alejo.png)
        live: "https://dada-media-design.vercel.app/",
        github: "https://github.com/codetech-jr/dada-media-design", 
    },
    {
        num: '02',
        category: 'Frontend',
        title: 'projecto 2',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, laboriosam.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/homevista.png", // Ruta corregida (asumiendo que está en public/assets/alejo.png)
        live: "https://homevista-js.vercel.app/",
        github: "https://github.com/codetech-jr/homevista-js", 
    },
    {
        num: '03',
        category: 'Frontend',
        title: 'projecto 3',
        description: 'Consectetur adipisicing elit. Aliquam, assumenda perferendis dolores laudantium.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/wecare.png", // Sin imagen, se mostrará un placeholder
        live: "https://landing-doctors-js.vercel.app/", // Sin enlace live
        github: "https://github.com/codetech-jr/landing-doctors-js",
    },
    {
        num: '04',
        category: 'Frontend',
        title: 'projecto 4',
        description: 'Dolor sit amet consectetur adipisicing elit. Quaerat, voluptatem.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/egator.png", // Ejemplo, asegúrate que exista en public/assets/
        live: "https://education-page-six.vercel.app/",
        github: "https://github.com/codetech-jr/education-page", // Sin enlace GitHub
    },
    {
        num: '05',
        category: 'Frontend',
        title: 'projecto 5',
        description: 'Dolor sit amet consectetur adipisicing elit. Quaerat, voluptatem.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/portfolio.png", // Ejemplo, asegúrate que exista en public/assets/
        live: "https://portfolio-ux-js.vercel.app/",
        github: "https://github.com/codetech-jr/portfolio-js", // Sin enlace GitHub
    },
    {
        num: '06',
        category: 'Frontend',
        title: 'projecto 6',
        description: 'Dolor sit amet consectetur adipisicing elit. Quaerat, voluptatem.',
        stack: [{ name: "Html5" }, { name: "Css3" }, { name: "Javascript" }],
        image: "/assets/lawyer.png", 
        live: "https://landing-lawyer.vercel.app/",
        github: "https://github.com/codetech-jr/landing-lawyer", 
    },
    {
        num: '07',
        category: 'Frontend',
        title: 'projecto 7',
        description: 'Dolor sit amet consectetur adipisicing elit. Quaerat, voluptatem.',
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
                    <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
                        <div className="flex flex-col gap-[30px] h-[50%]">
                            {/* outline num */}
                            <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                                {project.num}
                            </div>
                            {/* project category */}
                            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-[#00C6FF] transition-all duration-500 capitalize">
                                {project.category} project
                            </h2>
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
                            <div className="flex gap-4 items-center">
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
                                            <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
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
                                                <div className="w-full h-full flex justify-center items-center bg-gray-600">
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