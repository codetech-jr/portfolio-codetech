"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function StatsAnimated() {
  const t = useTranslations("stats");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { num: 3, text: t("experience") },
    { num: 26, text: t("projects") },
    { num: 10, text: t("technologies") },
    { num: 100, text: t("lighthouse") },
  ];

  return (
    <section ref={ref} className="py-12 xl:py-20 relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm shadow-sm hover:shadow-md dark:shadow-xl dark:hover:shadow-accent/10 transition-shadow"
              >
                <div className="text-4xl xl:text-6xl font-extrabold text-accent mb-2 font-display">
                  {inView ? (
                     <CountUp end={item.num} duration={5} suffix={index === 3 ? "%" : "+"} />
                  ) : "0"}
                </div>
                <p className="text-sm text-center font-medium text-slate-600 dark:text-white/80 max-w-[150px] leading-snug font-primary">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
