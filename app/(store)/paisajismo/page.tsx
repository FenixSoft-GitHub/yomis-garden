import { stepQuotes } from "@/app/constants/stepQuotes";
import QuoteForm from "@/components/store/QuoteForm";
import LandscapeBentoGrid from "@/components/store/LandscapeBentoGrid";
import { Star, ArrowDown, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diseño de paisajismo — Yomi's Garden",
  description:
    "Servicio profesional de diseño y ejecución de jardines en Venezuela. Proyectos residenciales, comerciales y corporativos. Cotiza gratis.",
  keywords: [
    "paisajismo Venezuela",
    "jardines Venezuela",
    "diseño jardines",
    "vivero paisajismo",
  ],
  openGraph: {
    title: "Diseño de paisajismo — Yomi's Garden",
    description:
      "Transformamos espacios en jardines únicos. Cotiza tu proyecto sin compromiso.",
    type: "website",
  },
};

export default function PaisajismoPage() {
  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* ── 1. HERO INMERSIVO Y MINIMALISTA ── */}
      <section className="relative relative-3d min-h-[70vh] flex items-center justify-center px-4 overflow-hidden bg-linear-to-b from-neutral-50 dark:from-neutral-900 via-green-950 dark:to-neutral-950 to-neutral-50 text-white">
        {/* Efecto de sutil resplandor ambiental de fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-62.5 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-green-800 dark:text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wider uppercase backdrop-blur-md">
            <Star className="size-3 dark:fill-emerald-400 fill-green-800" />
            Estudio de Paisajismo
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance">
            Arquitectura botánica
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 via-green-300 to-emerald-200">
              diseñada a tu medida
            </span>
          </h1>

          <p className="text-neutral-300 dark:text-neutral-400 text-base md:text-xl max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            Transformamos entornos arquitectónicos en ecosistemas armónicos,
            minimalistas y sofisticados a lo largo de Venezuela.
          </p>

          <div className="pt-4 flex justify-center animate-bounce">
            <ArrowDown className="size-5 text-neutral-500" />
          </div>
        </div>
      </section>

      {/* ── 2. SECCIÓN BENTO GRID (Nuestras Especialidades) ── */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <p className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              Portafolio de Enfoques
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Nuestras Especialidades
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-sm text-sm md:text-base leading-relaxed">
            Estructuras y entornos vivos personalizados de acuerdo a la
            naturaleza de cada espacio.
          </p>
        </div>

        <LandscapeBentoGrid className="h-auto md:h-140 gap-8" />
      </section>

      {/* ── 3. EL PROCESO DE DISEÑO (Estilo Asimétrico / Línea de tiempo) ── */}
      <section className="py-12 px-4 bg-neutral-50 dark:bg-neutral-900/40 border-y border-neutral-100 dark:border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <div className="inline-flex p-2 bg-neutral-200/50 dark:bg-neutral-800 rounded-xl text-neutral-600 dark:text-neutral-400">
              <Sparkles className="size-4" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              ¿Cómo le damos vida a tu espacio?
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
              Un flujo de ejecución limpio, transparente y milimétrico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {stepQuotes.map(({ step, title, desc }) => (
              <div
                key={step}
                className="group relative flex flex-col items-start bg-white dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl p-8 shadow-xs transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/30 dark:hover:shadow-none"
              >
                {/* Indicador de paso flotante minimalista */}
                <div className="absolute top-6 right-6 text-6xl font-black text-neutral-200/50 dark:text-neutral-900/80 select-none transition-colors duration-300 group-hover:text-emerald-500/10">
                  0{step}
                </div>

                <div className="size-10 bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center text-sm shadow-md shadow-emerald-900/10 mb-6">
                  {step}
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">
                  {title}
                </h3>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FORMULARIO DE CAPTACIÓN (Diseño de Tarjeta Flotante Estilo Estudio) ── */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <div className="relative bg-white dark:bg-neutral-950 border border-neutral-200/70 dark:border-neutral-800/80 rounded-[32px] p-8 md:p-12 shadow-2xl shadow-neutral-100 dark:shadow-none overflow-hidden">
          {/* Sutil gradiente de esquina decorativo */}
          <div className="absolute -top-24 -right-24 size-48 bg-emerald-500/30 blur-3xl rounded-full" />

          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Inicia tu transformación
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
              Déjanos tus datos de contacto. Evaluaremos tu espacio y te
              entregaremos un diagnóstico conceptual sin costo alguno en menos
              de 24 horas.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
