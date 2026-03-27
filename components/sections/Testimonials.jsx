"use client";

import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const testimonials = t.raw("items");

  const avatars = [
    "/assets/avatar-pedro.png",
    "/assets/avatar-miri.jpg",
    "/assets/avatar-guido.png",
    "/assets/avatar-deylena.jpg"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section id="testimonios" className="py-24 relative z-10 overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-white/70 font-primary">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pb-12 slick-portfolio-theme"
        >
          <Slider {...settings}>
            {testimonials.map((test, idx) => (
              <div key={idx} className="h-full px-3 py-4">
                <div className="bg-slate-50 dark:bg-[#1B1F3B]/40 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-3xl p-8 h-full flex flex-col hover:border-accent/30 dark:hover:border-accent/30 transition-colors relative group shadow-sm dark:shadow-none">
                  <Quote className="absolute top-6 right-8 w-12 h-12 text-slate-200 dark:text-accent/10 group-hover:text-accent/20 transition-colors" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={avatars[idx]}
                      alt={test.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-accent/50"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{test.name}</h4>
                      <p className="text-sm text-accent">{test.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 dark:text-white/70 italic leading-relaxed font-primary flex-grow text-sm">
                    "{test.testimonial}"
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>

      <style jsx global>{`
        .slick-portfolio-theme .slick-dots li button:before {
            font-size: 10px;
            color: rgba(255,255,255,0.2) !important;
            opacity: 1;
            transition: all 0.3s ease;
        }
        .slick-portfolio-theme .slick-dots li.slick-active button:before {
            color: #00C6FF !important;
            transform: scale(1.5);
        }
      `}</style>
    </section>
  );
}