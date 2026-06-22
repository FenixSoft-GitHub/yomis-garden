import { createAdminClient } from "@/lib/supabase/admin";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarProductoPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("*, plant_attributes(*)")
      .eq("id", id)
      .single(),
    supabase
      .from("categories")
      .select("id, name, slug")
      .eq("is_active", true)
      .order("name"),
  ]);

  if (!product) notFound();

  const attr = product.plant_attributes;

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Editar producto</h1>
        <p className="text-gray-400 text-sm mt-1">{product.name}</p>
      </div>
      <ProductForm
        categories={categories ?? []}
        initialData={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description ?? "",
          category_id: product.category_id,
          base_price: Number(product.base_price),
          compare_price: product.compare_price
            ? Number(product.compare_price)
            : undefined,
          stock_quantity: product.stock_quantity,
          low_stock_threshold: product.low_stock_threshold,
          weight_kg: product.weight_kg ? Number(product.weight_kg) : undefined,
          is_perishable: product.is_perishable,
          is_featured: product.is_featured,
          images: product.images ?? [],
          light_requirement: attr?.light_requirement ?? "",
          water_frequency: attr?.water_frequency ?? "",
          is_pet_friendly: attr?.is_pet_friendly ?? false,
          is_indoor: attr?.is_indoor ?? false,
          is_outdoor: attr?.is_outdoor ?? false,
          care_difficulty: attr?.care_difficulty ?? "",
          mature_height_cm: attr?.mature_height_cm ?? undefined,
        }}
      />
    </div>
  );
}
