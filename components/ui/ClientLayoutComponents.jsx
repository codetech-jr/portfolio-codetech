"use client";

// ─── ClientLayoutComponents.jsx ───────────────────────────────────────────
// Client boundary para los componentes del layout raíz que requieren ssr:false.
// Next.js 15 App Router no permite ssr:false en Server Components (layout.jsx).
//
// Al colocarlos aquí, Framer Motion + los loops RAF del CustomCursor quedan
// completamente fuera del critical-path del servidor, reduciendo el TBT en mobile.

import dynamic from "next/dynamic";

export const PageTransition = dynamic(
  () => import("@/components/PageTransition"),
  { ssr: false }
);

export const StairTransition = dynamic(
  () => import("@/components/StairTransition"),
  { ssr: false }
);

export const CustomCursor = dynamic(
  () => import("@/components/CustomCursor"),
  { ssr: false }
);

export const WhatsAppButton = dynamic(
  () => import("@/components/WhatsAppButton"),
  { ssr: false }
);
