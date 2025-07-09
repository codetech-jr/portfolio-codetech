"use client"

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

// El número debe estar en formato internacional sin el "+" ni espacios.
const WHATSAPP_NUMBER = "584129725334";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// Las variantes de animación para la tarjeta y sus hijos no cambian.
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ContactModule() {
  return (
    <section className={styles.contactSection}>
      <motion.div
        className={styles.contactCard}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 className={styles.title} variants={itemVariants}>
          ¡Trabajemos Juntos!
        </motion.h2>

        <motion.p className={styles.description} variants={itemVariants}>
          ¿Tienes una idea o un proyecto en mente? Estoy listo para escucharte y ayudarte a convertir esa visión en una realidad digital. ¡Envíame un mensaje y empecemos a construir algo increíble!
        </motion.p>

        <motion.a
          href={WHATSAPP_URL}
          className={styles.whatsappButton}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          // Ajustamos la animación para que coincida con tu nuevo diseño
          whileHover={{ 
            scale: 1.03, 
            y: -4, 
            boxShadow: "0 8px 25px rgba(0, 198, 255, 0.35)" 
          }}
          whileTap={{ scale: 0.98, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <FaWhatsapp className={styles.buttonIcon} />
          <span>Contactar por WhatsApp</span>
        </motion.a>
      </motion.div>
    </section>
  );
}