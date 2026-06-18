import { createClient } from "@/lib/supabase/server";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

interface RelatedProductsProps {
  productId: string;
  categoryId: string;
}

export default async function RelatedProducts({
  productId,
  categoryId,
}: RelatedProductsProps) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(*),
      plant_attributes(*),
      product_variants(*)
    `,
    )
    .eq("is_active", true)
    .eq("category_id", categoryId)
    .neq("id", productId)
    .limit(4);

  const products = (data as Product[]) ?? [];

  if (products.length === 0) return null;

  return (
    <div className="mt-16 border-t border-gray-100 dark:border-gray-800 pt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        También te puede interesar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
