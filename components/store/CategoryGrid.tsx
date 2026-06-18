import Link from "next/link";
import Image from "next/image";
import { categories } from "@/app/constants/categories";

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
          {categories.map(({ name, slug, image, desc }) => (
            <Link
              key={slug}
              href={`/catalogo?categoria=${slug}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative size-32 rounded-2xl aspect-square overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={image}
                  alt={`Categoría ${name}`}
                  fill
                  sizes="(max-width: 640px) 128px, 128px" 
                  className="object-cover object-center transition-transform duration-500"
                  priority={slug === "arboles"}
                />
              </div>

              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                  {name}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
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
