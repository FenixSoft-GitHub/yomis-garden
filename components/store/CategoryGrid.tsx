import Link from "next/link";
import { Leaf } from "lucide-react";

const categories = [
  {
    name: "Árboles",
    slug: "arboles",
    emoji: "🌳",
    desc: "Frutales y ornamentales",
    color: "from-emerald-400 to-green-600",
    image: null,
  },
  {
    name: "Ornamentales",
    slug: "ornamentales",
    emoji: "🌸",
    desc: "Flores y follaje decorativo",
    color: "from-pink-400 to-rose-600",
    image: null,
  },
  {
    name: "Cactus y Suculentas",
    slug: "cactus-suculentas",
    emoji: "🌵",
    desc: "Bajo mantenimiento",
    color: "from-amber-400 to-orange-600",
    image: null,
  },
  {
    name: "Macetas",
    slug: "macetas",
    emoji: "🪴",
    desc: "Porrones y accesorios",
    color: "from-stone-400 to-amber-700",
    image: null,
  },
  {
    name: "Sustratos",
    slug: "sustratos",
    emoji: "🌱",
    desc: "Tierra y nutrientes",
    color: "from-lime-400 to-green-700",
    image: null,
  },
  {
    name: "Herramientas",
    slug: "herramientas",
    emoji: "🛠️",
    desc: "Todo para jardinería",
    color: "from-blue-400 to-indigo-600",
    image: null,
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Explora por categoría
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Encuentra exactamente lo que buscas para tu espacio verde
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ name, slug, emoji, desc, color }) => (
            <Link
              key={slug}
              href={`/catalogo?categoria=${slug}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}
              >
                {emoji}
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                  {name}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
