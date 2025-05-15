import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// components
import Header from '../components/Header';
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import StairTransition from "@/components/StairTransition";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrainsMono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Codetech Junior",
  description: "Desarrollador frontend especializado en diseño web moderno, UI/UX y optimización SEO. Ofrezco servicios de desarrollo web, diseño de interfaces y mejora de rendimiento para sitios rápidos y atractivos. Descubre mis proyectos y contáctame para transformar tus ideas en experiencias digitales.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* 
        Usa template literals (`) para combinar la variable de la fuente 
        con la clase bg-primary. Asegúrate de dejar un espacio entre ellas.
      */}
      <body className={`${jetbrainsMono.variable} text-white leading-loose`}> 
        
      <PageTransition>
      
        <Header />
        
         
          {children}
          <StairTransition/> 
        </PageTransition>
      </body>
    </html>
  );
}