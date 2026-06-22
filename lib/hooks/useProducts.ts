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
  page?: number;
  perPage?: number;
}

export interface PaginatedProducts {
  products: Product[];
  count: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<PaginatedProducts> {
  const supabase = createClient();

  const page = filters.page && filters.page > 0 ? filters.page : 1;
  const perPage = filters.perPage && filters.perPage > 0 ? filters.perPage : 9;

  // Si hay algún filtro botánico, necesitamos un INNER JOIN con plant_attributes
  // para poder filtrar y paginar correctamente a nivel de base de datos.
  const hasBotanicalFilter = Boolean(
    filters.luz ||
    filters.riego ||
    filters.pet_friendly ||
    filters.interior ||
    filters.dificultad,
  );

  let query = supabase
    .from("products")
    .select(
      `
      *,
      category:categories(*),
      plant_attributes${hasBotanicalFilter ? "!inner" : ""}(*),
      product_variants(*)
    `,
      { count: "exact" },
    )
    .eq("is_active", true);

  if (filters.categoria) {
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

  // Filtros botánicos ahora resueltos en la base de datos (sobre la tabla embebida)
  if (filters.luz) {
    query = query.eq("plant_attributes.light_requirement", filters.luz);
  }
  if (filters.riego) {
    query = query.eq("plant_attributes.water_frequency", filters.riego);
  }
  if (filters.pet_friendly) {
    query = query.eq("plant_attributes.is_pet_friendly", true);
  }
  if (filters.interior) {
    query = query.eq("plant_attributes.is_indoor", true);
  }
  if (filters.dificultad) {
    query = query.eq("plant_attributes.care_difficulty", filters.dificultad);
  }

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, error, count } = await query
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  const products = (data as Product[]) ?? [];
  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  return { products, count: totalCount, page, perPage, totalPages };
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