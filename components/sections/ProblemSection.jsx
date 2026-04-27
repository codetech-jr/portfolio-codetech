"use client";

export default function ProblemSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-primary border-t border-slate-200 dark:border-white/5 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-10 opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Problem statement */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 font-primary tracking-tight">
              ¿Tu página web existe... <br />
              <span className="text-slate-400 dark:text-slate-500 font-light italic">pero no vende?</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-primary max-w-lg mx-auto lg:mx-0">
              Tener un sitio web no es suficiente. Si tu diseño actual tiene alguno de estos problemas, estás perdiendo clientes todos los días frente a tu competencia.
            </p>
          </div>

          {/* Right: Pain points */}
          <div className="flex-1 w-full max-w-xl">
            <div className="flex flex-col gap-4">
              
              {/* Card 1 */}
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow group">
                <div className="bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 font-primary">Es lenta y aburrida</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-primary leading-relaxed">Los usuarios abandonan en segundos si no carga rápido o si el diseño parece de hace 10 años.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow group">
                <div className="bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 font-primary">No genera confianza</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-primary leading-relaxed">Sin un diseño profesional y pruebas sociales (reseñas, casos), los clientes dudan en comprarte.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow group">
                <div className="bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 font-primary">Nadie te encuentra</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-primary leading-relaxed">Un sitio web sin optimización SEO es como un cartel publicitario en medio del desierto.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
