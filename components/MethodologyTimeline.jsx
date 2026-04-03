"use client";

import Motion from "@/components/ui/Motion";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

export default function MethodologyTimeline() {
  const t = useTranslations("methodology");
  const steps = t.raw("steps");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 w-full relative z-10" ref={ref}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
            {t("title")} <span className="text-accent text-outline-hover">{t("titleHighlight")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-white/70 font-primary">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-px bg-slate-200 dark:bg-white/10 md:-translate-x-1/2"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const stepId = index + 1;
              
              return (
                <Motion as="div"
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="w-full md:w-1/2 relative pl-16 md:pl-0">
                    <div className={`
                      bg-white/80 dark:bg-[#1B1F3B]/50 backdrop-blur-md border border-slate-200 dark:border-white/5 p-6 rounded-2xl 
                      transition-all duration-300 hover:border-accent/40 dark:hover:border-accent/40 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-accent/5
                      md:mx-8 relative z-10
                    `}>
                      <span className="text-6xl font-black text-slate-200 dark:text-white/5 absolute -top-4 -right-2 font-display select-none">
                        0{stepId}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-white/70 text-sm leading-relaxed relative z-10 font-primary">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Node */}
                  <div className="absolute left-[20px] md:left-1/2 w-10 h-10 rounded-full border-4 border-[#0C0C2C] bg-accent/20 flex items-center justify-center -translate-x-[18px] md:-translate-x-1/2 z-20 shadow-[0_0_15px_rgba(0,198,255,0.4)]">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  </div>
                </Motion>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
