// components/WhatsAppButton.js
"use client";
import Link from "next/link";
// Inline WhatsApp icon to avoid pulling react-icons

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
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 0 5.373 0 12c0 2.116.553 4.184 1.6 6.024L0 24l6.2-1.6A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.24-6.16-3.48-8.52z" fill="currentColor" opacity="0.15" />
        <path d="M17.6 14.8c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.17.2-.33.22-.62.07-.3-.15-1.27-.47-2.41-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.33.45-.5.15-.17.2-.28.3-.47.1-.2.05-.37-.03-.52-.08-.15-.68-1.64-.93-2.25-.24-.59-.48-.51-.66-.52l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.3 5.08 4.62 2.98 1.32 2.98.88 3.52.82.54-.07 1.78-.72 2.03-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="currentColor" />
      </svg>
    </Link>
  );
};

export default WhatsAppButton;