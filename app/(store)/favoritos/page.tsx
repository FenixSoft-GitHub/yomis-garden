import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Heart } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/store/ProductCard";
import type { Product } from "@/lib/types";

export default async function FavoritosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const { data: favorites } = await supabase
    .from("favorites")
    .select(
      `
      product_id,
      product:products(
        *,
        category:categories(*),
        plant_attributes(*),
        product_variants(*)
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const products = (favorites?.map((f) => f.product).filter(Boolean) ??
    []) as unknown as Product[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex items-center gap-3">
        <Heart className="size-7 text-yellow-500 fill-yellow-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mis favoritos
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {products.length} producto{products.length !== 1 ? "s" : ""}{" "}
            guardado{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="size-20 bg-yellow-50 dark:bg-yellow-800/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="size-10 text-yellow-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Aún no tienes productos favoritos
          </p>
          <Link
            href="/catalogo"
            className="text-green-600 dark:text-green-400 hover:text-green-700 font-medium"
          >
            Explorar catálogo →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
