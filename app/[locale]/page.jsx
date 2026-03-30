import Hero from "@/components/Hero";
import StatsAnimated from "@/components/StatsAnimated";
import MotionSection from "@/components/MotionSection";
import HomeSections from "@/components/HomeSections";

export default function Home() {
  return (
    <main className="flex flex-col pb-24 relative overflow-hidden">
      
      {/* 1. Hero & Base Stats (Always Visible for LCP/SEO) */}
      <Hero />
      <MotionSection>
        <StatsAnimated />
      </MotionSection>

      {/* Delayed sections (Purely Client-side for TBT/Core Web Vitals) */}
      <HomeSections />

    </main>
  );
}
