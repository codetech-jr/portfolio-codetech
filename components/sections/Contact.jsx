"use client"

import React from 'react';
import Motion from '../ui/Motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import ContactForm from "../ContactForm";
import { MessageCircle, Mail } from 'lucide-react';

const WHATSAPP_NUMBER = "584129725334";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function Contact() {
  return (
    <section className="py-24 relative z-10" id="contacto">
      <div className="container max-w-5xl mx-auto px-4">
        <Motion as="div"
          className="bg-gradient-to-br from-[#1B1F3B] to-primary border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden group shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-700"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
          
          <Motion as="h2"
            className="text-4xl md:text-6xl font-bold font-primary text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ¿Listo para dejar de <br />
            <span className="text-accent">perder clientes?</span>
          </Motion>

          <Motion as="p"
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-primary leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Tu competencia ya está usando tecnología para vender más. No te quedes atrás. Agenda una sesión estratégica gratuita hoy mismo.
          </Motion>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Motion as="a"
              href={WHATSAPP_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold text-[#0C0C2C] bg-accent rounded-2xl transition-all shadow-[0_0_20px_rgba(0,198,255,0.4)] group"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 40px rgba(0, 198, 255, 0.6)" 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-6 h-6 fill-current" />
              <span>Hablar por WhatsApp</span>
            </Motion>

            <Dialog>
              <DialogTrigger asChild>
                <Motion 
                  as="div" 
                  className="w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold text-white border-white/20 hover:bg-white/10 rounded-2xl transition-all h-auto"
                  >
                    <Mail className="w-6 h-6" />
                    <span>Enviar Formulario</span>
                  </Button>
                </Motion>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg bg-[#0c0c1d] border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Cuéntame tu proyecto</DialogTitle>
                  <DialogDescription className="text-white/60">
                    Completa el formulario y me pondré en contacto contigo en menos de 24 horas.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <ContactForm />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-white/40 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              Disponibilidad inmediata
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              Respuesta en 24h
            </div>
          </div>
        </Motion>
      </div>
    </section>
  );
}