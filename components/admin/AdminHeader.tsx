import { createClient } from "@/lib/supabase/server";
import { Bell } from "lucide-react";

export default async function AdminHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user?.id ?? "")
    .single();

  // Alertas de bajo stock
  const { count: lowStockCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .filter("stock_quantity", "lte", 5)
    .eq("is_active", true);

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div />
      <div className="flex items-center gap-4">
        {/* Alerta de stock */}
        {lowStockCount && lowStockCount > 0 ? (
          <div className="flex items-center gap-2 bg-orange-950 border border-orange-800 text-orange-400 text-xs px-3 py-1.5 rounded-lg">
            <Bell className="w-3 h-3" />
            {lowStockCount} producto{lowStockCount > 1 ? "s" : ""} con bajo
            stock
          </div>
        ) : null}

        {/* Usuario */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {(profile?.full_name ?? user?.email ?? "A")[0].toUpperCase()}
          </div>
          <span className="text-gray-300 text-sm">
            {profile?.full_name ?? user?.email}
          </span>
        </div>
      </div>
    </header>
  );
}
