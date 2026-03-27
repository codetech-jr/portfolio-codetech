"use client"

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const WHATSAPP_NUMBER = "584129725334";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section className="py-24 relative z-10" id="contacto">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          className="bg-gradient-to-br from-[#1B1F3B]/80 to-primary/80 border border-white/10 backdrop-blur-xl rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden group shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold font-display text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t("title")}
          </motion.h2>

          <motion.p 
            className="text-lg text-white/70 max-w-2xl mx-auto mb-10 font-primary leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.a
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
            <FaWhatsapp className="text-2xl" />
            <span>{t("cta")}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}