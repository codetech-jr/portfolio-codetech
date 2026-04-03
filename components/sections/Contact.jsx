"use client"

import React from 'react';
// Inline WhatsApp icon to avoid react-icons bundle
import Motion from '../ui/Motion';
import { useTranslations } from 'next-intl';

const WHATSAPP_NUMBER = "584129725334";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section className="py-24 relative z-10" id="contacto">
      <div className="container max-w-5xl mx-auto px-4">
        <Motion as="div"
          className="bg-gradient-to-br from-[#1B1F3B]/80 to-primary/80 border border-white/10 backdrop-blur-xl rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden group shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
          
          <Motion as="h2"
            className="text-4xl md:text-5xl font-bold font-display text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t("title")}
          </Motion>

          <Motion as="p"
            className="text-lg text-white/70 max-w-2xl mx-auto mb-10 font-primary leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("subtitle")}
          </Motion>

          <Motion as="a"
            href={WHATSAPP_URL}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-[#0C0C2C] bg-accent rounded-full transition-all shadow-[0_0_20px_rgba(0,198,255,0.4)]"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 8px 30px rgba(0, 198, 255, 0.6)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6 text-2xl" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 0 5.373 0 12c0 2.116.553 4.184 1.6 6.024L0 24l6.2-1.6A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.24-6.16-3.48-8.52z" fill="currentColor" opacity="0.15" />
              <path d="M17.6 14.8c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.17.2-.33.22-.62.07-.3-.15-1.27-.47-2.41-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.33.45-.5.15-.17.2-.28.3-.47.1-.2.05-.37-.03-.52-.08-.15-.68-1.64-.93-2.25-.24-.59-.48-.51-.66-.52l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.3 5.08 4.62 2.98 1.32 2.98.88 3.52.82.54-.07 1.78-.72 2.03-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="currentColor" />
            </svg>
            <span>{t("cta")}</span>
          </Motion>
        </Motion>
      </div>
    </section>
  );
}