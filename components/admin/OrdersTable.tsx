"use client";

import React, { useState } from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { ChevronDown, Eye } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { Order } from "@/lib/types";
import { OrderItemRow } from "@/lib/types/admin";

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: {
    label: "Pendiente",
    color: "bg-yellow-900 text-yellow-400 border-yellow-800",
  },
  confirmed: {
    label: "Confirmado",
    color: "bg-blue-900 text-blue-400 border-blue-800",
  },
  preparing: {
    label: "Preparando",
    color: "bg-purple-900 text-purple-400 border-purple-800",
  },
  shipped: {
    label: "Enviado",
    color: "bg-indigo-900 text-indigo-400 border-indigo-800",
  },
  delivered: {
    label: "Entregado",
    color: "bg-green-900 text-green-400 border-green-800",
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-900 text-red-400 border-red-800",
  },
};

const paymentConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "text-yellow-400" },
  paid: { label: "Pagado", color: "text-green-400" },
  failed: { label: "Fallido", color: "text-red-400" },
  refunded: { label: "Reembolso", color: "text-gray-400" },
};

const paymentMethodLabel: Record<string, string> = {
  zelle: "💸 Zelle",
  pago_movil: "📱 Pago Móvil",
  stripe: "💳 Tarjeta",
  efectivo: "💵 Efectivo",
};

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({
  orders: initialOrders,
}: OrdersTableProps) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const updateOrderStatus = async (
    orderId: string,
    field: "status" | "payment_status",
    value: string,
  ) => {
    setUpdating(orderId);

    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, field, value }),
    });

    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, [field]: value } : o)),
      );
      toast.success("Estado actualizado");
    } else {
      const err = await res.json();
      console.log("Error response:", err); // ← agrega este log
      toast.error("Error al actualizar");
    }
    setUpdating(null);
  };

  if (orders.length === 0) {
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-12 text-center">
        <p className="text-gray-400">No hay pedidos aún</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Pedido
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Cliente
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Total
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Pago
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Estado pago
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Estado pedido
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                Fecha
              </th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const address = order.shipping_address as Record<
                string,
                string
              > | null;
              const isExpanded = expandedOrder === order.id;

              return (
                <React.Fragment key={order.id}>
                  <tr
                    key={order.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    {/* Número de pedido */}
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-mono text-sm font-medium">
                        {order.order_number}
                      </span>
                    </td>

                    {/* Cliente */}
                    <td className="px-6 py-4">
                      <p className="text-white text-sm">
                        {address?.full_name ?? "—"}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {address?.email ?? "—"}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {address?.phone ?? "—"}
                      </p>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4">
                      <span className="text-white font-semibold">
                        ${Number(order.total).toFixed(2)}
                      </span>
                    </td>

                    {/* Método de pago */}
                    <td className="px-6 py-4">
                      <span className="text-gray-300 text-sm">
                        {paymentMethodLabel[order.payment_method ?? ""] ?? "—"}
                      </span>
                      {order.payment_reference && (
                        <p className="text-gray-500 text-xs mt-0.5">
                          Ref: {order.payment_reference}
                        </p>
                      )}
                    </td>

                    {/* Estado de pago */}
                    <td className="px-6 py-4">
                      <select
                        value={order.payment_status}
                        disabled={updating === order.id}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.id,
                            "payment_status",
                            e.target.value,
                          )
                        }
                        className={`text-xs font-medium px-2 py-1 rounded-lg border bg-transparent cursor-pointer ${paymentConfig[order.payment_status]?.color} border-gray-700`}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="paid">Pagado</option>
                        <option value="failed">Fallido</option>
                        <option value="refunded">Reembolso</option>
                      </select>
                    </td>

                    {/* Estado del pedido */}
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        disabled={updating === order.id}
                        onChange={(e) =>
                          updateOrderStatus(order.id, "status", e.target.value)
                        }
                        className={`text-xs font-medium px-2 py-1 rounded-lg border bg-gray-900 cursor-pointer ${statusConfig[order.status]?.color} border-gray-700`}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="confirmed">Confirmado</option>
                        <option value="preparing">Preparando</option>
                        <option value="shipped">Enviado</option>
                        <option value="delivered">Entregado</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </td>

                    {/* Fecha */}
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-xs">
                        {new Date(order.created_at).toLocaleDateString(
                          "es-VE",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </td>

                    {/* Expandir */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          setExpandedOrder(isExpanded ? null : order.id)
                        }
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    </td>
                  </tr>

                  {/* Detalle expandido */}
                  {isExpanded && (
                    <tr key={`${order.id}-detail`} className="bg-gray-800/30">
                      <td colSpan={8} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Productos */}
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                              Productos
                            </p>
                            <div className="flex flex-col gap-2">
                              {(
                                (order.order_items as OrderItemRow[]) ?? []
                              ).map((item) => (
                                <div
                                  key={item.id}
                                  className="flex justify-between text-sm"
                                >
                                  <span className="text-gray-300">
                                    {item.product_name} × {item.quantity}
                                  </span>
                                  <span className="text-white font-medium">
                                    ${Number(item.total_price).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Dirección */}
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                              Dirección de envío
                            </p>
                            {address ? (
                              <div className="text-sm text-gray-300 flex flex-col gap-0.5">
                                <p>{address.address_line1}</p>
                                {address.address_line2 && (
                                  <p>{address.address_line2}</p>
                                )}
                                <p>
                                  {address.city}, {address.state}
                                </p>
                                <p>{address.country}</p>
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">
                                Sin dirección
                              </p>
                            )}
                            {order.notes && (
                              <div className="mt-3">
                                <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                  Notas
                                </p>
                                <p className="text-sm text-gray-300">
                                  {order.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
