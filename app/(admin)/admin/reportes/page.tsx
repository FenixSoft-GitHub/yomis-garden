import { createAdminClient } from '@/lib/supabase/admin'
import ReportesCharts from '@/components/admin/ReportesCharts'
import { DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react'

export default async function ReportesPage() {
  const supabase = createAdminClient()

  const [
    { data: orders },
    { data: topProducts },
    { data: ordersByStatus },
  ] = await Promise.all([
    // Todos los pedidos con total y fecha
    supabase
      .from('orders')
      .select('id, total, status, payment_status, created_at')
      .order('created_at', { ascending: true }),

    // Top productos más vendidos
    supabase
      .from('order_items')
      .select('product_name, quantity, total_price')
      .order('quantity', { ascending: false })
      .limit(5),

    // Pedidos agrupados por estado
    supabase
      .from('orders')
      .select('status'),
  ])

  // Ventas por mes
  const salesByMonth = (orders ?? []).reduce<Record<string, number>>((acc, order) => {
    const month = new Date(order.created_at).toLocaleDateString('es-VE', {
      month: 'short',
      year: '2-digit',
    })
    acc[month] = (acc[month] ?? 0) + Number(order.total)
    return acc
  }, {})

  const salesChartData = Object.entries(salesByMonth).map(([month, total]) => ({
    month,
    total: Number(total.toFixed(2)),
  }))

  // Pedidos por estado
  const statusCount = (ordersByStatus ?? []).reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1
    return acc
  }, {})

  const statusChartData = Object.entries(statusCount).map(([status, count]) => ({
    status,
    count,
  }))

  // Top productos
  type ProductMap = Record<string, { quantity: number; revenue: number }>;
  const productMap = (topProducts ?? []).reduce<ProductMap>((acc, item) => {
    if (!acc[item.product_name]) {
      acc[item.product_name] = { quantity: 0, revenue: 0 };
    }
    acc[item.product_name].quantity += item.quantity;
    acc[item.product_name].revenue += Number(item.total_price);
    return acc;
  }, {});

  const topProductsData = Object.entries(productMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)

  // KPIs
  const totalRevenue = (orders ?? [])
    .filter(o => o.payment_status === 'paid')
    .reduce((sum, o) => sum + Number(o.total), 0)

  const totalOrders = orders?.length ?? 0
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  const kpis = [
    {
      label: 'Ingresos totales',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950 border-emerald-800',
    },
    {
      label: 'Total pedidos',
      value: totalOrders,
      icon: ShoppingBag,
      color: 'text-blue-400',
      bg: 'bg-blue-950 border-blue-800',
    },
    {
      label: 'Ticket promedio',
      value: `$${avgOrderValue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-purple-400',
      bg: 'bg-purple-950 border-purple-800',
    },
    {
      label: 'Productos vendidos',
      value: topProducts?.reduce((sum, i) => sum + i.quantity, 0) ?? 0,
      icon: Package,
      color: 'text-orange-400',
      bg: 'bg-orange-950 border-orange-800',
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reportes</h1>
        <p className="text-gray-400 text-sm mt-1">Métricas y análisis del negocio</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-2xl border p-5 ${bg}`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-sm">{label}</p>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <ReportesCharts
        salesChartData={salesChartData}
        statusChartData={statusChartData}
        topProductsData={topProductsData}
      />
    </div>
  )
}