import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://yomis-garden.vercel.app";

  // Obtener todos los productos activos
  const { data: products } = await supabase
    .from("products")
    .select("slug, updated_at")
    .eq("is_active", true);

  // Obtener categorías
  const { data: categories } = await supabase
    .from("categories")
    .select("slug, created_at")
    .eq("is_active", true);

  // Rutas estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: appUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${appUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${appUrl}/paisajismo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${appUrl}/auth`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Rutas de categorías
  const categoryRoutes: MetadataRoute.Sitemap = (categories ?? []).map(
    (cat) => ({
      url: `${appUrl}/catalogo?categoria=${cat.slug}`,
      lastModified: new Date(cat.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );

  // Rutas de productos
  const productRoutes: MetadataRoute.Sitemap = (products ?? []).map(
    (product) => ({
      url: `${appUrl}/producto/${product.slug}`,
      lastModified: new Date(product.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
