import { Suspense } from "react";
import { getProducts } from "@/lib/hooks/useProducts";
import ProductCard from "@/components/store/ProductCard";
import FilterPanel from "@/components/store/FilterPanel";
import FilterDrawer from "@/components/store/FilterDrawer";
import PaginationControls from "@/components/store/PaginationControls";
import type { Metadata } from "next";

const categoryNames: Record<string, string> = {
  arboles: "Árboles frutales y ornamentales",
  ornamentales: "Plantas ornamentales",
  "cactus-suculentas": "Cactus y suculentas",
  "no-ornamentales": "Plantas medicinales y aromáticas",
  macetas: "Macetas y porrones",
  sustratos: "Sustratos y tierra",
  fertilizantes: "Fertilizantes y abonos",
  herramientas: "Herramientas de jardinería",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const categoria = params.categoria;

  const title = categoria
    ? `${categoryNames[categoria] ?? categoria} — Yomi's Garden`
    : "Catálogo de plantas y accesorios — Yomi's Garden";

  const description = categoria
    ? `Compra ${categoryNames[categoria] ?? categoria} en Yomi's Garden. Envíos a toda Venezuela. Plantas saludables con garantía de calidad.`
    : "Explora nuestro catálogo completo de plantas, cactus, suculentas, árboles frutales, macetas y accesorios. Envíos a toda Venezuela.";

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function CatalogoPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const pageParam = Number(params.page);
  const currentPage =
    Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const { products, count, totalPages, page, perPage } = await getProducts({
    categoria: params.categoria,
    luz: params.luz,
    riego: params.riego,
    pet_friendly: params.pet_friendly === "1",
    interior: params.interior === "1",
    dificultad: params.dificultad,
    busqueda: params.busqueda,
    page: currentPage,
    perPage: 9,
  });

  const titulo = params.categoria
    ? params.categoria.charAt(0).toUpperCase() +
      params.categoria.slice(1).replace(/-/g, " ")
    : "Todo el catálogo";

  // Rango mostrado: "Mostrando 13–24 de 57 productos"
  const rangeFrom = count === 0 ? 0 : (page - 1) * perPage + 1;
  const rangeTo = Math.min(page * perPage, count);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {titulo}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {count}{" "}
          {count === 1 ? "producto encontrado" : "productos encontrados"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filtros desktop */}
        <div className="lg:w-56 shrink-0 hidden lg:block">
          <Suspense>
            <FilterPanel />
          </Suspense>
        </div>

        {/* Grid de productos */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-400 dark:text-gray-500">
              <p className="text-lg">
                No se encontraron productos con esos filtros.
              </p>
              <p className="text-sm mt-2">
                Intenta cambiar o limpiar los filtros.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 py-6 border-t border-gray-300 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 order-2 sm:order-1">
                  Mostrando{" "}
                  <span className="font-bold text-gray-300">
                    {rangeFrom}–{rangeTo}
                  </span>{" "}
                  de <span className="font-bold text-gray-300">{count}</span>{" "}
                  {count === 1 ? "producto" : "productos"}
                </p>

                <div className="order-1 sm:order-2">
                  <PaginationControls
                    currentPage={page}
                    totalPages={totalPages}
                    searchParams={params}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Filtros móvil */}
      <Suspense>
        <FilterDrawer />
      </Suspense>
    </div>
  );
}
