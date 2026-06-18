import Link from "next/link";
import { Leaf, ArrowRight, Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 dark:from-gray-950 via-white dark:via-gray-900 to-emerald-50 dark:to-gray-950 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Ilustración */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="text-[8rem] leading-none select-none">🌵</div>
          <div className="absolute -top-2 -right-4 text-[3rem] animate-bounce">
            🌿
          </div>
          <div className="absolute -bottom-2 -left-4 text-[2rem] animate-pulse">
            🍃
          </div>
        </div>

        {/* Error code */}
        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
          <Leaf className="w-4 h-4" />
          Error 404
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Esta planta no existe
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          La página que buscas no fue encontrada. Puede que haya sido movida,
          eliminada o simplemente nunca existió... como una planta sin semilla.
        </p>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
            size="lg"
          >
            <Link href="/">
              <Home className="size-4" />
              Ir al inicio
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-green-600 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 gap-2"
            size="lg"
          >
            <Link href="/catalogo">
              <Search className="size-4" />
              Ver catálogo
            </Link>
          </Button>
        </div>

        {/* Links rápidos */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
            Quizás estabas buscando:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              {
                label: "🌵 Cactus",
                href: "/catalogo?categoria=cactus-suculentas",
              },
              { label: "🌳 Árboles", href: "/catalogo?categoria=arboles" },
              {
                label: "🌸 Ornamentales",
                href: "/catalogo?categoria=ornamentales",
              },
              { label: "🪴 Macetas", href: "/catalogo?categoria=macetas" },
              { label: "🏡 Paisajismo", href: "/paisajismo" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 bg-gray-50 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-950/30 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors"
              >
                {label}
                <ArrowRight className="size-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
