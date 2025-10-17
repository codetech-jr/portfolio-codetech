"use client";
import Image from "next/image";

const BrowserMockup = ({ imgSrc, altText }) => {
  return (
    <div className="rounded-lg shadow-2xl bg-[#1B1F3B] border border-[#003B8D] overflow-hidden">
      {/* Barra superior del navegador */}
      <div className="flex items-center gap-2 p-3 bg-[#0C0C2C]">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      {/* Contenido (la imagen) */}
      <div className="relative w-full aspect-video">
        <Image 
            src={imgSrc} 
            alt={altText} 
            fill 
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default BrowserMockup;