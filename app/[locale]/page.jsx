import { Suspense } from "react";
import MotionSection from "@/components/MotionSection";
import {
  Hero,
  ProblemSection,
  FeaturedProjects,
  Services,
  Testimonials,
  FAQs,
  Contact,
  MethodologyTimeline,
  Skills,
} from "@/components/ui/ClientSections";

// Minimal skeleton — prevents CLS while section JS loads, matches section heights
function SectionSkeleton() {
  return (
    <div
      className="w-full py-24 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
    </div>
  );
}

import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="flex flex-col pb-24 relative overflow-hidden">

      {/* 1. Hero & Problem Section — synchronous, above the fold */}
      <Hero />
      <MotionSection>
        <ProblemSection />
      </MotionSection>

      {/* 2. Featured Projects — synchronous, first visible section */}
      <section id="proyectos">
        <FeaturedProjects />
      </section>

      {/* 3–8. Below-the-fold — each wrapped in Suspense for streaming */}
      <Suspense fallback={<SectionSkeleton />}>
        <MotionSection id="servicios">
          <Services />
        </MotionSection>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <MotionSection id="metodologia">
          <MethodologyTimeline />
        </MotionSection>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <MotionSection id="testimonios">
          <Testimonials />
        </MotionSection>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <MotionSection id="faqs">
          <FAQs />
        </MotionSection>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <MotionSection id="contacto">
          <Contact />
        </MotionSection>
      </Suspense>

    </main>
  );
}

