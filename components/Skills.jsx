"use client";

import Motion from "@/components/ui/Motion";
import { useTranslations } from "next-intl";

const skillsMap = [
  { name: "React", bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
  { name: "Next.js", bg: "bg-white/5", border: "border-white/10", text: "text-white" },
  { name: "Tailwind CSS", bg: "bg-teal-500/10", border: "border-teal-500/20", text: "text-teal-400" },
  { name: "TypeScript", bg: "bg-blue-600/10", border: "border-blue-600/20", text: "text-blue-500" },
  { name: "Node.js", bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-500" },
  { name: "Express", bg: "bg-gray-500/10", border: "border-gray-500/20", text: "text-gray-400" },
  { name: "Supabase", bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  { name: "React Native", bg: "bg-blue-400/10", border: "border-blue-400/20", text: "text-blue-300" },
  { name: "WhatsApp API", bg: "bg-emerald-600/10", border: "border-emerald-600/20", text: "text-emerald-500" }
];

function SkillIcon({ name, className }) {
  switch (name) {
    case "React":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="12" rx="6" ry="2" transform="rotate(0 12 12)" />
            <ellipse cx="12" cy="12" rx="6" ry="2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="6" ry="2" transform="rotate(120 12 12)" />
          </g>
        </svg>
      );
    case "Next.js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="3" />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M2 12c5 0 7-5 12-5 3 0 6 5 10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <text x="7" y="17" fontSize="8" fill="#fff">TS</text>
        </svg>
      );
    case "Node.js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "Express":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="4" y="10" width="16" height="4" rx="2" />
        </svg>
      );
    case "Supabase":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2L2 7v10l10 5 10-5V7z" />
        </svg>
      );
    case "React Native":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case "WhatsApp API":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
  }
}

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
        
        <Motion as="div" 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillsMap.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Motion as="div"
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border ${skill.bg} ${skill.border} backdrop-blur-sm group transition-colors hover:bg-white/10`}
              >
                <SkillIcon name={skill.name} className={`w-10 h-10 ${skill.text} group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium text-slate-800 dark:text-white/80">{skill.name}</span>
              </Motion>
            );
          })}
        </Motion>
      </div>
    </div>
  );
}
