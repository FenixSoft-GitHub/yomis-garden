import { createAdminClient } from "@/lib/supabase/admin";
import ProductsTable from "@/components/admin/ProductsTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ProductosAdminPage() {
  const supabase = createAdminClient();

  const { data: products } = await supabase
    .from("products")
    .select(`*, category:categories(name)`)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Productos</h1>
          <p className="text-gray-400 text-sm mt-1">
            {products?.length ?? 0} productos en total
          </p>
        </div>
        <Link href="/admin/productos/nuevo">
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Nuevo producto
          </Button>
        </Link>
      </div>
      <ProductsTable products={products ?? []} />
    </div>
  );
}
