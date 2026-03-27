"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        className="relative flex items-center bg-white/5 border border-white/10 rounded-full p-1 w-20 h-9 backdrop-blur-md cursor-pointer group"
        aria-label="Toggle Language"
      >
        <motion.div
          layout
          className="absolute w-8 h-7 bg-accent rounded-full shadow-[0_0_10px_rgba(0,198,255,0.4)]"
          animate={{ x: locale === "es" ? 2 : 42 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <div className="flex justify-between w-full px-2 z-10 pointer-events-none">
          <span className={`text-[10px] font-bold ${locale === "es" ? "text-primary" : "text-white/40"}`}>ES</span>
          <span className={`text-[10px] font-bold ${locale === "en" ? "text-primary" : "text-white/40"}`}>EN</span>
        </div>
      </button>
    </div>
  );
}
