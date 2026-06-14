"use client";

import Link from "next/link";
import { ShoppingCart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/stores/cart.store";
import type { Product } from "@/lib/types";
import { toast } from "sonner";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const luzLabel: Record<string, string> = {
  sol_directo: "☀️ Sol directo",
  sol_parcial: "⛅ Sol parcial",
  sombra: "🌥️ Sombra",
  interior: "🏠 Interior",
};

const riegoLabel: Record<string, string> = {
  diario: "💧 Diario",
  cada_2_dias: "💧 C/2 días",
  semanal: "💧 Semanal",
  quincenal: "💧 Quincenal",
  mensual: "💧 Mensual",
};

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} agregado al carrito 🌿`);
  };

  const isLowStock = product.stock_quantity <= product.low_stock_threshold;
  const isOutOfStock = product.stock_quantity === 0;
  const attr = product.plant_attributes;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      {/* Imagen */}
      <Link
        href={`/producto/${product.slug}`}
        className="relative block aspect-square bg-linear-to-br from-green-50 to-emerald-200 overflow-hidden"
      >
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Leaf className="size-16 text-green-300" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.is_featured && (
            <Badge className="bg-amber-500 text-white text-xs">Destacado</Badge>
          )}
          {isLowStock && !isOutOfStock && (
            <Badge className="bg-orange-500 text-white text-xs">
              Pocas unidades
            </Badge>
          )}
          {isOutOfStock && (
            <Badge className="bg-red-500 text-white text-xs">Agotado</Badge>
          )}
          {attr?.is_pet_friendly && (
            <Badge className="bg-blue-500 text-white text-xs">
              🐾 Pet friendly
            </Badge>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs text-green-600 font-medium mb-1">
            {product.category?.name}
          </p>
          <Link href={`/producto/${product.slug}`}>
            <h3 className="font-semibold text-gray-900 hover:text-green-700 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Atributos botánicos */}
        {attr && (
          <div className="flex flex-wrap gap-1">
            {attr.light_requirement && (
              <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">
                {luzLabel[attr.light_requirement]}
              </span>
            )}
            {attr.water_frequency && (
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                {riegoLabel[attr.water_frequency]}
              </span>
            )}
          </div>
        )}

        {/* Precio y acción */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ${Number(product.base_price).toFixed(2)}
            </span>
            {product.compare_price && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${Number(product.compare_price).toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
