import "./globals.css";

// components
import Header from '../components/Header';
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import StairTransition from "@/components/StairTransition";

// 1. IMPORTA EL COMPONENTE SCRIPT
import Script from "next/script";

export const metadata = {
  title: "Codetech Junior",
  description: "Desarrollador frontend especializado en diseño web moderno, UI/UX y optimización SEO. Ofrezco servicios de desarrollo web, diseño de interfaces y mejora de rendimiento para sitios rápidos y atractivos. Descubre mis proyectos y contáctame para transformar tus ideas en experiencias digitales.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="leading-loose text-white scroll-smooth"> 
        
        <PageTransition>
          <Header />
          {children}
          <StairTransition /> 
        </PageTransition>

        {/* --- 2. AÑADE EL SCRIPT DEL CHATBOT AQUÍ --- */}
        {/* Está fuera del PageTransition para asegurar que siempre esté presente */}
        <Script id="crisp-chat" strategy="lazyOnload">
          {`
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="2599c411-9a23-43bb-bfab-51cd2a4190ce";
            (function(){
              var d=document;
              var s=d.createElement("script");
              s.src="https://client.crisp.chat/l.js";
              s.async=1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}