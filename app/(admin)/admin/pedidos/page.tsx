import { createAdminClient } from "@/lib/supabase/admin";
import OrdersTable from "@/components/admin/OrdersTable";

export default async function PedidosPage() {
  const supabase = createAdminClient();

  const { data: orders } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items(*)
    `,
    )
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Pedidos</h1>
        <p className="text-gray-400 text-sm mt-1">
          {orders?.length ?? 0} pedidos en total
        </p>
      </div>
      <OrdersTable orders={orders ?? []} />
    </div>
  );
}
