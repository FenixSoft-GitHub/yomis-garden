import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";

export interface ProductFilters {
  categoria?: string;
  luz?: string;
  riego?: string;
  pet_friendly?: boolean;
  interior?: boolean;
  dificultad?: string;
  perecedero?: boolean;
  busqueda?: string;
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<Product[]> {
  const supabase = createClient();

  let query = supabase
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
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (filters.categoria) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .or(
        `slug.eq.${filters.categoria},parent_id.in.(select id from categories where slug='${filters.categoria}')`,
      );

    const { data: cats } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", filters.categoria);

    if (cats && cats.length > 0) {
      const catId = cats[0].id;
      const { data: subcats } = await supabase
        .from("categories")
        .select("id")
        .eq("parent_id", catId);

      const ids = [catId, ...(subcats?.map((s) => s.id) ?? [])];
      query = query.in("category_id", ids);
    }
  }

  if (filters.busqueda) {
    query = query.ilike("name", `%${filters.busqueda}%`);
  }

  if (filters.perecedero !== undefined) {
    query = query.eq("is_perishable", filters.perecedero);
  }

  const { data, error } = await query;

  if (error) throw error;

  let products = (data as Product[]) ?? [];

  // Filtros botánicos (post-query sobre plant_attributes)
  if (filters.luz) {
    products = products.filter(
      (p) => p.plant_attributes?.light_requirement === filters.luz,
    );
  }
  if (filters.riego) {
    products = products.filter(
      (p) => p.plant_attributes?.water_frequency === filters.riego,
    );
  }
  if (filters.pet_friendly) {
    products = products.filter(
      (p) => p.plant_attributes?.is_pet_friendly === true,
    );
  }
  if (filters.interior) {
    products = products.filter((p) => p.plant_attributes?.is_indoor === true);
  }
  if (filters.dificultad) {
    products = products.filter(
      (p) => p.plant_attributes?.care_difficulty === filters.dificultad,
    );
  }

  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(*),
      plant_attributes(*),
      product_variants(*)
    `,
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data as Product;
}
