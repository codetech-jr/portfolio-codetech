"use client";

import dynamic from "next/dynamic";
import MotionSection from "./MotionSection";

// Secciones dinámicas cargadas puramente en el cliente (SSR: false)
// Esto reduce drásticamente el TBT y el tamaño inicial del DOM.
const FeaturedProjects = dynamic(() => import("./sections/FeaturedProjects").then(mod => mod.FeaturedProjects), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-slate-100 dark:bg-white/5 rounded-3xl" />
});

const Services = dynamic(() => import("./sections/Services"), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-slate-100 dark:bg-white/5 rounded-3xl" />
});

const MethodologyTimeline = dynamic(() => import("./MethodologyTimeline"), { 
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-slate-100 dark:bg-white/5 rounded-3xl" />
});

const Testimonials = dynamic(() => import("./sections/Testimonials").then(mod => mod.Testimonials), { 
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-slate-100 dark:bg-white/5 rounded-3xl" />
});

const FAQs = dynamic(() => import("./sections/FAQs").then(mod => mod.FAQs), { 
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-slate-100 dark:bg-white/5 rounded-3xl" />
});

const Contact = dynamic(() => import("./sections/Contact").then(mod => mod.Contact), { 
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-slate-100 dark:bg-white/5 rounded-3xl" />
});

export default function HomeSections() {
  return (
    <>
      {/* 2. Featured Projects */}
      <MotionSection id="proyectos">
        <FeaturedProjects />
      </MotionSection>

      {/* 3. Pricing & Services */}
      <MotionSection id="servicios">
        <Services />
      </MotionSection>

      {/* 5. Methodology */}
      <MotionSection id="metodologia">
        <MethodologyTimeline />
      </MotionSection>

      {/* 6. Testimonials */}
      <MotionSection id="testimonios">
        <Testimonials />
      </MotionSection>

      {/* 7. FAQs */}
      <MotionSection id="faqs">
        <FAQs />
      </MotionSection>

      {/* 8. Contact */}
      <MotionSection id="contacto">
        <Contact />
      </MotionSection>
    </>
  );
}
