"use client";

import { useState, useEffect } from 'react';
import { FaList, FaChevronDown, FaChevronRight } from 'react-icons/fa';

export default function TableOfContents({ content, className = "" }) {
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  // Extraer headings del contenido
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const articleHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const headingData = Array.from(articleHeadings).map((heading, index) => {
        const id = heading.id || `heading-${index}`;
        heading.id = id; // Asegurar que tenga ID
        return {
          id,
          text: heading.textContent,
          level: parseInt(heading.tagName.charAt(1)),
          element: heading
        };
      });
      setHeadings(headingData);
    }
  }, [content]);

  // Observar el scroll para resaltar el heading activo
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0
      }
    );

    headings.forEach((heading) => {
      if (heading.element) {
        observer.observe(heading.element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const getHeadingStyle = (level) => {
    const baseStyle = "block py-1 px-2 rounded-lg transition-colors cursor-pointer text-sm";
    const activeStyle = "bg-[#00C6FF] text-[#0C0C2C] font-semibold";
    const inactiveStyle = "text-[#FFF] hover:text-white hover:bg-[#0C0C2C]";
    
    const paddingLeft = `${(level - 1) * 12}px`;
    
    return `${baseStyle} ${inactiveStyle}`;
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={`bg-[#1B1F3B] rounded-lg border border-[#003B8D] ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-[#003B8D]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaList className="text-[#00C6FF] w-4 h-4" />
            <h3 className="text-lg font-semibold text-[#00C6FF]">
              Tabla de Contenidos
            </h3>
            <span className="px-2 py-1 bg-[#0C0C2C] text-[#A3A8CC] text-xs rounded-full">
              {headings.length}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#A3A8CC] hover:text-[#00C6FF] transition-colors"
          >
            {isExpanded ? <FaChevronDown className="w-4 h-4" /> : <FaChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Contenido */}
      {isExpanded && (
        <div className="p-4 max-h-96 overflow-y-auto">
          <nav className="space-y-1">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`w-full text-left ${getHeadingStyle(heading.level)} ${
                  activeHeading === heading.id ? 'bg-[#00C6FF] text-[#0C0C2C] font-semibold' : ''
                }`}
                style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
} 