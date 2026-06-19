"use client";

import { useCompareStore } from "@/lib/stores/compare.store";
import { Scale, Leaf, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/cart.store";
import { toast } from "sonner";
import Image from "next/image";
import {
  LUZ_LABELS,
  RIEGO_LABELS,
  DIFICULTAD_LABELS,
} from "@/app/constants/botanicalFilters";

export default function CompararPage() {
  const { products, removeProduct, clearAll } = useCompareStore();
  const addItem = useCartStore((s) => s.addItem);

  if (products.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="size-20 bg-blue-50 dark:bg-blue-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Scale className="size-10 text-blue-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          No hay productos para comparar
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Agrega 2 o 3 plantas desde el catálogo usando el ícono de balanza ⚖️
        </p>
        <Link href="/catalogo">
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Leaf className="size-4" />
            Ver catálogo
          </Button>
        </Link>
      </div>
    );
  }

  const rows = [
    { label: "Precio", key: "price" },
    { label: "Categoría", key: "category" },
    { label: "Luz requerida", key: "light" },
    { label: "Frecuencia de riego", key: "water" },
    { label: "Dificultad", key: "difficulty" },
    { label: "Pet friendly", key: "pet" },
    { label: "Interior/Exterior", key: "location" },
    { label: "Altura adulta", key: "height" },
    { label: "Stock disponible", key: "stock" },
  ];

  const getValue = (product: (typeof products)[0], key: string) => {
    const attr = product.plant_attributes;
    switch (key) {
      case "price":
        return `$${Number(product.base_price).toFixed(2)}`;
      case "category":
        return product.category?.name ?? "—";
      case "light":
        return attr?.light_requirement ? LUZ_LABELS[attr.light_requirement] : "—";
      case "water":
        return attr?.water_frequency ? RIEGO_LABELS[attr.water_frequency] : "—";
      case "difficulty":
        return attr?.care_difficulty
          ? DIFICULTAD_LABELS[attr.care_difficulty]
          : "—";
      case "pet":
        return attr?.is_pet_friendly ? "🐾 Sí" : "⚠️ No";
      case "location":
        return attr?.is_indoor && attr?.is_outdoor
          ? "Ambos"
          : attr?.is_indoor
            ? "Interior"
            : attr?.is_outdoor
              ? "Exterior"
              : "—";
      case "height":
        return attr?.mature_height_cm ? `${attr.mature_height_cm} cm` : "—";
      case "stock":
        return `${product.stock_quantity} unidades`;
      default:
        return "—";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Scale className="size-7 text-green-600" />
            Comparar plantas
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {products.length} producto{products.length !== 1 ? "s" : ""} en
            comparación
          </p>
        </div>
        <Button variant="ghost" onClick={clearAll} className="text-gray-400">
          Limpiar todo
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-40"></th>
              {products.map((product) => (
                <th key={product.id} className="p-4 min-w-48">
                  <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                    <div className="relative w-full aspect-square bg-linear-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={`Fotografía de ${product.name}`}
                          fill
                          sizes="(max-w-640px) 50vw, (max-w-1024px) 33vw, 25vw"
                          className="object-cover"
                        />
                      ) : (
                        <Leaf className="size-12 text-green-300" />
                      )}
                    </div>
                    <Link href={`/producto/${product.slug}`}>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm hover:text-green-700 dark:hover:text-green-400 transition-colors">
                        {product.name}
                      </p>
                    </Link>
                    <Button
                      size="sm"
                      onClick={() => {
                        addItem(product);
                        toast.success(`${product.name} agregado al carrito 🌿`);
                      }}
                      className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white gap-2 text-xs"
                    >
                      <ShoppingCart className="size-3" />
                      Agregar
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.key}
                className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/50" : ""}
              >
                <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {row.label}
                </td>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="p-4 text-center text-sm text-gray-900 dark:text-white font-medium"
                  >
                    {getValue(product, row.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
