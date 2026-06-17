import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/layout/HeroCarousel";
import SponsorsCarousel from "@/components/layout/SponsorsCarousel";
import CategoryGrid from "@/components/store/CategoryGrid";
import HomeReviews from "@/components/store/HomeReviews";
import Newsletter from "@/components/store/Newsletter";
import TrustBar from "@/components/store/TrustBar";
import PlantRecommender from "@/components/store/PlantRecommender";
import ProductCard from "@/components/store/ProductCard";
import { getHomePageData } from "@/lib/hooks/useHomePage";
import { Leaf, Truck, Shield, Sparkles } from "lucide-react";

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
              <Leaf className="w-4 h-4" />
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
                  <ArrowRight className="w-4 h-4" />
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

      {/* ── 2. BARRA DE CONFIANZA ── */}
      <TrustBar />

      {/* ── 3. BENEFICIOS ── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: Leaf,
              title: "Plantas saludables",
              desc: "Cultivadas y seleccionadas directamente en nuestro vivero con los más altos estándares.",
              color:
                "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
            },
            {
              icon: Truck,
              title: "Envío seguro",
              desc: "Empaque especial para plantas vivas. Envíos locales y nacionales de accesorios.",
              color:
                "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
            },
            {
              icon: Shield,
              title: "Garantía de calidad",
              desc: "Si tu planta llega en mal estado, la reponemos. Tu satisfacción es nuestra prioridad.",
              color:
                "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
            },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. SPONSORS ── */}
      <SponsorsCarousel />

      {/* ── 5. CATEGORÍAS ── */}
      <CategoryGrid />

      {/* ── 6. PRODUCTOS DESTACADOS ── */}
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
                  <ArrowRight className="w-4 h-4" />
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
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 7. RECOMENDADOR DE PLANTAS ── */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
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
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 md:p-12">
            <PlantRecommender />
          </div>
        </div>
      </section>

      {/* ── 8. BANNER PAISAJISMO ── */}
      <section className="py-16 px-4 bg-linear-to-r from-green-800 to-emerald-700 dark:from-green-950 dark:to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-700/50 text-green-200 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
              <Star className="w-3 h-3" />
              Servicio premium
            </div>
            <h2 className="text-3xl font-bold mb-4">
              ¿Tienes un proyecto de paisajismo?
            </h2>
            <p className="text-green-200 mb-6 leading-relaxed">
              Diseñamos y ejecutamos jardines únicos para hogares y empresas en
              Venezuela. Desde pequeñas terrazas hasta grandes proyectos
              corporativos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/paisajismo">
                <Button
                  size="lg"
                  className="bg-white text-green-800 hover:bg-green-50 font-semibold gap-2"
                >
                  Solicitar cotización gratuita
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 hidden md:grid">
            {[
              { emoji: "🏡", label: "Residencial" },
              { emoji: "🏢", label: "Comercial" },
              { emoji: "🌳", label: "Corporativo" },
              { emoji: "🎉", label: "Eventos" },
            ].map(({ emoji, label }) => (
              <div
                key={label}
                className="bg-green-700/40 rounded-2xl p-4 text-center"
              >
                <p className="text-3xl mb-2">{emoji}</p>
                <p className="text-sm font-medium text-green-100">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. RESEÑAS ── */}
      <HomeReviews reviews={recentReviews} />

      {/* ── 10. NEWSLETTER ── */}
      <Newsletter />
    </div>
  );
}

// import Link from "next/link";
// import { ArrowRight, Leaf, Truck, Shield, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import SponsorsCarousel from "@/components/layout/SponsorsCarousel";
// import HeroCarousel from "@/components/layout/HeroCarousel"; // <-- Nuevo import

// export default function HomePage() {
//   return (
//     <div>
//       {/* Hero Adaptado a 2 Columnas */}
//       <section className="relative bg-linear-to-br from-green-50 dark:from-green-950 via-emerald-50 to-teal-600 px-4 min-h-screen md:h-screen flex items-center py-12 md:py-0">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
//           {/* Columna Izquierda: Textos y Acciones */}
//           <div className="text-center md:text-left flex flex-col items-center md:items-start">
//             <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
//               <Leaf className="size-4" />
//               Vivero artesanal venezolano
//             </div>
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
//               Lleva la naturaleza
//               <br />
//               <span className="text-green-600 dark:text-green-900">
//                 a tu hogar
//               </span>
//             </h1>
//             <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
//               Plantas seleccionadas con amor, árboles frutales, cactus,
//               suculentas y todo lo que necesitas para tu jardín. Envíos a toda
//               Venezuela.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
//               <Link href="/catalogo">
//                 <Button
//                   size="lg"
//                   className="bg-green-600 hover:bg-green-700 text-white gap-2 w-full sm:w-auto"
//                 >
//                   Ver catálogo completo
//                   <ArrowRight className="w-4 h-4" />
//                 </Button>
//               </Link>
//               <Link href="/catalogo?categoria=cactus-suculentas">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-green-600 text-green-700 hover:bg-green-50 w-full sm:w-auto"
//                 >
//                   Cactus y Suculentas
//                 </Button>
//               </Link>
//             </div>
//           </div>

//           {/* Columna Derecha: El Carrusel */}
//           <div className="w-full order-first md:order-last">
//             <HeroCarousel />
//           </div>
//         </div>
//       </section>

//       {/* El resto de tus secciones de Beneficios, Sponsors y CTA quedan exactamente igual... */}
//       {/* Beneficios */}
//       <section className="py-16 px-4 bg-white dark:bg-gray-900">
//         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//           <div className="flex flex-col items-center gap-3">
//             <div className="size-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//               <Leaf className="size-6 text-green-600 dark:text-green-400" />
//             </div>
//             <h3 className="font-semibold text-gray-900 dark:text-gray-300">
//               Plantas saludables
//             </h3>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Cultivadas y seleccionadas directamente en nuestro vivero con los
//               más altos estándares.
//             </p>
//           </div>
//           <div className="flex flex-col items-center gap-3">
//             <div className="size-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//               <Truck className="size-6 text-green-600 dark:text-green-400" />
//             </div>
//             <h3 className="font-semibold text-gray-900 dark:text-gray-300">
//               Envío seguro
//             </h3>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Empaque especial para plantas vivas. Envíos locales y nacionales
//               de accesorios.
//             </p>
//           </div>
//           <div className="flex flex-col items-center gap-3">
//             <div className="size-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//               <Shield className="size-6 text-green-600 dark:text-green-400" />
//             </div>
//             <h3 className="font-semibold text-gray-900 dark:text-gray-300">
//               Garantía de calidad
//             </h3>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Si tu planta llega en mal estado, la reponemos. Tu satisfacción es
//               nuestra prioridad.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section>
//         <SponsorsCarousel />
//       </section>

//       {/* CTA Paisajismo */}
//       <section className="py-16 px-4 bg-green-700 dark:bg-green-900 text-white text-center">
//         <div className="max-w-2xl mx-auto">
//           <Star className="size-10 mx-auto mb-4 text-green-300" />
//           <h2 className="text-3xl font-bold mb-4">
//             ¿Tienes un proyecto de paisajismo?
//           </h2>
//           <p className="text-green-200 mb-6">
//             Diseñamos y ejecutamos gardens para hogares y empresas. Cotiza tu
//             proyecto sin compromiso.
//           </p>
//           <Button
//             size="lg"
//             variant="outline"
//             className="border-white text-white bg-green-950 dark:bg-gray-800 hover:bg-green-600"
//           >
//             Solicitar cotización
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// }
