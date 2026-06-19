"use client";

import { useState } from "react";
import { Calculator, ShoppingCart, Circle, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type Shape = "round" | "square";

export default function SubstrateCalculator() {
  const [shape, setShape] = useState<Shape>("round");
  const [diameter, setDiameter] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{
    liters: number;
    kg: number;
    bags5kg: number;
  } | null>(null);

  const calculate = () => {
    const h = parseFloat(height) - 2.5; // margen de seguridad
    if (h <= 0) return;

    let volumeCm3 = 0;

    if (shape === "round") {
      const d = parseFloat(diameter);
      if (!d || !h) return;
      const radius = d / 2;
      volumeCm3 = Math.PI * radius * radius * h;
    } else {
      const w = parseFloat(width);
      const l = parseFloat(length);
      if (!w || !l || !h) return;
      volumeCm3 = w * l * h;
    }

    const liters = volumeCm3 / 1000;
    // Densidad aproximada del sustrato: 0.5 kg/litro
    const kg = liters * 0.5;
    const bags5kg = Math.ceil(kg / 5);

    setResult({
      liters: Math.round(liters * 10) / 10,
      kg: Math.round(kg * 10) / 10,
      bags5kg,
    });
  };

  const reset = () => {
    setDiameter("");
    setWidth("");
    setLength("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="bg-green-50 dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 p-6 sm:p-8">
      {/* Selector de forma */}
      <div className="mb-6">
        <Label className="text-gray-700 dark:text-gray-300 mb-3 block">
          Forma de tu maceta
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setShape("round");
              setResult(null);
            }}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-colors ${
              shape === "round"
                ? "border-green-600 bg-green-50 dark:bg-green-950/30"
                : "border-gray-200 dark:border-gray-700 hover:border-green-300"
            }`}
          >
            <Circle
              className={`size-6 ${shape === "round" ? "text-green-600" : "text-gray-400"}`}
            />
            <span
              className={`text-sm font-medium ${shape === "round" ? "text-green-700 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}
            >
              Redonda
            </span>
          </button>
          <button
            onClick={() => {
              setShape("square");
              setResult(null);
            }}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-colors ${
              shape === "square"
                ? "border-green-600 bg-green-50 dark:bg-green-950/30"
                : "border-gray-200 dark:border-gray-700 hover:border-green-300"
            }`}
          >
            <Square
              className={`size-6 ${shape === "square" ? "text-green-600" : "text-gray-400"}`}
            />
            <span
              className={`text-sm font-medium ${shape === "square" ? "text-green-700 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}
            >
              Rectangular
            </span>
          </button>
        </div>
      </div>

      {/* Inputs según forma */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {shape === "round" ? (
          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              Diámetro (cm)
            </Label>
            <Input
              type="number"
              min="0"
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
              placeholder="Ej: 25"
              className="mt-1"
            />
          </div>
        ) : (
          <>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">
                Ancho (cm)
              </Label>
              <Input
                type="number"
                min="0"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Ej: 20"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">
                Largo (cm)
              </Label>
              <Input
                type="number"
                min="0"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Ej: 30"
                className="mt-1"
              />
            </div>
          </>
        )}
        <div>
          <Label className="text-gray-700 dark:text-gray-300">
            Altura (cm)
          </Label>
          <Input
            type="number"
            min="0"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Ej: 20"
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={calculate}
          className="bg-green-600 hover:bg-green-700 text-white gap-2 flex-1"
        >
          <Calculator className="w-4 h-4" />
          Calcular
        </Button>
        {result && (
          <Button
            variant="outline"
            onClick={reset}
            className="border-gray-200 dark:border-gray-700"
          >
            Limpiar
          </Button>
        )}
      </div>

      {/* Resultado */}
      {result && (
        <div className="mt-6 bg-green-50 dark:bg-green-950/30 rounded-2xl p-6 border border-green-200 dark:border-green-900/30">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Necesitas aproximadamente:
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {result.liters}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">litros</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {result.kg}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                kg aprox.
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {result.bags5kg}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                bolsas de 5kg
              </p>
            </div>
          </div>
          <Link href="/catalogo?categoria=sustratos">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
              <ShoppingCart className="w-4 h-4" />
              Ver sustratos disponibles
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
