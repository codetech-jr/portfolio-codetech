"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"; // Asegúrate que la ruta sea correcta

// Íconos inline (reemplazo de react-icons/fa)
function IconPhone({ className = '' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.83.37 1.64.73 2.39a2 2 0 0 1-.45 2.11L8.91 9.91a16 16 0 0 0 6 6l1.69-1.69a2 2 0 0 1 2.11-.45c.75.36 1.56.61 2.39.73A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
        </svg>
    );
}

function IconEnvelope({ className = '' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
            <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="0" fill="currentColor" />
        </svg>
    );
}

function IconMapMarker({ className = '' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
            <circle cx="12" cy="9" r="2.5" fill="#0C0C2C" />
        </svg>
    );
}

const info = [
    {
        icon: <IconPhone className="w-6 h-6" />,
        title: 'Teléfono',
        description: '(+58) 412-972-5334'
    },
    {
        icon: <IconEnvelope className="w-6 h-6" />,
        title: 'Email',
        description: 'codetechjunior2000@gmail.com'
    },
    {
        icon: <IconMapMarker className="w-6 h-6" />,
        title: 'Dirección',
        description: 'Miranda, Venezuela'
    }
]

import Motion from "@/components/ui/Motion";

const Contact = () => {
    return (
        <Motion as="section"
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 2.4, duration: 0.4, ease: "easeIn" }
            }}
            className="py-6"
            >
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row gap-[30px]">
                    {/* form */}
                    <div className="xl:w-[54%] order-2 xl:order-none"> 
                        <form className="flex flex-col gap-6 p-10 bg-slate-100 dark:bg-[#1B1F3B] rounded-xl border border-slate-200 dark:border-white/5"
                            action="https://formsubmit.co/codetechjunior2000@gmail.com"
                            method="POST"
                        >
                            <h3 className="text-4xl text-accent">¡Trabajemos juntos!</h3>
                            <p className="text-slate-600 dark:text-white/60">¿Quieres llevar tus ideas al siguiente nivel? Contáctame y construyamos algo increíble juntos.🚀</p>
                            {/* input */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input type="text" placeholder="Nombre" required/> {/* type="firstname" no es un tipo HTML estándar, usar "text" */}
                                <Input type="text" placeholder="Apellido" required/> {/* type="lastname" no es un tipo HTML estándar, usar "text" */}
                                <Input type="email" placeholder="Correo Electrónico" required/>
                                <Input type="tel" placeholder="Número Teléfonico" required/> {/* type="phone" no es un tipo HTML estándar, usar "tel" */}
                            </div>
                            {/* Select */}
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccione un servicio" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Selecciona un servicio</SelectLabel>
                                        <SelectItem value="desarrollo-web">Desarrollo web</SelectItem>
                                        <SelectItem value="diseno-ux-ui">Diseño UX/UI</SelectItem>
                                        <SelectItem value="seo">SEO</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {/* Textarea */}
                            <Textarea 
                                className="h-[200px]"
                                placeholder="Escribe tu mensaje aquí."
                            />
                            {/* Hidden fields for security */}
                            <Input type="hidden" name="_subject" value="Nuevo mensaje desde tu formulario" />
                            <Input type="hidden" name="_captcha" value="false" />
                            <Input type="hidden" name="_autoresponse" value="Gracias por tu mensaje. Te responderemos pronto." />
                            {/* Button */}
                            <Button type="submit" size="md" className="max-w-50 flex items-center gap-2 border-2 border-[#00C6FF] text-[#0C0C2C] hover:bg-[#00C6FF] hover:text-[#0C0C2C] transition-transform duration-300 ease-in-out px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 hover:animate-pulse">
                                Envíame un mensaje
                            </Button>
                        </form>
                    </div>
                    {/* info */}
                    <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
                        {/* Ejemplo de cómo podrías mostrar la info */}
                        <ul className="flex flex-col gap-6">
                            {info.map((item, index) => {
                                return (
                                    <li key={index} className="flex items-center gap-4 text-slate-900 dark:text-white">
                                        <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-slate-200 dark:bg-[#1B1F3B] text-accent rounded-md flex items-center justify-center">
                                            <div className="text-[28px]">{item.icon}</div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-slate-600 dark:text-white/60">{item.title}</p>
                                            <h3 className="text-xl font-medium">{item.description}</h3>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </Motion>
    )
}

export default Contact;