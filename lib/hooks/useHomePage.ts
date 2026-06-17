import { createClient } from "@/lib/supabase/server";
import type { Product, Review } from "@/lib/types";

export async function getHomePageData() {
  const supabase = await createClient();

  const [
    { data: featuredProducts },
    { data: recentReviews },
    { count: totalProducts },
  ] = await Promise.all([
    // Productos destacados
    supabase
      .from("products")
      .select(
        "*, category:categories(name), plant_attributes(*), product_variants(*)",
      )
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(4),

    // Reseñas recientes aprobadas
    supabase
      .from("reviews")
      .select("*, profiles(full_name), products(name)")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(3),

    // Total de productos activos
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
  ]);

  return {
    featuredProducts: (featuredProducts as Product[]) ?? [],
    recentReviews: (recentReviews ?? []) as (Review & {
      products?: { name: string };
    })[],
    totalProducts: totalProducts ?? 0,
  };
}
