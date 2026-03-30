import Hero from "@/components/Hero";
import StatsAnimated from "@/components/StatsAnimated";
import dynamic from "next/dynamic";
import MotionSection from "@/components/MotionSection";

// Dynamic Sections for performance
const FeaturedProjects = dynamic(() => import("@/components/sections/FeaturedProjects").then(mod => mod.FeaturedProjects), { ssr: true });
const Services = dynamic(() => import("@/components/sections/Services"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials), { ssr: true });
const FAQs = dynamic(() => import("@/components/sections/FAQs").then(mod => mod.FAQs), { ssr: true });
const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => mod.Contact), { ssr: true });
const MethodologyTimeline = dynamic(() => import("@/components/MethodologyTimeline"), { ssr: true });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: true });

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
