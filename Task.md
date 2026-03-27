# Rediseño de Portafolio Freelancer (codetechjr.com)

**Objetivo:** Modernizar el portafolio siguiendo tendencias actuales de diseño web y UX/UI, mejorar la arquitectura de contenido e integrar nuevas capacidades (chatbots, React Native).

**Repositorio:** [https://github.com/codetech-jr/portfolio-codetech](https://github.com/codetech-jr/portfolio-codetech)
**Rama de trabajo:** `redesign-2026` (crear desde `main`)

---

## 📦 Fase 1 – Dependencias y configuración base

- [ ] 1.1 Instalar dependencias nuevas
  ```bash
  npm install framer-motion react-simple-typewriter react-countup next-themes react-intersection-observer
  npm install -D @types/react-intersection-observer # si usas TypeScript (opcional)
  ```
- [ ] 1.2 Instalar dependencias para Three.js (opcional, pero recomendado para el fondo de partículas)
  ```bash
  npm install three @react-three/fiber @react-three/drei
  ```
- [ ] 1.3 Configurar `next-themes`
  - Crear `app/providers.jsx` con `ThemeProvider`.
  - Envolver `layout.js` con `Providers`.
- [ ] 1.4 Configurar tipografía audaz
  - Elegir fuente display (ej. Fraunces de Google Fonts).
  - Importar en `app/layout.js` y extender `tailwind.config.js` en `theme.fontFamily`.
- [ ] 1.5 Añadir gradientes y textura grain
  - Crear clase `.grain` en `app/globals.css` (fondo con ruido).
  - Aplicar al `body` o a un contenedor principal.

## 🎨 Fase 2 – Componentes base y estructura visual

- [ ] 2.1 Crear componente `MotionSection` (`components/MotionSection.jsx`)
  - Usa `framer-motion` y `useInView` para animaciones al scroll.
- [ ] 2.2 Crear componente `ThemeToggle` (`components/ThemeToggle.jsx`)
  - Botón con icono sol/luna usando `useTheme` de `next-themes`.
- [ ] 2.3 Crear componente `Skills` (`components/Skills.jsx`)
  - Muestra un grid de íconos con tecnologías (React, Next.js, Tailwind, TypeScript, Node, Express, Supabase, React Native, WhatsApp API).
- [ ] 2.4 Crear componente `StatsAnimated` (`components/StatsAnimated.jsx`)
  - Reemplazar las estadísticas actuales por `CountUp` con `useInView`.
- [ ] 2.5 Crear componente `Hero` (`components/Hero.jsx`)
  - Incorporar `typewriter` (`react-simple-typewriter`).
  - Añadir gradiente de fondo y textura grain.
  - Incluir foto real (usar `next/image`).
  - CTAs: “Ver proyectos” (scroll a `#proyectos`) y “Contáctame” (scroll a `#contacto`).
- [ ] 2.6 Crear componente `MethodologyTimeline` (`components/MethodologyTimeline.jsx`)
  - Versión visual de los 8 pasos (tarjetas con íconos, texto breve).
  - Opcional: usar `motion` para animar al scroll.
- [ ] 2.7 Crear componente `CustomCursor` (`components/CustomCursor.jsx`)
  - Solo para escritorio, sigue al ratón con `useEffect`.
  - Deshabilitar si `prefers-reduced-motion` está activado.

## 📄 Fase 3 – Página principal (`app/page.js`) reorganizada

- [ ] 3.1 Reordenar las secciones en `app/page.js` en este orden:
  1. `<Hero />`
  2. `<FeaturedProjects />` (sección de proyectos destacados, con botón “Ver todos los proyectos” que enlace a `/proyectos`)
  3. `<ServicesCompact />` (nuevo componente con 4 servicios: Sitios web, E‑commerce, Chatbots, Apps móviles)
  4. `<Skills />`
  5. `<MethodologyTimeline />`
  6. `<Testimonials />` (carrusel o grid)
  7. `<Contact />` + `<FAQ />` (pueden estar en un solo componente)
- [ ] 3.2 Envolver cada sección con `<MotionSection />` para animación al scroll.
- [ ] 3.3 Añadir enlaces de anclaje suave (`scroll-behavior: smooth` en CSS).

## 🗂️ Fase 4 – Estructura de datos de proyectos y página de proyectos

### 4.1 Crear archivo de datos centralizado

Crea `data/projects.js` (o `data/projects.json`) con la lista de todos los proyectos.

- **Fuente:** Extrae la información de `descarga.png` y complétala.
- **Estructura sugerida por proyecto:**
  ```javascript
  {
    id: 1,
    title: "Catálogo Digital para Repuestos Temuco",
    category: "E-commerce",
    tags: ["Frontend", "UX/UI"],
    description: "Descripción breve del proyecto.",
    fullDescription: "Descripción extendida para la página de detalle (si aplica).",
    image: "/images/proyecto1.jpg",
    techStack: ["React", "Node.js", "TailwindCSS"],
    liveUrl: "https://ejemplo.com",
    repoUrl: "https://github.com/...",
    featured: true,
    isDemo: false,
  }
  ```

### 4.2 Crear página de proyectos (`app/proyectos/page.js`)

- [ ] Crear la página como Client Component (usa `'use client'` para los filtros).
- [ ] Importar los proyectos desde `data/projects.js`.
- [ ] Implementar filtros por categoría (“Web”, “E‑commerce”, “Chatbot”, “App móvil” y “Todos”).
- [ ] Mostrar los proyectos en un grid responsivo (2 columnas en móvil, 3 en escritorio).
- [ ] Cada tarjeta debe incluir: imagen optimizada, badge de categoría, título, descripción breve, tech stack (íconos) y enlaces a demo/repo.
- [ ] Añadir botón de “Volver al inicio”.

### 4.3 Actualizar componente de proyectos destacados en la home

- [ ] Crear/modificar `components/FeaturedProjects.jsx`.
- [ ] Filtrar y mostrar solo los proyectos con `featured: true` (recomiendo 3 o 4).
- [ ] Asegurar que el botón “Ver todos los proyectos” enlace a `/proyectos`.

### 4.4 (Opcional) Página de detalle de proyecto

- [ ] Crear `app/proyectos/[id]/page.js` para mostrar la información extendida.

### 4.5 Incluir proyectos de chatbot y React Native

- [ ] Si aún no tienes casos reales, crea proyectos demo (con `isDemo: true`) en `data/projects.js` para exhibir tus nuevas capacidades de automatización y desarrollo móvil.

## ⚡ Fase 5 – Microinteracciones y efectos avanzados

- [ ] 5.1 Añadir `whileHover` en tarjetas de proyectos (scale y sombra) con `motion`.
- [ ] 5.2 Implementar transiciones de página suaves (`AnimatePresence` + `motion.div` en `layout.js` usando `usePathname`).
- [ ] 5.3 (Opcional) Integrar fondo de partículas Three.js en el hero:
  - Crear `components/ParticleBackground.jsx` con `<Canvas>` y partículas que reaccionen al mouse.
  - Colocar como capa absoluta detrás del contenido del hero.
- [ ] 5.4 Activar cursor personalizado solo en escritorio (useEffect con detección de pointer: fine).

## ✨ Fase 6 – Detalles de profesionalismo y confianza

- [ ] 6.1 Agregar foto real en hero (ya incluida en Fase 2.5).
- [ ] 6.2 Asegurar enlaces a redes sociales activas en footer o sección de contacto (GitHub, LinkedIn, Twitter/X).
- [ ] 6.3 (Si aplica) Crear sección de “Reconocimientos” con logos o citas destacadas.
- [ ] 6.4 Revisar métricas de impacto: si tienes datos reales, reemplazar stats genéricas por métricas de resultado (ej. “+35% conversión para X”).
- [ ] 6.5 Añadir badge de Lighthouse 100 en footer (opcional, tras optimizar).

## 🔧 Fase 7 – Optimización y ajustes finales

- [ ] 7.1 Ejecutar `next build` y corregir errores/advertencias.
- [ ] 7.2 Verificar Lighthouse en producción (rendimiento, accesibilidad, SEO, buenas prácticas) → apuntar a 100 en todas.
- [ ] 7.3 Probar modo oscuro en todos los componentes.
- [ ] 7.4 Probar en móvil: menú, cursor personalizado (debe estar desactivado), responsive.
- [ ] 7.5 Revisar accesibilidad: `prefers-reduced-motion` en animaciones, etiquetas ARIA, contraste de colores.

---

📝 **Notas adicionales:**

- **Chatbots y React Native:** Asegúrate de incluir al menos un proyecto ficticio o real que muestre estas capacidades en la sección de servicios y en la página de proyectos.
- **SEO:** Actualiza `app/layout.js` con metadatos que reflejen las nuevas palabras clave (chatbots, React Native, etc.).

¡Comienza por la Fase 1 y marca cada tarea como completada! Si encuentras un error o necesitas ayuda con algún paso, consulta con el desarrollador principal.
