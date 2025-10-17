// components/WhatsAppButton.js
"use client";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa"; // Usaremos react-icons

const WhatsAppButton = () => {
  // Reemplaza este número con el tuyo, incluyendo el código de país sin el '+'
  const phoneNumber = "584129725334"; 
  const message = "Hola, vi tu portafolio y estoy interesado en tus servicios.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link 
      href={whatsappUrl} 
      target="_blank"
      className="fixed bottom-6 left-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={32} />
    </Link>
  );
};

export default WhatsAppButton;