"use client";

import { motion } from "framer-motion";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiReact, SiNodedotjs, SiSupabase, SiExpress } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";

const skillsMap = [
  { icon: SiReact, name: "React", bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
  { icon: SiNextdotjs, name: "Next.js", bg: "bg-white/5", border: "border-white/10", text: "text-white" },
  { icon: SiTailwindcss, name: "Tailwind CSS", bg: "bg-teal-500/10", border: "border-teal-500/20", text: "text-teal-400" },
  { icon: SiTypescript, name: "TypeScript", bg: "bg-blue-600/10", border: "border-blue-600/20", text: "text-blue-500" },
  { icon: SiNodedotjs, name: "Node.js", bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-500" },
  { icon: SiExpress, name: "Express", bg: "bg-gray-500/10", border: "border-gray-500/20", text: "text-gray-400" },
  { icon: SiSupabase, name: "Supabase", bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  { icon: TbBrandReactNative, name: "React Native", bg: "bg-blue-400/10", border: "border-blue-400/20", text: "text-blue-300" },
  { icon: FaWhatsapp, name: "WhatsApp API", bg: "bg-emerald-600/10", border: "border-emerald-600/20", text: "text-emerald-500" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function Skills() {
  const t = useTranslations("skills");
  
  return (
    <div className="w-full">
      <div className="flex flex-col gap-[30px] text-center xl:text-left">
        <div className="flex flex-col gap-[30px]">
          <h3 className="text-4xl font-bold font-display text-slate-900 dark:text-white">{t("title")}</h3>
          <p className="max-w-[600px] text-slate-600 dark:text-white/60 mx-auto xl:mx-0 font-primary">
            {t("description")}
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillsMap.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border ${skill.bg} ${skill.border} backdrop-blur-sm group transition-colors hover:bg-white/10`}
              >
                <Icon className={`text-4xl ${skill.text} group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium text-slate-800 dark:text-white/80">{skill.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
