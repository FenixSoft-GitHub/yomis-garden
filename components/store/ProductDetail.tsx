"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/stores/cart.store";
import type { Product, ProductVariant } from "@/lib/types";
import { toast } from "sonner";
import {
  ShoppingCart,
  Leaf,
  ChevronLeft,
  Plus,
  Minus,
  Truck,
  Shield,
  Droplets,
  Sun,
  PawPrint,
} from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import ImageZoom from "./ImageZoom";
import ShareButtons from "./ShareButtons";
import {
  LUZ_LABELS,
  RIEGO_LABELS,
  DIFICULTAD_LABELS,
} from "@/app/constants/botanicalFilters";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product.product_variants?.[0]);
  const addItem = useCartStore((s) => s.addItem);
  
  const attr = product.plant_attributes;
  const variants = product.product_variants ?? [];
  const images = product.images?.length ? product.images : [];
  const isOutOfStock = product.stock_quantity === 0;
  const isLowStock =
    product.stock_quantity <= product.low_stock_threshold && !isOutOfStock;
  const finalPrice =
    Number(product.base_price) + (selectedVariant?.price_modifier ?? 0);

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/producto/${product.slug}`
      : `/producto/${product.slug}`;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    toast.success(`${product.name} agregado al carrito 🌿`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link
          href="/catalogo"
          className="hover:text-green-700 dark:hover:text-green-400 flex items-center gap-1"
        >
          <ChevronLeft className="size-4" /> Catálogo
        </Link>
        <span>/</span>
        <Link
          href={`/catalogo?categoria=${product.category?.slug}`}
          className="hover:text-green-700 dark:hover:text-green-400"
        >
          {product.category?.name}
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium truncate max-w-48">
          {product.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galería con zoom */}
        <ImageZoom images={images} productName={product.name} />

        {/* Info */}
        <div className="flex flex-col gap-5">
          {/* Encabezado */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/catalogo?categoria=${product.category?.slug}`}
                className="text-sm text-green-600 font-medium hover:underline"
              >
                {product.category?.name}
              </Link>
              {product.is_featured && (
                <Badge className="bg-amber-500 text-white text-xs">
                  Destacado
                </Badge>
              )}
            </div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h1>
              <FavoriteButton productId={product.id} />
            </div>
          </div>

          {/* Precio */}
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              ${finalPrice.toFixed(2)}
            </span>
            {product.compare_price && (
              <span className="text-xl text-gray-400 line-through mb-1">
                ${Number(product.compare_price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock */}
          <div>
            {isOutOfStock ? (
              <Badge className="bg-red-100 text-red-700">Sin stock</Badge>
            ) : isLowStock ? (
              <Badge className="bg-orange-100 text-orange-700">
                ⚠️ Solo quedan {product.stock_quantity} unidades
              </Badge>
            ) : (
              <Badge className="bg-green-100 text-green-700">
                ✓ En stock ({product.stock_quantity} disponibles)
              </Badge>
            )}
          </div>

          {/* Variantes */}
          {variants.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Variante
              </p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                      selectedVariant?.id === v.id
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-200 text-gray-700 dark:text-gray-300 hover:border-green-400"
                    }`}
                  >
                    {v.name}
                    {v.price_modifier !== 0 && (
                      <span className="ml-1 text-xs opacity-75">
                        {v.price_modifier > 0 ? "+" : ""}$
                        {v.price_modifier.toFixed(2)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cantidad
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="size-10 rounded-xl border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:border-green-400 transition-colors"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center font-semibold text-lg text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock_quantity, quantity + 1))
                }
                className="size-10 rounded-xl border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:border-green-400 transition-colors text-gray-700 dark:text-gray-300"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          {/* Botón agregar */}
          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="bg-green-600 hover:bg-green-700 text-white gap-2 w-full"
          >
            <ShoppingCart className="size-5" />
            {isOutOfStock ? "Sin stock" : "Agregar al carrito"}
          </Button>

          {/* Compartir */}
          <ShareButtons
            productName={product.name}
            productUrl={productUrl}
            price={finalPrice}
          />

          {/* Atributos botánicos */}
          {attr && (
            <div className="bg-green-50 dark:bg-green-950/30 rounded-2xl p-5 grid grid-cols-2 gap-4">
              <h3 className="col-span-2 font-semibold text-gray-900 dark:text-gray-300 text-sm">
                Cuidados
              </h3>
              {attr.light_requirement && (
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Sun className="size-4 text-yellow-500" />
                  {LUZ_LABELS[attr.light_requirement]}
                </div>
              )}
              {attr.water_frequency && (
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Droplets className="size-4 text-blue-500" />
                  {RIEGO_LABELS[attr.water_frequency]}
                </div>
              )}
              {attr.care_difficulty && (
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Leaf className="size-4 text-green-500" />
                  {DIFICULTAD_LABELS[attr.care_difficulty]}
                </div>
              )}
              {attr.is_pet_friendly !== null && (
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <PawPrint className="size-4 text-blue-500" />
                  {attr.is_pet_friendly
                    ? "🐾 Apto para mascotas"
                    : "⚠️ No apto mascotas"}
                </div>
              )}
              {attr.mature_height_cm && (
                <div className="flex items-center gap-2 text-sm text-gray-700 col-span-2 dark:text-gray-300">
                  <span className="text-green-600">↕</span>
                  Altura adulta: {attr.mature_height_cm} cm
                </div>
              )}
            </div>
          )}

          {/* Descripción */}
          {product.description && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Descripción
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Garantías */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <Truck className="size-4 text-green-600 shrink-0" />
              {product.is_perishable
                ? "Envío local con empaque especial para plantas vivas"
                : "Envío nacional disponible"}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="size-4 text-green-600 shrink-0" />
              Garantía de calidad — si llega en mal estado lo reponemos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
