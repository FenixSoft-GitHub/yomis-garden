"use client";

import { useCartStore } from "@/lib/stores/cart.store";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

export default function CarritoPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-10 h-10 text-green-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Tu carrito está vacío
        </h1>
        <p className="text-gray-500 mb-8">
          Explora nuestro catálogo y encuentra la planta perfecta para tu hogar.
        </p>
        <Link href="/catalogo">
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Leaf className="w-4 h-4" />
            Ver catálogo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tu carrito</h1>
          <p className="text-gray-500 mt-1">
            {totalItems()} producto{totalItems() !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            clearCart();
            toast.info("Carrito vaciado");
          }}
          className="text-gray-400 hover:text-red-500 text-sm"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Vaciar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => {
            const price =
              Number(item.product.base_price) +
              (item.variant?.price_modifier ?? 0);
            const subtotal = price * item.quantity;
            const key = `${item.product.id}-${item.variant?.id ?? "base"}`;

            return (
              <div
                key={key}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-5"
              >
                {/* Imagen */}
                <Link href={`/producto/${item.product.slug}`}>
                  <div className="relative w-24 h-24 bg-linear-to-br from-green-50 to-emerald-100 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    {item.product.images?.[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="96px"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Leaf className="size-10 text-green-300" />
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/producto/${item.product.slug}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-green-700 transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      {item.variant && (
                        <p className="text-sm text-gray-500">
                          {item.variant.name}
                        </p>
                      )}
                      <p className="text-sm text-green-600 font-medium">
                        ${price.toFixed(2)} c/u
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        removeItem(item.product.id, item.variant?.id);
                        toast.info(`${item.product.name} eliminado`);
                      }}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Cantidad y subtotal */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.variant?.id,
                          )
                        }
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-green-400 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.variant?.id,
                          )
                        }
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-green-400 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen del pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 text-lg mb-5">
              Resumen del pedido
            </h2>

            <div className="flex flex-col gap-3 text-sm mb-5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems()} productos)</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-green-600">A calcular</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                <span>Total estimado</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
            </div>

            {/* Métodos de pago disponibles */}
            <div className="bg-gray-50 rounded-xl p-3 mb-5 text-xs text-gray-500">
              <p className="font-medium text-gray-700 mb-2">
                Métodos de pago aceptados
              </p>
              <div className="flex flex-wrap gap-2">
                {["💳 Stripe", "💸 Zelle", "📱 Pago Móvil"].map((m) => (
                  <span
                    key={m}
                    className="bg-white border border-gray-200 px-2 py-1 rounded-lg"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <Link href="/checkout">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                size="lg"
              >
                Proceder al pago
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link
              href="/catalogo"
              className="block text-center text-sm text-gray-400 hover:text-green-600 mt-4 transition-colors"
            >
              ← Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
