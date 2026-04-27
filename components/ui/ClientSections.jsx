"use client";

// ─── ClientSections.jsx ────────────────────────────────────────────────────
// Este archivo es un Client Component que contiene los dynamic imports con
// ssr:false. Next.js App Router solo permite ssr:false dentro de un
// "use client" boundary — los Server Components no lo soportan.
//
// Cada sección below-the-fold se importa aquí de forma lazy para que su
// bundle de JavaScript NO bloquee el Main Thread durante el primer render.

import dynamic from "next/dynamic";

function SectionSkeleton() {
  return (
    <div
      className="w-full py-24 flex items-center justify-center bg-white dark:bg-primary"
      aria-hidden="true"
    >
      <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
    </div>
  );
}

export const Hero = dynamic(
  () => import("@/components/Hero"),
  { ssr: false }
);

export const ProblemSection = dynamic(
  () => import("@/components/sections/ProblemSection"),
  { ssr: false }
);

export const FeaturedProjects = dynamic(
  () => import("@/components/sections/FeaturedProjects"),
  { ssr: false }
);

export const Services = dynamic(
  () => import("@/components/sections/Services"),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

export const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then(m => m.Testimonials || m.default),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

export const FAQs = dynamic(
  () => import("@/components/sections/FAQs").then(m => m.FAQs || m.default),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

export const Contact = dynamic(
  () => import("@/components/sections/Contact").then(m => m.Contact || m.default),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

export const MethodologyTimeline = dynamic(
  () => import("@/components/MethodologyTimeline"),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

export const Skills = dynamic(
  () => import("@/components/Skills"),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
