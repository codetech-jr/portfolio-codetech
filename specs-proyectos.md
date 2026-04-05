# 📌 Specs: Nueva Sección de Proyectos (Portfolio 2.0)

## 🎯 Objetivo General

Transformar la sección de "Proyectos" de un catálogo genérico (mockups repetitivos) a un **Portafolio Freelance Premium** que priorice el impacto visual de las interfaces web usando las mejores tendencias UI/UX actuales. Tema principal: **Dark Mode Minimalista**.

---

## 🛠️ Reglas de Diseño UI (Tendencias 2024/2025)

### 1. "Bento Grid" (Cuadrícula Asimétrica)

- **Eliminar cuadrícula tradicional de 3 columnas iguales.**
- **Sistema:** CSS Grid moderno (`grid-template-columns`).
- **Comportamiento Desktop:**
  - Los 2 mejores proyectos deben ser "Hero Cards" (Ocupan 2 columnas de ancho o doble alto).
  - Los proyectos secundarios ocupan 1 columna.
- **Comportamiento Mobile:** Pasa de 1 a 2 columnas de forma natural (`flex-col` o `grid-cols-1`).

### 2. Capturas "Desnudas" + Glassmorphism

- **Cero dispositivos:** PROHIBIDO usar imágenes de iMacs, MacBooks o iPhones físicos.
- **Imágenes:** Capturas planas de las webs mostrando el diseño 100%.
- **Bordes Modernos:**
  - Radio del contenedor de imagen: `border-radius: 12px` (aprox `rounded-xl`).
- **Efecto Contenedor (Card):**
  - Fondo ligeramente translúcido sobre el dark mode (ej. fondo rgba grisaceo muy sutil).
  - **Glass Border:** `border: 1px solid rgba(255, 255, 255, 0.08)` para simular un borde de cristal súper fino.

### 3. Tipografía con Gran Peso y Contraste

- **Fuente principal:** Familia "Sans-serif" geométrica o neogrotesca (Inter, Plus Jakarta Sans, Roobert).
- **Títulos (H3):** Textos fuertes, cortos (`font-weight: 600/700`, color blanco/vibrante).
- **Descripciones:** Cortas (máximo 2 líneas), enfocadas al **resultado de negocio**, no al código (ej. texto secundario opacidad 70%).
- **Tags de Tecnologías:** Limpios, pequeños, estilo píldora (`border-radius: 99px`), usando opacidades mínimas para que no compitan con el título.

### 4. Micro-Interacciones de "Hover" Fluidas

- **Escala de Imagen:** Al hacer hover sobre el contenedor, la imagen debe escalar sutilmente.
  - Transformación: `scale(1.03)` o `scale(1.05)`.
  - Transición suave: `transition: all 0.4s ease-in-out;`.
- **Revelar Acciones:** El botón/icono para ver el proyecto "Live Demo / GitHub" solo gana contraste al hacer hover o aparece sutilmente. No usar overlays oscuros que tapen la imagen.
- **Física sutil (Opcional):** Un pequeño incremento de brillo (`brightness-110`) o levitación en el _box-shadow_.
