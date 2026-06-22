"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Leaf,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/stores/cart.store";
import {
  checkoutSchema,
  type CheckoutFormData,
} from "@/lib/schemas/checkout.schema";
import { createOrder } from "@/app/actions/orders";
import { toast } from "sonner";
import Image from "next/image";
import { estadosVenezuela } from "@/app/constants/estadosVenezuela";
import { paymentMethods } from "@/app/constants/paymentMethods";
import StripeCheckoutButton from "./StripeCheckoutButton";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [stripeOrder, setStripeOrder] = useState<{
    orderId: string;
    orderNumber: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { payment_method: "zelle" },
  });

  const paymentMethod = useWatch({
    control,
    name: "payment_method",
  });
  
  const customerEmail = useWatch({
    control,
    name: "email",
  });

  if (totalItems() === 0) {
    router.replace("/catalogo");
    return null;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    try {
      const result = await createOrder(data, items);
      if (!result.success) {
        toast.error(result.error ?? "Error al procesar el pedido");
        return;
      }
      // Si el método es Stripe, mostrar botón de pago
      if (data.payment_method === "stripe") {
        setStripeOrder({
          orderId: result.orderId!,
          orderNumber: result.orderNumber!,
        });
        setLoading(false);
        return;
      }

      clearCart();
      toast.success("¡Pedido creado exitosamente! 🌿");
      router.push(`/pedido-confirmado?order=${result.orderNumber}`);
    } catch (e) {
      console.error(e);
      toast.error("Error inesperado. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda — Formulario */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Datos personales */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <span className="size-6 bg-green-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                1
              </span>
              Datos personales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="full_name">Nombre completo</Label>
                <Input
                  id="full_name"
                  placeholder="Juan Pérez"
                  className="mt-1"
                  {...register("full_name")}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.full_name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="juan@email.com"
                  className="mt-1"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  placeholder="0414-1234567"
                  className="mt-1"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Dirección de envío */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <span className="size-6 bg-green-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                2
              </span>
              Dirección de envío
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="address_line1">Dirección</Label>
                <Input
                  id="address_line1"
                  placeholder="Av. Principal, Casa #5"
                  className="mt-1"
                  {...register("address_line1")}
                />
                {errors.address_line1 && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address_line1.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address_line2">Referencia (opcional)</Label>
                <Input
                  id="address_line2"
                  placeholder="Frente al parque, edificio azul"
                  className="mt-1"
                  {...register("address_line2")}
                />
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  placeholder="Caracas"
                  className="mt-1"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="state">Estado</Label>
                <select
                  id="state"
                  className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("state")}
                >
                  <option value="">Selecciona un estado</option>
                  {estadosVenezuela.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Método de pago */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <span className="size-6 bg-green-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                3
              </span>
              Método de pago
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {paymentMethods.map(({ value, label, icon: Icon, desc }) => (
                <label
                  key={value}
                  className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col gap-1 transition-colors ${
                    paymentMethod === value
                      ? "border-green-600 bg-green-50 dark:bg-gray-800"
                      : "border-gray-200 hover:border-green-300 dark:border-gray-700 dark:hover:border-green-500"
                  }`}
                >
                  <input
                    type="radio"
                    value={value}
                    className="sr-only"
                    {...register("payment_method")}
                  />
                  <Icon
                    className={`size-5 ${paymentMethod === value ? "text-green-600" : "text-gray-400"}`}
                  />
                  <span className="font-medium text-sm text-gray-900 dark:text-white">
                    {label}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {desc}
                  </span>
                </label>
              ))}
            </div>

            {/* Instrucciones según método */}
            {paymentMethod === "zelle" && (
              <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-200 border border-gray-300 dark:border-gray-600">
                <p className="font-medium mb-1">Datos para Zelle</p>
                <p>📧 pagos@yomisgarden.com</p>
                <p className="text-xs mt-2 text-blue-600">
                  Incluye tu número de pedido como referencia
                </p>
              </div>
            )}
            {paymentMethod === "pago_movil" && (
              <div className="bg-orange-50 dark:bg-gray-800  rounded-xl p-4 text-sm text-orange-800 dark:text-orange-200 border border-gray-300 dark:border-gray-600">
                <p className="font-medium mb-1">Datos para Pago Móvil</p>
                <p>🏦 Banco: Banesco • V-10300337</p>
                <p>📱 Teléfono: 0414-7682761</p>
              </div>
            )}
            {paymentMethod === "stripe" && (
              <div className="bg-purple-50 dark:bg-gray-800 rounded-xl p-4 text-sm text-purple-800 dark:text-purple-300 border border-gray-300 dark:border-gray-600">
                <p className="font-medium mb-1">Pago con tarjeta</p>
                <p>
                  Serás redirigido a la pasarela segura de Stripe para completar
                  el pago.
                </p>
              </div>
            )}

            {/* Referencia de pago */}
            {(paymentMethod === "zelle" || paymentMethod === "pago_movil") && (
              <div className="mt-4">
                <Label htmlFor="payment_reference">
                  Referencia del pago (opcional)
                </Label>
                <Input
                  id="payment_reference"
                  placeholder="Número de confirmación de la transferencia"
                  className="mt-1"
                  {...register("payment_reference")}
                />
              </div>
            )}
          </div>

          {/* Notas */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="size-6 bg-green-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                4
              </span>
              Notas del pedido (opcional)
            </h2>
            <textarea
              placeholder="Instrucciones especiales, horario de entrega preferido..."
              rows={3}
              className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              {...register("notes")}
            />
          </div>
        </div>

        {/* Columna derecha — Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-5 flex items-center gap-2">
              <ShoppingCart className="size-5 text-green-600" />
              Tu pedido
            </h2>

            {/* Items */}
            <div className="flex flex-col gap-3 mb-5">
              {items.map((item) => {
                const price =
                  Number(item.product.base_price) +
                  (item.variant?.price_modifier ?? 0);
                return (
                  <div
                    key={`${item.product.id}-${item.variant?.id}`}
                    className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                  >
                    <div className="relative size-12 bg-green-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                      {item.product.images?.[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Leaf className="size-6 text-green-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.product.name}
                      </p>
                      {item.variant && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.variant.name}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        x{item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white shrink-0">
                      ${(price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Totales */}
            <div className="border-t border-gray-300 dark:border-gray-600 pt-4 flex flex-col gap-2 text-sm mb-5">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Envío</span>
                <span className="text-green-600">A coordinar</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-2 border-t border-gray-300 dark:border-gray-600">
                <span>Total</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>Confirmar pedido</>
              )}
            </Button>

            {stripeOrder && paymentMethod === "stripe" && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3">
                  Tu pedido fue creado. Completa el pago:
                </p>
                <StripeCheckoutButton
                  items={items}
                  customerEmail={customerEmail}
                  orderId={stripeOrder.orderId}
                  orderNumber={stripeOrder.orderNumber}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
