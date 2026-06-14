"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface SalesData {
  month: string;
  total: number;
}

interface StatusData {
  status: string;
  count: number;
}

interface ProductData {
  name: string;
  quantity: number;
  revenue: number;
}

interface ReportesChartsProps {
  salesChartData: SalesData[];
  statusChartData: StatusData[];
  topProductsData: ProductData[];
}

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  preparing: "Preparando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const PIE_COLORS = [
  "#16a34a",
  "#2563eb",
  "#9333ea",
  "#ea580c",
  "#0891b2",
  "#dc2626",
];

export default function ReportesCharts({
  salesChartData,
  statusChartData,
  topProductsData,
}: ReportesChartsProps) {
  const pieData = statusChartData.map((d) => ({
    name: statusLabels[d.status] ?? d.status,
    value: d.count,
  }));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Ventas por mes */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="font-semibold text-white mb-6">Ventas por mes (USD)</h2>
        {salesChartData.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-12">
            Sin datos de ventas aún
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#f9fafb",
                }}
                formatter={(value) => [
                  `$${Number(value ?? 0).toFixed(2)}`,
                  "Ventas",
                ]}
              />
              <Bar dataKey="total" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Pedidos por estado */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="font-semibold text-white mb-6">Pedidos por estado</h2>
        {pieData.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-12">
            Sin pedidos aún
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#f9fafb",
                }}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: "#9ca3af", fontSize: 12 }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Top productos */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 xl:col-span-2">
        <h2 className="font-semibold text-white mb-6">
          Top productos más vendidos
        </h2>
        {topProductsData.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-12">
            Sin ventas aún
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProductsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                width={150}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#f9fafb",
                }}
                formatter={(value, name) => [
                  name === "quantity"
                    ? `${Number(value ?? 0)} uds`
                    : `$${Number(value ?? 0).toFixed(2)}`,
                  name === "quantity" ? "Unidades" : "Ingresos",
                ]}
              />
              <Bar
                dataKey="quantity"
                fill="#16a34a"
                radius={[0, 4, 4, 0]}
                name="quantity"
              />
              <Bar
                dataKey="revenue"
                fill="#2563eb"
                radius={[0, 4, 4, 0]}
                name="revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
