import { stepQuotes, projectTypes } from "@/app/constants/stepQuotes";
import QuoteForm from "@/components/store/QuoteForm";
import { Star } from "lucide-react";

export default function PaisajismoPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-linear-to-br from-green-900 to-emerald-800 py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-700/50 text-green-200 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Star className="size-4" />
            Servicio premium
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Diseño de paisajismo
            <br />
            <span className="text-green-300">a tu medida</span>
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Transformamos espacios en jardines únicos. Desde pequeñas terrazas
            hasta grandes proyectos corporativos en Venezuela.
          </p>
        </div>
      </section>

      {/* Tipos de proyecto */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
            ¿Qué tipo de proyecto tienes?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projectTypes.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className={`rounded-2xl p-6 flex flex-col items-center text-center gap-3 ${color}`}
              >
                <div className="w-12 h-12 bg-white/50 dark:bg-white/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm opacity-75">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stepQuotes.map(({ step, title, desc }) => (
              <div
                key={step}
                className="flex flex-col items-center text-center gap-3 border border-gray-300 dark:border-gray-800 rounded-2xl p-6"
              >
                <div className="size-14 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                  {step}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Solicita tu cotización gratuita
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sin compromiso. Te respondemos en menos de 24 horas.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </div>
  );
}
