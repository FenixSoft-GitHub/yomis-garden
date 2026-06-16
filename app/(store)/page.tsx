import Link from "next/link";
import { ArrowRight, Leaf, Truck, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SponsorsCarousel from "@/components/layout/SponsorsCarousel";
import HeroCarousel from "@/components/layout/HeroCarousel"; // <-- Nuevo import

export default function HomePage() {
  return (
    <div>
      {/* Hero Adaptado a 2 Columnas */}
      <section className="relative bg-linear-to-br from-green-50 dark:from-green-950 via-emerald-50 to-teal-600 px-4 min-h-screen md:h-screen flex items-center py-12 md:py-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          {/* Columna Izquierda: Textos y Acciones */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Leaf className="size-4" />
              Vivero artesanal venezolano
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Lleva la naturaleza
              <br />
              <span className="text-green-600 dark:text-green-900">a tu hogar</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Plantas seleccionadas con amor, árboles frutales, cactus,
              suculentas y todo lo que necesitas para tu jardín. Envíos a toda
              Venezuela.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
              <Link href="/catalogo">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white gap-2 w-full sm:w-auto"
                >
                  Ver catálogo completo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/catalogo?categoria=cactus-suculentas">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-700 hover:bg-green-50 w-full sm:w-auto"
                >
                  Cactus y Suculentas
                </Button>
              </Link>
            </div>
          </div>

          {/* Columna Derecha: El Carrusel */}
          <div className="w-full order-first md:order-last">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* El resto de tus secciones de Beneficios, Sponsors y CTA quedan exactamente igual... */}
      {/* Beneficios */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="size-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Leaf className="size-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-300">
              Plantas saludables
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cultivadas y seleccionadas directamente en nuestro vivero con los
              más altos estándares.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="size-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Truck className="size-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-300">
              Envío seguro
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Empaque especial para plantas vivas. Envíos locales y nacionales
              de accesorios.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="size-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Shield className="size-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-300">
              Garantía de calidad
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Si tu planta llega en mal estado, la reponemos. Tu satisfacción es
              nuestra prioridad.
            </p>
          </div>
        </div>
      </section>

      <section>
        <SponsorsCarousel />
      </section>

      {/* CTA Paisajismo */}
      <section className="py-16 px-4 bg-green-700 dark:bg-green-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Star className="size-10 mx-auto mb-4 text-green-300" />
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes un proyecto de paisajismo?
          </h2>
          <p className="text-green-200 mb-6">
            Diseñamos y ejecutamos gardens para hogares y empresas. Cotiza tu
            proyecto sin compromiso.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white bg-green-950 dark:bg-gray-800 hover:bg-green-600"
          >
            Solicitar cotización
          </Button>
        </div>
      </section>
    </div>
  );
}