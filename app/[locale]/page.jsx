import Hero from "@/components/Hero";
import StatsAnimated from "@/components/StatsAnimated";
import Skills from "@/components/Skills";
import MethodologyTimeline from "@/components/MethodologyTimeline";
import MotionSection from "@/components/MotionSection";

// Sections
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import Services from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQs } from "@/components/sections/FAQs";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-col pb-24 relative overflow-hidden">
      
      {/* 1. Hero & Base Stats */}
      <Hero />
      <MotionSection>
        <StatsAnimated />
      </MotionSection>

      {/* 2. Featured Projects */}
      <MotionSection id="proyectos">
        <FeaturedProjects />
      </MotionSection>

      {/* 3. Pricing & Services (Original) */}
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

    </main>
  );
}
