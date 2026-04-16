"use client";

// ─── ClientLayoutComponents.jsx ───────────────────────────────────────────
// Client boundary para los componentes del layout raíz que requieren ssr:false.
// Next.js 15 App Router no permite ssr:false en Server Components (layout.jsx).
//
// Al colocarlos aquí, Framer Motion + los loops RAF del CustomCursor quedan
// completamente fuera del critical-path del servidor, reduciendo el TBT en mobile.

import dynamic from "next/dynamic";
import PageTransitionComponent from "@/components/PageTransition";
import StairTransitionComponent from "@/components/StairTransition";

export const PageTransition = PageTransitionComponent;
export const StairTransition = StairTransitionComponent;

export const CustomCursor = dynamic(
  () => import("@/components/CustomCursor"),
  { ssr: false }
);

export const WhatsAppButton = dynamic(
  () => import("@/components/WhatsAppButton"),
  { ssr: false }
);
