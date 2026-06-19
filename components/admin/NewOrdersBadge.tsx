"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

export default function NewOrdersBadge() {
  const [newOrders, setNewOrders] = useState(0);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("admin-new-orders")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          const order = payload.new;
          setNewOrders((prev) => prev + 1);
          toast(
            <div className="flex items-start gap-3">
              <div className="size-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  🛍️ Nuevo pedido recibido
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {order.order_number} — ${Number(order.total).toFixed(2)}
                </p>
              </div>
            </div>,
            {
              duration: 8000,
              action: {
                label: "Ver pedidos",
                onClick: () => (window.location.href = "/admin/pedidos"),
              },
            },
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (newOrders === 0) return null;

  return (
    <button
      onClick={() => {
        setNewOrders(0);
        window.location.href = "/admin/pedidos";
      }}
      className="flex items-center gap-2 bg-blue-950 border border-blue-800 text-blue-400 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-900 transition-colors"
    >
      <ShoppingBag className="size-3" />
      {newOrders} nuevo{newOrders > 1 ? "s" : ""} pedido
      {newOrders > 1 ? "s" : ""}
    </button>
  );
}
