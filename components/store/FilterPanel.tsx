"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { BOTANICAL_OPTIONS } from "@/app/constants/botanicalFilters";

export default function FilterPanel() {
  const router = useRouter();
  const params = useSearchParams();

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (next.get(key) === value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    router.push(`/catalogo?${next.toString()}`);
  };

  const toggleBoolean = (key: string) => {
    const next = new URLSearchParams(params.toString());
    if (next.get(key)) {
      next.delete(key);
    } else {
      next.set(key, "1");
    }
    router.push(`/catalogo?${next.toString()}`);
  };

  const clearAll = () => router.push("/catalogo");

  const hasFilters = [
    "luz",
    "riego",
    "dificultad",
    "pet_friendly",
    "interior",
  ].some((k) => params.get(k));

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-white">Filtros</h2>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-xs text-gray-500 gap-1"
          >
            <X className="w-3 h-3" /> Limpiar
          </Button>
        )}
      </div>

      {/* Pet friendly e Interior */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Especiales
        </h3>
        <div className="flex flex-col gap-2">
          {[
            { key: "pet_friendly", label: "🐾 Pet friendly" },
            { key: "interior", label: "🏠 Solo interiores" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleBoolean(key)}
              className={`text-left text-sm px-3 py-2 rounded-lg border transition-colors ${
                params.get(key)
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-green-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Luz, Riego, Dificultad */}
      {Object.entries(BOTANICAL_OPTIONS).map(([key, opciones]) => (
        <div key={key} className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
            {key === "luz"
              ? "☀️ Luz"
              : key === "riego"
                ? "💧 Riego"
                : "🌱 Dificultad"}
          </h3>
          <div className="flex flex-col gap-2">
            {opciones.map((op) => (
              <button
                key={op.value}
                onClick={() => setFilter(key, op.value)}
                className={`text-left text-sm px-3 py-2 rounded-lg border transition-colors ${
                  params.get(key) === op.value
                    ? "bg-green-600 text-white border-green-600"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-green-400"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{op.label}</span>
                  {params.get(key) === op.value && (
                    <X className="size-3.5 opacity-80" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
