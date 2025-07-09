import "./globals.css";

// components
import Header from '../components/Header';
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import StairTransition from "@/components/StairTransition";

export const metadata = {
  title: "Codetech Junior",
  description: "Desarrollador frontend especializado en diseño web moderno, UI/UX y optimización SEO. Ofrezco servicios de desarrollo web, diseño de interfaces y mejora de rendimiento para sitios rápidos y atractivos. Descubre mis proyectos y contáctame para transformar tus ideas en experiencias digitales.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="text-white leading-loose"> 
        
      <PageTransition>
      
        <Header />
        
         
          {children}
          <StairTransition/> 
        </PageTransition>
      </body>
    </html>
  );
}