"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { BOTANICAL_OPTIONS } from "@/app/constants/botanicalFilters";

const especiales = [
  { key: "pet_friendly", label: "🐾 Pet friendly" },
  { key: "interior", label: "🏠 Solo interiores" },
];

export default function FilterDrawer() {
  const router = useRouter();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const activeFiltersCount = [
    "luz",
    "riego",
    "dificultad",
    "pet_friendly",
    "interior",
  ].filter((k) => params.get(k)).length;

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

  const clearAll = () => {
    const next = new URLSearchParams(params.toString());
    ["luz", "riego", "dificultad", "pet_friendly", "interior"].forEach((k) =>
      next.delete(k),
    );
    router.push(`/catalogo?${next.toString()}`);
  };

  return (
    <>
      {/* Botón flotante de filtros — solo en móvil */}
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-green-600 hover:bg-green-700 text-white gap-2 shadow-lg shadow-green-900/30 rounded-full px-6"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtros
        {activeFiltersCount > 0 && (
          <span className="bg-white text-green-700 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </Button>

      {/* Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-3xl bg-white dark:bg-gray-900 flex flex-col p-0"
        >
          <SheetHeader className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="size-5 text-green-600" />
                Filtros
              </SheetTitle>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-gray-500 gap-1 text-xs"
                >
                  <X className="w-3 h-3" />
                  Limpiar todo
                </Button>
              )}
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
            {/* Especiales */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Especiales
              </h3>
              <div className="flex flex-wrap gap-2">
                {especiales.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => toggleBoolean(key)}
                    className={`text-sm px-4 py-2 rounded-xl border transition-colors ${
                      params.get(key)
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Luz, Riego, Dificultad */}
            {Object.entries(BOTANICAL_OPTIONS).map(([key, opciones]) => (
              <div key={key}>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 capitalize">
                  {key === "luz"
                    ? "☀️ Luz requerida"
                    : key === "riego"
                      ? "💧 Frecuencia de riego"
                      : "🌱 Dificultad"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {opciones.map((op) => (
                    <button
                      key={op.value}
                      onClick={() => setFilter(key, op.value)}
                      className={`text-sm px-4 py-2 rounded-xl border transition-colors ${
                        params.get(key) === op.value
                          ? "bg-green-600 text-white border-green-600"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
            <Button
              onClick={() => setOpen(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              Ver resultados
              {activeFiltersCount > 0 &&
                ` (${activeFiltersCount} filtros activos)`}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
