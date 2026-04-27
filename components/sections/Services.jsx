"use client";

import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import ContactForm from "../ContactForm";
import { Badge } from "../ui/badge";

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-white dark:bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" className="mb-4">Soluciones</Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 font-primary tracking-tight">
            Servicios diseñados para <br className="hidden md:block" />
            <span className="text-accent relative">
              <span className="relative z-10">escalar tu negocio</span>
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/30 z-0" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-primary">
            No vendo plantillas genéricas. Desarrollo ecosistemas digitales a medida orientados a resultados medibles.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Landing Page */}
          <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-primary">Landing Page de Ventas</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 font-primary">Diseñada específicamente para convertir tráfico pagado (Ads) en leads calificados o ventas directas. Copywriting persuasivo incluido.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Alta conversión garantizada</li>
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Integración con CRM/WhatsApp</li>
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Carga ultrarrápida</li>
            </ul>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 font-primary font-bold transition-colors">Cotizar Landing</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cotizar Landing Page de Ventas</DialogTitle>
                  <DialogDescription>
                    Déjame tus datos y me pondré en contacto contigo pronto.
                  </DialogDescription>
                </DialogHeader>
                <ContactForm selectedService="Landing Page de Ventas" />
              </DialogContent>
            </Dialog>
          </div>

          {/* Card 2: Sitio Web Corporativo */}
          <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-primary">Sitio Web Corporativo</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 font-primary">Presencia institucional premium. Ideal para empresas que buscan transmitir autoridad, mostrar sus servicios y captar clientes B2B.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Diseño multi-página (Home, Nosotros, Servicios)</li>
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Panel autoadministrable</li>
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Optimización SEO Local</li>
            </ul>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 font-primary font-bold transition-colors">Cotizar Sitio Corporativo</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cotizar Sitio Web Corporativo</DialogTitle>
                  <DialogDescription>
                    Déjame tus datos y me pondré en contacto contigo pronto.
                  </DialogDescription>
                </DialogHeader>
                <ContactForm selectedService="Sitio Web Corporativo" />
              </DialogContent>
            </Dialog>
          </div>

          {/* Card 3: Catálogo Digital */}
          <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-primary">Catálogo Digital / E-commerce</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 font-primary">Vende tus productos online las 24 horas. Pasarelas de pago integradas y panel de gestión de inventario simplificado.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Tienda online completa</li>
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Pagos con tarjeta/PayPal/Transferencia</li>
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Gestión de envíos</li>
            </ul>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 font-primary font-bold transition-colors">Cotizar Tienda</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cotizar Catálogo Digital / E-commerce</DialogTitle>
                  <DialogDescription>
                    Déjame tus datos y me pondré en contacto contigo pronto.
                  </DialogDescription>
                </DialogHeader>
                <ContactForm selectedService="Catálogo Digital" />
              </DialogContent>
            </Dialog>
          </div>

          {/* Card 4: Automatización e IA */}
          <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            {/* Destacado Badge */}
            <div className="absolute top-6 right-6 bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full">
              Tendencia
            </div>
            <div className="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-primary">Chatbots e IA</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 font-primary">Automatiza tu atención al cliente y ventas con asistentes virtuales inteligentes (WhatsApp, Web, IG) que responden 24/7.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Asistentes de WhatsApp</li>
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Integración GPT/Claude</li>
              <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-primary"><span className="text-accent font-bold">✓</span> Agendamiento automático</li>
            </ul>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 font-primary font-bold transition-colors">Cotizar Automatización</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cotizar Chatbots e IA</DialogTitle>
                  <DialogDescription>
                    Déjame tus datos y me pondré en contacto contigo pronto.
                  </DialogDescription>
                </DialogHeader>
                <ContactForm selectedService="Chatbots e IA" />
              </DialogContent>
            </Dialog>
          </div>

        </div>
      </div>
    </section>
  );
}