"use client";

import { useCompareStore } from "@/lib/stores/compare.store";
import { Scale, X, ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function CompareBar() {
  const { products, removeProduct, clearAll } = useCompareStore();

  if (products.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <Scale className="size-5 text-blue-600" />
            <span className="font-semibold text-gray-900 dark:text-white text-sm hidden sm:inline">
              Comparar ({products.length}/3)
            </span>
          </div>
          <div className="flex gap-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl pl-2 pr-1 py-1 shrink-0"
              >
                <div className="relative size-12 bg-green-50 dark:bg-green-950/30 rounded-lg overflow-hidden shrink-0">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name || "Miniatura del producto"} 
                      fill
                      sizes="32px" 
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Leaf className="size-4 text-green-300" />
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-700 dark:text-gray-300 max-w-20 truncate hidden sm:inline">
                  {product.name}
                </span>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-gray-400 text-xs hidden sm:flex"
          >
            Limpiar
          </Button>
          <Link href="/comparar">
            <Button
              size="sm"
              disabled={products.length < 2}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
            >
              Comparar
              <ArrowRight className="size-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
