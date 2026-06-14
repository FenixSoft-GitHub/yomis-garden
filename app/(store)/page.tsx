import Link from "next/link";
import { ArrowRight, Leaf, Truck, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SponsorsCarousel from "@/components/layout/SponsorsCarousel";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-linear-to-br from-green-50 via-emerald-50 to-teal-600 px-4 h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Leaf className="w-4 h-4" />
            Vivero artesanal venezolano
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Lleva la naturaleza
            <br />
            <span className="text-green-600">a tu hogar</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Plantas seleccionadas con amor, árboles frutales, cactus, suculentas
            y todo lo que necesitas para tu jardín. Envíos a toda Venezuela.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogo">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                Ver catálogo completo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/catalogo?categoria=cactus-suculentas">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50"
              >
                Cactus y Suculentas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Plantas saludables</h3>
            <p className="text-sm text-gray-500">
              Cultivadas y seleccionadas directamente en nuestro vivero con los
              más altos estándares.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Envío seguro</h3>
            <p className="text-sm text-gray-500">
              Empaque especial para plantas vivas. Envíos locales y nacionales
              de accesorios.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Garantía de calidad</h3>
            <p className="text-sm text-gray-500">
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
      <section className="py-16 px-4 bg-green-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Star className="w-10 h-10 mx-auto mb-4 text-green-300" />
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes un proyecto de paisajismo?
          </h2>
          <p className="text-green-200 mb-6">
            Diseñamos y ejecutamos jardines para hogares y empresas. Cotiza tu
            proyecto sin compromiso.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white bg-green-950 hover:bg-green-600"
          >
            Solicitar cotización
          </Button>
        </div>
      </section>
    </div>
  );
}
