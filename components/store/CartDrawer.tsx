"use client";

import { useCartStore } from "@/lib/stores/cart.store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ShoppingCart,
  Plus,
  Minus,
  Leaf,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0 bg-white dark:bg-gray-900"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <ShoppingCart className="size-5 text-green-600" />
              Tu carrito
              {totalItems() > 0 && (
                <span className="bg-green-600 text-white text-xs rounded-full size-5 flex items-center justify-center font-bold">
                  {totalItems()}
                </span>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="size-20 bg-green-50 dark:bg-green-950/30 rounded-full flex items-center justify-center">
                <ShoppingCart className="size-10 text-green-300" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                  Tu carrito está vacío
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Agrega plantas y productos para comenzar
                </p>
              </div>
              <Button
                onClick={closeCart}
                className="bg-green-600 hover:bg-green-700 text-white gap-2 mt-2"
                asChild
              >
                <Link href="/catalogo">
                  <Leaf className="size-4" />
                  Ver catálogo
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => {
                const price =
                  Number(item.product.base_price) +
                  (item.variant?.price_modifier ?? 0);
                const key = `${item.product.id}-${item.variant?.id ?? "base"}`;

                return (
                  <div
                    key={key}
                    className="flex gap-3 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0"
                  >
                    {/* Imagen */}
                    <Link
                      href={`/producto/${item.product.slug}`}
                      onClick={closeCart}
                      className="shrink-0"
                    >
                      <div className="relative size-16 bg-linear-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 rounded-xl overflow-hidden flex items-center justify-center">
                        {item.product.images?.[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <Leaf className="size-8 text-green-300" />
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/producto/${item.product.slug}`}
                            onClick={closeCart}
                          >
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate hover:text-green-700 dark:hover:text-green-400 transition-colors">
                              {item.product.name}
                            </p>
                          </Link>
                          {item.variant && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.variant.name}
                            </p>
                          )}
                          <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-0.5">
                            ${price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            removeItem(item.product.id, item.variant?.id);
                            toast.info(`${item.product.name} eliminado`);
                          }}
                          className="text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors p-1 shrink-0"
                        >
                          <X className="size-4" />
                        </button>
                      </div>

                      {/* Cantidad */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.variant?.id,
                              )
                            }
                            className="size-7 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-green-400 transition-colors"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-gray-900 dark:text-white">
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
                            className="size-7 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-green-400 transition-colors"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Subtotal ({totalItems()} productos)
              </span>
              <span className="font-bold text-gray-900 dark:text-white text-lg">
                ${totalPrice().toFixed(2)}
              </span>
            </div>

            {/* Botones */}
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
              size="lg"
              asChild
              onClick={closeCart}
            >
              <Link href="/checkout">
                Proceder al pago
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
              onClick={closeCart}
              asChild
            >
              <Link href="/carrito">Ver carrito completo</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
