"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

function AccordionItem({ faq, isOpen, onClick }) {
  return (
    <div className="mb-4 overflow-hidden border rounded-2xl bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg backdrop-blur-md transition-colors hover:border-accent/30 group">
      <button
        className="flex items-center justify-between w-full px-6 py-5 font-semibold text-left text-slate-900 dark:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onClick={onClick}
        aria-expanded={isOpen}
        type="button"
      >
        <span className="font-medium text-lg text-slate-900 dark:text-white group-hover:text-accent transition-colors font-display">
          {faq.question}
        </span>
        <motion.span
          className="ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 group-hover:bg-accent/20 transition-colors"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`w-5 h-5 ${isOpen ? "text-accent" : "text-slate-400 dark:text-white/60 group-hover:text-accent"}`} />
        </motion.span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: "0.5rem", marginBottom: "1.5rem" },
              collapsed: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="px-6 overflow-hidden"
          >
            <p className="text-slate-600 dark:text-white/70 leading-relaxed whitespace-pre-line font-primary text-sm">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQs() {
  const t = useTranslations("faqs");
  const faqs = t.raw("items");
  const categories = t.raw("categories");
  const [openIndex, setOpenIndex] = useState(null);

  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});

  return (
    <section className="py-24 relative z-10 font-primary">
      <div className="container max-w-4xl px-4 mx-auto">
        <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-display">
            {t("title")}
          </h2>
          <p className="mb-12 text-lg text-slate-600 dark:text-white/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
        >
          {Object.entries(groupedFaqs).map(([categoryKey, faqsInCategory], categoryIndex) => (
            <motion.div key={categoryKey} className="mb-12" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{delay: categoryIndex * 0.1}}>
              <h3 className="mb-6 text-2xl font-bold text-center text-accent/80 border-b border-slate-200 dark:border-white/10 pb-4 inline-block w-full">
                {categories[categoryKey] || categoryKey}
              </h3>
              <div className="flex flex-col gap-2 mt-6">
                {faqsInCategory.map((faq, idx) => (
                  <AccordionItem
                    key={faq.question}
                    faq={faq}
                    isOpen={openIndex === `${categoryIndex}-${idx}`}
                    onClick={() => setOpenIndex(openIndex === `${categoryIndex}-${idx}` ? null : `${categoryIndex}-${idx}`)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}