import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import MotionSection from "@/components/MotionSection";
import { projectsData } from "@/data/projects";

// This simulates a dynamic page component that fetches translations
export default function ProjectDetail({ params: { locale, slug } }) {
  setRequestLocale(locale);

  // Validate the project exists in our technical data
  const projectIndex = projectsData.findIndex(p => p.id === slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  
  // We cannot use useTranslations for dynamic keys at the top level without namespace 
  // if we fetch everything, but since we know the slug we can grab the namespace:
  const t = useTranslations(`work.items.${slug}`);
  const g = useTranslations(`work`);

  return (
    <main className="flex flex-col gap-12 pb-24 relative overflow-hidden pt-32">
      <div className="absolute top-0 w-full h-96 bg-accent/5 blur-[120px] pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Breadcrumb / Return */}
        <div className="mb-8 font-primary">
          <a href={`/${locale}/work`} className="text-accent hover:underline flex items-center gap-2 text-sm font-semibold">
            ← Volver a Proyectos
          </a>
        </div>

        {/* Header */}
        <MotionSection>
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="flex-1 space-y-6">
              <span className="px-3 py-1 text-xs font-semibold text-accent bg-accent/10 border border-accent/20 rounded-full">
                {t("category")}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white font-display leading-tight">
                {t("title")}
              </h1>
              <p className="text-xl text-white/70 font-primary leading-relaxed max-w-2xl">
                {t("description")}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-[#0C0C2C] bg-accent rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,198,255,0.4)]"
                >
                  <BsArrowUpRight className="text-lg" /> Visitar Website
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
                >
                  <BsGithub className="text-lg" /> Ver Repositorio
                </a>
              </div>
            </div>

            {/* Main Image */}
            <div className="flex-1 w-full max-w-xl">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image
                  src={project.image}
                  fill
                  alt={t("title")}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Tech Stack Details */}
        <MotionSection>
          <div className="bg-[#1B1F3B]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
            <h3 className="text-2xl font-bold text-white mb-6 font-display">Tecnologías Utilizadas</h3>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map(tech => (
                <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/80 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* Content Placeholder for Case Study Narrative */}
        <MotionSection>
          <div className="max-w-3xl mx-auto space-y-8 text-white/80 font-primary text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-white font-display mb-4">El Desafío</h2>
            <p className="opacity-70 italic text-center text-sm my-8 border border-dashed border-white/20 p-8 rounded-2xl">
              Aquí se detallaría la narrativa completa del caso de éxito. (Ej. El problema inicial del cliente, el rediseño estratégico, métricas de éxito conseguidas...). Esto puede extenderse en Fase Futura integrando un CMS local de Markdown.
            </p>
          </div>
        </MotionSection>

      </div>
    </main>
  );
}
