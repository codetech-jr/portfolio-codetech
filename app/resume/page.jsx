"use client";

import {
    FaHtml5,
    FaCss3,
    FaJs,
    FaFigma,
} from "react-icons/fa"

import { SiTailwindcss, SiNextdotjs} from "react-icons/si"

// about data
const about = {
    title: "Acerca de Mí",
    description: 
    "Soy un desarrollador frontend apasionado por transformar ideas en experiencias digitales interactivas. Me especializo en la creación de interfaces modernas y funcionales, con experiencia en diseño gráfico y desarrollo web. Siempre en constante aprendizaje, actualmente mejoro mis habilidades en inglés técnico y programación avanzada, buscando nuevos desafíos para crecer profesionalmente.",
    info: [
        {
            fieldName: "Nombre",
            fieldValue: "Junior Daniel"
        },
        {
            fieldName: "Teléfono",
            fieldValue: "Junior Daniel"
        },
        {
            fieldName: "Experiencia",
            fieldValue: "Junior Daniel"
        },
        {
            fieldName: "Nacionalidad",
            fieldValue: "Venezolano"
        },
        {
            fieldName: "Freelance",
            fieldValue: "Disponible"
        },
        {
            fieldName: "Email",
            fieldValue: "codetechjunior2000@gmail.com"
        },
        {
            fieldName: "Idiomas",
            fieldValue: "Español"
        },
    ]
}

// experience data
const experience = {
    icon: '/assets/resume/badge.svg',
    title: 'Mi experiencia',
    description:  "Hábil en la implementación de componentes interactivos, carruseles Swiper personalizados y menús de navegación dinámicos. Actualmente, mejorando mis habilidades en frontend y explorando la integración de chatbots para mejorar la experiencia del usuario.",
    items: [
        {
            company: "CICPC",
            position: "Junior Frontend Developer",
            duration: "2023"
        },
        {
            company: "Dada Media Design",
            position: "Freelance Junior Frontend Developer",
            duration: "2024"
        },

    ]
}

const education = {
    icon: '/assets/resume/badge.svg',
    title: 'Mi educación',
    description: "Formación autodidacta en desarrollo web frontend, con un enfoque en tecnologías modernas como HTML, CSS, JavaScript y Tailwind CSS. Complementado con conocimientos en diseño gráfico, lógica de programación y experiencia práctica en la implementación de chatbots. Actualmente, fortaleciendo mis habilidades en inglés técnico y programación avanzada para expandir mis oportunidades profesionales.",
    items: [
        {
            institution: "UNEXPO - Núcleo Charallave",
            degree: "Ingeniería Mecatrónica",
            duration: "2018"
        },
        {
            institution: "Platzi",
            degree: "Curso de Pensamiento Lógico: Algoritmos y Diagramas de Flujo",
            duration: "2024"
        },
        {
            institution: "Platzi",
            degree: "Curso de Pensamiento Lógico: Lenguajes de Programación",
            duration: "2024"
        },
        {
            institution: "Platzi",
            degree: "Curso de Frontend Developer",
            duration: "2024"
        },
        {
            institution: "Platzi",
            degree: "Curso de Introducción al Desarrollo Backend",
            duration: "2024"
        },
        {
            institution: "Platzi",
            degree: "Curso Gratis de Estrategias para Aprender Inglés en Línea",
            duration: "2024"
        },
        {
            institution: "Platzi",
            degree: "Curso Definitivo de HTML y CSS",
            duration: "2024"
        },
        {
            institution: "Platzi",
            degree: "Curso de Fundamentos de Bases de Datos 2019",
            duration: "2024"
        },
        {
            institution: "Platzi",
            degree: "Fundamentos de Ingeniería de Software",
            duration: "2024"
        },
        {
            institution: "Platzi",
            degree: "Curso de Fundamentos de Diseño de Interfaces UX/UI",
            duration: "2024"
        },
        {
            institution: "Platzi",
            degree: "Curso de Pensamiento Lógico: Manejo de Datos, Estructuras y Funciones",
            duration: "2024"
        },
        {
            institution: "Platzi",
            degree: "Curso de Introducción a la Terminal y Línea de Comandos",
            duration: "2024"
        },
    ]
}

const skills = {
    title: "Mis Habilidades",
    description:
    "",
    skillList:[
        {
            icon: <FaHtml5 />,
            name: "html 5",
        },
        {
            icon: <FaCss3 />,
            name: "css 3",
        },
        {
            icon: <FaJs />,
            name: "javascript",
        },
        {
            icon: <FaFigma />,
            name: "figma",
        },
        {
            icon: <SiNextdotjs />,
            name: "next.js",
        },
        {
            icon: <SiTailwindcss />,
            name: "tailwind.css",
        },
    ]
}

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'

import { 
    Tooltip, 
    TooltipContent, 
    TooltipProvider, 
    TooltipTrigger 
} from "@radix-ui/react-tooltip";

import { ScrollArea, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from "@radix-ui/react-scroll-area";
import { animate, delay, motion } from "framer-motion";


const Resume = () => {
    return (
        <motion.div
            initial = {{ opacity: 0}}
            animate = {{
                opacity: 1,
                transition: {delay: 2.4, duration: 0.4, ease: "easeIn"},
            }}
            className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
        >
            <div className="container mx-auto">
                <Tabs 
                defaultValue="experience"
                className="flex flex-col xl:flex-row gap-[60px]"
                >
                    <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
                        <TabsTrigger value="experience">Experiencia</TabsTrigger>
                        <TabsTrigger value="education">Educación</TabsTrigger>
                        <TabsTrigger value="skills">Habilidades</TabsTrigger>
                        <TabsTrigger value="about">Acerca de mí</TabsTrigger>
                    </TabsList>

                    {/* content*/}
                    <div className="min-h-[70vh] w-full">
                        {/* experience */}
                        <TabsContent value="experience" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{experience.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{experience.description}</p>
                                <ScrollArea className="h-[400px] overflow-hidden">
                                    <ScrollAreaViewport className="w-full h-full">
                                        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                                            {experience.items.map((item, index) => (
                                                <li key={index} className="bg-[#1B1F3B] h-[200px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                                                    <span className="text-[#00C6FF]">{item.duration}</span>
                                                    <h3 className="text-xl max-w-[350px] min-h-[60px] text-center lg:text-left">{item.position}</h3>
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-[6px] h-[6px] rounded-full bg-[#00C6FF]"></span>
                                                        <p className="text-white/60">{item.company}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </ScrollAreaViewport>
                                    <ScrollAreaScrollbar orientation="vertical">
                                        <ScrollAreaThumb className="bg-[#00C6FF] rounded-md" />
                                    </ScrollAreaScrollbar>
                                </ScrollArea>
                            </div>
                        </TabsContent>
                        {/* education */}
                        <TabsContent value="education" className="w-full">
                        <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{education.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{education.description}</p>
                                <ScrollArea className="h-[400px] overflow-hidden">
                                    <ScrollAreaViewport className="w-full h-full">
                                        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                                            {education.items.map((item, index) => (
                                                <li key={index} className="bg-[#1B1F3B] h-[200px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                                                    <span className="text-[#00C6FF]">{item.duration}</span>
                                                    <h3 className="text-xl max-w-[350px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-[6px] h-[6px] rounded-full bg-[#00C6FF]"></span>
                                                        <p className="text-white/60">{item.institution}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </ScrollAreaViewport>
                                    <ScrollAreaScrollbar orientation="vertical">
                                        <ScrollAreaThumb className="bg-[#00C6FF] rounded-md" />
                                    </ScrollAreaScrollbar>
                                </ScrollArea>
                        </div>
                        </TabsContent>
                        {/* skills */}
                        <TabsContent value="skills" className="w-full h-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <div>
                                    <h3 className="text-4xl font-bold">{skills.title}</h3>
                                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>
                                </div>
                                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4">
                                    {skills.skillList.map((skill, index) =>{
                                        return <li key={index}>
                                            <TooltipProvider delayDuration={100}>
                                                <Tooltip>
                                                    <TooltipTrigger className="w-full h-[150px] bg-[#1B1F3B] rounded-xl flex justify-center items-center group">
                                                        <div className="text-6xl group-hover:text-[#00C6FF] transition-all duration-300">
                                                            {skill.icon}
                                                        </div>
                                                    </TooltipTrigger>
                                                        <TooltipContent className="capitalize">
                                                            <p>{skill.name}</p>
                                                        </TooltipContent>
                                                    
                                                </Tooltip>
                                            </TooltipProvider>
                                            </li>;
                                    })}
                                </ul>
                            </div>
                        </TabsContent>
                        {/* about */}
                        <TabsContent value="about" className="w-full text-center xl:text-left">
                            <div className="flex flex-col gap-[30px]">
                                <h3 className="text-4xl font-bold">{about.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                                    {about.description}
                                </p>
                                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                                    {about.info.map((item, index) =>{
                                        return (
                                            <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                                                <span className="text-white/60">{item.fieldName}</span>
                                                <span className="text-xl">{item.fieldValue}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </motion.div>
)}

export default Resume;