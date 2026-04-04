# ESPECIFICACIONES CRO PARA REDISEÑO: PORTADA CODETECHJR (Next.js)

## 1. OBJETIVO DEL REFACTOR

Transformar la cabecera actual (perfil tipo currículum/portafolio) en un embudo de conversión de nivel "Socio Tecnológico / Estudio Digital".

## 2. ELEMENTOS A ELIMINAR OBLIGATORIAMENTE (DEPRECATED)

- Saludo personal: "Hola, soy Junior Daniel"
- El componente `TypewriterEffect` (con frases "Software Engineer", "UX/UI Designer", "Automation Expert")
- Título principal genérico: "Consultor de Soluciones Digitales"
- Ocultamiento de la prueba social (no obligar al usuario a hacer scroll para ver proyectos).

## 3. SEO Y METADATOS ACTUALIZADOS (Metadata API Next.js)

- **Title:** Estudio de Desarrollo Web & IA | Aumentamos tus Ventas | CodeTechJr
- **Description:** No hacemos "páginas bonitas". Construimos sistemas comerciales: Webs veloces, apps y chatbots IA orientados a conversiones para negocios en LATAM y EEUU. Trato 1 a 1.
- **Keywords SEO:** desarrollo web premium, páginas web de conversión, chatbots IA para empresas, agencia desarrollo nextjs, CRO.

## 4. ESTRUCTURA UI VISUAL DEL HERO (Above the Fold)

El diseño debe seguir teniendo el aspecto "dark theme moderno", usando Tailwind CSS, pero aplicando esta estricta jerarquía de contenido y textos:

### [A] Badge / Subtítulo

- **UI:** Texto pequeño (ej. text-sm), letra espaciada, preferiblemente con color de acento o degradado sutil (accent color).
- **Texto:** `Consultoría en Desarrollo Web, CRO & Inteligencia Artificial`

### [B] Título Principal (H1)

- **UI:** Grande (ej. text-5xl md:text-6xl), bold, alto contraste (blanco). Debe dominar la pantalla.
- **Texto:** `Tú enfócate en tu negocio, yo construyo la tecnología que te trae clientes.`

### [C] Subtítulo / Párrafo Explicativo

- **UI:** Color gris claro (ej. text-gray-300 o text-slate-400), tamaño legible (text-lg o text-xl), no más de 3 líneas. Max-w-2xl para lectura óptima.
- **Texto:** `Diseño e integro sistemas comerciales rápidos (Next.js) y Chatbots IA que trabajan y cierran ventas por ti 24/7. Calidad corporativa con el trato ágil de un desarrollador experto independiente.`

### [D] Grupo de Call To Action (CTAs) - IMPORTANTÍSIMO

Deben estar inmediatamente debajo del párrafo. Fáciles de tocar en móvil. Flexbox/Grid.

- **Primary CTA:** Fondo color llamativo/principal.
  - Texto: `🟢 Agenda tu Consulta Gratis`
  - Comportamiento: Link/scroll suave hacia la sección de contacto o WhatsApp (Calendly o mail).
- **Secondary CTA:** Variante 'Outline' o 'Ghost'.
  - Texto: `Ver casos de éxito →`
  - Comportamiento: Ancla (anchor) que baje directo a la sección de portafolio de la misma página.

###[E] Micro-Proof y Social Proof (Validación debajo de botones)
Esta sección debe ir justo debajo del grupo de CTAs en fuente muy pequeña (text-xs o text-sm).

- **Bloque de métricas (layout en línea o flex-wrap):**
  - `✓ +23 proyectos desplegados`
  - `✓ Google Lighthouse 90+`
  - `✓ Contacto técnico 1 a 1`
- **Mini-Testimonio:**
  - Letras itálicas, con 5 iconos de estrellas sólidas de SVG.
  - Texto: `⭐⭐⭐⭐⭐ "Mi web ahora genera 3x más consultas" — Guido G.`

## NOTA TÉCNICA

El padding vertical debe garantizar que, en escritorio y móviles promedio (altura 800px+), el _Mini-Testimonio [E]_ quede a la vista (Above the fold) SIN TENER QUE HACER SCROLL.
