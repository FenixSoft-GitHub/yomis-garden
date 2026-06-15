import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import Link from "next/link";

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmado", color: "bg-blue-100 text-blue-700" },
  preparing: { label: "Preparando", color: "bg-purple-100 text-purple-700" },
  shipped: { label: "Enviado", color: "bg-indigo-100 text-indigo-700" },
  delivered: { label: "Entregado", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-700" },
};

export default async function MisPedidosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 rounded-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Mis pedidos
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {orders?.length ?? 0} pedidos realizados
        </p>
      </div>

      {orders?.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <div className="w-20 h-20 bg-green-50 dark:bg-green-950/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-green-300 dark:text-green-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-300 mb-4">
            Aún no tienes pedidos
          </p>
          <Link
            href="/catalogo"
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
          >
            Explorar catálogo →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders?.map((order) => {
            const status = statusConfig[order.status];
            return (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-mono font-semibold text-green-700 dark:text-green-400">
                      {order.order_number}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString("es-VE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${status?.color}`}
                    >
                      {status?.label}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${Number(order.total).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-2 border-t border-gray-300 dark:border-gray-800 pt-4">
                  {order.order_items?.map(
                    (item: {
                      id: string;
                      product_name: string;
                      quantity: number;
                      total_price: number;
                    }) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600 dark:text-gray-300">
                          {item.product_name} × {item.quantity}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${Number(item.total_price).toFixed(2)}
                        </span>
                      </div>
                    ),
                  )}
                </div>

                {/* Método de pago */}
                <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                  <span>
                    {order.payment_method === "zelle" && "💸 Zelle"}
                    {order.payment_method === "pago_movil" && "📱 Pago Móvil"}
                    {order.payment_method === "stripe" && "💳 Tarjeta"}
                    {order.payment_method === "efectivo" && "💵 Efectivo"}
                  </span>
                  <span
                    className={
                      order.payment_status === "paid"
                        ? "text-green-600 dark:text-green-400 font-medium"
                        : "text-yellow-600 dark:text-yellow-400 font-medium"
                    }
                  >
                    {order.payment_status === "paid"
                      ? "✓ Pagado"
                      : "Pago pendiente"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
