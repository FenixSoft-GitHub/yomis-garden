import type { Metadata } from "next";
import SubstrateCalculator from "@/components/store/SubstrateCalculator";
import { Calculator, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Calculadora de sustrato — Yomi's Garden",
  description:
    "¿Cuánto sustrato necesitas para tu maceta? Calcula la cantidad exacta de tierra según las dimensiones de tu maceta.",
};

export default function CalculadoraSustratoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
          <Calculator className="w-4 h-4" />
          Herramienta gratuita
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Calculadora de sustrato
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Calcula exactamente cuánto sustrato necesitas para tu maceta según sus
          dimensiones. Sin desperdiciar ni quedarte corto.
        </p>
      </div>

      <SubstrateCalculator />

      <div className="mt-10 bg-green-50 dark:bg-green-950/20 rounded-2xl p-6 border border-green-100 dark:border-green-900/30">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-green-600" />
          ¿Sabías qué?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Es recomendable dejar un espacio de 2-3 cm entre el borde de la maceta
          y el sustrato para evitar que el agua se desborde al regar. Nuestro
          cálculo ya considera este margen.
        </p>
      </div>
    </div>
  );
}
