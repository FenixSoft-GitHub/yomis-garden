"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/stores/cart.store";
import type { Product, ProductVariant } from "@/lib/types";
import { toast } from "sonner";
import Image from "next/image";
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

const luzLabel: Record<string, string> = {
  sol_directo: "☀️ Sol directo",
  sol_parcial: "⛅ Sol parcial",
  sombra: "🌥️ Sombra",
  interior: "🏠 Interior",
};

const riegoLabel: Record<string, string> = {
  diario: "💧 Diario",
  cada_2_dias: "💧 Cada 2 días",
  semanal: "💧 Semanal",
  quincenal: "💧 Quincenal",
  mensual: "💧 Mensual",
};

const dificultadLabel: Record<string, string> = {
  facil: "🟢 Fácil",
  moderado: "🟡 Moderado",
  experto: "🔴 Experto",
};

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product.product_variants?.[0]);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  const attr = product.plant_attributes;
  const variants = product.product_variants ?? [];
  const images = product.images?.length ? product.images : [];
  const isOutOfStock = product.stock_quantity === 0;
  const isLowStock =
    product.stock_quantity <= product.low_stock_threshold && !isOutOfStock;

  const finalPrice =
    Number(product.base_price) + (selectedVariant?.price_modifier ?? 0);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    toast.success(`${product.name} agregado al carrito 🌿`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link
          href="/catalogo"
          className="hover:text-green-700 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Catálogo
        </Link>
        <span>/</span>
        <Link
          href={`/catalogo?categoria=${product.category?.slug}`}
          className="hover:text-green-700"
        >
          {product.category?.name}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galería */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square bg-linear-to-br from-green-50 to-emerald-100 rounded-2xl overflow-hidden flex items-center justify-center">
            {images.length > 0 ? (
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover p-4 object-center"
              />
            ) : (
              <Leaf className="w-32 h-32 text-green-300" />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImage === i
                      ? "border-green-600 scale-95"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${i + 1} de ${product.name}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
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
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          </div>

          {/* Precio */}
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900">
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
              <p className="text-sm font-medium text-gray-700 mb-2">Variante</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                      selectedVariant?.id === v.id
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-200 text-gray-700 hover:border-green-400"
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
            <p className="text-sm font-medium text-gray-700 mb-2">Cantidad</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:border-green-400 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-semibold text-lg">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock_quantity, quantity + 1))
                }
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:border-green-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
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
            <ShoppingCart className="w-5 h-5" />
            {isOutOfStock ? "Sin stock" : "Agregar al carrito"}
          </Button>

          {/* Atributos botánicos */}
          {attr && (
            <div className="bg-green-50 rounded-2xl p-5 grid grid-cols-2 gap-4">
              <h3 className="col-span-2 font-semibold text-gray-900 text-sm">
                Cuidados
              </h3>
              {attr.light_requirement && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  {luzLabel[attr.light_requirement]}
                </div>
              )}
              {attr.water_frequency && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  {riegoLabel[attr.water_frequency]}
                </div>
              )}
              {attr.care_difficulty && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Leaf className="w-4 h-4 text-green-500" />
                  {dificultadLabel[attr.care_difficulty]}
                </div>
              )}
              {attr.is_pet_friendly !== null && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <PawPrint className="w-4 h-4 text-blue-500" />
                  {attr.is_pet_friendly
                    ? "🐾 Pet friendly"
                    : "⚠️ No apto mascotas"}
                </div>
              )}
              {attr.mature_height_cm && (
                <div className="flex items-center gap-2 text-sm text-gray-700 col-span-2">
                  <span className="text-green-600">↕</span>
                  Altura adulta: {attr.mature_height_cm} cm
                </div>
              )}
            </div>
          )}

          {/* Descripción */}
          {product.description && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Garantías */}
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="w-4 h-4 text-green-600 shrink-0" />
              {product.is_perishable
                ? "Envío local con empaque especial para plantas vivas"
                : "Envío nacional disponible"}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600 shrink-0" />
              Garantía de calidad — si llega en mal estado lo reponemos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
