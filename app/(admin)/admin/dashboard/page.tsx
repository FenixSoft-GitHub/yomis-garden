import { createAdminClient } from "@/lib/supabase/admin";
import {
  ShoppingBag,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = createAdminClient();

  // Métricas en paralelo
  const [
    { count: totalOrders },
    { count: pendingOrders },
    { data: recentOrders },
    { data: lowStockProducts },
    { data: salesData },
  ] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("products")
      .select("name, stock_quantity, low_stock_threshold")
      .lte("stock_quantity", 5)
      .eq("is_active", true)
      .order("stock_quantity"),
    supabase
      .from("orders")
      .select("total, created_at")
      .eq("payment_status", "paid"),
  ]);

  const totalRevenue =
    salesData?.reduce((sum, o) => sum + Number(o.total), 0) ?? 0;
  const totalProducts = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  const metrics = [
    {
      label: "Total pedidos",
      value: totalOrders ?? 0,
      icon: ShoppingBag,
      color: "text-blue-400",
      bg: "bg-blue-950 border-blue-800",
    },
    {
      label: "Pedidos pendientes",
      value: pendingOrders ?? 0,
      icon: Clock,
      color: "text-orange-400",
      bg: "bg-orange-950 border-orange-800",
    },
    {
      label: "Productos activos",
      value: totalProducts.count ?? 0,
      icon: Package,
      color: "text-green-400",
      bg: "bg-green-950 border-green-800",
    },
    {
      label: "Ingresos totales",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-950 border-emerald-800",
    },
  ];

  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: "Pendiente", color: "bg-yellow-900 text-yellow-400" },
    confirmed: { label: "Confirmado", color: "bg-blue-900 text-blue-400" },
    preparing: { label: "Preparando", color: "bg-purple-900 text-purple-400" },
    shipped: { label: "Enviado", color: "bg-indigo-900 text-indigo-400" },
    delivered: { label: "Entregado", color: "bg-green-900 text-green-400" },
    cancelled: { label: "Cancelado", color: "bg-red-900 text-red-400" },
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Resumen general de Yomi&apos;s Garden
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-2xl border p-5 ${bg}`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-sm">{label}</p>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Pedidos recientes */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Pedidos recientes
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {recentOrders?.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                No hay pedidos aún
              </p>
            )}
            {recentOrders?.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
              >
                <div>
                  <p className="text-white text-sm font-medium">
                    {order.order_number}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {new Date(order.created_at).toLocaleDateString("es-VE", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-lg font-medium ${statusLabels[order.status]?.color}`}
                  >
                    {statusLabels[order.status]?.label}
                  </span>
                  <span className="text-green-400 font-semibold text-sm">
                    ${Number(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas de stock */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              Alertas de stock
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {lowStockProducts?.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                ✅ Todo el inventario está en buen estado
              </p>
            )}
            {lowStockProducts?.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
              >
                <p className="text-white text-sm">{product.name}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-lg font-medium ${
                    product.stock_quantity === 0
                      ? "bg-red-900 text-red-400"
                      : "bg-orange-900 text-orange-400"
                  }`}
                >
                  {product.stock_quantity === 0
                    ? "Agotado"
                    : `${product.stock_quantity} uds`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
