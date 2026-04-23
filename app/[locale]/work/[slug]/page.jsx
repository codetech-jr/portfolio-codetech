import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
// Íconos inline (sustituyen react-icons/bs)
function IconArrowUpRight({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M13 5h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 13L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGithub({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.69 3.04 8.66 7.26 10.06.53.1.72-.23.72-.51 0-.25-.01-.92-.01-1.8-2.95.64-3.58-1.42-3.58-1.42-.48-1.22-1.17-1.55-1.17-1.55-.96-.66.07-.65.07-.65 1.07.08 1.64 1.1 1.64 1.1.94 1.61 2.47 1.15 3.07.88.09-.68.37-1.15.67-1.41-2.36-.27-4.84-1.18-4.84-5.25 0-1.16.41-2.12 1.08-2.86-.11-.27-.47-1.36.1-2.83 0 0 .88-.28 2.9 1.09a10.1 10.1 0 0 1 2.64-.36c.9 0 1.8.12 2.64.36 2.02-1.37 2.9-1.09 2.9-1.09.57 1.47.21 2.56.1 2.83.67.74 1.08 1.7 1.08 2.86 0 4.08-2.49 4.98-4.86 5.24.38.33.72.98.72 1.98 0 1.43-.01 2.58-.01 2.93 0 .28.19.61.73.51 4.23-1.4 7.26-5.37 7.26-10.06C23.25 5.48 18.27.5 12 .5z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
    </svg>
  );
}
import MotionSection from "@/components/MotionSection";
import { projectsData } from "@/data/projects";

// This simulates a dynamic page component that fetches translations
export default async function ProjectDetail({ params }) {
  const { locale, slug } = await params;
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
                  <IconArrowUpRight className="text-lg" /> Visitar Website
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
                >
                  <IconGithub className="text-lg" /> Ver Repositorio
                </a>
              </div>
            </div>

            {/* Main Image */}
            {project.image && (
              <div className="flex-1 w-full max-w-xl">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                  <Image
                    src={project.image}
                    fill
                    alt={t("title")}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            )}
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
