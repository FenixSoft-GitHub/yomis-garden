"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Package } from "lucide-react";

const statusMessages: Record<string, { message: string; emoji: string }> = {
  confirmed: { message: "Tu pedido fue confirmado", emoji: "✅" },
  preparing: { message: "Estamos preparando tu pedido", emoji: "🌿" },
  shipped: { message: "Tu pedido está en camino", emoji: "🚚" },
  delivered: { message: "¡Tu pedido fue entregado!", emoji: "🎉" },
  cancelled: { message: "Tu pedido fue cancelado", emoji: "❌" },
};

export default function OrderNotifications() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
    };

    init();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();

    const channel = supabase
      .channel(`orders-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newStatus = payload.new.status as string;
          const orderNumber = payload.new.order_number as string;
          const config = statusMessages[newStatus];

          if (config) {
            toast(
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-950/30 rounded-lg flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {config.emoji} {config.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Pedido {orderNumber}
                  </p>
                </div>
              </div>,
              {
                duration: 6000,
                action: {
                  label: "Ver pedidos",
                  onClick: () => (window.location.href = "/mis-pedidos"),
                },
              },
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return null;
}
