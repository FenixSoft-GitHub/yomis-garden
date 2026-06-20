"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Leaf, Calculator, ShoppingCart, Sparkles } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart.store";
import CartCount from "@/components/layout/CartCount";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const toggleCart = useCartStore((s) => s.toggleCart);

  // Helper para pintar el botón activo basándose en la ruta actual
  const isActive = (path: string) => pathname === path;

  return (
    // 'lg:hidden' asegura que la barra desaparezca por completo en pantallas de escritorio
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md lg:hidden">
      <nav className="flex items-center justify-between bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border border-green-100/50 dark:border-gray-800/60 px-5 py-2.5 rounded-3xl shadow-xl shadow-gray-950/5 dark:shadow-black/20">
        {/* INICIO */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/")
              ? "text-green-600 dark:text-green-400 font-semibold"
              : "text-gray-400 dark:text-gray-500 hover:text-green-600"
          }`}
        >
          <Home className="size-5" />
          <span className="text-[10px] tracking-wide">Inicio</span>
        </Link>

        {/* PAISAJISMO */}
        <Link
          href="/paisajismo"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/paisajismo")
              ? "text-green-600 dark:text-green-400 font-semibold"
              : "text-gray-400 dark:text-gray-500 hover:text-green-600"
          }`}
        >
          <Sparkles className="size-5" />
          <span className="text-[10px] tracking-wide">Paisajismo</span>
        </Link>

        {/* BOTÓN CENTRAL: CATÁLOGO (FAB DESTACADO) */}
        <Link
          href="/catalogo"
          className={`flex flex-col items-center justify-center size-12 rounded-full -translate-y-4 shadow-lg border-4 border-white dark:border-gray-950 active:scale-95 transition-transform ${
            isActive("/catalogo")
              ? "bg-emerald-600 text-white shadow-emerald-600/30"
              : "bg-green-600 text-white shadow-green-600/30 hover:bg-green-700"
          }`}
        >
          <Leaf className="size-5 animate-pulse" />
        </Link>

        {/* CALCULADORA DE SUSTRATO */}
        <Link
          href="/calculadora-sustrato"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/calculadora-sustrato")
              ? "text-green-600 dark:text-green-400 font-semibold"
              : "text-gray-400 dark:text-gray-500 hover:text-green-600"
          }`}
        >
          <Calculator className="size-5" />
          <span className="text-[10px] tracking-wide">Calculadora</span>
        </Link>

        {/* CARRITO (Botón de acción interactivo) */}
        <button
          onClick={toggleCart}
          className="relative flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-green-600 transition-colors"
        >
          <div className="relative">
            <ShoppingCart className="size-5" />
            <CartCount />
          </div>
          <span className="text-[10px] tracking-wide">Carrito</span>
        </button>
      </nav>
    </div>
  );
}
