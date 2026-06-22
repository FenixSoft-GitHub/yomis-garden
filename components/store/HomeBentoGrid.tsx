"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Truck, Star, Heart, Sparkles } from "lucide-react";
import PlantRecommender from "./PlantRecommender";

export default function HomeBentoGrid() {
  return (
    <section className="py-16 px-4 bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-950/40">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado Seccional */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Diseñado para amantes de las plantas
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Todo lo que necesitas para transformar tus espacios en un oasis
            natural.
          </p>
        </div>

        {/* Estructura del Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {/* TARJETA 1 (Grande - 2 Columnas de ancho): El Asistente Interactivo */}
          <div className="md:col-span-2 bg-white dark:bg-gray-900/60 rounded-3xl border border-gray-200/80 dark:border-gray-800/80 p-6 md:p-8 shadow-xs flex flex-col justify-between group relative overflow-hidden">
            {/* Sutil brillo de fondo */}
            <div className="absolute -top-24 -right-24 size-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-green-500/15 transition-colors duration-500" />

            <div className="relative z-10 w-full">
              {/* Renderizamos el Recomendador adaptado directamente aquí */}
              <PlantRecommender />
            </div>
          </div>

          {/* TARJETA 2 (Alta - 1 Columna de ancho): Producto / Categoría Destacada */}
          <div className="bg-green-900 dark:bg-emerald-950/40 rounded-3xl overflow-hidden shadow-lg relative h-100 md:h-auto flex flex-col justify-end p-8 group border border-green-800/30">
            {/* Imagen de fondo premium de Cactus/Suculentas */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src="/images/bento-featured.jpg" 
                alt="Colección de Cactus y Suculentas selectas"
                fill
                sizes="(max-w-768px) 100vw, 33vw"
                className="object-cover opacity-80 md:opacity-75 group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 bg-linear-to-t from-green-950 via-green-950/40 to-transparent" />
            </div>

            {/* Contenido de la Tarjeta */}
            <div className="relative z-10 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-green-950 mb-3 shadow-xs">
                <Sparkles className="size-3 fill-green-950" />
                La Tendencia del Mes
              </span>
              <h3 className="text-2xl font-bold tracking-tight mb-2">
                Cactus & Suculentas
              </h3>
              <p className="text-green-100/80 text-sm mb-6 max-w-xs leading-relaxed">
                Especies exóticas de colección criadas bajo el sol venezolano.
                Ideales para escritorios y espacios minimalistas.
              </p>
              <Link href="/catalogo?categoria=cactus-suculentas">
                <button className="inline-flex items-center gap-2 bg-white text-green-900 hover:bg-green-50 font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-sm hover:shadow-md">
                  Explorar Colección
                  <ArrowRight className="size-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* TARJETAS 3 a 6 (Bloques Pequeños): Fusión Dinámica del TrustBar */}
          <div className="grid grid-cols-2 md:grid-cols-4 md:col-span-3 gap-4 w-full">
            {/* Beneficio 1 */}
            <div className="bg-white dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/80 p-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 hover:border-green-500/30 dark:hover:border-green-500/20 transition-all group">
              <div className="p-3 bg-green-50 dark:bg-green-950/50 rounded-xl text-green-600 dark:text-green-400 shrink-0 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all">
                <Leaf className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                  +500 Cultivos
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Plantas sanas listas para su nuevo hogar.
                </p>
              </div>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-white dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/80 p-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 hover:border-blue-500/30 dark:hover:border-blue-500/20 transition-all group">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-blue-500 dark:text-blue-400 shrink-0 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all">
                <Truck className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                  Envíos Seguros
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Empaque optimizado anti-impacto nacional.
                </p>
              </div>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-white dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/80 p-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 hover:border-amber-500/30 dark:hover:border-amber-500/20 transition-all group">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-amber-500 dark:text-amber-400 shrink-0 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all">
                <Star className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                  Calidad 4.9/5
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Garantía absoluta de reposición inmediata.
                </p>
              </div>
            </div>

            {/* Beneficio 4 */}
            <div className="bg-white dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/80 p-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 hover:border-red-500/30 dark:hover:border-red-500/20 transition-all group">
              <div className="p-3 bg-red-50 dark:bg-red-950/50 rounded-xl text-red-500 dark:text-red-400 shrink-0 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all">
                <Heart className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                  100% Nacional
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Sello e identidad botánica venezolana 🇻🇪
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
