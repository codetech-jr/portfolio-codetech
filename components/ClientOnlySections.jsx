"use client";

/**
 * ClientOnlySections.jsx
 *
 * Client Component boundary que permite usar dynamic() con ssr:false
 * desde dentro de un Server Component (page.jsx).
 *
 * Next.js no permite ssr:false directamente en Server Components —
 * este archivo actúa como el puente correcto.
 */

import dynamic from "next/dynamic";

// react-countup usa window internamente → ssr:false es obligatorio
export const StatsAnimated = dynamic(
  () => import("@/components/StatsAnimated"),
  { ssr: false }
);
