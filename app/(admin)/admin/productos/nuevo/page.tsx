import { createAdminClient } from "@/lib/supabase/admin";
import ProductForm from "@/components/admin/ProductForm";

export default async function NuevoProductoPage() {
  const supabase = createAdminClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("is_active", true)
    .order("name");

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Nuevo producto</h1>
        <p className="text-gray-400 text-sm mt-1">
          Completa los datos del producto
        </p>
      </div>
      <ProductForm categories={categories ?? []} />
    </div>
  );
}
