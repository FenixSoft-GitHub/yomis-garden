import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/layout/HeroCarousel";
import SponsorsCarousel from "@/components/layout/SponsorsCarousel";
import CategoryGrid from "@/components/store/CategoryGrid";
import HomeReviews from "@/components/store/HomeReviews";
import Newsletter from "@/components/store/Newsletter";
import PlantRecommender from "@/components/store/PlantRecommender";
import ProductCard from "@/components/store/ProductCard";
import { getHomePageData } from "@/lib/hooks/useHomePage";
import { Leaf, Sparkles } from "lucide-react";
import Beneficios from "@/components/layout/Beneficios"
import LandscapeServices from "@/components/store/LandscapeServices";

export default async function HomePage() {
  const { featuredProducts, recentReviews, totalProducts } =
    await getHomePageData();

  return (
    <div>
      {/* ── 1. HERO ── */}
      <section className="relative bg-linear-to-br from-green-50 dark:from-green-950 via-emerald-50 dark:via-gray-900 to-teal-50 dark:to-gray-950 px-4 min-h-screen md:h-screen flex items-center py-12 md:py-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Leaf className="size-4" />
              Vivero venezolano
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              Lleva la naturaleza
              <br />
              <span className="text-green-600 dark:text-green-400">
                a tu hogar
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 max-w-xl leading-relaxed">
              Plantas seleccionadas con amor, árboles frutales, cactus,
              suculentas y todo lo que necesitas para tu jardín.
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-8">
              🌿 {totalProducts} plantas y productos disponibles · Envíos a toda
              Venezuela
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
              <Link href="/catalogo">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white gap-2 w-full sm:w-auto"
                >
                  Ver catálogo completo
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/paisajismo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 w-full sm:w-auto"
                >
                  Cotizar paisajismo
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full order-first md:order-last">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* CATEGORÍAS ── */}
      <CategoryGrid />

      {/* PRODUCTOS DESTACADOS ── */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Productos destacados
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Los favoritos de nuestros clientes
                </p>
              </div>
              <Link href="/catalogo">
                <Button
                  variant="outline"
                  className="gap-2 hidden sm:flex border-green-600 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30"
                >
                  Ver todos
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link href="/catalogo">
                <Button
                  variant="outline"
                  className="gap-2 border-green-600 text-green-700"
                >
                  Ver todos los productos
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* BENEFICIOS ── */}
      <Beneficios />

      {/* RECOMENDADOR DE PLANTAS ── */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
              <Sparkles className="size-4" />
              Herramienta interactiva
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Diagnóstico: ¿Qué planta es para ti?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Responde 5 preguntas sobre tu espacio y te mostramos las plantas
              perfectas de nuestro catálogo.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/20 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 md:p-12">
            <PlantRecommender />
          </div>
        </div>
      </section>

      {/* BANNER PAISAJISMO ── */}
      <LandscapeServices />

      {/* SPONSORS ── */}
      <SponsorsCarousel />

      {/* RESEÑAS ── */}
      <HomeReviews reviews={recentReviews} />

      {/* NEWSLETTER ── */}
      <Newsletter />
    </div>
  );
}
