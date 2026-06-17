"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    emoji: string;
    filter?: Record<string, string>;
  }[];
}

const questions: Question[] = [
  {
    id: "location",
    question: "¿Dónde vivirá tu planta?",
    options: [
      {
        value: "interior",
        label: "Interior",
        emoji: "🏠",
        filter: { interior: "1" },
      },
      {
        value: "exterior",
        label: "Exterior",
        emoji: "🌳",
        filter: { interior: "0" },
      },
      { value: "balcon", label: "Balcón/Terraza", emoji: "🪟", filter: {} },
    ],
  },
  {
    id: "light",
    question: "¿Cuánta luz tiene ese espacio?",
    options: [
      {
        value: "sol_directo",
        label: "Sol directo todo el día",
        emoji: "☀️",
        filter: { luz: "sol_directo" },
      },
      {
        value: "sol_parcial",
        label: "Sol parcial",
        emoji: "⛅",
        filter: { luz: "sol_parcial" },
      },
      {
        value: "sombra",
        label: "Poca luz / sombra",
        emoji: "🌥️",
        filter: { luz: "sombra" },
      },
    ],
  },
  {
    id: "water",
    question: "¿Cada cuánto puedes regarla?",
    options: [
      {
        value: "diario",
        label: "Todos los días",
        emoji: "💧",
        filter: { riego: "diario" },
      },
      {
        value: "semanal",
        label: "2-3 veces por semana",
        emoji: "💧",
        filter: { riego: "semanal" },
      },
      {
        value: "mensual",
        label: "Me olvido a veces",
        emoji: "🌵",
        filter: { riego: "mensual" },
      },
    ],
  },
  {
    id: "pets",
    question: "¿Tienes mascotas en casa?",
    options: [
      {
        value: "yes",
        label: "Sí, tengo mascotas",
        emoji: "🐾",
        filter: { pet_friendly: "1" },
      },
      { value: "no", label: "No tengo mascotas", emoji: "✅", filter: {} },
    ],
  },
  {
    id: "style",
    question: "¿Qué buscas principalmente?",
    options: [
      {
        value: "flores",
        label: "Flores y color",
        emoji: "🌸",
        filter: { categoria: "ornamentales" },
      },
      {
        value: "follaje",
        label: "Follaje decorativo",
        emoji: "🌿",
        filter: { categoria: "ornamentales" },
      },
      {
        value: "frutos",
        label: "Plantas frutales",
        emoji: "🍋",
        filter: { categoria: "arboles" },
      },
      {
        value: "facil",
        label: "Bajo mantenimiento",
        emoji: "😌",
        filter: { dificultad: "facil" },
      },
    ],
  },
];

export default function PlantRecommender() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, Record<string, string>>
  >({});
  const [selected, setSelected] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const currentQuestion = questions[step];
  const isLast = step === questions.length - 1;

  const handleSelect = (value: string, filter: Record<string, string>) => {
    setSelected(value);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: filter }));
  };

  const handleNext = () => {
    if (!selected) return;
    if (isLast) {
      // Combinar todos los filtros y redirigir al catálogo
      const allFilters = Object.values(answers).reduce(
        (acc, filters) => ({ ...acc, ...filters }),
        {},
      );
      const params = new URLSearchParams(allFilters);
      router.push(`/catalogo?${params.toString()}`);
    } else {
      setStep((prev) => prev + 1);
      setSelected(null);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    setSelected(null);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setSelected(null);
    setStarted(false);
  };

  if (!started) {
    return (
      <div className="text-center">
        <div className="size-20 bg-green-200 dark:bg-green-950/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="size-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          ¿No sabes qué planta elegir?
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
          Responde 5 preguntas rápidas y te recomendamos las plantas perfectas
          para tu espacio y estilo de vida.
        </p>
        <Button
          onClick={() => setStarted(true)}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
          size="lg"
        >
          <Leaf className="size-4" />
          Encontrar mi planta ideal
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= step ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
        Pregunta {step + 1} de {questions.length}
      </p>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        {currentQuestion.question}
      </h3>

      {/* Opciones */}
      <div className="grid grid-cols-1 gap-3 mb-8">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value, option.filter ?? {})}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
              selected === option.value
                ? "border-green-600 bg-green-50 dark:bg-green-950/30"
                : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700"
            }`}
          >
            <span className="text-2xl">{option.emoji}</span>
            <span
              className={`font-medium text-sm ${
                selected === option.value
                  ? "text-green-700 dark:text-green-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {option.label}
            </span>
            {selected === option.value && (
              <span className="ml-auto text-green-600 dark:text-green-400">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Navegación */}
      <div className="flex items-center justify-between">
        <div>
          {step > 0 && (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-gray-500 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </Button>
          )}
          {step === 0 && (
            <Button
              variant="ghost"
              onClick={reset}
              className="text-gray-400 text-sm"
            >
              Cancelar
            </Button>
          )}
        </div>
        <Button
          onClick={handleNext}
          disabled={!selected}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          {isLast ? (
            <>
              Ver mis plantas <Sparkles className="w-4 h-4" />
            </>
          ) : (
            <>
              Siguiente <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
