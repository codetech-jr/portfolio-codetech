"use client";

import Motion from "@/components/ui/Motion";
import { useTranslations } from "next-intl";
import { MonitorSmartphone, ShoppingCart, Bot, Smartphone } from "lucide-react";
import { useInView } from "react-intersection-observer";

const icons = {
  0: <MonitorSmartphone className="w-10 h-10 text-accent" />,
  1: <ShoppingCart className="w-10 h-10 text-accent" />,
  2: <Bot className="w-10 h-10 text-accent" />,
  3: <Smartphone className="w-10 h-10 text-accent" />
};

export function ServicesCompact() {
  const t = useTranslations("services");
  const items = t.raw("items");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 relative z-10" ref={ref}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4 text-white">
            {t("title")}
          </h2>
          <p className="text-white/70 max-w-2xl font-primary">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service, index) => (
            <Motion as="div"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 hover:border-accent/30 transition-all group flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/80 flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform">
                {icons[index]}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed font-primary">
                {service.desc}
              </p>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  );
}
